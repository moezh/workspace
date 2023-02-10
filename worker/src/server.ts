import { CronJob } from "cron";

import every5Min from "./every5Min";
import everyHour from "./everyHour";
import everyDay from "./everyDay";

(async () => {
  new CronJob("0 */5 * * * *", every5Min, null, true);
  new CronJob("0 0 * * * *", everyHour, null, true);
  new CronJob("0 0 0 * * *", everyDay, null, true);
})();
