import jwt from "jsonwebtoken"

export const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn : "6d"
    });
    res.cookie("jwt",token,{
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
        sameSite : "none",
        secure : process.env.NODE_ENV === "production"
    })
    return token;
}