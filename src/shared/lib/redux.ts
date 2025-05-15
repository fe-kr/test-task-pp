import type { store } from "src/app/providers";

import {
  asyncThunkCreator,
  buildCreateSlice,
  combineSlices,
  createAsyncThunk,
  createSelector,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

export const rootReducer = combineSlices();

export type AppState = any;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, AppState, null, UnknownAction>;
export type AppStore = typeof store;
export type AppAsyncThunk = {
  state: AppState;
  dispatch: AppDispatch;
};
export type InitialState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispath = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<AppStore>();
export const createAppSelector = createSelector.withTypes<AppState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<AppAsyncThunk>();
export const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
