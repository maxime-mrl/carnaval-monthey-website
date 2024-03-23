// API reponse for things that should be use multiple times in different routes so it's easier to edit them if needed

export const needLoginError = () => new Response("Tu dois être connecté pour faire ceci!", { status: 401 });
export const incorrectPasswordError = () => new Response("Mot de passe incorrect.", { status: 401 });