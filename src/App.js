import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

import { useLocalStorage } from './hooks/useLocalStorage'

// Contexts
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	// use local storage for my shopping addiction
	const [cart, setCart] = useLocalStorage('myCart');

	const addItem = item => {
		// add the given item to the cart
		if(cart.find(i => i.id === item.id) === undefined){
			setCart([...cart, item]);
		}
	};

	const removeItem = itemId => {
		// remove items from the cart
		setCart(cart.filter(item => item.id !== itemId))
	}

	return (
		<div className="App">
			<ProductContext.Provider value={{products, addItem}}>
				<CartContext.Provider value={cart}>
					<Navigation />
					{/* Routes */}
					<Route exact path="/" component={Products} />
					<Route path="/cart" render={props => < ShoppingCart {...props} removeItem={removeItem} />} /> 
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
