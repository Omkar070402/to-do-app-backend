import express from 'express'
import connectDB from './configs/db.js'
import 'dotenv/config'
import userRouter from './routes/userRouter.js'
import cors from 'cors'
import taskRouter from './routes/taskRouter.js'

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.json())

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173', // Local development
    'https://to-do-app-frontend-pearl-beta.vercel.app' // Production frontend
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        const msg = 'The CORS policy for this site does not allow access from the specified origin.';
        return callback(new Error(msg), false);
      }
    },
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow custom headers
    credentials: true, // Allow cookies and authorization headers
  };
  
  app.use(cors(corsOptions));

// db connection
connectDB()

app.use('/api/v1/user', userRouter)
app.use('/api/v1/task', taskRouter)

app.get('/', (req, res) => {
    res.send('API working')
})

app.listen(PORT, () => {
    console.log('server is running on port :', PORT);

})

