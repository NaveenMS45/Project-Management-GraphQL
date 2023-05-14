require('dotenv').config();

const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const app = express();
const cors = require('cors');

// database
const connectDB = require("./db/connect");

//schema
const schema = require('./schema/schema');

app.use(cors());
app.use(
    '/graphql',
     graphqlHTTP({
    schema,
    graphiql : process.env.NODE_ENV === 'development'
}));

let port = process.env.PORT || 5000;
const start = async() => {
  try {
    await connectDB(process.env.mongoUrl);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();