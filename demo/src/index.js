import React, { useState } from 'react';
import { render } from 'react-dom';

import WebSocket from '../../src';

const local = false;
const Demo = () => {
  const [counter, setcounter] = useState(0);
  return (
    <div>
      <h1>react-web-socket Demo</h1>
      <WebSocket
        url={local ? 'ws://localhost:3005' : 'wss://echo.websocket.org'}
        debug
        onMessage={(data) => {
          console.log(data);
        }}
        timeout={3000}
      />
      <button onClick={() => setcounter(counter + 1)}>
        Clicked {counter} times
      </button>
    </div>
  );
};

render(<Demo />, document.querySelector('#demo'));
