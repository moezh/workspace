import { CronJob } from "cron";
import { getDatafeeds } from "./services/cj";

import everyHour from "./everyHour";
import everyDay from "./everyDay";

(async () => {
  await getDatafeeds();
  new CronJob("* * * * 0", everyHour, null, true);
  new CronJob("* * * 5 0", everyDay, null, true);
})();
