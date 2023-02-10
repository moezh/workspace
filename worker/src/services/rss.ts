import Parser from "rss-parser";

const parser: Parser = new Parser();

export const getRSS = async (url: string, lastMinutes: number) => {
  const limit = Date.now() - lastMinutes * 60 * 1000;
  const rss = await parser.parseURL(url);
  return rss.items.filter(
    (item) => new Date(item.isoDate as string).getTime() > limit
  );
};
