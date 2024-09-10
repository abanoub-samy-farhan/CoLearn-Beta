/* 
Making the quiz maker routes for getting, posting, saving and putting the quizzes
*/ 

const Quiz = require('../models/quizzes');
const Question = require('../models/questions');
const MultipleChoiceOption = require('../models/multiple_choice_options');

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
    try{
        const questions = await Quiz.findAll();
        res.status(200).send(questions);

    } catch (error){
        console.log("There is some error happened while retriving the whole quizzes", error)
    }
}

// Get a single quiz
exports.getQuiz = async (req, res) => {
    try{
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) {
            return res.status(404).json({error: "Quiz not found"});
        }
        res.status(200).json(quiz);
    } catch (error){
        console.log("There is some error happened while retriving the quiz", error)
    }
}

// Create a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const { title, description, clasroom_id, due_date } = req.body;
        const newQuiz = await Quiz.create({ title, description });
        res.status(201).json(newQuiz);
    } catch (error) {
        console.log("There is some error happened while creating the quiz", error)
    }
}



// Update a quiz

