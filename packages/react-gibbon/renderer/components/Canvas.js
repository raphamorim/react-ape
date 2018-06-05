import { createElement } from 'react';

class Canvas {
  constructor(root, props, gibbonContext) {
    this.root = root;
    this.props = props;
    this.gibbonContext = gibbonContext;
  }

  getDefaultProps() {
    return {
      scale: window.devicePixelRatio || 1,
    };
  }

  render() {
    // Scale the drawing area to match DPI.
    const width = this.props.width * this.props.scale;
    const height = this.props.height * this.props.scale;
    const style = {
      width: this.props.width,
      height: this.props.height
    };

    return (
      createElement('canvas', {
        ref: 'canvas',
        className: this.props.className,
        id: this.props.id,
        width: width,
        height: height,
        style: style,
        // onTouchStart: this.handleTouchStart,
        // onTouchMove: this.handleTouchMove,
        // onTouchEnd: this.handleTouchEnd,
        // onTouchCancel: this.handleTouchEnd,
        onClick: this.handleClick,
        onContextMenu: this.handleContextMenu,
        onDoubleClick: this.handleDoubleClick
      })
    );
  }

  hitTest(e) {
    // const hitTarget = hitTest(e, this.node, this.refs.canvas);
    // if (hitTarget) {
    //   hitTarget[hitTest.getHitHandle(e.type)](e);
    // }
    console.log(e);
  }

  // handleTouchStart(e) {
  // }

  // handleTouchMove(e) {
  //   // this.hitTest(e);
  // }

  // handleTouchEnd(e) {
  // }

  handleClick(e) {
    this.hitTest(e);
  }

  handleContextMenu(e) {
    this.hitTest(e);
  }

  handleDoubleClick(e) {
    this.hitTest(e);
  }
}

export default Canvas;
