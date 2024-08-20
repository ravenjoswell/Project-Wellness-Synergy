
// import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'; 
// import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
// import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
// import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
// import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';


import '../App.css'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AboutPage() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const recipes = [
    { name: 'Recipe 1', img: './burger.jpg' },
    { name: 'Recipe 2', img: './burger.jpg' },
    { name: 'Recipe 3', img: './burger.jpg' },
    { name: 'Recipe 4', img: './burger.jpg' },
    { name: 'Recipe 5', img: './burger.jpg' },
    { name: 'Recipe 6', img: './burger.jpg' },
  ];




  return (
    <div className="about-page-wrapper">
      <div className="about-page-container">
        {/* First Video Box */}
        <div className="about-video-box">
          <div className="about-video-container">
            <video
              src="./background3.mp4"
              autoPlay
              loop
              muted
            />
            <div className="relative z-10">
              {/* Parallax Container */}
              <div className="about-parallax-container">
                <h1 className="stacked-text">
                  Wellness<br />
                  Synergy<br />
                  Awaits<br />
                  You.
                </h1>
              </div>

              {/* Pitch Text Container */}
              <div className="pitch-text-container">
                <p className="pitch-text">
                <br/>Embrace a mindful approach to wellness,
                <br/>nurturing both your mind and body.
                <br/>Support your journey with nutrition 
                <br/>tailored to your dietary needs,
                <br/>for a healthier, happier way of life.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Long Scrolling Section */}
        <div className="long-container">
          <div className="long-scroll-container">
            <video
              src=""
              autoPlay
              loop
              muted
            />
            <div className="relative z-10">
              {/* Scrolling Title Text */}
              <div className="right-title-scroll-container">
                <h1 className="right-text">
                  Start <br />
                  Your <br/>
                  Journey <br />
                  With Us.<br />
                </h1>
              </div>
              <div className="right-title-scroll-container-2">
                <h1 className="right-text-2">
                  Join Us for: <br />
                  Guidance towards <br/>
                  A sound body, A sound mind, <br />
                  Improved sleep, Daily Journaling,<br />
                  
                  And a balanced dietary lifestyle.<br />
                </h1>
              </div>
              <div className="second-video-container">
              <div className="second-video-box">
              <video
              src="./aboutbg1.mp4"
              autoPlay
              loop
              muted
              />
              <div className="second-video-text">
              <h1 >
              </h1>
              </div>
               </div>
              </div>
              <div className="third-video-container">
              <div className="third-video-box">
              <video
              src="./aboutbg2.mp4"
              autoPlay
              loop
              muted
              />
               </div>
              </div>
              <div className="fourth-video-container">
              <div className="fourth-video-box">
              <video
              src="./aboutbg3.mp4"
              autoPlay
              loop
              muted
              />
               </div>
              </div>
            </div>
          </div>
        </div>
         {/* Long Scrolling Section */}
         <div className="long-container-2">
          <div className="long-scroll-container-2">
          <div className="about-recipe-container">
                <h1 className="about-recipe-text">
                Craft Your Perfect Plate
                </h1>
              </div>
          <Slider {...settings}>
              {recipes.map((recipe, index) => (
                <div key={index}>
                  <img src={recipe.img} alt={recipe.name} />
                  <p>{recipe.name}</p>
                </div>
              ))}
            </Slider>
            <div className="relative z-10">
              {/* Scrolling Title Text */}
              <div className="about-recipe-container-2">
                <h1 className="about-recipe-text-2">
                Fuel your wellness journey with recipes designed to meet your unique dietary needs. From your personal cookbook to tailored weekly and daily meal plans, explore hundreds of healthy recipes that nourish your body and support your health goals. Here, your dietary needs are our priority, and every dish is crafted with care.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;












