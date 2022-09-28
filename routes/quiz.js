import {Router} from 'express';
import {addQuizQuestions,getAllQuestions,submitAnswer,getQuizResults} from "./../controller/quiz.js"

const quizRouter = Router();

quizRouter.route('/').get(getAllQuestions).post(addQuizQuestions);
quizRouter.route('/submit_answer/:id').post(submitAnswer);
quizRouter.route("/get_result").post(getQuizResults)

export default  quizRouter;