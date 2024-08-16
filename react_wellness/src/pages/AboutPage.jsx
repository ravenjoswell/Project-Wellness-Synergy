import '../App.css';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'; 
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';

function AboutPage() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center">
      {/* Video box */}
      <div className="video-box">
        <div className="video-container">
          <video
            src="./background3.mp4"
            autoPlay
            loop
            muted
          />
          <div className="relative z-10">
            {/* Parallax Container */}
            <div className="parallax-container">
              <div className="parallax">
                <div className="parallax-content">
                  <h1 className="text-5xl">Wellness Synergy Awaits You.</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey */}
      <div className="journey-container mx-5 sm:mx-10 md:mx-16 lg:mx-20 flex-grow mt-0">
        <div className="text-center mb-8 md:mb-12 journey-title">
          <h2 className="text-2xl md:text-4xl font-serif text-white underline">Start Your Journey With Us</h2>
        </div>
        <div className="text-center mb-6 md:mb-8 journey-description">
          <p className="text-lg md:text-xl text-white">
            Empower your journey with a comprehensive tool for managing Ulcerative Colitis, Crohn's, and dietary needs. Seamlessly integrate dietary management with mental health support for a holistic approach to well-being. Optimize your health, achieve lasting wellness, and live better every day!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center">
          <div className="text-white flex items-center mb-6 sm:mb-4 lg:mb-6 icon-container">
            <RestaurantOutlinedIcon style={{ fontSize: 30 }} />
            <span className="ml-2 text-lg sm:text-lg lg:text-2xl">Browse Recipes</span>
          </div>
          <div className="text-white flex items-center mb-6 sm:mb-4 lg:mb-6 icon-container">
            <ArticleOutlinedIcon style={{ fontSize: 30 }} />
            <span className="ml-2 text-lg sm:text-lg lg:text-2xl">Create Diet Plans</span>
          </div>
          <div className="text-white flex items-center mb-6 sm:mb-4 lg:mb-6 icon-container">
            <MenuBookOutlinedIcon style={{ fontSize: 30 }} />
            <span className="ml-2 text-lg sm:text-lg lg:text-2xl">Save Recipes</span>
          </div>
          <div className="text-white flex items-center mb-6 sm:mb-4 lg:mb-6 icon-container">
            <PsychologyAltOutlinedIcon style={{ fontSize: 30 }} />
            <span className="ml-2 text-lg sm:text-lg lg:text-2xl">Practice Mindfulness</span>
          </div>
          <div className="text-white flex items-center mb-6 sm:mb-4 lg:mb-6 icon-container">
            <DrawOutlinedIcon style={{ fontSize: 30 }} />
            <span className="ml-2 text-lg sm:text-lg lg:text-2xl">Create Journal Entries</span>
          </div>
        </div>
      </div>

      {/* Vertical videos */}
      <div className="vertical-videos">
        <div className="video-item">
          <video
            src="./foodvid4.mp4"
            autoPlay
            loop
            muted
          />
          <div className="video-overlay">
            <h3>Your Needs</h3>
          </div>
        </div>
        <div className="video-item">
          <video
            src="./foodvid2.mp4"
            loop
            muted
          />
          <div className="video-overlay">
            <h3>&</h3>
          </div>
        </div>
        <div className="video-item">
          <video
            src="./foodvid3.mp4"
            autoPlay
            loop
            muted
          />
          <div className="video-overlay">
            <h3>Your Joy</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
