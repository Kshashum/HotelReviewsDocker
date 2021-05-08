import axios from 'axios'
import { React, useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { HotelContext } from '../context/hotelsContext'

const Reviews = () => {
    const history = useHistory()
    const hotelid = useParams()
    const [reviews, setReviews] = useState([])
    const [name, setName] = useState("")
    const [review, setReview] = useState("")
    const [rating, setRating] = useState("")
    const [hotelname, setHotelname] = useState("")
    const [hr, setHr] = useState("")
    const [count, setCount] = useState("")
    const { login, userid, token, setHotels } = useContext(HotelContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (login === true) {
            axios.post('http://localhost:4000/api/v1/reviews', {
                userid,
                hotelid: hotelid.hotelid,
                review,
                name,
                rating
            }, {
                headers: {
                    token
                }
            }).then(res => {
                if (res.status === 200) {
                    setCount(count + 1)
                }
                else if (res.status === 401) {
                    history.push('/unauthorized')
                }
            })
        }
        else {
            history.push('/login')
        }

    }
    useEffect(() => {
        axios.get(`http://localhost:4000/api/v1/reviews/${hotelid.hotelid}`).then((res) => {
            setReviews(res.data)
        }).catch(err => console.log(err.message))
        axios.get(`http://localhost:4000/api/v1/hotels/${hotelid.hotelid}`).then((res) => {
            console.log(res.data)
            setHotelname(res.data[0].hotelname)
            setHr(parseFloat(res.data[0].avg))
            setCount(parseInt(res.data[0].count))
        }).catch(err => { console.log(err.message) })
        axios.get("http://localhost:4000/api/v1/hotels").then((res) => {
            setHotels(res.data)
        }).catch((err) => { console.log(err.message) })

    }, [count, hotelid, setHotels])
    return (
        <div className='container'>
            <div className="card text-white bg-success mb-3">
                <div className="card-header">{hotelname}</div>
                <div className="card-body">
                    <h5 className="card-title">{`Average Rating: ${hr}`}</h5>
                    <h5 className="card-text">{`Number of Reviews: ${count}`}</h5>
                </div>
            </div>
            <div className="card-group">
                {reviews.map((review) => {
                    return (<div className="card text-white bg-dark mb-3 mr-4" style={{ maxWidth: "30%" }}>
                        <div className="card-header">{`Rating: ${review.rating}`}</div>
                        <div className="card-body">
                            <p className="card-text">{review.review}</p>
                            <h5 className="card-title">{review.name}</h5>
                        </div>
                    </div>)
                })}
            </div>
            <form>
                <div className="form-row">
                    <div className='col'>
                        <input type='text' className='form-control' value={review} onChange={(e) => { setReview(e.target.value) }} placeholder='Review'></input>
                    </div>
                    <div className='col'>
                        <input type='text' className='form-control' value={rating} onChange={(e) => { setRating(e.target.value) }} placeholder='Rating'></input>
                    </div>
                    <div className='col'>
                        <input type='text' className='form-control' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='name'></input>
                    </div>
                    {"   "}
                    <button className='btn btn-primary' onClick={(e) => { handleSubmit(e) }}>Add Review</button>
                </div>
            </form>
        </div>
    )
}

export default Reviews
