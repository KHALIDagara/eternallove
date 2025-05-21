import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types";
import { appwriteAccount } from "@/lib/appwrite";

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      initialized: false,

      login: async (email: string, password: string) => {
        set({ loading: true });
        try {
          // In a real app, this would use Appwrite SDK
          // For demo purposes, we'll simulate a successful login
          const mockUser: User = {
            id: "user123",
            email,
            name: email.split("@")[0],
          };
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({ user: mockUser, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      register: async (email: string, password: string, name: string) => {
        set({ loading: true });
        try {
          // In a real app, this would use Appwrite SDK
          // For demo purposes, we'll simulate a successful registration
          const mockUser: User = {
            id: "user123",
            email,
            name,
          };
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({ user: mockUser, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          // In a real app, this would use Appwrite SDK
          // For demo purposes, we'll simulate a successful logout
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ user: null, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      checkAuth: async () => {
        try {
          // In a real app, this would check the current session with Appwrite
          // For demo purposes, we'll just use the persisted state
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ initialized: true });
        } catch (error) {
          set({ initialized: true });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);