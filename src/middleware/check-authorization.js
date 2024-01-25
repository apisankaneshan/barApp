const jwt = require("jsonwebtoken");

const checkAdminAuth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        userRole = decoded.role;
        if(userRole == 'ADMIN'){
            console.log(`user role: ${userRole} \n requiredRole: ${req.requiredRole}`);
            next();
        }
        else{
            return res.status(401).json({
                message: "Authorization Failed. Please sign in."
            });
        }
    } catch(error){
        return res.status(401).json({
            message: "Authorization Failed. Please sign in."
        });
    }
};

const checkBasicAuth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        userRole = decoded.role;
        if(userRole == 'BASIC'){
            console.log(`user role: ${userRole} \n requiredRole: ${req.requiredRole}`);
            next();
        }
        else{
            return res.status(401).json({
                message: "Authorization Failed. Please sign in."
            });
        }
    } catch(error){
        return res.status(401).json({
            message: "Authorization Failed. Please sign in."
        });
    }
};

const checkManagerAuth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        userRole = decoded.role;
        if(userRole == 'MANAGER'){
            console.log(`user role: ${userRole} \n requiredRole: ${req.requiredRole}`);
            next();
        }
        else{
            return res.status(401).json({
                message: "Authorization Failed. Please sign in."
            });
        }
    } catch(error){
        return res.status(401).json({
            message: "Authorization Failed. Please sign in."
        });
    }
};



module.exports = {
    checkAdminAuth,
    checkBasicAuth,
    checkManagerAuth
}