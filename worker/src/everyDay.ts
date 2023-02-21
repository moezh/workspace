import {getCjDatafeeds} from "./services/cj";

const everyDay = () => {
  getCjDatafeeds();
};

export default everyDay;
