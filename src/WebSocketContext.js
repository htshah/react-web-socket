import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const WebSocketContext = React.createContext(false);

const WebSocketProvider = ({ children }) => {
  return (
    <WebSocketContext.Provider value={{}}>{children}</WebSocketContext.Provider>
  );
};

WebSocketProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  return context;
};

export default WebSocketContext;
export { WebSocketProvider, useWebSocket };
