import { pool } from "./services/db";
import { getCjDatafeeds } from "./services/cj";

const init = async () => {
  let sql: string = `SELECT count(*) FROM store_datafeeds`;
  let values: string[] = [];
  pool.query(
    sql,
    values,
    async (err, result: { rows: Record<string, string>[] }) => {
      if (err) {
        console.log(err);
      } else {
        const data = result.rows;
        if (Number(data[0].count) === 0) {
          await getCjDatafeeds();
        }
      }
    }
  );
};

export default init;
