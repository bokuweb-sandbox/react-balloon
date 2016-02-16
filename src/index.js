import React, { Component, PropTypes } from 'react';
import Resizable from 'react-resizable-and-movable';

export default class Balloon extends Component {
  static propTypes = {
    start: PropTypes.object.isRequired,
    backgroundColor: PropTypes.string,
    zIndex: PropTypes.number,
    minWidth: PropTypes.number,
    minHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number,
    marker: PropTypes.object.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    start: {
      box: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      },
      destination: {
        x: 0,
        y: 0,
      },
    },
    marker: <div style={{ width: '20px', height: '20px', backgroundColor: '#ccc' }} />,
    backgroundColor: '#f5f5f5',
    zIndex: 100,
    className: '',
  };

  constructor(props) {
    super(props);
    const { box, destination } = this.props.start;
    const pointerState = this.getPointer(box, destination);
    this.state = {
      pointer: pointerState,
      box: {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      },
      maxHeight: this.props.maxHeight,
      maxWidth: this.props.maxWidth,
    };
  }

  onBoxResize({ width, height }) {
    const { box: { x, y }, pointer: { destination } } = this.state;
    const toBottomBoundary = this.refs.wrapper.clientHeight - y;
    const toRightBoundary = this.refs.wrapper.clientWidth - x;
    const maxHeight = (toBottomBoundary < this.props.maxHeight || !this.props.maxHeight) ? toBottomBoundary : this.props.maxHeight;
    const maxWidth = (toRightBoundary < this.props.maxWidth || !this.props.maxWidth) ? toRightBoundary : this.props.maxWidth;
    const box = { x, y, width, height };
    const pointerState = this.getPointer(box, destination);
    this.setState({
      pointer: pointerState,
      box,
      maxHeight,
      maxWidth,
    });
  }

  onBoxDrag(e, { position }) {
    const { box: { width, height }, pointer: { destination } } = this.state;
    const x = position.left;
    const y = position.top;
    const box = { x, y, width, height };
    const pointerState = this.getPointer(box, destination);
    this.setState({
      pointer: pointerState,
      box,
    });
  }

  onPointerDrag(e, { position }) {
    const { box } = this.state;
    const destination = { x: position.left, y: position.top };
    const pointerState = this.getPointer(box, destination);
    this.setState({ pointer: pointerState });
  }

  getBoxCenter(box) {
    return {
      x: box.x + box.width / 2,
      y: box.y + box.height / 2,
    };
  }

  getPointerType(origin, destination) {
    const degree = this.getDegree(origin, destination);
    if (degree >= -45 && degree < 45) return 'right';
    if (degree >= 45 && degree < 135) return 'top';
    if ((degree >= 135 && degree <= 180) || (degree >= -180 && degree < -135)) return 'left';
    if (degree >= -135 && degree < -45) return 'bottom';
  }

  getDegree(origin, destination) {
    const x = destination.x - origin.x;
    const y = origin.y - destination.y;
    const rad = Math.atan2(y, x);
    if (isNaN(rad)) return 0;
    return rad * 360 / (2 * Math.PI);
  }

  getPointer(box, destination) {
    const boxCenter = this.getBoxCenter(box);
    const type = this.getPointerType(boxCenter, destination);
    return this.calculatePointer(destination, box, type);
  }

  calculatePointer(destination, box, type) {
    let base;
    let control;
    const { x, y, width, height } = box;

    switch (type) {
      case 'top' :
        base = [
          { x: x + width * 0.25, y },
          { x: x + width * 0.75, y },
        ];
        control = { x: x + width * 0.5, y };
        break;
      case 'right' :
        base = [
          { x: x + width, y: y + height * 0.25 },
          { x: x + width, y: y + height * 0.75 },
        ];
        control = { x: x + width, y: y + height * 0.5 };
        break;
      case 'bottom' :
        base = [
          { x: x + width * 0.25, y: y + height },
          { x: x + width * 0.75, y: y + height },
        ];
        control = { x: x + width * 0.5, y: y + height };
        break;
      case 'left' :
        base = [
          { x, y: y + height * 0.25 },
          { x, y: y + height * 0.75 },
        ];
        control = { x, y: y + height * 0.5 };
        break;
      default:
        base = [
          { x: x + width, y: y + height * 0.25 },
          { x: x + width, y: y + height * 0.75 },
        ];
        control = { x: x + width, y: y + height * 0.5 };
        break;
    }

    return {
      base,
      control,
      destination,
    };
  }

  render() {
    const { start, backgroundColor, zIndex, minWidth, minHeight, marker, className } = this.props;
    const { base, destination, control } = this.state.pointer;
    const { maxHeight, maxWidth } = this.state;
    return (
      <div ref='wrapper' className={className} style={{ width: '100%', height: '100%', zIndex }}>
        <Resizable
          start={ start.box }
          customStyle={{ backgroundColor }}
          onDrag={ ::this.onBoxDrag }
          onResize={ ::this.onBoxResize }
          bounds="parent"
          zIndex={ zIndex }
          maxHeight={ maxHeight }
          maxWidth={ maxWidth }
          minHeight={ minHeight }
          minWidth={ minWidth }
        >
          { this.props.children }
        </Resizable>
        <Resizable
           start={{ x: start.destination.x, y: start.destination.y }}
           onDrag={ ::this.onPointerDrag }
           bounds="parent"
           isResizable={{ x: false, y: false, xy: false }}
           zIndex={zIndex}
        >
          { marker }
        </Resizable>
        <svg width="100%" height="100%" style={{}}>
          <path
            d={ `M ${ base[0].x } ${ base[0].y }
                 Q ${ control.x } ${ control.y } ${ destination.x } ${ destination.y }
                 Q ${ control.x } ${ control.y } ${ base[1].x } ${ base[1].y }` }
            fill={ backgroundColor }
          />
        </svg>
      </div>
    );
  }
}
