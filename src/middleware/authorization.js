function requireAuth(req, res, next) {    
    
    // get the authToken from the req
    const authToken = req.get('Authorization');
    let token = '';

    if(!authToken){
        return res  
            .status(401)
            .json({
                error: `Unauthorized Access`
            });
    }else{
        token = authToken.slice(`basic `.length, authToken.length);
    }
    
    // User Buffer.from to get the username and password
    const [tokenUsername, tokenPassword] = Buffer
        .from(token, 'base64')
        .toString()
        .split(':');

    
    // check if it exists , if not then throw an error
    // if it does, splice the basic and get the token
    if(!tokenUsername || !tokenPassword){
        return res
            .status(400)
            .json({
                error: `Bad request`
            })
    }

    // knexInstance for the database connection
    const db = req.app.get('db');
    return db('thingful_users')
        .where({ user_name: tokenUsername })
        .first()
        .then((user) => {
            if(!user){
                return res
                    .status(400)
                    .json({
                        error: `User does not exist`
                    });
            }

            req.user = user;
            next();
        })
    

    
    // if it does exists then matching password using the hash
    // if everything is good then req.user = user, next()

}

module.exports = {
    requireAuth,
}