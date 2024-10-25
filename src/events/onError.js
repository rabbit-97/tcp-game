export const onError = (socket) => (err) => {
  console.error('소켓 오류:', err);
  handleError(socket, new CustomError(500, `소켓 오류: ${err.message}`));
  removeUser(socket);
};
