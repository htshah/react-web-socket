# react-web-socket

<!-- [![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) -->

[![License][license-badge]][license-badge]
[![Size][size-badge]][size-badge]
[![Language][language-badge]][language-badge]
[![Downloads][downloads-badge]][downloads-badge]

A very simple and easy-to-use library that allows you to use Websocket as a _React Component_ in your project.

## Installing

Yet to publish on npm

## Usage

```js
import React, { useState } from 'react';
import WebSocket from 'react-web-socket';

const Demo = () => {
  return (
    <div>
      <h1>react-web-socket Demo</h1>

      <WebSocket
        sendMessage={`Hello world from declarative api ${counter} times`}
        url='wss://echo.websocket.org'
        onMessage={(data) => {
          console.log(data);
        }}
        timeout={3000}
      />

      <button type='button' onClick={() => setcounter(counter + 1)}>
        {`Clicked ${counter} times`}
      </button>
    </div>
  );
};

export default Demo;
```

## Options

### url: String (_required_)

The url to which the websocket will connect.

### sendMessage: string

`Default: null` The message that is to be sent to the server.

### onMessage: function (_required_)

`onMessage` callback is called when new message is received.

### onOpen: function

`onOpen` callback is called when the connection is established

### onError: function

`onError` callback is called when there is an error occured in connection.

### onClose: function

`onClose` callback is called when connection is closed.

### shouldReConnect: boolean

`Default: true` Set to **true** to auto reconnect if the connection is closed.

### attempts: number

`Default: 5` Maximum number of retry to connect to server.

### debug: boolean

`Default: false` Set to **true** to see console logging

### timeout: milliseconds

`Default: 3000` Time to wait before closing and reconnecting.

### socketInstance: function

`socketInstance` is a callback function (with single argument `socket`) called after socket instance is created.

[license-badge]: https://img.shields.io/github/license/htshah/react-web-socket.svg
[size-badge]: https://img.shields.io/github/languages/code-size/htshah/react-web-socket.svg
[language-badge]: https://img.shields.io/github/languages/top/htshah/react-web-socket.svg
[downloads-badge]: https://img.shields.io/github/downloads/htshah/react-web-socket/total.svg
[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
