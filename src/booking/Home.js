import { useState, useEffect} from 'react';
import { allProperties } from "../actions/property";
import SmallCard from '../components/cards/SmallCard';
import Search from "../components/forms/Search";

const Home = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        loadAllproperties()
    }, [])

    const loadAllproperties = async () => {
        let res = await allProperties();
        setProperties(res.data);
    }


    return (
        <>
            <div className = "container-fluid bg-light p-3 text-center">
                <h1 className="text-info border rounded-circle bg-dark p-4">All Properties</h1>
            </div>
            <div className="col">
                <br />
                <Search />
            </div>

            <div className="container">
                <br />
                {/* <pre>{JSON.stringify(properties, null, 4)}</pre> */}
                {properties.map((h) => <SmallCard key={h._id} h={h}  />)}

            </div>
        </>
    )
}

export default Home;