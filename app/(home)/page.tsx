import Navbar from "./navbar";
import TemplatesGallery from "./templates-gallery";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-6">
        <TemplatesGallery />
      </div>
    </div>
  )
}

export default Home;