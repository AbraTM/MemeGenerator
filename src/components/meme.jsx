import React from "react";

export default function Meme(){
    

    const [meme, setMeme] = React.useState({
        topText : "" ,
        bottomText : "",
        randomImage : "https://i.imgflip.com/30b1gx.jpg",
    })
    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    
    function newMeme(){
        const randomNum = Math.floor(Math.random() * allMemes.length)
        const randomUrl = allMemes[randomNum].url
        
        setMeme(prevMeme => {
            return ({
                ...prevMeme,
                randomImage: randomUrl
            })
        })
        
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name] : value
        }))
    }
    
    function handleSubmit(event){
        event.preventDefault()
        console.log(meme)
    }
    
    return(
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    className="form--input" 
                    type="text"
                    placeholder="Top Text"
                    name="topText" 
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    className="form--input" 
                    type="text"
                    placeholder="Bottom Text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    onClick={newMeme}
                    className="form--button">
                    Get a new meme image 🖼️
                </button>
                <div className="meme">
                    <img src={meme.randomImage} alt="" className="meme-image"></img>
                    <h1 className="meme-text top">{meme.topText}</h1>
                    <h2 className="meme-text bottom">{meme.bottomText}</h2>
                </div>
            </form>
            
        </div>  
    )
}