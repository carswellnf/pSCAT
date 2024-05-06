export function phamTable (filteredPhamInfo, phamInfo) {
    let finalArray = []
    for (let phamIndex = 0; phamIndex < filteredPhamInfo.length; ++phamIndex) { 
      let currentTrack = filteredPhamInfo[phamIndex]; //index of genes in startEqual Array
      for (let trackIndex = 0; trackIndex < currentTrack.GeneIDs.length; ++trackIndex) { 
          let phamTracker = {
            TrackNum: null,
            GeneID: null, 
            Start: null,
            Stop: null,
            Length: null,
          }
          phamTracker.TrackNum = currentTrack.TrackNum
          phamTracker.GeneID = currentTrack.GeneIDs[trackIndex]
  
          // Find the index of phamTracker.GeneID in phamInfo.Genes
          let geneIndex = phamInfo.Genes.findIndex(gene => gene.GeneID === phamTracker.GeneID);
          
          // If geneIndex is valid, assign Start and Stop values
          if (geneIndex !== -1) {
            phamTracker.Start = phamInfo.Genes[geneIndex].Start;
            phamTracker.Stop = phamInfo.Genes[geneIndex].Stop;
            phamTracker.Length = (1 + (Math.abs(phamInfo.Genes[geneIndex].Stop - phamInfo.Genes[geneIndex].Start)))
          }
          
          finalArray.push(phamTracker)
      }
    }
    return finalArray
  }