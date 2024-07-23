const registerController = {
    
    //New local account
    newLocalUser: (req, res) => {
        console.log(req.body.full_name);
    }
}

//Exports
export default registerController;