module.exports = function (grunt) {
	grunt.initConfig({
		exec: {
			tsc: {
				command: "node ./node_modules/typescript/bin/tsc",
				exitCode: [0, 2],
			},
		},

		copy: {
			toBin: {
				files: [{ expand: true, cwd: "src", src: ["index.html", "styles.css", "package.json", "BebasNeue-Regular.ttf"], dest: "bin/" }],
			},
			toScr: {
				files: [
					{
						expand: true,
						src: "package/flip-clock-win32-x64/flip-clock.exe",
						rename: function () {
							return "package/flip-clock-win32-x64/flip-clock.scr";
						},
					},
				],
			},
		},

		"npm-command": {
			default: {
				options: {
					cmd: "install",
					cwd: "bin/",
				},
			},
		},

		electron: {
			default: {
				options: {
					name: "flip-clock",
					dir: "bin",
					out: "package",
					platform: "win32",
					arch: "x64",
					overwrite: true,
				},
			},
		},

		clean: ["bin", "obj", "package"],
	});

	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-electron");
	grunt.loadNpmTasks("grunt-exec");
	grunt.loadNpmTasks("grunt-npm-command");

	grunt.registerTask("build", ["exec:tsc", "copy:toBin"]);
	grunt.registerTask("package", ["npm-command", "electron", "copy:toScr"]);
	grunt.registerTask("default", ["build", "package"]);
};
