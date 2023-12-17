import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiSolidCart } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { CiSearch } from "react-icons/ci";
import Dropdown from 'react-bootstrap/Dropdown';
import EkartLogo from '../images/ekartLogo.png'
import NoteContext from './noteContext';
import './home.css'

function Home() {
    const [list, setList] = useState([]);
    const [newList, setNewList] = useState([]);
    const [search, setSearch] = useState("");
    const [cart, setCart] = useContext(NoteContext)

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then(res => setList(res.data))
            .catch(err => console.log(err))
    }, [])

    const openProduct = (product) => {
        navigate('/product', { state: [product,list] })
    }
    const onFormSubmit = (data) => {
        setSearch(data.in);
        setNewList(list.filter((product) => {
            return product.title.toLowerCase().includes(search.toLowerCase())
        }))
    }
    const navigateToCart = () => {
        navigate('/cart', { state: list })
    }


    return (
        <div className='containter min-vh-100 bg-body-secondary border m-auto' style={{minWidth:'350px'}}>
            <div style={{ justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '0', zIndex: '2' }} className='move-search bg-success p-1'>
                <div>
                    <img style={{width:'120px'}} src={EkartLogo} alt="" />
                    {(cart.length!==0)&&<p className='rounded-circle text-center cart-count' style={{position:'fixed',width:'15px',height:'15px',fontSize:'10px',zIndex:'3',backgroundColor:'antiquewhite'}}> <b>{cart.length}</b> </p>}
                </div>
                <div>
                    <form onChange={handleSubmit(onFormSubmit)}>
                        <input type="text" className='p-2 bg-success text-white border-bottom enlarge-search' placeholder='search here!' style={{outline: 'none',border:'none' }} {...register("in")} />
                        <CiSearch className='border-bottom text-white pb-2 mt-2' style={{fontSize:'30px'}}/>
                    </form>
                </div>
                <div className='d-flex'>
                    <div onClick={() => navigateToCart()} className='cart-hover rounded-2 p-1 ps-3 pe-3' style={{ fontSize: '20px', fontWeight: 'bold', padding: '5px', cursor: 'pointer' }}><BiSolidCart style={{ fontSize: '30px' }} /></div>
                    <Dropdown>
                        <Dropdown.Toggle className='text-dark' style={{ fontSize: '20px', fontWeight: 'bold' }} variant="success" id="dropdown-basic">
                            <MdAccountCircle style={{ fontSize: '30px', cursor: 'pointer',paddingRight:'5px' }}/>kalyan
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="profile">Profile</Dropdown.Item>
                            <Dropdown.Item href="customer care">My Orders</Dropdown.Item>
                            <Dropdown.Item href="feedback">Feedback</Dropdown.Item>
                            <Dropdown.Item href="logout">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            {search === "" ?
                <div className='w-75 m-auto mt-5' style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'space-around' }}>
                    {
                        list.map((product) => {
                            return <div key={product.id} style={{ height: '450px',minWidth:'250px' }} className="card w-25 p-4 text-center">
                                <img style={{ width: '150px' }} className='m-auto' src={product.image} alt="" />
                                <p>{product.title}</p>
                                <button onClick={() => openProduct(product)} className="btn btn-success">Details</button>
                            </div>
                        })
                    }
                </div>
                : <div className='w-75 m-auto mt-5' style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'space-around' }}>
                    {newList.length === 0 &&
                        <div>
                            <div className='m-auto bg-white rounded-4'>
                                <img className='w-25 d-block m-auto' src="http://indiashinetrophy.com/PRODUCT/no-product-found.jpg" alt="" />
                            </div>
                            <h4 className='p-3'>You might like this</h4>
                            <div className='m-auto mt-5' style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'space-around' }}>
                                {
                                    list.map((product) => {
                                        return <div key={product.id} style={{ height: '450px', width: '350px',minWidth:'200px' }} className="card p-4 text-center">
                                            <img style={{ width: '150px' }} className='m-auto' src={product.image} alt="" />
                                            <p>{product.title}</p>
                                            <button onClick={() => openProduct(product)} className="btn btn-success">Details</button>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    {newList.length !== 0 &&
                        newList.map((product) => {
                            return <div key={product.id} style={{ height: '450px',minWidth:'200px' }} className="card w-25 p-4 text-center">
                                <img style={{ width: '150px' }} className='m-auto' src={product.image} alt="" />
                                <p>{product.title}</p>
                                <button onClick={() => openProduct(product)} className="btn btn-success">Details</button>
                            </div>
                        })
                    }
                </div>}
        </div>
    );
}

export default Home;