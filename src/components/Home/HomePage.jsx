import React from "react";
import { Box } from "@mui/material";
import Banner from "./Banner";
import SongRow from "./SongRow";

const HomePage = () => {
    return (
        <>
            <Box>
                <Banner />
                <Box className="mb-[32px] ">
                    <SongRow title={"New Releases"} />
                    <SongRow title={"Top Charts"} isAlbum={true} />
                    <SongRow title={"Romantic Songs"} />
                    <SongRow title={"Happy Songs"} />
                    <SongRow title={"Party Songs"} />
                    <SongRow title={"Sad Songs"} />
                    <SongRow title={"Artists"} />
                </Box>
            </Box>
        </>
    );
};

export default HomePage;
