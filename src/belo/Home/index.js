import Navigation from "../components/Nav/Navigation";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import InfoSection from "../components/InfoSection/InfoSection";

const Home = () => {
  return (
    <div>
      <Navigation />
      <Header />
      <Banner imagePath="/img/crowd.png" altText="Crowd enjoying music" />
      <InfoSection />
    </div>
  );
};
export default Home;
