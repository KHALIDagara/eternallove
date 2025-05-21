import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Package, Phone, MapPin, DollarSign, Info } from "lucide-react-native";
import { Parcel } from "@/types";

interface ParcelCardProps {
  parcel: Parcel;
}

export default function ParcelCard({ parcel }: ParcelCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "EN TRANSIT":
        return "#2196f3";
      case "EN COURS DE LIVRAISON":
        return "#4caf50";
      case "RETOUR":
        return "#f44336";
      default:
        return "#757575";
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{parcel.clientName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(parcel.status) }]}>
            <Text style={styles.statusText}>{parcel.status}</Text>
          </View>
        </View>
        <Text style={styles.date}>
          {new Date(parcel.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Package size={16} color="#1a73e8" style={styles.infoIcon} />
            <Text style={styles.infoText}>{parcel.productName}</Text>
          </View>
          <View style={styles.infoItem}>
            <DollarSign size={16} color="#0d47a1" style={styles.infoIcon} />
            <Text style={styles.priceText}>{parcel.price} MAD</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Phone size={16} color="#1a73e8" style={styles.infoIcon} />
            <Text style={styles.infoText}>{parcel.phone}</Text>
          </View>
          <View style={styles.infoItem}>
            <MapPin size={16} color="#1a73e8" style={styles.infoIcon} />
            <Text style={styles.infoText}>{parcel.city}</Text>
          </View>
        </View>

        {parcel.notes ? (
          <View style={styles.notes}>
            <Info size={14} color="#757575" style={styles.notesIcon} />
            <Text style={styles.notesText} numberOfLines={2}>
              {parcel.notes}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.footer}>
        <View style={styles.openInfo}>
          <Text style={styles.openLabel}>
            {parcel.isAllowedToOpen ? "Can open package" : "Cannot open package"}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.detailsButton]}>
            <Text style={styles.detailsText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  clientInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  clientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    fontSize: 12,
    color: "#757575",
  },
  content: {
    padding: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    marginRight: 6,
  },
  infoText: {
    fontSize: 14,
    color: "#424242",
  },
  priceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0d47a1",
  },
  notes: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  notesIcon: {
    marginRight: 6,
    marginTop: 2,
  },
  notesText: {
    fontSize: 12,
    color: "#757575",
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
  },
  openInfo: {
    
  },
  openLabel: {
    fontSize: 12,
    color: "#757575",
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: "#e3f2fd",
  },
  actionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1a73e8",
  },
  detailsButton: {
    backgroundColor: "#1a73e8",
  },
  detailsText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
  },
});