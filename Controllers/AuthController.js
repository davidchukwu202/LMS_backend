const AuthService = require('../Services/AuthService.js');
const UserService = require("../Services/UserService.js");
const passport = require("passport");


class AuthController {
  async SignUp (req, res){
    try {
      const { email, password, username } = req.body;

      const result = await AuthService.signUp(email, password, username);
      if (result.token){
        res.cookie('token', result.token, {
          httpOnly: true, // Set to true for enhanced security;
        });

        return res.status(201).json({ message: "User signed up successfully", user:result.user });

      }
      return res.status(result.status).json({message: result.message});
    } catch (error) {
      // Handle errors
      console.error("Signup error:", error);
      res.status(500).json({ message: error.message? error.message : "An error occurred during signup" });      
    }
  };

  async  Login(req, res) {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const result = await AuthService.login(email, password);
  
      if (result.token) {
        // If a token is returned, set it as a cookie and send a success response
        res.cookie("token", result.token, {
          httpOnly: true, // Set to true for enhanced security
        });
  
        return res.status(200).json({ message: "User logged in successfully", success: true });
      } else {
        // If no token is returned, it indicates a login failure
        return res.status(result.status).json({ message: result.message, success: result.success });
      }
    } catch (error) {
      // Handle errors
      console.error("Login error:", error);
      res.status(500).json({ message: error.message ? error.message : "An error occurred during login" });
    }
  }
  
  async authHandle(req, res){

    const user = await UserService.findUser({ email: req.user._json.email })
    console.log(user);
    if (!user) {
      let result = AuthService.g_signUp(req.user._json.email, req.user._json.given_name);
      return res.status(201).json({ message: "User signed up successfully", user:result.user });
    }else{
      res.redirect('/display');
    }
  }

  async Logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
          console.log('Error while destroying session:', err);
      } else {
          req.logout(() => {
              console.log('You are logged out');
              res.redirect('/home'); // To be edited.
          });
      }
    });
  };
};


module.exports = new AuthController();









// const User = require("../Models/UserModel");
// const { createSecretToken } = require("../util/SecretToken");
// const bcrypt = require("bcryptjs");

// module.exports.Signup = async (req, res) => {
//   try {
//     const { email, password, username } = req.body;

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 12);

//     // Create a new user
//     const user = await User.create({ email, password: hashedPassword, username });

//     // Generate a JWT token
//     const token = createSecretToken(user._id);

//     // Set the token as a cookie
//     res.cookie("token", token, {
//       httpOnly: true, // Set to true for enhanced security
//     });

//     // Send a success response with the user details
//     res.status(201).json({ message: "User signed up successfully", user });
//   } catch (error) {
//     // Handle errors
//     console.error("Signup error:", error);
//     res.status(500).json({ message: "An error occurred during signup" });
//   }
// };


// module.exports.Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if email and password are provided
//     if (!email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Incorrect email or password' });
//     }

//     // Compare passwords
//     const auth = await bcrypt.compare(password, user.password);
//     if (!auth) {
//       return res.status(401).json({ message: 'Incorrect email or password' });
//     }

//     // Generate and set JWT token as a cookie
//     const token = createSecretToken(user._id);
//     res.cookie("token", token, {
//       httpOnly: true, // Set to true for enhanced security
//     });

//     // Send success response
//     res.status(200).json({ message: "User logged in successfully", success: true });
//   } catch (error) {
//     // Handle errors
//     console.error("Login error:", error);
//     res.status(500).json({ message: "An error occurred during login" });
//   }
// };
