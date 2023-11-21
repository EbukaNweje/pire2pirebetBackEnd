
require('./database/database')
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const cors = require('cors');

const fileupload = require("express-fileupload");


const PORT = process.env.PORT || 3600;

const app = express();


app.use(cors({origin: "*"}));
app.use(morgan('dev'))

app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening to PORT: ${PORT}`);
});