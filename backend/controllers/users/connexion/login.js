const HttpError = require('../../../shared/http-error');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const db = require('../../../db');


// let adresse;
// let superUser;
let userId;
let userData;
let pwdVerify;


// const createToken = (userData) => {
//     return jwt.sign(
//       {
//         userId: userData
//       }
//     , process.env.JWT, { expiresIn: '1h' });
//   };



const login = async (req, res, next) => {
    // const { pseudo, password } = req.body;
    const password = req.body.password;
    const pseudo = req.body.pseudo;
  // console.log(req.body);

    try{
      pwdVerify = await db.getDb().collection('users').findOne( { pseudo: pseudo } )
      .then(userDoc => {
          userData = userDoc;
          return bcrypt.compare(password, userDoc.password)
      });
    }catch(err){
      console.log(err);
      const error = new HttpError('Utilisateur inexistant.', 500);
      return next(error);
    }

    if(!pwdVerify){
      const error = new HttpError('Mot de passe incorrect.', 500);
      return next(error);
    }else{
      userId = userData.pseudo;
      // adresse = userData.adresse.find(element => element.principale);
      // superUser = userData.superUser;

      res.status(200).json({
        // token: createToken(userId),
        userId: userId,
        // email: email,
        // superUser: superUser,
        // adresse : adresse
      });
    }
        
};
    

exports.login = login;
