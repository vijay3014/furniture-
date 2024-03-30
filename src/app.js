require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const Admin = require('./routes/admin/admin.routes');
const User = require('./routes/user/user.routes');
const userProduct = require('./routes/user/user.product.routes');
const adminProduct = require('./routes/admin/admin.product.routes');
const Favorite = require('./routes/user/user.favotite.routes');
const Cart = require('./routes/user/user.cart.routes');
const cartAdmin = require('./routes/admin/admin.cart.routes');
const Order = require('./routes/user/user.order.routes');

const port = process.env.PORT;
const dbUrl = process.env.MONGO_URL;

app.use(express.json());

app.use('/api/admin', Admin);
app.use('/api/admin/product',adminProduct);
app.use('/api/admin/cart',cartAdmin);

app.use('/api/user', User);
app.use('/api/user/product',userProduct);
app.use('/api/user/favorite',Favorite);
app.use('/api/user/cart',Cart);
app.use('/api/user/cart/order',Order);


app.listen(port, async ()=> {
    mongoose.connect(process.env.MONGO_DB_URL)
    .then(() =>console.log('DB is Connected....'))
    .catch(err => console.log(err.message));
    console.log(`server is start at http://localhost:${port}`);
});