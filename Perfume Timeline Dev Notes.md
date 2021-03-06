Perfume Timeline
====

**Objective: Transform [this video](https://www.youtube.com/watch?v=iJoFOqoIEv0) into an interactive timeline webpage **

In this project I learned:

* Flexbox

## August 22 2015 ## 

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

* [ ] Go through Treehouse courses on [Flexbox](https://teamtreehouse.com/library/css-flexbox-layout)

[ ] **Objective: Gather the media assets from the video**

* [ ] For each asset (e.g. music video or album release photo), research info about it (release date, anecdotes, where to buy)
	* no point in adding credits. They're almost all produced by Nakata Yasutaka lol
	* [ ] Create a JSON doc that lists this info
		* [X] Write script that'll grab [singles and album releases from generasia website](http://www.generasia.com/wiki/Template:Perfume)
			* [ ] BUG: tracks won't be retrieved for Cosmic Explorer
				* This is because the album has two CDs and this breaks the format my query expects
				* [ ] Place conditional in `getTracks()` to use different query: `$('#content ol').first()`
		* [ ] Write script that will order a list of objects by date
			* Probably would want a separate module that would use moment js. I am given an array of objects, I set the key & format of the date, and then return the array reordered
		* [ ] Write script to save images
			* [ ] update GrabMajorDiscography.ts to grab highest resolution image
			* [ ] save to folder To Publish/images
			* Make this a separate module that is given a url to an image and returns you a relative "images/*.png"
			* [ ] look into [Responsive Image tools](https://responsiveimages.org/) to minimize bandwidth cost
		* [ ] Write script that'll grab [the MVs from YouTube](https://www.youtube.com/user/Perfume/search?query=mv)
			* Note the dates for the official videos are in the description
			* [ ] How to grab video clips?
		* [X] ~~Make sure the description isn't dry. Might have to go to the history section of wiki and generasia for interesting anecdotes surrounding that release~~
* [ ] Write script to transform PerfumeHistory.json to html
	* I'll use [Mustache](https://github.com/janl/mustache.js) and save my template under a *.mustache file

_Avoid premature performance optimization:_

* You should be fine with CSS transforms
* [ ] After you complete timeline, make sure you got most of media asset from [the  video](https://www.youtube.com/watch?v=iJoFOqoIEv0)
	* You'll likely be missing video from live performances
* [ ] After you complete timeline, _check layout on iPhone and iPad (w/o retina)_
* [ ] After you complete timeline, do some performance analysis on it with Chrome Dev Tool
	* Info on hardware-accelerated CSS
		* [http://www.html5rocks.com/en/mobile/optimization-and-performance/](http://www.html5rocks.com/en/mobile/optimization-and-performance/)
		* [http://www.adobe.com/inspire/2013/11/3d-css.html](http://www.adobe.com/inspire/2013/11/3d-css.html)

## August 24 2015 ##

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

## August 27 2015 ##

Treehouse: Layout Techniques:

* There exists a `:not` pseudo selector property
* `order` changes the [VISUAL (e.g. speech assist, tab-key navigation)](http://www.w3.org/TR/css-flexbox-1/#order-accessibility) order of flex items

Treehouse: Beyond the Basics:

* `flex-direction` allows you to change the direction of the main axis (horizontal or vertical) (left to right, down to up, etc.)
* The [_**flex line**_](http://www.w3.org/TR/css-flexbox-1/#flex-lines) is NOT the main axis. That concept is relevant when the flex items break out into multiple lines (like how text breaks in a paragraph).

## August 29 2015 ##

Treehouse: Beyond the Basics:

* [`justify-content`](http://dev.w3.org/csswg/css3-flexbox/#justify-content-property) defines how space is distributed along the main-axis and around the flex-items
* [`flex-wrap` ](https://drafts.csswg.org/css-flexbox-1/#flex-wrap-property)allows flex items to break into multiple flex lines along the cross axis. The direction of that cross axis can be reversed here.
* [`align-self`](https://drafts.csswg.org/css-align/#align-self-property) overrides the `align-items` property and defines how space is distributed along the cross-axis around the individual flex-item
* You'll notice similarities of space distribution for properties that start with justify or align, you'll find [a summary of it all here](https://drafts.csswg.org/css-align/#overview)


## September 11 2015 ##

I'm worried about how the site will respond to devices with different resolutions

* For example, if I set my mobile to be at max 320px (iPhone's old width), will a retina display (640px max) still show a mobile site? What happens if iPhone gets 3x the pixel density?
* I found [this article that addresses high DPI](http://www.html5rocks.com/en/mobile/high-dpi/)

## September 26 2015 ##

Created [a mockup file](Non-code%20Project%20files/Mockups.sketch), so far it only has a 600x600 (1:1) horizontal layout.

[ ] Create wireframe of vertical layout (use the [iPhone template](Non-code%20Project%20files/Minimal-iPhone-Flat.sketch))

[X] **Objective: Create the base timeline layout in flexbox**

* [X] Create a unit of time layout with just class'd divs
	* [X] Base unit-of-time and event size based on a percentage of the viewport
* [X] Setup Git and add these notes into the repo
* [X] Setup workspace in chrome so CSS changes in the dev tool are reflected in source

## October 21 2015 ##

### Why Won't the Column Have a Width to Maintain the 3:2 Ratio? ###
The flex container, `.timeline`,  is causing all the `.unit-of-time`s to shrink to fit the width of the viewport. To understand why, I had to understand how the width of the `.timeline` container is calculated and how the width of the `.unit-of-time` flex items are calculated:

1. The timeline's width is initially auto and so it will be the width of the containing block, which results in the width of the viewport
2. When you run into a case where changing a dimension property has no effect, it might be that block is ["over-constrained"](http://www.w3.org/TR/CSS21/visudet.html#blockwidth) and that property value is ignored to meet the width 
3. The ["defining aspect of flex layout"](http://www.w3.org/TR/css3-flexbox/#flex-property) is that flex items will grow to take up free space and shrink to prevent overflow. If you just want to use flex-layout for positions and not calculating dimensions,  just set your flex-items to [`flex:none`](http://www.w3.org/TR/css3-flexbox/#flex-initial)

To fix this, I _could_ set the unit of times to flex none, but instead I set `display: inline-flex` on the timeline in order to make it stretch to the size of its children instead of the viewport.  This also caused it to overflow out of its containing block: the body. Keep in mind, this sets the container-block to be an inline element instead of a block one, it does _not_ change the display of the child elements, they remain flex-items.

### Realized the Strict "3 Events Per Unit-of-Time" Is Wrong. ###
There can be multiple events in a unit-of-time. Now that I think about it, there is no point of a unit of time. It doesn't exist to maintain any semantic meaning nor add any css rules. It's just a timeline with events (and other flex-items like the years) laid out in a column and wrapping around (in a up-and-down motion).

### My Grid Overlaid on the Perfume Video ###

![Grid Overlaying Video](Non-code%20Project%20files/Grid%20Overlaying%20Video.jpg)

This gives me a good idea of how randomly placed images/videos appear in relation to the horizontal layout

## January 12 2016 ##

* [X] Fill html with placeholder images and video clips
	* To further experiment with layout to match original Perfume video
	* Offset these images' top and left property to prevent overlapping (there won't be buffer empty event divs like the ones I have in the prototype)
		* It's clear from this experiment that I will have to figure out some image placement algorithm that will prevent...nah too much work will go into that. Spend a bit more time doing it by hand.
	* [Reading into html5 video](http://diveinto.html5doctor.com/video.html), I learned that I can use one tag to point to multiple sources. I can point to [video loops hosted on gfycat](http://gfycat.com/search/perfume) where they are both Webm and Mp4 (to play on browsers that don't support WebM). On iPhone, to have moving images as you scroll, I could try [a gif as a poster.](http://stackoverflow.com/questions/15500154/display-fallback-image-even-if-the-browser-supports-html5-video) I could also then, finally, point to video I host if gfycat goes belly up.

## January 24 2016 ##
*  [ ] Setup [chrome workspace](https://developers.google.com/web/tools/setup/setup-workflow?hl=en) so that placement and dimension changes you do on the browser are persisted in the files
	*  [ ] From there maybe script up a map between click and drags to css updates

## February 10 2016 ##

Realized I never took notes on my use of TypeScript in this project.

### Why Typescript? ###

* Gonna use ES6 anyway, so need a transpiler
* Got sick of untyped related issues
	* Traversing through an object and finding out, on run time, that I'm accessing a property on undefined because the wrong type of data is set to a property.
	* Unenforced function arguments means I'm passed in the wrong type or an incorrect number of arguments.
	* Improve Webstorm's autocomplete

### Dealing With Dependencies in TypeScript ###
* We use [type definition files](http://definitelytyped.org/) (*.d.ts) for dependencies not written in TypeScript.
	* These installing and tracking of these type files are managed with [TSD](http://definitelytyped.org/tsd/). Or were managed. Just found out it is [deprecated](https://github.com/DefinitelyTyped/tsd/issues/269)
* d.ts files are stored in the typings folder
	* I made the typings folder ignored like node_modules is ignored. In that a single config file should dictate what dependencies to download.
		* Unlike node_modules, it's a flat folder structure. request depends on form-data, but the form-data folder is not inside the request folder :/

### My Problems With TypeScript ###

* More dependent tooling
	* Install npm, typescript, typings, tslint
	* Add on more config files like tsconfig & tslint & typings
* Managing dependent typings WITH my dependent JS code
	* When I update jQuery via npm, do I then update via typings?

Essentially, I am having to learn yet another tool to make up for JS' shortcomings. Given how Node is still working towards maturity (despite es6 support, I still have to use a polyfil for async func), I am convinced to look into another scripting programming lang for things like online fetching and generating text via the command line. Maybe [Python](http://mirnazim.org/writings/python-ecosystem-introduction/)? Maybe Swift (I did always want to do Mac development and Swift is now a scripting language that works in all Unix environments)? Maybe [Clojure](http://pchristensen.com/blog/articles/clojure-development-ecosystem/)? Next project I'll decide. However, it's less about the tool and more about depending on a community to create your ecosystem. I want it to be an ecosystem of computer scientists who don't lose sight of the fundamentals of computing.

### Expose TypeScript Building to Anyone Who Checks Out My Project ###

* [ ] Create tsconfig.json file and add the compile options you placed in the WebStorm preferences 
* [ ] Create a typings.json file for node, request, and cheerio
* [ ] Write README to describe repo and how to build it
* [ ] Try to checkout and build a separate repo

## February 15 2016 ##

### Mustache ###

* This template syntax is based around tags that are wrapped in curly braces `{{}}`
* `{{Variable}}` is the most basic tag
	* Checks for a key name in the current object.
	* If it can't find it, it checks its parents
		* This will be clear once you read about sections
	* If it doesn't find it in its parents, it becomes an empty string
		* Unless the Mustache compiler is configured to throw an exception
	* What about character escaping?
		* Sometimes you want to set tags with a delimiter besides `{{}}`. These are for cases where you want double curlys to appear in your target language such as Tex. 
			* You set the delimiter like this `{{=<% %>=}}`. Notice how the opening and closing tags are reassigned by the equal sign.
		* By default, the text you assign to a variable is _html escaped_
			* _HTML Escaped_: When you convert symbols like `<` to `&lt`; so that the browser will show that symbol 
			* to prevent that (so that a text appears bold instead of showing the tags), just use three braces `{{{}}}` or place `& ` before your variable name (when you change the delimiter)
* A `{{#section}}{{/section}}` has multiple behaviors depending on whether it is set to a list or boolean
	* Set the opposite behavior by marking `{{^section}}{{/section}}` 
		* Useful for outputting text in an otherwise case like "list is empty :("
	* Too many to bother writing notes for so just [check the manual](https://mustache.github.io/mustache.5.html#Sections)
		* The only thing missing here is the syntax for one-dimensional arrays; given `{ list: ['a', 'b', ..] }`, you set your template to `{{#list}} * {{.}} {{/list}}`
	* When you are in a repeating template, you can reference a key in the parent object
		* Given the object:

		```
			{
				title: "Butts!"
				list: [
					{item: "A"},
					{item: "B"}
				]
			}
		```
		* Give the template:

		```
			{{#ist}}
				* {{item}} - {{title}}
			{{/list}}
		```
		* You will get:
		
		```
			* A - Butts!
			* B - Butts!
		```
* A `{{! comment}}` won't appear in the compiled template
