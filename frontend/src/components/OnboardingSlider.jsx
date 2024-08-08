import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import slide1Image from '../assets/slide1.png';
import slide2Image from '../assets/slide2.png';
import slide3Image from '../assets/slide3.png';
import forSlide3Image from '../assets/for-slide3.svg';

const OnboardingSlider = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 0,
      pretitle: 'Привет, друг!',
      title: 'Это не очередная тапалка!',
      description: (
        <>
            С нами ты станешь совладельцем бизнеса в сфере <span className="text-[#B331FF]">Web3</span>. Зарабатывай монеты <span className="text-[#FFD900]">$TRAFF</span>, играя в игры и выполняя задания.
        </>
      ),
      image: slide1Image,
      afterimage: 'Мы рады, что ты теперь с нами!'
    },
    {
      type: 0,
      pretitle: 'Сейчас идет бета',
      title: 'Выполняй задания и приглашай друзей',
      description: 'Львиная доля полученных от рекламодателей средств будет распределена через airdrop',
      image: slide2Image,
      afterimage: (
        <>
            Зарабатывай прямо<br/>со смартфона!
        </>
      )
    },
    {
      type: 1,
      title: forSlide3Image,
      description: (
        <>
            Обеспеченный деньгами рекламодателей, токен <span className="text-[#FFD900]">$TRAFF</span> будет распределяться среди пользователей. На часть прибыли мы будем выкупать и сжигать токен, обеспечивая его рост.
        </>
      ),
      image: slide3Image,
    },
  ];

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleComplete = () => {
    // localStorage.setItem('onboardingComplete', 'true');
    onComplete();
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    },
    onSwipedRight: () => {
      if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    },
    trackMouse: true,
    trackTouch: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="relative w-[100%] mt-[10%]" {...handlers}>
      <div className="relative">
        <div className="relative flex transition-transform duration-300 ease-in-out h-[100%]" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="relative w-[100%] flex-shrink-0 px-[20px]">
              {index === 0 && 
                <div className="rounded-[100%] w-[75.6%] h-[35%] absolute top-[45%] right-[-10%] blur-[100px] z-[-1] bg-gradient-to-r from-[#B331FF] from-[25%] to-[#FFF600] to-[130%]"></div>}
              {index === 1 && 
              <>
                <div className="rounded-[100%] w-[58%] h-[27%] absolute top-[45%] right-0 blur-[100px] z-[-1] bg-gradient-to-r from-[#B331FF] from-[25%] to-[#FFF600] to-[130%]"></div>
                <div className="rounded-[100%] rotate-[14.43deg] w-[45.6%] h-[5%] absolute top-[92%] right-0 left-0 mx-auto ml-[22%] blur-[15px] z-[-1] bg-[#0C0C0C]"></div>
              </>}
              {index === 2 && 
              <div className="rounded-[100%] w-[65.61%] h-[29.85%] absolute top-[45%] right-0 left-0 mx-auto blur-[100px] z-[-1] bg-[#6D00AC]"></div>}
              {slide.type === 0 && (
                <h3 className="text-[36px] text-[#3E3E3E] font-[600] leading-none">{slide.pretitle}</h3>
              )}
              {slide.type === 0 && (
                <div className="w-[calc(100% + 40px)] ml-[-20px]">
                  <div className="w-[100%] pr-[20px] h-[3px] bg-gradient-to-r from-[#B331FF] from-[50%] to-[#FFF600] to-[130%] my-[20px]"></div>
                </div>
              )}
              {slide.type === 0 ? (
                <h2 className="text-[24px] leading-[31px] font-[600] mb-[15px]">{slide.title}</h2>
              ) : (
                <img className="w-[94.87%] ml-auto mb-[20px] mr-[-20px]" src={slide.title} alt="" />
              )}
              <p className="text-[#B0B0B0] text-[16px] leading-[21px]">{slide.description}</p>
              {slide.type === 0 ? (
                <img className="mb-[8%] mt-[5%] w-[76.9%] mx-auto" src={slide.image} alt="" />
              ) : (
                <img className="mb-[1%] mt-[-5%] w-[71.79%] mx-auto" src={slide.image} alt="" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto px-[20px]">
        {currentSlide === slides.length - 1 && (
            <button
                onClick={handleComplete}
                className="w-[100%] py-[20px] bg-[#B331FF] text-[24px] text-white rounded-[10px] leading-none"
            >
            Let's Rock
            </button>
        )}
        {slides[currentSlide].type === 0 && (
            <div className="text-center text-[20px] font-[600] leading-[25.8px] mt-auto mx-auto">{slides[currentSlide].afterimage}</div>
        )}
        <div className="mt-[25px] pb-[25px] flex space-x-[5px] w-[100%] justify-center">
            {slides.map((_, index) => (
            <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-[15px] h-[15px] p-0 rounded-[0] hover:outline-0 focus:outline-0 border-0 ${
                currentSlide === index ? 'bg-white' : 'bg-[#4E4E4E]'
                }`}
            />
            ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlider;