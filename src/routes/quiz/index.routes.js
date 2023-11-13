import Presentation from "./Presentation.routes.js";
import PresentationItem from "./PresentationItem.routes.js";
import Question from "./Question.routes.js";
import Quiz from "./Quiz.routes.js";
import UserAnswer from "./UserAnswer.routes.js";
import UserAttemptsQuiz from "./UserAttemptsQuiz.routes.js";
import UserQuiz from "./UserQuiz.routes.js";
import UserScoreQuiz from "./UserScoreQuiz.routes.js";

const quiz = [
    Presentation,
    PresentationItem,
    Question,
    Quiz,
    UserAnswer,
    UserAttemptsQuiz,
    UserQuiz,
    UserScoreQuiz
];

export {quiz};