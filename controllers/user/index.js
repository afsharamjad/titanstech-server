const UserModel = require("../../models/User");
const { createToken } = require("../../utils/utils");

const getUser = async (req, res, next) => {
  const { userId } = req.body.user;
  const { id } = req.params;
  console.log("haya");

  try {
    const user = await UserModel.findById(id ?? userId).populate({
      path: "friends",
      select: "-password",
    });

    if (!user) {
      return res.status(404).json({
        error: { status: 402, message: "user not found" },
      });
    }

    user.password = undefined;
    res.status(200).json({ message: "success", user });
  } catch (error) {
    res.status(404).json({
      error: { status: 402, message: "user not found" },
    });
  }
};
const updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, location, profession, profileUrl } = req.body;

    const { userId } = req.body.user;
    const updateUser = {
      firstName,
      lastName,
      location,
      profileUrl,
      profession,
      _id: userId,
    };
    const user = await UserModel.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });
    await user.populate({ path: "friends", select: "-password" });
    const token = createToken(user?._id);
    user.password = undefined;
    res.status(200).json({
      sucess: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getUser,
  updateUser,
};
