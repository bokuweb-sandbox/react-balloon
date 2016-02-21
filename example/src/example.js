import React, { Component } from 'react';
import Balloon from '../../src';

export default class Example extends Component {
  render() {
    const center = {
      width: document.body.clientWidth / 2,
      height: document.body.clientHeight / 2,
    };
    return (
      <Balloon
         start={{
           box: { x: center.width - 180, y: center.height - 150, width: 300, height: 105 },
           destination: { x: center.width , y: center.height },
         }}
         style={{ borderRadius: '5px', position: 'relative' }}
         backgroundColor="#ECF0F1"
         className={ 'animated bounceInUp' }
         minWidth={ 250 }
         minHeight={ 105 }
         maxWidth={ 800 }
         maxHeight={ 400 }
         onPointerDragStop={(position) => console.dir(position)}
         onBoxResize={size => console.log(size)}
         onBoxResizeStop={size => console.log(size)}
      >
        <p style={{ textAlign: 'center', fontSize: '28px' }}>Hello, World!!</p>
      </Balloon>
    );
  }
}
