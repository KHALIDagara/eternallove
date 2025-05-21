export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Parcel {
  id: string;
  clientName: string;
  productName: string;
  city: string;
  notes: string;
  price: number;
  isAllowedToOpen: boolean;
  phone: string;
  address: string;
  status: "EN TRANSIT" | "EN COURS DE LIVRAISON" | "RETOUR";
  createdAt: string;
  ramassageId?: string;
}

export interface Ramassage {
  id: string;
  fornisseurName: string;
  city: string;
  phone: string;
  address: string;
  notes: string;
  parcelIds: string[];
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}

export interface RevenueSettings {
  notificationsEnabled: boolean;
  autoWithdraw: boolean;
  withdrawThreshold: number;
  paymentMethod: string;
}