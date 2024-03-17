
require('./database/database')
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const cors = require('cors');
const transactionRouter = require('./routes/transactionRouter');
const gameRouter = require('./routes/gameRouter');
const fileupload = require("express-fileupload");


const PORT = process.env.PORT || 3600;

const app = express();


app.use(cors({origin: "*"}));
app.use(morgan('dev'))

app.use(express.json());
// app.use(
//   fileupload({
//     useTempFiles: true,
//   })
// );

app.use("/api", userRouter);
app.use("/api", transactionRouter);
app.use("/api", gameRouter);

app.use("/", (req, res) => {
  res.status(200).send("Welcome to the Home page!");
})

app.listen(PORT, () => {
  console.log(`Server is listening to PORT: ${PORT}`);
});
