import JSX from "Utilities/jsx-runtime";
import { $$ } from "Utilities/main";

import "./styles.scss";
import "Utilities/bet/bet-overlay.jsx";

function addCopyButton($target) {
	$target.appendChild(
		<button class="button-4" onclick="copyFrom(this)">
			Copy
		</button>
	);
}

window.copyFrom = (element) => {
	let content = element.parentElement.children[0].innerText.replaceAll(
		/[ \t\n\r]*[\n\r]+[ \t\n\r]*/g,
		" "
	);
	navigator.clipboard.writeText(content);
};

//-----
// Main
//-----

// Questions
$$(".legend-visible").forEach(($item) => addCopyButton($item));

// Answers
$$(".multiple-choice-table td:nth-of-type(3)").forEach(($item) =>
	addCopyButton($item)
);
