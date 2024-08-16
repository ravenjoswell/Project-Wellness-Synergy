import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Box = ({ to, title, icon }) => {
  return (
    <motion.div
      className="gradient-bg text-white flex items-center justify-center rounded-full w-64 h-24 mb-6 cursor-pointer glow"
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 165, 0, 0.7)" }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    >
      <Link to={to} className="flex items-center justify-center w-full h-full text-center">
        <span className="text-xl font-semibold">{title}</span>
      </Link>
    </motion.div>
  );
};

export default Box;
