import React, { useState } from 'react';
import { IoBagRemoveOutline, IoBagAddOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { useContext } from 'react';
import NoteContext from './noteContext';

function CardProduct({ product}) {
    let [cart, setCart] = useContext(NoteContext)

    const [count,setCount] = useState(1)

    const addCount = () => {
        setCount(count + 1);
    }
    const removeCount = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    const deleteItem = () => {
        setCart(cart.filter((item) => item.id !== product.id));
    }
    return (
        <div className='d-flex p-4 rounded-3 m-2 ' style={{ gap: '4rem', alignItems: 'center', borderLeft: '5px solid green', borderBottom: '1px solid green' }}>
            <div className='w-25'><img className='w-50 d-block m-auto' src={product.image} alt="" /></div>
            <div className='w-75'>
                <h5>{product.title}</h5>
                <p className="text-success">In stock</p>
                <h5>${product.price}</h5>
                <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '20px', width: '70px', display: 'flex', justifyContent: 'space-between' }}>
                        <div><IoBagRemoveOutline style={{ cursor: 'pointer' }} onClick={() => removeCount()} /></div>
                        <div>{count}</div>
                        <div><IoBagAddOutline style={{ cursor: 'pointer' }} onClick={() => addCount()} /></div>
                    </div>
                    <div><button onClick={deleteItem} style={{ fontSize: '25px' }} className="btn btn-light m-3 ms-0 me-0"><MdOutlineDelete /></button></div>
                </div>
            </div>
        </div>
    );
}

export default CardProduct;