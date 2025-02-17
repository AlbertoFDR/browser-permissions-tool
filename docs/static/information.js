const RESULTS_URL = "/browser-permissions-tool/permissions.json";
//const RESULTS_URL = "/permissions.json";

async function getResultContent(){
  return await (await fetch(RESULTS_URL)).json()
}

async function fillPage() {
  // Get all versions
  let permission_information_json = await getResultContent();

  // HTML div element
  const tableBody = document.getElementById('tableBody');

  for (permission in permission_information_json){
    let link;
    const tr = document.createElement('tr');
    let td = document.createElement('td');
    td.textContent = permission;
    tr.appendChild(td);

    td = document.createElement('td');
    if(permission_information_json[permission]['standard'] != ""){
      link = document.createElement('a');
      link.textContent = permission_information_json[permission]['standard'];
      link.href = permission_information_json[permission]['standard-link'];
      td.appendChild(link);
    }
    tr.appendChild(td);

    td = document.createElement('td');
    if(permission_information_json[permission]['standard-status'] != ""){
      link = document.createElement('a');
      link.textContent = permission_information_json[permission]['standard-status'];
      link.href = permission_information_json[permission]['standard-status-link'];
      td.appendChild(link);
    }
    tr.appendChild(td);

    // td = document.createElement('td');
    // if(permission_information_json[permission]['powerful-by-standard'] != ""){
    //   if(permission_information_json[permission]['powerful-by-standard'] === false){
    //     td.textContent = "❌";
    //   } 
    //   if(permission_information_json[permission]['powerful-by-standard'] === true){
    //     td.textContent = "✅";
    //   }
    // }
    // tr.appendChild(td);

    // td = document.createElement('td');
    // if(permission_information_json[permission]['permissions-policy-by-standard'] != ""){
    //   if(permission_information_json[permission]['permissions-policy-by-standard'] === false){
    //     td.textContent = "❌";
    //   } 
    //   if(permission_information_json[permission]['permissions-policy-by-standard'] === true){
    //     td.textContent = "✅ (" + permission_information_json[permission]['default-allowlist-by-standard'] + ')';
    //   }
    // }
    // tr.appendChild(td);

    td = document.createElement('td');
    if(permission_information_json[permission]['comments'] != ""){
      td.innerHTML = permission_information_json[permission]['comments'];
    }
    tr.appendChild(td);

    tableBody.appendChild(tr);
  }
}

window.onload = fillPage;
