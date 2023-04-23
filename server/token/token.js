import jwt from "jsonwebtoken";

export const secretKey = "strongest ^0^";
export const setToken = function (email, role) {
    return new Promise((resolve, reject) => {
        //expiresln 设置token过期的时间
        const token = jwt.sign({ email, role }, secretKey, {
            expiresIn: "1d",
        });
        resolve(token);
    });
};

export const getToken = function (token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject({
                error: "token空",
            });
        } else {
            //第二种  改版后的
            const info = jwt.verify(token.split(" ")[1], secretKey);
            resolve(info); //解析返回的值（sign 传入的值）
        }
    });
};
