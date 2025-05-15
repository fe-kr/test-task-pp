import { type RootStackParamList } from "./src/app/providers";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }

  namespace Http {
    interface PaginationParams {
      page: number;
      limit?: number;
      totalPages?: number;
    }

    type RawResponse<T> = {
      MRData: {
        xmlns: string;
        series: string;
        url: string;
        limit: string;
        offset: string;
        total: string;
      } & T;
    };

    interface PaginatedResponse<T> {
      data: T[];
      metadata: Required<PaginationParams>;
    }
  }
}
