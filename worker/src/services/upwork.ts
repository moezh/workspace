import { pushover } from "./pushover";
import fs from "fs";
import Parser from "rss-parser";

export const getUpWorkNewJobs = async () => {
  const dir = "./data/upwork";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  try {
    fs.accessSync(`${dir}/last-job-date.txt`, fs.constants.F_OK);
  } catch {
    fs.writeFileSync(`${dir}/last-job-date.txt`, new Date().toString());
  }
  const lastJobDate = fs.readFileSync(`${dir}/last-job-date.txt`, {
    encoding: "utf8",
  });
  const fromDate = new Date(lastJobDate).getTime();
  const url =
    "https://www.upwork.com/nx/jobs/search/?q=expensify&sort=recency&t=1";
  const parser: Parser = new Parser();
  const rss = await parser.parseURL(url);
  const filtredRss = rss.items.filter(
    (item) => new Date(item.isoDate as string).getTime() > fromDate
  );
  let toDate = fromDate;
  filtredRss.map((filtredItem) => {
    const jobDate = new Date(filtredItem.isoDate as string).getTime();
    toDate = Math.max(jobDate, toDate);
    pushover(
      `${filtredItem.title}`,
      `${filtredItem.isoDate}<br/>${filtredItem.content}`,
      `${filtredItem.link}`
    );
  });
  if (toDate > fromDate) {
    console.log(`Last job date: ${new Date(toDate).toString()}`);
    fs.writeFileSync(`${dir}/last-job-date.txt`, new Date(toDate).toString());
  }
};
