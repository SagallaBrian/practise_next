export const parseJwt = (token: string) => {
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    try {
      return JSON.parse(atob(base64));
    } catch (error) {
      return null;
    }
  }
  return null;
};
