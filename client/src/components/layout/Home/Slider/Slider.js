import { Swiper, SwiperSlide } from "swiper/react";
import {Link} from 'react-router-dom'
import { clearErrors, getAllBanners } from "../../../../actions/adBannerAction";
import Loader from "../../Loader";
import { CREATE_ADBANNER_RESET } from "../../../../constants/adBannerConstant";

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
import { Fragment } from "react";

export default function Slider() {

    const dispatch = useDispatch();
    const alert = useAlert()

    const { loading, count, success, banners, error } = useSelector((state) => state.adBanner)

    useEffect(()=>{
      
      dispatch(getAllBanners());
    },[dispatch])

   useEffect(()=>{
    if(error){
        dispatch(clearErrors())
        alert.error(error)
    }
    if(count > 10){
        alert.show("Cannot promot more than 10 prdcts at a time")
    }
    if(success){
      dispatch({type: CREATE_ADBANNER_RESET})
    }
 
   },[dispatch, error, count, alert, banners, success])

  return (
    <Fragment>
      {loading ? (<Loader />) : 
       <Fragment>
       <div className="mySwiper">
       <Swiper
         slidesPerView={'auto'}
         spaceBetween={10}
         loop={true}
         autoplay={{
             delay: 2000,
             pauseOnMouseEnter: false,
         }}
         pagination={{
           clickable: true,
         }}
         navigation={true}
         modules={[Pagination, Navigation, Autoplay]}
         className="mySwiper"
       >
            {banners && banners.map(item => (

              <SwiperSlide key={item.productId}>
                <Link to={`/product/${item.productId}`}>
                  <img src={item.image.url} alt="slide1" />
                  <div className="text">
                    <h1 className="heading">{item.heading}</h1>
                    <p className="subheading">{item.description}</p>
                    <button className="btn">Rent Now</button>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        
       </Swiper>
       </div>
     </Fragment>
      }
    </Fragment>
  );
}


// import { Swiper, SwiperSlide } from "swiper/react";
// import {Link} from 'react-router-dom'

// // import slide1 from '../../../images/slide5.jpg';
// // import slide2 from '../../../images/busProm2.jpg';
// // import slide3 from '../../../images/busPro.jpg';
// // import slide4 from '../../../images/busProm3.jpg';
// import Slide from '../../../images/banners/speaker.jpg'
// import Slide5 from '../../../images/banners/camera.jpg'


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
//         <SwiperSlide><img src={Slide5} alt="slide1" />
//             <div className="text">
//                <h1 className="heading">we capture tour memories forever</h1>
//                <p className="subheading">This is best camera ever... you will purchase... You should rent this camera for better camera qualitu </p>
//                <Link to={'/product/644a142f64a8d80d0f47e4ea'}><button className="btn">Rent Now</button></Link>
//             </div>
//         </SwiperSlide>
//         <SwiperSlide><img src={Slide} alt="slide1" />
//             <div className="text">
//                <h1 className="heading">When sound Matter</h1>
//                <p className="subheading">This is best speaker ever... you will purchase... You should purchase a speaker that make you happy a lot</p>
//                <Link to={'/product/644a0ee103cedc416acbb0f5'}><button className="btn">Rent Now</button></Link>
//             </div>
//         </SwiperSlide>
//         {/* <SwiperSlide><img src={slide3} alt="slide1" />
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
//         </SwiperSlide> */}
        
//       </Swiper> 
//     </>
//   );
// }
