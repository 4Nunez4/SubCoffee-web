import react from "React"

function TextForm({ text }) {
    return(
        <div className="flex flex-col z-10">
            <p className="flex flex-col justify-center items-center ml-96 text-xl mb-4 z-10 font-semibold">{text}</p> 
        </div>
    )
}

export default TextForm;