// const express = require('express');

// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const path = require('path');
const app = require("./src/app");
const connectDB = require("./src/db/db");

require("dotenv").config();


// Import routes
// const authRoutes = require('./routes/auth');
// const releaseRoutes = require('./routes/releases');
// const artistRoutes = require('./routes/artists');
// const labelRoutes = require('./routes/labels');
// const uploadRoutes = require('./routes/uploads');
// const userRoutes = require('./routes/users');
// const releaseFormRoutes = require('./routes/release-form');
// const dashboardRoutes = require('./routes/dashboard');
// const formValidationRoutes = require('./routes/form-validation');
// const { connect } = require('http2');
const PORT = process.env.PORT || 5000;
connectDB();

const dotenv = require("dotenv");
dotenv.config(); // must be at the top


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Security middleware
// app.use(helmet());

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.'
// });
// app.use('/api/', limiter);


// CORS configuration
// app.use(cors({
  //   origin:
  //     process.env.NODE_ENV === 'production'
  //       ? ['https://your-frontend-domain.com']
  //       : ['http://localhost:3000', 'http://localhost:5173'],
  //   credentials: true,
  // }));
  
  // Body parsing middleware
  // app.use(express.json({ limit: '10mb' }));
  // app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  
  // // Static files
  // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
  // API Routes
  // app.use('/api/auth', authRoutes);
  // app.use('/api/releases', releaseRoutes);
  // app.use('/api/artists', artistRoutes);
  // app.use('/api/labels', labelRoutes);
  // app.use('/api/uploads', uploadRoutes);
  // app.use('/api/users', userRoutes);
  // app.use('/api/release-form', releaseFormRoutes);
  // app.use('/api/dashboard', dashboardRoutes);
  // app.use('/api/form-validation', formValidationRoutes);
  
  // Health check endpoint
  // app.get('/api/health', (req, res) => {
    //   res.json({
      //     status: 'OK',
      //     timestamp: new Date().toISOString(),
      //     environment: process.env.NODE_ENV,
      //   });
      // });
      
      // Error handling middleware
      // app.use((err, req, res, next) => {
        //   console.error(err.stack);
        //   res.status(500).json({
          //     error: 'Something went wrong!',
          //     message:
          //       process.env.NODE_ENV === 'development'
          //         ? err.message
          //         : 'Internal server error',
          //   });
          // });
          
          // 404 handler (✅ fixed for Express v5 / path-to-regexp)
          // app.use((req, res) => {
            //   res.status(404).json({ error: 'Route not found' });
            // });
            
