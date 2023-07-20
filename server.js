const express = require('express');
const cors = require('cors');
const { pool } = require('./db');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

const fs = require('fs');

const dir = './uploads';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// 使用cors来允许跨域请求
app.use(cors());

// 使用express的json中间件来解析请求体
app.use(express.json());

// Static file serving
app.use(express.static(path.join(__dirname, 'build')));

//根目录
app.get('/api', (req, res) => {
  res.send('Hello, API Server!');
});

// Testing Database Connection
app.get('/api/test-db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT 1');
    client.release();
    res.send('Database connection successful');
  } catch (err) {
    console.error(err);
    res.send('Database connection error');
  }
});

// DELETE /products/:id
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.send('Product deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /products
app.post('/api/products', upload.single('file'), async (req, res) => {
  const product = req.body;
  let filePath = req.file.path;
  // 将路径分隔符从 \ 替换为 /
  filePath = path.normalize(filePath).split(path.sep).join('/');
  try {
    await pool.query('INSERT INTO products (name, type, description, price, stock, image_path) VALUES ($1, $2, $3, $4, $5, $6)', [product.name, product.type, product.description, product.price, product.stock, filePath]);
    res.status(201).send('Product added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /products
app.get('/api/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    rows.forEach(row => console.log(`Product ID: ${row.id}, Image Path: ${row.image_path}`));
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Handle any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
