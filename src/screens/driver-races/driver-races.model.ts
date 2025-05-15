import {
  createAppAsyncThunk,
  createSlice,
  InitialState,
  rootReducer,
} from "src/shared/lib/redux";
import {
  fetchDriverRaces,
  DriverRace,
  RequestDriverRacesParams,
} from "./driver-races.api";

const initialState: InitialState<DriverRace[]> & Http.PaginationParams = {
  data: null,
  loading: false,
  error: null,
  page: 0,
  totalPages: 0,
};

export const fetchDriverRacesAction = createAppAsyncThunk(
  "driver-races/fetchDriverRaces",
  (payload: RequestDriverRacesParams, { rejectWithValue }) =>
    fetchDriverRaces(payload).catch((err: Error) =>
      rejectWithValue(err.message),
    ),
);

const driverRacesSlice = createSlice({
  name: "driver-races",
  initialState,
  reducers: {},
  selectors: {
    selectDriverRaces: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriverRacesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriverRacesAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload.data;
        state.page = payload.metadata.page;
        state.totalPages = payload.metadata.totalPages;
      })
      .addCase(fetchDriverRacesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
}).injectInto(rootReducer);

export const driverRacesActions = driverRacesSlice.actions;

export const { selectDriverRaces } = driverRacesSlice.selectors;
