// API reponse for things that should be use multiple times in different routes so it's easier to edit them if needed

// account related
export const needLoginError = () => new Response("Tu dois être connecté pour faire ceci!", { status: 401 });
export const incorrectPasswordError = () => new Response("Mot de passe incorrect.", { status: 401 });
export const unauthorizedError = () => new Response("Tu n'as pas la permission de faire ceci!", { status: 403 });
// request related
export const invalidDataError = () => new Response("Données invalide, merci de réessayer!", { status: 400 });