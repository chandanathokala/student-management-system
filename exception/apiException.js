export class ApiException extends Error {

    constructor(message, status) {

        super(message);

        this.name = "ApiException";

        this.status = status;

    }

}
