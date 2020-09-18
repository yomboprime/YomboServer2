
// - Requires -

var Peer;
var wrtc;

var network = require( './server/network.js' );
//var sendToClientsJSON = network.sendToClientsJSON;
//var sendToClientsJSONBinary = network.sendToClientsJSONBinary;

var fs = require( 'fs' );


// - Global variables -

// App

var app = null;
var httpServer = null;
//var wss = null;
var peer = null;

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

//	connectVideoProcess();

//	connectAudioProcess();

	startServer( 8080/*process.env.PORT*/, function () {

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

function connectRTC() {

	// Start peer to send audio stream over WebRTC
	peer = new Peer( {
		initiator: true,
		trickle: false,
		config: {
			//iceServers: [ { urls: 'stun:stun.l.google.com:19302' } ],
			/*
			portRange: {
				min: 8100,
				max: 8200
			}*/
		},

		wrtc: wrtc
	} );

	//peer.addStream( micMediaStream );

	peer.on( 'connect', function () {

		console.log( "RTC Peer connected" );

	} );

	// WebRTC signaling
// TODO COMENTAR
	peer.on( 'signal', function ( signal ) {

		console.log( "**** RTC signal: " + JSON.stringify( signal ) + "************" );

		//client.socket.send( JSON.stringify( signal ), function nop () {} );

	} );

	peer.on( 'error', function ( error ) {

		console.log( "Error connecting via RTC to client: " + error );

	} );

	peer.on( 'close', function ( signal ) {

		peer.destroy();
		peer = null;

	} );

	peer.on( 'data', function ( message) {

		onClientRTCDataMessage( client, message );

	} );
}

function disconnectRTC() {

	if ( peer ) peer.destroy();
	peer = null;

}

function onClientRTCDataMessage( client, message ) {

	console.log( "RTC Client Data Message: " + message );

}
