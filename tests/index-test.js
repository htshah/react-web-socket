import expect from 'expect';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import WebSocket from '../src';

describe('WebSocket', () => {
  let node;

  beforeEach(() => {
    node = document.createElement('div');
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it('should render empty <div />', () => {
    render(
      <WebSocket
        url='wss://echo.websocket.org'
        sendMessage='Hello world'
        onMessage={(data) => {
          console.log(data);
        }}
      />,
      node,
      () => {
        // eslint-disable-next-line no-unused-expressions
        expect(node.innerHTML).toContain('<div></div>');
      }
    );
  });
});
