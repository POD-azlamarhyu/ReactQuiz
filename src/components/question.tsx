import React from 'react';

import {AnswerObject} from '../App';
import {Wrapper,ButtonWrapper} from './question.styles';

type Props = {
    question: string;
    answer: string[];
    callback: (e:React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}
const QuestionCard:React.FC<Props> = ({
    question,
    answer,
    callback,
    userAnswer,
    questionNr,
    totalQuestions,
}) => (
        <Wrapper>
            <p>
            Question : {questionNr}/{totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html:question}} />
            <div>
                {answer.map(answer=>(
                    <ButtonWrapper
                        key={answer}
                        correct = {userAnswer?.correctAnswer === answer}
                        userClicked={userAnswer?.answer === answer}
                    >

                        <button disabled={userAnswer? true:false} value = {answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html:answer}} />
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper>
    );

export default QuestionCard;