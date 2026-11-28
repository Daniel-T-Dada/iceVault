



import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { FilterOption } from "./types";

interface FilterPickerModalProps {
    visible: boolean;
    title: string;
    options: FilterOption[];
    selectedValue: string;
    onSelect: (value: string) => void;
    onClose: () => void;
}

const FilterPickerModal = ({
    visible,
    title,
    options,
    selectedValue,
    onSelect,
    onClose,
}: FilterPickerModalProps) => {
    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable style={styles.backdrop} onPress={onClose}>
                <Pressable style={styles.sheet} onPress={() => { }}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <Pressable
                            accessibilityLabel="Close filter"
                            accessibilityRole="button"
                            hitSlop={8}
                            onPress={onClose}
                        >
                            <Ionicons name="close" size={20} color={Colors.outline} />
                        </Pressable>
                    </View>

                    <View style={styles.list}>
                        {options.map((option) => {
                            const isSelected = option.value === selectedValue;
                            return (
                                <Pressable
                                    key={option.value}
                                    accessibilityRole="button"
                                    onPress={() => {
                                        onSelect(option.value);
                                        onClose();
                                    }}
                                    style={[
                                        styles.optionRow,
                                        isSelected && styles.optionRowSelected,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            isSelected && styles.optionTextSelected,
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                    {isSelected ? (
                                        <Ionicons
                                            name="checkmark"
                                            size={18}
                                            color={Colors.primary}
                                        />
                                    ) : null}
                                </Pressable>
                            );
                        })}
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default FilterPickerModal;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(5, 32, 15, 0.45)",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    sheet: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 18,
        gap: 14,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: Colors.onSurface,
    },
    list: {
        gap: 8,
    },
    optionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 10,
        backgroundColor: Colors.surfaceLow,
    },
    optionRowSelected: {
        backgroundColor: Colors.mintBg,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    optionText: {
        fontSize: 14,
        fontWeight: "500",
        color: Colors.onSurface,
    },
    optionTextSelected: {
        fontWeight: "700",
        color: Colors.primary,
    },
});