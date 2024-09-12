import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Whiteboard from './Whiteboard';

function DrawingView() {
    const [drawing, setDrawing] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        console.log('Fetching drawing with ID:', id);  // Debug log
        async function fetchDrawing() {
            try {
                const result = await axios.get(`https://whiteboard-backend-95gd.vercel.app/api/drawings/${id}`);
                console.log('Fetched drawing:', result.data);  // Debug log
                setDrawing(result.data);
            } catch (error) {
                console.error('Error fetching drawing:', error);
            }
        }
        fetchDrawing();
    }, [id]);

    return (
        <div className='drawings'>
            <h1>Drawing: {drawing ? drawing.title : 'Loading...'}</h1>
            {drawing && <Whiteboard drawing={drawing} />}
        </div>
    );
}

export default DrawingView;
