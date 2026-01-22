const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post("/send-bill", async (req, res) => {
  const { to, totalBill, tip, perPerson, people } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "💸 SplitKare - Bill Summary",
      html: `
        <h2>SplitKare Bill Summary</h2>
        <p><b>Total Bill:</b> ₹${totalBill}</p>
        <p><b>Tip:</b> ₹${tip}</p>
        <p><b>People:</b> ${people}</p>
        <p><b>Per Person:</b> ₹${perPerson}</p>
        <hr/>
        <p>Thanks for using SplitKare 😊</p>
      `
    });

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Email failed" });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});

