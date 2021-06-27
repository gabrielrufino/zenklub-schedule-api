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
