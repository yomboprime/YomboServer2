
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

//	connectVideoProcess();

//	connectAudioProcess();

	webrtcserver.startServer( 8080/*process.env.PORT*/, function () {

		console.log( "Server started." );

		connectRTC( process.env.SECRET );

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

function connectRTC( password ) {

	// Start peer to send audio stream over WebRTC
	peer = new Peer( {
		initiator: true,
		trickle: false,
		config: {
			iceServers: [ { urls: 'stun:glitch.com/YomboServer2:8080' } ],
			peerIdentity: password
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

	peer.on( 'error', function ( err ) {

		alert( "WebRTC connection Error: " + err );

	} );

	peer.on( 'close', function ( err ) {

		alert( "WebRTC connection Closed." );

	} );

	// TODO comment
	peer.on( 'signal', function ( signal ) {

		console.log( "WebRTC signal received: " + signal );

	} );

	peer.on( 'stream', function ( stream ) {

		console.log( "WebRTC stream received. " );

		/*
		if ( 'srcObject' in audioElement ) {

			audioElement.srcObject = stream;

		}
		else {

			audioElement.src = URL.createObjectURL( stream );

		}
		*/

	} );

	peer.on( 'data', function ( data ) {

		if ( data instanceof ArrayBuffer ) {

			// Binary message

			console.log( "WebRTC binary data message received." );

		}
		else {

			// JSON text message

			console.log( "WebRTC string data message received: " + data );

			//var dataJSON = JSON.parse( data );

		}

	} );

}

function disconnectRTC() {

	if ( peer ) peer.destroy();
	peer = null;

}
