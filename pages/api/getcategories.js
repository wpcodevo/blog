import { getNewsBlogs } from "lib/api";

export default async (_, res) => {
  const data = await getNewsBlogs();
  res.status(200).json(data);
};
