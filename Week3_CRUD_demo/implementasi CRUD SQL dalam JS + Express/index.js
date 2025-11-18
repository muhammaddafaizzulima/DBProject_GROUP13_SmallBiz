const express = require('express');
const app = express();
const db = require('./db');

const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const customerRoutes = require('./routes/Customer');
const userRoutes = require('./routes/user');
const supplierRoutes = require('./routes/supplier');
const transactionRoutes = require('./routes/Transaction');
const transactionDetailRoutes = require('./routes/transaction_Detail');
const purchaseRoutes = require('./routes/purchase');
const purchaseDetailRoutes = require('./routes/purchase_detail');


app.use(express.json());
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/customer', customerRoutes);
app.use('/user', userRoutes);
app.use('/supplier', supplierRoutes);
app.use('/Transaction', transactionRoutes);
app.use('/transaction_Detail', transactionDetailRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/purchase_detail', purchaseDetailRoutes);

app.get('/', (req, res) => {
  res.send('API SmallBiz Running...');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});