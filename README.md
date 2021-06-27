# Zenklub Schedule API

Service to manage the availability and sessions schedule of professionals

### How to run locally

#### Requirements

* MongoDB
* Node >= v14
* NPM
* Docker (Optional)
* docker-compose (Optional)

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
