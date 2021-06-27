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
