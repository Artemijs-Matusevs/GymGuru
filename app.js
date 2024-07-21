import express from 'express';
import dotenv from 'dotenv';
import passport from './src/config/passport.js';
import sessionMiddleware from './src/middlewares/session.js';
import indexRoutes from './src/routes/index.js';
import authRoutes from './src/routes/auth.js';

dotenv.config();

const app = express();
const port = 3000;



app.use(express.static('public'));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoutes);
app.use('/', authRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})