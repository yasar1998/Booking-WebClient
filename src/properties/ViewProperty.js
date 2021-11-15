import React, {useState, useEffect} from "react";
import { read } from "../actions/property";
import { diffDays } from "../actions/property";
import { isAlreadyBooked } from "../actions/property";
import moment from "moment";
import { useSelector } from 'react-redux';
import { getSessionId } from "../actions/stripe";
import { loadStripe } from '@stripe/stripe-js';

const ViewProperty = ({match, history}) => {

    const [property, setProperty] = useState({});
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [alreadyBooked, setAlreadyBooked] = useState(false);

    const { auth } = useSelector((state) => ({...state}));

    useEffect(() => {
        loadSellerProperty();
    }, [])

    useEffect(() => {
       if(auth && auth.token){
            isAlreadyBooked(auth.token, match.params.propertyId).then(res => {
                // console.log(res);
                if(res.data.ok)
                    setAlreadyBooked(res.data.ok);
            })
       }
    }, [])
    

    const loadSellerProperty = async () => {
        let res = await read(match.params.propertyId);
        // console.log(res);
        setProperty(res.data);
        setImage(`${process.env.REACT_APP_API}/property/image/${res.data._id}`)
    }

    const handleClick = async (e) => {
        e.preventDefault();

        if(!auth || !auth.token){
            history.push("/login");
            return;
        }

        setLoading(true);
        if(!auth) history.push('/login');
        // console.log(auth.token, match.params.propertyId);
        let res = await getSessionId(auth.token, match.params.propertyId);
        // console.log('get sessionid response', res.data.sessionId);
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
        stripe.redirectToCheckout({
            sessionId: res.data.sessionId,
        })
        .then((result) => console.log(result))
    }

    return (
        <>
            <div className="container-fluid bg-info p-5 text-center">
                <h2>{property.title}</h2>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <br />
                        <img src={image} alt={property.title} className="img img-fluid m-2"  />
                    </div>

                    <div className="col-md-6">
                        <br />
                        <b>{property.content}</b>
                        <p className="alert alert-info mt-3">HUF {property.price}</p>
                        <p className="card-text">
                            <span className="float-right text-primary">
                                for {diffDays(property.from, property.to)} {diffDays(property.from, property.to) <= 1 ? ' day' : ' days'}
                            </span>    
                        </p>
                        <p>From <br />{moment(new Date(property.from)).format('MMMM Do YYYY, h:mm:ss a')} </p>
                        <p>To <br />{moment(new Date(property.to)).format('MMMM Do YYYY, h:mm:ss a')} </p>
                        <i>Posted by {property.postedBy && property.postedBy.name}</i>
                        <br/>
                        <button onClick={handleClick} className='btn btn-block btn-lg btn-primary mt-3' disabled={loading || alreadyBooked}>
                            {loading ? "Loading..." : alreadyBooked ? "Already Booked" : auth && auth.token ? "Book now" : "Login to Book"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProperty;