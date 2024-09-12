import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DrawingList() {
    const [drawings, setDrawings] = useState([]);

    useEffect(() => {
        async function fetchDrawings() {
            const result = await axios.get('https://whiteboard-backend-95gd.vercel.app/api/drawings');
            setDrawings(result.data);
        }
        fetchDrawings();
    }, []);

    return (
        <div className='drawings'>
            <h1>All Drawings</h1>
            <ul>
                {drawings.map(drawing => (
                    <li key={drawing._id}>
                        <Link to={`/drawings/${drawing._id}`}>{drawing.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DrawingList;
