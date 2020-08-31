import * as React from "react";

interface IProps {
  value: number;
  totalSteps?: number;
  className?: string;
  outputFormatter?: (arg: number) => string|number;
}

const RafNumberLexicalHolder = () => {
  if ('requestAnimationFrame' in window) {
    let prevValue = 0;
    return ({
      value = 0,
      totalSteps = 10,
      className = "",
      outputFormatter = (v) => v,
    }: IProps) => {
      let prevRafRef: number;
      const ref = React.useRef(null);
      const range = value - prevValue;
      let counter = 0;
      function callback() {
        if (counter < totalSteps) {
          counter += 1;
          prevValue += range / totalSteps;
          //@ts-ignore
          ref.current.textContent = outputFormatter((prevValue.toFixed(0)) * 1);
          prevRafRef = requestAnimationFrame(callback);
        } else {
          //@ts-ignore
          ref.current.textContent = outputFormatter(value * 1);
          cancelAnimationFrame(prevRafRef);
        }
      }
      React.useEffect(() => {
        prevRafRef = requestAnimationFrame(callback);
        return () => {
          if (prevRafRef) {
            cancelAnimationFrame(prevRafRef);
          }
        };
      }, [value]);
      return <span ref={ref} className={className}></span>;
    };
  } else {
    return ({
      value = 0,
      className = "",
      outputFormatter = (v) => v,
    }: IProps) => <span className={className}>{outputFormatter(value)}</span>;
  }
};

const RafNumberCounter = RafNumberLexicalHolder();

export default RafNumberCounter;
