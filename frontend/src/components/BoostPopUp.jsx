import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import closeIcon from '../assets/close.svg';
import tonIcon from '../assets/ton.svg';
import arrowIcon from '../assets/arrow.svg';

import leon1Image from '../assets/leon1.png';
import leon2Image from '../assets/leon2.png';
import leon3Image from '../assets/leon3.png';

function BoostPopUp({ setIsOpen }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            title: 'Новичок',
            description: 'Базовый персонаж, зарабатывает как все.',
            image: leon1Image,
            used: true,
            color: "#319BFF",
            price_TON: 2,
            price_STARS: 750
        },
        {
            title: 'Опытный',
            description: 'Зарабатывай со всех заданий в 2 раза больше!',
            image: leon2Image,
            used: false,
            color: "#9CFF11",
            price_TON: 2,
            price_STARS: 750
        },
        {
            title: 'Легендарный',
            description: 'Зарабатывай со всех заданий в 3 раза больше!',
            image: leon3Image,
            used: false,
            color: "#FF11DF",
            price_TON: 4,
            price_STARS: 1500
        },
    ];
    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    }
    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    }
    const handlers = useSwipeable({
        onSwipedLeft: nextSlide,
        onSwipedRight: prevSlide,
        trackMouse: true,
        trackTouch: true,
    });
    return (
        <div className="fixed flex flex-col h-[100%] w-[100%] max-w-[420px] mx-auto bg-[rgba(0,0,0,0.8)] left-0 right-0 top-0 z-[4]">
            <div className="boostpopup relative flex flex-col bg-[#282828] rounded-[10px] w-[calc(100%-40px)] h-[61.33%] m-auto overflow-hidden" {...handlers}>
                <div className="bg-gradient-to-tr from-[#B331FF] from-[33.32%] to-[#FFF600] to-[103.28%] px-[20px] py-[12px]">
                    <div className="text-[#fff] text-[28px] leading-[36px] font-[600]">Улучшение</div>
                    <img className="cursor-pointer absolute z-[4] right-[15px] top-[15px] w-[32px] h-[32px] brightness-0" src={closeIcon} alt="" onClick={() => setIsOpen(false)} />
                </div>
                <div className="relative w-[100%] h-[100%]">
                    <div className="relative flex transition-transform duration-300 ease-in-out h-[100%]" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {slides.map((slide, index) => (
                            <div className="relative overflow-hidden h-[100%] w-[100%] flex-shrink-0" key={index}>
                                <div className="px-[20px] mt-[20px] text-[16px] font-[400] leading-[21px] text-[#fff]">Уровень: <span style={{color: slide.color}}>{slide.title}</span></div>
                                {slide.description && <div className="px-[20px] mt-[10px] text-[14px] font-[400] leading-[18px] text-[#ADADAD]">{slide.description}</div>}
                                <div className='w-[36%] h-[32.18%] rounded-[100%] absolute inset-0 m-auto blur-[75px] z-[0]' style={{background: slide.color}}></div>
                                <img className="z-[1] w-[58.57%] absolute inset-0 m-auto" src={slide.image} alt="" />
                                {!slide.used ?
                                <div className="absolute bottom-[10px] left-[10px] right-[10px] p-[10px] border border-[#4B4B4B] rounded-[10px] backdrop-blur-[20px] bg-[rgba(117,117,117,0.1)] flex gap-[15px] items-center justify-around">
                                    <div className="text-[16px] font-[600] leading-[21px] text-[#fff]">Улучшить за:</div>
                                    <div className="flex gap-[7px] items-center">
                                        <div className="cursor-pointer flex gap-[2px] justify-center text-[#FFD900] font-[600] text-[16px] leading-[17px] items-center min-w-[80px] min-h-[40px] pt-[2px] bg-[#262626] rounded-[10px] border border-[#FFD900]">
                                            {slide.price_STARS}
                                            <img
                                                className="flex w-[20px] h-[20px] mt-[-2px] mr-[-4px]"
                                                src={'https://s3-alpha-sig.figma.com/img/cbc2/3ceb/9b95b97ebd472070f82e2df8b8194e31?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2xqYGEWNFt4LNpJAPN79NafqW-y7KzBbK83oOMYrFBG5YRDreYJoWh6riLTjalmSxuIrobtzRl9dNUNMDRwIQkMw1iOVJ-7MOhYsYtSn-WE-nY0ZQF4bIfpxwJYStr77igKr0e8tzwCIYYHahtCgaDBSVw-nDy4Le93-0flcB--0CEAm5h8O~RMnOkxfRh4~aiIVudm-ABApSsTVAdsvB9ybE5SEvxJSwPe5O0OsSslNmcXqVnonADD4~ZvXHsv6psla6172evw~4FxTIzogdOAyG2vSBVjBEnWpRnR9XqPOOyU8eeIMLLvaELczYuUBAnRKx1GGxo0wTi33O51Vw__'}
                                                alt=""
                                            />
                                        </div>
                                        <div className="text-[14px] leading-[16px] font-[400] text-[#A7A7A7]">/</div>
                                        <div className="cursor-pointer flex gap-[5px] justify-center text-[#0088CC] font-[600] text-[16px] leading-[17px] items-center min-w-[80px] min-h-[40px] pt-[2px] bg-[#fff] rounded-[10px] border border-[#fff]">
                                            {slide.price_TON}
                                            <img
                                                className="flex w-[16px] h-[16px] mt-[-2.5px]"
                                                src={tonIcon}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="absolute bottom-[10px] left-[10px] right-[10px] p-[10px] border border-[#4B4B4B] rounded-[10px] backdrop-blur-[20px] bg-[rgba(117,117,117,0.1)] flex gap-[15px] items-center justify-around">
                                    <div className="text-[16px] font-[600] leading-[21px] text-[#fff]">Уже используется</div>
                                </div>}
                            </div>
                        ))}
                    </div>
                    <div className="fixed top-0 bottom-0 left-[20px] right-[20px] m-auto flex items-center justify-between">
                        <div>{currentSlide > 0 && <img src={arrowIcon} className="cursor-pointer rotate-[180deg] w-[48px]" alt="" onClick={prevSlide} />}</div>
                        <div>{currentSlide < slides.length - 1 && <img src={arrowIcon} className="cursor-pointer w-[48px]" alt="" onClick={nextSlide} />}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoostPopUp;