import { StyleSheet, Text, View, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { X, Check } from "lucide-react-native";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function FilterModal({ visible, onClose, activeFilter, setActiveFilter }: FilterModalProps) {
  const filters = [
    { id: "ALL", label: "All Parcels" },
    { id: "EN TRANSIT", label: "In Transit" },
    { id: "EN COURS DE LIVRAISON", label: "In Delivery" },
    { id: "RETOUR", label: "Returned" },
  ];

  const handleSelect = (filterId: string) => {
    setActiveFilter(filterId);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>Filter Parcels</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <X size={20} color="#757575" />
                </TouchableOpacity>
              </View>

              <View style={styles.filterList}>
                {filters.map((filter) => (
                  <TouchableOpacity
                    key={filter.id}
                    style={[
                      styles.filterItem,
                      activeFilter === filter.id && styles.activeFilterItem,
                    ]}
                    onPress={() => handleSelect(filter.id)}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        activeFilter === filter.id && styles.activeFilterText,
                      ]}
                    >
                      {filter.label}
                    </Text>
                    {activeFilter === filter.id && (
                      <Check size={18} color="#1a73e8" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
  },
  filterList: {
    padding: 8,
  },
  filterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  activeFilterItem: {
    backgroundColor: "#e3f2fd",
  },
  filterText: {
    fontSize: 14,
    color: "#424242",
  },
  activeFilterText: {
    fontWeight: "bold",
    color: "#1a73e8",
  },
});