const jwt = require("jsonwebtoken");
require("dotenv").config();
const TOKEN_HASH = process.env.JWT_SECRET_KEY;

const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if(authHeader == null) throw "No authorization header"
    const token = authHeader.split(" ")[1];
    console.log(token);
    const verified = await jwt.verify(token, TOKEN_HASH);
    if (verified) {
      //save client pubkey to response locals
      console.log("Token verified");
      res.locals.clientUsername = verified.username;
      next();
    } else {
      return res.status(401).send("Bad token");
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e: e });
  }
};

//some routes want to identify the client but can still be acessable without a token
const parseJWT = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if(authHeader == null) throw "No authorization header"
    const token = authHeader.split(" ")[1];

    const verified = await jwt.verify(token, TOKEN_HASH);
    if (verified) {
      //save client pubkey to response locals
      console.log("Token verified");
      res.locals.clientUsername = verified.username;
      next();
    } else {
      console.log("Token could not be verified by parse funciton");
      res.locals.clientUsername = undefined;
      next();
    }
  } catch (e) {
    return res.status(400).json({ e: e });
  }
};

module.exports = { verifyJWT, parseJWT };
