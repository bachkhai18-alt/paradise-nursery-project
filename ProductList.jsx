import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/CartSlice';
import CartItem from './CartItem';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);

    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: "$12" }
            ]
        },
        {
            category: "Aromatic",
            plants: [
                { name: "Lavender", image: "https://cdn.pixabay.com/photo/2017/07/10/19/51/lavender-2491254_1280.jpg", cost: "$20" },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", cost: "$15" }
            ]
        },
        {
            category: "Easy Care",
            plants: [
                { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816941_1280.jpg", cost: "$10" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", cost: "$18" }
            ]
        }
    ];

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div>
            <nav className="navbar">
                <div onClick={() => window.location.reload()}>Home</div>
                <div onClick={() => setShowCart(false)}>Plants</div>
                <div onClick={() => setShowCart(true)}>
                    Cart <span>({totalItems})</span>
                </div>
            </nav>

            {showCart ? (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            ) : (
                <div className="product-listing">
                    {plantsArray.map((cat, idx) => (
                        <div key={idx}>
                            <h2>{cat.category}</h2>
                            <div className="grid">
                                {cat.plants.map(plant => (
                                    <div className="card" key={plant.name}>
                                        <img src={plant.image} alt={plant.name} />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.cost}</p>
                                        <button 
                                            disabled={cart.some(item => item.name === plant.name)}
                                            onClick={() => dispatch(addItem(plant))}
                                        >
                                            {cart.some(item => item.name === plant.name) ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;
