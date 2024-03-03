const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://mongo:27017/store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Product = mongoose.model('Product', {
  name: String,
  quantity: Number,
  cost: Number,
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.render('index', { products: products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.send('Error fetching products');
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.render('products', { products: products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.send('Error fetching products');
  }
});

app.get('/totalCost', async (req, res) => {
  try {
    const products = await Product.find({});
    let totalCost = 0;
    products.forEach(product => {
      totalCost += product.quantity * product.cost;
    });
    res.send(`Total Cost: ${totalCost}`);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.send('Error fetching products');
  }
});

app.post('/addProduct', async (req, res) => {
    const { name, quantity, cost} = req.body;
    const product = new Product({
      name: name,
      quantity: parseInt(quantity),
      cost: parseFloat(cost),
    });
    try {
      await product.save();
      console.log('Product added successfully.');
      console.log(product);
      res.redirect('/success');
    } catch (error) {
      console.error('Error adding product:', error);
      res.send('Error adding product');
    }
  });
  
  app.get('/success', (req, res) => {
    res.render('success');
  });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
