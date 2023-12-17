import React from 'react';
import { useContext } from "react";
import NoteContext from "./noteContext";
import CardProduct from './cardProduct';
import { FaOpencart } from "react-icons/fa6";
import { useLocation,useNavigate } from 'react-router-dom';
import { FaRegStarHalf, FaRegStar } from "react-icons/fa";
import { BiSolidCart } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import EmptyCart from '../images/emptyCart.svg'
import './cart.css'

function Cart() {
    let [cart, setCart] = useContext(NoteContext)
    const location = useLocation();
    const list = location.state;
    const navigate = useNavigate();

    const addToCart=(product=>{
        let k = cart.filter((prod)=>prod.id===product.id)
        if(k.length===0) {
            setCart([...cart,product])
        }
    })

    const rating = (n) => {
        const stars = [];
        for (let i = 0; i < n; i++) {
            stars.push(<FaRegStar key={i} />);
        }
        return stars;
    };
    return (
        <div style={{minWidth:'350px'}}>
            <AiFillHome onClick={()=>navigate('/')} className='text-center btn btn-success p-2 rounded-circle' style={{fontSize:'50px',right:'40px',bottom:'50px',position:'fixed'}}/>
            {cart.length === 0 ?
                <div className='cart-flex'>
                    <div style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }} className='cart-width-1 p-2 m-3 rounded'>
                        <h2 className='p-2' style={{ borderBottom: '1px solid black' }}>Shopping cart<FaOpencart /></h2>
                        <div className='bg-body-secondary text-center'>
                            <img style={{width:'300px'}} className='d-block m-auto mt-5 p-5' src={EmptyCart} alt="" />
                            <h5 className='p-3'>YOUR CART IS EMPTY !</h5>
                        </div>
                    </div>
                    {<div style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }} className='cart-width-2 p-2 m-3 rounded'>
                        <h5 className='p-2 border-bottom'>Today's most selled products</h5>
                        {
                            list.map((product) => {
                                return <div className='w-100 d-flex m-2 ms-0 border p-2' style={{ gap: '25px' }}>
                                    <div style={{ width: '80px' }} className='p-2'><img style={{ width: '80px' }} src={product.image} alt="" /></div>
                                    <div>
                                        <h6>{product.title}</h6>
                                        <h5><b>${product.price}</b></h5>
                                        {rating(Math.floor(product.rating.rate))}
                                        {product.rating.rate > Math.floor(product.rating.rate) && <FaRegStarHalf />}
                                        <br />
                                        <button onClick={()=>addToCart(product)} style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }} className="m-2 ms-0 btn btn-success">Add to cart<BiSolidCart className='ms-2'/></button>
                                    </div>
                                </div>
                            })
                        }
                    </div>}
                </div>
                :
                <div className='cart-flex'>
                    <div style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }} className='cart-width-1 p-2 rounded'>
                        <h2 className='p-2' style={{ borderBottom: '1px solid black' }}>Shopping cart<FaOpencart /></h2>
                        {
                            cart.map((product) => <CardProduct product={product} />)
                        }
                    </div>
                    <div style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }} className='cart-width-2 p-2 rounded'>
                        <h2 className='p-2' style={{ borderBottom: '1px solid black' }}>Order Details</h2>
                        <div className='m-2' style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <h6>Cart Total</h6>
                                <h6>Delivery Fee</h6>
                                <h6>Platform Fee</h6>
                                <h5><b>Amount Payable</b></h5>
                            </div>
                            <div style={{ textAlign: 'end' }}>
                                <h6>${0.00}</h6>
                                <h6>$4.00</h6>
                                <h6>$2.00</h6>
                                <h5><b>${0 + 6.00}</b></h5>
                            </div>
                        </div>
                        <button className="w-100 btn btn-success"><b>Proceed to Buy</b></button>
                        <h5 className='p-2 border-bottom mt-3'>Today's most selled products</h5>
                        {
                            list.map((product) => {
                                return <div className='w-100 d-flex m-2 ms-0 border p-2' style={{ gap: '25px' }}>
                                    <div style={{ width: '80px' }} className='p-2'><img style={{ width: '80px' }} src={product.image} alt="" /></div>
                                    <div>
                                        <h6>{product.title}</h6>
                                        <h5><b>${product.price}</b></h5>
                                        {rating(Math.floor(product.rating.rate))}
                                        {product.rating.rate > Math.floor(product.rating.rate) && <FaRegStarHalf />}
                                        <br />
                                        <button onClick={()=>addToCart(product)} style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }} className="m-2 ms-0 btn btn-light">Add to cart<BiSolidCart className='ms-2'/></button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            }
        </div>
    );

}

export default Cart;