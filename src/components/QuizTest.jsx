import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { testData } from "../data";

const QuizTest = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const time = new Date();
    time.setSeconds(time.getSeconds() + 30);

    const { seconds, start, restart } = useTimer({
        expiryTimestamp: time,
        onExpire: () => handleTimeout(),
    });

    const filteredQuestion = testData.find((item) => item.id === parseInt(id));

    useEffect(() => {
        // Shuffle questions and their options on load
        const shuffledQuestions = [...filteredQuestion.data].map((q) => ({
            ...q,
            options: q.options.sort(() => Math.random() - 0.5),
        }));
        setQuestions(shuffledQuestions);
        start();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            shuffleCurrentOptions();
        }
    }, [currentQuestionIndex, questions]);

    const shuffleCurrentOptions = () => {
        const currentOptions = questions[currentQuestionIndex]?.options || [];
        setShuffledOptions([...currentOptions].sort(() => Math.random() - 0.5));
    };

    const handleTimeout = () => {
        setIsAnswered(true);
    };

    const handleAnswerSelection = (selectedOption) => {
        if (isAnswered) return;

        setIsAnswered(true);
        setSelectedOption(selectedOption);

        if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsAnswered(false);
            setSelectedOption(null); // Reset selected option
            const newTime = new Date();
            newTime.setSeconds(newTime.getSeconds() + 30);
            restart(newTime);
        } else {
            setShowResult(true);
        }
    };

    const endTest = () => {
        setShowResult(true);
    };

    return (
        <div className="w-full h-full flex flex-col sm:translate-y-[60px] gap-[70px] items-center justify-center">
            {!showResult ? (
                <>
                    <div className="flex flex-col items-center justify-center gap-[15px]">
                        <h1 className="text-[25px] font-serif text-black font-[600]">
                            {filteredQuestion.title}
                        </h1>
                        <div>{`Savol ${currentQuestionIndex + 1} / ${questions.length}`}</div>
                        <span className="sm:text-[16px] lg:text-[20px] text-green-500 font-[500] font-mono">{`Qolgan vaqt: ${seconds} sekund`}</span>
                    </div>

                    <div className="lg:w-[500px] sm:w-[350px] flex flex-col gap-[40px]">
                        <div className="lg:w-[500px] sm:w-[350px] h-auto border rounded-[15px] flex flex-col gap-[10px] shadow-md shadow-gray-600 py-[20px] sm:px-[10px] lg:px-[24px]">
                            <h2 className="sm:text-[16px] lg:text-[20px]">{questions[currentQuestionIndex]?.question}</h2>
                            <div className="mt-4 space-y-2">
                                {shuffledOptions.map((option, index) => {
                                    const isCorrect =
                                        option === questions[currentQuestionIndex]?.correctAnswer;
                                    const isSelected = option === selectedOption;

                                    let btnClass = "bg-gray-200";
                                    if (isAnswered) {
                                        if (isCorrect) {
                                            btnClass = "bg-green-500 text-white"; // Correct answer
                                        } else if (isSelected) {
                                            btnClass = "bg-red-500 text-white"; // User's incorrect selection
                                        }
                                    }

                                    return (
                                        <button
                                            key={index}
                                            className={`w-full text-center py-[15px] sm:px-[10px] lg:px-[24px] rounded-md ${btnClass}`}
                                            onClick={() => handleAnswerSelection(option)}
                                            disabled={isAnswered}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-between">
                            <button
                                className="text-white py-[10px] px-[30px] rounded-[15px] bg-red-500"
                                onClick={endTest}
                            >
                                Testni Tugatish
                            </button>
                            {isAnswered && (
                                <button
                                    className="text-white py-[10px] px-[30px] rounded-[15px] bg-black"
                                    onClick={nextQuestion}
                                >
                                    Keyingi Savol
                                </button>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center flex flex-col items-center gap-[30px]">
                    <h2 className="text-[25px] font-serif font-[600] text-black">Natijalar:</h2>
                    <p className="text-[20px] font-mono">
                        Sizning natijangiz: {score} / {questions.length}
                    </p>
                    <p className="text-[20px] font-mono">
                        Siz to'xtagan savol: {currentQuestionIndex + 1}
                    </p>
                    <button onClick={() => navigate("/")} className="py-[10px] px-[20px] bg-red-400 text-white rounded-[15px]">Home</button>
                </div>
            )}
        </div>
    );
};

export default QuizTest;