import express from 'express';
import morgan from 'morgan';


const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});


app.listen(3000, () => {});