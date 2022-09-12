export default function fetchSubgraphs(): Promise<any> {
	return fetch('https://raw.githubusercontent.com/bipsea/constants/main/subgraphs.json')
		.then((res) => res.json())
		.catch((err) => console.error(err));
}
