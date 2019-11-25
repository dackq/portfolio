import { LitElement, css, html } from "lit-element";

import pomodoro from "../../img/pomodoro.png";
import express from "../../img/expressjs.png";
import portfolio from "../../img/portfolio.png";

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
			{
				image: express,
				title: "Express Server API",
				description:
					"This is a node.js express server with authentication from passport and a mongoDB database.",
				github: "https://github.com/dackq/express-code-challenge"
			},
			{
				image: pomodoro,
				title: "Pomodoro Timer",
				description: "Custom web component pomodoro timer.",
				github: "",
				link: "https://www.pomodoro.dakotalreed.com"
			},
			{
				image: portfolio,
				title: "Portfolio",
				description: "Github repository for this website.",
				github: "https://github.com/dackq/portfolio"
			}
		];
		this.slides.forEach(slide => {
			if (slide.link) {
				slide.link = html`
					<a
						class="carousel__slide-description-button"
						href="${slide.link}"
						>Production</a
					>
				`;
			}
		});
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
			* {
				box-sizing: border-box;
			}
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
			.carousel__slide-description {
				opacity: 1;
				position: absolute;
				display: block;
				padding: 1rem;
				background-color: #333333cc;
				color: #fafafa;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
				width: ${SlideWidth}rem;
				height: ${SlideHeight}rem;
				z-index: 100;
				transition: transform 0.5s, opacity 0.5s, z-index 0.5s;
				overflow: hidden;
			}
			@media (hover: hover) {
				.carousel__slide-description {
					opacity: 0;
				}
				.carousel__slide-description:hover {
					opacity: 1;
				}
			}
			.carousel__slide-description-button {
				border-radius: 5rem;
				display: inline-block;
				text-decoration: none;
				text-align: center;
				width: 49%;
				padding: 0.5rem;
				background-color: #fafafa;
				color: #333;
			}
			.carousel__image {
				width: ${SlideWidth}rem;
				height: ${SlideHeight}rem;
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
									<div class="carousel__slide-description">
										<h3>${slide.title}</h3>
										<p>
											${slide.description}
										</p>
										<a
											class="carousel__slide-description-button"
											href="${slide.github}"
											>Github</a
										>
										${slide.link}
									</div>
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
