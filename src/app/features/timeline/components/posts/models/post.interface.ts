interface Post {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: any[];
  createdAt: string;
  content: string;
  commentsCount: number;
  topComment: any;
  sharesCount: number;
  commentCreator: string;
  photo: string;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}

interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}
