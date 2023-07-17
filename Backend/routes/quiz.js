const express = require('express');
const quizRoute = express.Router();
const { Quizmodel } = require("../models/quiz.model");
const { Usermodel } = require('../models/user.model');
quizRoute.post("/addquiz", async (req, res) => {
    try{
        const { creator, title, description, questions } = req.body;
        const user = await Usermodel.findOne({ email: creator });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const quiz = new Quizmodel({
            creator: user._id,
            title: title,
            description: description,
            questions: questions,
        });
        await quiz.save();
        res.json({ message: 'Quiz created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create quiz' });
    }
});
quizRoute.get('/quiz', async (req, res) => {
    try {
        const quiz = await Quizmodel.find().populate("creator","username");
        res.send(quiz);
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

quizRoute.put('/quiz/:Id', async (req, res) => {
    try {
        const Id = req.params.Id;
        const { title, description } = req.body;

        await Quizmodel.findByIdAndUpdate(Id, { title, description });
        res.status(200).send({ "msg": "Quiz updated" });
    }
    catch (err) {
        res.status(500).json({ "error": err.message });
    }
});


quizRoute.delete("/quiz/:Id", async (req, res) => {
    try {
        const Id = req.params.Id;
        await Quizmodel.findByIdAndDelete(Id);
        res.status(200).send({ "msg": "Quiz deleted" });
    }
    catch (err) {
        res.status(500).send({ "error": err.message });
    }
});

module.exports = {
    quizRoute
}

