import React , { useState } from 'react';
import './FoodDetails.css';
import allFoods from '../../Resources/foods.json';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';


const FoodDetails = (props) => {
    const {id} = useParams();
    const currentFood = allFoods.find(food=> food.id == id);
    const [quantity, setQuantity] = useState(1);
    useState(() => {
        if(currentFood.quantity){
            setQuantity(currentFood.quantity)
        }
    },[currentFood.quantity])
    const finalCartHandler = (currentFood) => {
        currentFood.quantity = quantity;
        props.cartHandler(currentFood);
    }

    return (
        <div className="food-details my-5 container">
            <div className="row">
                <div className="col-md-6 pr-md-4">
                    <h1>{currentFood.name}</h1>
                    <p className="my-5">{currentFood.fullDescription}</p>
                    <div className="d-flex  my-4">
                        <h2 className="price">${currentFood.price.toFixed(2)}</h2>

                        <div className="cart-controller ml-3 btn">
                            <button className="btn" onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}>-</button> {quantity} <button className="btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>
                    <button className="btn btn-danger btn-rounded mb-2" onClick={() => finalCartHandler(currentFood)}><FontAwesomeIcon icon={faCartArrowDown} /> Add</button>

                    <div className="more-images mt-5 ">
                        {currentFood.images.map(img=> <img className="mr-4" height="150px" src={img} alt=""/>)}
                    </div>
                </div>
                <div className="col-md-6">
                    <img className="img-fluid" src={currentFood.images[0]} alt=""/>
                </div>

            </div>
        </div>
    );
};

export default FoodDetails;