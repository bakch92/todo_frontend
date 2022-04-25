import {API_BASE_URL} from './app-config'
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type" : "application/json"
    })

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken != null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method
    };

    if (request) {
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                if (!response.ok) {
                    if (json.error === "Login failed") {
                        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
                        return;
                    }
                    return Promise.reject(json);
                }
                return json;
            })
        )

        .catch(error => {
            console.log("error : " + error.status);
            alert("페이지 이동합니다.");
            window.location.href = "/login";
            return Promise.reject(error);
        })

}

export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO).then((response) => {
        if (response.token) {
            localStorage.setItem(ACCESS_TOKEN, response.token);
            window.location.href = "/";
        }
    })
}

export function signout() {
    localStorage.setItem(ACCESS_TOKEN, null);
    alert("로그아웃 되었습니다.")
    window.location.href = "/login";
}

export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO);   
}