import React, { useState } from "react";
import { View, Button, FlatList, StyleSheet, Alert, Text } from "react-native";

const SaleScreen = ({ products, setProducts }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [salesHistory, setSalesHistory] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    const handleSale = (quantity) => {
        if (!selectedProduct) {
            Alert.alert("Selecione um produto para vender!");
            return;
        }

        if (quantity <= 0 || quantity > selectedProduct.quantity) {
            Alert.alert("Quantidade inválida!");
            return;
        }

        // Atualizar a quantidade do produto em estoque
        const updatedProducts = products.map((p) => (p.id === selectedProduct.id ? { ...p, quantity: p.quantity - quantity } : p));

        // Adicionar a venda ao histórico
        const saleAmount = selectedProduct.price * quantity; // Calcular o valor da venda
        const newSale = {
            productName: selectedProduct.name,
            quantity,
            amount: saleAmount,
        };
        setSalesHistory((prev) => [...prev, newSale]);
        setTotalRevenue((prev) => prev + saleAmount); // Atualizar o faturamento

        setProducts(updatedProducts);
        Alert.alert("Venda registrada com sucesso!");
        setSelectedProduct(null); // Limpa o produto selecionado após a venda
    };

    const renderItem = ({ item }) => (
        <View style={styles.productItem}>
            <Text>{item.name}</Text>
            <Text>Quantidade disponível: {item.quantity}</Text>
            <Button title="Selecionar" onPress={() => setSelectedProduct(item)} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Produto Selecionado: {selectedProduct ? selectedProduct.name : "Nenhum"}</Text>
            <Text>Quantidade a Vender:</Text>
            <Button title="Vender 1" onPress={() => handleSale(1)} disabled={!selectedProduct || selectedProduct.quantity <= 0} />
            <Button title="Vender 2" onPress={() => handleSale(2)} disabled={!selectedProduct || selectedProduct.quantity < 2} />

            <FlatList data={products} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} style={styles.productList} />

            <Text style={styles.revenue}>Faturamento Total: R$ {totalRevenue.toFixed(2)}</Text>

            <Text style={styles.historyTitle}>Histórico de Vendas:</Text>
            <FlatList
                data={salesHistory}
                renderItem={({ item }) => (
                    <Text>
                        {item.quantity} x {item.productName} - R$ {item.amount.toFixed(2)}
                    </Text>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.historyList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    revenue: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 10,
    },
    historyTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 20,
    },
    productItem: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: "#d5d5d5",
        borderRadius: 5,
    },
    productList: {
        marginTop: 20,
    },
    historyList: {
        marginTop: 10,
    },
});

export default SaleScreen;
