import { diffDays } from "../../actions/property";
import { currencyFormatter } from "../../actions/stripe";
import { useHistory, Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';

const SmallCard = ({h, handlePropertyDelete = (f) => f, owner = false, showViewMoreButton = true}) =>
{
    const history = useHistory();

    return (
    <>
        <div className='card mb-3'>
            <div className='row no-gutters'>
                <div className='col-md-4'>
                   {h.image && h.image.contentType ? (
                     <img src={`${process.env.REACT_APP_API}/property/image/${h._id}`} alt="default property image" className="card-img img img-fluid"/>
                   ):
                   (
                    <img src="https://via.placeholder.com/900x500.png?text=MERN+Booking" alt="default property image" className="card-img img img-fluid"/>
                   )
                   }
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">{h.title}<br/><span className="float-right text-primary">{currencyFormatter({
                            amount: h.price,
                            currency: 'huf',
                        })}</span></h3>    
                        <p className="alert alert-info">{h.location}</p>  
                        <p className="card-text">{`${h.content}...`}</p>   
                        <p className="card-text">
                            <span className="float-right text-primary">
                                for {diffDays(h.from, h.to)} {diffDays(h.from, h.to) <= 1 ? ' day' : ' days'}
                            </span>    
                        </p>
                        <p className="card-text">{h.bed} bed</p>
                        <p className="card-text">Available from {new Date(h.from).toLocaleDateString()}</p>  
                        

                        <div className='d-flex justify-content-between h4'>
                            {showViewMoreButton && <button onClick={() => history.push(`/property/${h._id}`)} className="btn btn-primary">Show more</button>  }
                            {
                                owner && (
                                    <>
                                        <Link to={`/property/edit/${h._id}`}>
                                            <EditOutlined className="text-warning" />
                                        </Link>
                                        <DeleteOutlined onClick={()=> handlePropertyDelete(h._id)} className="text-danger" />
                                    </>
                                )
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </>)
};

export default SmallCard;