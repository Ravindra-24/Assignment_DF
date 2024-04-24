import { User } from "../db/schema/User.js";
import {
  generateToken,
  verifyAuthToken,
} from "../utils/token.utils.js";
import { comparePassword, hashPassword } from "../utils/auth.utils.js";

const handleResponse = (res, status, message, data = null) => {
    return res.status(status).json({
      message,
      success: status >= 200 && status < 300,
      data,
    });
  };

const createUserToken = (user) => {
    return generateToken({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      profilePicture: user.profilePicture,
    });
  };

export const signup = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    let emailCase = email.toLowerCase();
    const emailId = await User.findOne({ emailCase});
    if (emailId) {
      return handleResponse(res, 400, "User with this email already exists");
    }
    await User.create({
      firstName,
      email: emailCase,
      password:hashedPassword,
    });

    return handleResponse(res, 201, "Signup successful");
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500, error.message);
  }
};

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;
    const emailCase = email.toLowerCase();
    const user = await User.findOne({ email:emailCase });

    if (!user) {
      return handleResponse(res, 400, "User with this email does not exist");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return handleResponse(res, 400, "Invalid credentials");
    }

    const token = createUserToken(user);

    return handleResponse(res, 201, "Login successful", {
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500, error.message);
  }
};

export const validate = async (req, res) => {
  try {
    const { token } = req.params;
    const payload = verifyAuthToken(token);
    if (!payload) {
      return handleResponse(res, 401, "Invalid or expired token");
    }

    const currentUser = await User.findById(payload.id);

    return handleResponse(res, 200, "User verified", {
      token,
      user: {
        id: currentUser._id,
        email: currentUser.email,
        firstName: currentUser.firstName,
        profilePicture: currentUser.profilePicture,
      },
    });
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500, error.message);
  }
};
