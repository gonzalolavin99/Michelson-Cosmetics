import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

export interface PurchaseState {
  persona: {
    name: string;
    rut: string;
    email: string;
    phone: string;
    region: string;
    commune: string;
    street: string;
    houseNumber: string;
    apartment: string;
  };
}

const initialState: PurchaseState = {
  persona: {
    apartment: "prueba",
    commune: "",
    email: "",
    houseNumber: "",
    name: "",
    phone:"",
    region:"",
    rut:"",
    street:""
  }
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const PurchaseReducer = createAppSlice({
  name: "purchase",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    loadPersona: create.reducer(
        (state, action: PayloadAction<PurchaseState>) => {
          state.persona = action.payload.persona
        },
      ),

  }),
  selectors: {
    selectPersona: purchase => purchase.persona,
   
  },

 
});
export const {loadPersona } = PurchaseReducer.actions
export const { selectPersona } = PurchaseReducer.selectors


