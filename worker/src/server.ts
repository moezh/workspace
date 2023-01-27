import { CronJob } from "cron";

import everyHour from "./everyHour";
import everyDay from "./everyDay";

console.log(process.env.NODE_ENV === "development");

(async () => {
  everyHour();
  everyDay();
  new CronJob("* * * * 0", everyHour, null, true);
  new CronJob("* * * 0 0", everyDay, null, true);
})();
