import { axiosInstance } from "@/api/api";

export const getPostsTest = async () => {
  try {
    const response = await axiosInstance.get("/popup?limit=10");
    return response;
  } catch (error) {
    console.error(error);
  }
};
