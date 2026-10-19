class Response {
  constructor(success, message, info = null) {
    this.success = success;
    this.message = message;
    this.info = info;
  }

  get json() {
    return {
      ok: this.success,
      success: this.success,
      message: this.message,
      info: this.info,
    };
  }
}

module.exports = Response;