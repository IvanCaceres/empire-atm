import { Inter } from 'next/font/google'
import ATM from '@/components/ATM/ATM'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="project-description max-w-[440px] mt-[20px]">
        <p>This project demonstrates a customized graphical UI experience depicting an Imperial banking ATM from the &quot;Star Wars&quot; universe and features a fully functioning login and registration user account system.</p>
        <p>This project uses React, Typescript, and Next.js 13 leveraging the new &#96;app&#96; directory functionality.</p>
        <p>This project utilizes GraphQL to interface with a fully functioning backend provisioned using AWS CDK, AWS DynamoDB, AWS AppSync, AWS Amplify, all infrastructure as code.</p>
        <p>The AWS backend infrastructure as code is fully provisioned and accessible in the Github repo as well as all Frontend React and Next.js code.</p>
        <p>This application was developed with a CI/CD implementation that automates the application deployments for the frontend + backend from a singular codebase and is best experienced on Desktop browsers.</p>
        <a href="https://github.com/IvanCaceres/empire-atm" target='_blank'>Github: Empire ATM</a>
      </div>
      <ATM />
    </main >
  )
}
