import { axiosInstance } from "@/api/api";
import { API_URL } from "@/api/url";
import { UserSignInResp, UserSignInRsq, UserSignUpRsq } from "@/models/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation<UserSignInResp, Error, UserSignInRsq>({
    mutationFn: async (userData: UserSignInRsq) => {
      const { email, password } = userData;
      const response = await axiosInstance.post<UserSignInResp>(
        API_URL.signIn,
        {
          email,
          password,
        }
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

const useGetUser = (isValidToken: boolean) => {
  return useQuery<UserSignInResp, Error>({
    queryKey: ["user"],
    queryFn: async () => (await axiosInstance.get(API_URL.getUser)).data,
    enabled: isValidToken,
  });
};

const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: UserSignUpRsq) => {
      const response = await axiosInstance.post(API_URL.signUp, userData);
      return response.data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export { useGetUser, useLoginUser, useRegisterUser };
