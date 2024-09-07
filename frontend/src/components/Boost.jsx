import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import doubleArrowIcon from '../assets/double-arrow.svg';
import raster3dIcon from '../assets/3d-raster-small.png';
import BoostPopUp from './BoostPopUp';
import useAuthStore from '../hooks/useAuthStore';
import useAccount from '../hooks/useAccount';

function Boost({setLoadedImagesCount}) {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ swipeOffset, setSwipeOffset ] = useState(0);
  const token = useAuthStore((state) => state.token);
  const account = useAccount((state) => state.account);
  const [ characters, setCharacters ] = useState(null);
  const [ nextCharacter, setNextCharacter ] = useState(null);
  const [ nextCharacterIndex, setNextCharacterIndex ] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/";
  useEffect(() => {
    if (!characters && token) {
      fetch(apiUrl+'/characters/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
      })
      .then(response => response.json())
      .then(data => {
        setCharacters(data.characters);
      })
      .catch(error => console.error('Error:', error));
    }
  }, [characters, token]);
  useEffect(() => {
    if (characters && account?.character) {
      const currentCharacterId = account.character.id;
      const currentCharacterIndex = characters.findIndex(char => char.id === currentCharacterId);
      if (currentCharacterIndex !== -1 && currentCharacterIndex < characters.length - 1) {
        setNextCharacter(characters[currentCharacterIndex + 1]);
      } else if (currentCharacterIndex === characters.length - 1) {
        setNextCharacter(null);
      }
      setNextCharacterIndex(currentCharacterIndex + 1);
    }
  }, [characters, account]);
  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === 'Right') {
        if (eventData.deltaX / window.innerWidth * 100 < 58.34) {
          setSwipeOffset(eventData.deltaX);
        } else {
          setIsOpen(true);
        }
      }
    },
    onSwipedRight: () => {
      setSwipeOffset(0);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });
  const transformStyle = {
    transform: `translateX(${swipeOffset}px)`,
    transition: swipeOffset === 0 ? 'transform .3s ease-in-out' : '0s'
  };
  if (nextCharacter) {
    return (
      <>
        <div {...handlers} className="cursor-pointer boost overflow-hidden fixed bottom-[110px] left-[20px] right-[20px] flex justify-between bg-[rgba(117,117,117,0.1)] w-[calc(100% - 40px)] h-[50px] rounded-[10px] z-[3] backdrop-blur-[40px]">
          <div className="relative z-1 ml-[-65%] w-[100%] flex justify-end items-center px-[10px] py-[13px] text-[16px] font-[600] leading-[20.64px] bg-gradient-to-tr from-[#B331FF] from-[33.32%] to-[#FFF700] to-[103.28%]" style={transformStyle}>
            Улучшить
            <img src={doubleArrowIcon} alt="" onLoad={() => setLoadedImagesCount(prevState => prevState + 1)} />
          </div>
          <div className="z-[-1] absolute right-0 top-0 w-[100%] h-[100%] py-[6px] px-[10px] flex flex-col justify-between items-end">
            {nextCharacter.type == "standart" &&
            <div className="text-[10px] font-[400] leading-[12.9px]">
              След. уровень: <span className="text-[#319BFF]">{nextCharacter.name}</span>
            </div>}
            {nextCharacter.type == "silver" &&
            <div className="text-[10px] font-[400] leading-[12.9px]">
              След. уровень: <span className="text-[#9CFF11]">{nextCharacter.name}</span>
            </div>}
            {nextCharacter.type == "gold" &&
            <div className="text-[10px] font-[400] leading-[12.9px]">
              След. уровень: <span className="text-[#FF11DF]">{nextCharacter.name}</span>
            </div>}
            <div className="text-[#FFD900] text-[10px] font-[400] leading-[12.9px] flex items-center gap-[3px]">
                {Number(nextCharacter.price_stars)}
                <img
                    className="w-[10px] h-[10px] mt-[-2px]"
                    src={raster3dIcon}
                    alt=""
                    onLoad={() => setLoadedImagesCount(prevState => prevState + 1)}
                />
            </div>
          </div>
        </div>
        {isOpen && <BoostPopUp setIsOpen={setIsOpen} characters={characters} nextCharacterIndex={nextCharacterIndex} setNextCharacterIndex={setNextCharacterIndex} />}
      </>
    );
  }
}

export default Boost;