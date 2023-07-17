const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    description: String,
    title: String,
    questions: [
        {
            title: String,
            answerOptions: [String],
            correctOptions: [Number],
        },
    ],
});

const Quizmodel = mongoose.model("quiz", QuizSchema);
module.exports = {
    Quizmodel
}