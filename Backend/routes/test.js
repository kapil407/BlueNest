// import express from "express";
// import nodemailer from "nodemailer";
//     import dotenv from "dotenv";
//     dotenv.config();

// const Mailrouter = express.Router();

// const transport = nodemailer.createTransport({
//     host:   "smtp-relay.brevo.com",
//     port:   587,
//     secure: false,
//     auth: {
//         user: process.env.BREVO_USER,
//         pass: process.env.BREVO_PASS,
//     },
// });

// Mailrouter.get("/test-mail", async (req, res) => {
//     try {
//         const info = await transport.sendMail({
//             from:    "kapilkeer1998@gmail.com",
//             to:      "kapilkeer1998@gmail.com",
//             subject: "Brevo Test",
//             text:    "Hello from Brevo",
//         });

//         console.log(info);
//         res.json({ success: true, info });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// });

// export default Mailrouter;