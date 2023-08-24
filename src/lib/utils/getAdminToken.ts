export default function getAdminToken() {
    const token = localStorage.getItem("token");
    return token;
}
