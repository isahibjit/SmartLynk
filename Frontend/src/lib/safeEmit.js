export const safeEmit = (socket, eventName, data) => {
  if (socket && socket.connected) {
    socket.emit(eventName, data);
  } else {
    console.warn(`Socket not connected for "${eventName}"`);
  }
};
