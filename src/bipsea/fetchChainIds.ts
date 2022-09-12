export default function fetchChainIds(): Promise<any> {
	return fetch('https://raw.githubusercontent.com/bipsea/constants/main/chainIds.json')
		.then((res) => res.json())
		.catch((err) => console.error(err));
}
