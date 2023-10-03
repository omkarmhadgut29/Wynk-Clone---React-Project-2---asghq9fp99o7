import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    addSongIndex,
    addSongs,
    deleteSongs,
    playSong,
    updateSongs,
} from "../../redux/songs/songSlice";
import { PlayArrow } from "@mui/icons-material";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
    },
    tablet: {
        breakpoint: { max: 1000, min: 900 },
        items: 5,
    },
    mobile: {
        breakpoint: { max: 700, min: 0 },
        items: 3,
    },
};

const SongRow = ({ title, isAlbum = false }) => {
    const [data, setData] = useState([]);
    const [songIndex, setSongIndex] = useState(0);
    const [changeNavigate, setChangeNavigate] = useState(false);
    let url = "";
    if (title === "New Releases") {
        url = `https://academics.newtonschool.co/api/v1/music/song?sort={"release":1}&limit=100`;
    }
    if (title === "Top Charts") {
        url = `https://academics.newtonschool.co/api/v1/music/album?sort={"top":1}&limit=100`;
    }
    if (title === "Sad Songs") {
        url = `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"sad"}&limit=100`;
    }
    if (title === "Happy Songs") {
        url = `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"happy"}&limit=100`;
    }
    if (title === "Romantic Songs") {
        url = `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"romantic"}&limit=100`;
    }
    if (title === "Party Songs") {
        //"excited"
        url = `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"excited"}&limit=100`;
    }
    if (title === "Artists") {
        url = `https://academics.newtonschool.co/api/v1/music/artist`;
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (changeNavigate) {
            navigate("/player", {
                state: {
                    isArtist: true,
                    artists: data[songIndex],
                },
            });
        }
    }, [changeNavigate]);

    const handleClick = async (title, index) => {
        if (isAlbum) {
            // console.log(data[index]);
            // console.log(data[index].songs);
            const artists = data[index].artists;
            // console.log(artists);
            dispatch(addSongs(data[index].songs));
            dispatch(addSongIndex(0));
            dispatch(playSong());
            navigate("/player", {
                state: {
                    isAlbum,
                    artists: [...artists],
                    albumData: data[index],
                },
            });
        } else {
            if (title === "Artists") {
                // console.log(`data: `);
                // console.log(data[index]);
                dispatch(deleteSongs());
                data[index].songs.map(async (id, index) => {
                    const projectId = import.meta.env.VITE_PROJECT_ID;
                    const response = await axios({
                        url: `https://academics.newtonschool.co/api/v1/music/song/${id}`,
                        method: "get",
                        headers: {
                            projectId: projectId,
                        },
                    });
                    // console.log(await response.data.data);
                    dispatch(updateSongs(response.data.data));
                });
                dispatch(addSongIndex(0));
                setSongIndex(index);
                setChangeNavigate(true);
            } else {
                // console.log(`data: `);
                // console.log(data);
                dispatch(addSongs(data));
                dispatch(addSongIndex(index));
                dispatch(playSong());
                navigate("/player");
            }
        }
    };

    // const headerId = {
    //     // "New Releases": "all",
    //     "Romantic Songs": "album",
    //     "Top Charts": "new",
    //     "Sad Songs": "artist",
    // };
    const headerId = {
        "New Releases": "album",
        // "Romantic Songs": "mood",
        "Top Charts": "mood",
        Artists: "artist",
    };

    useEffect(() => {
        (async () => {
            const projectId = import.meta.env.VITE_PROJECT_ID;
            const response = axios({
                // url: `https://academics.newtonschool.co/api/v1/music/song?sort={"release":1}`,
                url: url,
                method: "get",
                headers: {
                    projectId: projectId,
                },
            });
            // return (await data).data.data;
            setData((await response).data.data);
        })();
    }, []);

    // console.log(data);

    return (
        <>
            <Box className="px-4 md:px-8 xl:px-24 sm:mt-8 mt-4 text-white">
                <Box className="font-medium mb-4 flex justify-between items-center text-[#f7f5f5] ">
                    <Typography className="cursor-pointer text-[24px] font-[500] ">
                        {title}
                    </Typography>
                </Box>
                <Box id={headerId[title] || ""}>
                    <Carousel
                        // centerMode={true}
                        swipeable={false}
                        draggable={false}
                        showDots={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={false}
                        autoPlaySpeed={4000}
                        keyBoardControl={true}
                        transitionDuration={500}
                        containerClass="carousel-container [&>img]:object-contain "
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px pr-[15px] "
                    >
                        {data?.map((song, index) => (
                            <Box
                                key={song._id}
                                component="div"
                                onClick={() => handleClick(title, index)}
                                className="cursor-pointer "
                            >
                                <img
                                    src={song.thumbnail || song.image}
                                    className={`w-[100%] md:h-[192.7px] object-fill sm:h-[180px] rounded-[10px] cursor-pointer ${
                                        title === "Artists" &&
                                        "rounded-[50%] w-[90%] "
                                    } `}
                                />

                                <Box
                                    className={`absolute top-0 left-0 md:h-[192.7px] sm:h-[180px] w-[100%] bg-[#00000099] flex flex-col items-center justify-center opacity-0 transition-[opacity] duration-[0.40s] hover:opacity-100 [&>*]:translate-y-[20px] [&>*]:transition-transform [&>*]:duration-[0.50s] [&>*]:hover:translate-y-0 backdrop-blur-[1.5px] pb-[20px] ${
                                        title === "Artists" &&
                                        "rounded-[50%] w-[85%] "
                                    } `}
                                >
                                    <Box className="truncate font-normal text-[#f7f5f5] text-base text-center w-[150px] pb-[5px] ">
                                        {song.title || song.name}
                                    </Box>
                                    <PlayArrow className="text-[#ed1c24] bg-white rounded-full p-2 h-[40px] w-[40px] " />
                                </Box>

                                <Box className=" truncate font-normal text-[#f7f5f5] text-base text-left pt-2 ">
                                    {song.title || song.name}
                                </Box>
                            </Box>
                        ))}
                    </Carousel>
                </Box>
            </Box>
        </>
    );
};

SongRow.prototype = {
    title: PropTypes.string,
};

export default SongRow;
