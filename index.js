import React, {useEffect} from 'react';

const RafNumberLexicalHolder = (() => {
    if(typeof window.requestAnimationFrame === "function") {
        let prevValue = 0;
        return ({value = 0, totalSteps = 10, className = ""}) => {
            let prevRafRef;
            const ref = useRef();
            const range = value - prevValue;
            let counter = 0;
            function callback () {
                if ( counter < totalSteps ) {
                    counter += 1;
                    prevValue += (range/totalSteps);
                    ref.current.textContent = commaSperator(NumbersToPersian(prevValue.toFixed(0)));
                    prevRafRef = requestAnimationFrame(callback);
                } else {
                    // ref.current.textContent = midValue;
                    ref.current.textContent = commaSperator(NumbersToPersian(value.toFixed(0)));
                    cancelAnimationFrame(prevRafRef);
                }
            }
            useEffect(() => {
                prevRafRef = requestAnimationFrame(callback);
                return () => {
                    if(prevRafRef) {
                        cancelAnimationFrame(prevRafRef)
                    }
                }
            }, [value]);
            return <span ref={ref} className={className}></span>
        };
    }else {
        return ({value = 0 }) => <span className={className}>{value}</span>
    }
});

const RafNumberCounter = RafNumberLexicalHolder();

module.exports = RafNumberCounter