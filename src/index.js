import React, { Component, PropTypes } from 'react';
import Resizable from 'react-resizable-and-movable';
import Draggable from 'react-draggable';

export default class HelloWorld extends Component {
  static propTypes = {
    start: PropTypes.object.isRequired,
  };

  static defaultProps = {
    start: {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      pointer: {
        destination: { x: 300, y: 300 },
        base: [
          { x: 100, y: 100 },
          { x: 100, y: 150 },
        ],
      },
    };
  }

  onDrag(e) {
    const { base } = this.state.pointer;
    this.setState({
      pointer: {
        base,
        destination: {
          x: e.clientX,
          y: e.clientY,
        },
      },
    });
  }

  render() {
    const { start } = this.props;
    const { base, destination } = this.state.pointer;
    return (
      <div>
        <Resizable
          start={ start }
          customStyle={
             { background: '#333' }
           }
        >
          Hello, world
        </Resizable>
        <svg width="2000" height="2000">
          <path
            d={ `M ${ base[0].x } ${ base[0].y }
                 Q 100 125 ${ destination.x } ${ destination.y }
                 Q 100 125 ${ base[1].x } ${ base[1].y }` }
            fill="purple"
          />
        </svg>
        <Draggable
          start={{ x: 300, y: 300 }}
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
