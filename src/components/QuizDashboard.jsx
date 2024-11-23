import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { QuizCard } from "./QuizCard";

const data = [
    {
        id: 1,
        title: 'Bank Ishi va Audit'
    },
    {
        id: 2,
        title: 'Iqtisodiyot nazariyasi'
    },
    {
        id: 3,
        title: 'Xamshira'
    }
]

const QuizDashboard = () => {
    const navigate = useNavigate()
    return (
        <div className="w-[100%] h-[100%] sm:translate-y-[60px] translate-y-[100px] sm:gap-[20px] lg:gap-[25px] flex flex-col items-center justify-center">
            <span className="sm:text-[20px] lg:text-[35px] font-[500] text-black font-serif">Test Creater and Solver</span>
            <div className="w-[80%] grid sm:grid-cols-1 sm:gap-[20px] lg:gap-x-[30px] lg:gap-y-[40px] lg:grid-cols-4 h-auto py-[20px]">
                {data.map((item) => (
                    <QuizCard title={item.title} id={item.id} />
                ))}
            </div>
        </div>
    );
};

export default QuizDashboard;
