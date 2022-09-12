export default function fetchContractAddresses(): Promise<any> {
	return fetch('https://raw.githubusercontent.com/bipsea/constants/main/contractAddresses.json')
		.then((res) => res.json())
		.catch((err) => console.error(err));
}
