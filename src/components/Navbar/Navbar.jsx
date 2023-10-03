import React, { useEffect, useState } from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Modal,
    Toolbar,
    Typography,
} from "@mui/material";
import "./Navbar.css";
import PropTypes from "prop-types";
import { LibraryMusic, Login, Logout, Menu, Search } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "../Login/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, userSelector } from "../../redux/users/userSlice";
import {
    isSubscriptionPageSelector,
    setIsSubscriptionPage,
} from "../../redux/subscription/subscriptionSlice";
import axios from "axios";
import Swal from "sweetalert2";
import { addSongIndex, addSongs, playSong } from "../../redux/songs/songSlice";

const drawerWidth = 240;
const navItems = ["Developers", "Projects", "SignIn"];

function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isNavigate, setIsNavigate] = useState(false);

    const [searchText, setSearchText] = useState(false);
    const [searchData, setSearchData] = useState("");

    const dispatch = useDispatch();
    const userData = useSelector(userSelector);
    const user = userData ? userData.data : null;
    // console.log("nav");
    // console.log(user);

    const navigate = useNavigate();

    // const [isSubscriptionPage, setIsSubscriptionPage] = useState(false);
    const isSubscriptionPage = useSelector(isSubscriptionPageSelector);

    // Get the current URL using the useLocation hook
    const location = useLocation();

    // Use useEffect to update the state whenever the URL changes
    useEffect(() => {
        // Check if the current URL is "/subscription"
        // setIsSubscriptionPage(location.pathname === "/subscription");
        if (location.pathname === "/subscription") {
            dispatch(setIsSubscriptionPage(true));
        } else if (isSubscriptionPage) {
            dispatch(setIsSubscriptionPage(false));
        }
    }, [location.pathname]);

    const handleModal = () => {
        setOpenModal((prev) => !prev);
    };

    const handleDrawerToggle = () => {
        // console.log(mobileOpen);
        setMobileOpen((prevState) => !prevState);
    };

    const handleLogout = () => {
        dispatch(deleteUser());
    };

    // useEffect(() => {
    //     if (isNavigate) {
    //         navigate("/player");
    //     }
    // }, [isNavigate]);

    const onChangeSearchText = async (event) => {
        let url = `https://academics.newtonschool.co/api/v1/music/song?filter={"title":"${event.target.value}"}`;
        const projectId = import.meta.env.VITE_PROJECT_ID;
        // console.log(url);
        try {
            const response = await axios({
                url: url,
                method: "get",
                headers: {
                    projectId: projectId,
                },
            });

            if (response.status === 200) {
                dispatch(addSongs(await response.data.data));
                dispatch(addSongIndex(0));
                dispatch(playSong());
                event.target.value = "";
                // setIsNavigate(true);
                navigate("/player");
            }
        } catch (error) {
            setSearchText(true);
            // console.log("searchText setting true");
        }
        if (event.target.value === "") {
            // console.log("searchText setting false");
            setSearchText(false);
        }
    };

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            {/* sx={{ display: "flex" }} */}
            <Box className={isSubscriptionPage ? "hidden" : "flex"}>
                <CssBaseline />
                {/* bg-[#343a40] */}
                <AppBar
                    component="nav"
                    className={`bg-[#1b1a1a] px-[30px] ${
                        user
                            ? "min-[1060px]:px-[80px]"
                            : "min-[1060px]:px-[96px]"
                    } `}
                >
                    <Toolbar className="px-0 min-h-[72px] ">
                        <Avatar
                            src="./assets/logo/logo.png"
                            alt="Wynk Music Logo"
                            className="h-[48px] w-[48px] "
                        />
                        <Typography
                            component="div"
                            sx={{
                                flexGrow: 1,
                                display: { sm: "block" },
                            }}
                            className="ml-2 text-base md:text-xl font-light text-[#ffffff] opacity-90 "
                        >
                            <Link to={"/"}>Wynk Music</Link>
                        </Typography>
                        <Box className="bg-[#23232366] border-solid border-[0.8px] border-[#575757] rounded-[2.5rem] max-w-[12.75rem] min-[820px]:min-w-[17.75rem] lg:min-w-[18.75rem] pl-7 py-2 ml-4 flex h-[41px] ">
                            <span className=" mr-2 ">
                                <img
                                    src="./assets/images/search.png"
                                    alt="search img"
                                />
                            </span>
                            <input
                                type="search"
                                className="block placeholder-elipsis w-full h-full outline-none text-title bg-transparent text-sm sm:text-base ml-2 font-light placeholder:text-[#878793] "
                                // value={searchText}
                                onChange={async (event) => {
                                    // setSearchText(event.target.value)
                                    await onChangeSearchText(event);
                                    // event.target.value = "";
                                }}
                                placeholder="Search Songs"
                            />
                            {/* {console.log("searchText: " + searchText)} */}
                            {searchText && (
                                <>
                                    <List className="absolute bg-[#1b1a1a] text-[#ffffff] mt-[55px]">
                                        {/* No Songs found. Give full title. */}
                                        <ListItem>
                                            No Songs found. Give full title.
                                        </ListItem>
                                    </List>
                                </>
                            )}
                        </Box>

                        <Box
                            className="cursor-pointer relative mr-5 lg:mr-0 sm:ml-[1.375rem] hidden min-[720px]:block undefined "
                            onClick={() => {
                                user
                                    ? navigate("/subscription")
                                    : handleModal();
                            }}
                        >
                            <span className="flex items-center gap-2 hover:opacity-60 ">
                                <span className="text-[#fdfdfd] ">
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_1943_5431)">
                                                <rect
                                                    x="4.125"
                                                    y="3"
                                                    width="15.75"
                                                    height="18"
                                                    rx="2"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                ></rect>
                                                <path
                                                    d="M9 16.1738H15"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                ></path>
                                                <g clipPath="url(#clip1_1943_5431)">
                                                    <path
                                                        d="M12.3372 13.2729L10.176 10.5687L10.1885 10.0328C11.2028 10.1027 11.9914 9.99537 12.1748 9.03592L10.0136 9.02351L10.3634 8.43772L12.0874 8.46254C11.8247 7.9166 11.1023 7.84931 9.97607 7.8894L10.3634 7.31602L14.0239 7.31055L13.6616 7.87679H12.6496C12.8346 8.07203 12.97 8.29667 12.9745 8.48742L14.0239 8.47496L13.6616 9.03574L12.962 9.0482C12.8527 9.88472 12.0842 10.38 11.113 10.4938L13.2887 13.2722L12.3373 13.2727V13.2727L12.3372 13.2729Z"
                                                        fill="currentColor"
                                                        stroke="currentColor"
                                                        strokeWidth="0.00236424"
                                                    ></path>
                                                </g>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1943_5431">
                                                    <rect
                                                        width="24"
                                                        height="24"
                                                        fill="white"
                                                    ></rect>
                                                </clipPath>
                                                <clipPath id="clip1_1943_5431">
                                                    <rect
                                                        width="4.05064"
                                                        height="5.97455"
                                                        fill="white"
                                                        transform="translate(9.97461 7.30078)"
                                                    ></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                </span>
                                <span className="font-light text-[#fdfdfd] opacity-80 ">
                                    Manage Subscription
                                </span>
                            </span>
                        </Box>

                        <Box className="mx-4 h-10 border border-[#ffffff33] hidden opacity-100 lg:block "></Box>

                        {user ? (
                            <Link to={"/my-music"}>
                                <span
                                    className="hover:opacity-60 cursor-pointer flex "
                                    onClick={() => !user && handleModal()}
                                >
                                    <span className="text-[#fdfdfd] opacity-80 hidden lg:block">
                                        <span>
                                            <LibraryMusic className="h-[24px] w-[24px] " />
                                        </span>
                                    </span>
                                    <div className="hidden lg:block ml-2 font-light text-[#fdfdfd] opacity-80 ">
                                        My Music
                                    </div>
                                </span>
                            </Link>
                        ) : (
                            <span
                                className="hover:opacity-60 cursor-pointer flex "
                                onClick={() => !user && handleModal()}
                            >
                                <span className="text-[#fdfdfd] opacity-80 hidden lg:block">
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                            <path
                                                d="M2.90625 20.2508C3.82775 18.6544 5.15328 17.3287 6.74958 16.407C8.34588 15.4853 10.1567 15 12 15C13.8433 15 15.6541 15.4853 17.2504 16.407C18.8467 17.3287 20.1722 18.6544 21.0938 20.2508"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                        </svg>
                                    </span>
                                </span>
                                <div className="hidden lg:block ml-2 font-light text-[#fdfdfd] opacity-80 ">
                                    Login
                                </div>
                            </span>
                        )}

                        <div
                            className={` block ${
                                user ? "" : "lg:hidden "
                            } h-full text-white`}
                            onClick={handleDrawerToggle}
                        >
                            <div
                                className="relative h-full flex items-center"
                                data-headlessui-state=""
                            >
                                <button
                                    className="ml-[1.375rem]"
                                    type="button"
                                    aria-expanded="false"
                                    data-headlessui-state=""
                                    id=""
                                >
                                    <span className="w-6 h-6 text-white">
                                        <span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="25"
                                                viewBox="0 0 24 25"
                                                fill="none"
                                            >
                                                <path
                                                    d="M3.75 12.1211H20.25"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                ></path>
                                                <path
                                                    d="M3.75 6.12109H20.25"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                ></path>
                                                <path
                                                    d="M3.75 18.1211H20.25"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                ></path>
                                            </svg>
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Menu Bar */}
                        <Box
                            className={` border-[#e8eaed] z-30 absolute top-full mt-2 w-64 h-fit bg-[#1c1b1b] -bottom-[152px] right-0 pt-5 rounded-xl stroke-2 -mr-5 shadow-popover transform opacity-100 scale-100 ${
                                !user && "lg:hidden"
                            } ${mobileOpen ? "block" : "hidden"} `}
                        >
                            <span className="absolute right-[1.375rem] top-[-0.563rem] h-[0.625rem] w-[0.75rem] bg-inherit clip-polygon-nav  "></span>

                            {/* User Profile */}
                            {user && (
                                <Box className="flex flex-col px-4">
                                    <Box className="flex items-center gap-3 hover:opacity-60">
                                        <span className="hover:opacity-60 cursor-auto flex ">
                                            <span className="text-[#fdfdfd] ">
                                                <span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></path>
                                                        <path
                                                            d="M2.90625 20.2508C3.82775 18.6544 5.15328 17.3287 6.74958 16.407C8.34588 15.4853 10.1567 15 12 15C13.8433 15 15.6541 15.4853 17.2504 16.407C18.8467 17.3287 20.1722 18.6544 21.0938 20.2508"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        ></path>
                                                    </svg>
                                                </span>
                                            </span>
                                            <div className=" ml-2 font-light text-[#fdfdfd] ">
                                                {/* {user} */}
                                                {user.name}
                                            </div>
                                        </span>
                                    </Box>

                                    <Box className="full flex justify-center">
                                        <hr className="w-full h-[0.045rem] border-0 opacity-20 my-4 bg-[#f5f5f5] " />
                                    </Box>
                                </Box>
                            )}

                            {/* Manage Subscription */}
                            <Box
                                className="cursor-pointer relative block min-[720px]:hidden undefined "
                                onClick={() => {
                                    navigate("/subscription");
                                }}
                            >
                                <span className="flex items-center gap-3 hover:opacity-60 cursor-pointer mb-5 px-4 ">
                                    <span className="text-[#fdfdfd] ">
                                        <span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <g clipPath="url(#clip0_1943_5431)">
                                                    <rect
                                                        x="4.125"
                                                        y="3"
                                                        width="15.75"
                                                        height="18"
                                                        rx="2"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                    ></rect>
                                                    <path
                                                        d="M9 16.1738H15"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                    ></path>
                                                    <g clipPath="url(#clip1_1943_5431)">
                                                        <path
                                                            d="M12.3372 13.2729L10.176 10.5687L10.1885 10.0328C11.2028 10.1027 11.9914 9.99537 12.1748 9.03592L10.0136 9.02351L10.3634 8.43772L12.0874 8.46254C11.8247 7.9166 11.1023 7.84931 9.97607 7.8894L10.3634 7.31602L14.0239 7.31055L13.6616 7.87679H12.6496C12.8346 8.07203 12.97 8.29667 12.9745 8.48742L14.0239 8.47496L13.6616 9.03574L12.962 9.0482C12.8527 9.88472 12.0842 10.38 11.113 10.4938L13.2887 13.2722L12.3373 13.2727V13.2727L12.3372 13.2729Z"
                                                            fill="currentColor"
                                                            stroke="currentColor"
                                                            strokeWidth="0.00236424"
                                                        ></path>
                                                    </g>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1943_5431">
                                                        <rect
                                                            width="24"
                                                            height="24"
                                                            fill="white"
                                                        ></rect>
                                                    </clipPath>
                                                    <clipPath id="clip1_1943_5431">
                                                        <rect
                                                            width="4.05064"
                                                            height="5.97455"
                                                            fill="white"
                                                            transform="translate(9.97461 7.30078)"
                                                        ></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                    </span>
                                    <span className="font-light text-[#fdfdfd] opacity-80 ">
                                        Manage Subscription
                                    </span>
                                </span>
                            </Box>

                            {/* My Music */}
                            <Link to="/my-music">
                                <span
                                    className={`${
                                        user ? "flex" : "hidden"
                                    } items-center gap-3 hover:opacity-60 cursor-pointer mb-5 px-4 `}
                                    onClick={() => !user && handleModal()}
                                >
                                    <span className=" opacity-80 block lg:hidden">
                                        <span>
                                            <LibraryMusic className="h-[24px] w-[24px] " />
                                        </span>
                                    </span>
                                    <div className="block lg:hidden font-light text-[#fdfdfd] opacity-80 ">
                                        My Music
                                    </div>
                                </span>
                            </Link>

                            {/* Sign out */}
                            {user ? (
                                <Box
                                    className="flex items-center gap-3 hover:opacity-60 cursor-pointer mb-5 px-4  "
                                    onClick={handleLogout}
                                >
                                    <Logout />
                                    <span className="font-light opacity-80 text-[#fdfdfd]">
                                        Sign Out
                                    </span>
                                </Box>
                            ) : (
                                <Box
                                    className="lg:hidden flex items-center gap-3 hover:opacity-60 cursor-pointer mb-5 px-4  "
                                    onClick={() => !user && handleModal()}
                                >
                                    {/* <Login /> */}

                                    <span className="text-[#fdfdfd] opacity-80 ">
                                        <span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                ></path>
                                                <path
                                                    d="M2.90625 20.2508C3.82775 18.6544 5.15328 17.3287 6.74958 16.407C8.34588 15.4853 10.1567 15 12 15C13.8433 15 15.6541 15.4853 17.2504 16.407C18.8467 17.3287 20.1722 18.6544 21.0938 20.2508"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                ></path>
                                            </svg>
                                        </span>
                                    </span>

                                    <span className="font-light opacity-80">
                                        Login
                                    </span>
                                </Box>
                            )}
                        </Box>

                        {/* <Box
                            sx={{ display: { xs: "none", sm: "block" } }}
                            className="[&>*]:mx-[20px] normal-case "
                        >

                            {navItems.map((item) => (
                                <Button
                                    key={item}
                                    sx={{ color: "#fff" }}
                                    className="normal-case text-[16px] "
                                >
                                    {item}
                                </Button>
                            ))}
                        </Box> */}
                    </Toolbar>
                </AppBar>

                {/* <LoginModal /> */}
                {/* <Box component="nav">
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: "block", sm: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box> */}
            </Box>
            {openModal && (
                <LoginModal open={openModal} handleModal={handleModal} />
                // <Modal
                //     open={open}
                //     onClose={handleModal}
                //     aria-labelledby="modal-modal-title"
                //     aria-describedby="modal-modal-description"
                //     className=" "
                // >
                //     <Box className=" inline-block text-white w-full max-w-3xl sm:w-auto h-auto overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl opacity-100 scale-100 ">
                //         Hi
                //     </Box>
                // </Modal>
            )}
        </>
    );
}

Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Navbar;
