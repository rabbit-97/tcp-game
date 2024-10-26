import mysql from 'mysql2/promise';
import { config } from '../config/config.js';
import { formatDate } from '../utils/dataFormatter.js';

const { databases } = config;

const createPool = (dbConfig) => {
  const pool = mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  const originalQuery = pool.query;

  pool.query = (sql, params) => {
    const date = new Date();
    console.log(
      `[${formatDate(date)}] Executing query: ${sql} ${
        params ? `, ${JSON.stringify(params)}` : ``
      }`,
    );
    return originalQuery.call(pool, sql, params);
  };

  return pool;
};

const pools = {
  GAME_DB: createPool(databases.GAME_DB),
  USER_DB: createPool(databases.USER_DB),
};

export default pools;
