import Cookies from 'js-cookie';

export const setCookie = (data: any, name: String): void => {
    Cookies.set(name, data, { expires: 1, sameSite: 'strict' })
}

export const getCookie = (name: String): String => {
    const data = Cookies.get(name);
    return data;
}

export const deleteCookie = (name: String): void => {
    Cookies.remove(name);
}