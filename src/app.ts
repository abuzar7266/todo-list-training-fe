import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Express!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});