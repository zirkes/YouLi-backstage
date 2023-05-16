import { getCookie } from '@/utils/cookie';

// 封装fetch请求
export default async (url, options) => {
        // fetch(url,options)
        let reg = /^[p,P]{1}[o,O]{1}[s,S]{1}[t,T]{1}$/g;
        if (reg.test(options.method)) {
                options.headers = {
                        'Content-Type': 'application/json'
                }
                options.body = JSON.stringify(options.body)
        }
        // 本地是否存储有token,如果有就传递
        const token = getCookie('Token');
        if (token) {
                options.headers.Authorization = token;
        }
        url = '/api/youli' + url;
        options.credentials = 'include';
        return await fetch(url, options).then(result => {
                if (!result.ok) {
                        throw new Error(result.statusText);
                }
                return result.json();
        }).catch(err => {
                return new Error('请求错误！');
        });;
}

/*
fetch请求方式 属性
用法 -- fetch(url,options)  返回的Promise
 
url : 请求的 URL,
option : {
    method : 请求的方法
    headers : 包含请求相关的 Headers 对象
    credentials : 请求的证书
            · omit(默认) : 忽略的意思，也就是不带cookie
            · same-origin : 同源请求带 cookie
            · include : 表示无论跨域还是同源请求都会带 cookie
    mode : 请求的模式
            · cors(默认) : 允许跨域请求，将遵守 CORS 协议
            · no-cors : 允许跨域请求，请求的 method 只能是 HEAD、GET 或 POST
            · same-origin : 跨域请求，将返回一个 error
            · navigate : 支持导航的模式，仅用于 HTML 导航
    cache : 请求的缓存模式
            · default : 浏览器从 HTTP 缓存中寻找匹配的请求
                    · 如果缓存匹配上并且有效（ fresh ）, 它将直接从缓存中返回资源
                    · 如果缓存匹配上但已经过期 ，浏览器将会使用传统（ conditional request ）的请求方式去访问远程服务器 。如果服务器端显示资源没有改动，它将从缓存中返回资源。否则，如果服务器显示资源变动，那么重新从服务器下载资源更新缓存
                    · 如果缓存没有匹配，浏览器将会以普通方式请求，并且更新已经下载的资源缓存
            · no-store : 浏览器从远程服务器获取资源，而不先查看缓存，并且不会使用下载的资源更新缓存
            · reload : 浏览器从远程服务器获取资源，而不先查看缓存，但随后将使用下载的资源更新缓存
            · no-cache : 浏览器从 HTTP 缓存中寻找匹配的请求
                    · 如果匹配，新鲜或陈旧，浏览器将向远程服务器发出有条件的请求。如果服务器指出资源没有改变，它将从缓存中返回。否则资源将从服务器下载并且缓存将被更新
                    · 如果没有匹配，浏览器将发出正常的请求，并用下载的资源更新缓存
            · force-cache : 浏览器从 HTTP 缓存中寻找匹配的请求
                    · 如果有匹配，新鲜或陈旧，它将从缓存中返回
                    · 如果没有匹配，浏览器将发出正常的请求，并用下载的资源更新缓存
            · only-if-cached : 浏览器从 HTTP 缓存中寻找匹配的请求，只能用在 mode 为 same-origin 的情况下
                    · 如果匹配，新鲜或陈旧，将从缓存中返回
                    · 如果没有匹配，浏览器将返回一个错误
    body : 请求的数据。可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息
}
 
fetch方法：
arrayBuffer() : 返回解决一个 ArrayBuffer 表示的请求主体的 promise
blob() : 返回解决一个 Blob 表示的请求主体的 promise
formData() : 返回解决一个 FormData 表示的请求主体的 promise
json() : 返回解决一个 JSON 表示的请求主体的 promise
text() : 返回解决一个 USVString(文本)表示的请求主体的 promise
*/