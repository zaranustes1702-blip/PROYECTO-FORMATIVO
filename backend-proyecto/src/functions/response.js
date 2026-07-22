class Response {
    constructor(success, message, data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    get json() {
        return {
            success: this.success,
            message: this.message,
            data: this.data
        };
    }
}

module.exports = Response;