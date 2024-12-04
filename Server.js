const express = require('express');
const path = require('path');  // Required to serve static files
const ConnectDB = require('./Config/ConnectDB');
const userRouter = require('./Routes/User');
const eventRouter = require('./Routes/Event');
const appRouter = require('./Routes/EventApplication');
const newsRouter = require('./Routes/News');

const app = express();
require('dotenv').config();

app.use(express.json());
ConnectDB();

// API routes
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);
app.use('/api/applications', appRouter);
app.use('/api/news', newsRouter);

// Serve static files from the React app (after build)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // All other routes should return the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT , 
  console.log(`Server is running on port ${process.env.PORT || 5000}`)
);