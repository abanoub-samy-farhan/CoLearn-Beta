exports.authMiddleware = function (req, res, next){
    if(!req.cookies['session_id'])
    {
        res.status(401).json({message: "The user is not authorized"})
    }
    else
    {
        next();
    }
}