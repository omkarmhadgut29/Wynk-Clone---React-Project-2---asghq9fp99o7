import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    songs: [],
    currentSongIndex: 0,
    isPlaying: false,
    isLikedSongs: false,
    albumArtists: null,
};

// export const getSongs = createAsyncThunk("getSongs", async () => {
//     const projectId = import.meta.env.VITE_PROJECT_ID;

//     const data = axios({
//         url: `https://academics.newtonschool.co/api/v1/music/song`,
//         method: "get",
//         headers: {
//             projectId: projectId,
//         },
//     });
//     return (await data).data.data;
// });

// extraReducers: (builder) => {
//     builder
//         .addCase(getSongs.pending, (state, action) => {
//             state.data.isLoading = true;
//         })
//         .addCase(getSongs.fulfilled, (state, action) => {
//             state.data.songs = action.payload;
//             state.data.isLoading = false;
//         })
//         .addCase(getSongs.rejected, (state, action) => {
//             console.log(action.error);
//             state.data.isError = true;
//         });
// }

const songSlice = createSlice({
    name: "song",
    initialState,
    reducers: {
        addSongs: (state, action) => {
            state.songs = action.payload;
            state.isLikedSongs = false;
            localStorage.setItem("isLikedSongs", JSON.stringify(false));
            localStorage.setItem("songs", JSON.stringify(action.payload));
        },
        updateSongs: (state, action) => {
            state.songs.push(action.payload);
            localStorage.setItem("songs", JSON.stringify(state.songs));
        },
        deleteSongs: (state) => {
            state.songs = [];
            localStorage.removeItem("songs");
        },
        setLikedSongs: (state) => {
            state.isLikedSongs = true;
            localStorage.setItem("isLikedSongs", JSON.stringify(true));
        },
        addSongIndex: (state, action) => {
            state.currentSongIndex = action.payload;
            localStorage.setItem(
                "currentSongIndex",
                JSON.stringify(action.payload)
            );
        },
        incrementSongIndex: (state) => {
            state.currentSongIndex += 1;
            localStorage.setItem(
                "currentSongIndex",
                JSON.stringify(state.currentSongIndex)
            );
        },
        decrementSongIndex: (state) => {
            state.currentSongIndex -= 1;
            localStorage.setItem(
                "currentSongIndex",
                JSON.stringify(state.currentSongIndex)
            );
        },
        pauseSong: (state) => {
            state.isPlaying = false;
        },
        playSong: (state) => {
            state.isPlaying = true;
        },
        addAlbumArtists: (state, action) => {
            state.albumArtists = action.payload;
            localStorage.setItem(
                "albumArtists",
                JSON.stringify(action.payload)
            );
        },
        deleteAlbumArtists: (state) => {
            state.albumArtists = [];
            localStorage.removeItem("albumArtists");
        },
    },
});

export const {
    addSongs,
    addSongIndex,
    incrementSongIndex,
    decrementSongIndex,
    pauseSong,
    playSong,
    updateSongs,
    deleteSongs,
    setLikedSongs,
    addAlbumArtists,
    deleteAlbumArtists,
} = songSlice.actions;

export const songSelector = createSelector(
    (state) => state.songs.songs,
    (state) => state
);

export const isLikedSongsSelector = createSelector(
    (state) => state.songs.isLikedSongs,
    (state) => state
);

export const currentSongIndexSelector = createSelector(
    (state) => state.songs.currentSongIndex,
    (state) => state
);

export const isPlayingSelector = createSelector(
    (state) => state.songs.isPlaying,
    (state) => state
);

export const albumArtistsSelector = createSelector(
    (state) => state.songs.albumArtists,
    (state) => state
);

export default songSlice.reducer;
