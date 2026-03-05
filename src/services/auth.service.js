const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return { message: 'User registerd succesfully', userId: user._id };
}

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('inavlid credentials');
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your-dev-secret-key';
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
    
    return { message: 'Login successful', token };
}

