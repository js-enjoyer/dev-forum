// user.factory.ts
import { ContentUser } from "../../../interfaces/user";  // Adjust the path to your user interface

export function createDefaultUser(): ContentUser {
  return {
    _id: '',
    username: '',
    email: '',
    image: '',
    location: '',
    description: '',
    saves: [],
    reputation: 0,  // Default reputation
    upvotes: 0,
    downvotes: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}
