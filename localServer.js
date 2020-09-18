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
