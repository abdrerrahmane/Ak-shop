// ===== AK-Shop Server (Node.js + Express + MongoDB) =====
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = 'akshop';
const ADMIN_KEY = process.env.ADMIN_KEY || 'admin123';

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

let db, products, orders;
MongoClient.connect(MONGO_URI).then(client => {
  db = client.db(DB_NAME);
  products = db.collection('products');
  orders = db.collection('orders');
  console.log('✅ MongoDB connected');
}).catch(err => console.error(err));

// حماية مسارات الإدارة
function requireAdmin(req, res, next){
  const key = req.headers['x-admin-key'] || req.query.key;
  if(key===ADMIN_KEY) return next();
  res.status(401).json({error:'Unauthorized'});
}

// ===== API =====
// جميع المنتجات
app.get('/api/products', async (req,res)=>{
  const list = await products.find().toArray();
  res.json(list);
});

// إضافة منتج جديد
app.post('/api/products', requireAdmin, async (req,res)=>{
  const doc = req.body;
  const result = await products.insertOne({...doc, createdAt: new Date()});
  res.json(result.ops[0]);
});

// تعديل منتج
app.put('/api/products/:id', requireAdmin, async (req,res)=>{
  const id = req.params.id;
  await products.updateOne({_id:ObjectId(id)}, {$set:req.body});
  const p = await products.findOne({_id:ObjectId(id)});
  res.json(p);
});

// حذف منتج
app.delete('/api/products/:id', requireAdmin, async (req,res)=>{
  const id = req.params.id;
  const p = await products.findOneAndDelete({_id:ObjectId(id)});
  res.json(p.value);
});

// إنشاء طلب
app.post('/api/orders', async (req,res)=>{
  const doc = req.body;
  doc.createdAt = new Date();
  const result = await orders.insertOne(doc);
  res.json(result.ops[0]);
});

// عرض الطلبات (للأدمن)
app.get('/api/orders', requireAdmin, async (req,res)=>{
  const list = await orders.find().sort({createdAt:-1}).toArray();
  res.json(list);
});

// تحديث حالة الطلب
app.put('/api/orders/:id/status', requireAdmin, async (req,res)=>{
  const id = req.params.id;
  const { status } = req.body;
  await orders.updateOne({_id:ObjectId(id)}, {$set:{status}});
  const o = await orders.findOne({_id:ObjectId(id)});
  res.json(o);
});

app.listen(PORT, ()=>console.log(`🚀 Server running on http://localhost:${PORT}`));
