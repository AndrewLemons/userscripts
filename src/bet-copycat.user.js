// ==UserScript==
// @name BET Copycat
// @namespace https://github.com/AndrewLemons
// @description Provides easy to use buttons to copy questions and answers on assessments.
// @author AndrewLemons
// @homepageURL https://github.com/AndrewLemons/userscripts
// @match *://*.blackboard.com/webapps/assessment/take/*
// @grant none
// @version 1.0.0
// @updateURL https://raw.githubusercontent.com/AndrewLemons/userscripts/master/src/bet-copycat.user.js
// ==/UserScript==

//-----------------
// Helper Functions
//-----------------

// Create a stylesheet and add it to the document
function createStyle(content) {
  const styleString = Object.keys(style)
    .map((key) => {
      return `${key} { ${style[key].join("")} }`;
    })
    .join("");
  const $head = document.querySelector("head");
  const $style = document.createElement("style");
  $style.innerText = styleString;
  $head.appendChild($style);
}

function addCopyButton($target) {
  const $copyButton = document.createElement("button");
  $copyButton.setAttribute("onclick", "copyFrom(this)");
  $copyButton.innerHTML = "Copy";
  $copyButton.classList.add("button-4");
  $target.appendChild($copyButton);
}

//-------
// Config
//-------

// Styling
const style = {
  "fieldset legend .vtbegenerated.inlineVtbegenerated": [
    "flex-grow: 1;",
    "font-weight: bold;",
  ],
  "fieldset legend": ["background: #71717A;", "border-radius: 2px;"],
  ".multiple-choice-table": ["width: 100%;", "display: flex;"],
  ".multiple-choice-table tbody": [
    "width: 100%;",
    "display: flex;",
    "flex-direction: column;",
  ],
  ".multiple-choice-table tr": ["display: flex;", "flex-direction: row;"],
  ".multiple-choice-table tr td": [
    "display: flex;",
    "justify-content: center;",
  ],
  ".multiple-choice-table tr td:nth-child(1)": ["flex-shrink: 1;"],
  ".multiple-choice-table tr td:nth-child(2)": ["display: none;"],
  ".multiple-choice-table td:nth-child(3), fieldset legend": [
    "flex-grow: 1;",
    "display: flex !important;",
    "flex-direction: row;",
    "justify-content: space-between;",
    "padding: .25em !important;",
    "margin: .25em !important;",
    "border: 2px solid #dadada;",
    "border-radius: 2px;",
    "background: f8f8f8;",
  ],
  ".multiple-choice-table tr td .vtbegenerated.inlineVtbegenerated": [
    "flex-grow: 1;",
  ],
};

window.copyFrom = (element) => {
  let content = element.parentElement.children[0].innerText;
  navigator.clipboard.writeText(content);
};

//-----
// Main
//-----

// Get all items
document
  .querySelectorAll(".vtbegenerated.inlineVtbegenerated")
  .forEach(($item) => addCopyButton($item.parentNode));
document
  .querySelectorAll(".multiple-choice-table td:nth-of-type(3)")
  .forEach(($item) => addCopyButton($item));

// Add the stylesheet
createStyle(style);

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
