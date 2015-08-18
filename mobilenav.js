import * as dom from '../../../lib/components/js.dom/dom';
import * as helpers from '../../../lib/components/js.helpers/helpers';
/**
 * Creates a new mobile nav instance
 * @class MobileNav
 * @classdesc Controller for mobile push and slide menus
 */
class MobileNav {
	/**
     * @constructor
     * @param {HTMLElement} navElement generally the page__nav element
    */
	constructor(navElement) {
		
		this.element = navElement;
		
		this.ready = false;

		this.type = this.element.getAttribute('data-reveal-type');
		this.position  = this.element.getAttribute('data-position');
		this.string = this.type + '-' + this.position;
		this.pageBody = document.getElementsByClassName('page__body')[0];
		this.page = document.getElementsByClassName('page')[0];
		this.toggleElements = document.getElementsByClassName('page__nav-show');
		
		this.setClass()
			.getSize()
			.setEvents();
	}	
	/**
     * Show the menu
     * @memberOf MobileNav
    */
	show() {
		if (!this.ready){
			this.ready = true;
			dom.addClass(this.element, 'page__nav--ready');
		}		

		if (this.type == 'push') {
			this.setBodyTransform();
		}
		
		dom.addClass(this.page, 'show-menu' + '--' + this.string);

		return this;
	}
	/**
     * Hide the menu
     * @memberOf MobileNav
    */
	hide() {	
		this.resetBodyTransform();
		dom.removeClass(this.page, 'show-menu' + '--' + this.string);
		return this;
	}
	/**
     * Add the appropriate class to the navigation element.
     * @memberOf MobileNav
    */
	setClass() {
		dom.addClass(this.element, 'page__nav--' + this.position);
		return this;		
	}
	/**
     * The size is needed so we know how far to translate the page__body when using a push reveal.
     * @memberOf MobileNav
    */
	getSize() {
		this.width = this.element.offsetWidth;
		this.height = this.element.offsetHeight;

		this.transform_value = this.height;

		if (this.position == 'top' || this.position == 'bottom') {
			if (this.position == 'bottom') {
				this.transform_value *= -1;
			}
			this.transform_value = 'translateY(' + this.transform_value + 'px) translateX(0)'
		} else if (this.position == 'left' || this.position == 'right') {
			this.transform_value = this.width;
			if (this.position == 'right')  {
				this.transform_value *= -1;
			}
			this.transform_value = 'translateY(0) translateX(' + this.transform_value + 'px)'
		}
		return this;
	}
	/**
     * Add event listeners for buttons on the page - may take a further look at this and make it more efficient.
     * @memberOf MobileNav
    */
	setEvents() {

		for (let i = 0; i < this.toggleElements.length; i++){
			let el = this.toggleElements[i];
			let type = el.getAttribute('data-type');
			let position = el.getAttribute('data-position');
			
			if (position == this.position && type == this.type){
				this.toggleElements[i].addEventListener('click', e => {
					this.show();
				});
			}
		}

		let closeBtn = this.element.getElementsByClassName('page__nav-close');		

		if (closeBtn.length > 0){			
			closeBtn[0].addEventListener('click', e => {
				this.hide();	
			});
		}
		return this;
	}
	
	/**
     * Sets the page body transform
     * @memberOf MobileNav
    */
	setBodyTransform() {
		helpers.setTransformValue(this.pageBody.style, this.transform_value);
		return this;
	}
	/**
     * Removes the page body transform
     * @memberOf MobileNav
    */
	resetBodyTransform() {
		helpers.setTransformValue(this.pageBody.style, 'translateX(0px) translateY(0px)');
		return this;
	}

}

export { MobileNav };
