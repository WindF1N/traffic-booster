import React from 'react';
import doubleArrowIcon from '../assets/double-arrow.svg';

function Boost() {
  return (
    <div className="boost overflow-hidden fixed bottom-[110px] left-[20px] right-[20px] flex justify-between bg-[rgba(117,117,117,0.1)] w-[calc(100% - 40px)] h-[50px] rounded-[10px] z-[3] backdrop-blur-[40px]">
      <div className="flex justify-center items-center px-[10px] py-[13px] text-[16px] font-[600] leading-[20.64px] bg-gradient-to-tr from-[#B331FF] from-[33.32%] to-[#FFF700] to-[103.28%]">
        Улучшить
        <img src={doubleArrowIcon} alt="" />
      </div>
      <div className="py-[6px] px-[10px] flex flex-col justify-between items-end">
        <div className="text-[10px] font-[400] leading-[12.9px]">
            След. уровень: <span className="text-[#9CFF11]">Опытный</span>
        </div>
        <div className="text-[#FFD900] text-[10px] font-[400] leading-[12.9px] flex items-center gap-[2px]">
            750
            <img
                className="w-[10px] h-[10px] mt-[-2px]"
                src={'https://s3-alpha-sig.figma.com/img/cbc2/3ceb/9b95b97ebd472070f82e2df8b8194e31?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2xqYGEWNFt4LNpJAPN79NafqW-y7KzBbK83oOMYrFBG5YRDreYJoWh6riLTjalmSxuIrobtzRl9dNUNMDRwIQkMw1iOVJ-7MOhYsYtSn-WE-nY0ZQF4bIfpxwJYStr77igKr0e8tzwCIYYHahtCgaDBSVw-nDy4Le93-0flcB--0CEAm5h8O~RMnOkxfRh4~aiIVudm-ABApSsTVAdsvB9ybE5SEvxJSwPe5O0OsSslNmcXqVnonADD4~ZvXHsv6psla6172evw~4FxTIzogdOAyG2vSBVjBEnWpRnR9XqPOOyU8eeIMLLvaELczYuUBAnRKx1GGxo0wTi33O51Vw__'}
                alt=""
             />
        </div>
      </div>
    </div>
  );
}

export default Boost;