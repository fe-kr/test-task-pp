import { GenericAbortSignal } from "axios";
import { httpClient } from "src/shared/api";

export interface Driver {
  driverId: string;
  nationality: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
}

export interface RequestDriversParams extends Http.PaginationParams {
  signal?: GenericAbortSignal;
}

type DriversResponse = Http.RawResponse<{
  DriverTable: { Drivers: Driver[] };
}>;

export const fetchDrivers = async ({
  page,
  signal,
  limit = 10,
}: RequestDriversParams): Promise<Http.PaginatedResponse<Driver>> => {
  try {
    const params = { limit, offset: page * limit };

    const { data } = await httpClient.get<DriversResponse>("/drivers.json", {
      params,
      signal,
    });

    return {
      data: data.MRData.DriverTable.Drivers,
      metadata: {
        page,
        totalPages: Math.ceil(+data.MRData.total / limit),
      },
    };
  } catch {
    throw new Error("Failed to load drivers");
  }
};
