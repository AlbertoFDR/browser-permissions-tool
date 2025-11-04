const fs = require('fs');
const path = require('path');
const { PERMISSIONS } = require('./permissions.js');

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


async function newPermissionsChecker(){
  /* Chromium Features */
  let chromiumURL = "https://chromium.googlesource.com/chromium/src/+/main/services/network/public/cpp/permissions_policy/permissions_policy_features.json5?format=TEXT";
  let response = await fetch(chromiumURL);
  let base64 = await response.text();
  let decoded = Buffer.from(base64, 'base64').toString('utf-8');
  let chromiumFeatures = [...decoded.matchAll(/permissions_policy_name:\s*"(.*?)",/g)].map(m => m[1]);
  let missing = chromiumFeatures.filter(permission => !PERMISSIONS.includes(permission));
  if (missing.length > 0){
    console.log(`[ERROR] Permissions supported by Chromium not included in the list.`);
    for(permission of missing){
      console.log(`- ${permission}`);
    }
    return true;
  }

  // Still not relevant
  // Firefox
  // https://github.com/mozilla-firefox/firefox/blob/main/extensions/permissions/PermissionDelegateHandler.cpp#L46
  // https://searchfox.org/firefox-main/source/dom/security/featurepolicy/FeaturePolicyUtils.cpp
  
  // WebKit
  // https://github.com/WebKit/WebKit/blob/49085ab3d17ccd8dad11b77d37de8bf055a75115/Source/WebCore/Modules/permissions/PermissionName.idl#L29


  return false;
}



exports.sleep = sleep;
exports.saveResults = saveResults;
exports.getCurrentDate = getCurrentDate;
exports.newPermissionsChecker = newPermissionsChecker;
