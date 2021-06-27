# Zenklub Schedule API

Service to manage the availability and sessions schedule of professionals

### How to run locally

#### Requirements

* MongoDB
* Node >= v14
* NPM
* Docker
* docker-compose

#### Cloning project

```bash
git clone https://github.com/gabrielrufino/zenklub-schedule-api.git
cd zenklub-schedule-api
```

#### Installing dependencies and setting up environment variables

```bash
npm install
cp .env.example
```

Check if the environment variable **MONGO_URL** in the `.env` file matches with you MongoDB server.

#### Starting the development server

```bash
npm run dev:start
```

#### Service running!

You can now access `http://localhost:5000/`

### API & Docs

You can find docs in the root route `http://localhost:5000/` and all the API routes has the prefix `/api`, like `http://localhost:5000/api/availabilities`.

### Architecture

#### Entities

The service has 3 important entities: **availability**, **slot** and **session**

###### Availability

Represents a window of time that one professional accepts sessions

All availability have:

* professional - Name of the professional
* startDate - Begins date of the availability
* startTime - Begins time of the availability
* endDate - Ends date of the availability
* endTime - Ends time of the availability

###### Slot

Represents an available date and time that a customer can schedule a session

All slots have:

* professional - Name of the professional
* startDate - Begins date of the slot
* startTime - Begins time of the slot

###### Session

Represents a scheduled session

All sessions have:

* customer - Name of the customer
* professional - Name of the professional
* startDate - Begins date of the availability
* startTime - Begins time of the availability

#### Database

MongoDB was used to store data and these are the implications:

###### Unique collection

We just need one collection to store the 3 entities. The collection is called *availabilities* and has documents like this one:

```json
  "_id": "60d903a61f3542933698608c",
  "professional": "Gabriel Rufino",
  "startDate": "2021-08-30",
  "startTime": "12:30",
  "endDate": "2021-08-30",
  "endTime": "16:30",
  "slots": [
    {
      "startDate": "2021-08-30",
      "startTime": "14:00"
    },
    {
      "startDate": "2021-08-30",
      "startTime": "14:30"
    },
    {
      "startDate": "2021-08-30",
      "startTime": "15:00"
    },
    {
      "startDate": "2021-08-30",
      "startTime": "15:30"
    }
  ],
  "sessions": [
    {
      "customer": "Lewis Hamilton",
      "startDate": "2021-08-30",
      "startTime": "13:00"
    }
  ]
}
```

###### Aggregation usage

Given the format of dates and time in the database, we need **aggregation framework** to make operations more complex and bring us back a more efficient transformation happening in the server.

#### Source layers

```
+-- src
|  +-- controllers
|  +-- docs
|  +-- exceptions
|  +-- helpers
|  +-- middlewares
|  +-- models
|  +-- routers
|  +-- setup
+-- app.ts
+-- index.ts
```

###### Controllers

Contains all HTTP handlers

###### Docs

Contains documentation made in swagger specification

###### Exceptions

Contains custom errors

###### Helpers

Contains functions to make our life easier

###### Middlewares

Contains HTTP middlewares for handling intermidate goals

###### Models

Contains the database models

###### Routers

Contains declarative files defining the routers and their middlewares & handlers

###### Setup

Contains the initialization setup
