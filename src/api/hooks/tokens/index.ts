import { axiosInstance } from "@/api/api";
import { API_URL } from "@/api/url";
import { userForm } from "@/models/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: userForm) => {
      const { email, password } = userData;
      const response = await axiosInstance.post(API_URL.signIn, {
        email,
        password,
      });
      return response.data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

const useGetUser = (isValidToken: boolean) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => (await axiosInstance.get(API_URL.getUser)).data,
    enabled: isValidToken,
  });
};

// export { useGetUser, useLoginUser };
