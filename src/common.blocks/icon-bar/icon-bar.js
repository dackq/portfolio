import { breakpoint } from "../base/breakpoint";

for (let iconBar of document.querySelectorAll(".icon-bar")) {
	// SET ICON-BAR TO OPEN ON SMALL-BREAKPOINT AND ABOVE
	// window.addEventListener("resize", () => {
	// 	if (breakpoint.value === "extra-small-breakpoint") {
	// 		iconBar.querySelector(".icon-bar__content").dataset.open = "false";
	// 		iconBar.querySelector(".icon-bar__content").style.width = "0rem";
	// 		iconBar.querySelector(
	// 			".icon-bar__icon_toggle"
	// 		).firstElementChild.dataset.icon = "angle-right";
	// 	} else {
	// 		iconBar.querySelector(".icon-bar__content").dataset.open = "true";
	// 		iconBar.querySelector(".icon-bar__content").style.width =
	// 			"3.125rem";
	// 		iconBar.querySelector(
	// 			".icon-bar__icon_toggle"
	// 		).firstElementChild.dataset.icon = "angle-left";
	// 	}
	// });

	// window.dispatchEvent(new Event("resize"));

	iconBar
		.querySelector(".icon-bar__icon_toggle")
		.addEventListener("click", () => {
			if (
				iconBar.querySelector(".icon-bar__content").dataset.open ===
				"true"
			) {
				iconBar.querySelector(".icon-bar__content").style.width = 0;

				iconBar.querySelector(
					".icon-bar__content"
				).dataset.open = false;

				iconBar.querySelector(
					".icon-bar__icon_toggle"
				).firstElementChild.dataset.icon = "angle-right";
			} else {
				iconBar.querySelector(".icon-bar__content").style.width =
					"100%";

				iconBar.querySelector(".icon-bar__content").dataset.open = true;

				iconBar.querySelector(
					".icon-bar__icon_toggle"
				).firstElementChild.dataset.icon = "angle-left";
			}
		});
}
