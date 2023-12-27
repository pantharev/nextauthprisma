## User Guide

This is a template to rapidly prototype and create nextjs 14, prisma, and auth js applications.
With the goal being to simplify the authentication and database synchronization process so developers can start creating their projects and working on the business logic sooner rather than later.

The steps you'd have to take for the configuration process are as follows:

1. clone the git repo

2. create a .env file and add the connection string to the database for prisma
   <pre>DATABASE_URL = <postgres connection string></postgres></pre>

  e.g. 
  <pre>DATABASE_URL="postgresql://janedoe:janedoe@localhost:5432/janedoe?schema=hello-prisma"</pre>
  if local or
  <pre>DATABASE_URL="postgresql://opnmyfngbknppm:XXX@ec2-46-137-91-216.eu-west-1.compute.amazonaws.com:5432/d50rgmkqi2ipus?schema=hello-prisma"</pre>
  if from a server.

  please see prisma docs for more info:
  https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgresql#:~:text=PostgreSQL-,Connect%20your%20database,-To%20connect%20your

3. Create the database model from the prisma schema and create/read the todos

  To test the prisma setup, please run the migrate command: 
  <pre>npx prisma migrate dev --name init</pre>

  please use the Thunderclient vs code extension, or postman to query the endpoint localhost:3000/api/todos.
  
  the POST request should create 5 sample todos in the database
  
  while the GET request should return the 5 sample todos if the setup was succesful.

-----
 4. auth js setup:


-----

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
