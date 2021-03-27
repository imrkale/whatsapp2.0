import React from 'react'
import {Circle} from 'better-react-spinkit'
function Loading() {
    return (
        <center style={{marginTop:300}}>
                <div>
                    <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" 
                    height={200}
                    style={{marginBottom:10}}
                    alt="Whatsapp Logo"/>
                    <Circle color="green" size={60}/>
                </div>
        </center>
    )
}

export default Loading
