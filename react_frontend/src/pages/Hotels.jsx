import axios from 'axios'
import { React, useContext, useState } from 'react'
import { HotelContext } from '../context/hotelsContext'
import { useHistory } from 'react-router-dom'

const Hotels = () => {
    const [newHotel, setnewHotel] = useState('')
    const [newHotelLocation, setnewHotelLocation] = useState('')
    const [newHotelPrice, setnewHotelPrice] = useState('')
    const { hotels, setHotels, login } = useContext(HotelContext)
    const history = useHistory()

    const handleReview = (e, hotelid) => {
        history.push(`/Reviews/${hotelid}`)
    }
    const handleUpdate = (e, hotelid) => {
        e.stopPropagation();
        history.push(`/Hotel/${hotelid}/update`)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/api/v1/hotels', {
            hotelname: newHotel,
            Location: newHotelLocation,
            Price: newHotelPrice
        }).then((res) => {
            const temp = [...hotels]
            temp.push(res.data[0])
            setHotels(temp)
        }).catch(err => console.log(err.message))


    }
    const handleDelete = async (e, hotelid) => {
        e.stopPropagation();
        axios.delete(`http://localhost:4000/api/v1/hotels/${hotelid}`).then((res) => {
            setHotels(
                hotels.filter((hotel) => {
                    return hotel.hotelid !== hotelid;
                })
            );
        }).catch(err => console.log(err.message))

    }
    const hotelRows = (hotel) => {
        return (
            <tr onClick={(e) => handleReview(e, hotel.hotelid)}>
                <td>{hotel.hotelname}</td>
                <td>{hotel.price}</td>
                <td>{hotel.avg && hotel.avg}</td>
                <td>{hotel.location}</td>
                {login &&
                    <button className='btn btn-warning' onClick={(e) => handleUpdate(e, hotel.hotelid)}> Update</button>
                }
                {login && "  |  "}
                {login &&
                    <button className='btn btn-danger' onClick={(e) => handleDelete(e, hotel.hotelid)}>Delete</button>
                }
            </tr>
        )
    }
    return (
        <div className='container'>
            <form>
                <div className="form-row">
                    <div className='col'>
                        <input type='text' className='form-control' value={newHotel} onChange={(e) => { setnewHotel(e.target.value) }} placeholder='new Hotel name'></input>
                    </div>
                    <div className='col'>
                        <input type='text' className='form-control' value={newHotelLocation} onChange={(e) => { setnewHotelLocation(e.target.value) }} placeholder='Location'></input>
                    </div>
                    <div className='col'>
                        <input type='text' className='form-control' value={newHotelPrice} onChange={(e) => { setnewHotelPrice(e.target.value) }} placeholder='Price'></input>
                    </div>
                    {"   "}
                    <button className='btn btn-primary' onClick={handleSubmit}>Add</button>
                </div>
            </form>
            <table className="table table-striped table-dark m-3 p-2">
                <thead>
                    <tr>
                        <th scope="col">Hotel Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels.map(hotelRows)}
                </tbody>
            </table>
        </div>
    )
}

export default Hotels
