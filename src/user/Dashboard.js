import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { userPropertyBookings } from '../actions/property';
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import BookingCard from "../components/cards/BookingCard";

const Dashboard = () => {

    const [booking, setBooking] = useState([]);
    const {auth: {token}} = useSelector((state) => ({...state}));

    useEffect(() => {
        loadUserBookings();
    }, [])

    const loadUserBookings = async () => {
        const res = await userPropertyBookings(token);
        console.log(res);
        setBooking(res.data);
    }

    return(
        <>
            <div className="container-fluid bg-info p-5">
                <ConnectNav />
            </div>

            <div className="container-fluid p-4">
                <DashboardNav />
            </div>

            <div className="container">
               <div className="row">
                    <div className="col-md-10">
                        <h2>Your Bookings</h2>
                    </div>
                    <div className="col-md-2">
                        <Link to='/' className='btn btn-primary'>Browse Properties</Link>
                    </div>
               </div>
            </div>

            <div className="row">
                {booking.map((b) => (
                    <BookingCard key={b} property={b.property} session={b.session} orderedBy={b.orderedBy} />
                ))}
            </div>
        </>
    )
}

export default Dashboard;