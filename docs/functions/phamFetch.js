export async function phamFetch(filename) {
    const getPham = await fetch(`https://corsproxy.io/?http://phages.wustl.edu/starterator/json/${filename}.json`);
    if (!getPham.ok) throw new Error(`fetch failed: ${getPham.status}`);
    const phamFetched = await getPham.json();
    console.log([phamFetched])
    return phamFetched
}