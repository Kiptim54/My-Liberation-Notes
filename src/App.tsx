import Header from "./components/Header";
import FamilyIntro from "./components/FamilyIntro";
import EpisodesSentiments from "./components/EpisodesSentiments";
import FamilySentiment from "./components/FamilySentiment";
import FamilySpeakingTime from "./components/FamilySpeakingTime";

function App() {
  return (
    <div className="font-playfair">
      <Header />
      {/* family introduction */}
      <FamilyIntro />
      {/* Episode Sentiment Analysis */}
      <EpisodesSentiments />
      {/* Sentiment Analysis */}
      <FamilySentiment />
      <FamilySpeakingTime />
    </div>
  );
}

export default App;
