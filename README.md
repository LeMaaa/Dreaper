# Dreaper
Project for CMU-ETC-SV 18S

## Getting Started with Frontend

Go inside directory `SimsReact` by running `cd SimsReact`
run ```npm install``` to install dependencies, and then use ```npm start``` to run the webpack server. The server will run at ```localhost:8080```.

### Frontend Directory and Files
  - `./SimsReact`
    Frontend app folder
    - `/package.json`
      records npm dependency package info
    - `/webpack.config.js`
      configuration file for the webpack server
    - `/src/js/components/`
      this folder stores components used across different pages
    - `/src/js/pages/`
      this folder stores code to render the dashboard
    - `/src/styles/`
      stores css style

### How to update pack release info?
  Pack release info is hardcoded in frontend. Specifically, you want to look at `./SimsReact/components/LineChartWithTimeRange.js`. If there is any pack release info you would like to change, please modify the records stored object labelInfoDay and labelFormatMonth.


## Getting Started with Backend

Go inside directory `dbServer` by running `cd ./dbServer`

run ```npm install``` to install dependencies, and then run ```node index.js``` in ```dbServer```, node express server will be running at ```localhost:3000```

### Backend Directory and Files
  - `./dbServer`
    Backend API server folder
    - `/index.js`
    backend server code, with RESTful APIs
    - `/mongoose_db.js`
    mongoose schema file, used as ORM for MongoDB documents.

### Which database to use?
  Note that you have the option to use either a remote db or a local db. When connecting to mongodb with mongoose, simply change the url in mongoose_db.js.
