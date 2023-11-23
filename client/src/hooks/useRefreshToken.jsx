import useAuth from './useAuth'
import { useMutation} from "@tanstack/react-query";
import { refreshUser } from '../routes/authRequests';

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refreshMutation = useMutation({
    mutationFn : refreshUser,
    onSuccess :(refreshedUser) => {
      setAuth(prev => {
        console.log(JSON.stringify(prev))
        console.log(refreshedUser.data.accessToken)
        return {
          ...prev,
          role: refreshedUser.data.role,
          accessToken: refreshedUser.accessToken
        }
      })
      return refreshedUser.data.accessToken
    }
  }) 

  return refreshMutation
} 

export default useRefreshToken