import { useState, useEffect } from "react";
const axios = require('axios');


const App = ()=>{

    const [data, setData] = useState('')

    useEffect(()=>{
        axios.get('http://localhost:3000/products')
        .then((response)=>{

            setData(response.data)
        })
    },[])

    



    return (
        <>
        <div className="App">
            <h1> Welcome To Our Shop</h1>
            <div className="main">
                { (data !== '') ? 

                    data.map( (e)=>{
                       return <div className="products">
                           <div className="secoundproducts">
                           <span className="id">ID : <spn className="result2">{e._id}</spn></span>
                    <span>Phone Name: <spn className="result">{e.phoneName}</spn></span>
                    <span>Model: <span className="result">{e.model}</span></span>
                    <span>Color: <span className="result">{e.color}</span></span>
                    <div className="priceright">
                    <span className="price">Price: <span className="result3">{e.price} €</span></span>
                    </div>
                    </div>
                    </div>
                    })
                    : 
                    ''
                }

                
                
                {/* {data !== '' ? console.log(data) : null} */}
                {/* {console.log(data)} */}


            </div>
        </div>
        </>
    )
}

export {App};