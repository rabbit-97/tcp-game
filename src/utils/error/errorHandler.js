export const handleError = (socket, error) => {
  let responseCode;
  let message;
  console.log(error);

  if (error.code) {
    responseCode = error.code;
    message = error.message;
    console.log(`Error code: ${error.cose}, message: ${error.message}`);
  } else {
    responseCode = Errorcodes.SOCKET_ERROR;
    message = error.message;
    console.error(`일반 에러 : ${error.message}`);
  }

  const errorResponse = createResponse(-1, responseCode, { message });
  socket.write(errorResponse);
};
