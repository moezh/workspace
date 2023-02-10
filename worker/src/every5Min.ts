import { getUpWorkNewJobs } from "./services/upwork";

const every5Min = async () => {
  getUpWorkNewJobs();
};

export default every5Min;
