const { app } = require('./server');
const { config } = require('./config');
const { connect } = require('./db/connect');

if (!config.app.port) {
  throw new Error('App config is invalid');
}

connect().then(() => {
  app.listen(DB_MONGODB, () => {
    console.log(`Server listening on ${DB_PORT}`);
  });
});
