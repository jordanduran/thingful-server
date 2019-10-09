function requireAuth(req, res, next) {    
    
    console.log(`Entered authorization`);
    console.log(req.get('Authorization'));
    next();

}

module.exports = {
    requireAuth,
}