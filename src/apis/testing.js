const express = require('express');
const testapp = express();

testapp.use(express.json());

testapp.post('/login', (req, res) => {
    const { email, password} = req.body;
    console.log(email, password)
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    if (email === 'abanoubsamy2341@gmail.com' && password === '123456') {
        return res.status(200).json({ message: 'Logged in successfully' });
    }
})

testapp.listen(5500, () => {
    console.log('Server is running on port 3000');
});