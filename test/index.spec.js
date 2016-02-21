import React from 'react';
import { shallow, mount } from 'enzyme';
import assert from 'power-assert';
import sinon from 'sinon';
import ResizableAndMovable from 'react-resizable-and-movable';
import Balloon from '../src/index';

const mouseMove = (node, x, y) => {
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('mousemove', true, true, window,
                       0, 0, 0, x, y, false, false, false, false, 0, null);
  document.dispatchEvent(event);
  return event;
};

describe('<Balloon/>', () => {
  it('should have default properties', () => {
    const balloon = mount(<Balloon />);
    assert.equal(balloon.props().zIndex, 100);
    assert.equal(balloon.props().className, '');
    assert.equal(balloon.props().backgroundColor, '#f5f5f5');
    assert.equal(balloon.props().minWidth, undefined);
    assert.equal(balloon.props().minHeight, undefined);
    assert.equal(balloon.props().maxWidth, undefined);
    assert.equal(balloon.props().maxHeight, undefined);
    assert.deepEqual(balloon.props().style, {});
    assert.deepEqual(balloon.props().start, {
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
    });
  });

  it('Should root element have expected element and styles', () => {
    const balloon = shallow(<Balloon />);
    const expectedStyles = { width: '100%', height: '100%', zIndex: 100 };
    assert.equal(balloon.type(), 'div');
    assert.deepEqual(balloon.prop('style'), expectedStyles);
  });

  it('Should 1st element have expected type', () => {
    const balloon = shallow(<Balloon />);
    const first =  balloon.children().at(0);
    assert.equal(first.text(), '<ResizableAndMovable />');
  });

  it('Should 1st element have expected element without children', () => {
    const balloon = shallow(<Balloon />);
    const child =  balloon.children().at(0).children();
    assert.equal(child.type(), 'div');
    assert.equal(child.props().children, undefined);
  });

  it('Should 1st element have expected element with children', () => {
    const balloon = shallow(<Balloon>Test Text</Balloon>);
    const child =  balloon.children().at(0).children();
    assert.equal(child.type(), 'div');
    assert(child.children().contains('Test Text'));
  });

  it('Should chilrdren wrapper  have expected styles', () => {
    const balloon = shallow(<Balloon>Test Text</Balloon>);
    const child =  balloon.children().at(0).children();
    const expectedStyles = {
      padding: '1px',
      width: '100%',
      height: '100%',
    };
    assert.deepEqual(child.prop('style'), expectedStyles);
  });

  it('Should 2nd element have expected type', () => {
    const balloon = shallow(<Balloon />);
    const second =  balloon.children().at(1);
    assert.equal(second.text(), '<ResizableAndMovable />');
  });

  it('Should 2nd element have expected props', () => {
    const balloon = shallow(<Balloon />);
    const second =  balloon.children().at(1);
    assert.deepEqual(second.props().start, {x: -15, y: -15});
    assert.deepEqual(second.props().isResizable, { x: false, y: false, xy: false });
    assert.equal(second.props().bounds, 'parent');
    assert.equal(second.props().zIndex, 100);
    assert.equal(typeof second.props().onDrag, 'function');
  });

  it('Should 2nd element have marker component', () => {
    const balloon = shallow(<Balloon />);
    const child =  balloon.children().at(1).children();
    assert.equal(child.type(), 'div');
    assert.deepEqual(child.prop('style'), { width: '30px', height: '30px' });
  });

  it('Should 3rd element have expected type', () => {
    const balloon = shallow(<Balloon />);
    const third =  balloon.children().at(2);
    assert.equal(third.type(), 'svg');
  });

  it('Should 3rd element have one path element', () => {
    const balloon = shallow(<Balloon />);
    const third =  balloon.children().at(2);
    assert.equal(third.find('path').length, 1);
  });

  it('Should path on svg have expected props', () => {
    const balloon = shallow(<Balloon />);
    const path =  balloon.children().at(2).children();
    assert.equal(path.prop('strokeWidth'), 1);
    assert.equal(path.prop('stroke'), '#f5f5f5');
    assert.equal(path.prop('fill'), '#f5f5f5');
    assert.equal(path.prop('d').replace(/\s+/g, ''), 'M025Q05000Q050075');
  });

  it('should pass className properly to root ', () => {
    const balloon = shallow(<Balloon className="foo" style={{ color: 'black' }} />);
    assert.equal(balloon.prop('className'), 'foo');
  });

  it('should pass zIndex properly to root', () => {
    const balloon = shallow(<Balloon zIndex={ 999 } />);
    assert.deepEqual(balloon.prop('style'), { width: '100%', height: '100%', zIndex: 999 });
  });

  it('should pass props properly to first resizable box', () => {
    const balloon = shallow(
      <Balloon
         style={{ color: 'black' }}
         start={{ box: { x:100, y: 120, width: 140, height: 160 }, destination: { x:0, y: 0 } }}
         zIndex={ 999 }
         backgroundColor={'#000000'}
         maxHeight={ 200 }
         maxWidth={ 220 }
         minHeight={ 240 }
         minWidth={ 260 }
      />
    );
    const first =  balloon.children().at(0);
    assert.equal(first.prop('zIndex'), 999);
    assert.equal(first.prop('maxHeight'), 200);
    assert.equal(first.prop('maxWidth'), 220);
    assert.equal(first.prop('minHeight'), 240);
    assert.equal(first.prop('minWidth'), 260);
    assert.deepEqual(first.prop('customStyle'), { color: 'black', backgroundColor: '#000000' });
    assert.deepEqual(first.prop('start'), { x: 100, y: 120, width: 140, height: 160 });
  });


  it('should pass props properly to second resizable box', () => {
    const balloon = shallow(
      <Balloon
         start={{ box: { x: 100, y: 120, width: 140, height: 160 }, destination: { x:100, y: 300 } }}
         zIndex={ 999 }
         marker={<span>foo</span>}
      />
    );
    const second =  balloon.children().at(1);
    assert.equal(second.prop('zIndex'), 999);
    assert.deepEqual(second.prop('start'), { x: 85, y: 285 });
    const marker = second.children();
    assert.equal(marker.type(), 'span');
    assert(marker.contains('foo'));
  });

  it('should pass props properly to svg', () => {
    const balloon = shallow(
      <Balloon
         backgroundColor={'#000000'}
         zIndex={999}
      />
    );
    const svg =  balloon.children().at(2);
    assert.equal(svg.prop('style').zIndex, 999);
    const path =  svg.children();
    assert.equal(path.prop('stroke'), '#000000');
    assert.equal(path.prop('fill'), '#000000');
  });

  it('should onPointerDragxxx called, when maker dragged', () => {
    const spy = sinon.spy(Balloon.prototype, 'onPointerDrag');
    const onPointerDragStart = sinon.spy();
    const onPointerDragStop = sinon.spy();
    const onPointerDrag = sinon.spy();
    const balloon = mount(
      <Balloon
         start={{ box: { x: 100, y: 120, width: 140, height: 160 }, destination: { x:100, y: 300 } }}
         onPointerDrag={onPointerDrag}
         onPointerDragStop={onPointerDragStop}
         onPointerDragStart={onPointerDragStart}
      />);
    const marker = balloon.children().at(1).children();
    marker.find('div').at(0).simulate('mousedown');
    // TODO: Not simulated properly
    mouseMove(marker.find('div').get(0), 100, 100);
    marker.find('div').at(0).simulate('mouseup');
    assert(Balloon.prototype.onPointerDrag.calledOnce);
    assert(onPointerDragStart.calledOnce);
    assert(onPointerDragStop.calledOnce);
    assert.deepEqual(onPointerDrag.getCall(0).args[0], {left: 85, top: 285});
    // FIXME: dragStop return NaN
    //assert.deepEqual(onPointerDragStop.getCall(0).args[0], {left: 85, top: 285});
  });
});


