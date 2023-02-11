import Parser from "rss-parser";

const parser: Parser = new Parser();

export const getRSS = async (url: string, minutes?: number) => {
  const rss = await parser.parseURL(url);
  if (minutes === undefined) {
    return rss.items;
  } else {
    const rssDate =
      rss.description === undefined
        ? new Date()
        : new Date(rss.description?.replace("All jobs as of ", ""));
    const startingDate = rssDate.getTime() - minutes * 60 * 1000;
    return rss.items.filter(
      (item) => new Date(item.isoDate as string).getTime() > startingDate
    );
  }
};
