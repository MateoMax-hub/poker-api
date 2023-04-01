const socketEndPoints = {};

socketEndPoints.connectRoom = (socket) => {
  socket.on("connect room", (data) => {
    socket.join(data.room);
    socket.emit('connect room response', { connected: true })
  });
};

socketEndPoints.getOthersData = (socket) => {
  socket.on("getOthersDataFe 1", (data) => {
    socket.to(data.room).emit('getOthersDataBe 2', { requester: data.socketId });
  });
};

socketEndPoints.reciveOthersData = (socket) => {
  socket.on("getOthersDataFe 3", (data) => {
    socket.to(data.requester).emit('getOthersDataBe 4', { card: data.card, sender: socket.id });
  });
};

socketEndPoints.point = (socket) => {
  socket.on('point', (data) => {
    socket.to(data.room).emit('point response', { card: data.card, sender: data.sender });
  });
};

export default socketEndPoints;
