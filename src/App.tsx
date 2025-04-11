import Header from "./components/Header";
import FamilyIntro from "./components/FamilyIntro";
import LineChart from "./components/Charts/LineChart";

function App() {
  return (
    <>
      <Header />
      {/* family introduction */}
      <FamilyIntro />
      <LineChart />
    </>
  );
}

export default App;
