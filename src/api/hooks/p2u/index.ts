import { axiosInstance } from "@/api/api";
import { API_URL } from "@/api/url";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetUserRPAHistoryResp } from "./types";

// For infinite scroll useGetUserRpaHistory
const useGetUserRpaHistoryScroll = () => {
  return useInfiniteQuery({
    queryKey: ["rpahistinfinite"],
    queryFn: async ({ pageParam }) => {
      const params = { limit: 10, lastId: pageParam };
      const res = await axiosInstance.get(API_URL.getUserRPAHistory, {
        params,
      });
      return res.data as GetUserRPAHistoryResp;
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

// const useAddTokens = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (tokenData: FormData) => {
//       const response = await axiosInstance.post(API_URL.addTokens, tokenData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return response.data;
//     },
//     onSuccess: async (data) => {
//       await queryClient.invalidateQueries({
//         queryKey: ["tokensInfinite"],
//       });
//     },
//   });
// };

export { useGetUserRpaHistoryScroll };
