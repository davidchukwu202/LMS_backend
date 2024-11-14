// const { Signup,Login } = require("../Controllers/AuthController");
const passport = require("passport");
const AuthController = require("../Controllers/AuthController");
const router = require("express").Router();
const {userVerify} = require("../Middlewares/AuthMiddleware");

router.get('/display', async (req, res) => {
    console.log('You are logged in');
    return res.status(200).json({data: req.user});
}) // Temporaily.
router.post("/signup", AuthController.SignUp);
router.post("/login", AuthController.Login);
router.post("/", userVerify);
router.get("/google", passport.authenticate('google', {
    scope: ['email', 'profile']
}
));
router.get("/auth/google/auth-handle", passport.authenticate('google', {failureRedirect: '/failed',}), AuthController.authHandle);
router.get("/logout", AuthController.Logout)
router.get("/failed", (req, res) => {
    console.log('User is not authenticated');
    res.send("Failed")
})


module.exports = router;