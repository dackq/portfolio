export let breakpoint = {
	refreshValue() {
		this.value = window
			.getComputedStyle(document.querySelector("body"), ":before")
			.getPropertyValue("content")
			.replace(/\"/g, "");
	}
};

window.addEventListener("resize", function() {
	breakpoint.refreshValue();
});

window.dispatchEvent(new Event("resize"));
