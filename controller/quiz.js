import Quizes from "../models/Quiz.js"
import ErrorResponse from "../util/errorResponse.js"
import asyncHandler from "../util/asyncHandler.js"

// create quiz 
const addQuizQuestions = asyncHandler(async (req, res, next) => {
    let response = await Quizes.create(req.body);
    res.status(200).send({ success: true, response });
})

//get all questions 

const getAllQuestions = asyncHandler(async (req, res, next) => {
    let response = await Quizes.find().select("-isAnsweredCorrectly -createdAt -correctAnswer -score -_v");
    res.status(200).send({ success: true, response });
});

const submitAnswer = asyncHandler(async (req, res, next) => {

    let response = await Quizes.findById(req.params.id);
    console.log(req.body.answer);

    const isCorrectAnswer = () => {
        return req.body.answer === response.correctAnswer ? true : false;
    }
    
    await Quizes.findByIdAndUpdate(
        req.params.id, {
        isAnsweredCorrectly: isCorrectAnswer() ? true : false,
        score: isCorrectAnswer() ? 10 : 0
    });

    res.status(200).send({ success: true, message: "asnswer submitted successfully." });
});


const getQuizResults = asyncHandler( async (req, res, next) => {

    let allQuestions = await Quizes.find().select("-options -createdAt -description -category -_v")
    const totalCorrectAnswers =  allQuestions.filter(res=>res.isAnsweredCorrectly).length;
    const userScore = allQuestions.filter(res=>res.score).length*10;
    const totalScore= allQuestions.length*10;
    const percentageResult = `${Math.round(userScore/(totalScore/100))}%`

    res.status(200).json({
        success: true ,
        result:{totalCorrectAnswers,userScore,totalScore,percentageResult},
        quizeDetails: allQuestions,
      })

})




export { addQuizQuestions, getAllQuestions, submitAnswer,getQuizResults}