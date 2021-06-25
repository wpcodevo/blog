import { getPopularBlogs } from "lib/api";

export default async (_, res) => {
  const data = await getPopularBlogs();
  res.status(200).json(data);
};
