const userModel = require("../models/user_model");
const  config = require("../config/auth_key_config")
const bcrypt = require("bcryptjs");
const gettoken = require('jsonwebtoken')

//get user by id
exports.delete_user_by_id = async(req, res) =>{
  const { _id } = req.params;
  try {
    const getuser = await userModel.findByIdAndRemove(_id);
    res.status(200).json({ message: "user deleted!", _id: getuser });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

//delete id
exports.update_user = (req, res) =>{

  if(!req.body) {
      res.status(400).send("cannot update!")
      return;
  }

  //fetching selected user id
  const _id = req.params.id;
  const _body = req.body;
  userModel.findByIdAndUpdate(_id, _body) 
    .then(data => {
      if(!data) {
        res.status(404).send({ message: `cannot update user info with id=${_id}. please retry again`})
      } else 
      res.status(201).send({ message: "profile was updated successfully!."})
    })
    .catch(err => {
    res.status(500).send({ message: `error updating profile with id=${_id} ${err}`})
  })  
}

exports.signin = async(req, res) =>{
  User.findOne({
    username: req.body.username
})
.exec((err, user) => {
    if (!user){
        res.status(500).send({ message: "cannot find user!"});
        return;
    }

    if (err){
        return res.status(404).send({message: 'Error with authentication!'});
    }

    //compare paswords
    var isMatch = bcrypt.compareSync(req.body.password, user.password);

    if (!isMatch){
      return res.status(401).send({
        gettoken: null, message: "incorrect password!"
      });  
    }
    
    //generate token
    //token should last a duration of an hour.
    gettoken = jwt.sign({id: user.id }, config.secretKey, {
        expiresIn: 3600
    });

    // var authorities = [];

    return res.status(200).send({        
        username: user.username, email: user.email, id: user._id, accesstoken: gettoken });
  });
}


//get all
exports.get_users = async(res) =>{
  try {
    const users = await userModel.find();
    res.status(200).json({ message: users.message });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

//register users
exports.register = async (req, res) => {
  
  //validate fields prior to registration
  if(!req.body.password){
    res.status(400).json("cannot register without password")
    return
  } else {

  //hashing password as soon as punched in to the base
  const hash = bcrypt.hashSync(req.body.password, 10);

  try {
    const user = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

      const registeredUser = await user.save();

      res.status(201).json({ message: "user registered!", user: registeredUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

//delete users
exports.delete_users = async (req, res) => {
  try {
    const { body } = req.body;

    await userModel.deleteMany({ }, body);

    res.status(201).json({ message: 'users deleted!, 0 remaining registered users' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
