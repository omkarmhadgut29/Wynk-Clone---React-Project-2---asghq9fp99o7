import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userAuth = createAsyncThunk(
    "userAuth",
    async (userDetails, operation) => {
        const projectId = import.meta.env.VITE_PROJECT_ID;
        // console.log(userDetails);
        const data1 = {
            email: "wynk1@email.com",
            password: "wynk1",
            appType: "music",
        };
        let url = "";

        if (operation === "signup") {
            url = `https://academics.newtonschool.co/api/v1/user/signup`;
        }
        if (operation === "login") {
            url = `https://academics.newtonschool.co/api/v1/user/login`;
        }

        // const response = await axios({
        //     url: url,
        //     method: "post",
        //     headers: {
        //         projectId: projectId,
        //         "Content-Type": "application/json",
        //     },
        //     data: {
        //         ...data1,
        //     },
        // });

        // return (await response).data;

        // const requestData = {
        //     email: 'user_email',
        //     password: 'user_password',
        //     appType: 'music',
        // };

        axios
            .post(url, userDetails, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                // Handle the response here
                return response.data;
            })
            .catch((error) => {
                // Handle errors here
                return error;
            });
    }
);

// export const signIn = createAsyncThunk("signIn", async (user) => {
//     const projectId = import.meta.env.VITE_PROJECT_ID;

//     const response = axios({
//         url: `https://academics.newtonschool.co/api/v1/user/login`,
//         method: "get",
//         headers: {
//             projectId: projectId,
//             "Content-Type": "application/json",
//         },
//         data: {
//             ...user,
//         },
//     });
//     return (await response).data;
// });
