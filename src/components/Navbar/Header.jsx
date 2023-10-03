import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const containerStyle = {
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::WebkitScrollbar": {
            display: "none",
        },
    };

    const headerArray = [
        "All",
        "New Releases",
        "Moods & Genre",
        "Top Albums",
        "Top Artists",
    ];
    const headerId = {
        // All: "#all",
        "New Releases": "#new",
        "Moods & Genre": "#mood",
        "Top Albums": "#album",
        "Top Artists": "#artist",
    };
    // const headerId = {
    //     All: "#all",
    //     "New Releases": "#new",
    //     "Moods & Genre": "#mood",
    //     "Top Albums": "#album",
    //     "Top Artists": "#artist",
    // };
    return (
        <Box className="bg-[#0c0f12] -top-[1px] h-[72px] w-[100%] ">
            <Box
                style={containerStyle}
                className="pl-[1rem] flex justify-between py-[.75rem] md:pl-[2rem] lg:pt-[1rem] lg:pb-[1rem] xl:pl-[6rem]  "
            >
                <Box className="flex overflow-y-auto gap-4 md:gap-8 lg:gap-6 xl:gap-8 items-center pr-4 lg:min-h-[40px] min-h-[24px] ">
                    {/* <Box className="text-base font-light hover:underline underline-offset-[6px] first-of-type:ml-0 text-[#a3a7ae] box-border whitespace-pre ">
                        <a href="#" className="text-[#f9f9f9] font-bold ">
                            All
                        </a>
                    </Box> */}

                    {headerArray.map((item, index) => (
                        <Box
                            className={`text-base font-light hover:underline underline-offset-[6px] first-of-type:ml-0 text-[#a3a7ae] box-border whitespace-pre ${
                                (item === "All" || item === "Top Artists") &&
                                "max-[515px]:hidden "
                            } ${
                                item === "Top Albums" && "max-[420px]:hidden "
                            } `}
                            key={index}
                        >
                            <a href={headerId[item]} className=" ">
                                {item}
                            </a>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
