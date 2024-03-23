// Handle api error thrown by parsing it as best as possible
export default function handleError(err:any) {
    if (err.errors && err.errors[0].message) { // zod parsing error
        // field missing
        if (err.errors[0].message === "Required" && err.errors[0].path[0]) return new Response(`Le champs "${err.errors[0].path[0]}" est requis!`, { status: 400 });
        // zod error
        return new Response(err.errors[0].message, { status: 400 });
    }
    else if (err.code === 11000 && err.keyValue) { // mongodb duplicate keys
        const concerned = Object.keys(err.keyValue)[0]
        return new Response(`Votre ${concerned} ${err.keyValue[concerned]} existe déjà!`, { status: 409 });
    }
    // unknown
    return new Response(err.toString(), { status: 500 });
}