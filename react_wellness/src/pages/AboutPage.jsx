
// import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'; 
// import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
// import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
// import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
// import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';


import React, { useEffect } from 'react';
import '../App.css'; // Assuming your CSS is in App.css

function AboutPage() {

  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = document.querySelector('.carousel');
      carousel.appendChild(carousel.firstElementChild); // Move the first recipe to the end of the list
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const recipes = [
    { name: 'Recipe 1', img: './burger.jpg' },
    { name: 'Recipe 2', img: './recipe2.jpg' },
    { name: 'Recipe 3', img: './recipe3.jpg' },
    { name: 'Recipe 4', img: './recipe4.jpg' },
    { name: 'Recipe 5', img: './recipe5.jpg' },
    { name: 'Recipe 6', img: './recipe6.jpg' },
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
            <video
              src=""
              autoPlay
              loop
              muted
            />
            <div className="relative z-10">
              {/* Scrolling Title Text */}
              <div className="left-title-scroll-container">
                <h1 className="left-text">
                  Start <br />
                  Your <br/>
                  Journey <br />
                  With Us.<br />
                </h1>
              </div>
                 {/* Half-Circle Carousel */}
                <div className="carousel-container">
                <div className="carousel">
                  {recipes.map((recipe, index) => (
                  <div key={index} className="carousel-item">
                <img src={recipe.img} alt={recipe.name} />
                <p>{recipe.name}</p>
              </div>
            ))}
          </div>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;












