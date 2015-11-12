Perfume Timeline
====

**Objective: Transform [this video](https://www.youtube.com/watch?v=iJoFOqoIEv0) into an interactive timeline webpage **

In this project I learned:

* Flexbox

### August 22 2015 ### 

Horizontal Layout Rules:

1. At least 2 columns must fit in view (both width and column)
2.  Ratios are preserved
3.  Column width increases when height is increased and vice versa to preserve ratio
4.  The width of the column must be wide enough to comfortably discern an image
	* This breakpoint will have to be strictly set by eye
	* Basing this on image, because the elements on the timeline are just images and video, not text
5. Is there a scrollbar to scrub through the timeline?
	* What about TV web browsers? Timeline is viewable at that rez, but are different years immediately accessible?
6.  If none of these criteria are met, a vertical UIList view like layout (e.g. iPhone's contacts app) is shown instead
	* Does this mean ALL mobile devices will be vertical layout based on these rules? Will phablets be capable in showing the horizontal view instead?

["If the Moon Were Only 1 Pixel"](http://joshworth.com/dev/pixelspace/pixelspace_solarsystem.html) is a good example of a horizontal layout, but it ain't responsive. 

[ ] **Objective: Learn flex box**

* [ ] Go through Treehouse courses on [Flexbox](http://teamtreehouse.com/library/q:flexbox) (Build a Responsive Navigation with Flexbox)


[ ] **Objective: Gather the media assets from the video**

* [ ] For each asset (e.g. music video or album release photo), research info about it (release year, anecdotes, where to buy, credits)
* [ ] Create a mm doc that lists the source of the video or image and their years

_Avoid premature performance optimization:_

* You should be fine with CSS transforms
* [ ] After you complete timeline, _check layout on iPhone and iPad (w/o retina)_
* [ ] After you complete timeline, do some performance analysis on it with Chrome Dev Tool
	* Info on hardware-accelerated CSS
		* [http://www.html5rocks.com/en/mobile/optimization-and-performance/](http://www.html5rocks.com/en/mobile/optimization-and-performance/)
		* [http://www.adobe.com/inspire/2013/11/3d-css.html](http://www.adobe.com/inspire/2013/11/3d-css.html)

### August 24 2015 ###

Treehouse: Layout Techniques:

* Flexbox is independent of HTML ordering
* You establish a _**flex formatting context**_ on a root element called the _**flex container**_.
	* `display: flex;`
	* By default, the child elements (or _**flex items**_) are laid out in a row. This row arrangement is called the _**flex direction**_.
* Understanding how items are laid out like this: ![flex_terms.png](https://developer.mozilla.org/files/3739/flex_terms.png)
	* The flex items are placed one after the other on the _**main axis**_.
	* The flex items are centered vertically. In other words, they are positioned along the _**cross axis**_
		* `align-items: center;`
* `margin: auto` in flex absorbs extra space along the main axis. See min 3 of "Build a Navigation with Flexbox" video for example or [this codepen](http://codepen.io/goerk/pen/uFkny)
* `flex-grow` [changes the size of the flex items to take up free space](http://www.w3.org/TR/css3-flexbox/#flex-grow-factor)
	* If all flex items have a `flex-grow`, then `margin: auto` will not have any free space to fill in.

### August 27 2015 ###

Treehouse: Layout Techniques:

* There exists a `:not` pseudo selector property
* `order` changes the [VISUAL (e.g. speech assist, tab-key navigation)](http://www.w3.org/TR/css-flexbox-1/#order-accessibility) order of flex items

Treehouse: Beyond the Basics:

* `flex-direction` allows you to change the direction of the main axis (horizontal or vertical) (left to right, down to up, etc.)
* The [_**flex line**_](http://www.w3.org/TR/css-flexbox-1/#flex-lines) is NOT the main axis. That concept is relevant when the flex items break out into multiple lines (like how text breaks in a paragraph).

### August 29 2015 ###

Treehouse: Beyond the Basics:

* [`justify-content`](http://dev.w3.org/csswg/css3-flexbox/#justify-content-property) defines how space is distributed along the main-axis and around the flex-items
* [`flex-wrap` ](https://drafts.csswg.org/css-flexbox-1/#flex-wrap-property)allows flex items to break into multiple flex lines along the cross axis. The direction of that cross axis can be reversed here.
* [`align-self`](https://drafts.csswg.org/css-align/#align-self-property) overrides the `align-items` property and defines how space is distributed along the cross-axis around the individual flex-item
* You'll notice similarities of space distribution for properties that start with justify or align, you'll find [a summary of it all here](https://drafts.csswg.org/css-align/#overview)


### September 11 2015 ###

I'm worried about how the site will respond to devices with different resolutions

* For example, if I set my mobile to be at max 320px (iPhone's old width), will a retina display (640px max) still show a mobile site? What happens if iPhone gets 3x the pixel density?
* I found [this article that addresses high DPI](http://www.html5rocks.com/en/mobile/high-dpi/)

### September 26 2015 ###

Created [a mockup file](Non-code%20Project%20files/Mockups.sketch), so far it only has a 600x600 (1:1) horizontal layout.

[ ] Create wireframe of vertical layout (use the [iPhone template](Non-code%20Project%20files/Minimal-iPhone-Flat.sketch))

[ ] **Objective: Create the base timeline layout in flexbox**

* [ ] Create a unit of time layout with just class'd divs
	* [X] Base unit-of-time and event size based on a percentage of the viewport
* [X] Setup Git and add these notes into the repo
* [ ] Setup workspace in chrome so CSS changes in the dev tool are reflected in source
* [ ] Figure out how to create custom \<unitOfTime> & \<event> elements using web components
* [ ] Create a timeline (horizontal arrangement of unit of times) 

### October 21 2015 ###

#### Why Won't the Column Have a Width to Maintain the 3:2 Ratio? ####
The flex container, `.timeline`,  is causing all the `.unit-of-time`s to shrink to fit the width of the viewport. To understand why, I had to understand how the width of the `.timeline` container is calculated and how the width of the `.unit-of-time` flex items are calculated:

1. The timeline's width is initially auto and so it will be the width of the containing block, which results in the width of the viewport
2. When you run into a case where changing a dimension property has no effect, it might be that block is ["over-constrained"](http://www.w3.org/TR/CSS21/visudet.html#blockwidth) and that property value is ignored to meet the width 
3. The ["defining aspect of flex layout"](http://www.w3.org/TR/css3-flexbox/#flex-property) is that flex items will grow to take up free space and shrink to prevent overflow. If you just want to use flex-layout for positions and not calculating dimensions,  just set your flex-items to [`flex:none`](http://www.w3.org/TR/css3-flexbox/#flex-initial)

To fix this, I _could_ set the unit of times to flex none, but instead I set `display: inline-flex` on the timeline in order to make it stretch to the size of its children instead of the viewport.  This also caused it to overflow out of its containing block: the body. Keep in mind, this sets the container-block to be an inline element instead of a block one, it does _not_ change the display of the child elements, they remain flex-items.

### Realized the Strict "3 Events Per Unit-of-Time" Is Wrong. ###
There can be multiple events in a unit-of-time, so we need to allow the unit-of-time to `flex-wrap` it's events. 

[ ] Rethink about how to lay it out so that three events are in a single column, but in html, there are multiple events in a unit-of-time: 

* I think it will be best to set the dimensions of events to 3:2
* Since I'm not using flex for dimension calculation and just want horizontal positioning, best to make the columns inline-blocks
* Right now, if you increase the height of an element, you're able to scroll up and down, which is not what we want.
* The height of the unit-of-time should expand to fit the viewport's height, allow overflow, and the event instead should have it's width be half the viewports

#### My Grid Overlaid on the Perfume Video ####

![Grid Overlaying Video](Non-code%20Project%20files/Grid%20Overlaying%20Video.jpg)

This gives me a good idea of how randomly placed images/videos appear in relation to the horizontal layout



