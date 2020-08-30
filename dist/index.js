import * as React from 'react';
var RafNumberLexicalHolder = (function () {
    if (typeof window.requestAnimationFrame === "function") {
        var prevValue_1 = 0;
        return function (_a) {
            var _b = _a.value, value = _b === void 0 ? 0 : _b, _c = _a.totalSteps, totalSteps = _c === void 0 ? 10 : _c, _d = _a.className, className = _d === void 0 ? "" : _d, _e = _a.outputFormatter, outputFormatter = _e === void 0 ? function (v) { return v; } : _e;
            var prevRafRef;
            var ref = React.useRef(null);
            var range = value - prevValue_1;
            var counter = 0;
            function callback() {
                if (counter < totalSteps) {
                    counter += 1;
                    prevValue_1 += (range / totalSteps);
                    //@ts-ignore
                    ref.current.textContent = outputFormatter(prevValue_1.toFixed(0));
                    prevRafRef = requestAnimationFrame(callback);
                }
                else {
                    //@ts-ignore
                    ref.current.textContent = outputFormatter(value.toFixed(0));
                    cancelAnimationFrame(prevRafRef);
                }
            }
            React.useEffect(function () {
                prevRafRef = requestAnimationFrame(callback);
                return function () {
                    if (prevRafRef) {
                        cancelAnimationFrame(prevRafRef);
                    }
                };
            }, [value]);
            return React.createElement("span", { ref: ref, className: className });
        };
    }
    else {
        return function (_a) {
            var _b = _a.value, value = _b === void 0 ? 0 : _b, _c = _a.className, className = _c === void 0 ? "" : _c, _d = _a.outputFormatter, outputFormatter = _d === void 0 ? function (v) { return v; } : _d;
            return React.createElement("span", { className: className }, outputFormatter(value));
        };
    }
});
export var RafNumberCounter = RafNumberLexicalHolder();
export default RafNumberCounter;
