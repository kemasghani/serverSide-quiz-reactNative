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
      data: { id: user._id, username: user.username, email: email },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

//register user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, umur, domisili } = req.body;

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password,
      umur,
      domisili,
    });

    res.status(201).json({
      message: "User created successfully",
      data: { username: newUser.username, email: email },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

function generateRandomCode() {
  return Math.floor(1000 + Math.random() * 9000);
}
// Function to send email
exports.sendOtpToEmail = async (req, res) => {
  try {
    const { email } = req.body;
    // Find the user with the provided email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "Email tidak ditemukan" });
    }
    // Generate a random 8-digit code
    const verificationCode = generateRandomCode();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kemasghani123@gmail.com",
        pass: "axdo pzzd hkrc hfrl",
      },
    });

    // Construct the email message
    const message = `SMARTA\n\n\n\Jangan berikan kode OTP kepada siapapun\n\Kode OTP: ${verificationCode}`;

    const mailOptions = {
      from: "kemasghani123@gmail.com",
      to: email,
      subject: "Kode OTP",
      text: message,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);

    // Update the user's data with the OTP
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { otp: verificationCode },
      { new: true }
    );

    res.status(200).json({ message: "Email sent successfully", updatedUser });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
};

exports.submitOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user's OTP matches the provided OTP
    if (user.otp !== otp) {
      return res.status(401).json({ error: "Kode OTP salah" });
    }

    // OTP is valid, you can proceed with further actions
    // For example, reset the user's password or perform any other operation

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error submitting OTP:", error);
    res.status(500).json({ error: "Error submitting OTP" });
  }
};

exports.changePass = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Error changing password" });
  }
};

//update user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email } = req.body;

    // Check if the edited email already exists in the database
    const existingUser = await User.findOne({ email: email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

//find by id
exports.findUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.find({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res
      .status(500)
      .json({ error: "Internal server error while retrieving user" });
  }
};

const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

exports.uploadAvatar = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Cloudinary URL
    const avatarUrl = req.file.path;

    // Update user's avatar field with Cloudinary URL
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Avatar uploaded successfully", user });
  } catch (error) {
    console.error("Error uploading avatar", error);
    res.status(500).json({ message: "Error uploading avatar", error });
  }
};
