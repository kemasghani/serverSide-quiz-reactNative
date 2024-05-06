import express from "express";
import cors from "cors";
import userRoute from './routes/userRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import difficultyRoute from './routes/difficultyRoute.js';
import packageRoute from './routes/packageRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

// Gunakan routing untuk kategori
app.use(categoryRoute);

// Gunakan routing untuk pengguna
app.use(userRoute);

// Gunakan routing untuk tingkat kesulitan
app.use(difficultyRoute);

// Gunakan routing untuk paket soal
app.use(packageRoute);

app.listen(5000, () => console.log('Server up and running...'));
