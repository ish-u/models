# API DOCS

You can also import the API in Insomnia or Postman using [API_INSOMNIA.har](./API_INSOMIA.har)

![](./API.png)

----
## BASE URL - `http://localhost:5000`

---
### LOGIN

```http
POST /login
```

#### Header

```json
"Content-Type": "application/json"
```

#### Body

```json
{
    "username": username,
    "password": password,
}
```

#### Response

- Success
  - Status Code - `200`
 
- Error

  - Status Code - `701`


---

### REGISTER

```http
POST /register
```

#### Header

```json
"Content-Type": "application/json"
```

#### Body

```json
{
    "name": name,
    "username": username,
    "password": password,
    "email": email,
}
```

#### Response

- Success

  - Status Code `200`

- Error
  - Status Code `701`
  - data 
    ```json
    {
        err : "SOMETHING WENT WRONG"
    }
    ```  

![](SIGNUP.png)

---

### LOGOUT

```http
GET /logout
```

#### Header

```json
"Content-Type": "application/json"
```

#### Send the cookies set by express-session+passportjs after hitiing `/login` with this request - this can be done by setting `credentials : "include"` in _fetch api_  

#### Response

- Success

  - Status Code `204`

- Error
  - Status Code `701`


---
### Upload File

```http
POST /upload
```
#### Body

```
  FormData with {"file": file}
```

#### Send the cookies set by express-session+passportjs after hitiing `/login` with this request - this can be done by setting `credentials : "include"` in _fetch api_  

#### Response

- Success
  - Status Code `201`

- Error
  - Status Code `701`

---
### Get Files List

```http
GET /files
```

#### Send the cookies set by express-session+passportjs after hitiing `/login` with this request - this can be done by setting `credentials : "include"` in _fetch api_  

#### Response
  - Body
    ```json
    {
      "files": [
        "che",
        "viking_room",
        "P1",
        "P8"
      ]
    }
    ```

- Success
  - Status Code `200`

- Error
  - Status Code `400`

---
### Get File
```http
GET /files/:fileName
```

#### URL Params
  - fileName - String

#### Send the cookies set by express-session+passportjs after hitiing `/login` with this request - this can be done by setting `credentials : "include"` in _fetch api_  

#### Response
  - Body
    ```json
    {
      "url": "https://s3.AWS_REGION.amazonaws.com/BUCKET_NAME/KEY?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQEW22OJOVAELKDQQ%2F20220924%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220924T060022Z&X-Amz-Expires=300&X-Amz-Signature=f2edadd4c80eb67e15cedf92772ab3fb76a7fe10cbef714470ed97d226542f47&X-Amz-SignedHeaders=host&x-id=GetObject"
    }
    ```

- Success
  - Status Code `200`




