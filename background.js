// this is the background code...

//uncomment line to have code injected by clicking action/extension button at the top right of Chrome
//chrome.browserAction.onClicked.addListener(function (tab) {

//code injection occurs when DOM content has loaded
//Chrome's webNavigation API documentation is here: https://developer.chrome.com/docs/extensions/reference/webNavigation/
chrome.webNavigation.onDOMContentLoaded.addListener(function(tab) {
	// for the current tab, inject the "inject.js" file & execute it
	//code execution
	chrome.tabs.executeScript(tab.ib, {
		file: 'inject_module.js'
	});
});