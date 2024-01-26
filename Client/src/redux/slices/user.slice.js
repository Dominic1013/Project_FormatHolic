import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.token)
          localStorage.setItem("actkn", action.payload.token);
      }

      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

//fix it
// export default userSlice;
export default userSlice.reducer;
