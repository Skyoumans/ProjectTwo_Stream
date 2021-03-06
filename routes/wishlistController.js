var express = require('express');
var router = express.Router({mergeParams: true });

const Schema = require('../db/schema.js');
const UserModel = Schema.UserModel;

// Index Wishlist Route
router.get('/', (req, res) => {
    const userId = req.params.userId
    UserModel.findById(userId)
        .then((user) => {
            res.render('wishlist/index', {
                user: user
            })
        })
})

// New Wishlist Route
router.get('/new', (req, res) => {
    const userId = req.params.userId
    res.render('wishlist/new', {
        userId: userId
    })
})

//Create Wishlist Route
router.post('/', (req, res) => {
    const userId = req.params.userId
    const newWishlist = req.body
    UserModel.findById(userId)
        .then((user) => {
            user.wishlist.push(newWishlist)
            return user.save()
        })
        .then((user) => {
            res.redirect(`/users/${userId}/wishlists`)
        })
        .catch((error) => {
            res.render('error')
        })
})


// Delete Wishlist Route
router.get('/:wishlistId/delete', (req, res) => {
    const userId = req.params.userId
    const wishlistId = req.params.wishlistId
    UserModel.findById(userId)
    .then((user) => {
        user.wishlist.id(wishlistId).remove()
        return user.save()
        })
        .then(() => {
            res.redirect(`/users/${userId}/wishlists`)
        })
        .catch((error) => {
            res.render('error')
        })
})

module.exports = router