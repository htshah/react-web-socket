import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const getSocketObj = (url) => {
  // Use MozWebSocket if browser is Firefox
  const Socket =
    'MozWebSocket' in window ? window.MozWebSocket : window.WebSocket;

  // Create a new Socket object
  return new Socket(url);
};

// TODO ping pong to test connection
const WebSocket = ({
  shouldReConnect,
  onOpen,
  onMessage,
  onError,
  onClose,
  attempts,
  url,
  debug,
  timeout,
  socketInstance,
  sendMessage
}) => {
  const [maxAttempts] = useState(attempts);
  const [attemptState, setAttempt] = useState(0);

  const attempt = useRef();
  attempt.current = attemptState;

  // Set websocket state
  // eslint-disable-next-line no-use-before-define
  const [socket, setSocket] = useState(null);
  const [buffer, setBuffer] = useState([]);

  const socketRef = useRef();
  socketRef.current = socket;

  const bufferRef = useRef();
  bufferRef.current = buffer;

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    setSocket(createSocket());
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    sendMsg(sendMessage);
  }, [sendMessage]);

  function sendMsg(str = null) {
    const ws = socketRef.current;

    const buff = bufferRef.current;

    const shouldBuffer = ws === null || !(ws !== null && ws.readyState === 1);

    // If no socket created, then add str to buffer
    if (shouldBuffer && str !== null) {
      setBuffer([...buff, str]);
    } else {
      // Empty buffer first
      buff.forEach((s) => ws.send(s));
      setBuffer([]);

      if (str !== null) ws.send(str);
    }
  }

  function debugPrint(txt) {
    if (debug === true) {
      // eslint-disable-next-line no-console
      console.log(`WebSocket: ${txt}`);
    }
  }

  function createSocket() {
    // Don't limit if maxAttempts = 0
    if (maxAttempts !== 0 && attempt.current > maxAttempts) {
      debugPrint('Max Limit reached');
      return null;
    }

    debugPrint(`Attempt No: ${attempt.current}`);
    attempt.current += 1;
    setAttempt(attempt.current);

    const ws = getSocketObj(url);

    ws.onopen = () => {
      debugPrint('Connection Opened');

      // Send all buffered messages
      sendMsg();
      onOpen();
    };

    ws.onmessage = (event) => {
      debugPrint(`Received message : ${event.data}`);
      onMessage(event.data, event);
    };

    ws.onclose = (event) => {
      debugPrint('Closing');
      console.log(event);

      // Call user defined function
      onClose();

      // Reconnect if applicable
      if (shouldReConnect === true) {
        if (attempt.current > attempts) {
          debugPrint('[No attempts left]- Could not connect.');
        } else {
          // TODO reconnect in a certain timeout
          debugPrint('Reconnecting....');
          setSocket(createSocket());
        }
      }
    };

    ws.onerror = (event) => {
      debugPrint('Error');
      onError(event);
    };

    setTimeout(() => {
      if (ws !== null && (ws.readyState === 0 || ws.readyState === 3)) {
        debugPrint("Couldn't connect to target. Closing connection...");
        ws.close();
      }
    }, timeout);

    socketInstance(ws);
    return ws;
  }

  return <div />;
};

WebSocket.defaultProps = {
  shouldReConnect: true,
  attempts: 0,
  onOpen: () => {},
  onError: () => {},
  onClose: () => {},
  debug: false,
  timeout: 3000,
  socketInstance: () => {},
  sendMessage: ''
};

WebSocket.propTypes = {
  shouldReConnect: PropTypes.bool,
  url: PropTypes.string.isRequired,
  attempts: PropTypes.number,
  onOpen: PropTypes.func,
  onMessage: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  onError: PropTypes.func,
  debug: PropTypes.bool,
  timeout: PropTypes.number,
  socketInstance: PropTypes.func,
  sendMessage: PropTypes.string
};

export default WebSocket;
