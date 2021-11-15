import axios from "axios";


export const createProperty = async(token, data) => await axios.post(`${process.env.REACT_APP_API}/create-property`, data, {
    headers: {
        Authorization: `Bearer ${token}`,
    }
})

export const allProperties = async () => await axios.get(`${process.env.REACT_APP_API}/properties`);

export const diffDays = (from, to) => {
    const day = 24 * 60 * 60 * 1000;
    const start = new Date(from);
    const end = new Date(to);
    const difference = Math.round(Math.abs(start-end) / day);
    return difference;
}

export const currencyFormatter = (data) => {
    return (data.amount).toLocaleString(data.currency, {
        style: "currency", 
        currency: data.currency,
    })
}

export const sellerProperties = async(token) => await axios.get(`${process.env.REACT_APP_API}/seller-properties`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const deleteProperty = async (token, propertyId) => await axios.delete(`${process.env.REACT_APP_API}/delete-property/${propertyId}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const read = async (propertyId) => await axios.get(`${process.env.REACT_APP_API}/property/${propertyId}`);

export const updateProperty = async(token, data, propertyId) => await axios.put(`${process.env.REACT_APP_API}/update-property/${propertyId}`, data, {
    headers: {
        Authorization: `Bearer ${token}`,
    }
})

export const userPropertyBookings = async (token) => await axios.get(`${process.env.REACT_APP_API}/user-property-bookings`, {
    headers: {
        Authorization: `Bearer ${token}`,
    }
})

export const isAlreadyBooked = async(token, propertyId) => await axios.get(`${process.env.REACT_APP_API}/is-already-booked/${propertyId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    }
});

export const SearchListings = 
        async (query) => await axios.post(`${process.env.REACT_APP_API}/search-listings`, query);
