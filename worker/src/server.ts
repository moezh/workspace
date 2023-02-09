import { CronJob } from "cron";

import everyHour from "./everyHour";
import everyDay from "./everyDay";

(async () => {
  //await everyHour();
  //await everyDay();
  new CronJob("* * * * 0", everyHour, null, true);
  new CronJob("* * * 5 0", everyDay, null, true);
})();
