const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

// middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.kjpmx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
      const userCollection = client
        .db('warehouseDb')
        .collection('productCollections');

app.get('/user', (req, res) => {
  console.log('connected');
  res.send('Connect')
});
  } finally {
  }
}

run().catch(console.dir);



app.listen(port, () => {
  console.log('App is listening ');
});
