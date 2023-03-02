import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function useFetch(url) {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    function getData() {
        axios.get(url)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    return { error, loading, data };


}