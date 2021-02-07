# Custom Dev Tool Functions

## Purpose
Provide custom methods/functions and variables to Chrome Dev Tools for development debugging.  (Other functionality is possible to implement as well: e.g., DOM injection.)

## Installation
[Google's Install Documentation](https://developer.chrome.com/docs/extensions/mv2/getstarted/)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**1.** enter `chrome://extensions` in Chrome browser address bar </br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2.** enable 'Developer mode' by turning on toggle switch in top right of page </br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**3.** click `LOAD UNPACKED` and select this directory on local machine </br>

## Functionality 

Chrome browser will automatically inject *console.js* (insert one's custom code inside `function customConsole`) into the current page. </br>
To modify when/if Chrome injects code go to background.js (instructions are there). </br>
To modify what pages this extension applies to modify manifest.json's URL glob patterns: syntax similar to RegEx.  Read [Google's Documentation](https://developer.chrome.com/docs/extensions/mv2/match_patterns/) on glob patterns as it is much more limited than RegEx. </br>

## Customization

In `console.js` add code within `function customConsole` to customize one's dev tools experience. </br>
Most changes made within directory auto load into the extension.  If changes do not seem to be implemented go to `chrome://extensions` in Chrome browser and click the reload button for the extension. 

## Known Limitations
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**1.** this extension does not work with Google websites (e.g., www.google.com): Google does not support it. </br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2.** this extension does not work in headless browswer mode: Google does not support it. </br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**3.** extension usually does not load on a page redirect or clicking a link with target=_blank (new tab).  In this case, reload the page. </br>  

## Troubleshooting

Aside from known limitations above, reloading the page should make the extension work.  Otherwise put in an issue. 

## Sources
- Dan Harper wrote the [skeleton](https://gist.github.com/danharper/8364399) for background.js and manifest.json.  His home page is [here](http://danharper.me).
- Aliaksandr Astashenkau (aka dfsq) provided most of the [code](https://stackoverflow.com/questions/9051205/adding-custom-functionality-into-chromes-console) for console.js. 
- Tan Li Hau provided idea to use textContent for script tag: article [here](https://lihautan.com/personalised-development-workspace-with-chrome-extension/).
