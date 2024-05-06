import Plotly from 'plotly.js-dist';

export async function tickChart(dataToPlot) {  
    let plotDiv = document.getElementById('plot');
    if (!plotDiv) {
        // Create a div element for the plot if it doesn't exist
        plotDiv = document.createElement('div');
        plotDiv.id = 'plot';
        document.body.appendChild(plotDiv); // Append the div to the body or any other parent element
    }
    const tickSize = 15;

    // Create traces for each start codon
    console.log(dataToPlot)
    const allStartCodons = await dataToPlot.flatMap((entry, index) => {
        return entry.StartCodon.map(allStartCodons => ({
            x: [allStartCodons],
            y: [index],
            mode: 'markers',
            marker: {
                symbol: 'line-ns-open',
                size: tickSize,
                color: 'black',
                line: {
                    width: 2
                }
            },
            hoverinfo: 'text',
            text: `Start Codon: ${allStartCodons} <br> Track: ${index} <br> Subcluster: ${dataToPlot[index].Subcluster}`,
            showlegend: false,
        }));
    });

    const chosenStartCodons = dataToPlot.flatMap((entry, index) => {
            return {
                x: [entry.ChosenStart],
                y: [index],
                mode: 'markers',
                marker: {
                    symbol: 'line-ns-open',
                    size: tickSize,
                    color: 'blue',
                    line: {
                        width: 2
                    },
                },
                hoverinfo: 'text',
                text: `Start Codon: ${entry.ChosenStart} <br> Track: ${index} <br> Subcluster: ${dataToPlot[index].Subcluster}`,
                showlegend: false,
            };
    });

    // Create a trace for the predicted start positions
    const predictedStartCodons = dataToPlot.flatMap((entry, index) => {
            
            return {
                x: [entry.PredictedStart],
                y: [index],
                mode: 'markers',
                marker: {
                    symbol: 'line-ns-open',
                    size: tickSize,
                    color: 'yellow',
                    line: {
                        width: 2
                    },
                },
                hoverinfo: 'text',
                text: `Start Codon: ${entry.PredictedStart} <br> Track: ${index} <br> Subcluster: ${dataToPlot[index].Subcluster}`,
                showlegend: false,
            };

    });

    // Calculate the height of the layout based on the number of data entries
    const height = Math.max((dataToPlot.length + 2) * 30, 500); // Set a minimum height of 500 pixels

    
    // Calculate the range of the y-axis dynamically
    const minY = -0.5 ;
    const maxY = dataToPlot.length + 0.5; 

    let annotationShapes = drawAnnotations(dataToPlot);
    let subclusterShapes = drawSubclusterLines(dataToPlot);
    let transparenBoxes = null

    const layout = {
        width: window.innerWidth - 500,
        height: height,
        xaxis: {
            title: "Start Codon",
            automargin: true,
        },
        yaxis: {
            title: "Track",
            range: [maxY, minY],
            tickvals: dataToPlot.map((_, index) => index),
            ticktext: dataToPlot.map((_, index) => index),
            hoverinfo: 'text',
        },
        autosize: false,
        annotations: annotationShapes,
        shapes: subclusterShapes,
        dragmode: false,
        clickmode: 'event',
       
    };
    var config = {
        modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'lasso2d', 'select2d', 'asso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d'],
      };

    let selectedYValues = [];
    // Plotting
    Plotly.newPlot('plot', [...allStartCodons, ...chosenStartCodons, ...predictedStartCodons], layout, config, 
    );
    // Add event listener for plot clicks

    plotDiv.on('plotly_click', function(data) {
        const clickedYValue = data.points[0].y; // Get the clicked Y value
        const index = selectedYValues.indexOf(clickedYValue);
        if (index === -1) {
            // If the Y value is not in the array, add it
            selectedYValues.push(clickedYValue);
        } else {
            // If the Y value is already in the array, remove it
            selectedYValues.splice(index, 1);
        }
        layout.shapes = [...drawSubclusterLines(dataToPlot), ...drawTransparentBoxes(selectedYValues)];
        Plotly.relayout('plot', layout, config);
    });
            return {plotDiv, selectedYValues}
            
};


function drawAnnotations(dataToPlot) {
    const annotations = [];
    let prevSubcluster = null;

    // Draw annotations for ChosenStart and PredictedStart
    dataToPlot.forEach((entry, index) => {
        const y = index;
        // Annotation for ChosenStart
        if (entry.ChosenStart !== null) {
            annotations.push({
                x: entry.ChosenStart + 0.03,
                y: y,
                text: entry.ChosenStart, 
                showarrow: false,
                font: {
                    color: 'black',
                    size: 12,
                    bold: 'bold'
                },
                xanchor: 'right',
                yanchor: 'bottom',
                textangle: 315
            });
        }
        // Annotation for PredictedStart
        if (entry.PredictedStart !== null) {
            annotations.push({
                x: entry.PredictedStart + 0.03,
                y: y,
                text: entry.PredictedStart, 
                showarrow: false,
                font: {
                    color: 'black',
                    size: 12,
                    bold: 'bold'
                },
                xanchor: 'right',
                yanchor: 'bottom',
                textangle: 315
            });
        }
    });

    // Draw horizontal line whenever the subcluster changes
    dataToPlot.forEach((entry, index) => {
        if (entry.Subcluster !== prevSubcluster) {
            const y = index;
            annotations.push({
                xref: 'paper',
                yref: 'y',
                x: 0.04, // Adjust x position to place the annotation on the left side
                xanchor: 'right',
                y: y - 0.5, // Adjust the position slightly to center the line
                yanchor: 'middle',
                text: entry.Subcluster,
                showarrow: false,
                font: {
                    color: 'red',
                    size: 14,
                    bold: 'bold'
                }
            });

            prevSubcluster = entry.Subcluster;
        }
    });
    return annotations;
}

function drawSubclusterLines(dataToPlot) {
    const subclusterChanges = [];
    let currentSubcluster = null;

    // Find the indices where subcluster changes
    dataToPlot.forEach((entry, index) => {
        if (entry.Subcluster !== currentSubcluster) {
            subclusterChanges.push(index);
            currentSubcluster = entry.Subcluster;
        }
    });
    const maxXValues = dataToPlot.flatMap(entry => entry.StartCodon);
    const maxX = Math.max(...maxXValues)
    // Create shapes for each subcluster change
    const shapes = subclusterChanges.map(index => ({
        type: 'line',
        x0: -0.5, // Adjust as needed
        y0: index - 0.5,
        x1: maxX + 1,
        y1: index - 0.5,
        line: {
            color: 'rgba(255, 0, 255, 0.5)',
            width: 1,
            showarrow: false,
        },
    }));

    return shapes;
}
function drawTransparentBoxes(selectedYValues) {
    // Draw transparent boxes corresponding to selected Y values
    const shapes = selectedYValues.map(yValue => ({
        type: 'rect',
        xref: 'paper',
        yref: 'y',
        x0: 0,
        x1: 1,
        y0: yValue - 0.5,
        y1: yValue + 0.5,
        fillcolor: 'rgba(0,0,0,0.1)',
        line: {
            width: 0,
        },
    }));

    return shapes;
}