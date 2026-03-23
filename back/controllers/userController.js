import argon2 from "argon2";
import jwt from "jsonwebtoken";

const signToken = (id) =>{
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
}

const sentTokenCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000,
    ),

    httpOnly: true,
  }

  res.cookie('jwt', token, cookieOptions);
}

export const signup = async (req, res, next) => {
  try {
    const newUser = req.body;
    const hash = await argon2.hash(newUser.password);

    newUser.password = hash;

    const createdUser = await createUser(newUser);

    if (!createdUser) {
      throw new AppError("User not created", 400);
    }

    createdUser.password = undefined;

    res.status(201).json({
      status: "success",
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        
        const user = await getUserByEmail(email);
        if (!user) {
            throw new AppError("Invalid user email or password", 400);
        }

        const passwordCorrect = argon2.verify(user.password, password);
        if (!passwordCorrect) {
            throw new AppError("Invalid user email or password", 400);
        }

        const token = signToken(user.id);
        sentTokenCookie(token, res);

        user.password = undefined

        res.status(200).json({
            status: "success",
            data: user,
        });
        
    } catch (error) {
        next(error);
    }
}

export const deleteMe = async (req, res, next) => {
    res.status(200).json({
      status: "success",
      data: "Successfully deleted account",
    });
};
