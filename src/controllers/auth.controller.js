const authService = require('./../services/auth.service');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await authService.registerUser({ name, email, password });
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const result = await authService.loginUser({email, password});
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}