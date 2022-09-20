import JSX from "Utilities/jsx-runtime";

import "./styles.scss";

const EXT_TEST = /^\/webstore\/detail\/([^/]+)\/([a-z]+)$/;

function getExtensionData() {
	let result = EXT_TEST.exec(location.pathname);

	return {
		name: result[1],
		id: result[2],
	};
}

function downloadExtension() {
	let browserVersion = GM.info.platform.browserVersion;

	GM.getValue("browserVersion", browserVersion)
		.then((version) => {
			browserVersion = window.prompt("Target Chromium version:", version);
			if (!browserVersion) throw new Error("No version specified.");
		})
		.then(() => {
			return GM.setValue("browserVersion", browserVersion);
		})
		.then(() => {
			let extension = getExtensionData();
			let url = `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=${browserVersion}&acceptformat=crx2,crx3&x=id%3D${extension.id}%26uc`;

			GM.download({
				url,
				name: `${extension.name}.crx`,
				saveAs: true,
			});
		})
		.catch((error) => {
			if (error) console.error(error);
		});
}

//-----
// Main
//-----

const $downloadButton = <div class="crxd__button">Download</div>;
$downloadButton.addEventListener("click", downloadExtension);

const $container = <div class="crxd__container">{$downloadButton}</div>;

document.body.appendChild($container);
