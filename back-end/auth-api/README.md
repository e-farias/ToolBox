# Auth API Template

This is a simple auth API template made with TypeScript, Express, JWT, TypeORM & ☕.

<br>

## 📌 - Engines

Specific versions of engines, libraries, frameworks, plugins and other versioned tools.

- **Node**: v16.13.2
- **npm**: 8.1.2
- **Yarn**: 1.22.17

<br>

## ⚙️ - Setup

- Install dependencies with Yarn:

  ```bash
  yarn install
  ```

- Create your .env file from .env.exemple

- Run migrations

  ```bash
  yarn typeorm migration:run
  ```  

<br>

## ▶️ - Run

```bash
yarn dev
```

<br>

## 📍 - Roadmap/Dev Backlog

> Some steps to help build this application

✅ **Config: TypeScript**
  - yarn init -y
  - yarn add typescript ts-node nodemon -D
  - npx typescript --init
  - "scripts": {
    "dev": "npx nodemon --exec ts-node src/index.ts"
  }
  
  - "target": "es2021"
  - "emitDecoratorMetadata": true,
  - "experimentalDecorators": true,
  - "strictPropertyInitialization": false,

✅ **Config: Express**
  - yarn add express @types/express -D
  - Create src/index.ts + src/routes.ts

✅ **Config: TypeORM**
  - yarn add typeorm reflect-metadata pg
  - yarn add @types/node -D

  - import "reflect-metadata";

  - ormconfig.json
  - "typeorm": "npx ts-node ./node_modules/typeorm/cli.js"

✅ **Database: User Migration**
  - yarn typeorm migration:create -n CreateUsersTable
  - yarn typeorm migration:create -n CreateUsersRolesTable
  - yarn typeorm migration:run

✅ **Database: User Model**
  - yarn add bcryptjs
  - yarn add @types/bcryptjs -D

✅ **API: Route - Sign In**

✅ **API: Route - Auth**
  - Create auth controller
  - Create auth route
  - yarn add jsonwebtoken
  - yarn add @types/jsonwebtoken -D

✅ **API: Middleware - Auth**
  - Check headers authorization
  - Verify JWT Token
  - Create custom express type (userId)

❌ **API: Middleware - UserStoreValidation**
