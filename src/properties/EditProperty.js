import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import { read, updateProperty } from "../actions/property";
import {useSelector} from 'react-redux';
import PropertyEditForm from "../components/forms/PropertyEditForm";

const { Option } = Select;

const EditProperty = ({match}) => {
    const { auth } = useSelector((state) => ({...state}));
    const { token } = auth;


    const [values, setValues] = useState({
        title: '',
        content: '',
        location: '',
        address: '',
        price: '',
        from: '',
        to: '',
        bed: '',
        propertyType: '',
    });
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW');

    const {title, content, location, address, price, from, to, bed, propertyType} = values;

    useEffect(()=>{
        loadSellerProperty();
    }, []);

    const loadSellerProperty = async () => {
        let res = await read(match.params.propertyId);
        // console.log(res);
        setValues({...values, ...res.data});
        setPreview(`${process.env.REACT_APP_API}/property/image/${res.data._id}`)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        let propertyData = new FormData()
        propertyData.append('title', title);
        propertyData.append('content', content);
        propertyData.append('location', location);
        propertyData.append('address', address);
        propertyData.append('price', price);
        image && propertyData.append('image', image);
        propertyData.append('from', from);
        propertyData.append('to', to);
        propertyData.append('bed', bed);
        propertyData.append('propertyType', propertyType);

        try{
            let res = await updateProperty(token, propertyData, match.params.propertyId)
            console.log('PROPERTY UPDATE RES', res);
            toast.success(`Property is updated`);
        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.err);
        }


    }

    const handleImageChange = (e) => {
        // console.log(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    return (
        <>
            <div className="container-fluid bg-light p-5 text-center">
                <h2>Edit Property</h2>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-10'>
                        <br />
                        <PropertyEditForm values={values} setValues={setValues} handleChange={handleChange} handleImageChange={handleImageChange} handleSubmit={handleSubmit}/>
                    </div>
                    <div className="col-md-2">
                        <img src={preview} alt="preview_image" className='img img-fluid m-2' />
                        <pre>{JSON.stringify(values, null, 4)}</pre>
                    </div>
                </div>
            </div>
        </>
    )

}

export default EditProperty;