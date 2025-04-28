
### Transaction  Application

Given an `app.js` file .

Create a database with the name `transaction` with the following collections,



**Transaction Table**

| Column     | Type    |
| ---------- | ------- |
| _id        | TEXT    |
| amount     | NUMBER  |
| description| TEXT    |
| date       | DEFAULT |

and write APIs to perform operations on the table `transaction`,


### API 1

#### Path: `/transactions/`

#### Method: `GET`
  
- **Description**:

    Returns a list of all transactions 

  - **Response**

    ```
    [
      {
        "_id": "680ec36016aec6e0c489368c",
        "amount": 1000,
        "description": "Petrol",
        "date": "2025-04-27T23:53:04.455Z",
        "__v": 0
      },
      ...
    ]
    ```

### API 2

#### Path: `/transactions/:id/`

#### Method: `GET`

#### Description:

Returns a specific transaction based on the id

#### Response

```
 {
    "_id": "680ec36016aec6e0c489368c",
    "amount": 1000,
    "description": "Petrol",
    "date": "2025-04-27T23:53:04.455Z",
    "__v": 0
 },
```

### API 3

#### Path: `/transactions/`

#### Method: `POST`

#### Description:

Create a transaction 

#### Request

```

{
  "_id": "680ec36016aec6e0c489368c",
  "amount": 1000,
  "description": "Petrol",
  "date": "2025-04-27T23:53:04.455Z",
  "__v": 0
 },
```

#### Response

```
[

{
  "_id": "680ec36016aec6e0c489368c",
  "amount": 1000,
  "description": "Petrol",
  "date": "2025-04-27T23:53:04.455Z",
  "__v": 0
 },
 ....

]
```

### API 4

#### Path: `/transactions/:id/`

#### Method: `PUT`

#### Description:

Updates the details of a specific transaction based on the id

  - **Request**
    ```
    {
      "amount": 200
    }
    ```
  - **Response**

    ```
    {
    "_id": "680ec36016aec6e0c489368c",
    "amount": 1000,
    "description": "Petrol,diesel",
    "date": "2025-04-27T23:53:04.455Z",
    "__v": 0
    }

    ```


### API 5

#### Path: `/transactions/:id/`

#### Method: `DELETE`

#### Description:

Deletes a transaction based on the id

#### Response

```
Transaction deleted successfully
```

<br/>

Use `npm install` to install the packages.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**
#
