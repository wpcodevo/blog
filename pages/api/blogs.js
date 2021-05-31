import { getPaginatedBlogs } from "lib/api";

export default async (req, res) => {
  const offset = parseInt(req.query.offset || 0);
  const date = req.query.date || "desc";

  const data = await getPaginatedBlogs({ offset, date });
  res.status(200).json(data);
};
