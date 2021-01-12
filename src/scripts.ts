import * as $ from "jquery";

$(() => {
	// Delay everything until the window is visible on-screen (see the delay in main.ts).
	window.setTimeout(run, 2100);
});

async function run() {
	setupEvents();
}

function setupEvents() {
	$(document).on("click keydown", (e) => window.close());

	let startPageX: number = null;
	let startPageY: number = null;
	$(document).on("mousemove", (e) => {
		if (startPageX == null || startPageY == null) {
			startPageX = e.pageX;
			startPageY = e.pageY;
		} else {
			const moveThreshold = 20;
			if (Math.abs(e.pageX - startPageX) > moveThreshold || Math.abs(e.pageY - startPageY) > moveThreshold)
				window.close();
		}
	});
}

export = {};
