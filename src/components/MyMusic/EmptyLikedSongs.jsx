import { Box } from "@mui/material";
import React from "react";

const EmptyLikedSongs = () => {
    return (
        <>
            <Box>
                <Box className="w-[87%] mt-12 mb-24 mx-auto">
                    <Box className="font-medium text-2xl mb-4 text-[#f7f5f5] ">
                        Liked Songs
                    </Box>

                    <Box className="relative text-center text-[#818c94] border border-[#3d464d] rounded  mb-10 py-12 px-6 ">
                        <img
                            src="assets/images/my-music-empty.png"
                            alt="my-music-empty img"
                            className="h-[185px] w-[185px] text-transparent max-w-full m-auto "
                        />

                        <Box
                            component={"p"}
                            className="font-medium text-sm mb-1"
                        >
                            Looks like you have not liked any songs yet
                        </Box>

                        <Box component={"p"} className="font-normal text-xs">
                            "Start liking your favourite music and find your
                            liked songs here. Keep Wynk-ing!"
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default EmptyLikedSongs;
