'use strict'

export function helpers () {
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
    //short hand alias
    window.d = document
}