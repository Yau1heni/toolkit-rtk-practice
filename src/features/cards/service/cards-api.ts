import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "common/api/common-api";
import { FetchCardsResponseType } from "features/cards/service/types";

export const cardsApi = createApi({
  reducerPath: "cardsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: "include" }),
  endpoints: (build) => ({
    getCards: build.query<FetchCardsResponseType, string>({
      query: (packId) => {
        return {
          method: "GET",
          url: "cards/card",
          params: {
            cardsPack_id: packId,
          },
        };
      },
    }),
  }),
});

export const { useGetCardsQuery } = cardsApi;
