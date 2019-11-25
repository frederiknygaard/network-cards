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

export const getCookie = cookieName => {
    const cookies = getAllCookies();
    return cookies[cookieName];
}

export const setCookie = cookie => {
    const expiration = new Date(new Date().getTime() + (cookie.expiration * 3600000)).toGMTString();
    document.cookie = `${cookie.name} = ${cookie.value};expires=${expiration}`;
}