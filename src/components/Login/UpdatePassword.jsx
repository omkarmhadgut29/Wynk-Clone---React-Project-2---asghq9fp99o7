import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import validator from "validator";

const UpdatePassword = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isError, setIsError] = useState({
        username: "",
        email: "",
        oldPassword: "",
        newPassword: "",
    });

    const emailOnchange = (inputEmail) => {
        // validator.isEmail(inputEmail)
        if (validator.isEmail(inputEmail)) {
            setIsError((prev) => ({
                ...prev,
                email: "",
            }));
        } else {
            setIsError((prev) => ({
                ...prev,
                email: "Enter Valid Email",
            }));
        }
        setEmail(inputEmail);
    };

    const validateStates = () => {
        if (
            isSignUp &&
            username != "" &&
            validator.isEmail(email) &&
            newPassword != ""
        ) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <>
            <Box className="m-6 mb-3 min-[370px]:m-12 min-[370px]:mb-8 ">
                <Box className="text-2xl font-medium mb-2 ">
                    Update Password
                </Box>
                <Typography component={"p"} className="mb-4 text-[#b7c0c4] ">
                    Get a personalised experience, and access all your music
                </Typography>
                <Box>
                    <input
                        type="name"
                        className="p-2 w-full max-[370px]:w-56 rounded-md bg-black border-[1px] border-black focus-visible:outline-none "
                        placeholder="Enter Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Box
                        className={`text-[#f2a222] text-sm mt-1 ${
                            isError.username === "" ? "hidden" : "block"
                        } `}
                    >
                        {isError.username}
                    </Box>
                </Box>

                <Box className="mt-4">
                    <input
                        type="email"
                        className="p-2 w-full max-[370px]:w-56 rounded-md bg-black border-[1px] border-black focus-visible:outline-none "
                        placeholder="Enter Email-ID"
                        value={email}
                        onChange={
                            (e) => emailOnchange(e.target.value)
                            // setEmail(e.target.value)
                        }
                    />
                    <Box
                        className={`text-[#f2a222] text-sm mt-1 ${
                            isError.email === "" ? "hidden" : "block"
                        } `}
                    >
                        {isError.email}
                    </Box>
                </Box>
                <Box>
                    <input
                        type="password"
                        className="p-2 w-full max-[370px]:w-56 rounded-md bg-black border-[1px] border-black focus-visible:outline-none "
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <Box
                        className={`text-[#f2a222] text-sm mt-1 ${
                            isError.oldPassword === "" ? "hidden" : "block"
                        } `}
                    >
                        {isError.oldPassword}
                    </Box>
                </Box>
                <Box className="mt-4">
                    <input
                        type="password"
                        className="p-2 w-full max-[370px]:w-56 rounded-md bg-black border-[1px] border-black focus-visible:outline-none mobile-input_loginInput__ZJULr"
                        placeholder="Enter Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Box
                        className={`text-[#f2a222] text-sm mt-1 ${
                            isError.newPassword === "" ? "hidden" : "block"
                        } `}
                    >
                        {isError.newPassword}
                    </Box>
                </Box>
                <Box className="mt-4 flex">
                    <button
                        type="submit"
                        className={`inline-flex w-28 justify-center py-2 px-4 text-sm leading-5 font-[500]text-white  border-[#ed1c24] border-[1px] rounded-full ${
                            validateStates()
                                ? "bg-[#ed1c24]"
                                : "bg-red-800 cursor-not-allowed"
                        } `}
                        onClick={(e) => handleSubmit(e)}
                        disabled={!validateStates()}
                    >
                        {/* bg-[#ed1c24] */}
                        {isSignUp ? "Sign Up" : "Login"}
                    </button>
                </Box>
                {/* </form> */}
            </Box>
        </>
    );
};

export default UpdatePassword;
