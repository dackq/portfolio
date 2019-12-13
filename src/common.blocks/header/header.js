const updateHeader = () => {
	let heroBox = document.querySelector("#hero-box");
	let scrollTop =
			window.pageYOffset !== undefined
				? window.pageYOffset
				: (
						document.documentElement ||
						document.body.parentNode ||
						document.body
				  ).scrollTop,
		header = document.querySelector(".header"),
		heroHeight = heroBox ? heroBox.offsetHeight : 0,
		main = document.querySelector("#main-content");
	if (scrollTop >= heroHeight) {
		header.style.position = "fixed";
		header.style.top = "0";
		main.style.paddingTop = String(header.offsetHeight) + "px";
	} else {
		header.style.position = "static";
		main.style.paddingTop = "";
	}
};

updateHeader();

window.onscroll = updateHeader;
