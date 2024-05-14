export const authorizeRoles = (...isAdmin)=> {
    return (req, res, next) => {
        if(!isAdmin.includes(req.user?.isAdmin==='admin' || '')){
            return res.status(403).json({
                message:"you are not authorized"
            })
        }
        next();
    }
}