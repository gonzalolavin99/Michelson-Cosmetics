import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

const initialState: { token: string } = { token: "" };

// If you are not using async thunks you can use the standalone `createSlice`.
export const TokenReducer = createAppSlice({
  name: "token",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    loadToken: create.reducer(
      (state, action: PayloadAction<{ token: string }>) => {
        state.token = action.payload.token;
      }
    ),
  }),
  selectors: {
    selectToken: (token) => token.token,
  },
});
export const { loadToken } = TokenReducer.actions;
export const { selectToken } = TokenReducer.selectors;
