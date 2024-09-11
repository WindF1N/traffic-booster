import flameImage from '../assets/flame.webp';
import bgImage from '../assets/bg.webp';
import loadingImage from '../assets/loading.webp';

function Loading({setLoadedImagesCount}) {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <img
        className="absolute z-[-1] opacity-[0.1] rotate-[-30deg] scale-[2.49] inset-0 m-auto blur-lg"
        src={bgImage}
        alt=""
        onLoad={() => setLoadedImagesCount(prevState => prevState + 1)}
      />
      <div className="absolute inset-0 my-auto ml-[-30%] z-[-1] w-[61.5%] h-[13%] rotate-[150deg] bg-[#B331FF] rounded-[100%] blur-[70px]"></div>
      <div className="absolute bottom-[20%] right-[-40%] z-[-1] w-[74.5%] h-[15.7%] rotate-[45deg] bg-[#B331FF] rounded-[100%] blur-[70px]"></div>
      <h1 className="font-[600] text-[72px] text-[#FFF] leading-none mt-[15%] mr-[26px] ml-auto">Traffic<br/><span className="text-[#FFD900] flex center">Bo<img className="h-[72px]" src={flameImage} alt="" onLoad={() => setLoadedImagesCount(prevState => prevState + 1)}/>ster</span></h1>
      <img 
        className="w-[100%] scale-[1.78] mt-[43%]"
        src={loadingImage}
        alt=""
        onLoad={() => setLoadedImagesCount(prevState => prevState + 1)}
      />
    </div>
  );
}

export default Loading;