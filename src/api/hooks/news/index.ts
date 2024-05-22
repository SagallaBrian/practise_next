import { axiosInstance } from "@/api/api";
import { API_URL } from "@/api/url";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { iGetNewsResp } from "./types";
import { AxiosError } from "axios";

// For infinite scroll
const useGetNewsScroll = () => {
  return useInfiniteQuery<iGetNewsResp, AxiosError>({
    queryKey: ["newsInfinite"],
    queryFn: async ({ pageParam }) => {
      const params = { limit: 10, lastId: pageParam };
      const res = await axiosInstance.get(API_URL.getNews, { params });
      return res.data;
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

const useAddNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tokenData: FormData) => {
      const response = await axiosInstance.post(API_URL.addTokens, tokenData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["newsInfinite"],
      });
    },
  });
};

export { useAddNews, useGetNewsScroll };
