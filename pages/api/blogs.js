import { getAllBlogs } from "lib/api";

export default async (req, res) => {
  const data = await getAllBlogs();
  res.status(200).json(data);
};
