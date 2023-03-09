class httpError extends Error { 
  constructor(message, status) {
    super(message); 
    this.status = status;
    this.message = message;
  }
}
module.exports = httpError;