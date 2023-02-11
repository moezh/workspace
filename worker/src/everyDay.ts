import { getCjDatafeeds } from "./services/cj";

const everyDay = () => {
  console.log("> Every 1 day");
  getCjDatafeeds();
};

export default everyDay;
