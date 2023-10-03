import { Box, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    currentSongIndexSelector,
    isLikedSongsSelector,
    songSelector,
} from "../../redux/songs/songSlice";
import { useLocation } from "react-router-dom";

const MusicImage = () => {
    const songs = useSelector(songSelector);
    const currentSongIndex = useSelector(currentSongIndexSelector);
    const currSong = songs[currentSongIndex];

    const loaction = useLocation();
    const isAlbum = loaction?.state?.isAlbum || false;
    const isArtist = loaction?.state?.isArtist || false;
    const artists = loaction?.state?.artists || null;
    const albumData = loaction?.state?.albumData || null;
    const isLiked = loaction?.state?.isLiked || false;
    const isLikedSongs = useSelector(isLikedSongsSelector);
    // console.log(currSong);
    return (
        <>
            <Box
                className="lg:w-3/4 sm:w-4/5 w-1/3 sm:mr-2 mr-4 max-w-[14rem] md:max-w-[16rem] mt-[20px] max-md:mb-[20px] "
                component="div"
            >
                <Box component="span" className="relative block ">
                    <Box
                        component="span"
                        className="box-border md:block overflow-hidden bg-none opacity-[1] border-0 m-0 p-0 relative flex "
                    >
                        <Box
                            component="div"
                            className="box-border block overflow-hidden bg-none opacity-[1] border-0 m-0 relative w-full pt-[100%] "
                        >
                            <img
                                src={
                                    isArtist
                                        ? artists.image
                                        : isAlbum
                                        ? albumData.image
                                        : isLikedSongs
                                        ? "assets/images/like.png"
                                        : currSong.thumbnail
                                }
                                alt="img"
                                className="rounded-lg z-[1] absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-[100%] max-w-[100%] min-h-[100%] max-h-[100%] "
                            />
                        </Box>
                        {/* <Box className="md:hidden ">
                            <h1 className="heading1">{currSong.title} </h1>
                            <Box className="text-xs text-[#818c94] leading-6">
                                50 Songs
                            </Box>
                        </Box> */}
                    </Box>
                </Box>
            </Box>
            <Box component="div" className="md:hidden block pl-4 ">
                <Typography className="text-[34px] font-[800]  ">
                    {isArtist
                        ? artists.name
                        : isAlbum
                        ? albumData.title
                        : isLiked
                        ? "Liked Songs"
                        : currSong.title}
                    {/* {currSong.title} */}
                </Typography>
                <Typography className="text-xs text-[#818c94] leading-6 ">
                    {songs.length} songs
                </Typography>
            </Box>
        </>
    );
};

// MusicImage.propTypes = {
//     data: PropTypes.arrayOf(Object),
// };

export default MusicImage;
