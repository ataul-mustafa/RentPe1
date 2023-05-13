import { Swiper, SwiperSlide } from "swiper/react";
import {Link} from 'react-router-dom'
import { clearErrors, getAllBanners } from "../../../actions/adBannerAction";
import Loader from "../Loader";


// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'


import "./Slider.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

export default function Slider() {

    const dispatch = useDispatch();
    const alert = useAlert()

    const { loading, count, data, error } = useSelector((state) => state.adBanner)

   useEffect(()=>{
    if(error){
        alert.show("Somethinf went wrong")
        dispatch(clearErrors)
    }
    if(count > 10){
        alert.show("Cannot promot more than 10 prdcts at a time")
    }
    dispatch(getAllBanners())
   })

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
            delay: 4000,
            pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {data && data.map(item, index =>(
            <SwiperSlide key={index}><img src={item.image.url} alt="slide1" />
            <div className="text">
               <h1 className="heading">item.heading</h1>
               <p className="subheading">item.decription</p>
               <Link to={`/product/${item.productId}`}><button className="btn">Rent Now</button></Link>
            </div>
        </SwiperSlide>
        ))}
        
      </Swiper>
    </>
  );
}








// import { Swiper, SwiperSlide } from "swiper/react";
// import {Link} from 'react-router-dom'

// import slide1 from '../../../images/slide5.jpg';
// import slide2 from '../../../images/busProm2.jpg';
// import slide3 from '../../../images/busPro.jpg';
// import slide4 from '../../../images/busProm3.jpg';
// import Slide from '../../../images/banners/speaker.jpg'


// // Import Swiper styles
// import 'swiper/swiper.min.css'
// import 'swiper/modules/pagination/pagination.min.css'
// import 'swiper/modules/navigation/navigation.min.css'


// import "./Slider.css";

// // import required modules
// import { Pagination, Navigation, Autoplay } from "swiper";

// export default function Slider() {
//   return (
//     <>
//       <Swiper
//         slidesPerView={1}
//         spaceBetween={30}
//         loop={true}
//         autoplay={{
//             delay: 4000,
//             pauseOnMouseEnter: true,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         navigation={true}
//         modules={[Pagination, Navigation, Autoplay]}
//         className="mySwiper"
//       >
//         <SwiperSlide><img src={slide1} alt="slide1" />
//             <div className="text">
//                <h1 className="heading">Explore the world! visit new places</h1>
//                <p className="subheading">Our bus service is very fast. YOu can rent our bus and Explore the word. we provide satisfying service</p>
//                <Link to={'/product/640f342409d5f7067158cbf7'}><button className="btn">Rent Now</button></Link>
//             </div>
//         </SwiperSlide>
//         <SwiperSlide><img src={Slide} alt="slide1" />
//             <div className="text">
//                <h1 className="heading">Explore the world! visit new places</h1>
//                <p className="subheading">Our bus service is very fast. YOu can rent our bus and Explore the word. we provide satisfying service</p>
//                <button className="btn">Rent Now</button>
//             </div>
//         </SwiperSlide>
//         <SwiperSlide><img src={slide3} alt="slide1" />
//             <div className="text">
//                <h1 className="heading">Explore the world! visit new places</h1>
//                <p className="subheading">Our bus service is very fast. YOu can rent our bus and Explore the word. we provide satisfying service</p>
//                <button className="btn">Rent Now</button>
//             </div>
//         </SwiperSlide>
//         <SwiperSlide><img src={slide4} alt="slide1" />
//             <div className="text">
//                <h1 className="heading">Explore the world! visit new places</h1>
//                <p className="subheading">Our bus service is very fast. YOu can rent our bus and Explore the word. we provide satisfying service</p>
//                <button className="btn">Rent Now</button>
//             </div>
//         </SwiperSlide>
        
//       </Swiper>
//     </>
//   );
// }
