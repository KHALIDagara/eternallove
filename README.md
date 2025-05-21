# Parcel Delivery App

A React Native mobile application for managing parcel deliveries, built with Expo and Appwrite.

## Features

- Authentication (Login/Register)
- Parcel Management
  - Create, view, and filter parcels by delivery status
  - Track delivery statistics
- Pickup Management
  - Create pickup requests
  - Group parcels by city
- Revenue Tracking
  - View total revenue and pending payments
  - Manage billing settings

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- Expo CLI
- Appwrite Cloud account or self-hosted Appwrite instance

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=your-project-id
   APPWRITE_DATABASE_ID=your-database-id
   APPWRITE_USER_COLLECTION_ID=users
   APPWRITE_PARCEL_COLLECTION_ID=parcels
   APPWRITE_RAMASSAGE_COLLECTION_ID=ramassages
   ```

### Appwrite Setup

1. Create an Appwrite project in the Appwrite Console
2. Create a database with the following collections:

#### Users Collection
- Attributes:
  - `name` (string)
  - `email` (string, unique)
  - `phone` (string, optional)

#### Parcels Collection
- Attributes:
  - `clientName` (string)
  - `productName` (string)
  - `city` (string)
  - `notes` (string)
  - `price` (number)
  - `isAllowedToOpen` (boolean)
  - `phone` (string)
  - `address` (string)
  - `status` (string, enum: ["EN TRANSIT", "EN COURS DE LIVRAISON", "RETOUR"])
  - `createdAt` (datetime)
  - `ramassageId` (string, optional, relation to Ramassages collection)
  - `userId` (string, relation to Users collection)

#### Ramassages Collection
- Attributes:
  - `fornisseurName` (string)
  - `city` (string)
  - `phone` (string)
  - `address` (string)
  - `notes` (string)
  - `parcelIds` (string[])
  - `status` (string, enum: ["PENDING", "COMPLETED", "CANCELLED"])
  - `createdAt` (datetime)
  - `userId` (string, relation to Users collection)

3. Set up the following indexes:
   - Parcels: status, userId, ramassageId
   - Ramassages: status, userId, city

4. Create API keys with the following permissions:
   - collections.read (all collections)
   - collections.write (all collections)
   - documents.read (all collections)
   - documents.write (all collections)

5. Update the `.env` file with your Appwrite project details

### Running the App

```
npx expo start
```

## Integrating with Appwrite

To fully integrate this app with Appwrite, you'll need to:

1. Uncomment and complete the Appwrite SDK initialization in `lib/appwrite.ts`
2. Replace the mock functions in the store files with actual Appwrite API calls
3. Implement proper error handling for API requests
4. Set up authentication with Appwrite Account API

Example implementation for fetching parcels:

```typescript
fetchParcels: async () => {
  set({ loading: true });
  try {
    const response = await appwriteDatabase.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.parcelCollectionId,
      [
        Query.equal('userId', useAuthStore.getState().user?.id || ''),
        Query.orderDesc('createdAt')
      ]
    );
    
    set({ 
      parcels: response.documents as Parcel[],
      loading: false 
    });
  } catch (error) {
    console.error("Error fetching parcels:", error);
    set({ loading: false });
  }
}
```

## Security Considerations

- Implement proper access control in Appwrite
- Set up document-level security to ensure users can only access their own data
- Use secure API keys and never expose them in client-side code
- Implement proper validation on both client and server sides