function disableAll(){
  let permissions = document.querySelectorAll('tbody tr');

  for(row of permissions){
    let rowValues = row.getElementsByTagName('td');
    rowValues[2].querySelector('#disable').checked = true;
    rowValues[3].querySelector('#self').checked = false;
    rowValues[4].querySelector('#origin').value = "";
    rowValues[5].querySelector('#all').checked = false;
  }
  updateHeader();
}

function disableAllPowerful(){
  let permissions = document.querySelectorAll('tbody tr');

  for(row of permissions){
    let rowValues = row.getElementsByTagName('td');
    if(rowValues[1].textContent == "✅"){
      rowValues[2].querySelector('#disable').checked = true;
      rowValues[3].querySelector('#self').checked = false;
      rowValues[4].querySelector('#origin').value = "";
      rowValues[5].querySelector('#all').checked = false;
    } else {
      rowValues[2].querySelector('#disable').checked = false;
      rowValues[3].querySelector('#self').checked = false;
      rowValues[4].querySelector('#origin').value = "";
      rowValues[5].querySelector('#all').checked = false;
    }
  }
  updateHeader();
}

function startAgain(){
  let permissions = document.querySelectorAll('tbody tr');

  for(row of permissions){
    let rowValues = row.getElementsByTagName('td');
    rowValues[2].querySelector('#disable').checked = false;
    rowValues[3].querySelector('#self').checked = false;
    rowValues[4].querySelector('#origin').value = "";
    rowValues[5].querySelector('#all').checked = false;
  }
  updateHeader();
}

function originParsing(origins){
  let toReturn = '';
  let originsArray = origins.split(';');
  originsArray.forEach(origin => {
      if (!origin.startsWith('http://') && !origin.startsWith('https://')){
        console.log("Invalid protocol (https?):", origin);
        alert(`Invalid protocol (https?): ${origin}`);
        return
      }

      toReturn += `"${origin}" `;
  });

  return toReturn.trim();
}

function updateHeader(){
  let header = document.getElementById('permissions-policy');
  let permissions = document.querySelectorAll('tbody tr');
  let context = document.querySelector('.generated-context');
  let newHeader = "Permissions-Policy: ";
  let numberOfPermissions = 0;

  for(row of permissions){
    let rowValues = row.getElementsByTagName('td');
    let permission = rowValues[0].textContent;
    let disable = rowValues[2].querySelector('#disable').checked;
    let self = rowValues[3].querySelector('#self').checked;
    let origin = rowValues[4].querySelector('#origin').value;
    let all = rowValues[5].querySelector('#all').checked;
    if(disable){
      newHeader += `${permission}=(),`;
      numberOfPermissions += 1;
    } else if(self && origin){
      let origins = originParsing(origin);
      newHeader += `${permission}=(self ${origins}),`;
      numberOfPermissions += 1;
    } else if(self){
      newHeader += `${permission}=self,`;
      numberOfPermissions += 1;
    } else if(origin){
      // Only origins is not allowed
    } else if(all){
      newHeader += `${permission}=*,`;
      numberOfPermissions += 1;
    }
  }
  context.innerHTML = `<p>Nº of Permissions: ${numberOfPermissions}</p><p>Nº of Bytes: ${newHeader.length}</p>`;
  
  if(numberOfPermissions == 0){
    header.textContent = newHeader;
  } else {
    // Remove last ', '
    newHeader = newHeader.slice(0, -1);
    header.textContent = newHeader;
  }
}


function rowChange(element){
  const row = element.closest('tr');
  const elementId = element.id

  // if disable
  // remove self, origin and *
  if(elementId == "disable"){
    row.querySelector('#self').checked = false; 
    row.querySelector('#origin').value = ""; 
    row.querySelector('#all').checked = false; 
  } else if(elementId == "self" || elementId == "origin") { 
    // if self or origin
    // remove disable and *
    row.querySelector('#disable').checked = false; 
    row.querySelector('#all').checked = false; 
  } else if(elementId == "all"){
    // if *
    // remove disable, self, origin
    row.querySelector('#self').checked = false; 
    row.querySelector('#origin').value = ""; 
    row.querySelector('#disable').checked = false; 
  }
  updateHeader();
}

let sortAscendingPowerful = true;
let sortAscendingPermission = true;

function sortTableByPowerful() {
  const tableBody = document.getElementById('tableBody');
  const rows = Array.from(tableBody.getElementsByTagName('tr'));
  
  rows.sort((a, b) => {
    const aValue = a.cells[1].textContent.trim() === '✅' ? 1 : 0;
    const bValue = b.cells[1].textContent.trim() === '✅' ? 1 : 0;
    return sortAscendingPowerful ? aValue - bValue : bValue - aValue;
  });
  
  sortAscendingPowerful = !sortAscendingPowerful;
  tableBody.innerHTML = '';
  rows.forEach(row => tableBody.appendChild(row));
}

function sortTableByPermission() {
  const tableBody = document.getElementById('tableBody');
  const rows = Array.from(tableBody.getElementsByTagName('tr'));
  
  rows.sort((a, b) => {
    const aValue = a.cells[0].textContent.trim().toLowerCase();
    const bValue = b.cells[0].textContent.trim().toLowerCase();
    return sortAscendingPermission ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });
  
  sortAscendingPermission = !sortAscendingPermission;
  tableBody.innerHTML = '';
  rows.forEach(row => tableBody.appendChild(row));
}

// Function to build the table
function buildTable(data) {
  const columnHeaderRow = document.getElementById('columnHeaderRow');
  const tableBody = document.getElementById('tableBody');
  let permissionsData = data['result'];
  let date = data['date'];

  // Date
  const date_element = document.getElementById('date');
  date_element.textContent = date;


  // Clear existing content
  columnHeaderRow.innerHTML = '';
  tableBody.innerHTML = '';

  let permissionsPolicyColumns = ["col2", "col5", "col10"]
  
  const permissionHeader = document.getElementById('permission');
  permissionHeader.style.cursor = 'pointer';
  permissionHeader.onclick = sortTableByPermission;

  const powerHeader = document.getElementById("powerful");
  powerHeader.style.cursor = 'pointer';
  powerHeader.onclick = sortTableByPowerful;

  // Add table rows
  permissionsData.forEach(row => {
    for (ppcol of permissionsPolicyColumns){
      if (row[ppcol]){
        const tr = document.createElement('tr');
        const rowHeader = document.createElement('td');
        rowHeader.textContent = row.rowHeader;
        tr.appendChild(rowHeader);

        const powerful = document.createElement('td');
        if(row["col1"] || row["col4"] || row["col7"] || row["col9"] || row["col12"] ){  
          powerful.textContent = "✅";
        } else {
          powerful.textContent = "❌";
        }
        tr.appendChild(powerful);

        // Add 'disable', 'self', 'custom origin' and '*'
        let cases = ["disable", "self", "origin", "*"];
        for (i of cases){
            const rowHeader = document.createElement('td');
            if (i == "disable"){
              rowHeader.innerHTML = '<input type="radio" id="disable" onchange="rowChange(this)">';
            } else if(i == "self"){
              rowHeader.innerHTML = '<input type="checkbox" id="self" onchange="rowChange(this)">';
            } else if(i == "origin"){
              rowHeader.innerHTML = '<input type="text" placeholder="Origins separated by semicolon" id="origin" onchange="rowChange(this)">';
            } else if(i == "*"){
              rowHeader.innerHTML = '<input type="radio" id="all" onchange="rowChange(this)">';
            }
            tr.appendChild(rowHeader);
        }

        tableBody.appendChild(tr);
        break;
      }
    }
  });
}

async function loadData(){
  return await (await fetch('/browser-permissions-tool/results/last.json')).json()
  // for development
  // return await (await fetch('/results/last.json')).json()
}

async function loadPage(){
  let data = await loadData()// JSON data example
  // Example
  //const data = {
  //  "date": "11-9-2024",
  //  "chrome_version": "124.7",
  //  "chromium_version": "124.7",
  //  "firefox_version": "124.7",
  //  "webkit_version": "124.7",
  //  "playwright_version": "1.45.7",
  //  "result": [
  //    { rowHeader: "camera", col1: "1-1", col2: "1-2", col3: "1-3", col4: "1-4", col5: "1-5", col6: "1-6", col7: "1-5", col8: "1-6", col9: "1-6"},
  //    { rowHeader: "microphone", col1: "1-1", col2: "1-2", col3: "1-3", col4: "1-4", col5: "1-5", col6: "1-6", col7: "1-5", col8: "1-6", col9: "1-6"}
  //  ],
  //};
  buildTable(data);
}


// Build the table on page load
window.onload = () => {
  loadPage();
};
