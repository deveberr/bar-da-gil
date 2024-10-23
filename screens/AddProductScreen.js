import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

const AddProductScreen = ({ navigation, setProducts }) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    const handleAddProduct = () => {
        if (!name || !quantity || !price) {
            Alert.alert("Por favor, preencha todos os campos");
            return;
        }

        const newProduct = {
            id: Math.random(), // Gerar ID único
            name,
            quantity: parseInt(quantity),
            price: parseFloat(price),
        };

        setProducts((prevProducts) => [...prevProducts, newProduct]);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Nome do Produto" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Quantidade" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={styles.input} />
            <TextInput placeholder="Preço" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
            <Button title="Adicionar Produto" onPress={handleAddProduct} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
});

export default AddProductScreen;
