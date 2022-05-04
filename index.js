const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const jwt  = require('jsonwebtoken')
// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.kjpmx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  await client.connect();
  const productCollection = client
    .db('warehouseDb')
    .collection('productCollections');
  try {
    app.get('/inventory', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.delete('/inventory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

    app.post('/additem', async (req, res) => {
      const item = req.body;
      const result = await productCollection.insertOne(item);
      res.send(result);
    });
    app.get('/user', async (req, res) => {
      const email = req.query.email;
      const query = {email:email};
      const cursor = productCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

      app.get('/inventory/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const cursor =  productCollection.find(query);
        const result = await cursor.toArray();
         res.send(result);
      });
         app.put('/inventory/:id', async (req, res) => {
           const id = req.params.id;
           const updatedItem = req.body;
           const filter = { _id: ObjectId(id) };
           const option = {upsert : true}
           const update = {
             $set:{
                quantity:updatedItem.quantity,
             }
           }
           const result = await productCollection.updateOne(filter,update,option);
           res.send(result);
         });

           app.post('/login', async (req, res) => {
             const user = req.body;
             const accessToken = jwt.sign(user,"" + process.env.ACCESS_TOKEN, {
               expiresIn: '1d',
             });
             res.send({ accessToken });
           });

  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log('App is listening ');
});
