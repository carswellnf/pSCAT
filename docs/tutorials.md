---
title: Tutorials
---

# Tutorials
Welcome To pSCAT!
<div class="tip">Use the <i>Contents</i> bar on the right to naviagte the different headings of a page.</div>

--------------------------------

## Choosing a Phamily:  

To view a phamily's data, simply type in the phamily number into the topmost search box and hit the submit button (or enter on your keyboard). Note, spamming the sorting button is ill advised. Please be patient after you have entered the phamily as some phamiles are very large and may take extra time to load. For reference, the largest phamiles may take up to 30 seconds to load their data and roughly 15 seconds to update any search parameters. Choosing a phamily that does not exist will result in a <i>"Failed to fetch"</i> error. 

```js
FileAttachment("./pictures/choosePham.png").image()
```
--------------------------------
## Gene table

The gene table contains the names of genes in each of the track for the chosen phamily. Beyond that, it also shows the chosen start and stop and the length of each gene. You can search for your gene and the table will update accordingly. <b>The gene table search bar is seperate from the gene Tick Chart search bar. </b> 

The genes table for Pham 430 looks like this. 
```js
FileAttachment("./pictures/genetable.png").image()
```
Furthermore , searching for geneID 'E3_CDS_167' looks like this:
```js
FileAttachment("./pictures/genetablenarrows.png").image()
```
--------------------------------

## How to Use the Tick Chart 


#### Utilizing the Gene Tick Chart Search Bar:  

Type in the gene name you wish to view by either clicking the dropdown arrow on the right side of the search bar or by typing in the gene name manually. The dropdown menu will automatically update and narrow down your options when you type in part of the gene name. Example, typing “m” will narrow search to all genes containing letter m within the dropdown menu. The tick chart will only update if the exact gene is into the search bar (example: gene_1 ≠ gene1 or gene) the gene name must be EXACT and complete.

<div class="tip">The gene you selected will always appear at track number 0.</div>

#### Available Sorting Options  

- <u>Ascending:</u> sorts the chosen start codons in each subcluster by <i>ascending</i> order.  

- <u>Descending:</u> sorts the chosen start codons in each subcluster by <i>descending</i> order. 

- <u>Sort by subcluster:</u>  (<i>ON by default</i>) sorts all tracks that share the same subcluster together. Turning this off will sort all the chosen start codons by the chosen Ascending/Descending order together rather than by each subcluster. Changes in subcluster are still denoted in a pink line.

```js
FileAttachment("./pictures/Tickchart.png").image()
```

#### Plot Capture Function  

The camera icon at the top right of the tick chart downloads the current tick chart displayed as a <i>.png</i> file. Please do NOT spam the picture button as it takes a moment to process the request, it may take longer for larger phamilies.    
```js
FileAttachment("./pictures/captureimage.png").image()   
```
#### Interpreting the Tick Chart Data  

Hovering over a tick with your mouse displays the start codon number, track number, and subcluster grouping. Clicking on any tick will highlight the track number it belongs to, clicking again on a tick in the same track number will deselect the track. Selected tracks will appear in the table above the tick chart <b>(once the <i>Update Table</i> button has been selected)</b> and will display more information about the track (ex: gene IDs / names). Larger phamilies will take longer to update selecting and deselecting tracks.  


- <u>Yellow Ticks:</u> has the chosen start but no locus tag assigned (locus tag = a way to identify a gene) 

- <u>Blue Ticks:</u> it has a locus tag and the chosen start  

- <u>Black Ticks:</u> other possible start codons 

- <u>Y axis:</u> track number 

- <u>Track number:</u> a gene (or group of genes) that shares the same chosen start and has the same exact available starts 

- <u>X axis:</u> Start codon number 

- <u>Pink lines:</u> everything below is part of that subcluster denoted by the pink line

<div class="tip">Clicking on any <b>tick</b> on a track will select that track and output more information such as the GeneID(s) on the track once the <i>Update Table</i> button in selected. Clicking on any tick in that same track again will deslsect that track. Multiple tracks can be selected at once.</div>

The tick chart is automatically generated when pham is entered and defaults to ascending start view and sorted by subcluster. Pham 430 may look like:
```js
FileAttachment("./pictures/tickselect.png").image()   
```

<div class="tip"> Look at Track 18. Its chosen start is 17 but every other track in subclsuter C1 is either 12 or 15. Track 18 has both of these start codons but does not use them. It may be wise to consider changing this start. To make this determination, look at all the information given by pSCAT such as gene length (located in genes table), and the summary information, like the % used category for the subcluster.  </div>

To generate a table of selected tracks, click on a start codon in desired track(s) and click the 'Update Table' button. For Track 1 of Pham 430, the table may look like:
```js
FileAttachment("./pictures/tabletick.png").image()   
```
--------------------------------

## Summary Information
Once a tick chart has been generated, the most used start codon will be displayed along with the ratio and percentage of its usage among all genes in the selected phamily. Below this information is a table that breaks down the start codon usage by subcluster.  

```js
FileAttachment("./pictures/summarytick.png").image()   
```
--------------------------------
## Start Repeat Chart  

The phamily chosen for the tick chart will be displayed on the start repeats chart. The Y-axis displays the start number and the X-axis shows the number of start repeats. Hovering over the bar of each start codon will display its number and the number of times it repeats. A high number of start codon repeats indicates a high probability of that codon being important to the structure of the protein that gene encodes. 

<div class="tip">A high number of repeats does NOT mean a codon is more likley to be the used start codon for the gene, it is just the frequency of which that potential start codon appears in the phamily. </div>

The start repeat chart for Pham 430 may have a view like this. Hovering over a bar shows the number of repeats for that start codon.
```js
FileAttachment("./pictures/startRepeat.png").image()   
```

--------------------------------

## More Subcluster Information

A table of ALL the phages (not just in the chosen phamily) in each subcluster can be found at the bottom of the page.

```js
FileAttachment("./pictures/subclus.png").image()   
```
