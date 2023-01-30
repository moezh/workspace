import { getDatafeeds } from "./services/cj";

const everyDay = async () => {
  await getDatafeeds("4109775", "278257");
};

export default everyDay;
