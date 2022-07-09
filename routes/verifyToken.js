const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
   const authHeader = req.headers.token;

   if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(
         token,
         process.env.JWT_SECRET,
         (error, user) => {
            if (error) {
               return res.status(403).json("Token is not valid!");
            }

            req.user = user;
            next();
         }
      );
      
   } else {
      return res.status(401).json("You are not authenticated!");
   }
};

const verifyTokenAndAuthorization = (req, res, next) => {
   verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
         next();

      } else {
         res.status(403).json("403 - Forbidden Error");
      }
   });
};

const verifyTokenAndAdmin = (req, res, next) => {
   verifyToken(req, res, () => {
      if ( req.user.isAdmin ) {
         next();

      } else {
         res.status(403).json("403 - Forbidden Error");
      }
   });
};

module.exports = {
   verifyToken,
   verifyTokenAndAuthorization,
   verifyTokenAndAdmin
};