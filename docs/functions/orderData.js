export function orderAndSort(data, order, sortBySubclusterChoice, searchedGeneID) {
    let sort;

    // Function to sort data based on ChosenStart
    const orderOf = (arr, order) => {
        if (order === "Ascending") {
            return arr.sort((a, b) => a.ChosenStart - b.ChosenStart);
        } else if (order === "Descending") {
            return arr.sort((a, b) => b.ChosenStart - a.ChosenStart);
        } else {
            return arr.sort(() => Math.random() - 0.5);
        }
    };

    // Check if data is already sorted according to the specified order
    const isSorted = (arr, order) => {
        if (order === "Ascending") {
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].ChosenStart < arr[i - 1].ChosenStart) {
                    return false;
                }
            }
        } else if (order === "Descending") {
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].ChosenStart > arr[i - 1].ChosenStart) {
                    return false;
                }
            }
        }
        return true;
    };

    // Sort the entire array based on ChosenStart if not already sorted
    if (!isSorted(data, order)) {
        console.log("Sorting without subcluster...");
        sort = orderOf(data, order);
    } else {
        sort = [...data];
    }

    // If sortBySubclusterChoice is true, further process data
    if (sortBySubclusterChoice) {
        console.log("Sorting by subcluster...");

        // Create a map of subclusters and their corresponding items
        const groupedBySubcluster = sort.reduce((acc, curr) => {
            (acc[curr.Subcluster] = acc[curr.Subcluster] || []).push(curr);
            return acc;
        }, {});

        // If searchedGeneID is provided, move the matching subcluster to the beginning of the array
        if (searchedGeneID) {
            console.log("Moving searchedGeneID's subcluster to the beginning of the array...");
            const prefix = String(searchedGeneID).split('_')[0]; // Convert to string before splitting
            for (const subcluster in groupedBySubcluster) {
                if (groupedBySubcluster[subcluster].some(obj => obj.GeneIDs.some(id => String(id).startsWith(prefix)))) {
                    const foundSubcluster = groupedBySubcluster[subcluster];
                    sort = foundSubcluster.concat(...Object.values(groupedBySubcluster).filter(sub => sub !== foundSubcluster));
                    break;
                }
            }
        }
    }

    // If searchedGeneID is provided, move the matching object to the beginning of the array
    if (searchedGeneID && sort) {
        console.log("Moving searchedGeneID to the beginning of the array...");
        const prefix = String(searchedGeneID).split('_')[0]; // Convert to string before splitting
        const index = sort.findIndex(obj => obj.GeneIDs.some(id => String(id).startsWith(prefix)));
        if (index !== -1) {
            const foundObject = sort[index];
            sort.splice(index, 1);
            sort.unshift(foundObject);
        }
    }

    console.log("Sorted data:", sort);
    sort.forEach((obj, index) => {
        obj.TrackNum = index;
      });
    return sort;
}

export function extractGeneInfo(arrayOfObjects) {
    return arrayOfObjects.map(obj => {
      return obj.GeneIDs.map(geneID => {
        return {
          TrackNum: obj.TrackNum,
          GeneID: geneID,
          Subcluster: obj.Subcluster,
          ChosenStart: obj.ChosenStart,
          PredictedStart: obj.PredictedStart,
          StartCodon: obj.StartCodon
        };
      });
    }).flat();
  }