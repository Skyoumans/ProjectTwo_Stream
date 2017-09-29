const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema skeletons for communication to the seeds.js file
const ReviewSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    }
})

const WishlistSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
})

const MovieSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: false,
    },
    releaseDate: {
        type: String,
        required: true
    },
    leadActor: {
        type: String,
        required: false
    },
    rentalPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [ReviewSchema]
})

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    favoriteMovie: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    wishlist: [WishlistSchema]
})

//Create models for each Schema
const ReviewModel = mongoose.model('Review', ReviewSchema)
const WishlistModel = mongoose.model('Wishlist', WishlistSchema)
const MovieModel = mongoose.model('Movie', MovieSchema)
const UserModel = mongoose.model('User', UserSchema)

//Export the models so they can be used in other locations
module.exports = {
    ReviewModel: ReviewModel,
    WishlistModel: WishlistModel,
    MovieModel: MovieModel,
    UserModel: UserModel
}