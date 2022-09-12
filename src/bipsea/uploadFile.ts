/**
 * uploads a file to IPFS
 * @param _file html file ie: file.files[0]
 * @returns a url to the uploaded file ie: ipfs.io/ipfs/Qm...
 */
export default async function uploadFile(_file: File): Promise<string> {
	const formData = new FormData();
	formData.append('file', _file);
	const response = await fetch('https://api.nft.storage/upload', {
		method: 'POST',
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGM2NWNmRDhiYTZmRTIzNzdjYjZEM0U1NGVjMjViN0Q1MDIwQUZiNjkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTQwNTAxMjIwNSwibmFtZSI6IkJpcHNlYSBXZWJzaXRlIPCflKUifQ.KRUokCILDKuhNgGi8kGb8vf5DvgeUcvkZXFIz_gySyQ'
		},
		body: formData
	}).then((res) => res.json());
	repin(response.value.cid);
	return `https://ipfs.io/ipfs/${response.value.cid}/${_file.name || 'blob'}`;
}

/**
 * Repin a CID to Web3.Storage
 * @param _cid
 */
function repin(_cid: string) {
	fetch('https://bipsea-api.vercel.app/api/repin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			cid: _cid
		})
	});
}
