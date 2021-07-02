require("dotenv").config();
const nodemailer = require("nodemailer");
import validate from "deep-email-validator";

const password = process.env.PASSWORD;
console.log(password);

export default async function contact(req, res) {
  const { name, email, message } = JSON.parse(req.body);
  console.log(name, email, message);

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "edemnextjs@gmail.com",
      pass: password,
    },
    secure: true,
  });

  const mailData = {
    from: email,
    to: "edemnextjs@gmail.com",
    subject: `Message From ${name}`,
    text: message,
    html: `<div>${message}</div><p>Sent from:
    ${email}</p>`,
  };

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  let response = await validate(email);

  if (response.valid === false) {
    return res.status(401).json({
      message: "Please enter a valid email address",
    });
  }

  transporter.sendMail(mailData, function (err, info) {
    if (err) res.status(500).json(err);
  });
  res.status(200).send("It worked");
}
