import { useState, useEffect, useRef } from 'react';
import Boost from '../components/Boost';
import useAuthStore from '../hooks/useAuthStore';
import useAccount from '../hooks/useAccount';
import useLocalBalance from '../hooks/useLocalBalance';

import bigLeon1Image from '../assets/bigleon1.png';
import bigLeon2Image from '../assets/bigleon2.png';
import bigLeon3Image from '../assets/bigleon3.png';

import raster3dIcon from '../assets/3d-raster-small.png';
import bgImage from '../assets/bg.png';
import tronImage from '../assets/tron.png';

function Home() {
  const imgRef = useRef(null);
  const token = useAuthStore((state) => state.token);
  const account = useAccount((state) => state.account);
  const [ shakeAnimation, setShakeAnimation ] = useState("shake1");
  const [ plusOnes, setPlusOnes ] = useState([]);
  const { setAccount } = useAccount();
  const { setLocalBalance } = useLocalBalance();
  const localBalance = useLocalBalance((state) => state.localBalance);
  const [ personage, setPersonage ] = useState(() => {
    if (account?.character.type == 'standart') {
      return bigLeon1Image;
    } else if (account?.character.type == 'silver') {
      return bigLeon2Image;
    } else if (account?.character.type == 'gold') {
      return bigLeon3Image;
    }
  });
  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  useEffect(() => {
    if (account?.character.type == 'standart') {
      setPersonage(bigLeon1Image);
    } else if (account?.character.type == 'silver') {
      setPersonage(bigLeon2Image);
    } else if (account?.character.type == 'gold') {
      setPersonage(bigLeon3Image);
    }
  }, [account])
  useEffect(() => {
    if (token) {
      fetch(apiUrl+'/me/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
      })
      .then(response => response.json())
      .then(data => {
        setAccount(data);
        if (data.character.type == 'standart') {
          setPersonage(bigLeon1Image);
        } else if (data.character.type == 'silver') {
          setPersonage(bigLeon2Image);
        } else if (data.character.type == 'gold') {
          setPersonage(bigLeon3Image);
        }
      })
      .catch(error => console.error('Error:', error));
    }
  }, [token]);
  const handleClick = (event) => {
    imgRef.current.classList.add(shakeAnimation);
    if (shakeAnimation === 'shake1') {
      setShakeAnimation('shake2');
    } else if (shakeAnimation === 'shake2') {
      setShakeAnimation('shake3');
    } else if (shakeAnimation === 'shake3') {
      setShakeAnimation('shake1');
    }
    setTimeout(() => {
      imgRef.current.classList.remove(shakeAnimation);
    }, 200); // 200ms соответствует длительности анимации

    // Добавление надписи +1 с небольшим случайным смещением
    const x = event.clientX + (Math.random() - 0.5) * 200; // Случайное смещение по x
    const y = event.clientY + (Math.random() - 0.5) * 200; // Случайное смещение по y
    const newPlusOne = { x, y, id: Date.now() };
    setPlusOnes(prevPlusOnes => [...prevPlusOnes, newPlusOne].slice(-10)); // Обрезаем массив до последних 10 элементов

    // Увеличение локального баланса
    setLocalBalance(localBalance + Number(account?.character?.multiplier));
  };
  return (
    <>
      <div className="relative flex flex-col h-screen overflow-hidden">
        <img
          className="absolute z-[-1] opacity-[0.1] rotate-[-30deg] scale-[2.49] inset-0 m-auto blur-lg"
          src={bgImage}
          alt=""
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
              />
            </div>
          </div>
        </div>
        <div className="absolute left-0 right-0 bottom-[65.33%] mx-auto z-[-1] w-[53.84%] h-[10%] bg-[#B331FF] rounded-[100%] blur-[50px]"></div>
        <div className="absolute left-0 right-0 bottom-[29.06%] mx-auto z-[-1] w-[75.64%] h-[6.4%] bg-[#B331FF] rounded-[100%] blur-[50px]"></div>
        <img
          className="tron absolute z-[-1] w-[100%] scale-[1.582] bottom-[2%]"
          src={tronImage}
          alt=""
        />
        <img 
          ref={imgRef}
          className="pers absolute z-[0] bottom-[21.06%] w-[100%] scale-[1.236]"
          src={personage}
          alt=""
          onClick={handleClick}
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
      <Boost />
    </>
  );
}

export default Home;