import * as $ from "jquery";

$(() => {
	// Delay everything until the window is visible on-screen (see the delay in main.ts).
	window.setTimeout(run, 2100);
});

async function run() {
	setupEvents();

	setTime();
	window.setInterval(() => setTime(), 1000);
}

function setTime() {
	let d = new Date();
	let h = d.getHours();
	let m = d.getMinutes();
	let ampm = "AM";

	if (h >= 12) {
		h -= 12;
		ampm = "PM";
	}
	if (h == 0) h = 12;

	$(".hour .hour-text").text(h);
	$(".hour .ampm").text(ampm);
	$(".mins").text(m < 10 ? "0" + m : m);
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
