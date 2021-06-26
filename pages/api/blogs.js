import { getBlogsByCategory } from "lib/api";

export default async (req, res) => {
  const offset = parseInt(req.query.offset || 0);
  const date = req.query.date || "desc";
  const category = req.query.category;

  const data = await getBlogsByCategory({ category, offset, date });
  res.status(200).json(data);
};
