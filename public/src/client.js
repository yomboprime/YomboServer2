
// - Global variables -

// GUI

var gui = null;
var guiData = null;

var guiPassword = null;
var guiConnecting = null;

var canvas = null;

// Audio

var audioElement = null;


// Network

var peer = null;


// - Main client code -

init();



// - Functions -

function init() {

	//changeFavicon( "favicon.png" );

	guiData = {
		viewOptions: {
		},
		audioOptions: {
			audioEnabled: false,
			volume: 1
		},
		inputOptions: {
		},
		systemOptions: {
		}
	};

	audioElement = document.getElementById( "audioElement" );

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	canvas = createCanvas( 200, 200 );
	var ctx2d = canvas .getContext( "2d" );
	ctx2d.fillStyle = "blue";
	ctx2d.fillRect( 0, 0, 200, 200 );

	//container.appendChild( canvas );

	window.addEventListener( 'resize', onWindowResize, false );
	onWindowResize();

//	window.addEventListener( 'gamepadconnected', onGamepadConnected );
//	window.addEventListener( 'gamepaddisconnected', onGamepadDisconnected );

//	loadImages( function () {

	createGUIPassword();

}


function onWindowResize() {

	// Layout video image

	var width = window.innerWidth;
	var height = window.innerHeight;

	canvas.style.width = width + "px";
	canvas.style.height = height + "px";
	canvas.style.left = 0 + "px";
	canvas.style.top = 0 + "px";

	//clientWidth = width;
	//clientHeight = height;

}


function createGUI() {

}

function createGUIPassword() {

	if ( guiPassword ) {

		container.removeChild( guiPassword.domElement );
		guiPassword.destroy();

	}

	guiPassword = new dat.GUI( { hideable: false, autoPlace: false } );
	guiPassword.width = 400;
	//var viewOptions = guiPassword.addFolder( "View options" );
	guiPassword.add( { password: '' }, 'password' ).name( 'Password' ).onFinishChange( function ( value ) {

		container.removeChild( guiPassword.domElement );
		guiPassword.destroy();
		guiPassword = null;

		createGUIConnecting();

		initNetwork( value );

	} );

	container.appendChild( guiPassword.domElement );

}

function createGUIConnecting() {

	destroyGUIConnecting();

	guiConnecting = document.createElement( 'div' );

	guiConnecting.style.width = "400px";
	guiConnecting.style.height = "200px";
	guiConnecting.style.top = "0px";
	guiConnecting.style.left = "0px";
	guiConnecting.style.fontSize = "20pt";
	guiConnecting.style.backgroundColor = "black";
	guiConnecting.style.color = "white";
	guiConnecting.innerHTML = "Connecting...";

	container.appendChild( guiConnecting );

}

function destroyGUIConnecting() {

	if ( guiConnecting ) {

		container.removeChild( guiConnecting );
		guiConnecting = null;

	}

}

function createCanvas( width, height ) {

	var canvas = document.createElement( 'canvas' );
	canvas.width = width;
	canvas.height = height;

	return canvas;

}

function changeFavicon( src ) {

	// from http://stackoverflow.com/questions/260857/changing-website-favicon-dynamically
	var link = document.querySelector( "link[rel*='icon']" ) || document.createElement( 'link' );
	link.type = 'image/x-icon';
	link.rel = 'shortcut icon';
	link.href = src;
	document.getElementsByTagName( 'head' )[ 0 ].appendChild( link );

}

function initNetwork( password ) {

	console.log( "Connecting..." );

	peer = new SimplePeer( {
		trickle: false,
		config: {
			iceServers: [ { urls: 'stun:yomboserver2.glitch.me' } ],
			peerIdentity: password

			/*
			portRange: {
				min: 8100,
				max: 8200
			}*/
		}
	} );

	peer.on( 'connect', function ( err ) {

		console.log( "A WebRTC connection was just opened." );

		destroyGUIConnecting();

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

		if ( 'srcObject' in audioElement ) {

			audioElement.srcObject = stream;

		}
		else {

			audioElement.src = URL.createObjectURL( stream );

		}

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
