import ContentSection from "./ContentSection";
import "./InfoSection.css";
const InfoSection = () => {
  const sectionsData = [
    {
      id: 1,
      content:
        "Step into a realm where melodies intertwine with the whispers of your spirit, a place designed not just to listen to music, but to experience it.",
      imageSrc: "img/music.png",
      altText: "Music notes",
    },
    {
      id: 2,
      content:
        "Customize your profile to reflect the vibrant tapestry of your personality, interests, and journey. Tailor every element to showcase what makes you, uniquely you.",
      imageSrc: "img/listentoMusic.png",
      altText: "Profile",
    },
    {
      id: 3,
      content:
        "Dive into a symphony of stories and listen to the profiles around you. Each one is a unique melody of experiences, dreams, and ideas.",
      imageSrc: "img/peopleinBlackAndWhite.png",
      altText: "Crowd silhouette",
    },
  ];

  return (
    <>
      <p className="d-flex justify-content-center whatisthis">WHAT IS THIS</p>
      <div className="d-flex ml-2 justify-content-around align-items-center info-section">
        {sectionsData.map((section) => (
          <ContentSection
            key={section.id}
            title={section.title}
            content={section.content}
            imageSrc={section.imageSrc}
            altText={section.altText}
          />
        ))}
      </div>
    </>
  );
};

export default InfoSection;
