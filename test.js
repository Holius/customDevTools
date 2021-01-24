function get_all_protos (instance) {
    //handles edge case where no arguments are passed | no arguments should return any instance since truly nothing was passed (null/undefined values being passed are instances as these values increases arguments.length)
    if (arguments.length !== 1) throw ('expected only 1 argument: got ' + arguments.length + '.') 
    if (instance === null) return ['Null']
    if (instance === undefined) return ['Undefined']
    if (Object.getPrototypeOf(Object.getPrototypeOf(instance)) === null) return ['Object']
    const protos = []
    function get_proto (instance) { 
        const proto = Object.getPrototypeOf(instance)
        const proto_str = new String(proto.constructor).match(/(?<=function\s+).*(?=\(\))/)[0]
        if (proto_str === 'Object') return
        protos.push(proto_str)
        get_proto(proto)
    }
    get_proto(instance)
    return protos
}