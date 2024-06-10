
export default async function getSubscription({
    vapidPublicKey='/api/push-msg/public-key'
}={}){

    let registration = await navigator.serviceWorker.ready
	let subscription = await registration.pushManager.getSubscription()

	// already have a subscription
	if( subscription ) return subscription

	// Get the server's public key
	vapidPublicKey = await fetch(vapidPublicKey).then(r=>r.text())
	// Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
	// const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

	return registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: vapidPublicKey//convertedVapidKey
	});
}