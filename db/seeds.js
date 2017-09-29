require('dotenv').config();

// DB setup
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;
// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});
// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("Connected to MongoDB!");
});

// Pull in Models from the `schema.js`
var Schema = require("./schema.js");

const MovieModel = Schema.MovieModel;
const UserModel = Schema.UserModel;

//Delete all models from the database

MovieModel.remove({}, (err) => {
    console.log(err)
});
UserModel.remove({}, (err) => {
    console.log(err)
});

// Create some filler Movies and Users
const goonies = new MovieModel({ title: 'The Goonies', poster: 'https://i.imgur.com/qlHbEvc.jpg', releaseDate: 'June 7, 1985', leadActor: 'Sean Astin', rentalPrice: 2.99, description: `In order to save their home from foreclosure, a group of misfits set out to find a pirate's ancient valuable treasure.`})
// © http://www.imdb.com/title/tt0089218/
const theDarkKnight = new MovieModel({ title: 'The Dark Knight', poster: 'https://i.imgur.com/x54TAr1.jpg', releaseDate: 'July 18, 2008', leadActor: 'Christian Bale, Heath Ledger', rentalPrice: 3.99, description: `When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.`})
// © http://www.imdb.com/title/tt0468569/
const moana = new MovieModel({ title: 'Moana', poster: 'https://i.imgur.com/fCqtdbB.jpg', releaseDate: 'November 23, 2016', leadActor: `Auli'i Cravalho, Dwayne Johnson`, rentalPrice: 5.99, description: `In Ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches Moana's island, she answers the Ocean's call to seek out the Demigod to set things right.`})
// © http://www.imdb.com/title/tt3521164/

const skylar = new UserModel({ name: `Skylar`, username: 'Skyoumans93', password: 'BornThisWay93', favoriteMovie: 'The Dark Knight', bio: `I'm just a junior web developer living in Atlanta, Ga, trying to make a living making web applications.`, status: 'VIP', image: 'https://i.imgur.com/aNt2kxd.jpg'})
const jason = new UserModel({ name: `Jason`, username: 'Jason099', password: 'HiWireIT', favoriteMovie: 'Sliding Doors', bio: `I'm just me, an entrepreneur living in Atlanta, Georgia. I love movies, computers, and enjoying the company of friends.`, status: 'VIP', image: 'https://i.imgur.com/ERpczVVt.jpg'})
const kevin = new UserModel({ name: `Kevin`, username: 'MovieMedic1', password: 'ZeldaIsLife', favoriteMovie: 'The Goonies', bio: `I'm a easy going guy who loves movies and moved to Atlanta from Orlando. I work in a movie theater, so my love of movies is justified.`, status: 'VIP', image: 'https://i.imgur.com/D5MlzoQt.jpg'})

const users = [skylar, jason, kevin]
const movies = [goonies, theDarkKnight, moana]

users.forEach((user) => {
    user.save()
        .then((user) => {
            console.log(`${user.name} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
})

movies.forEach((movie) => {
    movie.save()
        .then((movie) => {
            console.log(`${movie.title} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
})
// Disconnect from the DB
db.close();