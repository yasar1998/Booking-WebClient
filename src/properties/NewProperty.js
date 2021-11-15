import { useState } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import { createProperty } from "../actions/property";
import {useSelector} from 'react-redux';
import PropertyCreateForm from '../components/forms/PropertyCreateForm';


const { Option } = Select;

const NewProperty = () => {

    const { auth } = useSelector((state) => ({...state}));
    const { token } = auth;

    const [values, setValues] = useState({
        title: '',
        content: '',
        location: '',
        image: '',
        price: '',
        from: '',
        to: '',
        bed: '',
        propertyType: '',
    });
    const [preview, setPreview] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW');

    const {title, content, location, address, image, price, from, to, bed, propertyType} = values;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(values);

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

        console.log(...propertyData);

        try{
            let res = await createProperty(token, propertyData);
            console.log('PROPERTY CREATE RES', res);
            toast.success('New property is posted');
            setTimeout(()=>{
                window.location.reload();
            }, 1000)

        }
        catch(err){
            console.log(err);
            toast.error(err.response.data);
        }
    }

    const handleImageChange = (e) => {
        // console.log(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
        setValues({...values, image: e.target.files[0]});
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

   

    return (
        <>
            <div className = "container-fluid bg-light p-5 text-center">
                <h2>Add Property</h2>
            </div>
            <div className = "container-fluid">
                <div className='row'>
                    <div className='col-md-10'>
                        <br />
                        <PropertyCreateForm values={values} setValues={setValues} handleChange={handleChange} handleImageChange={handleImageChange} handleSubmit={handleSubmit} />
                    </div>

                    <div className='col-md-2'>
                        <img src={preview} alt="preview/image" className="img img-fluid m-2" />
                        <pre>{JSON.stringify(values, null, 4)}</pre>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewProperty;