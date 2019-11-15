import { LitElement, css, html } from "lit-element";

import pomodoro from "../../img/pomodoro.png";

class Slideshow extends LitElement {
	static get properties() {
		return {
			slides: { type: Array },
			currentSlide: { type: Number },
			moving: { type: Boolean }
		};
	}

	constructor() {
		super();
		this.currentSlide = 0;
		this.moving = false;
		this.slides = [
			{ image: pomodoro },
			{ image: pomodoro },
			{ image: pomodoro },
			{ image: pomodoro }
		];
		this.setInitialClasses();
	}

	setInitialClasses() {
		this.slides[this.slides.length - 1].status = "carousel__slide_prev";
		this.slides[this.currentSlide].status = "carousel__slide_active";
		this.slides[this.currentSlide + 1].status = "carousel__slide_next";
	}

	moveNext() {
		if (!this.moving) {
			if (this.currentSlide === this.slides.length - 1) {
				this.currentSlide = 0;
			} else {
				this.currentSlide++;
			}
		}

		this.moveCarouselTo(this.currentSlide);
	}

	movePrev() {
		if (!this.moving) {
			if (this.currentSlide === 0) {
				this.currentSlide = this.slides.length - 1;
			} else {
				this.currentSlide--;
			}
		}

		this.moveCarouselTo(this.currentSlide);
	}

	disableInteration() {
		this.moving = true;

		setTimeout(() => {
			this.moving = false;
		}, 500);
	}

	moveCarouselTo(slide) {
		if (!this.moving) {
			this.disableInteration();

			let newPrevious =
					slide - 1 < 0 ? this.slides.length - 1 : slide - 1,
				newNext = slide + 1 > this.slides.length - 1 ? 0 : slide + 1;

			for (let slide of this.slides) {
				slide.status = "";
			}
			this.slides[slide].status = "carousel__slide_active";
			this.slides[newPrevious].status = "carousel__slide_prev";
			this.slides[newNext].status = "carousel__slide_next";
		}
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
				transform: translateX(100%);
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
				<button
					@click="${this.movePrev} "
					class="carousel__button_prev"
				></button>
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
				<button
					@click="${this.moveNext}"
					class="carousel__button_next"
				></button>

				<!-- <div class="carousel__nav">
					<button class="carousel__indicator"></button>
					<button class="carousel__indicator"></button>
					<button class="carousel__indicator"></button>
				</div> -->
			</div>
		`;
	}
}

customElements.define("project-slideshow", Slideshow);
