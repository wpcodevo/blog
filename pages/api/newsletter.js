import axios from "axios";

const API_URL = process.env.API_URL;
const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
const FORM_ID = process.env.FORM_ID;

export default async (req, res) => {
  const { email } = JSON.parse(req.body);

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const data = { email, api_key: CONVERTKIT_API_KEY };
    const result = await fetch(`${API_URL}/forms/${FORM_ID}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status >= 400) {
      return res.status(400).json({
        message: "There was an error subscribing to the list!",
      });
    }
    return res.status(201).json({ error: null });
  } catch (error) {
    return res.status(500).json({
      error: error.message || error.toString(),
    });
  }
};
