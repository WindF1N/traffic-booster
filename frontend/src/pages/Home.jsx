import Boost from '../components/Boost';

function Home() {
  return (
    <>
      <div className="relative flex flex-col h-screen overflow-hidden">
        <img
          className="absolute z-[-1] opacity-[0.1] rotate-[-30deg] scale-[2.49] inset-0 m-auto blur-lg"
          src="https://s3-alpha-sig.figma.com/img/c2f0/e149/2a0988f8fbb8d9c554cdc72724b5246d?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jxUqVB-5U2vIKJ4HzKzSr6XtWYvwR8N8U8-DZuKOr9dECas1fz3Co2IsG3hO55T0HRC9g~Neq~cVkYX-BZ1vOTeNHEgeqFbsdA0slQVeoQrgu2rlP3bHVThX5hBNLFjyNAckFIdWVU20Nm~hEtwNQEEtJnlXii-KSj~t1ATlpQVrBQlgXx8IMDVJxCuCNrD4bJ0gkRsr7qzlMRQTEZ8PtO-RpIrVXqQ1-hMTBpqz6MBj6b9DyV-5cj9CWP77cq0SRAcQorbyAu8hxX-4A~NGQ4PefYevFg~BJ5dt6Ufi1IBkgaNIF87NAOGNspQO1B124i0pSohCJcHlLjQ0yJInFg__"
          alt=""
        />
        <div className="flex gap-[10px] px-[20px] mt-[5.07%]">
          <div className="p-[10px] bg-[rgba(117,117,117,0.1)] rounded-[10px] backdrop-blur-[40px]">
            <div className="text-[14px] leading-[18.06px] text-[#F1F1F1] font-[400]">Уровень:</div>
            <div className="text-[20px] leading-[25.8px] font-[600] text-[#319BFF] mt-[11px]">Новичок</div>
          </div>
          <div className="p-[10px] bg-[rgba(117,117,117,0.1)] rounded-[10px] w-[100%] backdrop-blur-[40px]">
            <div className="text-[14px] leading-[18.06px] text-[#F1F1F1] font-[400]">Баланс:</div>
            <div className="text-[28px] leading-[36.12px] font-[600] text-[#FFD900] mt-[6px] flex items-center">
              450.021.210
              <img
                className="flex w-[28px] h-[28px] mt-[-4px] ml-[2px]"
                src={'https://s3-alpha-sig.figma.com/img/cbc2/3ceb/9b95b97ebd472070f82e2df8b8194e31?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2xqYGEWNFt4LNpJAPN79NafqW-y7KzBbK83oOMYrFBG5YRDreYJoWh6riLTjalmSxuIrobtzRl9dNUNMDRwIQkMw1iOVJ-7MOhYsYtSn-WE-nY0ZQF4bIfpxwJYStr77igKr0e8tzwCIYYHahtCgaDBSVw-nDy4Le93-0flcB--0CEAm5h8O~RMnOkxfRh4~aiIVudm-ABApSsTVAdsvB9ybE5SEvxJSwPe5O0OsSslNmcXqVnonADD4~ZvXHsv6psla6172evw~4FxTIzogdOAyG2vSBVjBEnWpRnR9XqPOOyU8eeIMLLvaELczYuUBAnRKx1GGxo0wTi33O51Vw__'}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="absolute left-0 right-0 bottom-[65.33%] mx-auto z-[-1] w-[53.84%] h-[10%] bg-[#B331FF] rounded-[100%] blur-[50px]"></div>
        <div className="absolute left-0 right-0 bottom-[29.06%] mx-auto z-[-1] w-[75.64%] h-[6.4%] bg-[#B331FF] rounded-[100%] blur-[50px]"></div>
        <img
          className="tron absolute z-[-1] w-[100%] scale-[1.582] bottom-0 brightness-50"
          src="https://s3-alpha-sig.figma.com/img/642c/b351/985fc6d91a135121d186f011a4769f6b?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N9I7K8Xsa1kBTxEUeATgHu0J4WqosOg106oMI1Qv9UYU4GZRjRIBA-nIvC5-x1SFx68A6dGdeEI1tHf1y~xFx0Ga9~38h3G640fng8haMEENYfigq-gl9gzZjw0I3wdOGCcXsgPiY1IWLquLeLWxkxtFq4MloKUrwhM0OdgyEzLhmqLKnseTVhnZfplR20cr4neC~7MAvkX6tjRYPVeh9fxOEjHBxP5uRG~Zi5VvNHqcEJSfMvunA5PyJLlAT-YmrgIQBMs8~eCb3sj6dR3aixvl97em3AMFnsVhj7pAPpIPPWn7tQv0QC0XuTkLz6h0FP63xdmzDo1YpNy5D9c2Cw__"
          alt=""
        />
        <img 
          className="pers absolute z-[-1] bottom-[19.06%] w-[100%] scale-[1.236]"
          src="https://s3-alpha-sig.figma.com/img/7fea/f4c8/9dff153ddaaf94cfd45c4a4b09f6a80a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FQ5-SBznRkkJ4Y4JEkBfTy4Cpfqk1BxMHzQWkyZzNsfBrMFbMV6N-f2B8Hv71ADUpOUO0uyRHLcoWC8P907cnUqdfn0g~BGfRm4e~0SxseC31qt6PAII2XsNnTUZkpl38uRGPU-epo95enekrOBOJYKgZBPoKZsPsieJowO7EJAxenGiuU4wzKkfp1L5SFrOt1Fxn3Ker2sryKnYRzPj7aWk1WL5ywAJlbFo5WmpW9iJs1fTsKL5itjcGdbwDPE4HLAqrMTXvar~L19ppPAco8Gy0cKeZBQWcLgltbZI9~XmyvMEhZ5LjARLOoCcjUyLOVT8m5xTrT1-R2Mcf~-TlQ__"
          alt=""
        />
      </div>
      <Boost />
    </>
  );
}

export default Home;