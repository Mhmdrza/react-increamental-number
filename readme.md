# React Number Animator
A zero-dependency tiny package that animates a **number** increment/decrement on value change for a **smooth transition**;

**[Live demo](https://bfzz5.csb.app/)**    
demo source : [codesandbox](https://codesandbox.io/s/intelligent-kalam-bfzz5?file=/src/App.js)

> This package expects `react` version of `^16.8.1` ( since it uses `useEffect`) as its peer dependency
## What problems does this component solve?
1. Efficient while smooth animation
2. Animate the value from previous value (whether its bigger or smaller).
### how?
- it uses `requestAnimationFrame` under the hood and does a proper clean up on re-renders.
- it will keep a lexical variable automatically to save `previous value` when `value` changes, thus you don't to pass a `prevValue`; ( **what would happen if dont set a previous value in such scenario?** the animation always starts from zero on value change which is kinda ugly )
## How to use?
1. Install `yarn add react-number-animator` or `npm i react-number-animator`;
2. Import `import SmoothNumber from "react-number-animator"`;
3. place it where it is intended like: `<SmoothNumber value={/*sth*/} />`

> Attention: each release comes with `-compact` version which doesn't include `readme.md` thus 
half size of regualr package; and can be installed manually using latest version number plus `-compact` for example `yarn add react-number-animator@1.1.5-compact`

## Props:
| name| type | Required| default|
|-----|------|---------|--------|
| value| number |   **yes**|
|totalSteps|number|no|`10`
|className|string|no|             
|outputFormatter| function| no| `(v)=>v`
### Props description:
**value** : the number you want to show.

**totalSteps** : number of steps to do the animation. the higher the number the longer animation duration.

**className**: optional className to apply on output `<span>`.

**outputFormatter**: A function that is applied on each frame output; with this signature: `( val : number ) => string`. commonly used to format number in a local formats like showing a comma separated value instead of raw numbers in a banking scenario.

## Example:
```jsx
import SmoothNumber from "react-number-animator";

<SmoothNumber 
  value={/* somValue */} 
  totalSteps={15}
/>
```
## Browser support:
Since it uses `requestAnimationFrame` under the hood the browser support is the same as [requestAnimationFrame](https://caniuse.com/#search=requestAnimationFrame) browser support itself.
#### what  if `requestAnimationFrame` is not supproted by the browser?
it will fall back to a raw `<span>` without any animation just its value.
```jsx
<span className={className}>{outputFormatter(value)}</span>
```
## Package size: 
About `~2Kb` packed and compact version is about `~1kb`

