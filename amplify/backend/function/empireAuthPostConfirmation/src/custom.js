/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
import crypto from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { default as fetch, Request } from 'node-fetch';

const { Sha256 } = crypto;
const GRAPHQL_ENDPOINT = process.env.API_EMPIREATM_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

const createUserMutation = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      owner
      balance
      createdAt
      updatedAt
    }
}
`;


export const handler = async (event, context) => {
  // write new User to database
  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const variables = {
    input: {
      id: event.request.userAttributes.sub,
      username: event.userName,
      owner: `${event.request.userAttributes.sub}::${event.userName}`
    }
  }

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query: createUserMutation, variables }),
    path: endpoint.pathname
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(GRAPHQL_ENDPOINT, signed);
  let statusCode
  try {
    const response = await fetch(request, signed);
    let body = await response.json();
    console.log('Response body', body)
    if (body.errors) {
      statusCode = 400;
    }
  } catch (error) {
    console.error(error)
    statusCode = 500;
    let body = {
      errors: [
        {
          message: error.message
        }
      ]
    };
  }

  return event;
};

export default {
  handler
}