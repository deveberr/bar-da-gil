import React from "react";
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const MainScreen = ({ products, setProducts, navigation }) => {
    const renderItem = ({ item }) => (
        <View style={styles.productItem}>
            <Text>{item.name}</Text>
            <Text>Quantidade: {item.quantity}</Text>
            <Text>Preço: R$ {item.price}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("EditProduct", { product: item, setProducts })}>
                    <Text style={styles.button}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text style={styles.button}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const handleDelete = (id) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    return (
        <View style={styles.container}>
            {products.length === 0 ? ( // Verifica se a lista de produtos está vazia
                <Text style={styles.emptyMessage}>Nenhum produto adicionado</Text>
            ) : (
                <FlatList data={products} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
            )}
            <Button title="Adicionar Produto" onPress={() => navigation.navigate("AddProduct", { setProducts })} />
            <Button title="Vendas" onPress={() => navigation.navigate("Sale")} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    productItem: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: "#d5d5d5",
        borderRadius: 5,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        color: "blue",
        marginTop: 5,
    },
    emptyMessage: {
        textAlign: "center",
        fontSize: 18,
        color: "gray",
        marginTop: 20,
    },
});

export default MainScreen;
