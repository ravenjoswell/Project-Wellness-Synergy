import Box from '../components/Box';
import '../App.css'; // Import your CSS file

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Background Video */}
      <div className="background-video">
        <video
          src="your-video-url.mp4"
          autoPlay
          loop
          muted
          className="video"
        />
      </div>
      {/* Overlay */}
      <div className="overlay"></div>
      {/* Content */}
      <div className="content">
        <h1 className="title">Welcome to Wellness Synergy</h1>
        <p className="description">Explore our resources and tools designed to enhance your well-being.</p>
        <div className="box-grid">
          <Box to="/recipe" title="Recipe" />
          <Box to="/cookbook" title="Cookbook" />
          <Box to="/diet" title="Diet" />
          <Box to="/mindfulness" title="Mindfulness" />
          <Box to="/journal" title="Journal" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
