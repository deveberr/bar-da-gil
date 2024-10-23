import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

const EditProductScreen = ({ navigation, route }) => {
    const { product, setProducts } = route.params;
    const [name, setName] = useState(product.name);
    const [quantity, setQuantity] = useState(product.quantity.toString());
    const [price, setPrice] = useState(product.price.toString());

    const handleEditProduct = () => {
        if (!name || !quantity || !price) {
            Alert.alert("Por favor, preencha todos os campos");
            return;
        }

        const updatedProduct = {
            id: product.id,
            name,
            quantity: parseInt(quantity),
            price: parseFloat(price),
        };

        setProducts((prevProducts) => prevProducts.map((item) => (item.id === product.id ? updatedProduct : item)));

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Nome do Produto" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Quantidade" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={styles.input} />
            <TextInput placeholder="Preço" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
            <Button title="Editar Produto" onPress={handleEditProduct} />
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

export default EditProductScreen;
