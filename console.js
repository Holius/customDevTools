(function () {
    //inside function block are examples
    function customConsole() {
        //check for existing value
        if (window.a === undefined) {
            window.a = {}
            window.a.check = true
            //select
            window.a.s = (selector, elm) => {
                return elm.querySelector(selector)
            }
            //select all
            window.a.sa = (selector, elm) => {
                return elm.querySelectorAll(selector)
            } 
            console.log('window.a added to state')
        } 
    }
    let s = document.createElement('script')
    s.textContent = `(${customConsole})()`
    document.documentElement.appendChild(s);
    
})()