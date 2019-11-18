import { LitElement, css, html } from "lit-element";

import pomodoro from "../../img/pomodoro.png";

const SlideWidth = 20;
const SlideHeight = SlideWidth / 1.618;

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
		this.slides.forEach(item => (item.status = ""));
		this.slides[
			this.currentSlide - 1 > 0
				? this.currentSlide - 1
				: this.slides.length - 1
		].status = "carousel__slide_prev";
		this.slides[this.currentSlide].status = "carousel__slide_active";
		this.slides[
			this.currentSlide + 1 < this.slides.length - 1
				? this.currentSlide + 1
				: 0
		].status = "carousel__slide_next";
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
				border: 1px solid black;
				background-color: #333;
				padding: 1rem 0rem;
				box-shadow: inset -5px -5px 35px -8px black;
				border-radius: 1rem;
			}

			.carousel__track {
				transform-style: preserve-3d;
			}

			.carousel__slide {
				opacity: 0;
				position: absolute;
				display: block;
				box-shadow: -5px -5px 35px -8px black;
				background-color: #adadad;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
				width: ${SlideWidth}rem;
				height: ${SlideHeight}rem;
				border-radius: 0.6rem;
				z-index: 100;
				transition: transform 0.5s, opacity 0.5s, z-index 0.5s;
				overflow: hidden;
			}

			.carousel__slide_initial,
			.carousel__slide_active {
				opacity: 1;
				position: relative;
				margin: 0;
				z-index: 900;
				/* transform: translateY(5%); */
			}

			.carousel__slide_prev,
			.carousel__slide_next {
				opacity: 0.2;
				z-index: 800;
			}

			.carousel__slide_prev {
				transform: translateX(-120%);
			}
			.carousel__slide_next {
				transform: translateX(20%);
			}
			.carousel__image {
				width: 100%;
			}

			.carousel__button_prev,
			.carousel__button_next {
				position: absolute;
				top: 48%;
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
				left: 2%;
			}
			.carousel__button_next {
				right: 2%;
			}

			@media (min-width: 768px) {
				.carousel__button_prev {
					left: 5%;
				}
				.carousel__button_next {
					right: 5%;
				}
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
					type="button"
				></button>
				<div class="carousel__track">
					${this.slides.map(
						slide =>
							html`
								<div class="carousel__slide ${slide.status}">
									<img
										class="carousel__image"
										src="${slide.image}"
									/>
								</div>
							`
					)}
				</div>
				<button
					@click="${this.moveNext}"
					class="carousel__button_next"
					type="button"
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
