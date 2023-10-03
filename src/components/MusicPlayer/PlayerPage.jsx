import { Box } from "@mui/material";
import React, { useEffect } from "react";
import MusicImage from "./MusicImage";
import MusicContainer from "./MusicContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { songSelector } from "../../redux/songs/songSlice";

const PlayerPage = () => {
    // const loaction = useLocation();
    const navigate = useNavigate();
    const songs = useSelector(songSelector);
    // const data = loaction?.state?.data || null;
    // if (!songs.length) {
    //     navigate("/");
    // }

    useEffect(() => {
        if (!localStorage.getItem("songs")) {
            // console.log("Songs not found");
            navigate("/");
        }
    }, []);

    // console.log(songs);

    return (
        <>
            {songs.length > 0 ? (
                <Box className="container-layout mt-[100px] text-white min-h-[60vh] ">
                    <Box className="block md:flex flex-wrap justify-center ">
                        <Box className="flex md:block md:w-3/12 items-center ">
                            <MusicImage />
                        </Box>
                        <Box className="md:w-9/12 mt-[8px] ">
                            <MusicContainer />
                        </Box>
                    </Box>
                </Box>
            ) : (
                "Loading..."
            )}
        </>
    );
};

export default PlayerPage;
