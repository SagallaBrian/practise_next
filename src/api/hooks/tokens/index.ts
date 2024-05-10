import { axiosInstance } from "@/api/api";
import { API_URL } from "@/api/url";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GetAllTokensResp, tokenSearchInput } from "./types";

// For Sever side paginatio
const useGetAllTokens = (params: tokenSearchInput) => {
  return useQuery({
    queryKey: ["tokens", params],
    queryFn: async () =>
      (await axiosInstance.get(API_URL.getAllTokens, { params }))
        .data as GetAllTokensResp,
  });
};

// For infinite scroll
const useGetTokensScroll = () => {
  return useInfiniteQuery({
    queryKey: ["tokensInfinite"],
    queryFn: async ({ pageParam }) => {
      const params = { limit: 10, lastId: pageParam };
      const res = await axiosInstance.get(API_URL.getAllTokens, { params });
      return res.data as GetAllTokensResp;
    },
    initialPageParam: "",
    getPreviousPageParam: (firstPage) => {
      return firstPage.lastId ?? undefined;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.lastId : undefined;
    },
  });
};

export { useGetAllTokens, useGetTokensScroll };
