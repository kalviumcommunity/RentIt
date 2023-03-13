const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true, //optional
  })
  .then((con) => console.log('DB connction stablished'))
  .catch((err) => console.log(err));
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening port ${port}...`);
});
