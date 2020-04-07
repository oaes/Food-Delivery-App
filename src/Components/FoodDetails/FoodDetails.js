import React , { useState,useEffect } from 'react';
import './FoodDetails.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faCheckCircle } from '@fortawesome/free-solid-svg-icons';



const FoodDetails = (props) => {
    const [currentFood,setCurrentFood] = useState({})
    const {id} = useParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedBigImg, setSelectedBigImg] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        fetch("https://restaurent-database.herokuapp.com/food/"+ id)
        .then(res=> res.json())
        .then(data => {
            setCurrentFood(data);

        })
        .catch(err => console.log(err))

        if(currentFood.images){
            setSelectedBigImg(currentFood.images[0]);
        }
      
    }, [currentFood.name])
    
    const finalCartHandler = (currentFood) => {
        currentFood.quantity = quantity;
        props.cartHandler(currentFood);
        setIsSuccess(true);
    }
    
    if(isSuccess){
        setTimeout(() => setIsSuccess(false),1500)
    }
    console.log(isSuccess)
    return (

        <div className="food-details my-5 pt-5 container">
    
            {
            currentFood.name &&
            
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
                    <div className="action d-flex align-items-center">
                        <button className="btn btn-danger btn-rounded mb-2" onClick={() => finalCartHandler(currentFood)}><FontAwesomeIcon icon={faCartArrowDown} /> Add</button>
                        {isSuccess &&
                         <p className="ml-3 success-mgs text-success"><FontAwesomeIcon icon={faCheckCircle} />  Item added to Cart</p>
                         
                        }
                    </div>

                    <div className="more-images mt-5 ">
                        {currentFood.images.map((img ,index) => <img onClick={() => setSelectedBigImg(currentFood.images[index])} className={currentFood.images[index] === selectedBigImg ? "mr-4 small-img active-small-img" : "mr-4 small-img"} height="150px" src={img} alt=""/>)}
                    </div>
                </div>
                <div className="col-md-6">
                    <img className="img-fluid" src={selectedBigImg} alt=""/>
                </div>

            </div>
            }
        </div>
        
    );
};

export default FoodDetails;