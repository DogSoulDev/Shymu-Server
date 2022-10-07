require("dotenv").config();

const {
  NODE_ENV = "development",
  DB_MONGODB,
  DB_DEVELOPMENT_MONGODB,
  DB_TEST_MONGODB,
  DB_PORT = 3001,
} = process.env;

const baseConfig = {
  app: {
    port: DB_PORT || DB_ALTERNATIVE_PORT,
  },
  client: {
    url: process.env.CLIENT_PORT || CLIENT_URL,
  },
};

const config = {
  development: {
    ...baseConfig,
    db: {
      url: DB_DEVELOPMENT_MONGODB,
    },
  },
  test: {
    ...baseConfig,
    db: {
      url: DB_TEST_MONGODB,
    },
  },
  production: {
    ...baseConfig,
    db: {
      url: DB_MONGODB,
    },
  },
};

module.exports = {
  config: config[NODE_ENV],
};