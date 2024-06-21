import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Captions from "./Captions";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ loginData }) => {

    const [currentTime, setCurrentTime] = useState(0)
    const [newCaption, setNewCaption] = useState("")
    const [captions, setCaptions] = useState([])
    const [playing, setPlaying] = useState(false)
    const [currentCaption, setCurrentCaption] = useState(null)

    useEffect(()=>{
        toast("Play the video and pause at the position you want to add a caption and add your caption or express through emojis")
    },[])

    const VideoPlayerStyles = {
        backgroundColor: "#090909",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const onVideoProgressChange = (timeData) => {
        setCurrentTime(Math.floor(timeData.playedSeconds))
        const currentCap = captions.find(captions => captions.time === currentTime)
        if (currentCap) {
            setCurrentCaption(currentCap)
            setTimeout(() => {
                setCurrentCaption(null)
            }, 3000);
        }
    }

    const saveNewCaption = (emoji, text) => {
        if (!emoji && newCaption === "") return;
        const alreadyExist = captions.find(caption => currentTime >= caption.time && currentTime <= caption.time + 3)
        if (alreadyExist) {
            toast("A caption already exists for the current time please romove it and try again")
            return;
        }
        setCaptions((prev) => [...prev, { time: currentTime, emoji: emoji, text: emoji ? text : newCaption }])
        if (!emoji) {
            setNewCaption("")
        }
    }

    return (
        <div className="w-full min-h-screen bg-black px-10 max-sm:px-3">
            <div className="w-full py-6">
                <h1 className="text-white text-3xl font-bold"> <span className="text-red-600">C</span>APTIONATE</h1>
            </div>
            <div className="w-full  flex gap-5 max-lg:flex-col">
                <div className="w-2/3 max-lg:w-full h-full ">
                    <div className={`w-full max-h-[500px] ${!playing ? "min-h-[500px] max-md:min-h-[350px] max-sm:min-h-[250px]" : "h-full"} relative bg-[#090909] flex justify-center items-center`}>
                        <ReactPlayer
                            onProgress={onVideoProgressChange}
                            style={VideoPlayerStyles}
                            url={loginData.videoURL}
                            controls={true}
                            height={"500px"}
                            width={"100%"}
                            onBuffer={()=>setCurrentCaption(null)}
                            onPlay={() => setPlaying(true)}
                            onPause={() => setPlaying(false)}
                            playing={true}
                            light={true}
                            pip={false}
                        />
                        {currentCaption && <div className="absolute z-20 justify-center flex items-end p-14 pb-20 top-0 left-0 w-full h-full pointer-events-none">
                            {!currentCaption?.emoji && <p className="text-white text-xl rounded-md bg-green-500 px-2">{currentCaption?.text}</p>}
                            {currentCaption?.emoji && <span className="emojies absolute right-20 bottom-0" >{currentCaption?.text}</span>}
                        </div>}
                    </div>
                    <div className="w-full bg-white/10 rounded-lg flex items-center gap-5 p-3 mt-3 max-md:flex-col">
                        <div className="w-2/3 flex gap-3 max-md:w-full">
                            <input value={newCaption} placeholder="type your caption here...." onChange={(e) => setNewCaption(e.target.value)} className="w-full text-white border placeholder:text-xs h-10 px-3 font-extralight rounded-md bg-transparent" type="text" />
                            <button onClick={() => saveNewCaption(false)} className="bg-red-600 rounded-lg h-10 hover:bg-red-400 cursor-pointer text-white px-10 max-md:px-5">Add</button>
                        </div>
                        <div className="w-1/3 max-md:w-full flex justify-around">
                            <button onClick={() => saveNewCaption(true, "❤️")} className="hover:scale-150 transition-transform duration-300 ease-in-out">❤️</button>
                            <button onClick={() => saveNewCaption(true, "👍")} className="hover:scale-150 transition-transform duration-300 ease-in-out">👍</button>
                            <button onClick={() => saveNewCaption(true, "👎")} className="hover:scale-150 transition-transform duration-300 ease-in-out">👎</button>
                            <button onClick={() => saveNewCaption(true, "😍")} className="hover:scale-150 transition-transform duration-300 ease-in-out">😍</button>
                            <button onClick={() => saveNewCaption(true, "🤣")} className="hover:scale-150 transition-transform duration-300 ease-in-out">🤣</button>
                            <button onClick={() => saveNewCaption(true, "🔥")} className="hover:scale-150 transition-transform duration-300 ease-in-out">🔥</button>
                        </div>
                    </div>

                </div>
                <Captions captions={captions} setCaptions={setCaptions} />
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;



