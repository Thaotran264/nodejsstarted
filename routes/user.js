const router = require('express-promise-router')()

const UserController = require('../controllers/user')

router.route('/')
    .get(UserController.index)
    .post(UserController.newUser)
router.route('/:userID')
    .get(UserController.getUser)
    .put(UserController.replaceUser)
    .patch(UserController.updateUser)
//put de thay the 
//patch de update

router.route('/:userID/decks')
    .get(UserController.getUserDecks)
    .post(UserController.newUserDeck)
module.exports = router