## **Deploying Next.js and NestJS on Vercel**

### 1. Prerequisites
* A Vercel account.
* A github, Gitlab or Bitbucket repository for each of the Next.js and NestJS projects.
* [Heroku account](https://www.heroku.com/) (or another hosting service if you prefer) for deploying the NestJS backend.

### 2. Project Structure

project-root/
├── client/        # Next.js project (frontend)
└── server/        # NestJS project (backend)

### 3. Deploying the Next.js to Vercel

#### Step 3.1: Configure the Next.js Project

1. **Environment Configuration**: In `client/next.config.js`, configure the API URL that points to the NestJS backend. When deploying to production, this URL should point to the live backend server:

```
[!NOTE]
module.exports = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
};

```

2. **Package Installation**: Ensure that all required dependencies for Next.js are installed by running:

```
 [!NOTE]
 cd client
 npm install
```

#### Step 3.2: Deploying to Vercel

### 4. Deploying the NestJS 

#### Step 4.1: Configure the NestJS Project
* Environment Configuration: Define the necessary variables in NestJS environment.  Create `.env` file in `server/` 
```
PORT=3001
```
* **Install Dependencies**: Run the following in the `server/` directory to install all dependencies:
```
npm install
```
* **Update main.ts**: Ensure that the NestJS application binds to all interfaces by setting the host to `0.0.0.0`:
```
await app.listen(process.env.PORT || 3001, '0.0.0.0');
```

#### Step 4.2: Deploying to Heroku

* **Create a Heroku Application**: Go to Heroku and create a new app.
* **Set up Git Remote for Heroku**: In the `server/` directory, run the following commands:
```
heroku git:remote -a your-heroku-app-name
```
* **Deploy to Heroku**: Push your code to Heroku:
```
git add .
git commit -m "Deploy NestJS backend"
git push heroku main
```
* **Configure Environment Variables on Heroku**: Go to the app’s settings on Heroku and add environment variables, such as `PORT`.
* **Verify Deployment**: Heroku will provide a URL for your backend API (e.g., `https://your-heroku-app-name.herokuapp.com`). Make sure this URL is set in your frontend environment.
### 5. Configure Next.js to Communicate with NestJS

1. Update the Next.js environment variable `NEXT_PUBLIC_API_URL` in Vercel to the deployed NestJS URL.
    
2. Within Next.js, you can now make API requests as follows:
```
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/resource`);
```

## 6. Testing and Validation

1. Visit the Vercel-provided frontend URL and test the functionality to ensure that it can communicate with the backend.
2. Use a tool like Postman or cURL to test the API endpoints on the backend if needed.