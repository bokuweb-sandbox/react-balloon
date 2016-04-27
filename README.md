# react-balloon

react balloon conponent.

[![Code Climate](https://codeclimate.com/github/bokuweb/react-balloon/badges/gpa.svg)](https://codeclimate.com/github/bokuweb/react-balloon)

## screenshot

![screenshot](https://github.com/bokuweb/react-balloon/blob/master/screenshot.gif?raw=true)

## DEMO

http://bokuweb.github.io/react-balloon/

## Installation

```sh
npm i react-balloon
```

## Overview

``` javascript
      <Balloon
         box={{ x: 100, y: 100, width: 300, height: 105 }},
         pointer={{ x: 400 , y: 400 }},
         style={{ borderRadius: '5px' }}
         backgroundColor="#ECF0F1"
      >
        Hello, World!!
      </Balloon>
```

## Properties

#### box: {x: number, y:number, width:number, height:number}

Specifies the `x` ,`y`, `width` and `height` that the component should start at.

#### pointer: {x: number, y:number}}

`pointer` sepecifies balloon poinetr position.

#### minWidth {number}

Specifies the minimum width of the Box.
This is generally not necessary to use.

#### minHeight {number}

Specifies the minimum height of the Box.
This is generally not necessary to use.

#### maxWidth {number}

Specifies the maximum width of the Box.
This is generally not necessary to use.

#### maxHeight {number}

Specifies the maximum height of the component.
This is generally not necessary to use.

#### customClass {string}

The css class set on the component.
This is generally not necessary to use.

#### style {object}

The css style set on the component.
This is generally not necessary to use.

#### onBoxResizeStart {func}

Callback called on resize start.   

#### onBoxResize {func}

Callback called on resizing.   
Receives the box size `{width: number, height: number}` as argument.

#### onBoxResizeStop {func}

Callback called on resize stop.
Receives the box size `{width: number, height: number}` as argument.

#### onBoxDrageStart {func}

Callback called on box dragging start.   

#### onBoxDrag {func}

Callback called on box resizing.   
`onBoxDrag` called with the following parameters:

``` javascript
{ left: number, top: number }
```

#### onBoxDragStop {func}

Callback called on box dragging stop.
`onBoxDragStop` called with the following parameters:

``` javascript
{ left: number, top: number }
```

#### onPointerDrageStart {func}

Callback called on pointer dragging start.   

#### onPointerDrag {func}

Callback called on pointer resizing.   
`onPointerDrag` called with the following parameters:

``` javascript
{ left: number, top: number }
```

#### onPointerDragStop {func}

Callback called on pointer dragging stop.
`onPointerDragStop` called with the following parameters:

``` javascript
{ left: number, top: number }
```


## Test

``` sh
npm t
```

## License

The MIT License (MIT)

Copyright (c) 2016 Bokuweb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
