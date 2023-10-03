/* eslint-disable react/jsx-key */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSongIndex, addSongs, playSong } from "../../redux/songs/songSlice";
import { Box } from "@mui/material";

const bannerData = [
    {
        id: 1,
        url: "./assets/images/Banner/bollywood.png",
    },
    {
        id: 2,
        url: "./assets/images/Banner/hot_right_now.png",
    },
    {
        id: 3,
        url: "./assets/images/Banner/latest_love.png",
    },
    // {
    //     id: 4,
    //     url: "./assets/images/Banner/independent.png",
    // },
    // {
    //     id: 5,
    //     url: "./assets/images/Banner/new_english.png",
    // },
];

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        partialVisibilityGutter: 40,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        partialVisibilityGutter: 30,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 20,
    },
};
const Banner = () => {
    const [data, setData] = useState([]);
    const [args, setArgs] = useState([]);
    const [changeNavigate, setChangeNavigate] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUrl = (id) => {
        let url = "";
        if (id === 1) {
            url = `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"excited"}`;
        }
        if (id === 2) {
            url = `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"romantic"}`;
        }
        if (id === 3) {
            url = `https://academics.newtonschool.co/api/v1/music/song?sort={"release":1}`;
        }

        return url;
    };

    const getData = async (url) => {
        const projectId = import.meta.env.VITE_PROJECT_ID;
        const response = await axios({
            url: url,
            method: "get",
            headers: {
                projectId: projectId,
            },
        });
        // console.log(await response.data.data);
        dispatch(addSongs(response.data.data));
        dispatch(addSongIndex(0));
        // setData(response.data.data);
    };

    const handleClick = (id) => {
        const url = getUrl(id);
        getData(url);
        dispatch(playSong());
        setChangeNavigate(true);
    };

    useEffect(() => {
        if (changeNavigate) {
            navigate("/player");
        }
    }, [changeNavigate]);

    return (
        <Box id="new">
            <Carousel
                centerMode={true}
                swipeable={false}
                draggable={false}
                showDots={false}
                // showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                // autoPlay={false}
                autoPlay={true}
                infinite={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                transitionDuration={500}
                containerClass="carousel-container [&>img]:object-contain "
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px pr-[15px] "
            >
                {bannerData.map((data) => (
                    <img
                        key={data.id}
                        src={data.url}
                        className=" w-[100%] md:h-[280px] object-fill sm:h-[180px] rounded-[10px] cursor-pointer "
                        onClick={() => handleClick(data.id)}
                    />
                ))}
            </Carousel>
        </Box>
    );
};

export default Banner;
