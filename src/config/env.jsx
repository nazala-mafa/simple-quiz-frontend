export const server_url = "http://localhost:8080/";

export const auth_header = { headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` } }