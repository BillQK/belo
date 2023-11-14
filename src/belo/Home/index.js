import Navigation from "./Navigation";
import Header from "./Header";
import Banner from "./Banner";
import InfoSection from "./InfoSection";

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
