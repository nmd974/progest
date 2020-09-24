const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../../db');
const HttpError = require('../../../shared/http-error');
const mongodb = require('mongodb');


const createToken = (userData) => {
  return jwt.sign(
    {
      id: userData
    }
    , "ljkhslkdjfdfhsdlkjfsdh", { expiresIn: '24h' });
};

const signup = async (req, res, next) => {

const id = new mongodb.ObjectID;
  const { pseudo, password } = req.body;


  let existingPseudo;

  try {
    existingPseudo = await db.getDb().collection('users').findOne({ pseudo: pseudo });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Pseudo déjà existant dans la base.',
      500
    );
    return next(error);
  }

  if (existingPseudo) {


    const error = new HttpError(
      'Pseudo déjà existant dans la base de données.',
      500
    );
    return next(error);
  }


  let hashedPW;
  try {
    hashedPW = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Impossible de créer le nouveau compte utilisateur.',
      500
    );
    return next(error);
  }

  let token;
  token = createToken(id);
  console.log(token);
  
  try {
    db.getDb()
      .collection('users')
      .insertOne(
        {
          _id: id,
          pseudo: pseudo, 
          password: hashedPW
        }
      )
//       .then(result => {
//         //   console.log(result);
//         res.status(201).json({
//         // token: createToken(id),
//             //token : jwt.sign({id: id}, "ljkhslkdjfdfhsdlkjfsdh", { expiresIn: '24h' }),
// token: token,
//           userId: pseudo
//         });
//         console.log(token)
//       })
    //   .catch(err => {
    //       console.log(err);
    //   })
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Ajout dans la base de donnée impossible.',
      500
    );
    return next(error);
  };

  res
    .status(201)
    .json({ userId: id, token: token });
}

exports.signup = signup;

