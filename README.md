# API Videoclub

Simple REST API implementation on Node.js + Express + MySQL + JWT for management a video-club

## 🚀️ First Steps

👀️ You need to have installed *****Node.js***** and ***MySQL*** on your local machine.

### Clone the project

`git clone https://github.com/luis-knd/videoclub.git` or `git clone git@github.com:luis-knd/videoclub.git` for ssh config

### Install dependencies

To install dependencies enter project folder and run following command:

`npm install`

### Configure the environment variables

* Copy the file `.env.example` and renamed to `.env`
* Copy the file `config/config.json.example` and renamed to `config/config.json`
* Edit both file `.env` and `config/config.json` with your access data.

### Execute migrations and seeders

* First You need the Database, create it executing this command `db-migrate db:create videoclub`.
* Second create dummy users executing this command `npx sequelize-cli db:seed:all`

### Docs and test API

This app was documented using swagger, and you can, tried in this URL: http://localhost:3000/doc/
