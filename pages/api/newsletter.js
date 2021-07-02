require("dotenv").config();
import axios from "axios";

function Req(email) {
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const DATACENTER = API_KEY.split("-")[1];
  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
  const data = {
    email_address: email,
    status: "subscribed",
  };
  const base64ApiKey = Buffer.from(`anystring:${API_KEY}`).toString("base64");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Auth ${base64ApiKey}`,
  };
  return {
    url,
    data,
    headers,
  };
}

export default async (req, res) => {
  const { email } = JSON.parse(req.body);

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const { url, data, headers } = Req(email);
    const result = await axios.post(url, data, { headers });
    return res.status(201).json({ error: null });
  } catch (error) {
    console.log(error);
  }
};
