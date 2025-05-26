export type UserProfile = {
  id: string;
  username: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
};

export type BookLike = {
  id: string;
  user_id: string;
  book_id: string;
  created_at: string;
  users_profiles?: UserProfile;
};

export type BookReview = {
  id: string;
  user_id: string;
  book_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  users_profiles?: UserProfile;
};

export type Database = {
  public: {
    Tables: {
      books_likes: {
        Row: BookLike;
        Insert: Omit<BookLike, 'id' | 'created_at' | 'users_profiles'>;
        Update: Partial<Omit<BookLike, 'id' | 'created_at' | 'users_profiles'>>;
      };
      books_reviews: {
        Row: BookReview;
        Insert: Omit<BookReview, 'id' | 'created_at' | 'updated_at' | 'users_profiles'>;
        Update: Partial<Omit<BookReview, 'id' | 'created_at' | 'updated_at' | 'users_profiles'>>;
      };
      users_profiles: {
        Row: UserProfile;
        Insert: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}; 