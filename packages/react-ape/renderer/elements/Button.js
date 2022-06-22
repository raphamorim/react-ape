/**
 * @https://github.com/facebook/react-native/blob/main/Libraries/Components/Button.js
 *
 * @flow
 *
 */

import {ButtonDefaults} from '../constants';

//TODO adjust Opacity when focus, Blur
type PressEvent = {||};
type ButtonProps = {|
  title: string,
  onPress: (event?: PressEvent) => mixed,
  onClick: (event?: PressEvent) => mixed,
  touchSoundDisabled?: ?boolean,
  color?: ?string,
  /**
   * TV next focus down (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusDown?: ?number,
  /**
   * TV next focus forward (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusForward?: ?number,

  /**
   * TV next focus left (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusLeft?: ?number,

  /**
    * TV next focus right (see documentation for the View component).
    *
    * @platform android
    */
  nextFocusRight?: ?number,

  /**
    * TV next focus up (see documentation for the View component).
    *
    * @platform android
    */
  nextFocusUp?: ?number,

  /**
    * Text to display for blindness accessibility features
    */
  accessibilityLabel?: ?string,

  /**
    * If true, disable all interactions for this component.
    */
  disabled?: ?boolean,

  /**
    * Used to locate this view in end-to-end tests.
    */
  testID?: ?string,
|};

function renderButton(props: ButtonProps, apeContext, parentLayout) {
  const {spatialGeometry = {x: 0, y: 0}} = parentLayout;
  const {ctx} = apeContext;
  // If is relative and x and y haven't be processed, don't render
  if (!spatialGeometry) return null;
  // start drawing the canvas
  const {title, color} = props;
  const borderRadius = ButtonDefaults.containerStyle.borderRadius;
  const backgroundColor = ButtonDefaults.containerStyle.backgroundColor;
  let x = spatialGeometry.x || 0;
  let y = spatialGeometry.y || 0;
  let width = x + y;
  let height = ButtonDefaults.containerStyle.height;

  //  ctx.addEventListener('click',()=>{
  //   alert('hi')
  // })

  ctx.beginPath();
  ctx.fillStyle = backgroundColor;
  ctx.moveTo(x, y);
  /**
*  Top Right Radius
*/
  ctx.lineTo(x + width - borderRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
  /**
*  Bottom right Radius
*/

  ctx.lineTo(x + width, y + height - borderRadius);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - borderRadius,
    y + height
  );

  /**
*  Bottom Left Radius
*/
  ctx.lineTo(x + borderRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
  /** Top left Radius */
  ctx.lineTo(x, y + borderRadius);
  ctx.quadraticCurveTo(x, y, x + borderRadius, y);

  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = color || ButtonDefaults.textStyle.color;
  ctx.font = `${ButtonDefaults.textStyle.fontSize} Helvetica`;
  //ctx.fillText('Start', x+ width/2 , y + height / 2);
  ctx.textAlign = 'center';
  ctx.fillText(title, x + width / 2, y + height / 2);
  //ctx.fillText('Start', x  + height /2, y + height /2 );
  ctx.closePath();

  //const canvas = document.getElementById('root')
  //const context = canvas.getContext('2d')
  const onClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    const rect = {
      x,
      y,
      height,
      width,
    };
    // const clientX = event.clientX  -  ctx.canvas.offsetLeft
    // const clientY = event.clientY  -  ctx.canvas.offsetTop
    const mousePosition = getMousePos(ctx.canvas, event);

    // console.log('mouse',x,y)
    console.log('rect', rect);
    console.log('mouse', mousePosition);
    if (isInside(mousePosition, rect)) {
      alert('hi');
    } else {
      //alert('not inside')
    }
  };
  function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }
  const isInside = (pos, rect) => {
    return (
      pos.x > rect.x &&
      pos.x < rect.x + rect.width &&
      pos.y < rect.y + rect.heigth &&
      pos.y > rect.y
    );
  };
  const redrawButton = () => {};
  ctx.canvas.addEventListener('click', onClick, false);
  ctx.canvas.addEventListener('focus', redrawButton);
  ctx.canvas.addEventListener('blur', redrawButton);

  // events
}

export default function createButtonInstance(props: ButtonProps): mixed {
  return {
    type: 'Button',
    render: renderButton.bind(this, props),
  };
}
