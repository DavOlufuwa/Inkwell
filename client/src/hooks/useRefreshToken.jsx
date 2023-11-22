import useAuth from './useAuth'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { refreshUser } from '../routes/authRequests';

const useRefreshToken = () => {
  const { setAuth } = useAuth()
  const queryClient = useQueryClient()

  const refreshMutation = useMutation({
    mutationFn : refreshUser,
    onSuccess :(refreshedUser) => {
      setAuth(prev => {
        console.log(JSON.stringify(prev))
        console.log(refreshedUser.data.accessToken)
        queryClient.setQueryData('auth', (prev) => ({
          ...prev,
          accessToken: refreshedUser.data.accessToken
        }))
        return {
          ...prev,
          accessToken: refreshedUser.accessToken
        }
      })
      return refreshedUser.data.accessToken
    }
  }) 

  return refreshMutation
} 

export default useRefreshToken