# BACKPACK

## Description
This is a platform to share books and other resources with other students within the college campus.Students can upload the photos and description of the books or other resources they want to share and other students can contact them through the contact details provided by the uploader. 

## Table of Contents

- [BACKPACK](#backpack)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Motivation](#motivation)
  - [Features](#features)
  - [Future Scope](#future-scope)
  - [Tech Stack](#tech-stack)
  - [Distinctiveness and Complexity](#distinctiveness-and-complexity)
  - [Backend Documentation](#backend-documentation)
    - [Postman Collection](#postman-collection)
    - [API Endpoints](#api-endpoints)
      - [Auth](#auth)
      - [Products](#products)
>>>>>>> ae8d714f851c1ea614158cec4cdfee9824adfd6a
- [BACKPACK](#backpack)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Motivation](#motivation)
  - [Features](#features)
  - [Future Scope](#future-scope)
  - [Tech Stack](#tech-stack)
  - [Distinctiveness and Complexity](#distinctiveness-and-complexity)
  - [Backend Documentation](#backend-documentation)
    - [Postman Collection](#postman-collection)
    - [API Endpoints](#api-endpoints)
      - [Auth](#auth)
      - [Products](#products)
## Installation

- Clone the repository
```bash
git clone https://github.com/satyamrs00/backpack.git
```
- Change the directory
```bash
cd backend
```
- Install the requirements
```bash
pip install -r requirements.txt
```
- Run the server
```bash
python manage.py runserver
```
- Open another terminal and change the directory
```bash
cd frontend
```
- Install the requirements
```bash
npm install
```
- Open the file `src/baseurl.js` and change the `baseurl` to `http://localhost:8000/`
- Run the server
```bash
npm start
```
- Open the browser and go to http://localhost:3000/

<<<<<<< HEAD
OR 

- Go to https://main--back-backpack.netlify.app/
=======
>>>>>>> ae8d714f851c1ea614158cec4cdfee9824adfd6a

## Motivation

Students often need books and other resources for a short period of time and it is not always feasible to buy them. So, this platform will help students to share books and other resources with other students within the college campus. This will help students to save money and also to save the environment by reducing the use of paper. This was initially designed for books only but later it was more generalized to include other resources as well such as lab coats, calculators, drawing boards, etc.

## Features

- Upload photos and description of the books or other resources.
- View the books or other resources uploaded by other students.
- Contact the uploader through the contact details provided by the uploader.
- Search for the books or other resources you want to find.
- Get notified when someone wants to contact you for the book or other resource you have uploaded.
- Get notified when someone accepts or rejects your request for a book or other resource.

## Future Scope
- Add a chat feature to the platform so that the students can chat with each other.
- Add a feature to rate the uploader so that the students can know about the uploader.
- Introduce a feature to demand a book or other resource that is not available on the platform.
- Introduce the concept of paying the uploader in some way to encourage the students to upload more resources.

## Tech Stack

```diff
+ Django Rest Framework
+ React.js
+ HTML, CSS, Bootstrap, JavaScript, Python
```

## Distinctiveness and Complexity
This project is unique in the sense that it is not just limited to books but also includes other resources. It is built based on the concept of reusing and sharing resources. It is also unique in the sense that it is limited to the college campus only. The complexity of this project is that it has a lot of features such as uploading photos, searching for books, requesting for books, accepting or rejecting requests, etc. It also has a lot of models and relationships between them. It also has a lot of features on the frontend such as searching for books, requesting for books, accepting or rejecting requests, etc. The backend is built using Django Rest Framework and the frontend is built using React.js. The backend is deployed on Render and the frontend is deployed on Netlify.

## Backend Documentation

### [Postman Collection](https://www.postman.com/satyamrs00/workspace/public/collection/23277225-c1883c56-a761-4457-af8d-56406e3bf5ac?action=share&creator=23277225)

### API Endpoints

#### Auth

- POST `/auth/register/` : Register a new user

    Request Body

    ```json
    {
        "username": "string",
        "email": "string",
        "first_name": "string",
        "last_name": "string",
        "password": "string",
        "password2": "string"
        "address": "string",
        "phone": "string",
        "college": "string",
        "batch": "string",
        "profile_pic": "file"
    }
    ```

- POST `/auth/token/` : Get JWT

    Request Body

    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```

- POST `/auth/token/refresh/` : Refresh JWT

    Request Body
    ```json
    {
        "refresh": "string"
    }
    ```

#### Products

- GET `/api/products/` : Get all the products from your college

    Required Header
    ```json
    {
        "Authentication" : "Bearer <token>"
    }
    ```

    Response Data

    ```json
    [
        {
            "name": "string",
            "description": "string",
            "owner": {
                "id": "integer",
                "username": "string",
                "address": "string",
                "phone": "string",
                "college": "string",
                "profile_pic": "string",
                "batch": "string",
                "email": "string",
                "first_name": "string",
                "last_name": "string"
            },
            "current_owner": {
                "id": "integer",
                "username": "string",
                "address": "string",
                "phone": "string",
                "college": "string",
                "profile_pic": "string",
                "batch": "string",
                "email": "string",
                "first_name": "string",
                "last_name": "string"
            },
            "available": "boolean",
            "id": "integer",
            "photo1": "string",
            "photo2": "string",
            "photo3": "string",
            "photo4": "string",
            "photo5": "string",
        }
    ]
    ```

- GET `/api/products/<id>/` : Get a product by id
  
    Required Headers
    ```json
    {
        "Authorization" : "Bearer <token>"
    }
    ```

    Response Data

    ```json
    {
        "name": "string",
        "description": "string",
        "owner": {
            "id": "integer",
            "username": "string",
            "address": "string",
            "phone": "string",
            "college": "string",
            "profile_pic": "string",
            "batch": "string",
            "email": "string",
            "first_name": "string",
            "last_name": "string"
        },
        "current_owner": {
            "id": "integer",
            "username": "string",
            "address": "string",
            "phone": "string",
            "college": "string",
            "profile_pic": "string",
            "batch": "string",
            "email": "string",
            "first_name": "string",
            "last_name": "string"
        },
        "available": "boolean",
        "id": "integer",
        "photo1": "string",
        "photo2": "string",
        "photo3": "string",
        "photo4": "string",
        "photo5": "string",
    }
    ```

- POST `/api/products/` : Create a new product

    Required Headers
    ```json
    {
        "Authorization" : "Bearer <token>"
    }
    ```

    Request Body

    ```json
    {
        "name": "string",
        "description": "string",
        "photo1": "file",
        "photo2": "file",
        "photo3": "file",
        "photo4": "file",
        "photo5": "file",
    }
    ```

- PATCH `/api/products/<id>/` : Set a product as available

    Required Headers
    ```json
    {
        "Authorization" : "Bearer <token>"
    }
    ```

    Request Body

    ```json
    {
        "available": "boolean"
    }
    ```

- POST `/api/request-product/` : Create a request for a product

    Required Headers
    ```json
    {
        "Authorization" : "Bearer <token>"
    }
    ```

    Request Body

    ```json
    {
        "product_id": "integer",
    }
    ```

- PUT `/api/accept-or-reject-request/` : Accept or Reject a request that has been made for your product

    Required Headers
    ```json
    {
        "Authorization" : "Bearer <token>"
    }
    ```

    Request Body

    ```json
    {
        "transaction_id": "integer",
        "status": "string"
    }
    ```

- GET `/api/profile/` : Get all details about yourself

    Required Headers
    ```json
    {
        "Authorization" : "Bearer <token>"
    }
    ```

    Response Data

    ```json
    {
        "product": [
            {
                "name": "string",
                "description": "string",
                "owner": {
                    "id": "integer",
                    "username": "string",
                    "address": "string",
                    "phone": "string",
                    "college": "string",
                    "profile_pic": "string",
                    "batch": "string",
                    "email": "string",
                    "first_name": "string",
                    "last_name": "string"
                },
                "current_owner": {
                    "id": "integer",
                    "username": "string",
                    "address": "string",
                    "phone": "string",
                    "college": "string",
                    "profile_pic": "string",
                    "batch": "string",
                    "email": "string",
                    "first_name": "string",
                    "last_name": "string"
                },
                "available": "boolean",
                "id": "integer",
                "photo1": "string",
                "photo2": "string",
                "photo3": "string",
                "photo4": "string",
                "photo5": "string",
            }
        ],
        "my_request": [
            {
                "product": {
                    "name": "string",
                    "description": "string",
                    "owner": {
                        "id": "integer",
                        "username": "string",
                        "address": "string",
                        "phone": "string",
                        "college": "string",
                        "profile_pic": "string",
                        "batch": "string",
                        "email": "string",
                        "first_name": "string",
                        "last_name": "string"
                    },
                    "current_owner": {
                        "id": "integer",
                        "username": "string",
                        "address": "string",
                        "phone": "string",
                        "college": "string",
                        "profile_pic": "string",
                        "batch": "string",
                        "email": "string",
                        "first_name": "string",
                        "last_name": "string"
                    },
                    "available": "boolean",
                    "id": "integer",
                    "photo1": "string",
                    "photo2": "string",
                    "photo3": "string",
                    "photo4": "string",
                    "photo5": "string",
                },
                "fromOwner": {
                    "id": "integer",
                    "username": "string",
                    "address": "string",
                    "phone": "string",
                    "college": "string",
                    "profile_pic": "string",
                    "batch": "string",
                    "email": "string",
                    "first_name": "string",
                    "last_name": "string"
                },
                "toOwner": {
                    "id": "integer",
                    "username": "string",
                    "address": "string",
                    "phone": "string",
                    "college": "string",
                    "profile_pic": "string",
                    "batch": "string",
                    "email": "string",
                    "first_name": "string",
                    "last_name": "string"
                },
                "status": "string",
                "id": "integer"
            }
        ],
        "request_to_me": [
            {
                "product": {
                    "name": "string",
                    "description": "string",
                    "owner": {
                        "id": "integer",
                        "username": "string",
                        "address": "string",
                        "phone": "string",
                        "college": "string",
                        "profile_pic": "string",
                        "batch": "string",
                        "email": "string",
                        "first_name": "string",
                        "last_name": "string"
                    },
                    "current_owner": {
                        "id": "integer",
                        "username": "string",
                        "address": "string",
                        "phone": "string",
                        "college": "string",
                        "profile_pic": "string",
                        "batch": "string",
                        "email": "string",
                        "first_name": "string",
                        "last_name": "string"
                    },
                    "available": "boolean",
                    "id": "integer",
                    "photo1": "string",
                    "photo2": "string",
                    "photo3": "string",
                    "photo4": "string",
                    "photo5": "string",
                },
                "fromOwner": {
                    "id": "integer",
                    "username": "string",
                    "address": "string",
                    "phone": "string",
                    "college": "string",
                    "profile_pic": "string",
                    "batch": "string",
                    "email": "string",
                    "first_name": "string",
                    "last_name": "string"
                },
                "toOwner": {
                    "id": "integer",
                    "username": "string",
                    "address": "string",
                    "phone": "string",
                    "college": "string",
                    "profile_pic": "string",
                    "batch": "string",
                    "email": "string",
                    "first_name": "string",
                    "last_name": "string"
                },
                "status": "string",
                "id": "integer"
            }
        ],
        "user": {
            "id": "integer",
            "username": "string",
            "address": "string",
            "phone": "string",
            "college": "string",
            "profile_pic": "string",
            "batch": "string",
            "email": "string",
            "first_name": "string",
            "last_name": "string"
        }
    }
    ```
