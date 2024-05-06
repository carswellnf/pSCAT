export function mostCommonChosenStart(arrayOfObjects) {
    const countMap = {};
    let mostCommonValue;
    let maxCount = 0;
    let totalGeneCount = 0;
    let totalCommonStartGeneCount = 0;

    arrayOfObjects.forEach(obj => {
        const chosenStart = obj.ChosenStart;
        const geneCount = obj.GeneIDs.length;
        // Count occurrences of each ChosenStart value
        countMap[chosenStart] = (countMap[chosenStart] || 0) + 1;
        // Update most common ChosenStart and maxCount
        if (countMap[chosenStart] > maxCount) {
            mostCommonValue = chosenStart;
            maxCount = countMap[chosenStart];
        }
        // Update totalGeneCount
        totalGeneCount += geneCount;
        // Update totalCommonStartGeneCount if current object's ChosenStart is the most common one
        if (chosenStart === mostCommonValue) {
            totalCommonStartGeneCount += geneCount;
        }
    });
    const percent = ((totalCommonStartGeneCount / totalGeneCount) * 100 || 0).toFixed(1) + '%';
    return { mostCommonValue, totalCommonStartGeneCount, totalGeneCount, percent };
}


  
export function mostCommonChosenStartPerSubcluster(arrayOfObjects) {
    const subclusters = {};

    arrayOfObjects.forEach(obj => {
        const subcluster = subclusters[obj.Subcluster] || (subclusters[obj.Subcluster] = { objects: [], subclusterSize: 0, subclusterTrackNum: 0, mostCommonChosenStartGeneIDs: {} });

        if (obj.ChosenStart !== null) {
            subcluster.objects.push(obj);
            subcluster.subclusterTrackNum++;
            subcluster.subclusterSize += obj.GeneIDs.length;

            const chosenStart = obj.ChosenStart;
            subcluster.mostCommonChosenStartGeneIDs[chosenStart] = (subcluster.mostCommonChosenStartGeneIDs[chosenStart] || 0) + obj.GeneIDs.length;
        }
    });

    const results = [];

    Object.entries(subclusters).forEach(([subcluster, data]) => {
        const { objects, subclusterSize, mostCommonChosenStartGeneIDs } = data;
        let maxGeneIDs = 0;
        let mostCommonChosenStart = null;

        Object.entries(mostCommonChosenStartGeneIDs).forEach(([chosenStart, numGeneIDs]) => {
            if (numGeneIDs > maxGeneIDs) {
                maxGeneIDs = numGeneIDs;
                mostCommonChosenStart = chosenStart;
            }
        });

        const percentUsed = objects.length === 0 || !mostCommonChosenStart ? null : `${((maxGeneIDs / subclusterSize) * 100).toFixed(1)}%`;
        results.push({ subcluster, mostCommonValue: mostCommonChosenStart, totalCount: maxGeneIDs, subclusterSize, subclusterTrackNum: objects.length, percentUsed });
    });

    return results;
}