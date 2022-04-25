let backendHost;

const hostname = window && window.location && window.location.hostname;

// if (hostname == "localhost") {
//     // backendHost = "http://localhost:8080";
// // } else {
    backendHost = "http://prod-todo-backend2.ap-northeast-2.elasticbeanstalk.com";
    console.log("backend connection: " + backendHost);
// }

export const API_BASE_URL = `${backendHost}`;