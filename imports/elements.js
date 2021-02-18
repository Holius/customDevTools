export function elements () {
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
        const children = search.includes('s') ? [...elm.children] : [elm]
        function findBottomLevelMatch(elm) {
            var result
            if (elm.children && elm.children.length) {
                new Array(...elm.children).forEach(child => {
                    if (findBottomLevelMatch(child)) result = true
                })
            }
            if (result === true) return true
            if (elm.innerText && (elm.innerText.match(regex) !== null)) {
                results.push(elm)
                return true
            }
            return false
        }
        for (let child of children) {
            findBottomLevelMatch(child)
        }

        return results
    } 
    //ensures document object behaves as expected behavior --> see function above for functionality
    HTMLDocument.prototype.contains_r = function (regex) { //do NOT use lambda since this cannot go one level higher
        return HTMLElement.prototype.contains_r.call(this.body, regex, 'c')
    } 
}