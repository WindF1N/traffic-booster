import flameImage from '../assets/flame.png';

function Loading() {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <img
        className="absolute z-[-1] opacity-[0.1] rotate-[-30deg] scale-[2.49] inset-0 m-auto blur-lg"
        src="https://s3-alpha-sig.figma.com/img/c2f0/e149/2a0988f8fbb8d9c554cdc72724b5246d?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jxUqVB-5U2vIKJ4HzKzSr6XtWYvwR8N8U8-DZuKOr9dECas1fz3Co2IsG3hO55T0HRC9g~Neq~cVkYX-BZ1vOTeNHEgeqFbsdA0slQVeoQrgu2rlP3bHVThX5hBNLFjyNAckFIdWVU20Nm~hEtwNQEEtJnlXii-KSj~t1ATlpQVrBQlgXx8IMDVJxCuCNrD4bJ0gkRsr7qzlMRQTEZ8PtO-RpIrVXqQ1-hMTBpqz6MBj6b9DyV-5cj9CWP77cq0SRAcQorbyAu8hxX-4A~NGQ4PefYevFg~BJ5dt6Ufi1IBkgaNIF87NAOGNspQO1B124i0pSohCJcHlLjQ0yJInFg__"
        alt=""
       />
      <div className="absolute inset-0 my-auto ml-[-30%] z-[-1] w-[61.5%] h-[13%] rotate-[150deg] bg-[#B331FF] rounded-[100%] blur-[70px]"></div>
      <div className="absolute bottom-[20%] right-[-40%] z-[-1] w-[74.5%] h-[15.7%] rotate-[45deg] bg-[#B331FF] rounded-[100%] blur-[70px]"></div>
      <h1 className="font-[600] text-[72px] text-[#FFF] leading-none mt-[15%] mr-[26px] ml-auto">Traffic<br/><span className="text-[#FFD900] flex center">Bo<img className="h-[72px]" src={flameImage} alt=""/>ster</span></h1>
      <img 
        className="w-[100%] scale-[1.78] mt-[43%]"
        src="https://s3-alpha-sig.figma.com/img/7fea/f4c8/9dff153ddaaf94cfd45c4a4b09f6a80a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FQ5-SBznRkkJ4Y4JEkBfTy4Cpfqk1BxMHzQWkyZzNsfBrMFbMV6N-f2B8Hv71ADUpOUO0uyRHLcoWC8P907cnUqdfn0g~BGfRm4e~0SxseC31qt6PAII2XsNnTUZkpl38uRGPU-epo95enekrOBOJYKgZBPoKZsPsieJowO7EJAxenGiuU4wzKkfp1L5SFrOt1Fxn3Ker2sryKnYRzPj7aWk1WL5ywAJlbFo5WmpW9iJs1fTsKL5itjcGdbwDPE4HLAqrMTXvar~L19ppPAco8Gy0cKeZBQWcLgltbZI9~XmyvMEhZ5LjARLOoCcjUyLOVT8m5xTrT1-R2Mcf~-TlQ__"
        alt=""
       />
    </div>
  );
}

export default Loading;