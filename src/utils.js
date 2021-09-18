// utils.js file includes all requests to the server
// login API -> make request to the server, need to be used in App.js
// login api need to be visited, so we need to expose it. -> use 'export'
//credential : username and password
//
/////36.27
export const login = (credential) => {
    //config req obj
    //const {username, password} = credential; //destructuring is also okay
    const loginUrl = `/login?username=${credential.username}&password=${credential.password}`;//`${}` string template

    //send request, return the response from back end, so we need to add return
    //fetch(url, init is config配置信息:登录方法，header，body）
    //fetch返回一个promise
    return fetch(loginUrl, {//fetch（）运行到这一步，就已经向后端发送了请求
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",//credentials is to control what browser do, //same-origin，cookie处理 前端后端发送要带一个cookie的话需要使用include
        }).then((response) => {//.then () is the response from backend
            //为什么.then(回调函数)
              //1. .then()是为了接收fetch后 从后端返回来的response，但是如果你写一个.then(response), 这样写完全没有用，连response都没办法读！
              // 因此fetch让你传一个回调函数，在回调函数里加入你想要的操作，这样相当于为你提供了一个接口，让你使用刚刚返回来的reponse进行你自己的操作！
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to log in");
        }
    });
};

//所有API的差别就是url不一样
//fetch Menu API
export const getMenus = (restId) => {
    return fetch(`/restaurant/${restId}/menu`).then((response) => {
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to get menus");
        }

        return response.json();
    });
};

//fetch restaurant API
export const getRestaurants = () => {
    return fetch("/restaurants").then((response) => {
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to get restaurants");
        }

        return response.json();
    });
};

//fetch cart API
export const getCart = () => {
    return fetch("/cart").then((response) => {
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to get shopping cart data");
        }

        return response.json();
    });
};

//fetch checkout API
export const checkout = () => {
    return fetch("/checkout").then((response) => {
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to checkout");
        }
    });
};

//fetch addItemToCart API
export const addItemToCart = (itemId) => {
    return fetch(`/order/${itemId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }).then((response) => {
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to add menu item to shopping cart");
        }
    });
};



