import React, { Component } from 'react';
import Resizable from 'react-resizable-and-movable';
import Draggable from 'react-draggable';

export default class HelloWorld extends Component {
  static propTypes = {

  };

  static defaultProps = {
    start: {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      pointer: {
        x: 300,
        y: 300
      }
    };
  }

  onDrag(e) {
    this.setState({
      pointer: {
        x: e.clientX,
        y: e.clientY
      }
    });
  }

  render() {
    const { start } = this.props;
    const { pointer } = this.state;
    return (
      <div>
        <Resizable
           start={ start }
           customStyle={{background:"#333"}}>
          Hello, world
        </Resizable>
        <svg width="2000" height="2000" onClick={()=>console.log('aa')}>
          <path d={`M 100 100 Q 100 125 ${ pointer.x } ${ pointer.y } Q 100 125 100 150`} fill="purple"/>
        </svg>
        <Draggable
           start={{x:300, y: 300}}
           onStart={()=>{}}
           onDrag={::this.onDrag}
           onStop={()=>{}}>
          <div style={{width:'20px', height:'20px', background:'#333', position: 'absolute', top: 0, left: 0}}/>
        </Draggable>
      </div>
    );
  }
}
