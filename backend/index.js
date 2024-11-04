const express = require('express');
const app = express();
const cors = require('cors');
const cookieparser = require('cookie-parser');
const dotenv = require('dotenv');
const connectiondb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const postRoutes = require('./routes/postRoutes');
//config
dotenv.config();
connectiondb();

// middleware
app.use(cookieparser());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

//routes
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/post', postRoutes);

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send(`server is running on ${port}`)
});

app.listen(port, () => {
    console.log(`server is running on ${port}`);

})