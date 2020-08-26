import * as React from 'react';

interface IProps {
    value: number
    totalSteps?: number
    className?: string
    outputFormatter?: (arg: any) => any
}

const RafNumberLexicalHolder = (() => {
    if(typeof window.requestAnimationFrame === "function") {
        let prevValue = 0;
        return ({value = 0, totalSteps = 10, className = "", outputFormatter = (v) => v}: IProps) => {
            let prevRafRef: number;
            const ref = React.useRef(null);
            const range = value - prevValue;
            let counter = 0;
            function callback () {
                if ( counter < totalSteps ) {
                    counter += 1;
                    prevValue += (range/totalSteps);
                    //@ts-ignore
                    ref.current.textContent = outputFormatter(prevValue);
                    prevRafRef = requestAnimationFrame(callback);
                } else {
                    //@ts-ignore
                    ref.current.textContent = outputFormatter(value);
                    cancelAnimationFrame(prevRafRef);
                }
            }
            React.useEffect(() => {
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
        return ({
            value = 0,
            className = "",
            outputFormatter = (v) => v 
        }: IProps) => <span className={className}>{outputFormatter(value)}</span>
    }
});

export const RafNumberCounter = RafNumberLexicalHolder();