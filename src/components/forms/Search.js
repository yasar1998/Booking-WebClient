import React, {useState} from "react";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { useHistory } from "react-router-dom";

const {RangePicker} = DatePicker;
const {Option} = Select;


const Search = ({}) => {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [bed, setBed] = useState("");
    const [propertyType, setPropertyType] = useState("");

    const history = useHistory();   


    const handleSubmit = () => {
        history.push(`/search-result?location=${location}&date=${date}&bed=${bed}&propertyType=${propertyType}`);
    }

    return (
        <div className="row bg-info">
            <div className='col-lg-3'>
                <input type="text" name="location" placeholder="Place, Country" value={location} onChange={(e) => setLocation(e.target.value)} className="form-control m-2" style={{height:"50px"}} />
            </div>

            <div className='col-lg-3 p-3'>
                <RangePicker  className="w-100" onChange={(value, dateString)=>setDate(dateString)} disabledDate={(current)=>current && current.valueOf() < moment().subtract(1, "days")}/>
            </div>

            <div className='col-lg-2 p-2'>
                <Select onChange={(value) => setBed(value)} className="w-100" size="large" placeholder="Number of beds">
                    <Option key={1}>{1}</Option>
                    <Option key={2}>{2}</Option>
                    <Option key={3}>{3}</Option>
                    <Option key={4}>{4}</Option>
                </Select>
            </div>

            <div className='col-lg-2 p-2'>
                <Select onChange={(value) => setPropertyType(value)} className="w-100" size="large" placeholder="Type of property">
                    <Option key={"Hotel"}>{"Hotel"}</Option>
                    <Option key={"Motel"}>{"Motel"}</Option>
                    <Option key={"Hostel"}>{"Hostel"}</Option>
                    <Option key={"Private"}>{"Private"}</Option>
                    <Option key={"Other"}>{"Other"}</Option>
                </Select>
            </div>

            <div className='col-lg-2 text-center p-2'>
                <SearchOutlined onClick={handleSubmit} className="btn p-3 rounded-circle bg-light" />
            </div>
        </div>
    )
}

export default Search;
