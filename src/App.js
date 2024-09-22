import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [filter, setFilter] = useState([]);
    const [responseData, setResponseData] = useState(null);

    const handleSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:3000/bfhl', JSON.parse(jsonInput));
            setResponseData(res.data);
        } catch (error) {
            console.error('Error submitting data', error);
        }
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(prev => (
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        ));
    };

    const renderFilteredResponse = () => {
        if (!responseData) return null;
        let filteredResponse = {};
        if (filter.includes('Numbers')) filteredResponse.numbers = responseData.numbers;
        if (filter.includes('Alphabets')) filteredResponse.alphabets = responseData.alphabets;
        if (filter.includes('Highest Lowercase Alphabet')) 
            filteredResponse.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;

        return JSON.stringify(filteredResponse, null, 2);
    };

    return (
        <div className="App">
            <h1>Backend Frontend Handler</h1>
            <textarea 
                value={jsonInput} 
                onChange={(e) => setJsonInput(e.target.value)} 
                placeholder="Enter valid JSON"
            />
            <button onClick={handleSubmit}>Submit</button>

            <div>
                <h3>Filter Response:</h3>
                <label>
                    <input type="checkbox" value="Numbers" onChange={handleFilterChange} />
                    Numbers
                </label>
                <label>
                    <input type="checkbox" value="Alphabets" onChange={handleFilterChange} />
                    Alphabets
                </label>
                <label>
                    <input type="checkbox" value="Highest Lowercase Alphabet" onChange={handleFilterChange} />
                    Highest Lowercase Alphabet
                </label>
            </div>

            {responseData && (
                <div>
                    <h3>Filtered Response:</h3>
                    <pre>{renderFilteredResponse()}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
