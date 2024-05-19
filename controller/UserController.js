const nodemailer = require("nodemailer");
const User = require("../models/user");

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Check password
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }
    res.status(200).json({
      message: "Login successful",
      data: { username: user.username, email: email },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

//register user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    await User.create({
      username,
      email,
      password,
      umur,
      domisili
    });
    res.status(201).json({
      message: "User created successfully",
      data: { username: user.username, email: email },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

// Function to find all users
exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Function to generate a random 8-digit code
function generateRandomCode() {
  return Math.floor(10000000 + Math.random() * 90000000);
}

// Function to send email
exports.sendEmail = async (req, res) => {
  try {
    const { userEmail, name } = req.body;

    // Generate a random 8-digit code
    const verificationCode = generateRandomCode();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "finavalenn1402@gmail.com",
        pass: "yvdf loyg xgmz nwll",
      },
    });

    // Construct the email message
    const message = `Email Anda sudah terdaftar sebagai mitra. Silahkan login menggunakan email dan kode verifikasi dibawah ini:\n\nEmail: ${userEmail}\nKode: ${verificationCode}`;

    const mailOptions = {
      from: "finavalenn1402@gmail.com",
      to: userEmail,
      subject: "Selamat datang mitra kami",
      text: message,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Save user to the database
    await User.create({
      username: name,
      email: userEmail,
      password: verificationCode,
    });

    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
};
