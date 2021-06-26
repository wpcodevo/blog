import { getBlogsByCategory } from "lib/api";

export default async (_, res) => {
  const data = await getBlogsByCategory("nodejs");
  res.status(200).json(data);
};
