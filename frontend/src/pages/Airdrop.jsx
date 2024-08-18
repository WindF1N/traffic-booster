import tonIcon from '../assets/ton.svg';
import tonImage from '../assets/ton.png';
import settingsIcon from '../assets/settings.svg';

function Airdrop() {
  return (
    <>
      <div className="relative flex flex-col h-screen overflow-hidden">
        <img
          className="absolute z-[-1] opacity-[0.1] rotate-[-30deg] scale-[2.49] inset-0 m-auto blur-lg"
          src="https://s3-alpha-sig.figma.com/img/c2f0/e149/2a0988f8fbb8d9c554cdc72724b5246d?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jxUqVB-5U2vIKJ4HzKzSr6XtWYvwR8N8U8-DZuKOr9dECas1fz3Co2IsG3hO55T0HRC9g~Neq~cVkYX-BZ1vOTeNHEgeqFbsdA0slQVeoQrgu2rlP3bHVThX5hBNLFjyNAckFIdWVU20Nm~hEtwNQEEtJnlXii-KSj~t1ATlpQVrBQlgXx8IMDVJxCuCNrD4bJ0gkRsr7qzlMRQTEZ8PtO-RpIrVXqQ1-hMTBpqz6MBj6b9DyV-5cj9CWP77cq0SRAcQorbyAu8hxX-4A~NGQ4PefYevFg~BJ5dt6Ufi1IBkgaNIF87NAOGNspQO1B124i0pSohCJcHlLjQ0yJInFg__"
          alt=""
        />
        <div className="relative mt-[10%] mx-[20px] px-[15px] py-[10px] rounded-[10px] bg-[rgba(117,117,117,0.1)] backdrop-blur-[20px]">
          <div className="text-[#F1F1F1] text-[14px] font-[400] leading-[18px]">Баланс кошелька:</div>
          <div className="flex items-center gap-[5px] text-[28px] leading-[36px] font-[600] text-[#08C] mt-[6px]">
            0 
            <img
              className="mt-[-4px]"
              src={tonIcon}
              alt=""
             />
          </div>
          <img
            className="absolute right-[10px] top-[10px]"
            src={settingsIcon}
            alt=""
           />
        </div>
        <div className="relative mt-[10px] mx-[20px] p-[20px] rounded-[10px] bg-[rgba(117,117,117,0.1)] backdrop-blur-[20px]">
          <div className="text-[24px] font-[600] leading-[31px]">
            Привяжите ваш Ton кошелек для будущего Airdrop токена <span className="text-[#FFD900]">$Traff.</span>
          </div>
          <img className="ton w-[65.14%] mx-auto mt-[15px] pb-[38px]" src={tonImage} alt="" />
        </div>
      </div>
      <div className="fixed-button fixed bottom-[120px] left-[20px] right-[20px] rounded-[10px] w-[calc(100%-40px)] h-[64px] bg-[#0088CC] flex items-center justify-center text-[#fff] font-[600] text-[24px] leading-[24px]">
        Подключить
      </div>
    </>
  );
}

export default Airdrop;