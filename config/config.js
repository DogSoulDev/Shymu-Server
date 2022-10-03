const dotenv = require("dotenv");
const logger = require("loglevel");

logger.enableAll();
dotenv.config();

const {
	FB_ADMIN_DATABASE_URL,
  FB_PROJECT_ID,
  FB_PRIVATE_KEY_ID,
  FB_STORAGE_BUCKET,
  FB_MESSAGING_SENDER_ID,
  FB_APP_ID,
  FB_AUTH_URL,
  FB_DATABASE_URL,
  FB_MEASUREMENT_ID,
	PORT,
  ALTERNATIVE_PORT,
	CLIENT_URL,
  ALTERNATIVE_CLIENT_URL,
	DB_URL,
  DB_MONGODB
} = process.env;

const CONFIG = {
	development: {
		app: {
			PORT: PORT || ALTERNATIVE_PORT,
		},
		client: {
			URL: CLIENT_URL || ALTERNATIVE_CLIENT_URL,
		},
		logger: {
			warn: logger.warn,
			info: logger.info,
			error: logger.error,
			trace: logger.trace,
			debug: logger.debug,
		},
		db: {
			url: DB_URL,
		},
		firebase: {
			type: FB_TYPE,
			project_id: FB_PROJECT_ID,
			private_key_id: FB_PRIVATE_KEY_ID,
			private_key: FB_PRIVATE_KEY_ID.replace(/\\n/g, "\n"),
			client_email: FB_CLIENT_EMAIL,
			client_id: FB_CLIENT_ID,
			auth_uri: FB_AUTH_URI,
			token_uri: FB_TOKEN_URI,
		}
	},
};

module.exports = { Configuration };
