import merge from "lodash/merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

let envConfig;

switch (stage) {
  case "testing":
    envConfig = require("./testing").default;
    break;
  case "production":
    envConfig = require("./production").default;
    break;
  default:
    envConfig = require("./local");
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: 3000,
    secret: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  envConfig
);
