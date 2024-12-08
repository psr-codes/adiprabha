"use client";
import { useEffect } from "react";
// import { getUserCart } from "@/api/cart/getUserCart";
import { getUserCart } from "@/api/cart-wishlist/getUserCartWishlist";

import { useAuth } from "@/hooks/useAuth";

import Cart from "@/components/Cart";
import globalStore from "@/store/globalStore";

export default function Home() {
    const { cartItems, addToCart, removeFromCart, isInCart } = globalStore();
    const { user, loading } = useAuth();
    useEffect(() => {
        const f = async () => {
            if (!user) {
                return;
            }
            const data = await getUserCart(user.email);
            console.log("user cart: ", data);
            data.forEach((item) => {
                addToCart(item);
            });
        };
        f();
    }, [user]);
    return (
        <section className="text-4xl w-[100vw] ">
            <Cart />
        </section>
    );
}
