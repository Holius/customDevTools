(function () {
    function customConsole() {
        window.myNewFunction = function() {
            console.log("Hello I'm available from console.");
        };
    }

    let s = document.createElement('script')
    s.textContent = `(${customConsole})()`
    document.documentElement.appendChild(s);
})()