const express = require('express');
require('dotenv').config();
const router = require('./src/routes/auth.route');

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const corsOrigins = [
  'http://localhost:3000',
];

app.use(cors({
  origin: corsOrigins,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth',router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});