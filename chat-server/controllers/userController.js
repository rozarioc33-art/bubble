import User from "../models/User.js";

export const getMe = (req, res) => {
    res.status(200).json(req.user);
}

export const updateMe = async (req, res) => {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(req.user._id, updates, {new: true}).select("-password");

    res.status(200).json(user);
}

export const getUsers = async (req, res) => {
    const users = await User.find({
        _id: {$ne: req.user._id}
    }).select("-password");

    res.status(200).json(users);
}