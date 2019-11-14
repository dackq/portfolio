import { LitElement, css, html } from "lit-element";

class Slideshow extends LitElement {
	static get properties() {
		return {};
	}
	render() {
		return html`
			<div>
				<a>go left</a>
				<slot></slot>
				<a>go right</a>
			</div>
		`;
	}
}

customElements.define("project-slideshow", Slideshow);
