import './features.css'
import React, { Fragment } from 'react'
import f1 from '../../../images/features/f1.png'
import f2 from '../../../images/features/f2.png'
import f3 from '../../../images/features/f3.png'
import f4 from '../../../images/features/f4.png'
import f5 from '../../../images/features/f5.png'
import f6 from '../../../images/features/f6.png'


function Features() {
  return (
    <Fragment>
        <div className='head'>
        <h1 className='header'>Features</h1>
        </div>
        <section id="feature" className="section-p1">
        <div className="fe-box">
            <img src={f1} alt="feature1" />
            <h6 style={{ backgroundColor: "#fddde4" }}>Free shipping</h6>
        </div>
        <div className="fe-box">
            <img src={f2} alt="feature2" />
            <h6 style={{ backgroundColor: "#fff2e5" }}>Online Order</h6>
        </div>
        <div className="fe-box">
            <img src={f3} alt="feature3" />
            <h6 style={{ backgroundColor: "##f6dbf6" }}>Save Money</h6>
        </div>
        <div className="fe-box">
            <img src={f4} alt="feature4" />
            <h6 style={{ backgroundColor: "#cdd4f8" }}>Promotions</h6>
        </div>
        <div className="fe-box">
            <img src={f5} alt="feature5" />
            <h6 style={{ backgroundColor: "#d1e8f2" }}>Happy Sell</h6> 
        </div>
        <div className="fe-box">
            <img src={f6} alt="feature6" />
            <h6 style={{ backgroundColor: "#d1e8f2" }}>24/7 Support</h6> 
        </div>
        {/* <div className="fe-box">
            <img src={f2} alt="feature7" />
            <h6 style={{ backgroundColor: "#d1e7f2" }}>save time</h6> 
        </div> */}
    </section>

    </Fragment>
  )
}

export default Features