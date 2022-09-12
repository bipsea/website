export default function fetchAbi(): Promise<any> {
	return fetch('https://raw.githubusercontent.com/bipsea/constants/main/abi.json')
		.then((res) => res.json())
		.catch((err) => console.error(err));
}
