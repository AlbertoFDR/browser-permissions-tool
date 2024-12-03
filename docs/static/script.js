

// Function to build the table
function buildTable(data) {
  const topHeaderRow = document.getElementById('topHeaderRow');
  const columnHeaderRow = document.getElementById('columnHeaderRow');
  const tableBody = document.getElementById('tableBody');
  let chrome_version = data['chrome_version'];
  let chromium_version = data['chromium_version'];
  let firefox_version = data['firefox_version'];
  let webkit_version = data['webkit_version'];
  let permissions_data = data['result'];
  let date = data['date'];

  // Date
  const date_element = document.getElementById('date');
  date_element.textContent = date;


  // Clear existing content
  topHeaderRow.innerHTML = '';
  columnHeaderRow.innerHTML = '';
  tableBody.innerHTML = '';

  // Add the top header row for every two columns
  const topHeaderCell = document.createElement('th');
  topHeaderCell.rowSpan = 2; 
  topHeaderCell.textContent = `${permissions_data.length} Permissions`;
  topHeaderRow.appendChild(topHeaderCell);

  const topHeaders = [{ name: `Chrome ${chrome_version}`, svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" height="48" width="48"><defs> <linearGradient id="a" x1="3.2173" y1="15" x2="44.7812" y2="15" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#d93025" /> <stop offset="1" stop-color="#ea4335" /> </linearGradient> <linearGradient id="b" x1="20.7219" y1="47.6791" x2="41.5039" y2="11.6837" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#fcc934" /> <stop offset="1" stop-color="#fbbc04" /> </linearGradient> <linearGradient id="c" x1="26.5981" y1="46.5015" x2="5.8161" y2="10.506" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#1e8e3e" /> <stop offset="1" stop-color="#34a853" /> </linearGradient> </defs> <circle cx="24" cy="23.9947" r="12" style="fill:#fff" /> <path d="M3.2154,36A24,24,0,1,0,12,3.2154,24,24,0,0,0,3.2154,36ZM34.3923,18A12,12,0,1,1,18,13.6077,12,12,0,0,1,34.3923,18Z" style="fill:none" /> <path d="M24,12H44.7812a23.9939,23.9939,0,0,0-41.5639.0029L13.6079,30l.0093-.0024A11.9852,11.9852,0,0,1,24,12Z" style="fill:url(#a)" /> <circle cx="24" cy="24" r="9.5" style="fill:#1a73e8" /> <path d="M34.3913,30.0029,24.0007,48A23.994,23.994,0,0,0,44.78,12.0031H23.9989l-.0025.0093A11.985,11.985,0,0,1,34.3913,30.0029Z" style="fill:url(#b)" /> <path d="M13.6086,30.0031,3.218,12.006A23.994,23.994,0,0,0,24.0025,48L34.3931,30.0029l-.0067-.0068a11.9852,11.9852,0,0,1-20.7778.007Z" style="fill:url(#c)" /> </svg>` },  
    { name: `Chromium ${chromium_version}`, svg: `<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" version="1.1" id="svg44" width="48" height="48" viewBox="0 0 511.98489 511.98489"><defs id="defs18"> <linearGradient xlink:href="#linearGradient4975" id="linearGradient4633" gradientUnits="userSpaceOnUse" gradientTransform="matrix(231.62575,0,0,231.62472,111.11013,159.99363)" x2="0.5565635" x1="0.46521288" y1="-0.67390651" y2="0.81129867"/> <linearGradient id="linearGradient4975"> <stop style="stop-color:#1972e7" offset="0" id="stop4971"/> <stop style="stop-color:#1969d5" offset="1" id="stop4973"/> </linearGradient> <linearGradient xlink:href="#3" id="linearGradient1331" x1="101.74381" y1="33.726189" x2="101.59915" y2="135.466" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.7794235,0,0,3.7794067,0.00151555,0.00377865)"/> <linearGradient id="3" x2="1" gradientTransform="matrix(61.286,0,0,61.286,29.399,42.333)" gradientUnits="userSpaceOnUse"> <stop offset="0" id="stop1397" style="stop-color:#afccfb"/> <stop offset="1" id="stop1399" style="stop-color:#8bb5f8"/> </linearGradient> <linearGradient xlink:href="#1" id="linearGradient2962" gradientUnits="userSpaceOnUse" gradientTransform="matrix(94.931559,164.42687,-164.4276,94.931137,97.555991,173.61083)" x2="1.7695541" x1="0.018202547" y1="-0.51170158" y2="0.4994337"/> <linearGradient id="1" x2="1" gradientTransform="matrix(25.118,43.506,-43.506,25.118,25.812,45.935)" gradientUnits="userSpaceOnUse"> <stop offset="0" id="stop3122" style="stop-color:#659cf6"/> <stop offset="1" id="stop3124" style="stop-color:#4285f4"/> </linearGradient> <linearGradient xlink:href="#2" id="linearGradient2688" x1="67.452377" y1="40.320694" x2="67.733002" y2="95.25" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.7794235,0,0,3.7794067,0.00150043,0.00377865)"/> <linearGradient id="2"> <stop style="stop-color:#3680f0" offset="0" id="stop2682"/> <stop style="stop-color:#2678ec" offset="1" id="stop2684"/> </linearGradient> </defs> <path d="m 255.99319,255.99433 110.85049,63.99671 -110.85049,191.99385 c 141.38068,0 255.9917,-114.61051 255.9917,-255.99056 0,-46.64165 -12.53559,-90.3316 -34.33115,-127.99716 h -221.6632 z" id="path34-4" style="fill:url(#linearGradient1331)"/> <path d="M 255.99054,0 C 161.2404,0 78.576848,51.513314 34.31224,128.0274 l 110.82781,191.96363 110.85049,-63.9967 V 127.99717 h 221.6632 C 433.38157,51.501975 350.72936,0 255.99054,0 Z" id="path36-1" style="fill:url(#linearGradient4633)"/> <path d="m 0.00151177,255.99433 c 0,141.38005 114.60723823,255.99056 255.99168823,255.99056 L 366.84368,319.99103 255.9932,255.99433 145.14271,319.99103 34.314897,128.0274 C 12.531434,165.68239 0,209.35646 0,255.99056" id="path38-7" style="fill:url(#linearGradient2962)"/> <path d="m 383.99094,255.99433 c 0,70.69003 -57.30741,127.99717 -127.99775,127.99717 -70.69034,0 -127.99773,-57.30714 -127.99773,-127.99717 0,-70.69002 57.30739,-127.99716 127.99773,-127.99716 70.69034,0 127.99775,57.30714 127.99775,127.99716" fill="#ffffff" id="path40"/> <path d="m 359.99158,255.99433 c 0,57.43565 -46.56249,103.99794 -103.99839,103.99794 -57.4359,0 -103.9984,-46.56229 -103.9984,-103.99794 0,-57.43564 46.5625,-103.99793 103.9984,-103.99793 57.4359,0 103.99839,46.56229 103.99839,103.99793" id="path42-5" style="fill:url(#linearGradient2688)"/> </svg>` }, 
    { name: `Firefox ${firefox_version}`, svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" width="48" height="48" version="1.1" viewBox="0 0 77.42 79.97"><title>Firefox Browser logo</title> <defs> <linearGradient id="a" x1="70.79" x2="6.447" y1="12.39" y2="74.47" gradientTransform="translate(-1.3 -.004086)" gradientUnits="userSpaceOnUse"> <stop stop-color="#fff44f" offset=".048"/> <stop stop-color="#ffe847" offset=".111"/> <stop stop-color="#ffc830" offset=".225"/> <stop stop-color="#ff980e" offset=".368"/> <stop stop-color="#ff8b16" offset=".401"/> <stop stop-color="#ff672a" offset=".462"/> <stop stop-color="#ff3647" offset=".534"/> <stop stop-color="#e31587" offset=".705"/> </linearGradient> <radialGradient id="b" cx="-7907" cy="-8515" r="80.8" gradientTransform="translate(7974,8524)" gradientUnits="userSpaceOnUse"> <stop stop-color="#ffbd4f" offset=".129"/> <stop stop-color="#ffac31" offset=".186"/> <stop stop-color="#ff9d17" offset=".247"/> <stop stop-color="#ff980e" offset=".283"/> <stop stop-color="#ff563b" offset=".403"/> <stop stop-color="#ff3750" offset=".467"/> <stop stop-color="#f5156c" offset=".71"/> <stop stop-color="#eb0878" offset=".782"/> <stop stop-color="#e50080" offset=".86"/> </radialGradient> <radialGradient id="c" cx="-7937" cy="-8482" r="80.8" gradientTransform="translate(7974,8524)" gradientUnits="userSpaceOnUse"> <stop stop-color="#960e18" offset=".3"/> <stop stop-color="#b11927" stop-opacity=".74" offset=".351"/> <stop stop-color="#db293d" stop-opacity=".343" offset=".435"/> <stop stop-color="#f5334b" stop-opacity=".094" offset=".497"/> <stop stop-color="#ff3750" stop-opacity="0" offset=".53"/> </radialGradient> <radialGradient id="d" cx="-7927" cy="-8533" r="58.53" gradientTransform="translate(7974,8524)" gradientUnits="userSpaceOnUse"> <stop stop-color="#fff44f" offset=".132"/> <stop stop-color="#ffdc3e" offset=".252"/> <stop stop-color="#ff9d12" offset=".506"/> <stop stop-color="#ff980e" offset=".526"/> </radialGradient> <radialGradient id="e" cx="-7946" cy="-8461" r="38.47" gradientTransform="translate(7974,8524)" gradientUnits="userSpaceOnUse"> <stop stop-color="#3a8ee6" offset=".353"/> <stop stop-color="#5c79f0" offset=".472"/> <stop stop-color="#9059ff" offset=".669"/> <stop stop-color="#c139e6" offset="1"/> </radialGradient> <radialGradient id="f" cx="-7936" cy="-8492" r="20.4" gradientTransform="matrix(.972 -.235 .275 1.138 10090 7834)" gradientUnits="userSpaceOnUse"> <stop stop-color="#9059ff" stop-opacity="0" offset=".206"/> <stop stop-color="#8c4ff3" stop-opacity=".064" offset=".278"/> <stop stop-color="#7716a8" stop-opacity=".45" offset=".747"/> <stop stop-color="#6e008b" stop-opacity=".6" offset=".975"/> </radialGradient> <radialGradient id="g" cx="-7938" cy="-8518" r="27.68" gradientTransform="translate(7974,8524)" gradientUnits="userSpaceOnUse"> <stop stop-color="#ffe226" offset="0"/> <stop stop-color="#ffdb27" offset=".121"/> <stop stop-color="#ffc82a" offset=".295"/> <stop stop-color="#ffa930" offset=".502"/> <stop stop-color="#ff7e37" offset=".732"/> <stop stop-color="#ff7139" offset=".792"/> </radialGradient> <radialGradient id="h" cx="-7916" cy="-8536" r="118.1" gradientTransform="translate(7974,8524)" gradientUnits="userSpaceOnUse"> <stop stop-color="#fff44f" offset=".113"/> <stop stop-color="#ff980e" offset=".456"/> <stop stop-color="#ff5634" offset=".622"/> <stop stop-color="#ff3647" offset=".716"/> <stop stop-color="#e31587" offset=".904"/> </radialGradient> <radialGradient id="i" cx="-7927" cy="-8523" r="86.5" gradientTransform="matrix(.105 .995 -.653 .069 -4685 8470)" gradientUnits="userSpaceOnUse"> <stop stop-color="#fff44f" offset="0"/> <stop stop-color="#ffe847" offset=".06"/> <stop stop-color="#ffc830" offset=".168"/> <stop stop-color="#ff980e" offset=".304"/> <stop stop-color="#ff8b16" offset=".356"/> <stop stop-color="#ff672a" offset=".455"/> <stop stop-color="#ff3647" offset=".57"/> <stop stop-color="#e31587" offset=".737"/> </radialGradient> <radialGradient id="j" cx="-7938" cy="-8508" r="73.72" gradientTransform="translate(7974,8524)" gradientUnits="userSpaceOnUse"> <stop stop-color="#fff44f" offset=".137"/> <stop stop-color="#ff980e" offset=".48"/> <stop stop-color="#ff5634" offset=".592"/> <stop stop-color="#ff3647" offset=".655"/> <stop stop-color="#e31587" offset=".904"/> </radialGradient> <radialGradient id="k" cx="-7919" cy="-8504" r="80.69" gradientTransform="translate(7974,8524)" gradientUnits="userSpaceOnUse"> <stop stop-color="#fff44f" offset=".094"/> <stop stop-color="#ffe141" offset=".231"/> <stop stop-color="#ffaf1e" offset=".509"/> <stop stop-color="#ff980e" offset=".626"/> </radialGradient> <linearGradient id="l" x1="70.01" x2="15.27" y1="12.06" y2="66.81" gradientTransform="translate(-1.3 -.004086)" gradientUnits="userSpaceOnUse"> <stop stop-color="#fff44f" stop-opacity=".8" offset=".167"/> <stop stop-color="#fff44f" stop-opacity=".634" offset=".266"/> <stop stop-color="#fff44f" stop-opacity=".217" offset=".489"/> <stop stop-color="#fff44f" stop-opacity="0" offset=".6"/> </linearGradient> </defs> <g transform="matrix(.9819843 0 0 .9819843 .6974849 .7199239)"> <path d="m74.62 26.83c-1.684-4.052-5.1-8.427-7.775-9.81a40.27 40.27 0 0 1 3.925 11.76l7e-3 0.065c-4.382-10.92-11.81-15.33-17.88-24.92-0.307-0.485-0.614-0.971-0.913-1.484-0.171-0.293-0.308-0.557-0.427-0.8a7.053 7.053 0 0 1-0.578-1.535 0.1 0.1 0 0 0-0.088-0.1 0.138 0.138 0 0 0-0.073 0c-5e-3 0-0.013 9e-3 -0.019 0.011s-0.019 0.011-0.028 0.015l0.015-0.026c-9.735 5.7-13.04 16.25-13.34 21.53a19.39 19.39 0 0 0-10.67 4.111 11.59 11.59 0 0 0-1-0.758 17.97 17.97 0 0 1-0.109-9.473 28.7 28.7 0 0 0-9.329 7.21h-0.018c-1.536-1.947-1.428-8.367-1.34-9.708a6.928 6.928 0 0 0-1.294 0.687 28.22 28.22 0 0 0-3.788 3.245 33.84 33.84 0 0 0-3.623 4.347v6e-3 -7e-3a32.73 32.73 0 0 0-5.2 11.74l-0.052 0.256c-0.073 0.341-0.336 2.049-0.381 2.42 0 0.029-6e-3 0.056-9e-3 0.085a36.94 36.94 0 0 0-0.629 5.343v0.2a38.76 38.76 0 0 0 76.95 6.554c0.065-0.5 0.118-0.995 0.176-1.5a39.86 39.86 0 0 0-2.514-19.47zm-44.67 30.34c0.181 0.087 0.351 0.181 0.537 0.264l0.027 0.017q-0.282-0.135-0.564-0.281zm8.878-23.38m31.95-4.934v-0.037l7e-3 0.041z" fill="url(#a)"/> <path d="m74.62 26.83c-1.684-4.052-5.1-8.427-7.775-9.81a40.27 40.27 0 0 1 3.925 11.76v0.037l7e-3 0.041a35.1 35.1 0 0 1-1.206 26.16c-4.442 9.531-15.19 19.3-32.02 18.82-18.18-0.515-34.2-14.01-37.19-31.68-0.545-2.787 0-4.2 0.274-6.465a28.88 28.88 0 0 0-0.623 5.348v0.2a38.76 38.76 0 0 0 76.95 6.554c0.065-0.5 0.118-0.995 0.176-1.5a39.86 39.86 0 0 0-2.514-19.47z" fill="url(#b)"/> <path d="m74.62 26.83c-1.684-4.052-5.1-8.427-7.775-9.81a40.27 40.27 0 0 1 3.925 11.76v0.037l7e-3 0.041a35.1 35.1 0 0 1-1.206 26.16c-4.442 9.531-15.19 19.3-32.02 18.82-18.18-0.515-34.2-14.01-37.19-31.68-0.545-2.787 0-4.2 0.274-6.465a28.88 28.88 0 0 0-0.623 5.348v0.2a38.76 38.76 0 0 0 76.95 6.554c0.065-0.5 0.118-0.995 0.176-1.5a39.86 39.86 0 0 0-2.514-19.47z" fill="url(#c)"/> <path d="m55.78 31.38c0.084 0.059 0.162 0.118 0.241 0.177a21.1 21.1 0 0 0-3.6-4.695c-12.05-12.05-3.157-26.12-1.658-26.84l0.015-0.022c-9.735 5.7-13.04 16.25-13.34 21.53 0.452-0.031 0.9-0.069 1.362-0.069a19.56 19.56 0 0 1 16.98 9.917z" fill="url(#d)"/> <path d="m38.82 33.79c-0.064 0.964-3.47 4.289-4.661 4.289-11.02 0-12.81 6.667-12.81 6.667 0.488 5.614 4.4 10.24 9.129 12.68 0.216 0.112 0.435 0.213 0.654 0.312q0.569 0.252 1.138 0.466a17.24 17.24 0 0 0 5.043 0.973c19.32 0.906 23.06-23.1 9.119-30.07a13.38 13.38 0 0 1 9.345 2.269 19.56 19.56 0 0 0-16.98-9.917c-0.46 0-0.91 0.038-1.362 0.069a19.39 19.39 0 0 0-10.67 4.111c0.591 0.5 1.258 1.168 2.663 2.553 2.63 2.591 9.375 5.275 9.39 5.59z" fill="url(#e)"/> <path d="m38.82 33.79c-0.064 0.964-3.47 4.289-4.661 4.289-11.02 0-12.81 6.667-12.81 6.667 0.488 5.614 4.4 10.24 9.129 12.68 0.216 0.112 0.435 0.213 0.654 0.312q0.569 0.252 1.138 0.466a17.24 17.24 0 0 0 5.043 0.973c19.32 0.906 23.06-23.1 9.119-30.07a13.38 13.38 0 0 1 9.345 2.269 19.56 19.56 0 0 0-16.98-9.917c-0.46 0-0.91 0.038-1.362 0.069a19.39 19.39 0 0 0-10.67 4.111c0.591 0.5 1.258 1.168 2.663 2.553 2.63 2.591 9.375 5.275 9.39 5.59z" fill="url(#f)"/> <path d="m24.96 24.36c0.314 0.2 0.573 0.374 0.8 0.531a17.97 17.97 0 0 1-0.109-9.473 28.7 28.7 0 0 0-9.329 7.21c0.189-5e-3 5.811-0.106 8.638 1.732z" fill="url(#g)"/> <path d="m0.354 42.16c2.991 17.67 19.01 31.17 37.19 31.68 16.83 0.476 27.58-9.294 32.02-18.82a35.1 35.1 0 0 0 1.206-26.16v-0.037c0-0.029-6e-3 -0.046 0-0.037l7e-3 0.065c1.375 8.977-3.191 17.67-10.33 23.56l-0.022 0.05c-13.91 11.33-27.22 6.834-29.91 5q-0.282-0.135-0.564-0.281c-8.109-3.876-11.46-11.26-10.74-17.6a9.953 9.953 0 0 1-9.181-5.775 14.62 14.62 0 0 1 14.25-0.572 19.3 19.3 0 0 0 14.55 0.572c-0.015-0.315-6.76-3-9.39-5.59-1.405-1.385-2.072-2.052-2.663-2.553a11.59 11.59 0 0 0-1-0.758c-0.23-0.157-0.489-0.327-0.8-0.531-2.827-1.838-8.449-1.737-8.635-1.732h-0.018c-1.536-1.947-1.428-8.367-1.34-9.708a6.928 6.928 0 0 0-1.294 0.687 28.22 28.22 0 0 0-3.788 3.245 33.84 33.84 0 0 0-3.638 4.337v6e-3 -7e-3a32.73 32.73 0 0 0-5.2 11.74c-0.019 0.079-1.396 6.099-0.717 9.221z" fill="url(#h)"/> <path d="m52.42 26.86a21.1 21.1 0 0 1 3.6 4.7c0.213 0.161 0.412 0.321 0.581 0.476 8.787 8.1 4.183 19.55 3.84 20.36 7.138-5.881 11.7-14.58 10.33-23.56-4.384-10.93-11.82-15.34-17.88-24.93-0.307-0.485-0.614-0.971-0.913-1.484-0.171-0.293-0.308-0.557-0.427-0.8a7.053 7.053 0 0 1-0.578-1.535 0.1 0.1 0 0 0-0.088-0.1 0.138 0.138 0 0 0-0.073 0c-5e-3 0-0.013 9e-3 -0.019 0.011s-0.019 0.011-0.028 0.015c-1.499 0.711-10.39 14.79 1.66 26.83z" fill="url(#i)"/> <path d="m56.6 32.04c-0.169-0.155-0.368-0.315-0.581-0.476-0.079-0.059-0.157-0.118-0.241-0.177a13.38 13.38 0 0 0-9.345-2.269c13.94 6.97 10.2 30.97-9.119 30.07a17.24 17.24 0 0 1-5.043-0.973q-0.569-0.213-1.138-0.466c-0.219-0.1-0.438-0.2-0.654-0.312l0.027 0.017c2.694 1.839 16 6.332 29.91-5l0.022-0.05c0.347-0.81 4.951-12.26-3.84-20.36z" fill="url(#j)"/> <path d="m21.35 44.74s1.789-6.667 12.81-6.667c1.191 0 4.6-3.325 4.661-4.289a19.3 19.3 0 0 1-14.55-0.572 14.62 14.62 0 0 0-14.25 0.572 9.953 9.953 0 0 0 9.181 5.775c-0.718 6.337 2.632 13.72 10.74 17.6 0.181 0.087 0.351 0.181 0.537 0.264-4.733-2.445-8.641-7.069-9.129-12.68z" fill="url(#k)"/> <path d="m74.62 26.83c-1.684-4.052-5.1-8.427-7.775-9.81a40.27 40.27 0 0 1 3.925 11.76l7e-3 0.065c-4.382-10.92-11.81-15.33-17.88-24.92-0.307-0.485-0.614-0.971-0.913-1.484-0.171-0.293-0.308-0.557-0.427-0.8a7.053 7.053 0 0 1-0.578-1.535 0.1 0.1 0 0 0-0.088-0.1 0.138 0.138 0 0 0-0.073 0c-5e-3 0-0.013 9e-3 -0.019 0.011s-0.019 0.011-0.028 0.015l0.015-0.026c-9.735 5.7-13.04 16.25-13.34 21.53 0.452-0.031 0.9-0.069 1.362-0.069a19.56 19.56 0 0 1 16.98 9.917 13.38 13.38 0 0 0-9.345-2.269c13.94 6.97 10.2 30.97-9.119 30.07a17.24 17.24 0 0 1-5.043-0.973q-0.569-0.213-1.138-0.466c-0.219-0.1-0.438-0.2-0.654-0.312l0.027 0.017q-0.282-0.135-0.564-0.281c0.181 0.087 0.351 0.181 0.537 0.264-4.733-2.446-8.641-7.07-9.129-12.68 0 0 1.789-6.667 12.81-6.667 1.191 0 4.6-3.325 4.661-4.289-0.015-0.315-6.76-3-9.39-5.59-1.405-1.385-2.072-2.052-2.663-2.553a11.59 11.59 0 0 0-1-0.758 17.97 17.97 0 0 1-0.109-9.473 28.7 28.7 0 0 0-9.329 7.21h-0.018c-1.536-1.947-1.428-8.367-1.34-9.708a6.928 6.928 0 0 0-1.294 0.687 28.22 28.22 0 0 0-3.788 3.245 33.84 33.84 0 0 0-3.623 4.347v6e-3 -7e-3a32.73 32.73 0 0 0-5.2 11.74l-0.052 0.256c-0.073 0.341-0.4 2.073-0.447 2.445a45.09 45.09 0 0 0-0.572 5.403v0.2a38.76 38.76 0 0 0 76.95 6.554c0.065-0.5 0.118-0.995 0.176-1.5a39.86 39.86 0 0 0-2.514-19.47zm-3.845 1.991 7e-3 0.041z" fill="url(#l)"/> </g> </svg>` }, 
    { name: `WebKit ${webkit_version}`, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 552" height="48" width="48" version="1.1"><defs> <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="blues"> <stop stop-color="#34AADC" offset="0%"/> <stop stop-color="#007AFF" offset="100%"/> </linearGradient> <filter x="-50%" y="-50%" width="200%" height="200%" id="shadow"> <feOffset dx="0" dy="5" in="SourceAlpha" result="offset"/> <feGaussianBlur stdDeviation="2.5" in="offset" result="blur"/> <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.07 0" in="blur" type="matrix" result="matrix"/> <feMerge> <feMergeNode in="matrix"/> <feMergeNode in="SourceGraphic"/> </feMerge> </filter> </defs> <path d="M 477.861111 306.92819 C 512.046296 333.587507 512.046296 377.446382 477.861111 404.320693 L 317.015432 530.737452 C 282.830247 557.396768 227.169753 557.396768 192.984568 530.737452 L 32.1388889 404.535688 C -2.0462963 377.876371 -2.0462963 334.017496 32.1388889 307.143185 L 192.984568 180.726426 C 227.169753 154.06711 282.830247 154.06711 317.015432 180.726426 L 477.861111 306.92819 Z" fill="rgb(255, 157, 0)" id="base"/> <path d="M 193.370239 451.831773 L 31.8122232 324.860059 C 15.5243578 312.097996 6.5 295.009809 6.5 276.840092 C 6.5 258.670375 15.5243578 241.582189 31.8122232 228.820125 L 193.370239 101.632105 C 209.658105 88.8700422 231.668733 81.7319391 255 81.7319391 C 278.331267 81.7319391 300.121789 88.8700422 316.629761 101.632105 L 478.187777 228.603819 C 494.475642 241.365882 503.5 258.454069 503.5 276.623786 C 503.5 294.793503 494.475642 311.881689 478.187777 324.643753 L 316.629761 451.615467 C 300.121789 464.593836 278.331267 471.731939 255 471.731939 C 231.668733 471.731939 209.878211 464.593836 193.370239 451.831773 Z" fill="rgba(0, 0, 0, 0.1)" filter="url(#shadow)" id="mid-shadow"/> <path d="M 193.370239 451.831773 L 31.8122232 324.860059 C 15.5243578 312.097996 6.5 295.009809 6.5 276.840092 C 6.5 258.670375 15.5243578 241.582189 31.8122232 228.820125 L 193.370239 101.632105 C 209.658105 88.8700422 231.668733 81.7319391 255 81.7319391 C 278.331267 81.7319391 300.121789 88.8700422 316.629761 101.632105 L 478.187777 228.603819 C 494.475642 241.365882 503.5 258.454069 503.5 276.623786 C 503.5 294.793503 494.475642 311.881689 478.187777 324.643753 L 316.629761 451.615467 C 300.121789 464.593836 278.331267 471.731939 255 471.731939 C 231.668733 471.731939 209.878211 464.593836 193.370239 451.831773 Z" fill="rgb(255, 204, 0)" id="mid"/> <path d="M 193.370239 371.831773 L 31.8122232 244.860059 C 15.5243578 232.097996 6.5 215.009809 6.5 196.840092 C 6.5 178.670375 15.5243578 161.582189 31.8122232 148.820125 L 193.370239 21.6321055 C 209.658105 8.87004222 231.668733 1.73193906 255 1.73193906 C 278.331267 1.73193906 300.121789 8.87004222 316.629761 21.6321055 L 478.187777 148.603819 C 494.475642 161.365882 503.5 178.454069 503.5 196.623786 C 503.5 214.793503 494.475642 231.881689 478.187777 244.643753 L 316.629761 371.615467 C 300.121789 384.593836 278.331267 391.731939 255 391.731939 C 231.668733 391.731939 209.878211 384.593836 193.370239 371.831773 Z" fill="rgba(0, 0, 0, 0.1)" filter="url(#shadow)" id="top-shadow"/> <path d="M 193.370239 371.831773 L 31.8122232 244.860059 C 15.5243578 232.097996 6.5 215.009809 6.5 196.840092 C 6.5 178.670375 15.5243578 161.582189 31.8122232 148.820125 L 193.370239 21.6321055 C 209.658105 8.87004222 231.668733 1.73193906 255 1.73193906 C 278.331267 1.73193906 300.121789 8.87004222 316.629761 21.6321055 L 478.187777 148.603819 C 494.475642 161.365882 503.5 178.454069 503.5 196.623786 C 503.5 214.793503 494.475642 231.881689 478.187777 244.643753 L 316.629761 371.615467 C 300.121789 384.593836 278.331267 391.731939 255 391.731939 C 231.668733 391.731939 209.878211 384.593836 193.370239 371.831773 Z" fill="url(#blues)" id="top"/> <path d="M 255.557796 318.523438 L 255.557796 318.523438 C 338.113251 318.523438 405.03767 263.81823 405.03767 196.335938 C 405.03767 128.853645 338.113251 74.1484375 255.557796 74.1484375 C 173.002341 74.1484375 106.077922 128.853645 106.077922 196.335938 C 106.077922 263.81823 173.002341 318.523438 255.557796 318.523438 L 255.557796 318.523438 Z M 255.557796 331.101563 L 255.557796 331.101563 C 164.503985 331.101563 90.6902879 270.764937 90.6902879 196.335938 C 90.6902879 121.906938 164.503985 61.5703125 255.557796 61.5703125 C 346.611606 61.5703125 420.425304 121.906938 420.425304 196.335938 C 420.425304 270.764937 346.611606 331.101563 255.557796 331.101563 L 255.557796 331.101563 Z" fill="white" id="ring"/> <path d="M 266.575605 248.199383 C 274.839361 247.116964 282.893943 244.813421 290.267395 241.288755 L 337.32129 260.629992 L 312.674012 223.705812 C 325.63867 207.004736 325.63867 185.850561 312.674012 169.149485 L 337.32129 132.225305 L 292.974868 150.45365 L 291.700073 169.952942 C 309.829164 185.157289 309.365846 209.169068 290.527893 223.847168 C 285.721068 227.691529 280.20166 230.389527 274.405151 232.306091 L 266.575605 248.199383 Z M 244.579776 144.624146 C 230.931152 146.398682 220.701293 151.565675 220.701293 151.565675 L 173.690288 132.225305 L 198.337566 169.149485 C 185.372907 185.850561 185.372907 207.004736 198.337566 223.705812 L 173.690288 260.629992 L 219.248736 241.90345 L 220.218932 223.640565 C 201.161804 208.480714 201.314025 184.227967 220.529419 169.002319 C 224.999999 165.000001 235.105895 160.762757 236.622498 160.537354 C 236.622497 160.537354 244.579776 144.624146 244.579776 144.624146 Z" fill="rgb(140, 200, 246)" id="rosette"/> <path d="M 232.944378 192.304563 L 226.682617 303.302063 L 277.389053 200.3587 L 284.649978 89.5703125 L 232.944378 192.304563 Z M 232.289215 281.968558 L 272.904208 199.563458 L 237.312925 193.069439 L 232.289215 281.968558 Z" fill="white" fill-rule="evenodd" id="needle"/></svg>` } ];


  //topHeaders.forEach(header => {
  //  const th = document.createElement('th');
  //  th.colSpan = 2; // Each group spans 2 columns
  //  th.innerHTML = `${header.svg} ${header.name}`; 
  //  topHeaderRow.appendChild(th);
  //});
  topHeaders.forEach(header => {
    const th = document.createElement('th');
    th.colSpan = 2; // Each group spans 2 columns

    // Create a container for stacking name above the SVG
    const headerContent = document.createElement('div');
    headerContent.classList.add('header-content');
    headerContent.innerHTML = `<div class="header-icon">${header.svg}</div><div class="header-name">${header.name}</div>`;
    
    th.appendChild(headerContent);
    topHeaderRow.appendChild(th);
  });

  // Add the second header row for individual columns
  const colHeaders = ["Powerful Permission", "Permissions-Policy", "Powerful Permission", "Permissions-Policy", "Powerful Permission", "Permissions-Policy", "Powerful Permission", "Permissions-Policy"];
  colHeaders.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    columnHeaderRow.appendChild(th);
  });

  // Add table rows
  permissions_data.forEach(row => {
    const tr = document.createElement('tr');
    const rowHeader = document.createElement('td');
    rowHeader.textContent = row.rowHeader;
    tr.appendChild(rowHeader);

    for (col_value in row){
      // Skip permission name
      if (col_value == "rowHeader"){continue}
      // Skip default allowlist
      if (col_value == "col3" || col_value == "col6"){continue}
      
      const td = document.createElement('td');
      value = row[col_value];
      if (value){
        if (col_value === "col2" && row["col3"] !== ''){
          let default_policy = row["col3"];
          td.textContent =`✅ (${default_policy})`;
        } else if (col_value === "col5" && row['col6'] !== '') {
          let default_policy = row["col6"];
          td.textContent =`✅ (${default_policy})`;
        } else {
          td.textContent = "✅";
        }
      } else {
        td.textContent = "❌";
      }
      tr.appendChild(td);
    }

    tableBody.appendChild(tr);
  });
}

async function loadData(){
  return await (await fetch('/browser-permissions-tool/results/last.json')).json()
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
