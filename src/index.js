import React, { Component, PropTypes } from 'react';
import Resizable from 'react-resizable-and-movable';
import Draggable from 'react-draggable';

export default class HelloWorld extends Component {
  static propTypes = {
    start: PropTypes.object.isRequired,
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
  };

  constructor(props) {
    super(props);
    const { box, pointer } = this.props.start;
    const base = [
      { x: box.x + box.width, y: (box.y + box.height * 0.25) },
      { x: box.x + box.width, y: (box.y + box.height * 0.75) },
    ];

    const control = { x: box.x + box.width, y: (box.y + box.height * 0.5) };

    this.state = {
      pointer: {
        base,
        control,
        destination: pointer,
      },
    };
  }

  onDrag(e) {
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
    const { start } = this.props;
    const { base, destination, control } = this.state.pointer;
    return (
      <div>
        <Resizable
          start={ start.box }
          customStyle={
             { background: '#333' }
           }
        >
          Hello, world
        </Resizable>
        <svg width="2000" height="2000">
          <path
            d={ `M ${ base[0].x } ${ base[0].y }
                 Q ${ control.x } ${ control.y } ${ destination.x } ${ destination.y }
                 Q ${ control.x } ${ control.y } ${ base[1].x } ${ base[1].y }` }
            fill="#333"
          />
        </svg>
        <Draggable
          start={ start.pointer }
          onDrag={ ::this.onDrag }
        >
          <div style={{
            width: '20px',
            height: '20px',
            background: '#333',
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
