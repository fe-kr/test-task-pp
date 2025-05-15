import {
  createAppAsyncThunk,
  createAppSelector,
  createSlice,
  InitialState,
  rootReducer,
} from "src/shared/lib/redux";
import { fetchDrivers, Driver } from "./drivers.api";

const initialState: InitialState<Driver[]> & Http.PaginatedResponseMetadata = {
  data: null,
  loading: false,
  error: null,
  page: 0,
  totalPages: 0,
};

export const fetchDriversAction = createAppAsyncThunk(
  "drivers/fetchDrivers",
  (payload: Http.PaginationParams, { rejectWithValue, signal }) =>
    fetchDrivers({ ...payload, signal }).catch((err: Error) =>
      rejectWithValue(err.message),
    ),
);

const driversSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {},
  selectors: {
    selectDrivers: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriversAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriversAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload.data;
        state.page = payload.metadata.page;
        state.totalPages = payload.metadata.totalPages;
      })
      .addCase(fetchDriversAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
}).injectInto(rootReducer);

export const driversActions = driversSlice.actions;

export const { selectDrivers } = driversSlice.selectors;

export const selectDriverById = createAppSelector(
  [selectDrivers, (_, id: string) => id],
  ({ data }, id) => data?.find(({ driverId }) => driverId === id) ?? null,
);
