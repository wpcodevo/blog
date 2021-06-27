import { getTwoPopularBlogs } from "lib/api";

export default async (_, res) => {
  const data = await getTwoPopularBlogs();
  res.status(200).json(data);
};
