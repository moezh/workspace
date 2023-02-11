import { CronJob } from "cron";

import init from "./init";
import every5Min from "./every5Min";
import everyHour from "./everyHour";
import everyDay from "./everyDay";

(async () => {
  init();
  if (process.env.NODE_ENV === "production") {
    new CronJob("0 */5 * * * *", every5Min, null, true);
    new CronJob("0 0 * * * *", everyHour, null, true);
    new CronJob("0 0 0 * * *", everyDay, null, true);
  }
})();
