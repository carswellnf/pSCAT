//Finds the Start Codon Number (usedStart) from the agreed upon Start Coord (usedStartCoord)
export function findUsedStart(gene){ 
  const usedStartCoord = gene.Start
  let usedStartIndex = null
  let usedStart = null
  for (let index = 0; index < gene.AvailableCoord.length; ++index) {
    if (gene.AvailableCoord[index] === usedStartCoord || gene.AvailableCoord[index] === usedStartCoord + 1 || gene.AvailableCoord[index] === usedStartCoord -1 ) 
    { // Some of the ChosenStarts are  +/- 1 off from the coord in the Available Starts array, so the +/- is needed to account for this.
      usedStartIndex = index
      usedStart = gene.AvailableStarts[usedStartIndex]
    }
  }
  return usedStart
};

//checks for the largest VALUE in an Object then returns the KEY of that value.
export function largestValueKey(obj) { 
  let max = 0;
  let maxKey= null
  const keys = Object.keys(obj);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const value = obj[key];
    if (value > max) {
      max = value;
      maxKey = key
    }
  }
  return maxKey;
};

//checks if two inputted arrays are equal in length and value
export function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};


/* Generates an Object Containing groups of genes that can be represented on the same track
 For each group of genes the following is added: an ID for the track number, the GeneIDs
 (names of genes) the object contains, every Start Codon present, the chosen Start NUMBER 
 (not coords), and the Predicted Start Number (only assigned if locustag is null) */

import {FileAttachment} from "npm:@observablehq/stdlib";
export async function startEqual(genes) {
  const geneObjects = Object.values(genes.Genes);
  const finalEqualArray = [];
  const includedGeneIDs = new Set(); // Set to keep track of included GeneIDs
  const subclustersList = await FileAttachment("../subclusters.json").json();

  for (let geneIndex = 0; geneIndex < geneObjects.length; ++geneIndex) {
      const refGene = genes.Genes[geneIndex];
      const refGeneStarts = refGene.AvailableStarts;
      const subcluster = getSubcluster(refGene.GeneID, subclustersList);

      if (includedGeneIDs.has(refGene.GeneID)) {
          // Skip already included GeneIDs
          continue;
      }

      const geneEqualGroup = {
          TrackNum: null, 
          GeneIDs: [refGene.GeneID],
          StartCodon: refGeneStarts,
          ChosenStart: findUsedStart(refGene),
          PredictedStart: null,
          Subcluster: subcluster
      };

      includedGeneIDs.add(refGene.GeneID); // Mark current GeneID as included

      for (let index = geneIndex + 1; index < geneObjects.length; ++index) {
          const currentGene = genes.Genes[index];
          const currentGeneStarts = currentGene.AvailableStarts;

          if (arraysEqual(refGeneStarts, currentGeneStarts) && findUsedStart(currentGene) === geneEqualGroup.ChosenStart) {
              geneEqualGroup.GeneIDs.push(currentGene.GeneID);
              includedGeneIDs.add(currentGene.GeneID); // Mark current GeneID as included
          }
      }

      finalEqualArray.push(geneEqualGroup);
  }

  finalEqualArray.forEach((group) => {
      if (group.ChosenStart !== null && group.GeneIDs.every(geneID => genes.Genes.find(gene => gene.GeneID === geneID).locustag === null)) {
          /*^^^ if gene Chosen Start is assigned but every GeneID in object has no locustag --> assign that ChosenStart value to
           Predicted Start then set Chosen Start back to null */
          group.PredictedStart = group.ChosenStart;
          group.ChosenStart = null; // Clear ChosenStart
      }
  });

  return finalEqualArray;
}

//END OF ObjectCreation


//Function to put each GeneID with its subcluster
export function getSubcluster(geneID, subclusters) {
  // Extract the part of gene ID before the first underscore
  const genePrefix = geneID.split('_')[0];
  
  // Iterate through subclusters and find the one containing the gene ID
  for (const subcluster in subclusters) {
      if (subclusters.hasOwnProperty(subcluster)) {
          const geneList = subclusters[subcluster];
          for (const gene of geneList) {
              if (gene.split('_')[0] === genePrefix) {
                  return subcluster;
              }
          }
      }
  }
  
  // If no matching subcluster is found, return "single" for Singletons
  return "Single";
}

export function geneIDsList (data) {
  let geneList = []
  for (let index = 0; index < data.Genes.length; index++) {
          geneList.push(data.Genes[index].GeneID);
  }
  return geneList;
}