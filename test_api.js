const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate a test admin token
const token = jwt.sign({ username: 'admin', role: 'admin' }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
console.log('Test admin token:', token);

// Test the API endpoint
const fetch = require('node-fetch');

async function testAPI() {
    try {
        const contactId = '69ba1593c1e93f0dad621db1'; // From the database check
        const response = await fetch(`http://localhost:5000/api/contact/${contactId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ status: 'read' }),
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);
        } else {
            const error = await response.text();
            console.log('Error:', error);
        }
    } catch (error) {
        console.error('Fetch error:', error.message);
    }
}

testAPI();