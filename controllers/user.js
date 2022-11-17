const User = require('../models/User')
const Deck = require('../models/Deck')

const getUser = async (req, res, next) => {
    console.log('req params', req.params)
    const { userID } = req.params
    const user = await User.findById(userID)

    return res.status(200).json({ user })
}
const getUserDecks = async (req, res, next) => {
    const { userID } = req.params

    const user = await User.findById(userID).populate('decks')

    return res.status(200).json({decks: user.decks})
}
const newUserDeck = async (req, res, next) => {
    const { userID } = req.params

    // create deck
    const newDeck = new Deck(req.body)

    // get user 
    const user = await User.findById(userID)

    // Assign user as a deck owner
    newDeck.owner = user

    // Save deck
    await newDeck.save()

    // ADd new deck to user deck array
    user.decks.push(newDeck._id)
    console.log('deck', newDeck)
    console.log('user', user)

    // Save user
    await user.save()

    return res.status(201).json({ deck: newDeck })
}
const index = async (req, res, next) => {
    const users = await User.find({})

    return res.status(200).json({ users })
}

const newUser = async (req, res, next) => {
    const newUser = new User(req.body)

    await newUser.save()

    return res.status(201).json({ user: newUser })
}
const updateUser = async (req, res, next) => {
    const { userID } = req.params

    const newUser = req.body

    await User.findByIdAndUpdate(userID, newUser)
    return res.status(200).json({ success: true })

}
const replaceUser = async (req, res, next) => {
    const { userID } = req.params

    const newUser = req.body

    await User.findByIdAndUpdate(userID, newUser)
    return res.status(200).json({ success: true })
}
module.exports = {
    getUser, index, newUser, updateUser, replaceUser, getUserDecks,
    newUserDeck
}