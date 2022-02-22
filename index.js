const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const userRouter = require('./routes/userRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/user', userRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
