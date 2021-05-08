import axios from 'axios'
import { React, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { HotelContext } from '../context/hotelsContext'

const UpdateHotel = () => {
    const history = useHistory()
    const hotelid = useParams()
    const [hotelname, setHotelName] = useState("")
    const [hotelloc, setHotelloc] = useState("")
    const [hotelprice, setHotelprice] = useState("")
    const { hotels, setHotels } = useContext(HotelContext)
    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.put("http://localhost:4000/api/v1/hotels", {
            hotelid: hotelid.hotelid,
            hotelname,
            Location: hotelloc,
            Price: hotelprice
        }).then((res) => {
            setHotels(() => {
                const temp = hotels.filter((hotel) => { return hotel.hotelid !== hotelid.hotelid })
                temp.push(res.data[0])
                return temp
            }
            )
            history.push('/Hotels')
        }
        ).catch(err => console.log(err.message))
    }
    return (
        <div>
            <form>
                <div className="form-row">
                    <div className='col'>
                        <input type='text' className='form-control' value={hotelname} onChange={(e) => { setHotelName(e.target.value) }} placeholder='new Hotel name'></input>
                    </div>
                    <div className='col'>
                        <input type='text' className='form-control' value={hotelloc} onChange={(e) => { setHotelloc(e.target.value) }} placeholder='Location'></input>
                    </div>
                    <div className='col'>
                        <input type='text' className='form-control' value={hotelprice} onChange={(e) => { setHotelprice(e.target.value) }} placeholder='Price'></input>
                    </div>
                    {"   "}
                    <button className='btn btn-primary' onClick={(e) => { handleSubmit(e) }}>Update</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateHotel
