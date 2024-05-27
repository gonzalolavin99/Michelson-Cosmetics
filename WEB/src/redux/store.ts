import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { PurchaseReducer } from "./reducer/PurchaseReducer"
import { loadFromSessionStorage, saveToSessionStorage } from "./localStorage"
import { TokenReducer } from "./reducer/TokenReducer"

const rootReducer = combineSlices(PurchaseReducer,TokenReducer)

export type RootState = ReturnType<typeof rootReducer>


export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
      preloadedState: loadFromSessionStorage(),
  })

  setupListeners(store.dispatch)
  return store
}
window.onbeforeunload = () => saveToSessionStorage(store.getState());
export const store = makeStore()

export type AppStore = typeof store

export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
