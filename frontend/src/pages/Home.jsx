import { useState, useEffect, useRef } from 'react';
import Boost from '../components/Boost';
import useAuthStore from '../hooks/useAuthStore';
import useAccount from '../hooks/useAccount';
import useLocalBalance from '../hooks/useLocalBalance';
import useMessages from '../hooks/useMessages';
import useLoadedPages from '../hooks/useLoadedPages';

import bigLeon1Image from '../assets/bigleon1.webp';
import bigLeon2Image from '../assets/bigleon2.webp';
import bigLeon3Image from '../assets/bigleon3.webp';

import raster3dIcon from '../assets/3d-raster-small.webp';
import bgImage from '../assets/bg.webp';
import tronImage from '../assets/tron.webp';
import LoadingSpinner from '../components/LoadingSpinner';

function Home() {
  const [loadedImagesCount, setLoadedImagesCount] = useState(0)
  const { addLoadedPage } = useLoadedPages();
  const loading = useLoadedPages((state) => {
    if ('Home' in state.loadedPages) {
      return state.loadedPages['Home'];
    } else {
      return true
    }
  });
  useEffect(() => {
    if (loadedImagesCount >= 5 && loading) {
      addLoadedPage('Home');
    }
  }, [loadedImagesCount, loading])
  const imgRef = useRef(null);
  const token = useAuthStore((state) => state.token);
  const account = useAccount((state) => state.account);
  const [ plusOnes, setPlusOnes ] = useState([]);
  const { setAccount } = useAccount();
  const { setLocalBalance } = useLocalBalance();
  const { addMessage } = useMessages();
  const localBalance = useLocalBalance((state) => state.localBalance);
  const [ personage, setPersonage ] = useState(() => {
    if (account?.character?.type == 'standart') {
      return bigLeon1Image;
    } else if (account?.character?.type == 'silver') {
      return bigLeon2Image;
    } else if (account?.character?.type == 'gold') {
      return bigLeon3Image;
    }
  });
  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  useEffect(() => {
    if (account?.character?.type == 'standart') {
      setPersonage(bigLeon1Image);
    } else if (account?.character?.type == 'silver') {
      setPersonage(bigLeon2Image);
    } else if (account?.character?.type == 'gold') {
      setPersonage(bigLeon3Image);
    }
  }, [account])
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    // Проверка на наличие события ontouchstart для определения типа устройства
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  const handleClick = (event) => {
    if (isTouchDevice) return; // Если устройство поддерживает касания, ничего не делаем
    imgRef.current.classList.add("active");
    // Добавление надписи +1 с небольшим случайным смещением
    const x = event.clientX + (Math.random() - 0.5) * 200; // Случайное смещение по x
    const y = event.clientY + (Math.random() - 0.5) * 200; // Случайное смещение по y
    const newPlusOne = { x, y, id: Date.now() };
    setPlusOnes(prevPlusOnes => [...prevPlusOnes, newPlusOne].slice(-10)); // Обрезаем массив до последних 10 элементов

    // Увеличение локального баланса
    setLocalBalance(localBalance + Number(account?.character?.multiplier));
    setTimeout(() => {
      imgRef.current.classList.remove("active");
    }, 300)
  };
  const handleTouch = (event) => {
    event.stopPropagation();
    imgRef.current.classList.add("active");
    
    // Добавление надписи +1 с небольшим случайным смещением
    const x = event.touches[0].clientX + (Math.random() - 0.5) * 200; // Случайное смещение по x
    const y = event.touches[0].clientY + (Math.random() - 0.5) * 200; // Случайное смещение по y
    const newPlusOne = { x, y, id: Date.now() };
    setPlusOnes(prevPlusOnes => [...prevPlusOnes, newPlusOne].slice(-10)); // Обрезаем массив до последних 10 элементов

    // Увеличение локального баланса
    setLocalBalance(localBalance + Number(account?.character?.multiplier));
    setTimeout(() => {
      imgRef.current.classList.remove("active");
    }, 300)
  };
  const claimFarming = () => {
    fetch(apiUrl+'/farming/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if ('error' in data) {
          addMessage({
              type: 'error',
              text: data.error,
              name: 'Ошибка:'
          })
        } else {
          setAccount({...account, balance: data.new_balance, farming: data.new_farming });
          addMessage({
              type: 'success',
              text: data.message,
              name: 'Успех:'
          })
        }
    })
    .catch(error => {
        addMessage({
            type: 'error',
            text: error,
            name: 'Ошибка:'
        })
        console.error('Error:', error)
    });
}
  return (
    <>
      <div className="relative h-screen w-[100%]" style={loading ? { display: "none"} : null}>
        <div className="relative flex flex-col h-[100%] overflow-hidden">
          <img
            className="absolute z-[-1] opacity-[0.1] rotate-[-30deg] scale-[2.49] inset-0 m-auto blur-lg"
            src={bgImage}
            alt=""
            onLoad={() => setLoadedImagesCount(prevState => prevState + 1)}
          />
          <div className="flex gap-[10px] px-[20px] mt-[5.07%]">
            <div className="p-[10px] bg-[rgba(117,117,117,0.1)] rounded-[10px] backdrop-blur-[40px]">
              <div className="text-[14px] leading-[18.06px] text-[#F1F1F1] font-[400]">Уровень:</div>
              {account?.character?.type == "standart" &&
              <div className="text-[20px] leading-[25.8px] font-[600] text-[#319BFF] mt-[11px]">{account?.character?.name}</div>}
              {account?.character?.type == "silver" &&
              <div className="text-[20px] leading-[25.8px] font-[600] text-[#9CFF11] mt-[11px]">{account?.character?.name}</div>}
              {account?.character?.type == "gold" &&
              <div className="text-[20px] leading-[25.8px] font-[600] text-[#FF11DF] mt-[11px]">{account?.character?.name}</div>}
            </div>
            <div className="p-[10px] bg-[rgba(117,117,117,0.1)] rounded-[10px] w-[100%] backdrop-blur-[40px]">
              <div className="text-[14px] leading-[18.06px] text-[#F1F1F1] font-[400]">Баланс:</div>
              <div className="text-[28px] leading-[36.12px] font-[600] text-[#FFD900] mt-[6px] flex items-center gap-[5px]">
                {account?.balance?.amount && (Number(account?.balance?.amount) + localBalance).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                <img
                  className="flex w-[20px] h-[20px] mt-[-4px]"
                  src={raster3dIcon}
                  alt=""
                  onLoad={() => setLoadedImagesCount(prevState => prevState + 1)}
                />
              </div>
            </div>
          </div>
          <div className="px-[20px] mt-[10px] z-[3]">
            <div className="p-[10px] bg-[rgba(117,117,117,0.1)] rounded-[10px] backdrop-blur-[40px] flex items-center justify-center">
              <div className="flex text-[14px] font-[400] leading-[18px] text-[#F1F1F1]">Доход каждые 4 часа:</div>
              <div className="ml-[10px] mr-[20px] flex items-center gap-[5px] text-[14px] font-[600] leading-[18px] text-[#FFD900]">
                {1000 * account?.character?.multiplier}
                <img
                  className="flex w-[12px] h-[12px] mt-[-2px]"
                  src={raster3dIcon}
                  alt=""
                  onLoad={() => setLoadedImagesCount(prevState => prevState + 1)}
                />
              </div>
              <div className="flex items-center justify-center">
                {new Date(account?.farming?.end_date) < new Date() ?
                <div onClick={claimFarming}onTouchEnd={() => {
                  try {
                    window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
                  } catch {
                    console.error('Telegram.WebApp.HapticFeedback.impactOccurred is not defined')
                  }
                }} className="transform active:scale-[0.9] transition-transform cursor-pointer px-[12px] py-[6px] rounded-[5px] bg-[#FFD900] flex items-center justify-center text-[#494949] text-[12px] font-[600] leading-[12px]">Забрать</div>
                :<div className="transform active:scale-[0.9] transition-transform cursor-pointer px-[12px] py-[6px] rounded-[5px] bg-[#494949] flex items-center justify-center text-[#292929] text-[12px] font-[600] leading-[12px]">Забрать</div>}
              </div>
            </div>
          </div>
          <div className="absolute left-0 right-0 bottom-[65.33%] mx-auto z-[-1] w-[53.84%] h-[10%] bg-[#B331FF] rounded-[100%] blur-[50px]"></div>
          <div className="absolute left-0 right-0 bottom-[29.06%] mx-auto z-[-1] w-[75.64%] h-[6.4%] bg-[#B331FF] rounded-[100%] blur-[50px]"></div>
          <img
            className="tron absolute z-[-1] w-[100%] scale-[1.582] bottom-[2%]"
            src={tronImage}
            alt=""
            onLoad={() => setLoadedImagesCount(prevState => prevState + 1)}
          />
          <img 
            ref={imgRef}
            className="pers cursor-pointer absolute z-[0] bottom-[21.06%] w-[100%] scale-[1.236]"
            src={personage}
            alt=""
            onClick={handleClick}
            onTouchStart={handleTouch}
            onTouchEnd={() => {
              try {
                window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
              } catch {
                console.error('Telegram.WebApp.HapticFeedback.impactOccurred is not defined')
              }
            }}
            onLoad={() => setLoadedImagesCount(prevState => prevState + 1)}
          />
          {plusOnes.map(plusOne => (
            <div 
              key={plusOne.id}
              className="plusOne"
              style={{ left: `${plusOne.x}px`, top: `${plusOne.y}px` }}
            >
              +{Number(account?.character?.multiplier)}
            </div>
          ))}
        </div>
        <Boost setLoadedImagesCount={setLoadedImagesCount} />
      </div>
      <div className="relative w-[100%] h-[100%] overflow-hidden flex items-center justify-center" style={loading ? null : { display: "none"}}>
        <LoadingSpinner />
      </div>
    </>
  );
}

export default Home;