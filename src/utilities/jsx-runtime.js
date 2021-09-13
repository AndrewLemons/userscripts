export default {
	createElement: (tagName, attrs = {}, ...children) => {
		let el = document.createElement(tagName);

		if (attrs) {
			for (let [key, val] of Object.entries(attrs)) {
				if (key === "className") {
					el.className = val;
				} else {
					el.setAttribute(key, val);
				}
			}
		}

		for (let child of children) {
			if (Array.isArray(child)) el.append(...child);
			else el.append(child);
		}

		return el;
	},
};
