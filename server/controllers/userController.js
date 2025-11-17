import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.phone = req.body.phone || user.phone;
  user.email = req.body.email || user.email;
  user.address = req.body.address || user.address;

  const updatedUser = await user.save();
  res.json(updatedUser);
};

export const deleteUserAccount = async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ message: "Account deleted successfully" });
};
