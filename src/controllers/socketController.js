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

export default socketEndPoints;
