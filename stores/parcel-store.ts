import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { Parcel } from "@/types";

interface ParcelState {
  parcels: Parcel[];
  loading: boolean;
  fetchParcels: () => Promise<void>;
  addParcel: (parcel: Omit<Parcel, "id" | "createdAt">) => Promise<void>;
  updateParcel: (id: string, updates: Partial<Parcel>) => Promise<void>;
  deleteParcel: (id: string) => Promise<void>;
  assignToRamassage: (parcelIds: string[], ramassageId: string) => Promise<void>;
}

export const useParcelStore = create<ParcelState>()(
  persist(
    (set, get) => ({
      parcels: [],
      loading: false,

      fetchParcels: async () => {
        set({ loading: true });
        try {
          // In a real app, this would fetch from Appwrite
          // For demo purposes, we'll use the existing state or create mock data if empty
          
          const { parcels } = get();
          
          if (parcels.length === 0) {
            // Generate some mock data for demo
            const mockParcels: Parcel[] = [
              {
                id: "1",
                clientName: "Ahmed Benali",
                productName: "Smartphone",
                city: "Casablanca",
                notes: "Call before delivery",
                price: 2500,
                isAllowedToOpen: true,
                phone: "0612345678",
                address: "123 Avenue Hassan II, Casablanca",
                status: "EN TRANSIT",
                createdAt: new Date().toISOString(),
              },
              {
                id: "2",
                clientName: "Fatima Zahra",
                productName: "Laptop",
                city: "Rabat",
                notes: "Fragile item",
                price: 8000,
                isAllowedToOpen: false,
                phone: "0698765432",
                address: "45 Rue Mohammed V, Rabat",
                status: "EN COURS DE LIVRAISON",
                createdAt: new Date().toISOString(),
              },
              {
                id: "3",
                clientName: "Karim Idrissi",
                productName: "Headphones",
                city: "Marrakech",
                notes: "",
                price: 500,
                isAllowedToOpen: true,
                phone: "0661234567",
                address: "78 Avenue Allal El Fassi, Marrakech",
                status: "RETOUR",
                createdAt: new Date().toISOString(),
              },
            ];
            
            set({ parcels: mockParcels });
          }
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({ loading: false });
        } catch (error) {
          console.error("Error fetching parcels:", error);
          set({ loading: false });
        }
      },

      addParcel: async (parcel) => {
        set({ loading: true });
        try {
          // In a real app, this would add to Appwrite
          // For demo purposes, we'll just add to the local state
          
          const newParcel: Parcel = {
            ...parcel,
            id: Math.random().toString(36).substring(2, 9),
            createdAt: new Date().toISOString(),
          };
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => ({
            parcels: [...state.parcels, newParcel],
            loading: false,
          }));
        } catch (error) {
          console.error("Error adding parcel:", error);
          set({ loading: false });
        }
      },

      updateParcel: async (id, updates) => {
        set({ loading: true });
        try {
          // In a real app, this would update in Appwrite
          // For demo purposes, we'll just update the local state
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => ({
            parcels: state.parcels.map(parcel => 
              parcel.id === id ? { ...parcel, ...updates } : parcel
            ),
            loading: false,
          }));
        } catch (error) {
          console.error("Error updating parcel:", error);
          set({ loading: false });
        }
      },

      deleteParcel: async (id) => {
        set({ loading: true });
        try {
          // In a real app, this would delete from Appwrite
          // For demo purposes, we'll just remove from the local state
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => ({
            parcels: state.parcels.filter(parcel => parcel.id !== id),
            loading: false,
          }));
        } catch (error) {
          console.error("Error deleting parcel:", error);
          set({ loading: false });
        }
      },

      assignToRamassage: async (parcelIds, ramassageId) => {
        set({ loading: true });
        try {
          // In a real app, this would update multiple documents in Appwrite
          // For demo purposes, we'll just update the local state
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => ({
            parcels: state.parcels.map(parcel => 
              parcelIds.includes(parcel.id) 
                ? { ...parcel, ramassageId, status: "EN COURS DE LIVRAISON" } 
                : parcel
            ),
            loading: false,
          }));
        } catch (error) {
          console.error("Error assigning parcels to ramassage:", error);
          set({ loading: false });
        }
      },
    }),
    {
      name: "parcels-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);