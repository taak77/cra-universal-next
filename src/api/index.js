export function getBootstrap() {
	return fetch('https://api.taoki.me/v1/location')
		.then(res => res.json());
}