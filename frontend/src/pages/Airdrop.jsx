import { useState, useEffect } from 'react';
import tonIcon from '../assets/ton.svg';
import tonImage from '../assets/ton.png';
import settingsIcon from '../assets/settings.svg';
import bgImage from '../assets/bg.png';
import { useTonAddress, useTonWallet  } from '@tonconnect/ui-react';
import { TonClient, fromNano } from "@ton/ton";

function Airdrop() {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const wallet = useTonWallet();
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    const initTon = async () => {
      const client = new TonClient({
        endpoint: import.meta.env.VITE_TON_ENDPOINT || 'https://testnet.toncenter.com/api/v2/jsonRPC',
      });
      const balance = await client.getBalance(wallet.account.address);
      setBalance(fromNano(balance));
    };
    if (userFriendlyAddress) {
      initTon();
    }
  }, [userFriendlyAddress])
  return (
    <>
      <div className="relative flex flex-col h-screen overflow-hidden">
        <img
          className="absolute z-[-1] opacity-[0.1] rotate-[-30deg] scale-[2.49] inset-0 m-auto blur-lg"
          src={bgImage}
          alt=""
        />
        {userFriendlyAddress ?
        <div className="relative mt-[10%] mx-[20px] px-[15px] py-[10px] rounded-[10px] bg-[rgba(117,117,117,0.1)] backdrop-blur-[20px]">
          <div className="text-[#F1F1F1] text-[14px] font-[400] leading-[18px]">Баланс кошелька:</div>
          <div className="flex items-center gap-[5px] text-[28px] leading-[36px] font-[600] text-[#08C] mt-[6px]">
            {balance || 0} 
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
        :
        <div className="relative mt-[10%] mx-[20px] p-[20px] rounded-[10px] bg-[rgba(117,117,117,0.1)] backdrop-blur-[20px]">
          <div className="text-[24px] font-[600] leading-[31px]">
            Привяжите ваш Ton кошелек для будущего Airdrop токена <span className="text-[#FFD900]">$Traff.</span>
          </div>
          <img className="ton w-[65.14%] mx-auto mt-[30px] pb-[38px]" src={tonImage} alt="" />
        </div>}
      </div>
      {!userFriendlyAddress &&
      <div className="transform active:scale-[0.9] transition-transform cursor-pointer fixed-button fixed bottom-[120px] left-[20px] right-[20px] rounded-[10px] w-[calc(100%-40px)] h-[64px] bg-[#0088CC] flex items-center justify-center text-[#fff] font-[600] text-[24px] leading-[24px]"
           onClick={() => {
            document.querySelector('.tonbutton button').click();
           }}
      >
        Подключить
      </div>}
    </>
  );
}

export default Airdrop;