import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "Practic",
  host: "localhost",
  database: "nest",
  password: "Practic@123",
  port: "5432",
});

export default pool;
