const router = require('express-promise-router')()

const DeckController = require('../controllers/deck')

router.route('/')
    .get(DeckController.index)
    .post(DeckController.newDeck)
router.route('/:deckID')
    .get(DeckController.getDeck)
    .put(DeckController.replaceDeck)
    .patch(DeckController.updateDeck)
    .delete(DeckController.deleteDeck)
module.exports = router