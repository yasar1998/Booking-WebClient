import { DatePicker, Select } from "antd";
import moment from "moment";


const { Option } = Select;

const PropertyCreateForm = ({values, setValues, handleChange, handleImageChange, handleSubmit}) => {


    const {title, content, location, address, price} = values;

    return (
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='btn btn-outline-secondary btn-block m-2 text-left'>
                    Image <input type="file" name="image" onChange={handleImageChange} accept="image/*" hidden />
                </label>
 
                <input type="text" name="title" onChange={handleChange} placeholder="Title" className="form-control m-2" value={title} />

                <textarea name="content" onChange={handleChange} placeholder="Content" className="form-control m-2" value={content} />

                <input type="text" name="location" onChange={handleChange} placeholder="Place, Country" className="form-control m-2" value={location}/>

                <input type="text" name="address" onChange={handleChange} placeholder="Address, Zip code" className="form-control m-2" value={address}/>

                <input type="number" name="price" onChange={handleChange} placeholder="Price" className="form-control m-2" value={price} />

                <Select onChange={(value)=>setValues({...values, bed: value})} className="w-100 m-2" size="large" placeholder="Number of beds">
                    <Option key={1}>{1}</Option>
                    <Option key={2}>{2}</Option>
                    <Option key={3}>{3}</Option>
                    <Option key={4}>{4}</Option>
                </Select>

                <Select onChange={(value)=>setValues({...values, propertyType: value})} className="w-100 m-2" size="large" placeholder="Type of property">
                    <Option key={"Hotel"}>{"Hotel"}</Option>
                    <Option key={"Motel"}>{"Motel"}</Option>
                    <Option key={"Hostel"}>{"Hostel"}</Option>
                    <Option key={"Private"}>{"Private"}</Option>
                    <Option key={"Other"}>{"Other"}</Option>
                </Select>

                <DatePicker placeholder="From date" className="form-control m-2" onChange={(date, dateString) => setValues({...values, from: dateString})} disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')}/>

                <DatePicker placeholder="To date" className="form-control m-2" onChange={(date, dateString) => setValues({...values, to: dateString})} disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')}/>
                
                <button className="btn btn-outline-primary m-2">Save</button>
            </div>

        </form>
       
    )
}

export default PropertyCreateForm;