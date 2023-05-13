import React, { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import './Hero-Slider.css'
const HeroSlider=()=> {
   const [imageNum, setImageNum] = useState(1);
   const sliderImages = [
      {
         url: "https://img.freepik.com/free-photo/wide-angle-shot-singletree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg",
      },
      {
         url: "https://thumbs.dreamstime.com/b/lone-tree-meadow-sunriseidyllic-fabulous-landscapes-39659821.jpg",
      },
      {
         url: "https://encryptedtbn0.gstatic.com/images?q=tbn:ANd9GcSprPgYofGmXXPfuEDcZ_XI294n0bME5dTX9TGvINmPiA&s",
      },
      {
         url: "https://i.pinimg.com/474x/81/ca/47/81ca47eaae35615ba9a9bb57560aaa3c.jpg",
      },
      {
         url: "https://encryptedtbn0.gstatic.com/images?q=tbn:ANd9GcTof2fniv0mZzN8DByLmb6ILU4MvV_SGr_wptMeAut_dPaYMBkeHnHhD5egzU7MB0GSqE&usqp=CAU",
      },
   ];
   return (
      <div style={{position: "absolute", top: "60px", zIndex:"1"}} className="promot">
         {/* <h3>
            {" "}
            Creating the image slider using the react-simple-image-slider
         </h3> */}
         <SimpleImageSlider
           className='imageSlider'
            width={1350}
            height={200}
            images={sliderImages}
            showBullets={true}
            showNavs={true}
            autoPlay={true} 
            onStartSlide = {(index, length) => {
               setImageNum(index);
            }}
               autoPlayDelay = {3}
         />
         {/* <div style = {{ fontSize: "1.5rem" }}>
            The current image slide No is {imageNum}.
         </div> */}
      </div>
   );
}

export default HeroSlider;