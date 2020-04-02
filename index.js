const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app=express()
const user=["Rony","Motin","Manik","Hasan","Joba","Seikh"];
app.use(cors());
app.use(bodyParser.json())


const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });
//database connection



app.get('/products',(req,res)=>{
    
client.connect(err => {
    const collection = client.db("onlineStore").collection("products");
    client = new MongoClient(uri, { useNewUrlParser: true });
    collection.find({price:{$gt: 20}}).limit(5).toArray((err,documents)=>{
       if(err){
           console.log(err);
           res.status(500).send({message:err})
       }else{
        res.send(documents);}
    });
    client.close();
  });
});
app.get('/fruits/banana',(req,res)=>{
    res.send({fruit:'banana',quantity:1000,price:12.13});
})
app.get('/user/:id',(req,res)=>{
    const id=req.params.id;
    
    
    const name=user[id];
    res.send({id,name});
})
//post
app.post('/addProduct',(req,res)=>{
    //save to database
    const product=req.body;
    
    
    client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
    const collection = client.db("onlineStore").collection("products");
   
    collection.insertOne(product,(err,result)=>{
       if(err){
           console.log(err);
           res.status(500).send({message:err})
       }else{
        res.send(result.ops[0]);}
    });
    client.close();
  });
  
  
    
})
const port=process.env.PORT||4200
app.listen(port,()=>console.log('Listening to port 3000'));