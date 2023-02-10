import { getCjDatafeeds } from "./services/cj";

const everyDay = async () => {
  await getCjDatafeeds();
};

export default everyDay;
