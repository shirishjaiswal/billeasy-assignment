import * as userService from "../service/userService.js";

export const signup = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    await userService.signup(email, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const result = await userService.login(email, password);
    res.status(200).json({ user: result.user, token: result.token });
  } catch (error) {
    next(error);
  }
};
