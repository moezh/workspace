import Parser from "rss-parser";

const parser: Parser = new Parser();

export const getRSS = async (url: string, after?: number) => {
  const rss = await parser.parseURL(url);
  if (after === undefined) {
    return rss.items;
  } else {
    return rss.items.filter(
      (item) => new Date(item.isoDate as string).getTime() > after
    );
  }
};
