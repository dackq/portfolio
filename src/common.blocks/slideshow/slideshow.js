import { LitElement, css, html } from "lit-element";

import pomodoro from "../../img/pomodoro.png";

class Slideshow extends LitElement {
	static get properties() {
		return {
			slide1Status: { type: String },
			slide2Status: { type: String },
			slide3Status: { type: String },
			slides: { type: Array }
		};
	}

	constructor() {
		super();
		this.slides = [
			{ image: pomodoro, status: "carousel__slide_prev" },
			{ image: pomodoro, status: "carousel__slide_initial" },
			{ image: pomodoro, status: "carousel__slide_next" }
		];
	}

	static get styles() {
		return css`
			.carousel {
				overflow: hidden;
				box-sizing: border-box;
				position: relative;
			}

			.carousel__track {
				transform-style: preserve-3d;
			}

			.carousel__slide {
				opacity: 0;
				position: absolute;
				display: block;
				top: 0;
				width: 80%;
				margin: auto;
				z-index: 100;
				transition: transform 0.5s, opacity 0.5s, z-index 0.5s;
			}

			.carousel__slide_initial,
			.carousel__slide_active {
				opacity: 1;
				position: relative;
				z-index: 900;
			}

			.carousel__slide_prev,
			.carousel__slide_next {
				z-index: 800;
			}

			.carousel__slide_prev {
				transform: translateX(-100%);
			}
			.carousel__slide_next {
				transform: translateY() (100%);
			}

			.carousel__button_prev,
			.carousel__button_next {
				position: absolute;
				top: 50%;
				width: 3rem;
				height: 3rem;
				background-color: #fff;
				transform: translateY(-50%);
				border-radius: 50%;
				cursor: pointer;
				z-index: 1001; /* Sit on top of everything */
				border: 1px solid black;
			}

			.carousel__button_prev {
				left: 0;
			}
			.carousel__button_next {
				right: 0;
			}
			.carousel__button_prev::after,
			.carousel__button_next::after {
				content: " ";
				position: absolute;
				width: 10px;
				height: 10px;
				top: 50%;
				left: 54%;
				border-right: 2px solid black;
				border-bottom: 2px solid black;
				transform: translate(-50%, -50%) rotate(135deg);
			}

			.carousel__button_next::after {
				left: 47%;
				transform: translate(-50%, -50%) rotate(-45deg);
			}
		`;
	}
	render() {
		return html`
			<div class="carousel">
				<button class="carousel__button_prev"></button>
				<div class="carousel__track">
					${this.slides.map(
						slide =>
							html`
								<img
									src="${slide.image}"
									class="carousel__slide ${slide.status}"
								/>
							`
					)}
				</div>
				<button class="carousel__button_next"></button>

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
