// Setup the Stripe elements when the checkout page is updated.
window.document.title = 'Temp';

jQuery( document.body ).on( 'updated_checkout', function() {
	/*
	var stripe   = new Stripe( wc_payment_config.publishableKey, {
		stripeAccount: wc_payment_config.accountId
	} );
	var elements = stripe.elements();

	// Create a card element.
	var cardElement = elements.create( 'card', {
		hidePostalCode: true
	} );
	cardElement.mount( '#wc-payment-card-element' );

	// Update the validation state based on the element's state.
	cardElement.addEventListener( 'change', function(event) {
		var displayError = document.getElementById( 'wc-payment-errors' );
		if (event.error) {
			displayError.textContent = event.error.message;
		} else {
			displayError.textContent = '';
		}
	} );

	// Create payment method on submission.
	var paymentMethodGenerated;
	jQuery( 'form.checkout' ).on( 'checkout_place_order_woocommerce_payments', function() {
		// We'll resubmit the form after populating our payment method, so if this is the second time this event
		// is firing we should let the form submission happen.
		if ( paymentMethodGenerated ) {
			return;
		}

		stripe.createPaymentMethod( 'card', cardElement )
			.then( function( result ) {
				var paymentMethod = result.paymentMethod;
				var error = result.error;

				if ( error ) {
					throw error;
				}

				return paymentMethod;
			} )
			.then( function( paymentMethod ) {
				var id = paymentMethod.id;

				// Flag that the payment method has been successfully generated so that we can allow the form
				// submission next time.
				paymentMethodGenerated = true;

				// Populate form with the payment method.
				var paymentMethodInput   = document.getElementById( 'wc-payment-method' );
				paymentMethodInput.value = id;

				// Re-submit the form.
				jQuery( '.woocommerce-checkout' ).submit();
			} );

		// Prevent form submission so that we can fire it once a payment method has been generated.
		return false;
	} );
	 */

	const terminal = StripeTerminal.create({
		onFetchConnectionToken: fetchConnectionToken,
		onUnexpectedReaderDisconnect: ( e ) => console.log( e ),
		onConnectionStatusChange: ( e ) => console.log( e ),
		onPaymentStatusChange: ( e ) => console.log( e ),
	});

	console.log( terminal.getConnectionStatus() );
	const config = {
		simulated: false,
		location: "tml_DQW4IAKSsG3TJ9"
	};
	terminal.discoverReaders(config).then(function(discoverResult) {

		console.log(discoverResult);

		if (discoverResult.error) {
			console.log('Failed to discover: ', discoverResult.error);
		} else if (discoverResult.discoveredReaders.length === 0) {
			console.log('No available readers.');
		} else {
			// Just select the first reader here.
			var selectedReader = discoverResult.discoveredReaders[0];

			terminal.connectReader(selectedReader).then(function(connectResult) {
				if (connectResult.error) {
					console.log('Failed to connect: ', connectResult.error);
				} else {
					console.log('Connected to reader: ', connectResult.reader.label);

					terminal.setReaderDisplay({
						type: 'cart',
						cart: {
							line_items: [
								{
									description: "Beanie with Logo",
									amount: 1800,
									quantity: 1,
								},
								{
									description: "Cap",
									amount: 3200,
									quantity: 2,
								},
							],
							//tax: 100,
							total: 5000,
							currency: 'usd',
						},
					});
				}
			});
		}
	});

	function fetchConnectionToken() {
		// Your backend should call /v1/terminal/connection_tokens and return the JSON response from Stripe
		return fetch('index.php?rest_route=/wc/v3/payments/token', { method: 'GET' })
			.then(response => response.json())
			.then(data => data.secret );
	}
} );


