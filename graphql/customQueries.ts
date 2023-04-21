export const usersByTypeAndUsername = /* GraphQL */ `
  query UsersByTypeAndUsername(
    $type: UserType!
    $username: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByTypeAndUsername(
      type: $type
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        owner
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;