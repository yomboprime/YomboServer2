
// - Requires -

const webrtcserver = require( './server/webrtcserver.js' );
//const sendToClientsJSON = webrtcserver.sendToClientsJSON;
//const sendToClientsJSONBinary = webrtcserver.sendToClientsJSONBinary;
const wrtc = require( 'wrtc' );
const Peer = require( 'simple-peer' );
const fs = require( 'fs' );


// - Global variables -

// App

var isAppEnding = false;

// Audio

var audioConnected = false;
var micAudioSource = null;
var micMediaStreamTrack = null;
var micMediaStream = null;


// - Main code -

initServer();

// - End of main code -


// - Functions -

function initServer() {

	process.on( "SIGINT", function() {

		console.log( "  SIGINT Signal Received, shutting down" );

		beginAppTermination();

	} );

	if ( ! process.env.SECRET ) process.env.SECRET = "abcd";
	if ( ! process.env.PORT ) process.env.PORT = 8080;

//	connectVideoProcess();

//	connectAudioProcess();

	webrtcserver.startServer( process.env.PORT, process.env.SECRET, function () {

		console.log( "Server started." );

	} );

}

function beginAppTermination() {
/*
	if ( videoConnected ) {

		isAppEnding = true;
		videoIsValid = false;

		disconnectVideoProcess();

	}
	else {
*/
		finish();

//	}

}

function finish() {
/*
	disconnectSerial( function () {

		closeFilesSaveToDisk();
*/
		console.log( "YomboServer2 terminated successfully. Have a nice day." );

		process.exit( 0 );
/*
	} );
*/
}
