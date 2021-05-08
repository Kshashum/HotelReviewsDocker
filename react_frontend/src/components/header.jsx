import { React, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { HotelContext } from '../context/hotelsContext';

const Header = () => {
    const { setLogin, login, setToken, setUserid } = useContext(HotelContext);
    const handleClick = () => {
        setUserid("")
        setToken("")
        setLogin(false)
    }

    const btn = login ? <button className='btn btn-danger' onClick={handleClick}>Logout</button> : <NavLink to='/Login'>
        <button className='btn btn-warning'>
            Login
</button>
    </NavLink>
    return (
        <header>
            <nav>
                <NavLink to="/">
                    <button className="btn btn-warning" >
                        Home
              </button>
                </NavLink>
                {" | "}
                <NavLink to="/Hotels">
                    <button className="btn btn-warning">
                        Hotels
              </button>
                </NavLink>
                {" | "}
                {btn}
            </nav>
            <br />
        </header>
    )
}

export default Header