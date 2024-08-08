import tasksImage from '../assets/tasks-image.png';
import slide1Image from '../assets/slide1.png';

function Tasks() {
  return (
    <div className="relative flex flex-col h-screen overflow-x-hidden pb-[120px]">
      <img
        className="absolute z-[-1] opacity-[0.1] rotate-[-30deg] scale-[2.49] inset-0 m-auto blur-lg"
        src="https://s3-alpha-sig.figma.com/img/c2f0/e149/2a0988f8fbb8d9c554cdc72724b5246d?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jxUqVB-5U2vIKJ4HzKzSr6XtWYvwR8N8U8-DZuKOr9dECas1fz3Co2IsG3hO55T0HRC9g~Neq~cVkYX-BZ1vOTeNHEgeqFbsdA0slQVeoQrgu2rlP3bHVThX5hBNLFjyNAckFIdWVU20Nm~hEtwNQEEtJnlXii-KSj~t1ATlpQVrBQlgXx8IMDVJxCuCNrD4bJ0gkRsr7qzlMRQTEZ8PtO-RpIrVXqQ1-hMTBpqz6MBj6b9DyV-5cj9CWP77cq0SRAcQorbyAu8hxX-4A~NGQ4PefYevFg~BJ5dt6Ufi1IBkgaNIF87NAOGNspQO1B124i0pSohCJcHlLjQ0yJInFg__"
        alt=""
       />
      <div className="relative min-h-[206px] px-[20px] bg-[rgba(117,117,117,0.1)] backdrop-blur-[40px] overflow-hidden flex flex-col justify-end">
        <img className="absolute right-0 bottom-0 z-[-1] w-[50%]" src={tasksImage} alt="" />
        <div className="font-[600] text-[20px] leading-[25.8px] text-[#fff] pt-[10%]">Приглашай друзей и получай по 100.000 тыс монет за каждого</div>
        <div className="mb-[20px] mt-[8%] drop-shadow-2xl font-[600] text-[20px] leading-[25.8px] text-[#fff] w-[54.35%] h-[85px] flex justify-center items-center bg-gradient-to-br from-[#00C0E7] from-[10.37%] to-[#0070B0] to-[109.67%] rounded-[10px]">
          Пригласить
        </div>
      </div>
      <div className="px-[20px] mt-[20px]">
        <div className="bg-[rgba(117,117,117,0.1)] p-[10px] rounded-[10px] flex justify-between relative overflow-hidden">
          <div>
            <div className="text-[10px] font-[400] leading-[12.9px] text-[#646464] mb-[3px]">Lorem ipsum dolor sit amet</div>
            <div className="text-[16px] font-[500] leading-[20.64px] text-[#fff] pb-[3px]">Lorem ipsum dolor sit amet</div>
          </div>
          <div className="text-[#FFD900] font-[600] text-[28px] leading-[36.12px] flex items-center">
            750 
            <img
              className="w-[28px] h-[28px] mt-[-4px]"
              src={'https://s3-alpha-sig.figma.com/img/cbc2/3ceb/9b95b97ebd472070f82e2df8b8194e31?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2xqYGEWNFt4LNpJAPN79NafqW-y7KzBbK83oOMYrFBG5YRDreYJoWh6riLTjalmSxuIrobtzRl9dNUNMDRwIQkMw1iOVJ-7MOhYsYtSn-WE-nY0ZQF4bIfpxwJYStr77igKr0e8tzwCIYYHahtCgaDBSVw-nDy4Le93-0flcB--0CEAm5h8O~RMnOkxfRh4~aiIVudm-ABApSsTVAdsvB9ybE5SEvxJSwPe5O0OsSslNmcXqVnonADD4~ZvXHsv6psla6172evw~4FxTIzogdOAyG2vSBVjBEnWpRnR9XqPOOyU8eeIMLLvaELczYuUBAnRKx1GGxo0wTi33O51Vw__'}
              alt=""
             />
          </div>
          <div className="absolute bottom-0 left-0 h-[8px] w-[75%] bg-[#B331FF]"></div>
        </div>
        <div className="w-[75%] mt-[5px] flex items-center justify-between">
          <div className="text-[#B331FF] text-[12px] font-[400]">Мест осталось</div>
          <div className="text-[#B331FF] text-[12px] font-[400]">75/100</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-[10px] px-[20px] pt-[10px]">
        <div className="relative overflow-hidden bg-[rgba(117,117,117,0.1)] rounded-[10px] p-[10px] w-[calc(50%-5px)]">
          <div className="text-[#646464] text-[10px] font-[400] leading-[12.9px]">Lorem ipsum dolor sit amet</div>
          <div className="text-[#FFD900] font-[600] text-[14px] leading-[18.06px] flex items-center mt-[5px]">
            750 
            <img
              className="w-[12px] h-[12px] mt-[-2px]"
              src={'https://s3-alpha-sig.figma.com/img/cbc2/3ceb/9b95b97ebd472070f82e2df8b8194e31?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2xqYGEWNFt4LNpJAPN79NafqW-y7KzBbK83oOMYrFBG5YRDreYJoWh6riLTjalmSxuIrobtzRl9dNUNMDRwIQkMw1iOVJ-7MOhYsYtSn-WE-nY0ZQF4bIfpxwJYStr77igKr0e8tzwCIYYHahtCgaDBSVw-nDy4Le93-0flcB--0CEAm5h8O~RMnOkxfRh4~aiIVudm-ABApSsTVAdsvB9ybE5SEvxJSwPe5O0OsSslNmcXqVnonADD4~ZvXHsv6psla6172evw~4FxTIzogdOAyG2vSBVjBEnWpRnR9XqPOOyU8eeIMLLvaELczYuUBAnRKx1GGxo0wTi33O51Vw__'}
              alt=""
             />
          </div>
          <div className="text-[#fff] font-[500] text-[14px] leading-[18.06px] mt-[5px] w-[68.82%]">
            Lorem ipsum dolor sit amet
          </div>
          <img className="w-[44.7%] absolute bottom-[-25%] right-[-10%]" src={slide1Image} alt="" />
        </div>
        <div className="relative overflow-hidden bg-[rgba(117,117,117,0.1)] rounded-[10px] p-[10px] w-[calc(50%-5px)]">
          <div className="text-[#646464] text-[10px] font-[400] leading-[12.9px]">Lorem ipsum dolor sit amet</div>
          <div className="text-[#FFD900] font-[600] text-[14px] leading-[18.06px] flex items-center mt-[5px]">
            750 
            <img
              className="w-[12px] h-[12px] mt-[-2px]"
              src={'https://s3-alpha-sig.figma.com/img/cbc2/3ceb/9b95b97ebd472070f82e2df8b8194e31?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2xqYGEWNFt4LNpJAPN79NafqW-y7KzBbK83oOMYrFBG5YRDreYJoWh6riLTjalmSxuIrobtzRl9dNUNMDRwIQkMw1iOVJ-7MOhYsYtSn-WE-nY0ZQF4bIfpxwJYStr77igKr0e8tzwCIYYHahtCgaDBSVw-nDy4Le93-0flcB--0CEAm5h8O~RMnOkxfRh4~aiIVudm-ABApSsTVAdsvB9ybE5SEvxJSwPe5O0OsSslNmcXqVnonADD4~ZvXHsv6psla6172evw~4FxTIzogdOAyG2vSBVjBEnWpRnR9XqPOOyU8eeIMLLvaELczYuUBAnRKx1GGxo0wTi33O51Vw__'}
              alt=""
             />
          </div>
          <div className="text-[#fff] font-[500] text-[14px] leading-[18.06px] mt-[5px] w-[68.82%]">
            Lorem ipsum dolor sit amet
          </div>
          <img className="w-[44.7%] absolute bottom-[-25%] right-[-10%]" src={slide1Image} alt="" />
        </div>
        <div className="relative overflow-hidden bg-[rgba(117,117,117,0.1)] rounded-[10px] p-[10px] w-[calc(50%-5px)]">
          <div className="text-[#646464] text-[10px] font-[400] leading-[12.9px]">Lorem ipsum dolor sit amet</div>
          <div className="text-[#FFD900] font-[600] text-[14px] leading-[18.06px] flex items-center mt-[5px]">
            750 
            <img
              className="w-[12px] h-[12px] mt-[-2px]"
              src={'https://s3-alpha-sig.figma.com/img/cbc2/3ceb/9b95b97ebd472070f82e2df8b8194e31?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2xqYGEWNFt4LNpJAPN79NafqW-y7KzBbK83oOMYrFBG5YRDreYJoWh6riLTjalmSxuIrobtzRl9dNUNMDRwIQkMw1iOVJ-7MOhYsYtSn-WE-nY0ZQF4bIfpxwJYStr77igKr0e8tzwCIYYHahtCgaDBSVw-nDy4Le93-0flcB--0CEAm5h8O~RMnOkxfRh4~aiIVudm-ABApSsTVAdsvB9ybE5SEvxJSwPe5O0OsSslNmcXqVnonADD4~ZvXHsv6psla6172evw~4FxTIzogdOAyG2vSBVjBEnWpRnR9XqPOOyU8eeIMLLvaELczYuUBAnRKx1GGxo0wTi33O51Vw__'}
              alt=""
             />
          </div>
          <div className="text-[#fff] font-[500] text-[14px] leading-[18.06px] mt-[5px] w-[68.82%]">
            Lorem ipsum dolor sit amet
          </div>
          <img className="w-[44.7%] absolute bottom-[-25%] right-[-10%]" src={slide1Image} alt="" />
        </div>
        <div className="relative overflow-hidden bg-[rgba(117,117,117,0.1)] rounded-[10px] p-[10px] w-[calc(50%-5px)]">
          <div className="text-[#646464] text-[10px] font-[400] leading-[12.9px]">Lorem ipsum dolor sit amet</div>
          <div className="text-[#FFD900] font-[600] text-[14px] leading-[18.06px] flex items-center mt-[5px]">
            750 
            <img
              className="w-[12px] h-[12px] mt-[-2px]"
              src={'https://s3-alpha-sig.figma.com/img/cbc2/3ceb/9b95b97ebd472070f82e2df8b8194e31?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2xqYGEWNFt4LNpJAPN79NafqW-y7KzBbK83oOMYrFBG5YRDreYJoWh6riLTjalmSxuIrobtzRl9dNUNMDRwIQkMw1iOVJ-7MOhYsYtSn-WE-nY0ZQF4bIfpxwJYStr77igKr0e8tzwCIYYHahtCgaDBSVw-nDy4Le93-0flcB--0CEAm5h8O~RMnOkxfRh4~aiIVudm-ABApSsTVAdsvB9ybE5SEvxJSwPe5O0OsSslNmcXqVnonADD4~ZvXHsv6psla6172evw~4FxTIzogdOAyG2vSBVjBEnWpRnR9XqPOOyU8eeIMLLvaELczYuUBAnRKx1GGxo0wTi33O51Vw__'}
              alt=""
             />
          </div>
          <div className="text-[#fff] font-[500] text-[14px] leading-[18.06px] mt-[5px] w-[68.82%]">
            Lorem ipsum dolor sit amet
          </div>
          <img className="w-[44.7%] absolute bottom-[-25%] right-[-10%]" src={slide1Image} alt="" />
        </div>
        <div className="relative overflow-hidden bg-[rgba(117,117,117,0.1)] rounded-[10px] p-[10px] w-[calc(50%-5px)]">
          <div className="text-[#646464] text-[10px] font-[400] leading-[12.9px]">Lorem ipsum dolor sit amet</div>
          <div className="text-[#FFD900] font-[600] text-[14px] leading-[18.06px] flex items-center mt-[5px]">
            750 
            <img
              className="w-[12px] h-[12px] mt-[-2px]"
              src={'https://s3-alpha-sig.figma.com/img/cbc2/3ceb/9b95b97ebd472070f82e2df8b8194e31?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2xqYGEWNFt4LNpJAPN79NafqW-y7KzBbK83oOMYrFBG5YRDreYJoWh6riLTjalmSxuIrobtzRl9dNUNMDRwIQkMw1iOVJ-7MOhYsYtSn-WE-nY0ZQF4bIfpxwJYStr77igKr0e8tzwCIYYHahtCgaDBSVw-nDy4Le93-0flcB--0CEAm5h8O~RMnOkxfRh4~aiIVudm-ABApSsTVAdsvB9ybE5SEvxJSwPe5O0OsSslNmcXqVnonADD4~ZvXHsv6psla6172evw~4FxTIzogdOAyG2vSBVjBEnWpRnR9XqPOOyU8eeIMLLvaELczYuUBAnRKx1GGxo0wTi33O51Vw__'}
              alt=""
             />
          </div>
          <div className="text-[#fff] font-[500] text-[14px] leading-[18.06px] mt-[5px] w-[68.82%]">
            Lorem ipsum dolor sit amet
          </div>
          <img className="w-[44.7%] absolute bottom-[-25%] right-[-10%]" src={slide1Image} alt="" />
        </div>
        <div className="relative overflow-hidden bg-[rgba(117,117,117,0.1)] rounded-[10px] p-[10px] w-[calc(50%-5px)]">
          <div className="text-[#646464] text-[10px] font-[400] leading-[12.9px]">Lorem ipsum dolor sit amet</div>
          <div className="text-[#FFD900] font-[600] text-[14px] leading-[18.06px] flex items-center mt-[5px]">
            750 
            <img
              className="w-[12px] h-[12px] mt-[-2px]"
              src={'https://s3-alpha-sig.figma.com/img/cbc2/3ceb/9b95b97ebd472070f82e2df8b8194e31?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2xqYGEWNFt4LNpJAPN79NafqW-y7KzBbK83oOMYrFBG5YRDreYJoWh6riLTjalmSxuIrobtzRl9dNUNMDRwIQkMw1iOVJ-7MOhYsYtSn-WE-nY0ZQF4bIfpxwJYStr77igKr0e8tzwCIYYHahtCgaDBSVw-nDy4Le93-0flcB--0CEAm5h8O~RMnOkxfRh4~aiIVudm-ABApSsTVAdsvB9ybE5SEvxJSwPe5O0OsSslNmcXqVnonADD4~ZvXHsv6psla6172evw~4FxTIzogdOAyG2vSBVjBEnWpRnR9XqPOOyU8eeIMLLvaELczYuUBAnRKx1GGxo0wTi33O51Vw__'}
              alt=""
             />
          </div>
          <div className="text-[#fff] font-[500] text-[14px] leading-[18.06px] mt-[5px] w-[68.82%]">
            Lorem ipsum dolor sit amet
          </div>
          <img className="w-[44.7%] absolute bottom-[-25%] right-[-10%]" src={slide1Image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Tasks;