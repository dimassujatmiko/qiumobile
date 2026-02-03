import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: string; // "Rp 100.000"
    image: string;
    quantity: number;
    rawPrice: number; // 100000
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: any) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, change: number) => void;
    totalPrice: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const parsePrice = (priceString: string) => {
        return parseInt(priceString.replace(/[^0-9]/g, ''), 10);
    };

    const addToCart = (product: any) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [
                ...prevItems,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                    rawPrice: parsePrice(product.price),
                },
            ];
        });
    };

    const removeFromCart = (id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, change: number) => {
        setItems((prevItems) =>
            prevItems
                .map((item) => {
                    if (item.id === id) {
                        const newQuantity = item.quantity + change;
                        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
                    }
                    return item;
                })
        );
    };

    const totalPrice = items.reduce((sum, item) => sum + item.rawPrice * item.quantity, 0);
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, totalPrice, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
