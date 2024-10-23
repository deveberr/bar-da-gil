import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductProvider } from "./ProductContext";
import MainScreen from "./screens/MainScreen";
import AddProductScreen from "./screens/AddProductScreen";
import EditProductScreen from "./screens/EditProductScreen";
import SaleScreen from "./screens/SaleScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    const [products, setProducts] = useState([]);

    return (
        <ProductProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen name="Produtos">{(props) => <MainScreen {...props} products={products} setProducts={setProducts} />}</Stack.Screen>
                    <Stack.Screen name="AddProduct">{(props) => <AddProductScreen {...props} setProducts={setProducts} />}</Stack.Screen>
                    <Stack.Screen name="EditProduct">{(props) => <EditProductScreen {...props} products={products} setProducts={setProducts} />}</Stack.Screen>
                    <Stack.Screen name="Sale">{(props) => <SaleScreen {...props} products={products} setProducts={setProducts} />}</Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </ProductProvider>
    );
}
