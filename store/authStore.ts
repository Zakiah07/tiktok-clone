import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { BASE_URL } from "../utils";
import { IUser } from "../types";

type AuthStore = {
  userProfile: IUser | null;
  allUsers: IUser[];
  addUser: (user: IUser) => void;
  removeUser: () => void;
  fetchAllUsers: () => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userProfile: null,
      allUsers: [],
      addUser: (user) => set({ userProfile: user }),
      removeUser: () => set({ userProfile: null }),
      fetchAllUsers: async () => {
        const response = await axios.get(`${BASE_URL}/api/users`);
        set({ allUsers: response.data });
      },
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;
