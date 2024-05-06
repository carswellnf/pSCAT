export async function clusFetch() {
    const getClus = await fetch(`https://phagesdb.org/api/subclusters/?format=json`);
    if (!getClus.ok) throw new Error(`fetch failed: ${getClus.status}`);
    const clusFetched = await getClus.json();
    return clusFetched
}
const jsonData = await clusFetch()
// Create an object to store the final output
const finalOutput = {};

// Iterate through each cluster
jsonData.forEach(clusterData => {
    const clusterName = clusterData.subcluster;
    const phageSet = clusterData.phage_set;
    
    // Assign the phage set to the cluster in the final output object
    finalOutput[clusterName] = phageSet;
    
});
process.stdout.write(JSON.stringify(finalOutput))

