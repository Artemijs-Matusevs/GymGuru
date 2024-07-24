import registerService from '../services/registerService.js';

const registerController = {
    
    //New local account
    newLocalUser: (req, res) => {
        if(registerService.newLocalUser(req.body) == "no match"){
            res.send("Passwords don't match");
        }else if(registerService.newLocalUser(req.body) == "user exists"){
            res.send("Email already in use");
        }else{
            res.send("account created");
        }
    }
}

//Exports
export default registerController;