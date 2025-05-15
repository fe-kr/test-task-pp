import { httpClient } from "src/shared/api";

export interface DriverRace {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };
  date: string;
  time: string;
}

export interface RequestDriverRacesParams extends Http.PaginationParams {
  driverId: string;
}

type DriverRacesResponse = Http.RawResponse<{
  RaceTable: { driverId: string; Races: DriverRace[] };
}>;

export const fetchDriverRaces = async ({
  driverId,
  page,
  limit = 10,
}: RequestDriverRacesParams): Promise<Http.PaginatedResponse<DriverRace>> => {
  try {
    const params = { limit, offset: page * limit };

    const { data } = await httpClient.get<DriverRacesResponse>(
      `/drivers/${driverId}/races.json`,
      { params },
    );

    return {
      data: data.MRData.RaceTable.Races,
      metadata: {
        page,
        limit,
        totalPages: +data.MRData.total && Math.ceil(+data.MRData.total / limit),
      },
    };
  } catch {
    throw new Error("Failed to load driver races");
  }
};
