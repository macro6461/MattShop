import axios, { AxiosResponse } from 'axios'
import { ProfileProps } from './types'

async function loginUser(username: string, password: string): Promise<ProfileProps> {
  return helperFindFunction([username, password], true)
}

async function getProfileData(userId: string): Promise<ProfileProps> {
  return helperFindFunction([userId])
}

// This is a shared function because while the logic is separate, the result/operations are similar, just dependent on different arguments/circumstances.
// Normally login method would have separate logic, something like JWT confirmation, followed by a getProfileData.
const helperFindFunction = async (args: string[] | number[], isLogin?: boolean) => {
  try {
    const response: AxiosResponse<ProfileProps[]> = await axios.get(
      'https://fakestoreapi.com/users'
    )
    let users = response.data
    let isValidUser = users.find((user) => {
      if (isLogin) {
        return user.username === args[0] && user.password === args[1]
      } else {
        return user.id === args[0]
      }
    })
    if (isValidUser) {
      return isValidUser
    } else {
      throw { code: 403, message: 'User not found.' }
    }
  } catch (error) {
    throw error // Re-throw the error to be handled by the caller
  }
}

export { loginUser, getProfileData } // Exporting for potential testing or use elsewhere
