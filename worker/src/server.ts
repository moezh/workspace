import { CronJob } from "cron";

import everyHour from "./everyHour";
import everyDay from "./everyDay";

(async () => {
  everyHour();
  everyDay();
  new CronJob("* * * * 0", everyHour, null, true);
  new CronJob("* * * 0 0", everyDay, null, true);
})();
