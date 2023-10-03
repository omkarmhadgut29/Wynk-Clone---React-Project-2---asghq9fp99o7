import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FavoriteButton = ({ userData, currSong }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLikedCliked = async () => {
        // console.log("handleLikedCliked");
        const projectId = import.meta.env.VITE_PROJECT_ID;
        let url =
            "https://academics.newtonschool.co/api/v1/music/favorites/like";
        const token = userData.token;
        // console.log("token: " + token);
        // console.log("currSong._id: " + currSong._id);
        const response = await axios({
            url: url,
            method: "patch",
            headers: {
                projectId: projectId,
                Authorization: `Bearer ${token}`,
            },
            data: {
                songId: currSong._id,
            },
        });

        if (response.status === 200) {
            setIsLiked((prev) => !prev);
        }
    };

    useEffect(() => {
        async function getFav() {
            const projectId = import.meta.env.VITE_PROJECT_ID;
            let url =
                "https://academics.newtonschool.co/api/v1/music/favorites/like";
            const token = userData.token;
            const response = await axios({
                url: url,
                method: "get",
                headers: {
                    projectId: projectId,
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response?.data?.data?.songs) {
                response?.data?.data?.songs.map((song) => {
                    // console.log("id: " + song._id);
                    // console.log("currSong._id: " + currSong._id);
                    if (song._id === currSong._id) {
                        setIsLiked(true);
                    }
                });
            }
        }
        getFav();
    }, []);
    return (
        <>
            <Box className="ml-4 ">
                <button
                    className=" border-[#e8e8e8] rounded-full border-[1px] bg-[#0c0f12] hover:bg-[#21252d] hover:text-[#f7f5f5] h-10 w-10 text-sm "
                    onClick={handleLikedCliked}
                >
                    {/* {console.log("isLiked: " + isLiked)} */}
                    {isLiked ? (
                        <Favorite className="text-[24px] text-[#ed1c24] " />
                    ) : (
                        <FavoriteBorder className="text-[24px] text-[#fff] " />
                    )}
                </button>
            </Box>
        </>
    );
};

export default FavoriteButton;
