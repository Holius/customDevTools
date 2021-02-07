(function () {
    //inside function block are examples
    function customConsole() {
        //the event listener usually emits multiple times, so this prevents code re-injection from reassigning state
        if (window.h === undefined) { 
            //helpers
            window.h = {}
            //return string represention of instance's prototype
            window.h.proto = function (instance) {
                if (arguments.length !== 1) throw (`expected 1 argument got ${arguments.length}.`)
                try {
                    return new String(Object.getPrototypeOf(instance).constructor).match(/(?<=function\s+).*(?=\(\))/)[0]
                } catch {
                    if (instance === null) return 'Null'
                    if (instance === undefined) return 'Undefined'
                    throw ('instance not correctly handled in h.proto method')
                }
            // Regular Expression Regex --> RegExp
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
            /*

            */
            HTMLElement.prototype.contains_r = function (regex, search = 'c') { //do NOT use lambda since this cannot go one level higher
                let elm = this
                if (!elm) return
                if (!['s', 'c', 'sc', 'cs'].includes(search)) throw (`expected 's', 'c', 'sc', or 'cs' got '${search}'`)
                if (h.proto(regex) !== 'RegExp') throw ('expressing that you RegEx is invalid!')
                const isBody = h.proto(elm) === 'HTMLBodyElement'
                if (!isBody && search.includes('s')) elm = this.parentElement
                if (h.proto(elm) === 'HTMLBodyElement') search = 'c'
                const results = []
                
                let children = search === 's' ? elm.children : elm.querySelectorAll('*')
                children = search === 'c' ? [elm, ...children] : [...children]
                children.forEach( child => {
                    if (child.textContent.match(regex)) {
                        results.push([child, child.textContent.match(regex)[0], child.textContent])
                    }
                })        
                return results
            } 
            //ensures document object behaves as expected behavior --> see function above for functionality
            HTMLDocument.prototype.contains_r = function (regex) { //do NOT use lambda since this cannot go one level higher
                return HTMLElement.prototype.contains_r.call(this.body, regex, 'c')
            } 
            console.log('debugging helpers added to state')
        }
    }
    let s = document.createElement('script')
    s.textContent = `(${customConsole})()`
    document.documentElement.appendChild(s);
    
})()