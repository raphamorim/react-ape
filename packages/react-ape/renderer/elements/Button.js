/**
 * @https://github.com/facebook/react-native/blob/main/Libraries/Components/Button.js
 *
 * @flow
 *
 */

import { ButtonDefaults } from "../constants";

type ButtonProps = {|
        title:string,
        onPress:(event?:any)=>mixed,
        touchSoundDisabled?:?boolean,
        color?:?string,
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

    |}

function renderButton( 
    props,
    apeContext,
    parentLayout)
{
const {spatialGeometry={},relativeIndex} = parentLayout
const {ctx} = apeContext
  // If is relative and x and y haven't be processed, don't render
if(!spatialGeometry) return null
// start drawing the canvas
const  {title} = props
const borderRadius = ButtonDefaults.containerStyle.borderRadius 
const backgroundColor = ButtonDefaults.containerStyle.backgroundColor
const width = ButtonDefaults.containerStyle.width
const height = ButtonDefaults.containerStyle.height
let x = spatialGeometry.x || 20
let y = spatialGeometry.y || 40
const antiClockWise = false
ctx.beginPath()
//ctx.lineWidth = borderWidth
ctx.fillStyle = backgroundColor
//ctx.strokeStyle = borderColor
//ctx.rect(x,y,borderRadius,width,height,antiClockWise)
//ctx.rect(x,y,width,height)
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


ctx.fill()
ctx.stroke()
ctx.fillStyle = '#000000';
ctx.font = `${ButtonDefaults.textStyle.fontSize} Helvetica`;
//ctx.fillText('Start', x+ width/2 , y + height / 2);
ctx.textAlign = 'center'
ctx.fillText(title,x + width / 2,y + height /2)
//ctx.fillText('Start', x  + height /2, y + height /2 );
ctx.closePath()



}


export default function createButtonInstance(props:Props):mixed{
    return {
        type:'Button',
        render:renderButton.bind(this,props)
    }
}