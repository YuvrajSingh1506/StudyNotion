import { createSlice } from "@reduxjs/toolkit"

import { toast } from "react-hot-toast";
const initialState = {
  totalItems: JSON.parse(localStorage.getItem("totalItems")) || 0,
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  total: JSON.parse(localStorage.getItem("total")) || 0,
};
const cartSlice = createSlice({
    name : "cart",
    initialState : initialState,
    reducers : {
        setTotalItems(state, value){
            state.totalItems = value.payload;
            
        },
        addToCart(state,value){
            const course = value.payload;
            const index = state.cart.findIndex((item) => item._id == course._id);
            if(index >= 0){
                toast.error("Course already in cart")
                return
            }
            state.totalItems ++;
            state.total += Number(course.price) || 0;
            state.cart.push(course);
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            toast.success("Course added to cart");
        },
        removeFromCart(state, value){
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)
            if(index >= 0){
                state.totalItems--
                state.total -= state.cart[index].price
                state.cart.splice(index, 1)
                        // Update to localstorage
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                        // show toast
                toast.success("Course removed from cart")

            }

            toast.success("Course removed from cart");
        },
       resetCart(state){
            state.totalItems = 0;
            state.cart = [];
            state.total = 0;

            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
}
       
     }
})
export const {setTotalItems, addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;