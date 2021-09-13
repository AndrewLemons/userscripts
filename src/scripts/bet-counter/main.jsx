import JSX from "Utilities/jsx-runtime";
import "Utilities/bet/bet-overlay.jsx";

// Get attempt count
let attemptCount = $$("table.attachments tr").length - 1; // -1 for header row, why not use <thead>?!?

// Create and append list item
$("fieldset ol").appendChild(
	<li>
		<div class="label">Total Attempts</div>
		<div class="field">{attemptCount}</div>
	</li>
);
