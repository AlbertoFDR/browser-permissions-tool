const fs = require('fs');
const path = require('path');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getCurrentDate() {
  const today = new Date();
  
  // Get the day, month, and year
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = today.getFullYear();
  
  // Return formatted date as dd-mm-yyyy
  return `${day}-${month}-${year}`;
};

function saveResults(json){
  let date = getCurrentDate();
  const folderPath = path.join(__dirname, '../docs/results');
  
  // last.json overwriting
  const lastPath = path.join(folderPath, 'last.json');
  fs.writeFile(lastPath, JSON.stringify(json, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } 
  });

  const datePath = path.join(folderPath, `${date}.json`);
  fs.writeFile(datePath, JSON.stringify(json, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } 
  });

};



exports.getCurrentDate = getCurrentDate;
exports.saveResults = saveResults;
exports.sleep = sleep;
