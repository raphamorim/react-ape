/**
 * @https://github.com/facebook/react-native/blob/main/Libraries/Components/Button.js
 *
 * @flow
 *
 */

import {ButtonDefaults} from '../constants';
import {trackMousePosition,isMouseInside} from '../utils'
import type {CanvasComponentContext} from '../types'

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

function renderButton(props: ButtonProps, apeContext:CanvasComponentContext, parentLayout) {
  const {ctx} = apeContext;

  // If is relative and x and y haven't be processed, don't render
  // start drawing the canvas
  console.log('[PROPS]',props)
  const {title, color} = props;
  if(!title){
    throw Error("Title required!")
  }
  const borderRadius = ButtonDefaults.containerStyle.borderRadius;
  const backgroundColor = ButtonDefaults.containerStyle.backgroundColor;
  let x = 40;
  let y = 300;
  const textWidth = ctx.measureText(title).width;
  let width =  textWidth * 1.5;
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

  };
  const redrawButton = ctx => {
    // TODO reset Style on focus
    let newStyle = {
      lineWidth: 2,
      borderColor: '#ccc',
    };
    resetStyle(newStyle);
  };

  ctx.beginPath();
  ctx.fillStyle = color || ButtonDefaults.containerStyle.backgroundColor
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

  //set the fontSize
const fontArgs = ctx.font.split(' ');
const newSize =` ${ButtonDefaults.textStyle.fontSize}px`;
  ctx.font = newSize + ' ' + fontArgs[fontArgs.length - 1];

// ctx.textAlign = 'center';

// ctx.fillText(title,  400 / 2, y + height / 2,textWidth);
ctx.fillText(title , (x + textWidth /2.5), y + height /2);
  ctx.closePath();

  const onClick = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    const rect = {
      x,
      y,
      height,
      width,
    };
    const mousePosition = trackMousePosition(ctx.canvas, event);
    if (isMouseInside(mousePosition, rect)) {
      redrawButton(ctx);
      if (props.onClick && typeof props.onClick === 'function') {
        props.onClick(event);
      }
    }
  };




// TODO:  
/**
 * We need to remove addEventListeners from the renderButton 
 * function because this function runs for each state/prop update.
 *  It will keep creating/refreshing listeners for every render.

We can keep this way, if we run this addEventListener 
once by checking if the listener already exist. 
Note onClick will need to share scope with this function to work properly.
 */
  ctx.canvas.addEventListener('click', onClick, false);
  ctx.canvas.addEventListener('focus', redrawButton);
  ctx.canvas.addEventListener('blur', redrawButton);

 
}



export default function createButtonInstance(props: ButtonProps): mixed {
  return {
    type: 'Button',
    render: renderButton.bind(this, props),
  };
}
