import { getUpWorkNewJobs } from "./services/upwork";

const every5Min = async () => {
  console.log("> Every 5 minutes");
  getUpWorkNewJobs();
};

export default every5Min;
