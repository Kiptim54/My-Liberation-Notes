import Header from "./components/Header";
import Rules from "./components/Rules";
import FamilyIntro from "./components/FamilyIntro";
import EpisodesSentiments from "./components/EpisodesSentiments";
import FamilySentiment from "./components/FamilySentiment";
import FamilySpeakingTime from "./components/FamilySpeakingTime";
// import TopKdramaThemes from "./components/TopKdramaThemes";
import { motion } from "framer-motion";

function App() {
  return (
    <section className='font-playfair'>
      <div className=''>
        <motion.div
          className='snap-start'
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Header />
        </motion.div>

        <Rules />

        <motion.div
          className='snap-start '
          initial={{ opacity: 0.5, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FamilyIntro />
        </motion.div>
      </div>
      {/* Episode Sentiment Analysis */}

      <EpisodesSentiments />
      {/* Sentiment Analysis */}
      <FamilySentiment />
      <FamilySpeakingTime />
    </section>
  );
}

export default App;
