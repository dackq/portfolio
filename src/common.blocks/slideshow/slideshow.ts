import { LitElement, css, html } from "lit-element";

class Slideshow extends LitElement {
	static get properties() {
		return {};
	}
	static get styles() {
		return css`
			.carousel {
				overflow: hidden;
				width: 90%;
				box-sizing: border-box;
			}

			.carousel__track {
				transform-style: preserve-3d;
			}

			.carousel__slide {
				/* opacity: 0; */
				/* position: absolute; */
				/* top: 0; */
				width: 100%;
				margin: auto;
				padding: 1rem 4rem;
				z-index: 100;
				background: black;
			}
		`;
	}
	render() {
		return html`
			<div class="carousel">
				<button class="carousel__button"></button>
				<div class="carousel__track">
					<div class="carousel__slide"></div>

					<!-- <img class="carousel__slide" src="img/slide-1.jpg" alt="" />
					<img class="carousel__slide" src="img/slide-1.jpg" alt="" />
					<img class="carousel__slide" src="img/slide-1.jpg" alt="" /> -->
				</div>
				<button class="carousel__button"></button>

				<div class="carousel__nav">
					<button class="carousel__indicator"></button>
					<button class="carousel__indicator"></button>
					<button class="carousel__indicator"></button>
				</div>
			</div>
		`;
	}
}

customElements.define("project-slideshow", Slideshow);
