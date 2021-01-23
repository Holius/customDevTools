(function () {
    //inside function block are examples
    function customConsole() {
        //the event listener usually emits multiple times, so this prevents code re-injection from reassigning state
        if (window.h === undefined) { 
            //helpers
            window.h = {}
            //return string represention of instance's prototype
            window.h.proto = function (instance) {
                try {
                    return new String(Object.getPrototypeOf(instance).constructor).match(/(?<=function\s+).*(?=\(\))/)[0]
                } catch {
                    return null //could be thrown by an undefined value as well
                }
            }
            //curried function for readable composition on attribute value and name matching
            window.h.attr_match = function (key) {
                return function (regex) { 
                    if (h.proto(regex) !== 'RegExp') throw ('expressing that you RegEx is invalid!')
                    const elms = [this, ...this.querySelectorAll('*')]
                    const results = []
                    elms.forEach( elm => {
                        [...elm.attributes].forEach( attr => {
                            if (attr[key].match(regex) !== null) {
                                results.push([elm, attr])
                            }
                        })
                    })
                    return results
                }   
            }
            //common selectors
            window.se = {
                buy : '[href*="buy-now="]'
            }
            //select all
            HTMLElement.prototype.sa = function (selector) {
                return this.querySelectorAll(selector)
            }
            //select all
            HTMLDocument.prototype.sa = function (selector) {
                return this.querySelectorAll(selector)
            }
            //select
            HTMLElement.prototype.s = function (selector) {
                return this.querySelector(selector)
            }            
            //select
            HTMLDocument.prototype.s = function (selector) {
                return this.querySelector(selector)
            }
            //search current element (this) and children attributes for a value match
            HTMLElement.prototype.attr_val_match = window.h.attr_match('value')
            //search current element (this) and children attributes for a value match
            HTMLDocument.prototype.attr_val_match = function (regex) {
                return window.h.attr_match('value').call(this.body, regex)
            }
            //search current element (this) and children attributes for a name match
            HTMLElement.prototype.attr_name_match = window.h.attr_match('name')
            //search current element (this) and children attributes for a name match
            HTMLDocument.prototype.attr_name_match = function (regex) {
                return window.h.attr_match('name').call(this.body, regex)
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
            //ensures document object behaves as expected behavior --> see function above for functionality
            HTMLDocument.prototype.contains_sc = function (regex, direction = 0) { //do NOT use lambda since this cannot go one level higher
                return HTMLElement.prototype.contains_sc.call(this.body, regex, direction)
            } 
            console.log('debugging helpers added to state')
        }
    }
    let s = document.createElement('script')
    s.textContent = `(${customConsole})()`
    document.documentElement.appendChild(s);
    
})()