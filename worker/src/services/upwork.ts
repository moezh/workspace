import { pushover } from "./pushover";
import { getRSS } from "./rss";

export const getUpWorkNewJobs = async () => {
  const rss = await getRSS(
    "https://www.upwork.com/ab/feed/jobs/rss?subcategory2_uid=531770282589057024%2C531770282584862733&location=United+States&q=%28react+OR+next.js+OR+node.js+OR+typescript%29+AND+NOT+%28java+OR+php+OR+python+OR+rust+OR+golang+OR+laravel+OR+vue+OR+angular+OR+mongodb+OR+shopify%29&client_hires=1-9%2C10-&contractor_tier=2%2C3&verified_payment_only=1&sort=recency&paging=0%3B10&api_params=1",
    5
  );
  rss.map((item) => {
    pushover(
      `${item.title}`,
      `${item.isoDate}<br/>${item.content}`,
      `${item.link}`
    );
  });
};
