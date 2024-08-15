import closeIcon from '../assets/close.svg';
import telegram3dImage from '../assets/3d-telegram.png';

function TaskPopUp({ setIsOpen }) {
    return (
        <div className="fixed flex flex-col h-[100%] w-[100%] max-w-[420px] mx-auto bg-[rgba(0,0,0,0.8)] left-0 right-0 top-0 z-[4]">
            <div className="taskpopup relative flex flex-col bg-[#282828] rounded-[10px] w-[calc(100%-40px)] h-[61.33%] m-auto overflow-hidden">
                <div className="bg-gradient-to-tr from-[#B331FF] from-[33.32%] to-[#FFF600] to-[103.28%] px-[20px] py-[12px]">
                    <div className="text-[#fff] text-[28px] leading-[36px] font-[600]">Задание №1</div>
                    <img className="cursor-pointer absolute z-[4] right-[15px] top-[15px] w-[32px] h-[32px] brightness-0" src={closeIcon} alt="" onClick={() => setIsOpen(false)} />
                </div>
                <div className="px-[20px] mt-[5px]">
                    <div className="h-[8px] w-[calc(75%+20px)] ml-[-20px] bg-[#B331FF]"></div>
                    <div className="w-[75%] mt-[5px] flex items-center justify-between">
                        <div className="text-[#B331FF] text-[12px] font-[400]">Мест осталось</div>
                        <div className="text-[#B331FF] text-[12px] font-[400]">75/100</div>
                    </div>
                </div>
                <div className="relative px-[20px] pt-[5.45%] pb-[20px] h-[100%] flex flex-col">
                    <div className="text-[#646464] text-[16px] font-[400] leading-[21px]">
                        Группа в Telegram
                    </div>
                    <div className="text-[24px] font-[600] text-[#fff] leading-[31px] mt-[3.09%] pb-[3.64%] border-b border-dashed border-[#646464]">
                        Подписаться на группу в Telegram
                    </div>
                    <ol className="list-decimal text-[16px] font-[400] text-[#fff] leading-[21px] mt-[3.64%] z-[4] pl-[20px]">
                        <li>Подписаться на канал</li>
                        <li className="mt-[1.82%]">Поставить реакцию на первый пост</li>
                    </ol>
                    <a href="https://t.me/sample.com" target="_blank" className="mt-[3.64%] text-[#1DFFFF] text-[16px] font-[400] underline underline-offset-2 z-[4]">t.me/sample.com</a>
                    <div className="mt-[5.45%] text-[#646464] text-[16px] font-[400]">Награда</div>
                    <div className="flex items-center text-[#FFD900] text-[28px] font-[600] leading-[36px] mt-[1.82%] z-[4]">
                        750
                        <img
                            className="flex w-[28px] h-[28px] mt-[-3px] mr-[-4px]"
                            src={'https://s3-alpha-sig.figma.com/img/cbc2/3ceb/9b95b97ebd472070f82e2df8b8194e31?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l2xqYGEWNFt4LNpJAPN79NafqW-y7KzBbK83oOMYrFBG5YRDreYJoWh6riLTjalmSxuIrobtzRl9dNUNMDRwIQkMw1iOVJ-7MOhYsYtSn-WE-nY0ZQF4bIfpxwJYStr77igKr0e8tzwCIYYHahtCgaDBSVw-nDy4Le93-0flcB--0CEAm5h8O~RMnOkxfRh4~aiIVudm-ABApSsTVAdsvB9ybE5SEvxJSwPe5O0OsSslNmcXqVnonADD4~ZvXHsv6psla6172evw~4FxTIzogdOAyG2vSBVjBEnWpRnR9XqPOOyU8eeIMLLvaELczYuUBAnRKx1GGxo0wTi33O51Vw__'}
                            alt=""
                        />
                    </div>
                    <div className="flex mt-auto">
                        <div className="text-[#494949] text-[20px] font-[600] leading-[20px] rounded-[10px] bg-[#fff] p-[15px] z-[4]" onClick={() => setIsOpen(false)}>
                            Выполнить
                        </div>
                    </div>
                    <div className="absolute z-[3] bottom-[-7.09%] right-[-10.29%] bg-[#12AAEB] w-[60.28%] h-[45.87%] rounded-[100%] blur-[100px]"></div>
                    <img className="absolute z-[4] w-[62.86%] bottom-[-7.09%] right-[-12.86%]" src={telegram3dImage} alt="" />
                </div>
            </div>
        </div>
    );
}

export default TaskPopUp;