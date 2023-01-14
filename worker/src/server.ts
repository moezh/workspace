import { pool } from "./services/db";

(async () => {
  setInterval(async () => {
    let sql: string = `SELECT CURRENT_TIMESTAMP`;
    let values: string[] = [];
    pool.query(sql, values, (err: any, result: { rows: any }) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.rows);
      }
    });
  }, 300000);
})();
