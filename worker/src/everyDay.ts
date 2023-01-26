import { getDatafeeds } from "./services/cj";

const everyDay = async () => {
  console.log("> Every Day");
  console.log(">> Get datafeeds: Start");
  await getDatafeeds("4109775", "278257");
  console.log(">> Get datafeeds: Done");
};

export default everyDay;
