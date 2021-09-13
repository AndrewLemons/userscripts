const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const glob = require("glob");
const BannerPlugin = require("./webpack/BannerPlugin");

let rawScripts = glob.sync("./src/scripts/*/index.json").map((script) => {
	let scriptConfig = JSON.parse(fs.readFileSync(script, "utf-8"));
	return {
		import: path.resolve(script, "../", scriptConfig.$entry),
		...scriptConfig,
	};
});

let entries = Object.fromEntries(
	rawScripts.map((script) => [
		script.name.toLowerCase().replaceAll(/\s|_/g, "-"),
		script.import,
	])
);
let scripts = Object.fromEntries(
	rawScripts.map((script) => [
		script.name.toLowerCase().replaceAll(/\s|_/g, "-"),
		script,
	])
);

module.exports = {
	mode: "production",
	entry: entries,
	output: {
		filename: "[name].user.js",
		path: path.join(__dirname, "/dist"),
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									targets: "> 0.25%, not dead",
								},
							],
						],
						plugins: [
							[
								"@babel/plugin-transform-react-jsx",
								{
									pragma: "JSX.createElement",
								},
							],
						],
					},
				},
			},
			{
				test: /\.s?(a|c)ss?$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	resolve: {
		alias: {
			Utilities: path.join(__dirname, "/src/utilities"),
		},
	},
	plugins: [
		new BannerPlugin((chunk) => {
			let output = [];
			output.push(`// ==UserScript==`);
			let metadata = scripts[chunk.name];
			Object.keys(metadata).forEach((key) => {
				if (key.startsWith("$") || key === "import") return;
				if (Array.isArray(metadata[key])) {
					metadata[key].forEach((value) => {
						output.push(`// @${key} ${value}`);
					});
				} else {
					output.push(`// @${key} ${metadata[key]}`);
				}
			});
			output.push(`// ==/UserScript==\n`);
			return output.join("\n");
		}),
	],
};
