import React, { useRef, useState, useEffect } from 'react';

function Whiteboard({ drawing }) {
    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);
    const [drawingMode, setDrawingMode] = useState('line'); // 'line', 'shape', 'text'
    const [startX, setStartX] = useState(null);
    const [startY, setStartY] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        setContext(ctx);
        if (drawing && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
            drawing.elements.forEach(el => {
                switch (el.type) {
                    case 'line':
                        drawLine(ctx, el.properties);
                        break;
                    case 'shape':
                        drawShape(ctx, el.properties);
                        break;
                    case 'text':
                        drawText(ctx, el.properties);
                        break;
                    default:
                        break;
                }
            });
        }
    }, [drawing]);

    const drawLine = (ctx, { x, y, width, height, color }) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y + height);
        ctx.strokeStyle = color;
        ctx.stroke();
    };

    const drawShape = (ctx, { x, y, width, height, color }) => {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = color;
        ctx.fill();
    };

    const drawText = (ctx, { x, y, color, text }) => {
        ctx.font = '16px Arial';
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    };

    const handleMouseDown = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        setStartX(e.clientX - rect.left);
        setStartY(e.clientY - rect.top);
        setIsDrawing(true);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = context;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (drawingMode === 'line') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = 'black';
            ctx.stroke();
        } else if (drawingMode === 'shape') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.rect(startX, startY, x - startX, y - startY);
            ctx.strokeStyle = 'black';
            ctx.stroke();
        } else if (drawingMode === 'text') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = '16px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText('Sample Text', startX, startY);
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                height={400}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
            <div>
                <button onClick={() => setDrawingMode('line')}>Line</button>
                <button onClick={() => setDrawingMode('shape')}>Shape</button>
                <button onClick={() => setDrawingMode('text')}>Text</button>
            </div>
        </div>
    );
}

export default Whiteboard;
