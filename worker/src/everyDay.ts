import { getDatafeeds } from "./services/cj";

const everyDay = async () => {
  console.log("> Get datafeeds");
  await getDatafeeds("4109775", "278257");
};

export default everyDay;
