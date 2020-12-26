const User = require("../models/User");

var registriraj = (req, res) => {
    const {name, surname, email, password} = req.body;
    
    const newUser = new User({
        name,
        surname,
        email,
        password
    })

    newUser.save()
        .then(user => {
            console.log("Uspesno poslano ", user)                
        })
        .catch(err => console.log(err))
       
}

var getUser = (req, res) => {
    
    
    User.find().then(user => {
        
        res.send(user)
    })
}

module.exports = {
    registriraj, 
    getUser
}