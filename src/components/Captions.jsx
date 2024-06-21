const Captions = ({ captions,setCaptions }) => {

    const removeCaption=(time)=>{
        let newCaptions=captions.filter((cap)=>cap.time !== time)
        setCaptions(newCaptions);
    }

    return (
        <div className="w-1/3 max-lg:w-full bg-white/5 rounded-lg p-5  flex flex-col gap-1">
            <h1 className="text-white text-xl text-center mb-5">ADDED CAPTIONS</h1>
            {captions.length === 0 ? (
                <div className="w-full h-full items-center justify-center flex ">
                    <p className="text-white/40">No captions added yet</p>
                </div>
            ) : captions.map((cap, i) => (
                <div className="w-full bg-black/50 min-h-10 flex justify-between p-2 rounded-md" key={i}>
                    <p className="text-white">{cap.text}</p>
                    <div className=" flex items-center gap-3">
                        <span className="text-white">{cap.time}.s - {cap.time + 3}.s</span>
                        <button onClick={()=>removeCaption(cap.time)}>❌</button>
                    </div>
                </div>
            )
            )}
        </div>
    );
}

export default Captions;