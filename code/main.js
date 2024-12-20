const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { chromium, firefox, webkit } = require('playwright');
const { PERMISSIONS } = require('./permissions.js');
const { sleep, getCurrentDate, saveResults } = require('./utils.js');

// Config
const CHROME_TEST = true;
const CHROMIUM_TEST = true;
const FIREFOX_TEST = true;
const BRAVE_TEST = true;
const WEBKIT_TEST = true;

const BRAVE_BIN = '/usr/bin/brave-browser';
const URL_FOR_TESTING = 'https://albertofdr.github.io/browser-permissions-tool/index.html';


async function get_versions(){
  // Get Playwright version
  const playwrightVersion = require('playwright/package.json').version;
  console.log('Playwright version:', playwrightVersion);

  // Launch the browsers to get their versions
  const chromeBrowser = await chromium.launch({ channel: 'chrome' });
  const chromiumBrowser = await chromium.launch();
  const firefoxBrowser = await firefox.launch();
  const webkitBrowser = await webkit.launch();

  const chromeVersion = await chromeBrowser.version();
  const chromiumVersion = await chromiumBrowser.version();
  const firefoxVersion = await firefoxBrowser.version();
  const webkitVersion = await webkitBrowser.version();
  // https://github.com/privacytests/privacytests.org/blob/9743fd23a5456b1038bfea8b5e1199afc13ba581/scripts/desktop.js#L238
  const braveVersionOutput = execSync(`${BRAVE_BIN} --version`, { encoding: 'utf8' }); 
  const braveVersion = braveVersionOutput.trim().replace(/^[^.]*\./, ''); 

  // Print the versions
  console.log('Chrome version:', chromeVersion);
  console.log('Chromium version:', chromiumVersion);
  console.log('Firefox version:', firefoxVersion);
  console.log('Brave version:', braveVersion);
  console.log('WebKit version:', webkitVersion);

  // Close browsers
  await chromeBrowser.close();
  await chromiumBrowser.close();
  await firefoxBrowser.close();
  await webkitBrowser.close();

  return [chromeVersion, chromiumVersion, firefoxVersion, braveVersion, webkitVersion, playwrightVersion];
}


async function webkit_crawler(permission){
  const browser = await webkit.launch();  
  const context = await browser.newContext();
  const page = await context.newPage();
  let powerful_feature = true;

  // Still not supported
  let policy_controlled = false

  // page.on('pageerror', exception => {
  //   if (exception.toString().includes('Permissions::query does not support this API')){
  //     powerful_feature = false
  //   }
  // });

  await page.goto(URL_FOR_TESTING, { timeout: 60000 });
  // other actions...
  powerful_feature = await page.evaluate(`navigator.permissions.query({ name: "${permission}" }).then((result) => {return true;}).catch((error)=>{return false});`);
  await browser.close();
  return [powerful_feature, policy_controlled];
}

async function firefox_crawler(permission){
  const browser = await firefox.launch();  
  const context = await browser.newContext();
  const page = await context.newPage();
  let powerful_feature = true

  // Still not supported
  let policy_controlled = false

  // page.on('pageerror', exception => {
  //   if (exception.toString().includes('is not a valid value for enumeration PermissionName')){
  //     powerful_feature = false
  //   }
  // });

  await page.goto(URL_FOR_TESTING, {timeout: 60000});
  powerful_feature = await page.evaluate(`navigator.permissions.query({ name: "${permission}" }).then((result) => {return true;}).catch((error)=>{return false});`);
  await browser.close();
  return [powerful_feature, policy_controlled];
}

async function get_default_policy(browser_type, permission){
  /* Get Default Policy of a specific permission in Chromium/Chrome
   * Loading a parent page with an iframe and using allowsFeature with NO PP Header
   * Possible allowsFeature result:
   * parent page True, iframe True => Default Policy '*' 
   * parent page True, iframe False => Default Policy 'self' 
   * parent page True, iframe True => Default Policy 'none' 
   */

  let iframeHTML = decodeURIComponent("<iframe id='iframe' allow='' src='//example.org/'>")
  let URL = `https://albertofdr.github.io/dummy-pages/testing-pages/live-editor.html?html=${iframeHTML}`

  let browser = "";
  if(browser_type === 'chrome'){
    browser = await chromium.launch({ channel: 'chrome' });
  } else if(browser_type === 'chromium') {
    browser = await chromium.launch();
  } else if (browser_type === 'brave') { 
    browser = await chromium.launch({executablePath: BRAVE_BIN});
  }
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(URL, { timeout: 60000 });

  // Wait for iframe
  const iframeElement = await page.waitForSelector('#iframe');
  const iframe = await iframeElement.contentFrame();

  // Result
  page_result = await page.evaluate(`document.featurePolicy.allowsFeature('${permission}')`);
  iframe_result = await iframe.evaluate(`document.featurePolicy.allowsFeature('${permission}')`);
  
  await browser.close();

  if (page_result && iframe_result ){
    return '*'
  } else if (page_result && !iframe_result){
    return 'self'
  } else if (!page_result && !iframe_result){
    return 'none'
  } else {
    console.log(`[ERROR][get_default_policy] Page result '${page_result}' or iframe result '${iframe_result}' has some error`);
  }
}


async function chromium_crawler(browser_type, permission){
  let browser = "";
  if(browser_type === 'chrome'){
    browser = await chromium.launch({ channel: 'chrome' });
  } else if(browser_type === 'chromium') {
    browser = await chromium.launch();
  } else if (browser_type === 'brave') { 
    browser = await chromium.launch({executablePath: BRAVE_BIN});
  }
  const context = await browser.newContext();
  const page = await context.newPage();
  let powerful_feature = true
  let policy_controlled = true

  // Intercept network responses
  // Set PP header
  await page.route('**', async (route) => {
    const request = route.request();
    if (request.method() === 'GET' && request.resourceType() === 'document') {
      const response = await route.fetch();
      const headers = {
        ...response.headers(),
        'Permissions-Policy': `${permission}=*`
      };

      route.fulfill({
        response,
        headers
      });
    } else {
      // Pass through other requests without modification
      route.continue();
    }
  });

  page.on('console', msg => {
      if (msg.text().includes('Permissions-Policy header: Unrecognized feature:')){
        policy_controlled = false
      }
    }
  );

  // Using a page that uses the navigator.permissions.query and the feature doesn't exist
  // page.on('pageerror', exception => {
  //   if (exception.toString().includes('is not a valid enum value of type PermissionName.')){
  //     powerful_feature = false
  //   }
  // });

  await page.goto(URL_FOR_TESTING, { timeout: 60000 });
  
  // powerful check
  powerful_feature = await page.evaluate(`navigator.permissions.query({ name: "${permission}" }).then((result) => {return true;}).catch((error)=>{return false});`);

  // default_policy 
  let default_policy_check_works = await page.evaluate(`document.featurePolicy.allowsFeature('${permission}')`);
  await browser.close();

  // Policy
  let default_policy = '';
  if (policy_controlled && default_policy_check_works){
    default_policy = await get_default_policy(browser_type, permission); 
  } else if (policy_controlled && !default_policy_check_works){
    console.log(`Permission '${permission}' is policy-controlled but doesn't appear in 'document.featurePolicy.allowsFeature' even when PP header is *`);
  }
  return [powerful_feature, policy_controlled, default_policy]
}

async function test(){
  const start = Date.now(); 
  const date = getCurrentDate();
  const results = {
    "date": getCurrentDate(),
    "time": "",
    "chrome_version": "",
    "chromium_version": "",
    "firefox_version": "",
    "brave_version": "",
    "webkit_version": "",
    "playwright_version": "",
    "result": []
  }

  // Get versions
  let versions = await get_versions();
  results["chrome_version"] = versions[0]
  results["chromium_version"] = versions[1]
  results["firefox_version"] = versions[2]
  results["brave_version"] = versions[3]
  results["webkit_version"] = versions[4]
  results["playwright_version"] = versions[5]

  console.log(`================== ANALYZING ${PERMISSIONS.length} PERMISSIONS`);
  for (const permission of PERMISSIONS){

    console.log(`============ ${permission}`);
    let permission_result = {
      rowHeader: permission,
      // Chrome
      // powerful, pp, default policy
      col1: "", col2: "", col3: "",
      // Chromium
      // powerful, pp, default
      col4: "", col5: "", col6: "",
      // Firefox
      // powerful, pp
      col7: "", col8: "",
      // Brave
      // powerful, pp, default
      col9: "", col10: "", col11: "",
      // Webkit
      // powerful, pp
      col12: "", col13: ""
    }
    
    if (CHROME_TEST){
      let [powerful_feature, policy_controlled, default_policy] = await chromium_crawler('chrome', permission) 
      permission_result["col1"] = powerful_feature;
      permission_result["col2"] = policy_controlled;
      permission_result["col3"] = default_policy;
    }

    if (CHROMIUM_TEST){ 
      let [powerful_feature, policy_controlled, default_policy] = await chromium_crawler('chromium', permission) 
      permission_result["col4"] = powerful_feature;
      permission_result["col5"] = policy_controlled;
      permission_result["col6"] = default_policy;
    };

    if (FIREFOX_TEST){ 
      let [powerful_feature, policy_controlled] = await firefox_crawler(permission) 
      permission_result["col7"] = powerful_feature;
      permission_result["col8"] = policy_controlled;
    };

    if (BRAVE_TEST){ 
      let [powerful_feature, policy_controlled, default_policy] = await chromium_crawler('brave', permission) 
      permission_result["col9"] = powerful_feature;
      permission_result["col10"] = policy_controlled;
      permission_result["col11"] = default_policy;
    };

    if (WEBKIT_TEST){ 
      let [powerful_feature, policy_controlled] = await webkit_crawler(permission) 
      permission_result["col12"] = powerful_feature;
      permission_result["col13"] = policy_controlled;
    };

    console.log(permission_result);
    results['result'].push(permission_result);
  }

  const end = Date.now(); // Capture the end time
  const executionTime = end - start; // Calculate time in milliseconds
  
  const minutes = Math.floor(executionTime / 60000); // Convert milliseconds to minutes
  const seconds = Math.floor((executionTime % 60000) / 1000); // Convert milliseconds to seconds
  results['time'] = `${minutes}:${seconds}`
  saveResults(results);
}

test()
