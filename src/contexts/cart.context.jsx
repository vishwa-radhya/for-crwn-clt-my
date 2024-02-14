import { createContext,useState,useEffect } from "react";

const addCartItem=(cartItems,productToAdd)=>{
    const existingCartItem =cartItems.find((cartItem)=>
    cartItem.id===productToAdd.id);

    if(existingCartItem){
        return cartItems.map((cartItem)=>cartItem.id===
        productToAdd.id ? {...cartItem,quantity:cartItem.quantity+1}
        : cartItem
        )
    }
    //find if cartitems contains producttoadd
    //if found,increment quantity
    //return new arrayt with modified cartitem / new cart items
    return [...cartItems,{...productToAdd,quantity:1}];
}

export const CartContext=createContext({
    isCartOpen :false,
    setIsCartOpen :()=>{},
    cartItems:[],
    addItemToCart:()=>{},
    cartCount :0
});
/* 
product{id,name,price,imageUrl},
cart item{id,name,price,imageUrl,quantity}
*/
export const CartProvider = ({children})=>{
    const [isCartOpen,setIsCartOpen]=useState(false);
    const [cartItems,setCartItems]=useState([]);
    const [cartCount,setCartCount]=useState(0);

useEffect(()=>{
    const newCartCount = cartItems.reduce((tot,cartItem)=>tot+cartItem.quantity,0)
    setCartCount(newCartCount);
},[cartItems]); //useeffect runs everytime when the dependancy arr changes

    const addItemToCart=(productToAdd)=>{ 
/*this function going to run whenever the user clicks
the product and we have to things whether to add items 
or display items just to increment them after*/    
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    const value ={isCartOpen,setIsCartOpen,addItemToCart,cartItems,cartCount};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}