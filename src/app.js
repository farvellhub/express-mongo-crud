const path = require( "path" );
const express = require( "express" );
const morgan = require( "morgan" );
const mongoose = require( "mongoose" );

const app = express();

// Connecting to db
mongoose.connect( "mongodb://localhost/crud-mongo" )
    .then( db => console.log( "db conectada" ))
    .catch( err => console.log( err ));

// importing routes
const indexRoutes = require( "./routes/index" );

// variables
app.set( "port", process.env.PORT || 3000 );
app.set( "views", path.join( __dirname, "views" ));
app.set( "view engine", "ejs" );

// middlewares
app.use( morgan( "dev" ));
app.use( express.urlencoded({
    extended: false
}));

// routes
app.use( "/", indexRoutes );

app.listen( app.get( "port" ), () => {
    console.log( `Server on port ${ app.get( "port" ) }` );
});