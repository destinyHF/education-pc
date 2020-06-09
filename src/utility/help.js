export function isAdmin(){
    try {
        JSON.parse(sessionStorage.getItem("userInfo"));
        return true;
    }catch (e) {
        return false;
    }
}