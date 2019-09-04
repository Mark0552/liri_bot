require("dotenv").config();



// variables
var command = process.argv[2];
var argument = process.argv[3];
var request = require('request')
var keys = require('./keys.js');
var bandsintown = require('bandsintown')("codingbootcamp");
var moment = require('moment');
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");


function spotifySong() {
    if (argument === undefined) {
        argument = "crazy train"
    }
    console.log('spotify this song: ' + argument);
    spotify.search({
        type: 'track',
        query: argument,
        limit: 1,
    }, function (err, data) {
        if (err) {
            console.log('Error occured: ' + err);
        }
        music = data.tracks.items[0];
        console.log(
            "\nSong: " + music.name +
            "\nAlbum: " + music.album.name +
            "\nArtist: " + music.album.artists[0].name +
            "\nSong Sample: " + music.preview_url
        )
    }
    )
};

function movieThis() {
    if (argument === undefined) {
        argument = "Good Will Hunting"
    }
    console.log('movie this: ' + argument);

    axios.get("http://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=trilogy").then(
        function (response) {


            console.log("\nTitle: " + response.data.Title +
                "\nRelease Year: " + response.data.Year +
                "\nIMDB Rating: " + response.data.imdbRating +
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                "\nOrigin Country: " + response.data.Country +
                "\nAvailable Languages: " + response.data.Language +
                "\nPlot: " + response.data.Plot +
                "\nActors: " + response.data.Actors
            );
        }
    )
}


// function concertThis() {
//     bandsintown.getArtistEventList(argument).then(function (events) {

//     axios.get("https://rest.bandsintown.com/artists/" + argument + "/events?app_id=" + keys.bands.id).then(
//         function (response) {

//             console.log(
//                 "\nBand: " + argument +
//                 "\nVenue Name: " + events[0].venue.name  +
//                 "\nLocation: " + events[0].formatted_location +
//                 "\nDate: " + moment(events[0].datetime).format('MM/DD/YYY')
//             ) 
//         }
//     )

// });

function doWhatItSays() {
        console.log("spotifying: " + whatItSaysArgument);
        argument = whatItSaysArgument;
        spotifySong(argument);
    
};

if (command === "spotify-this-song") {
    if (process.argv[3] === undefined) {
        argument = `"Crazy Train`
    }
    spotifySong();
}
else if (command === "movie-this") {
    movieThis();
}
// else if (command === "concert-this") {
//     concertThis();
// }
else if (command === "do-what-it-says") {
    console.log('do what it says is activated')

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            logOutput.error(err);
        } else {
            var randomArray = data.split(",");

            action = randomArray[0];
            whatItSaysArgument = randomArray[1];

            console.log("randomArray: " + randomArray);
            console.log("action: " + action)
            console.log("argument" + whatItSaysArgument);

            doWhatItSays(action, whatItSaysArgument)
        }
    });

}

"https://rest.bandsintown.com/artists/" + argument + "/events?app_id=" + keys.bands.id