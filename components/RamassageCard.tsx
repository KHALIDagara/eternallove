import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Box, Phone, MapPin, Package, Calendar } from "lucide-react-native";
import { Ramassage } from "@/types";

interface RamassageCardProps {
  ramassage: Ramassage;
}

export default function RamassageCard({ ramassage }: RamassageCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "#ff9800";
      case "COMPLETED":
        return "#4caf50";
      case "CANCELLED":
        return "#f44336";
      default:
        return "#757575";
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.supplierInfo}>
          <Text style={styles.supplierName}>{ramassage.fornisseurName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ramassage.status) }]}>
            <Text style={styles.statusText}>{ramassage.status}</Text>
          </View>
        </View>
        <Text style={styles.date}>
          {new Date(ramassage.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Phone size={16} color="#1a73e8" style={styles.infoIcon} />
            <Text style={styles.infoText}>{ramassage.phone}</Text>
          </View>
          <View style={styles.infoItem}>
            <MapPin size={16} color="#1a73e8" style={styles.infoIcon} />
            <Text style={styles.infoText}>{ramassage.city}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Package size={16} color="#1a73e8" style={styles.infoIcon} />
            <Text style={styles.infoText}>{ramassage.parcelIds.length} Parcels</Text>
          </View>
          <View style={styles.infoItem}>
            <Calendar size={16} color="#1a73e8" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {new Date(ramassage.createdAt).toLocaleDateString("en-US", { 
                weekday: "short", 
                month: "short", 
                day: "numeric" 
              })}
            </Text>
          </View>
        </View>

        {ramassage.address ? (
          <View style={styles.address}>
            <MapPin size={14} color="#757575" style={styles.addressIcon} />
            <Text style={styles.addressText} numberOfLines={2}>
              {ramassage.address}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
          <Text style={styles.viewText}>View Parcels</Text>
        </TouchableOpacity>
        
        {ramassage.status === "PENDING" && (
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.completeButton]}>
              <Text style={styles.completeText}>Complete</Text>
            </TouchableOpacity>
          </View>
        )}
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
  supplierInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  supplierName: {
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
  address: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  addressIcon: {
    marginRight: 6,
    marginTop: 2,
  },
  addressText: {
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
  viewButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#e3f2fd",
  },
  viewText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1a73e8",
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
  cancelButton: {
    backgroundColor: "#ffebee",
  },
  cancelText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#f44336",
  },
  completeButton: {
    backgroundColor: "#1a73e8",
  },
  completeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
  },
});