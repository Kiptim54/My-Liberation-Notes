import Header from "./components/Header";
import FamilyIntro from "./components/FamilyIntro";
import EpisodesSentiments from "./components/EpisodesSentiments";
import FamilySentiment from "./components/FamilySentiment";

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
    </div>
  );
}

export default App;
