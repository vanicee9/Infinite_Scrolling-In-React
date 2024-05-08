
'use client';
import React, { useState, useEffect } from 'react';
import '../Styles/DataStyles.scss';

function Data() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [page]);


    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => window.removeEventListener('scroll', handleInfiniteScroll)
    }, [])

    const handleInfiniteScroll = (e) => {
        // console.log(e)
        try {
            if (window.innerHeight + window.scrollY + 1 >= document.documentElement.scrollHeight) {
                setLoading(true);
                setPage((prev) => prev + 1);
            }

        } catch (error) {
            console.log("error is:", error)
        }

    }
    useEffect(() => {
        console.log("scrollHeight" + document.documentElement.scrollHeight); //height of content area 
        console.log("innerHeight" + window.innerHeight); //view port height
        console.log("scrollTop" + document.documentElement.scrollTop); //will increase in pixels as we moves cursor
    }, [])


    const fetchData = async () => {
        try {
            let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`);
            response = await response.json();
            setLoading(false);
            page <= 1 ? setData(prev => [...response]) : setData(prev => [...prev, ...response]); //keep the previous data and spread the new data also
            console.log(response);
        } catch (error) {
            console.log(error);
            setLoading(true);
        }
    };

    return (
        <div className="container">
            {
				!data.length 
					? (
						<div className="loader-container">
							<div className="loader"></div>
						</div>
					) : (
						data.map((item, index) => (
                        <div key={index} className="card">
                            <div className="id">Id: {item.id}</div>
                            <div className="title">Title: {item.title}</div>
                            <div className="body">Body: {item.body}</div>
                        </div>
                    ))
					)
            }
			{
				loading && (
					<div className="loader-container">
						<div className="loader"></div>
					</div>
				)
			}
        </div>
    );
}

export default Data;
