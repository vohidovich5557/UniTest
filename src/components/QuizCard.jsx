import { useNavigate } from "react-router-dom"


export const QuizCard = ({ title, id }) => {
    const navigate = useNavigate()
    return (
        <>
            <div onClick={() => navigate(`/test/${id}`)} className="w-auto flex flex-col cursor-pointer hover:shadow-md hover:shadow-slate-600 transition-all duration-200 ease-in-out items-center justify-center h-auto py-[70px] rounded-[15px] px-[20px] border border-black">
                <span className="sm:text-[14px] lg:text-[20px] font-[500] text-black/50 hover:text-black transition-all duration-200">{title}</span>
            </div>
        </>
    )
}