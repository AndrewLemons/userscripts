class BannerPlugin {
	constructor(generator) {
		this.generator = generator;
	}

	apply(compiler) {
		compiler.hooks.emit.tapAsync("FileListPlugin", (compilation, callback) => {
			compilation.chunks.forEach((chunk) => {
				chunk.files.forEach((filename) => {
					console.log(compilation.assets[filename]);
					const asset = compilation.assets[filename];
					asset._value = this.generator(chunk) + asset._value;
				});
			});

			callback();
		});
	}
}

module.exports = BannerPlugin;
