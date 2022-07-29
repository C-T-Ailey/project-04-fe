import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel} from 'react-responsive-carousel';
import './home.css'
// import ReactAudioPlayer from 'react-audio-player';
import Dropdown from 'react-bootstrap/Dropdown'
import img1 from "./assets/kirk.jpg";
import img2 from "./assets/truth-alt.jpg";
import img3 from "./assets/floral.jpg"
import Axios from 'axios';
import Image from 'react-bootstrap/Image'
import bigLogo from './assets/big_logo.png'


// import track1 from "./assets/30_Seconds_of_Bowling_Sounds.mp3"
// import track1 from "./assets/30_Seconds_of_Bowling_Sounds.mp3"




const options = {
  showArrows: false,
  showStatus: false,
  showIndicators: false,
  showThumbs: false,
  autoPlay: true,
  infiniteLoop: true,
  stopOnHover: false,
  swipeable: false,
  animationHandler: 'fade',
};



export default function Home(props) {

  // const [query, setQuery] = useState("")

    const getPopular = () => {
      
      var popularities = {}

      

      const mapIds = props.products ? props.products.map(product => product._id) : ""
  
  
      mapIds.forEach(prodId => {
        let totalOrdered = 0
        const productId = prodId
        
        const getProduct = () => {
          return Axios.get(`product/detail?id=${productId}`);
        }
        
        const getOrder = () => {
          return Axios.get('orders/index', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        }
        
        Promise.all([getProduct(), getOrder()])
          .then(function (responses) {
            const prodName = responses[0].data.product.productName;
            const popProduct = responses[0].data.product
            const order = responses[1].data;
            order.forEach(order => {
              if(order.cart.includes(productId)){
                totalOrdered += order.cart.filter(x => x===productId).length
              } else {
                console.log("Order does not include product")
              }
            })
            
            popularities = {...popularities, [productId]: {"product": popProduct, "popularity": totalOrdered}}
            console.log(`This product has been ordered ${totalOrdered} times.`)
            
            props.setPopular(popularities)
            let sort = []
            for (const key in popularities) {

            console.log(popularities)

            const element = popularities[key];

            console.log(element)
            sort.push(element)
        
            let popularSorted = sort.sort((a,b) => b.popularity - a.popularity)
            console.log(popularSorted)
    
            props.setSortedPopular(popularSorted)
    }
          });
        });  
    }

    useEffect(() => {
      getPopular()
    }, [props.products.length])

    if(!props.products.length){
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
    


    // const test = props.products.filter(post => {
    //   if (query === '') {
    //     // return post;
    //   } else if (post.productName.toLowerCase().includes(query.toLowerCase())) {
    //     return post;
    //   }
    // }).map((post) => (
    //   <div key={post._id}>
    //     <p>{post.productName}</p>
    //   </div>
    // ))

    

    
    return (
      
        
      <>
      <div className="best-seller">
        <h2> Our Best Sellers: </h2>
      </div>
        <Carousel className="main-slide" >
          <div>
          <div className="type">{props.products[0].productName}</div>
            <img alt="" src={props.products[0].productImageUrls[0]} />
            
          </div>
          <div >
          <div className="type">{props.products[1].productName}</div>
            <img alt="" src={props.products[1].productImageUrls[0]}/>
          </div>
          <div>
          <div className="type">{props.products[2].productName}</div>
            <img alt="" src={props.products[2].productImageUrls[0]} />
          </div>
        </Carousel>
        <div className='homepage-logo'> 
        <Image src={bigLogo} alt="" height={500}/>
        <div className="homepage-about">
          <h3>About Us: </h3>
          <p> Bootleg Bill's Unofficial Rarities.... SOme more content here....</p>
        </div>
        </div>

        {/* <div className="test">
  
        <input className="search" id="search" placeholder="Enter Post Title" onChange={event => setQuery(event.target.value)} />
          <div className="results">
            {test}
          </div>
        </div> */}


     </>
    )
  } 
