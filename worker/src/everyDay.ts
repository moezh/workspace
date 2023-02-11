import { getCjDatafeeds } from "./services/cj";

const everyDay = async () => {
  console.log("> Every 1 day");
  await getCjDatafeeds();
};

export default everyDay;
