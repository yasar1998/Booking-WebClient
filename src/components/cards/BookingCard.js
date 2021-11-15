import { useState } from "react";
import { diffDays } from "../../actions/property";
import { currencyFormatter } from "../../actions/stripe";
import { useHistory, Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import OrderModel from "../modals/OrderModal";


const BookingCard = ({property, session, orderedBy}) =>
{
    const [showModal, setShowModal] = useState(false);


    const history = useHistory();

    return (
    <>
        <div className='card mb-3'>
            <div className='row no-gutters'>
                <div className='col-md-4'>
                   {property.image && property.image.contentType ? (
                     <img src={`${process.env.REACT_APP_API}/property/image/${property._id}`} alt="default property image" className="card-img img img-fluid"/>
                   ):
                   (
                    <img src="https://via.placeholder.com/900x500.png?text=MERN+Booking" alt="default property image" className="card-img img img-fluid"/>
                   )
                   }
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">{property.title}<span className="float-right text-primary">{currencyFormatter({
                            amount: property.price,
                            currency: 'huf',
                        })}</span></h3>    
                        <p className="alert alert-info">{property.location}</p>  
                        <p className="card-text">{`${property.content}...`}</p>   
                        <p className="card-text">
                            <span className="float-right text-primary">
                                for {diffDays(property.from, property.to)} {diffDays(property.from, property.to) <= 1 ? ' day' : ' days'}
                            </span>    
                        </p>
                        <p className="card-text">{property.bed} bed</p>
                        <p className="card-text">Available from {new Date(property.from).toLocaleDateString()}</p>  
                        
                        {showModal && <OrderModel session={session} orderedBy={orderedBy} showModal={showModal} setShowModal={setShowModal} />}

                        <div className='d-flex justify-content-between h4'>
                            <button onClick={() => setShowModal(!showModal)} className="btn btn-primary">Show Payment info</button>
                           
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </>)
};

export default BookingCard;