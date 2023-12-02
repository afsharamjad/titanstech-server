const UserModel = require("../../models/User");
const {
  hashedPass,
  comparePassword,
  createToken,
} = require("../../utils/utils");

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userEmailExist = await UserModel.findOne({ email });

    if (userEmailExist) {
      return res.status(402).json({
        error: { status: 402, message: "one user by same email existed" },
      });
    }

    //hashed password
    const hashedPassword = await hashedPass(password);

    //create a user
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ status: 201, message: "register success" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email })
      .select("+password")
      .populate({
        path: "friends",
        select: "firstName lastName location profileUrl -password",
      });
    console.log(user);

    if (!user) return res.status(400).json({ msg: "User does not exist. " });
    const isMatchPassword = await comparePassword(password, user.password);
    if (!isMatchPassword)
      return res.status(400).json({ msg: "Password not correct." });

    const token = createToken(user._id);

    user.password = undefined;

    res.status(200).json({ token, user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
