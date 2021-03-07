import { createSlice } from "@reduxjs/toolkit";

export const appReducer = createSlice({
  name: "app",
  initialState: {
    workingDay: new Date(),
    userNotes: [],
    messageType: "wait" | "success" | "failed",
    messageText: "",
    showMessage: false,
    hasUser: false,
  },
  reducers: {
    setNewDate: (state, action) => {
      console.log("setNewDate");
      state.workingDay = action.payload;
    },
    setUserNotes: (state, action) => {
      state.userNotes = action.payload;
    },
    setMessage: (state, action) => {
      state.messageType = action.payload;
      state.showMessage = true;
    },
    hideMessage: (state) => {
      state.showMessage = false;
    },
    setHasUser: (state) => {
      state.hasUser = !state.hasUser;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setNewDate,
  setUserNotes,
  setMessage,
  hideMessage,
  setHasUser,
} = appReducer.actions;

export default appReducer.reducer;
