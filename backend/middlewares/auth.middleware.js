import jwt from "jsonwebtoken"

function restrictValidUsersOnly(req,res,next){
    const token = req.cookies?.uid;

    if(!token)
    {
        return res.status(401).json(
            {
                error : "unauthorized user!!"
            }
        );
    }

    try{
        const user = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = user;
        next();
    }catch(err)
    {
        return res.status(401).json({
            error : "Invalid Token"
        });
    }
}

function optionalAuth(req, res, next) {
    const token = req.cookies?.uid;

    if (!token) {
        return next();
    }

    try {
        const user = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = user;
    } catch (err) {
        req.user = null;
    }

    next();
}

export default restrictValidUsersOnly;
export { optionalAuth };
