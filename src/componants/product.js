import { useLocation, useNavigate } from "react-router-dom";
import { FaRegStarHalf, FaRegStar } from "react-icons/fa";
import { useContext, useState } from 'react';
import NoteContext from './noteContext';
import { AiFillHome } from "react-icons/ai";
import './product.css'

function Product() {
    const location = useLocation();
    const [product,list] = location.state

    const navigate = useNavigate();
    const [cart, setCart] = useContext(NoteContext)
    const [rasool, setRasool] = useState(() => {
        const isProductInCart = cart.some((x) => x.title === product.title);
        return isProductInCart ? 'Go to cart' : 'Add to cart';
    });


    const addToCart = () => {
        let k = cart.filter((x) => x.title === product.title);
        if (k.length === 0) {
            setCart([...cart, product]);
            alert("Product added Successfully");
            setRasool("Go to cart");
        } else {
            navigate('/cart',{state:list});
        }
    }


    const rating = (n) => {
        const stars = [];
        for (let i = 0; i < n; i++) {
            stars.push(<FaRegStar key={i} />);
        }
        return stars;
    };
    return (
        <div>
            <AiFillHome onClick={() => navigate('/')} className='btn bg-success text-white p-1' style={{ fontSize: '50px', borderRadius: '35px 0 0 35px', width: '120px', right: '0', top: '50px', position: 'fixed' }} />
            <div style={{ boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px' }} className="product-width container product-flex flex-wrap rounded-2 mt-5 product-pad">
                <div className="m-auto"><img style={{ width: '250px',display:'block',margin:'auto' }} src={product.image} alt="" /></div>
                <div className="product-content-width text-center m-auto p-2">
                    <h4>{product.title}</h4>
                    <p>"{product.description}"</p>
                    <h4 style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }} className="p-1 m-5"><b>Price: ${product.price}</b></h4>
                    <div style={{ justifyContent: 'space-between' }} className="d-flex">
                        <div className="text-start">
                            <p className="m-0 p-0">{product.rating.count} ratings</p>
                            <div className="d-flex">
                                {rating(Math.floor(product.rating.rate))}
                                {product.rating.rate > Math.floor(product.rating.rate) && <FaRegStarHalf />}
                                <h6>{product.rating.rate}</h6>
                            </div>
                        </div>
                        <div>
                            <h6>Category: {product.category}</h6>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '50px' }}>
                        <button onClick={addToCart} style={{width:'110px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }} className=" btn btn-light">{rasool}</button>
                        <button style={{width:'115px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }} className=" btn btn-light">Buy now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;