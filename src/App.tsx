import React,{useState} from 'react';
//Conponents
import {fetchQuizQuestions} from "./API";
import QuestionCard from './components/question';

import {QuestionState,Difficulty} from './API';
import {GlobalStyle,Wrapper} from './App.styles';
const Total = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct:boolean;
  correctAnswer: string;
}

const App:React.FC = ()=> {
  
  const [loading,setLoading]=useState(false);
  const [questions,setQuestions] = useState<QuestionState[]>([]);
  const [number,setNumber] = useState(0);
  const [userAnswers,setUserAnswer] = useState<AnswerObject[]>([]);
  const [score,setScore] = useState(0);
  const [gameOver,setGameOver] = useState(true);

  const startTrivia = async() =>{
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      Total,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);

  };
  const checkAnswer = (e:any) => {
    if(!gameOver){
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if(correct) setScore(prev => prev + 1);

      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev,AnswerObject]);
    }
  };
  const nextQuestion = () =>{
    const nextQuestion = number + 1;

    if(nextQuestion === Total){
      setGameOver(true);
    }else{
      setNumber(nextQuestion);
    }
  };

  return(
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === Total ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ):null}  
      {!gameOver ? <p className="score">Score : </p> : null}
      {loading ? <p>Loading Question ... </p>:null}
      {!loading && !gameOver && (
        <QuestionCard 
          questionNr={number + 1}
          totalQuestions = {Total}
          question={questions[number].question}
          answer={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number]:undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== Total - 1 ?(
        <button className="next" onClick={nextQuestion}>
          next
        </button>
      ):null}
    </Wrapper>
    </>
  );
};
export default App;