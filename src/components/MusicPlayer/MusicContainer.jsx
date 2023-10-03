import {
    Add,
    Favorite,
    FavoriteBorder,
    Pause,
    PlayArrow,
} from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useDispatch, useSelector } from "react-redux";
import {
    addSongIndex,
    addSongs,
    currentSongIndexSelector,
    isPlayingSelector,
    pauseSong,
    playSong,
    songSelector,
} from "../../redux/songs/songSlice";
import axios from "axios";
import "./MusicBar.css";
import { useLocation } from "react-router-dom";
import { userSelector } from "../../redux/users/userSlice";
import FavoriteButton from "./FavoriteButton";

const MusicContainer = () => {
    const loaction = useLocation();
    const isAlbum = loaction?.state?.isAlbum || false;
    const isArtist = loaction?.state?.isArtist || false;
    const isLiked = loaction?.state?.isLiked || false;
    const likedArtits = loaction?.state?.likedArtits || false;
    // console.log("isLiked");
    // console.log(isLiked);
    // console.log(likedArtits);
    const artists = loaction?.state?.artists || null;
    const albumData = loaction?.state?.albumData || null;
    // console.log(`isAlbum: ${isAlbum}`);
    // console.log(`artists: `);
    // console.log(artists);

    const dispatch = useDispatch();
    const songs = useSelector(songSelector);
    const isPlaying = useSelector(isPlayingSelector);
    const currentSongIndex = useSelector(currentSongIndexSelector);
    const currSong = songs[currentSongIndex];
    const userData = useSelector(userSelector);
    const user = userData ? userData.data : null;

    // const [likedArtits, setLikedArtits] = useState([]);
    const [songId, setSongId] = useState(null);

    // useEffect(() => {
    //     async function likedSongs() {
    //         if (isLiked && songId) {
    //             const projectId = import.meta.env.VITE_PROJECT_ID;
    //             let name = "";
    //             //   const artistData = axios({
    //             const response = await axios({
    //                 url: `https://academics.newtonschool.co/api/v1/music/artist/${songId}`,
    //                 method: "get",
    //                 headers: {
    //                     projectId: projectId,
    //                 },
    //             });
    //             const artistData = await response.data.data;
    //             setLikedArtits((prev) => [...prev, artistData]);
    //         }
    //     }
    // }, [isLiked]);

    // console.log(currSong);

    const [pagination, setPagination] = useState(19);

    const handleCurrSongClick = () => {
        if (!isPlaying) {
            dispatch(playSong());
        } else {
            dispatch(pauseSong());
        }
    };

    const handleNewSongClick = (song, index) => {
        // dispatch(addSongs(song));
        dispatch(addSongIndex(index));
        dispatch(playSong());
    };

    const handleShowMore = () => {
        // console.log(pagination);
        // console.log(songs.length);
        if (pagination + 1 < songs.length) {
            setPagination((prev) => prev + 20);
            // console.log(pagination + 20);
        }
    };

    return (
        <>
            <Box>
                <Box component="div" className="hidden md:block md:pl-4">
                    <Typography className="text-[36px] font-[800] ">
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
                <Box className="mt-4 flex justify-between md:pl-4 ">
                    <Box className="inline-flex ">
                        <Button
                            className="text-sm bg-[#ed1c24] hover:bg-[#cc0016d9] cursor-pointer rounded-3xl p-2 min-[370px]:px-3 text-white "
                            onClick={() => handleCurrSongClick()}
                        >
                            {isPlaying ? <Pause /> : <PlayArrow />}
                            <Box
                                component="span"
                                className=" relative top-[1px] capitalize "
                            >
                                {isPlaying ? "Pause" : "Play"} Songs
                            </Box>
                        </Button>
                        {/* <Button className="ml-2 xs:ml-4 cursor-pointer rounded-3xl p-2 border-[1px] border-solid min-[370px]:px-3 text-[#b7c0c4] inline-flex hover:bg-[#21252d] hover:text-[#f7f5f5] ">
                            <Box component="span" className="w-6 mr-1 ">
                                <Add />
                            </Box>
                            <Box
                                component="span"
                                className="capitalize text-[15px] "
                            >
                                Follow
                            </Box>
                        </Button> */}

                        {user && !isLiked && (
                            <FavoriteButton
                                key={currSong._id}
                                userData={userData}
                                currSong={currSong}
                            />
                        )}
                    </Box>
                    {/* <Box className="inline-flex ">
                        <button className=" border-[#e8e8e8] border-solid  rounded-full border-[1px] bg-[#0c0f12] hover:bg-[#21252d] text-[#f7f5f5] h-10 w-10 undefined ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="inline-block h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                ></path>
                            </svg>
                        </button>
                        <Box className=" ml-3 xs:ml-5 ">
                            <button className="h-10 w-[40px] rounded-full border-[1px] border-[#e8e8e8] bg-transparent border-solid text-white hover:bg-[#21252d] ">
                                <Box className="flex items-center justify-center h-[40px] w-[40px]  ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        className="w-5 h-5 inline-block"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                        ></path>
                                    </svg>
                                </Box>
                            </button>
                        </Box>
                    </Box> */}
                </Box>
                <Box className="mt-6 ">
                    <Grid container>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Box className="flex justify-start w-3/4 md:w-[44%] lg:w-[40%] md:pl-4 ">
                                <Box className="md:table-cell hidden pr-2 text-xs text-white opacity-40 tracking-widest font-normal leading-4 pb-5 ">
                                    #
                                </Box>
                                <Box className="md:table-cell hidden text-xs ml-2 text-white opacity-40 tracking-widest font-normal leading-4 pb-5 ">
                                    TRACK
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Box className="md:table-cell hidden text-xs pl-2.5 text-white opacity-40 tracking-widest font-normal leading-4 w-[30%] md:w-[24%] lg:w-[20%] pb-5 ">
                                {isLiked ? "Created At" : "ARTISTS"}
                            </Box>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Box className="md:table-cell md:pl-0.5 hidden text-xs text-white opacity-40 tracking-widest font-normal leading-4 w-[15%] md:w-[18%] lg:w-[12%] pb-5 ">
                                Date of Release
                            </Box>
                        </Grid>
                    </Grid>

                    <Box
                        className=" py-2 md:pr-3 rounded-lg border-transparent border cursor-pointer hover:shadow-dark hover:border-[#3d464d] "
                        onClick={() => handleCurrSongClick()}
                    >
                        <Box className="flex justify-start md:pl-4 ">
                            <Grid container className="group ">
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <Box className="flex justify-start ">
                                        <Box className="md:table-cell hidden md:text-title text-[0.625rem] font-normal mr-2 self-center ">
                                            {currentSongIndex + 1}
                                        </Box>
                                        <Box className=" md:ml-2.5">
                                            <Box className="h-[50px] w-[50px]  relative  ">
                                                <img
                                                    src={currSong.thumbnail}
                                                    alt="Song thumbnail"
                                                    className={`rounded-lg blur-sm transition-all duration-300 `}
                                                />
                                                <div
                                                    className={`absolute bg-[#00000039] rounded-lg inset-0 flex items-center justify-center ${
                                                        isPlaying
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    } transition-opacity duration-300 `}
                                                >
                                                    <div className="icon ">
                                                        <span className="icon1 " />
                                                        <span className="icon1 " />
                                                        <span className="icon1 " />
                                                        <span className="icon1 " />
                                                    </div>
                                                </div>
                                                <div
                                                    className={`absolute bg-[#00000039] rounded-lg inset-0 flex items-center justify-center ${
                                                        isPlaying
                                                            ? "opacity-0"
                                                            : "opacity-100"
                                                    } transition-opacity duration-300 `}
                                                >
                                                    <PlayArrow className="text-white text-2xl" />
                                                </div>
                                            </Box>
                                        </Box>
                                        <Box className="truncate md:pr-[40px] ml-4 my-auto text-sm text-title ">
                                            {currSong.title}
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <Box className="md:flex hidden text-xs pl-0.5 text-white opacity-70 tracking-widest font-normal items-center text-center h-full leading-4 truncate w-[90%] ">
                                        {isAlbum
                                            ? currSong.artist.map(
                                                  (artistId) => {
                                                      const artist =
                                                          artists.find(
                                                              (a) =>
                                                                  a._id ===
                                                                  artistId
                                                          );
                                                      return artist
                                                          ? artist.name + " | "
                                                          : "";
                                                  }
                                              )
                                            : isLiked
                                            ? currSong.createdAt
                                                ? currSong.createdAt?.substring(
                                                      0,
                                                      10
                                                  )
                                                : "----"
                                            : currSong.artist.map(
                                                  (artistData) =>
                                                      `${artistData.name} | `
                                              )}
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <Box className="md:flex md:pl-0.5 hidden text-xs text-white opacity-70 items-center tracking-widest font-normal leading-4 h-full">
                                        {currSong.dateOfRelease
                                            ? currSong.dateOfRelease?.substring(
                                                  0,
                                                  10
                                              )
                                            : "----"}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    {songs?.map(
                        (song, index) =>
                            currentSongIndex != index && (
                                <Box
                                    className={` py-2 md:pr-3 rounded-lg border-transparent border hover:shadow-dark hover:border-[#3d464d] ${
                                        index > pagination && "hidden"
                                    } `}
                                    key={index}
                                    component={"div"}
                                    onClick={() =>
                                        handleNewSongClick(song, index)
                                    }
                                >
                                    <Box className="flex justify-start md:pl-4 group  ">
                                        <Grid
                                            container
                                            className="cursor-pointer "
                                        >
                                            <Grid
                                                item
                                                xs={4}
                                                sm={4}
                                                md={4}
                                                lg={4}
                                            >
                                                <Box className="flex justify-start ">
                                                    <Box className="md:table-cell hidden md:text-title text-[0.625rem] font-normal mr-2 self-center ">
                                                        {index + 1}
                                                    </Box>
                                                    <Box className=" md:ml-2.5">
                                                        <Box className="h-[50px] w-[50px]  relative  ">
                                                            <img
                                                                src={
                                                                    song?.thumbnail
                                                                }
                                                                alt="Song thumbnail"
                                                                className={`rounded-lg group-hover:blur-sm transition-all duration-300 `}
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00000039]">
                                                                <PlayArrow className="text-white text-2xl" />
                                                            </div>
                                                        </Box>
                                                    </Box>
                                                    <Box className="truncate md:pr-[40px] ml-4 my-auto text-sm text-title ">
                                                        {song?.title}
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={4}
                                                sm={4}
                                                md={4}
                                                lg={4}
                                            >
                                                <Box className="md:flex hidden text-xs pl-0.5 text-white opacity-70 tracking-widest font-normal items-center text-center h-full leading-4 truncate mr-[40px] ">
                                                    {isAlbum
                                                        ? song.artist.map(
                                                              (artistId) => {
                                                                  const artist =
                                                                      artists.find(
                                                                          (a) =>
                                                                              a._id ===
                                                                              artistId
                                                                      );
                                                                  return artist
                                                                      ? artist.name +
                                                                            " | "
                                                                      : "";
                                                              }
                                                          )
                                                        : isLiked
                                                        ? song.createdAt
                                                            ? song.createdAt?.substring(
                                                                  0,
                                                                  10
                                                              )
                                                            : "----"
                                                        : song?.artist &&
                                                          song?.artist.map(
                                                              (artistData) =>
                                                                  `${artistData.name} | `
                                                          )}
                                                </Box>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={4}
                                                sm={4}
                                                md={4}
                                                lg={4}
                                            >
                                                <Box className="md:flex md:pl-0.5 hidden text-xs text-white opacity-70 items-center justify-start tracking-widest font-normal leading-4 h-full">
                                                    <Box className="flex justify-center items-center min-w-[73px] text-center ">
                                                        {song.dateOfRelease
                                                            ? song.dateOfRelease?.substring(
                                                                  0,
                                                                  10
                                                              )
                                                            : "----"}
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            )
                    )}
                    <Box
                        className={`w-[80%] text-center my-6 ${
                            pagination + 1 >= songs.length && "hidden"
                        } `}
                    >
                        <button
                            className={`min-[370px]:px-3 cursor-pointer rounded-3xl border-[1px] p-2 bg-[#0c0f12] hover:bg-[#21252d] text-[#b7c0c4] hover:text-[#f5f7f7] pr-2 pl-3 text-sm font-medium `}
                            onClick={() => handleShowMore()}
                        >
                            Show More
                        </button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default MusicContainer;
