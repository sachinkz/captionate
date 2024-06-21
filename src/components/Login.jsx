import { useState } from 'react';
import wrapper from '../assets/wrapper.png'

const Login = ({ setLoginData, loginData, setOnLoginPage }) => {
    const [error, setError] = useState("")
    const [copied, setCopied] = useState(false)

    const navigateHome = (e) => {
        e.preventDefault()
        if (!loginData.videoURL) {
            return setError("Please provide a video URL")
        } else if (!loginData.userName) {
            return setError("Please provide a username")

        } else {
            setOnLoginPage(false)
        }
    }

    const onCopy = () => {
        navigator.clipboard.writeText("https://utfs.io/f/ebff9869-4e5e-4b17-a28f-cc659dde8984-46vhvi.mp4");
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500)
    }

    return (
        <div className="w-full flex flex-col gap-5 justify-center items-center h-screen bg-gradient-to-r from-black/85 to-black">
            <h1 className="text-white text-3xl font-bold">WELCOME TO <span className="text-red-600">C</span>APTIONATE</h1>
            <form onSubmit={navigateHome} className="w-[500px] max-sm:w-[350px] gap-10 flex flex-col justify-center relative  px-5 pb-10 pt-28 rounded-lg bg-white">
                <div className='-left-4 -top-2 absolute'>
                    <img className='w-36' src={wrapper} alt="" />
                </div>
                <h1 className='absolute top-7 text-black/60'>START NOW</h1>
                <div className="w-full flex flex-col gap-3">
                    <label className="text-xs text-black pl-3" htmlFor="videoUrl">Enter the Video Url</label>
                    <input onChange={(e) => setLoginData(prev => ({ ...prev, videoURL: e.target.value }))} id="videoUrl" className="text-black border placeholder:text-xs h-10 px-3 font-extralight rounded-md bg-transparent" placeholder="Video url" type="url" required />
                </div>
                <div className="w-full flex flex-col gap-3">
                    <label className="text-xs text-black pl-3" htmlFor="videoUrl">Enter your name</label>
                    <input onChange={(e) => setLoginData(prev => ({ ...prev, userName: e.target.value }))} className="text-black border placeholder:text-xs h-10 px-3 font-extralight rounded-md bg-transparent" placeholder="your name" type="text" required />
                </div>
                <p className='text-xs font-thin text-red-500'>{error}</p>
                <button type='submit' className="bg-red-600 rounded-lg py-3 hover:bg-red-400 cursor-pointer text-white">Continue</button>
            </form>
            <div className='w-[500px] rounded-lg flex flex-col '>
                <p className='text-white mb-4 text-center'>test url</p>
                <div className='w-full bg-white p-3 flex items-center text-xs justify-between rounded-lg'>
                    <span>https://utfs.io/f/ebff9869-4e5e-4b17-a28f-cc659dde8984-46vhvi.mp4</span>
                    <button onClick={onCopy} disabled={copied} className={`${copied ? "text-black/40" : "text-black"}`}>copy</button>
                </div>

            </div>
        </div>
    );
}

export default Login;