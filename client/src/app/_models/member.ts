import { ProfilePicture } from "./ProfilePictures"

export interface Member {
    id: number
    username: string
    age: number
    photoUrl: string
    userAlias: string
    created: Date
    lastActive: Date
    aboutMe: string
    interests: string
    userCountry: string
    userCity: string
    profilePicture: ProfilePicture[]
  }