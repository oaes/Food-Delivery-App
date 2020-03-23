import React from 'react';
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom';
import './Shipment.css';
import { useState } from 'react';

const Shipment = (props) => {
    const { register, handleSubmit, watch, errors } = useForm()
    const onSubmit = data => props.deliveryDetailsHandler(data);
    const { todoor, road, flat, businessname, address} = props.deliveryDetails;

    const subTotal = props.cart.reduce((acc,crr) => {
        return acc + (crr.price * crr.quantity) ;
    },0)

    const totalQuantity = props.cart.reduce((acc,crr) => {
        return acc + crr.quantity ;
    },0)
    const tax = (subTotal / 100) * 5;
    const deliveryFee = totalQuantity && 2;
    const grandTotal = subTotal + tax + deliveryFee;
    return (
        <div className="shipment container my-5">
            <div className="row">
                <div className="col-md-5">
                    <h4>Edit Delivery Details</h4>
                    <hr/>
                    <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                    
                        <div className="form-group">
                            <input name="todoor" className="form-control" ref={register({ required: true })} defaultValue={todoor} placeholder="Delivery To Door"/>
                            {errors.todoor && <span className="error">This Option is required</span>}
                        </div>
                        <div className="form-group">
                            <input name="road" className="form-control" ref={register({ required: true })} defaultValue={road} placeholder="Road No"/>
                            {errors.road && <span className="error">Road No is required</span>}
                        </div>
                        <div className="form-group">
                            <input name="flat" className="form-control" ref={register({ required: true })} defaultValue={flat} placeholder="Flat, Suite or Floor"/>
                            {errors.flat && <span className="error">Flat, Suite or Floor is required</span>}
                        </div>
                        <div className="form-group">
                            <input name="businessname" className="form-control" ref={register({ required: true })} defaultValue={businessname} placeholder="Business name"/>
                            {errors.businessname && <span className="error">Business name is required</span>}
                        </div>
                        <div className="form-group">
                            <textarea name="address" ref={register({ required: true })} placeholder="Address" className="form-control" cols="30" rows="2">{address}</textarea>
                            {errors.address && <span className="error">Password is required</span>}
                        </div>
                        
                        <div className="form-group">
                            <button className="btn btn-danger btn-block" type="submit">Save & Continue</button>
                        </div>
                    </form>
                </div>
                <div className="offset-md-2 col-md-5">
                    <div className="restaurant-info mb-5">
                        <h4>Form <strong> Star Kabab And Restaura</strong></h4>
                        <h5>Arriving in 20-30 min</h5>
                        <h5>107 Rd No 9</h5>
                    </div>
                   
                    {
                        props.cart.map(item => 
                            <div className="single-checkout-item mb-3 bg-light rounded d-flex align-items-center justify-content-between p-3">
                                <img width="100px" src={item.images[0]} alt=""/>
                                <div>
                                    <h6>{item.name}</h6>
                                    <h4 className="text-danger">${item.price.toFixed(2)}</h4>
                                    <p>Delivery free</p>
                                </div>
                                <div className="checkout-item-button ml-3 btn">
                                    <button className="btn font-weight-bolder">-</button> <button className="btn bg-white rounded">{item.quantity}</button> <button className="btn font-weight-bolder">+</button>
                                </div>
                            </div>
                        )
                    }
                  
                    <div className="cart-calculation">
                        <p className="d-flex justify-content-between"><span>Sub Total . {totalQuantity} Item</span> <span>${subTotal.toFixed(2)}</span></p>
                        <p className="d-flex justify-content-between"><span>Tax</span> <span>${tax.toFixed(2)}</span></p>
                        <p className="d-flex justify-content-between"><span>Delivery Fee</span> <span>${deliveryFee}</span></p>
                        <p className="h5 d-flex justify-content-between"><span>Total</span> <span>${grandTotal.toFixed(2)}</span></p>
                        {
                        todoor && road && flat && businessname && address ? 
                        <Link to="/order-complete">
                            <button onClick={() => props.clearCart()}  className="btn btn-block btn-danger btn-secondary">Check Out Your Food</button>
                        </Link>
                        :
                        <button disabled className="btn btn-block btn-secondary">Check Out Your Food</button>
                        
                    }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipment;