const jwt = require('jsonwebtoken');
// create user
function validateToken(req, res, next) {
    const token = req.headers.authorization;
    const tokenParts=token.split(' ');
    
    if (!tokenParts[1]) {
            return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(tokenParts[1], "kjsduiewogtrre", (err, decoded) => {
    if (err) {
            return res.status(403).json({message: 'Permission Denied'});
    }
    // If the token is valid, save the decoded information for later use
    req.user = decoded;
    next();
    });
}



async function requireRoles(role) {
    return (req, res, next) => {
        try {

            const userRole = req.user.role; // Assuming you saved the user's role in req.user
            if (role.includes(userRole)) {
                res.status(403).json(userRole)
            // User has one of the required roles, so allow access
            next();
            } else {
            // User does not have any of the required roles, so send a forbidden response
            res.status(403).json({ message: 'Permission denied' });
            }
        } catch (error) {
            res.status(403).json({ error });
        }
    };
    
}
module.exports = {validateToken,requireRoles};