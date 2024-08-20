
// import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'; 
// import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
// import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
// import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
// import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';


import React from 'react';
import '../App.css'; // Assuming your CSS is in App.css

function AboutPage() {
  return (
    <div className="about-page-wrapper">
      <div className="about-page-container">
        {/* Video Box */}
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
                Discover wellness with a balanced approach,<br />
                  tailored to your unique dietary needs.<br />
                    Combine mindful support and nutrition,<br />
                      for a healthier, happier way of life.  
                  
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutPage;




{/* Journey */}
{/* <div className="about-journey-container mx-5 sm:mx-10 md:mx-16 lg:mx-20 flex-grow mt-0">
  <div className="text-center mb-8 md:mb-12 about-journey-title">
    <h2 className="text-2xl md:text-4xl font-serif text-black underline">Start Your Journey With Us</h2>
  </div>
  <div className="text-center mb-6 md:mb-8 about-journey-description">
    <p className="text-lg md:text-xl text-black">
      Empower your journey with a comprehensive tool for managing Ulcerative Colitis, Crohn's, and dietary needs. Seamlessly integrate dietary management with mental health support for a holistic approach to well-being. Optimize your health, achieve lasting wellness, and live better every day!
    </p>
  </div>
  <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center">
    <div className="text-white flex flex-col items-center mb-6 sm:mb-4 lg:mb-6 about-icon-container">
      <RestaurantOutlinedIcon style={{ fontSize: 30 }} />
      <span className="mt-2 text-lg sm:text-lg lg:text-2xl">Browse Recipes</span>
    </div>
    <div className="text-white flex flex-col items-center mb-6 sm:mb-4 lg:mb-6 about-icon-container">
      <ArticleOutlinedIcon style={{ fontSize: 30 }} />
      <span className="mt-2 text-lg sm:text-lg lg:text-2xl">Create Diet Plans</span>
    </div>
    <div className="text-white flex flex-col items-center mb-6 sm:mb-4 lg:mb-6 about-icon-container">
      <MenuBookOutlinedIcon style={{ fontSize: 30 }} />
      <span className="mt-2 text-lg sm:text-lg lg:text-2xl">Save Recipes</span>
    </div>
    <div className="text-white flex flex-col items-center mb-6 sm:mb-4 lg:mb-6 about-icon-container">
      <PsychologyAltOutlinedIcon style={{ fontSize: 30 }} />
      <span className="mt-2 text-lg sm:text-lg lg:text-2xl">Practice Mindfulness</span>
    </div>
    <div className="text-white flex flex-col items-center mb-6 sm:mb-4 lg:mb-6 about-icon-container">
      <DrawOutlinedIcon style={{ fontSize: 30 }} />
      <span className="mt-2 text-lg sm:text-lg lg:text-2xl">Create Journal Entries</span>
    </div>
  </div>
</div> */}