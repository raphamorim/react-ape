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
  onClick: (event?: SyntheticMouseEvent<HTMLButtonElement>) => mixed,
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
  //
  console.log('[RENDER]');
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
  let globalStyle = {
    width: width,
    height: height,
    color: color,
    borderRadius: borderRadius,
    backgroundColor:color,
    lineWidth: 0,
    borderColor: 'transparent',
  };
  const resetStyle = newStyle => {
    globalStyle = {...globalStyle, newStyle};
    console.log('style)))))', globalStyle);
  };
  const redrawButton = ctx => {
    // TODO reset Style on focus
    let newStyle = {
      lineWidth: 2,
      borderColor: '#ccc',
    };
    //let prevStyle = globalStyle
    resetStyle(newStyle);
  };

  ctx.beginPath();
  ctx.fillStyle = color;
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
  ctx.lineWidth = globalStyle.lineWidth;
  ctx.strokeStyle = globalStyle.borderColor;
  ctx.stroke();
  ctx.fillStyle =  ButtonDefaults.textStyle.color;
  ctx.font = `${ButtonDefaults.textStyle.fontSize} Helvetica`;
  //ctx.fillText('Start', x+ width/2 , y + height / 2);
  ctx.textAlign = 'center';
  ctx.fillText(title, x + width / 2, y + height / 2);
  ctx.closePath();

  const onClick = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    const rect = {
      x,
      y,
      height,
      width,
    };
    const mousePosition = trackMousePosition(ctx.canvas, event);
    if (isInside(mousePosition, rect)) {
      redrawButton(ctx);
      if (props.onClick && typeof props.onClick === 'function') {
        props.onClick(event);
      }
    }
  };
  function trackMousePosition(canvas, event) {
    return {
      x: event.clientX - canvas.offsetLeft,
      y: event.clientY - canvas.offsetTop,
    };
  }
  const isInside = (pos, rect) => {
    return (
      pos.x > rect.x &&
      pos.x < rect.x + rect.width &&
      pos.y < rect.y + rect.height &&
      pos.y > rect.y
    );
  };

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
