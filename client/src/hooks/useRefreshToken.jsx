import useAuth from "./useAuth";
import { useMutation } from "@tanstack/react-query";
import { refreshUser } from "../routes/authRequests";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refreshMutation = useMutation({
    mutationFn: refreshUser,
    onSuccess: (refreshedUser) => {
      setAuth((prev) => {
        return {
          ...prev,
          id: refreshedUser.data.id,
          email: refreshedUser.data.email,
          fullName: refreshedUser.data.fullName,
          role: refreshedUser.data.role,
          accessToken: refreshedUser.data.accessToken,
        };
      });
      return refreshedUser.data.accessToken;
    },
  });

  return refreshMutation;
};

export default useRefreshToken;
