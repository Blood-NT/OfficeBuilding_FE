import axios from "axios";
import { ERROR, MESSAGE_ERROR } from "../constants/base";
import { LOGIN, SIGNUP } from "../constants/login";


export const login = (data) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: "http://34.31.97.89:8080",
            url: "login",
            data: data
        });
        console.log("aaaaaaaaaaaaaaa",res.data.message);

        if(res.data.message)
        {
           dispatch({
               type: MESSAGE_ERROR,
               data: res.data.message
           })
        }


        else {
            if(res.status === 200  ){
                localStorage.setItem("role", res.data.roles[0].authority);
               localStorage.setItem("token", res.data.accessToken);
               localStorage.setItem("username", res.data.username);
               localStorage.setItem("idUser", res.data.id);
               localStorage.setItem("DataUser", res.data);
               dispatch({
                   type: LOGIN,
                   data: res.data
               })
           }
           else {
               dispatch({
                   type: ERROR,
                   data: null
               })
           }
        }
    } catch (error) {
        console.log("cahasdasdas",error);
        dispatch({
            type: ERROR,
            data: null
        })
    }
    return null;
}


export const signUp = (data) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: 'http://localhost:8080',
            url: "register",
            data: data
        });

        if(res.status === 200 ){
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("username", res.data.username);
            dispatch({
                type: SIGNUP,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null
        })
    }
    return null;
}
