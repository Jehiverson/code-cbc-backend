import {Sequelize} from "sequelize";

export const prod = process.env.NODE_ENV === "production";

export const config = new Sequelize(
    "cbcDev",
    // "production",
    "sqlserver",
    "`I~:z0nVgdz`rs#Z",
    {
      host: "34.28.145.67",
      dialect: "mssql",
      logging: false,
      pool: {
        max: 10,
        min: 0,
        idle: 10000,
      },
    },
);

export const connect = async () => {
  config.authenticate().then(() => {
    console.info("Connection has been established successfully.");
  }).catch((error) => {
    console.error("Unable to connect to the database:.", error);
  });
};

export const closeConnection = async () => await config.close();
