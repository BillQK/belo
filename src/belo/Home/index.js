import Navigation from "./Nav/Navigation";
import Header from "./Header/Header";
import Banner from "./Banner/Banner";
import InfoSection from "./InfoSection/InfoSection";

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
