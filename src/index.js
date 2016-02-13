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
      pointer: {
        x: 400,
        y: 400,
      },
    },
    backgroundColor: '#ccc',
  };

  constructor(props) {
    super(props);
    const { box, pointer } = this.props.start;
    const base = [
      { x: box.x + box.width, y: box.y + box.height * 0.25 },
      { x: box.x + box.width, y: box.y + box.height * 0.75 },
    ];

    const control = { x: box.x + box.width, y: (box.y + box.height * 0.5) };

    this.state = {
      pointer: {
        base,
        control,
        destination: pointer,
      },
      box: {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      },
    };
  }

  onBoxDrag(e, { position }) {
    console.log(`${position.left}, ${position.top}`);
    const { width, height } = this.state.box;
    const x = position.left;
    const y = position.top;
    const base = [
      { x: x + width, y: y + height * 0.25 },
      { x: x + width, y: y + height * 0.75 },
    ];
    const control = { x: x + width, y: y + height * 0.5 };
    const { destination } = this.state.pointer;
    this.setState({
      pointer: {
        base,
        control,
        destination,
      },
      box: {
        width,
        height,
        x,
        y,
      },
    });
  }

  onPointerDrag(e) {
    console.dir(e);
    const { base, control } = this.state.pointer;
    this.setState({
      pointer: {
        base,
        control,
        destination: {
          x: e.clientX,
          y: e.clientY,
        },
      },
    });
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
