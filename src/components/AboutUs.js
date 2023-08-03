import React, { useState } from "react";
import person from "./Images/person.jpg"


export default function AboutUs(props){
    return(
        <>
        <div class="grid grid-cols-3 grid-rows-3 gap-2 ml-[23vw] mr-7 py-5 auto-rows-max h-screen">
            <div>
                <img src={person} alt="photo" className="rounded-full pr-2 float-left scale-90"/>
                <p className="text-white text-sm object-contain"> Wolfgang has two forms: "Normal" and "Mighty." In his normal form, he is weaker, and his hunger drains faster. However, when his hunger is above a certain threshold, he transforms into his mighty form, which increases his physical strength and grants him damage resistance.</p>
            </div>
            <div></div>
            <div>
                <img src={person} alt="photo" className="rounded-full pr-2 float-left scale-90"/>
                <p className="text-white text-sm object-contain"> Wolfgang's abilities are closely tied to his hunger level. Maintaining a balance between staying in his normal form for resource efficiency and transforming into his mighty form for combat effectiveness is crucial.</p>
            </div>
            <div></div>
            <div>
                <img src={person} alt="photo" className="rounded-full pr-2 float-left scale-90"/>
                <p className="text-white text-sm object-contain"> Wolfgang gains extra health and sanity from consuming food. This makes him quite resilient, especially when well-fed.</p>
            </div>
            <div></div>
            <div>
                <img src={person} alt="photo" className="rounded-full pr-2 float-left scale-90"/>
                <p className="text-white text-sm object-contain"> Wolfgang has a fear of darkness, meaning he becomes uncomfortable and experiences a sanity drain when he is in the dark. Players need to provide him with a light source during nighttime or dark areas.</p>
            </div>
            <div></div>
            <div>
                <img src={person} alt="photo" className="rounded-full pr-2 float-left scale-90"/>
                <p className="text-white text-sm object-contain">Wolfgang has a strong and tough personality, fitting well with his physical attributes. He may have some unique voice lines and interactions with other characters in the game.</p>
            </div>
            
    </div>
        
        </>
        
    )
}