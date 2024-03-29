const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { errorHandler } = require('./middleware/errorMiddleware');

require('dotenv').config();
require('colors');


const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// * Connect to database
connectDB();

const app = express();

// * Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

if (process.env.NODE_ENV === 'production') {
	app.use('/api', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));

	app.use(express.static(path.join(__dirname, '../frontend/build')));
	app.get('*', (_, res) => {
		res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
	});
} else {
	app.get('/', (req, res) => {
		res.status(200).json({ message: 'Welcome to the Support Desk API' });
	});
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
