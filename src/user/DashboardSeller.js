import { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { sellerProperties, deleteProperty } from "../actions/property";
import PropertyCreateForm from "../components/forms/PropertyCreateForm";
import SmallCard from "../components/cards/SmallCard";
import { createConnectAccount } from "../actions/stripe";

const DashboardSeller = () => {
    const { auth } = useSelector((state) => ({...state}));
    const [loading, setLoading] = useState(false);
    const [properties, setProperties] = useState([]);

    const handleClick = async () => {
        setLoading(true);
        try{
            let res = await createConnectAccount(auth.token);
            console.log(res);
            window.location.href = res.data;
        }catch(err){
            console.log(err);
            toast.error('Stripe connect failed, Try again.');
            setLoading(false);
        }
    }


    useEffect(()=>{
        loadSellersProperties()
    }, [])

    const loadSellersProperties = async () => {

        let { data } = await sellerProperties(auth.token);

        setProperties(data);
    }

    const handlePropertyDelete = async (propertyId) => {
        if(!window.confirm('Are you sure')) return;

        deleteProperty(auth.token, propertyId).then(res => {
            toast.success('Property deleted');
            loadSellersProperties();
        })
    }

    const connected = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h2>Your Properties</h2>
                </div>
                <div className="col-md-2">
                    <Link to='/properties/new' className='btn btn-primary'>
                        + Add New
                    </Link>
                </div>
            </div>
            <div className="row">
                {properties.map(h=> <SmallCard key={h._id} h={h} showViewMoreButton={false} owner={true} handlePropertyDelete={handlePropertyDelete}/>)}
            </div>
        </div>
    )

    const notConnected = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <HomeOutlined className="h1" />
                    <h4>Enter your Seller information to be able to post the properties</h4>
                
                    <button disabled={loading} onClick={handleClick} className="btn btn-primary mb-3">
                        {loading ? 'Processing...' : 'Validate as a Seller'}
                    </button>
                    <p className="text-muted">
                        <small>
                            You'll be redirected to Stripe to complete onboarding process.
                        </small>
                    </p>
                </div>
            </div>
        
        </div>
    )

    return(
        <>
            <div className="container-fluid bg-info p-5">
                <ConnectNav />
            </div>

            <div className="container-fluid p-4">
                <DashboardNav />
            </div>


           {auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled ? connected() : notConnected()}

           {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}

        </>
    )
}

export default DashboardSeller;