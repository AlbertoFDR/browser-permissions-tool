// const RESULTS_URL = "/browser-permissions-tool/results/";
const RESULTS_URL = "/results/";

async function fetchAllVersions() {
  // const RESULTS_GITHUB_API = "https://api.github.com/repositories/896178030/contents/docs/results";
  // Discarded because of Github Rate Limit
  // try {
  //   const response = await fetch(RESULTS_GITHUB_API);
  //   const data = await response.json();
  //   return data.reverse();
  // } catch (error) {
  //   console.error('Error fetching files:', error);
  // }

  return [
    "08-02-2025.json", 
    "07-01-2025.json", 
    "20-12-2024.json"
  ].reverse();
}

async function getResultContent(result_name){
  return await (await fetch(RESULTS_URL + result_name)).json()
}

async function fillPage() {
  // Get all versions
  let result_jsons = await fetchAllVersions()

  // HTML div element
  let container = document.getElementById('version-container');
  container.textContent = "";

  let version_elements_to_add = [];
  let permissions = [];
  let permissions_result = {};

  // Fill
  for (let result of result_jsons) {
    const new_div = document.createElement('div');
    new_div.classList.add('generated');

    // remove .json
    const h3Element = document.createElement('h3');
    h3Element.textContent = result.slice(0, -5) + " ";
    let h3ElementLink = document.createElement('a');
    h3ElementLink.setAttribute('href', "/index.html?json="+result);
    h3ElementLink.textContent = `(show)` 
    h3Element.appendChild(h3ElementLink);
    new_div.appendChild(h3Element);

    // ===================== Browser Versions
    // <p>
    let pElement = document.createElement('p');
    pElement.textContent = ">> Browser versions:";
    new_div.appendChild(pElement);


    // <p>
    const result_content = await getResultContent(result);
    const ulElement = document.createElement('ul');

    let liElement = document.createElement('li');
    liElement.textContent = `Chrome: ${result_content['chrome_version']}`;
    ulElement.appendChild(liElement)
    liElement = document.createElement('li');
    liElement.textContent = `Chromium: ${result_content['chromium_version']}`;
    ulElement.appendChild(liElement)
    liElement = document.createElement('li');
    liElement.textContent = `Firefox: ${result_content['firefox_version']}`;
    ulElement.appendChild(liElement)
    liElement = document.createElement('li');
    liElement.textContent = `Brave: ${result_content['brave_version']}`;
    ulElement.appendChild(liElement)
    liElement = document.createElement('li');
    liElement.textContent = `Webkit: ${result_content['webkit_version']}`;
    ulElement.appendChild(liElement)
    new_div.appendChild(ulElement);

    // Values for next info
    let new_list_of_permissions = result_content['result'].map(item => item.rowHeader);
    const permissions_added_and_removed_in_list = [];
    const changes_in_results = {};

    if (permissions.length === 0){
      permissions = new_list_of_permissions;
      permissions_result = result_content;
    } else {
      // Differences in results.js
      if (permissions.length !== new_list_of_permissions.length){
        // Permissions added/removed
        let diff_added = new_list_of_permissions.filter(item => !permissions.includes(item));
        let diff_removed = permissions.filter(item => !new_list_of_permissions.includes(item));

        // Permissions added
        if (diff_added.length > 0){
          console.log("permissions added", diff_added);
          diff_added.forEach((permission_diff)=>{
            permissions_added_and_removed_in_list.push(`++ '${permission_diff}'`);
          })
        }

        // Permissions removed
        if (diff_removed.length > 0){
          console.log("permissions removed", diff_removed);
          diff.forEach((permission_diff)=>{
            permissions_added_and_removed_in_list.push(`-- '${permission_diff}'`);
          })
        }

        permissions = new_list_of_permissions;
      }

      let old_list_of_permissions = permissions_result['result'].map(item => item.rowHeader);
      // Differences in results
      for (permission of result_content['result']){
        if (old_list_of_permissions.includes(permission.rowHeader)){
          console.log(permission);
          for(old_permission_result of permissions_result['result']){
            if(old_permission_result.rowHeader === permission.rowHeader){
              changes_in_results[old_permission_result.rowHeader] = {};

              // Chrome
              // col1, col2, col3
              if(old_permission_result.col1 !==permission.col1 || 
                old_permission_result.col2 !==permission.col2 || 
                old_permission_result.col3 !==permission.col3){
                
                changes_in_results[old_permission_result.rowHeader]['chrome'] = [];

                if(old_permission_result.col1 !==permission.col1){
                  if(!old_permission_result.col1){
                    changes_in_results[old_permission_result.rowHeader]['chrome'].push("✅ Now considered powerful (supported in navigator.permissions.query). ");
                  } else {
                    changes_in_results[old_permission_result.rowHeader]['chrome'].push("❌ Now NOT considered powerful (removed in navigator.permissions.query). ")
                  }
                }
                if(old_permission_result.col2 !==permission.col2){
                  if(!old_permission_result.col2){
                    changes_in_results[old_permission_result.rowHeader]['chrome'].push("✅ Now policy controlled. ");
                  } else {
                    changes_in_results[old_permission_result.rowHeader]['chrome'].push("❌ Now NOT considered policy-controlled. ");
                  }
                }
                if(old_permission_result.col3 !==permission.col3){
                  changes_in_results[old_permission_result.rowHeader]['chrome'].push(`⚠️ Policy controlled from ${old_permission_result.col3} to ${permission.col3}`);
                }
              }

              // Chromium
              // col4, col5, col6
              if(old_permission_result.col4 !==permission.col4 || 
                old_permission_result.col5 !==permission.col5 || 
                old_permission_result.col6 !==permission.col6){
                
                changes_in_results[old_permission_result.rowHeader]['chromium'] = [];

                if(old_permission_result.col4 !==permission.col4){
                  if(!old_permission_result.col4){
                    changes_in_results[old_permission_result.rowHeader]['chromium'].push("✅ Now considered powerful (supported in navigator.permissions.query). ");
                  } else {
                    changes_in_results[old_permission_result.rowHeader]['chromium'].push("❌ Now NOT considered powerful (removed in navigator.permissions.query). ")
                  }
                }
                if(old_permission_result.col5 !==permission.col5){
                  if(!old_permission_result.col5){
                    changes_in_results[old_permission_result.rowHeader]['chromium'].push("✅ Now policy controlled. ");
                  } else {
                    changes_in_results[old_permission_result.rowHeader]['chromium'].push("❌ Now NOT considered policy-controlled. ");
                  }
                }
                if(old_permission_result.col6 !==permission.col6){
                  changes_in_results[old_permission_result.rowHeader]['chrome'].push(`⚠️ Policy controlled from ${old_permission_result.col3} to ${permission.col3}`);
                }
              }

              // Firefox 
              // col7, col8
              if(old_permission_result.col7 !==permission.col7 || 
                old_permission_result.col8 !==permission.col8){
                
                changes_in_results[old_permission_result.rowHeader]['firefox'] = [];

                if(old_permission_result.col7 !==permission.col7){
                  if(!old_permission_result.col7){
                    changes_in_results[old_permission_result.rowHeader]['firefox'].push("✅ Now considered powerful (supported in navigator.permissions.query). ");
                  } else {
                    changes_in_results[old_permission_result.rowHeader]['firefox'].push("❌ Now NOT considered powerful (removed in navigator.permissions.query). ")
                  }
                }
                if(old_permission_result.col8 !==permission.col8){
                  if(!old_permission_result.col8){
                    changes_in_results[old_permission_result.rowHeader]['firefox'].push("✅ Now policy controlled. ");
                  } else {
                    changes_in_results[old_permission_result.rowHeader]['firefox'].push("❌ Now NOT considered policy-controlled. ");
                  }
                }

                // future col15?
                // if(old_permission_result.col3 !==permission.col3){
                //   changes_in_results[old_permission_result.rowHeader]['firefox'].push(`⚠️ Policy controlled from ${old_permission_result.col3} to ${permission.col3}`);
                // }
              }

              // Brave
              // col9, col10, col11
              if(old_permission_result.col9 !==permission.col9 || 
                old_permission_result.col10 !==permission.col10 || 
                old_permission_result.col11 !==permission.col11){
                
                changes_in_results[old_permission_result.rowHeader]['brave-browser'] = [];

                if(old_permission_result.col9 !==permission.col9){
                  if(!old_permission_result.col9){
                    changes_in_results[old_permission_result.rowHeader]['brave-browser'].push("✅ Now considered powerful (supported in navigator.permissions.query). ");
                  } else {
                    changes_in_results[old_permission_result.rowHeader]['brave-browser'].push("❌ Now NOT considered powerful (removed in navigator.permissions.query). ")
                  }
                }
                if(old_permission_result.col10 !==permission.col10){
                  if(!old_permission_result.col10){
                    changes_in_results[old_permission_result.rowHeader]['brave-browser'].push("✅ Now policy controlled. ");
                  } else {
                    changes_in_results[old_permission_result.rowHeader]['brave-browser'].push("❌ Now NOT considered policy-controlled. ");
                  }
                }
                if(old_permission_result.col11 !==permission.col11){
                  changes_in_results[old_permission_result.rowHeader]['brave-browser'].push(`⚠️ Policy controlled from ${old_permission_result.col3} to ${permission.col3}`);
                }
              }

              // Webkit
              // col12, col13, future col14?
              if(old_permission_result.col12 !==permission.col12 || 
                old_permission_result.col13 !==permission.col13){
                
                changes_in_results[old_permission_result.rowHeader]['webkit'] = [];

                if(old_permission_result.col12 !==permission.col12){
                  if(!old_permission_result.col12){
                    changes_in_results[old_permission_result.rowHeader]['webkit'].push("✅ Now considered powerful (supported in navigator.permissions.query). ");
                  } else {
                    changes_in_results[old_permission_result.rowHeader]['webkit'].push("❌ Now NOT considered powerful (removed in navigator.permissions.query). ")
                  }
                }
                if(old_permission_result.col13 !==permission.col13){
                  if(!old_permission_result.col13){
                    changes_in_results[old_permission_result.rowHeader]['webkit'].push("✅ Now policy controlled. ");
                  } else {
                    changes_in_results[old_permission_result.rowHeader]['webkit'].push("❌ Now NOT considered policy-controlled. ");
                  }
                }

                // future col14?
                // if(old_permission_result.col3 !==permission.col3){
                //   changes_in_results[old_permission_result.rowHeader]['firefox'].push(`⚠️ Policy controlled from ${old_permission_result.col3} to ${permission.col3}`);
                // }
              }
            }
          }
        }
      }
      permissions_result = result_content;
    }

    // ===================== Changes in the result of any of the permissions
    let brElement = document.createElement('br');
    new_div.appendChild(brElement)
    pElement = document.createElement('p');
    pElement.textContent = ">> Changes in results."
    new_div.appendChild(pElement);
    let result_changes = Object.values(changes_in_results).flatMap(obj => Object.values(obj)).filter(Array.isArray).reduce((sum, arr) => sum + arr.length, 0);
    pElement.textContent = `>> Changes in results (${result_changes} changes).`
    new_div.appendChild(pElement);

    if(result_changes !== 0){
      const ulElementDiff = document.createElement('ul');
      let ulElementDiffBrowser;
      let ulElementDiffChanges;
      for(permission in changes_in_results){
        if(Object.values(changes_in_results[permission]).length !== 0){
          // add permission
          liElement = document.createElement('li');
          liElement.textContent = permission;
          ulElementDiff.appendChild(liElement)

          // Each browser
          for(browser in changes_in_results[permission]){

            if(changes_in_results[permission][browser].length !== 0){
              ulElementDiffBrowser = document.createElement('ul');
              liElement = document.createElement('li');
              liElement.textContent = browser;
              ulElementDiffBrowser.appendChild(liElement)
              for(change of changes_in_results[permission][browser]){
                ulElementDiffChanges = document.createElement('ul');
                liElement = document.createElement('li');
                liElement.textContent = change;
                ulElementDiffChanges.appendChild(liElement);
                ulElementDiffBrowser.appendChild(ulElementDiffChanges);
              }
            }
            ulElementDiff.appendChild(ulElementDiffBrowser)
          }
          
          new_div.appendChild(ulElementDiff);
        }
      }
    }

    // ===================== Changes to `permissions.js` list
    brElement = document.createElement('br');
    new_div.appendChild(brElement)
    let aElement = document.createElement('a');
    aElement.setAttribute('href', "https://github.com/AlbertoFDR/browser-permissions-tool/blob/main/code/permissions.js");
    aElement.textContent = `>> Changes in permissions.js file (${result_content['result'].length} permissions).`
    new_div.appendChild(aElement);
    
    if(permissions_added_and_removed_in_list.length !== 0){
      const ulElementDiff = document.createElement('ul');
      for(perm of permissions_added_and_removed_in_list){
        liElement = document.createElement('li');
        liElement.textContent = perm;
        ulElementDiff.appendChild(liElement)
      }
      new_div.appendChild(ulElementDiff);
    }



    version_elements_to_add.push(new_div);
  };

  // Start including from the old versions
  version_elements_to_add.reverse().forEach((elem)=>{container.appendChild(elem)});

}

window.onload = fillPage;
