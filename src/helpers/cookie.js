import OPTIONS from './options';

const getAllCookies = () => {
    const allcookies = document.cookie;
    
    const cookiearray = allcookies.split('; ');
    const cookieobject = {};

    cookiearray.map(cookie => {
        cookie = cookie.split('=');
        cookieobject[cookie[0]] = cookie[1];
    });

    return cookieobject;
}

const getCookie = cookieName => {
    const cookies = getAllCookies();
    return cookies[cookieName];
}

const setCookie = cookie => {
    let expiration = 0;
    
    if (cookie.expiration) {
        expiration = new Date(new Date().getTime() + (cookie.expiration * 3600000)).toGMTString();
    }

    document.cookie = `${cookie.name} = ${cookie.value};expires=${expiration}`;
}

const deleteCookie = cookie => {
    document.cookie = `${cookie}=;expires=${new Date(0)}`;
}

const login = login => {

    console.log(login)

    setCookie({
        name: OPTIONS.COOKIES.TOKEN,
        value: login.token,
        expiration: login.tokenExpiration
    });
      
    setCookie({
        name: OPTIONS.COOKIES.USERID,
        value: login.userId,
        expiration: login.tokenExpiration
    })
}

const logout = () => {
    deleteCookie(OPTIONS.COOKIES.USERID);
    deleteCookie(OPTIONS.COOKIES.TOKEN);
}

export default {
    getCookie,
    setCookie,
    getAllCookies,
    login,
    logout
}