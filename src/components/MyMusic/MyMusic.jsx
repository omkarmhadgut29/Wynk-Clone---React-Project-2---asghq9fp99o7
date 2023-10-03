import { PlayArrow } from "@mui/icons-material";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/users/userSlice";
import EmptyLikedSongs from "./EmptyLikedSongs";
import {
    addSongIndex,
    addSongs,
    playSong,
    setLikedSongs,
} from "../../redux/songs/songSlice";
import { useNavigate } from "react-router-dom";

const MyMusic = () => {
    const userData = useSelector(userSelector);
    const [isEmptySongs, setIsEmptySongs] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [likedArtits, setLikedArtits] = useState([]);
    const [changeNavigate, setChangeNavigate] = useState(false);

    const getArtists = async (id) => {
        const projectId = import.meta.env.VITE_PROJECT_ID;
        let name = "";
        const response = await axios({
            url: `https://academics.newtonschool.co/api/v1/music/artist/${songId}`,
            method: "get",
            headers: {
                projectId: projectId,
            },
        });
        const artistData = await response.data.data;
        setLikedArtits((prev) => [...prev, artistData.name]);
    };

    const handleClick = async () => {
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

        if (response?.data?.data?.songs?.length === 0) {
            setIsEmptySongs(true);
        } else if (response?.data?.data?.songs?.length > 0) {
            const songs = response.data.data.songs;
            // console.log(songs);
            // songs.artist.map((id) => {
            //     getArtists(id);
            // });

            dispatch(addSongs(response.data.data.songs));
            dispatch(addSongIndex(0));
            dispatch(setLikedSongs());
            dispatch(playSong());
            // setChangeNavigate(true);
            navigate("/player", {
                state: {
                    isLiked: true,
                },
            });
        }
    };

    useEffect(() => {
        if (changeNavigate) {
            navigate("/player", {
                state: {
                    isLiked: true,
                    likedArtits: likedArtits,
                },
            });
        }
    }, [changeNavigate]);
    return (
        <>
            <Box className="h-full min-h-[450px] ">
                {isEmptySongs ? (
                    <>
                        <EmptyLikedSongs />
                    </>
                ) : (
                    <>
                        <Box className="container-layout ">
                            <Box className="text-title text-4xl my-10 font-medium text-white ">
                                My Music
                            </Box>

                            <Box className="text-left text-2xl mb-8 ">
                                <Box className="sm:mt-8 mt-4 text-white ">
                                    <Box className="font-medium mb-4 text-[#f7f5f5] ">
                                        My Playlists
                                    </Box>

                                    <Box
                                        className="inline-block "
                                        onClick={handleClick}
                                    >
                                        <Box className=" rounded-xl group cursor-pointer ">
                                            <Box className="box-border block overflow-hidden bg-none opacity-100 relative hoverClass group ">
                                                <img
                                                    src="assets/images/like.png"
                                                    alt="like img"
                                                    className="rounded-xl box-border block h-[142px] w-[142px] text-white relative "
                                                />

                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00000099] rounded-[50%] ">
                                                    <PlayArrow className="text-[#ed1c24] bg-white rounded-full p-2 h-[40px] w-[40px]" />
                                                </div>
                                            </Box>
                                            <Box className=" truncate font-normal text-[#f7f5f5] text-base  pt-2 text-center ">
                                                Liked Songs
                                            </Box>
                                            {/* <Box component={"span"} className="block ">
                                                </Box> */}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
};

export default MyMusic;

{
    /* <Box className="flex justify-center ">
                                    <Box className="w-full relative ">
                                        <Box className="flex flex-nowrap  ">
                                            <Box className="first:ml-[-0.75rem] flex-shrink-0 cursor-pointer mb-6 box-border px-3 ">
                                                <Box>
                                                    <Box className="relative w-full rounded-xl ">
                                                        <Box
                                                            component={"span"}
                                                            className="relative block "
                                                        >
                                                            <Box
                                                                component={
                                                                    "span"
                                                                }
                                                                className="box-border block overflow-hidden bg-none opacity-100  "
                                                            >
                                                                <img
                                                                    src="assets/images/like.png"
                                                                    alt="like img"
                                                                    className="rounded-xl box-border m-auto block h-[100%] w-[100%] text-white "
                                                                />
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box> */
}
