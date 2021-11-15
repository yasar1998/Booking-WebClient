import { useState, useEffect } from "react";
import queryString from 'query-string';
import { Link } from "react-router-dom";
import Search from "../components/forms/Search";
import { SearchListings } from "../actions/property";
import SmallCard from "../components/cards/SmallCard";

const SearchResult = () => {

    const [searchLocation, setSearchLocation] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [searchBed, setSearchBed] = useState("");
    const [properties, setProperties] = useState([]);

    useEffect(()=>{
        const {location, date, bed, propertyType} = queryString.parse(window.location.search);


        SearchListings({location, date, bed, propertyType}).then(res => {
            setProperties(res.data);
        });
    }, [window.location.search]);

    return (
        <>
            <div className="container-fluid bg-info p-5 text-center">
                <h2>Search Result</h2>
            </div>
            <div className="col">
                <br />
                <Search />
            </div>
            <div className="container">
                <br />
                <div className="row">
                    {properties.map(h => <SmallCard key={h._id} h={h} />)}
                </div>
            </div>
        </>
    )
}

export default SearchResult;