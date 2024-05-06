export function PhamBarChart (data) {
  let DataArray = data;
  let coordinates = DataArray.map(obj => ({
    TrackNum: obj.TrackNum,
    Starts: obj.StartCodon
  }));

  // Create an array to store objects with start and count properties
  const startCountsArray = [];

  // Create an empty object to store the counts
  const startCounts = {};

  // Iterate over each object in the DataArray
  DataArray.forEach(obj => {
    // Iterate over each start in the Starts array
    obj.StartCodon.forEach(start => {
      // Increment the count for the current start or initialize it to 1 if it doesn't exist
      startCounts[start] = (startCounts[start] || 0) + 1;
    });
  });

  // Convert the startCounts object into an array of objects with start and count properties
  for (const start in startCounts) {
    if (Object.hasOwnProperty.call(startCounts, start)) {
      startCountsArray.push({ start: parseInt(start), count: startCounts[start] });
    }
  }
 return startCountsArray;
};