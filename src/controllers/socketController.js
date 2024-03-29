const socketEndPoints = {};

socketEndPoints.connectRoom = (socket) => {
  socket.on("connect room", (data) => {
    socket.join(data.room);
    socket.emit('connect room response', { connected: true })
  });
};

socketEndPoints.getOthersData = (socket) => {
  socket.on("getOthersDataFe 1", (data) => {
    socket.to(data.room).emit('getOthersDataBe 2', { requester: data.socketId, requesterName: data.name });
  });
};

socketEndPoints.reciveOthersData = (socket) => {
  socket.on("getOthersDataFe 3", (data) => {
    socket.to(data.requester).emit('getOthersDataBe 4', { card: data.card, sender: socket.id, name: data.name });
  });
};

socketEndPoints.point = (socket) => {
  socket.on('point', (data) => {
    const { card, sender, senderName } = data;
    socket.to(data.room).emit('point response', { card, sender, senderName });
  });
};

socketEndPoints.handleHand = (socket) => {
  socket.on('handle hand', (data) => {
    socket.to(data.room).emit('handle hand response', { show: data.show });
  });
};

socketEndPoints.disconnect = (socket, io) => {
  socket.on('disconnecting', () => {
    const array = Array.from(io.sockets.adapter.sids)
    const disconnectSocketData = array.find((socketData) => socketData[0] === socket.id) 
    const room = Array.from(disconnectSocketData[1])[1]
    socket.to(room).emit('player disconnected', { player: socket.id })
  });
};

export default socketEndPoints;
