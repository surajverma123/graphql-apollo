const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./schema/schema');

const app = express();

// allow across- origin
app.use(cors());
mongoose.connect('mongodb://suraj:test123@ds163182.mlab.com:63182/gql-suraj');
mongoose.connection.once('open', () => {
  console.log("Connection estiblished with mongoose!!!!");
});

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log("Server is running on PORT 4000");
})