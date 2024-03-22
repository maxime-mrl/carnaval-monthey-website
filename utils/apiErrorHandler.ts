export default function handleError(err:any) {
    console.log("erreriu")
    if (err.errors && err.errors[0].message) {
        // field missing
        if (err.errors[0].message === "Required" && err.errors[0].path[0]) return new Response(`Le champs "${err.errors[0].path[0]}" est requis!`, { status: 400 });
        // zod error
        return new Response(err.errors[0].message, { status: 400 });
    };
    // unknown
    return new Response(err.toString(), { status: 500 });
}