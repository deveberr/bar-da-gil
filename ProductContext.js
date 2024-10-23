// ProductContext.js
import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    return <ProductContext.Provider value={{ products, setProducts }}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
    return useContext(ProductContext);
};
