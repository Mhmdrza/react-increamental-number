/// <reference types="react" />
interface IProps {
    value: number;
    totalSteps?: number;
    className?: string;
    outputFormatter?: (arg: any) => any;
}
export declare const RafNumberCounter: ({ value, totalSteps, className, outputFormatter }: IProps) => JSX.Element;
export default RafNumberCounter;
