import bgImage from '../assets/bg.png';
import adImage from '../assets/ad.png';
function Ad() {
  return (
    <>
      <div className="relative flex flex-col h-screen overflow-hidden">
        <img
          className="absolute z-[-1] opacity-[0.1] rotate-[-30deg] scale-[2.49] inset-0 m-auto blur-lg"
          src={bgImage}
          alt=""
        />
        <div className="text-[24px] leading-[30.96px] mt-[10%] px-[20px] font-[600] text-[#fff]">
          Вам нужен трафик? Вы в нужном месте!
        </div>
        <div className="text-[16px] leading-[20.64px] px-[20px] font-[400] mt-[10px] text-[#B0B0B0]">
          Заполняйте форму и мы свяжемся с вами
        </div>
        <div className="absolute z-[-1] top-[30.27%] left-0 right-0 mx-auto bg-[#5BC3FD] w-[51.79%] h-[26.93%] rounded-[100%] blur-[100px]"></div>
        <img
          className="absolute inset-0 top-[20.27%] mx-auto w-[100%] ad-image"
          src={adImage}
          alt=""
        />
      </div>
      <div onClick={() => {
        window.Telegram?.WebApp?.openLink('https://forms.gle/pXP5HNFYuo6coAiC8')
      }} onTouchEnd={() => {
        try {
          window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
        } catch {
          console.error('Telegram.WebApp.HapticFeedback.impactOccurred is not defined')
        }
      }} className="transform active:scale-[0.9] transition-transform cursor-pointer fixed-button fixed bottom-[120px] left-[20px] right-[20px] rounded-[10px] w-[calc(100%-40px)] h-[64px] bg-gradient-to-r from-[#5097EE] from-[0%] to-[#5CC9FF] to-[100%] flex items-center justify-center text-[#fff] font-[600] text-[24px] leading-[24px]">
        Связаться
      </div>
    </>
  );
}

export default Ad;