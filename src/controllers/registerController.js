import registerService from '../services/registerService.js';

const registerController = {
    
    //New local account
    newLocalUser: (req, res) => {
        registerService.newLocalUser(req.body);   
    }
}

//Exports
export default registerController;