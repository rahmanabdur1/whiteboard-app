import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrawingList from './components/DrawingList';
import DrawingView from './components/DrawingView';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DrawingList />} />
                <Route path="/drawings/:id" element={<DrawingView />} />
            </Routes>
        </Router>
    );
};

export default App;
