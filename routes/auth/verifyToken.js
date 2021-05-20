// FORMAT OF TOKEN
//Authorization: Bearer <access_token>

// verify Token
function verifyToken(req, res, next) {
  //Get the auth header value
  const bearerHeader = req.headers['authorization'];
  // check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    //split at the space & get token from array
    const bearerToken = bearerHeader.split(' ')[1];
    // set the token
    req.token = bearerToken;
    // next middleware
    next()

  } else {
    // forbidden
    // res.sendStatus(403);
    res.send('USER doesnot have an access_token: NOT LOGGED IN')
  }

}

module.exports = verifyToken;