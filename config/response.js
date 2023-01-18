const response = ({ isSuccess, code, message }, result) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
    result: result,
  };
};

const errResponse = ({ isSuccess, code, message }, detailMessage) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
    detailMessage: detailMessage,
  };
};

module.exports = { response, errResponse };
