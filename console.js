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
            //returns (if extant) first regex match for DOM element in sibling then children 
            HTMLElement.prototype.contains_sc = function (regex, direction = 0) { //do NOT use lambda since this cannot go one level higher
                const elm = this //readability
                if (!elm) return
                if (elm.textContent.match(regex)) return elm.textContent.match(regex)[0]
                
                if (elm.previousElementSibling && direction <= 0) {
                    const result = elm.contains_sc.call(elm.previousElementSibling, regex, -1)
                    if (result) return result
                }
                if (elm.nextElementSibling && direction >= 0) { 
                    const result = elm.contains_sc.call(elm.previousElementSibling, regex, 1)
                    if (result) return result
                } 
            
                for (let i = 0; i < elm.children.length; i++) {
                    const child = elm.children[i]
                    const result = elm.contains_sc.call(child, regex, null)
                    if (result) return result
                } 
            }
            console.log('window.a added to state')
        } 
    }
    let s = document.createElement('script')
    s.textContent = `(${customConsole})()`
    document.documentElement.appendChild(s);
    
})()