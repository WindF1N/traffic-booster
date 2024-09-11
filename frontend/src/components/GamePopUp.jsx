import closeIcon from '../assets/close.svg';
import raster3dImage from '../assets/3d-raster.webp';

function GamePopUp({ setIsOpen }) {
  return (
    <div className="fixed flex flex-col h-[100%] w-[100%] max-w-[420px] mx-auto bg-[rgba(0,0,0,0.8)] left-0 right-0 top-0 z-[4]">
        <div className="relative flex flex-col bg-[#282828] rounded-[10px] w-[calc(100%-40px)] h-[61.33%] m-auto p-[15px] overflow-hidden">
            <div className="text-[28px] font-[600] leading-[36px]">
                Поздравляем!<br/>Вы прошли игру
            </div>
            <div className="text-[16px] font-[400] leading-[21px] mt-[20px]">
                Ваше вознаграждение <span className="text-[#FFD900]">1 000 000 монет</span>
            </div>
            <div className="flex mt-auto">
                <div className="cursor-pointer text-[#494949] text-[20px] font-[600] leading-[20px] rounded-[10px] bg-[#fff] p-[15px]" onClick={() => setIsOpen(false)}>
                    Забрать
                </div>
            </div>
            <div className="absolute z-[3] bottom-[9.78%] right-[-10.29%] bg-[#FFD900] w-[60.28%] h-[45.87%] rounded-[100%] blur-[100px]"></div>
            <img className="absolute z-[4] w-[75.42%] bottom-[-7.39%] right-[-24%]" src={raster3dImage} alt="" />
            <img className="cursor-pointer absolute z-[4] right-[15px] top-[15px] w-[32px] h-[32px]" src={closeIcon} alt="" onClick={() => setIsOpen(false)} />
        </div>
    </div>
  );
}

export default GamePopUp;