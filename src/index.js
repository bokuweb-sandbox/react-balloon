import React, { Component, PropTypes } from 'react';
import Resizable from 'react-resizable-and-movable';
import Draggable from 'react-draggable';

export default class HelloWorld extends Component {
  static propTypes = {
    start: PropTypes.object.isRequired,
    backgroundColor: PropTypes.string,
  };

  static defaultProps = {
    start: {
      box: {
        x: 200,
        y: 200,
        width: 100,
        height: 100,
      },
      destination: {
        x: 0,
        y: 0,
      },
    },
    backgroundColor: '#ccc',
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
    };
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

  onPointerDrag(e) {
    const { box } = this.state;
    const destination = { x: e.clientX, y: e.clientY };
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

  getPointer(box, destination) {
    const boxCenter = this.getBoxCenter(box);
    const type = this.getPointerType(boxCenter, destination);
    return this.calculatePointer(destination, box, type);
  }

  render() {
    const { start, backgroundColor } = this.props;
    const { base, destination, control } = this.state.pointer;

    return (
      <div>
        <Resizable
          start={ start.box }
          customStyle={{ backgroundColor }}
          onDrag={ ::this.onBoxDrag }
        >
          Hello, world
        </Resizable>
        <svg width="2000" height="2000" style={{/* TODO: add absolute */}}>
          <path
            d={ `M ${ base[0].x } ${ base[0].y }
                 Q ${ control.x } ${ control.y } ${ destination.x } ${ destination.y }
                 Q ${ control.x } ${ control.y } ${ base[1].x } ${ base[1].y }` }
            fill={ backgroundColor }
          />
        </svg>
        <Draggable
          start={ start.pointer }
          onDrag={ ::this.onPointerDrag }
        >
          <div style={{
            width: '20px',
            height: '20px',
            background: backgroundColor,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          />
        </Draggable>
      </div>
    );
  }
}
