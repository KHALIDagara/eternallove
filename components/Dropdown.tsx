import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from "react-native";
import { ChevronDown, Check } from "lucide-react-native";

interface DropdownProps {
  data: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
}

export default function Dropdown({ data, value, onChange, placeholder, error }: DropdownProps) {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const onItemPress = (item: string) => {
    onChange(item);
    setVisible(false);
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={styles.itemText}>{item}</Text>
      {value === item && <Check size={18} color="#1a73e8" />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, error && styles.buttonError]}
        onPress={toggleDropdown}
      >
        <Text style={[styles.buttonText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <ChevronDown size={20} color="#757575" />
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  buttonError: {
    borderWidth: 1,
    borderColor: "#f44336",
  },
  buttonText: {
    fontSize: 14,
    color: "#212121",
  },
  placeholderText: {
    color: "#9e9e9e",
  },
  errorText: {
    color: "#f44336",
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    maxHeight: "60%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 14,
    color: "#424242",
  },
});