export const server_url = "https://simple-quiz-backend.mafadev.com/";

export const auth_header = { headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` } }