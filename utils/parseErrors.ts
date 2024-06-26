// Handle api error thrown by parsing it as best as possible
export default function parseErrors(err:any): string {
    if (err.errors && err.errors[0].message) { // zod parsing error
        // field missing
        if (err.errors[0].message === "Required" && err.errors[0].path[0]) return `Le champs "${err.errors[0].path[0]}" est requis!`;
        // other errors
        return err.errors[0].message;
    }
    if (err.code === 11000 && err.keyValue) { // mongodb duplicate keys
        const concerned = Object.keys(err.keyValue)[0];
        return `Votre ${concerned} ${err.keyValue[concerned]} existe déjà!`;
    }
    if (typeof err.message === "string") { // error with message
        return err.message;
    }
    // unknown
    return err.toString();
}