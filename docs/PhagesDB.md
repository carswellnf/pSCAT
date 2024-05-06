---
title: pSCAT
---
# pSCAT

For more information on how to use pSCAT visit the <a href="./tutorials">tutorials</a> page.

```js
import {startEqual, getSubcluster, geneIDsList} from "./functions/startObjCreation.js";
import {tickChart} from './functions/tickChart.js'
import {phamTable} from "./functions/phamTable.js"
import {orderAndSort, extractGeneInfo} from "./functions/orderData.js"
import {phamFetch} from "./functions/phamFetch.js";
import {mostCommonChosenStart, mostCommonChosenStartPerSubcluster} from "./functions/summaryInfo.js"
import {PhamBarChart} from "./functions/phamBarChart.js";
```
```js
let clusters = FileAttachment("subclusters.json").json();
```

```js
let pham = phamFetch(phamSelect)
```

```js
const results = startEqual(pham);
```

```js
const targetGene = geneSearchTick.join()
``` 
```js
let dataJSON = JSON.stringify(dataSorted)
```

```js
let dataSorted = orderAndSort(results, startRadios, sortBySubclusterChoice, geneSearchTick)
```
```js
let chosenTracks = drawTickChart.selectedYValues
```

```js
function filterObjectsByIndices(objects, indices) {
  return objects.filter((obj, index) => indices.includes(index));
}
```

----------------
## Choose a Phamily ##

```js
let phamSelect = view(
  Inputs.text({
    label: html`<b>Phamily:</b>`,
    placeholder: "Pick a Phamily",
    type: "Number",
    value: 430,
    submit: true
  })
);
```
----------------
## Genes Table

```js
const geneSearchTable = view(Inputs.search(phamTable(dataSorted, pham)))
```
```js
Inputs.table(geneSearchTable)
```

-----------------
## Tick Chart ##

```js
let geneSearchTick = view(Inputs.search(geneIDsList(pham), {placeholder: "Search for a gene in selected phamily", datalist: geneIDsList(pham)}));
```
```js
const sortBySubclusterChoice = view(Inputs.toggle({label: "Sort By Subcluster", value: true}));
```
```js
let startRadios = view(Inputs.radio(["Ascending", "Descending"], {label: html`<b>Order by Used Start Codon</b>`, value: "Ascending"}))
```
```js
const makeTable = view(Inputs.button("Update Table"))
```
```js
makeTable;
const tableData = filterObjectsByIndices(dataSorted, chosenTracks)
```
```js
const filteredTableData = extractGeneInfo(tableData)
```
```js
Inputs.table(filteredTableData, {
  columns: [
    "TrackNum",
    "GeneID",
    "Subcluster",
    "ChosenStart",
    "PredictedStart",
    
  ],
  header: {
    TrackNum: "Track Number",
    GeneID: "Gene Name",
    Subcluster: "Subcluster",
    ChosenStart: "Chosen Start Codon",
    PredictedStart: "Predicted Start Codon",
  } 
})
```
```js
//Draw the Tick Chart
let drawTickChart = await tickChart(dataSorted)
display(drawTickChart.plotDiv)
```
-----------------------
```js
const {mostCommonValue, totalCommonStartGeneCount, totalGeneCount, percent}  = mostCommonChosenStart(dataSorted);
```

## Summary ##
```js

```
The most common used start codon is <i>Start Codon</i> <b>${mostCommonValue}</b> <br> which was called <b> ${totalCommonStartGeneCount} / ${totalGeneCount} times (${percent})</b>.


The most common used start broken down <b>by subcluster: </b>
```js
Inputs.table(mostCommonChosenStartPerSubcluster(dataSorted), {
    layout: "auto",
    columns: [
      "subcluster",
      "mostCommonValue",
      "totalCount",
      "subclusterSize",
      "percentUsed",
      "subclusterTrackNum",
    ],
    header: {
      subcluster: "Subcluster",
      mostCommonValue: "Most Common Used Start",
      totalCount: "Times Called",
      subclusterSize: "Genes in Subcluster",
      percentUsed: "% Used (by Gene)",
      subclusterTrackNum: "# Tracks in Subcluster",
    }
})
```
-----------------------
## Start Repeat Chart
```js
```
```js
const phamBarChartData = PhamBarChart(results)
```
**Figure 1.** The most conserved start codon is most likely to be apart of a protein strucutre. Note, the most convserved start codon depicted in this graph is NOT the same as the chosen start codon.
<div style="width: width; height: 500px; overflow: auto">
  ${Plot.plot({
      width: width,
      height: 8000,
      y: {label: "Start Codon Number"},
      x: {label: "Number of Repeats"},
      style: {fontSize: "24px"}, // Adjust the font size here
      marks: [
        Plot.barX(phamBarChartData, {x: "count", y: "start", sort: {y: "x", reverse: true}, tip: true}),
        Plot.ruleX([0])
      ]
    })}
</div>

-------------------------
## All Subclusters and their Phages 

```js
const sql = DuckDBClient.sql({subclusters: FileAttachment(`subclusters.json`)});
```
```sql
SELECT * FROM subclusters
```