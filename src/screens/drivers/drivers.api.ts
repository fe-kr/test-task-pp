import { httpClient } from "src/shared/api";

export interface Driver {
  driverId: string;
  nationality: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
}

type DriversResponse = Http.RawResponse<{
  DriverTable: { Drivers: Driver[] };
}>;

export const fetchDrivers = async ({
  page,
  limit = 10,
}: Http.PaginationParams): Promise<Http.PaginatedResponse<Driver>> => {
  try {
    const params = { limit, offset: page * limit };

    const { data } = await httpClient.get<DriversResponse>("/drivers.json", {
      params,
    });

    return {
      data: data.MRData.DriverTable.Drivers,
      metadata: {
        page,
        limit,
        totalPages: Math.floor(+data.MRData.total / limit),
      },
    };
  } catch {
    throw new Error("Failed to load drivers");
  }
};
