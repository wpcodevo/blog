import { getBlogsByQuery } from "lib/api";

export default async (req, res) => {
  const offset = parseInt(req.query.offset || 0);
  const date = req.query.date || "desc";
  const { q } = req.query;
  const query = q;

  const data = await getBlogsByQuery({ query, offset, date });
  res.status(200).json(data);
};
