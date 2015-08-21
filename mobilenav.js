import * as dom from '../../../lib/components/js.dom/dom';
import * as helpers from '../../../lib/components/js.helpers/helpers';

/**

Current issues

- Fixed elements whos parent has a transform appear fixed to the parent rather than the viewport.  See: http://stackoverflow.com/questions/15194313/webkit-css-transform3d-position-fixed-issue
	- As a work around the .page element (transformed element) height is altered to 100% the viewport.  You are still able to scroll within the menu itself (scroll bars will appear on desktop, not mobile).  This means that the page is jumped to the top when menus are opened.

- Top and bottom push menus gain an incorrect height when using a percentage based height.
	- The same work around above can fix this issue.

**/

/**
* Creates a new mobile nav instance
* @class MobileNav
* @classdesc Controller for mobile push and slide menus
* @global
*/
class MobileNav {
	/**
     * @constructor
     * @param {HTMLElement} navElement generally the page__nav element
    */
	constructor(navElement, triggerBtns) {
		
		this.element = navElement;
	
		this.type = this.element.getAttribute('data-reveal-type');
		this.position  = this.element.getAttribute('data-position');

		this.string = this.type + '-' + this.position;
		this.page = document.querySelectorAll('.page')[0];

		this.triggerBtns = triggerBtns;
		
		this.setClass()
			.setEvents();
	}	
	/**
	* Show the menu
	* @memberOf MobileNav 
	* @function
	*/
	show() {
 	
		dom.addClass(this.element, 'page__nav--ready');
		dom.addClass(document.body, 'restrict-height');		
		
		/* the setTimeout is needed to make sure .page height is 100% viewport when the menu is shown. */
		setTimeout(() => {
			dom.addClass(this.page, 'show-menu' + '--' + this.string);
		},25)		

		return this;
	}
	/**
	* Hide the menu
	* @memberOf MobileNav
	* @function
    */
	hide() {	
		
		let dur = helpers.getTransitionDuration(window.getComputedStyle(this.page));
		
		dom.removeClass(this.page, 'show-menu' + '--' + this.string);

		/* remove .page height restiction */
		setTimeout(() => {
			dom.removeClass(this.element, 'page__nav--ready');
			dom.removeClass(document.body, 'restrict-height');
		}, dur)

		return this;
	}
	/**
	* Add the appropriate class to the navigation element.
	* @memberOf MobileNav
	* @function
    */
	setClass() {
		dom.addClass(this.element, 'page__nav--' + this.position);
		return this;		
	}
	/**
	* Add event listeners for buttons on the page - may take a further look at this and make it more efficient.
	* @memberOf MobileNav
	* @function
    */
	setEvents() {
		
		for (let i = 0; i < this.triggerBtns.length; i++){
			let el = this.triggerBtns[i];			
			let type = el.getAttribute('data-reveal-type');
			let position = el.getAttribute('data-position');
			
			if (position == this.position && type == this.type){
				el.addEventListener('click', e => {
					this.show();
				});
			}
		}

		let closeBtn = this.element.querySelectorAll('.page__nav-close');

		if (closeBtn.length > 0){			
			closeBtn[0].addEventListener('click', e => {
				this.hide();	
			});
		}
		return this;
	}

}

export { MobileNav };
