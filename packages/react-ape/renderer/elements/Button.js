/**
 * @https://github.com/facebook/react-native/blob/main/Libraries/Components/Button.js
 *
 * @flow
 *
 */

type ButtonProps = {|
        title:string,
        onPress:(event?:OnPressEvent):mixed,
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


}