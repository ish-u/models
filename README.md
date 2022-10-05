# models

## Live Deployment
* frontend - [https://models-fabrik.vercel.app/](https://models-fabrik.vercel.app/)
* backend - [https://models.up.railway.app/](https://models.up.railway.app/)

---
![](./docs//fabrik.gif)
---


## Setup Local Development

Clone the Repository and cd to to `models`

```bash
git clone https://github.com/ish-u/models.git
cd models
```

### Setup Server

- Go to `server` folder and install packages

  ```bash
  cd server
  npm i
  ```

- Create a `.env` file in the `server` folder

- Copy the variables from `.env.sample` to `.env` and fill the required variables

  - Setup MongoDB using Atlas using [Atlas UI](https://www.mongodb.com/docs/atlas/getting-started/) and get the `MONGO DB URI` or provide the URI of  loacally installed MongoDB   

  - Generate `SESSION SECRET` using by running `require('crypto').randomBytes(64).toString('hex')` in node console

  - Setup S3 Storage in AWS Console - [S3 Documentation](https://docs.aws.amazon.com/s3/index.html)

  - The Final `.env` will look like this

    ```
    PORT=5000
    DB_URI=*MONGO DB URI*
    SESSION_SECRET=*SESSION SECRET*
    BUCKET=*AWS S3 BUCKET NAME*
    AWS_ACCESS_KEY_ID=*YOUR AWS SECRET KEY ID*
    AWS_SECRET_ACCESS_KEY=*YOUR AWS SECRET ACCESS KEY*
    DEV=TRUE
    ```

- Run the `npm run dev` to start the development server

- The Server will be Live at [`http://localhost:5000`](http://localhost:8000)


### Setup Client

- Go to `models` folder and install packages

  ```bash
  cd models
  npm i
  ```

- Create a `.env` file in `models` folder and add the following to it

  ```
  VITE_API_URL=http://localhost:5000
  ```

- Run the `npm run dev` to start the development server

- The Client will be Live at [`http://localhost:5713`](http://localhost:5713)

## [API DOCS](/docs/API_DOCS.md)

## References

1. three.js - [Link](https://threejs.org/)
2. AWS JS SDK v3 - [Link](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html)
3. multer - [Link](https://www.npmjs.com/package/multer)
4. multer-S3 - [Link](https://www.npmjs.com/package/multer-s3)
5. passportjs - [Link](https://www.passportjs.org/) 
6. mongoose - [Link](https://mongoosejs.com/)
7. tailwindcss - [Link](https://tailwindcss.com/)
8. vite - [Link](https://vitejs.dev/)


###### this was a really fun assignment; thank you for giving me the oppurtunity.
