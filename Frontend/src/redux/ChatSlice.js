import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    conversation: [],
  },

  reducers: {
    addMessage: (state, action) => {
      state.conversation.push(action.payload);
    },

    clearConversation: (state) => {
      state.conversation = [];
    },
  },
});

export const { addMessage, clearConversation } = chatSlice.actions;

export default chatSlice.reducer;