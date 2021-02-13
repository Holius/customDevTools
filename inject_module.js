(function () {
    
    let s
    //the event listener usually emits multiple times, so this prevents code re-injection from reassigning state
    if (s === undefined) { 
        s = document.createElement('script')
        s.setAttribute('type', 'module')
        s.setAttribute("src", chrome.extension.getURL('main.js'));
        document.documentElement.appendChild(s);
    }

})()