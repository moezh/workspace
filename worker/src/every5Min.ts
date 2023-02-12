import { getUpWorkNewJobs } from "./services/upwork";

const every5Min = () => {
  getUpWorkNewJobs();
};

export default every5Min;
