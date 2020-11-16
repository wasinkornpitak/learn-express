const express = require('express');
const router = express.Router();
const users = require('../../Users');
const uuid = require('uuid');


//Route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get('/', (req, res) => res.json(users));

//Get user
router.get('/:id', (req, res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));
    if(found){
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg : `No user ${req.params.id}`});
    }
});

//Create user
router.post('/', (req, res) => {
    // return res.status(200).json({
    //     user: req.body
    // });
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }
    if(!newUser.name || !newUser.email){
        return res.status(400).json({msg : 'Pls input name'});
    }

    users.push(newUser);
    res.json(users);
    // res.redirect('/');

});

//update user
router.put('/:id', (req, res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));
    if(found){
        const updUser = req.body;
        users.forEach(user => {
            if(user.id === parseInt(req.params.id)){
                user.name = updUser.name ? updUser.name : user.name;
                user.email = updUser.email ? updUser.email : user.email;
                res.json({msg : 'User updated', user});
            }
        });
    }else{
        res.status(400).json({msg : `No user ${req.params.id}`});
    }
});

//Delete user
router.delete('/:id', (req, res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));
    if(found){
        res.json({
            msg : 'User deleted',
            users : users.filter(user => user.id !== parseInt(req.params.id))
        });
        
    }else{
        res.status(400).json({msg : `No user ${req.params.id}`});
    }
});

module.exports = router;