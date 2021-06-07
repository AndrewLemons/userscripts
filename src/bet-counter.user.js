// ==UserScript==
// @name BET Counter
// @namespace https://github.com/AndrewLemons
// @description Adds an attempt counter to assessment summary pages.
// @author AndrewLemons
// @homepageURL https://github.com/AndrewLemons/userscripts
// @match *://*.blackboard.com/webapps/gradebook/do/student/viewAttempts
// @grant none
// @version 1.0.0
// @updateURL https://raw.githubusercontent.com/AndrewLemons/userscripts/master/src/bet-counter.user.js
// ==/UserScript==

// Get attempt count
let attemptCount = document.querySelectorAll("table.attachments tr").length - 1; // -1 for header row, why not use <thead>?!?

// Create list item HTML content
let listItemHTML = `
  <div class="label">Total Attempts</div>
  <div class="field">${attemptCount}</div>
`;

// Create and append list item
let $listItem = document.createElement("li");
$listItem.innerHTML = listItemHTML;
document.querySelector("fieldset ol").appendChild($listItem);

//----------
// BIT Alert
//----------

const $bitAlert = document.createElement("div");
$bitAlert.innerHTML = "BIT Active";
$bitAlert.setAttribute(
  "style",
  "position:fixed;left:0;bottom:0;background:orange;padding:.1em;z-index:696969;"
);
document.body.appendChild($bitAlert);
