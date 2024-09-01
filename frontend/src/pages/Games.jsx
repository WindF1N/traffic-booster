import { useState, useEffect } from 'react';
import useAccount from '../hooks/useAccount';
import useAuthStore from '../hooks/useAuthStore';
import useMessages from '../hooks/useMessages';
import useGames from '../hooks/useGames';
import keyIcon from '../assets/key.svg';
import pasteIcon from '../assets/paste.svg';
import bgImage from '../assets/bg.png';
import GamePopUp from '../components/GamePopUp';

function Games() {
  const [ isOpen, setIsOpen ] = useState(false);
  const account = useAccount((state) => state.account);
  const { setAccount } = useAccount();
  const token = useAuthStore((state) => state.token);
  const messages = useMessages((state) => state.messages);
  const games = useGames((state) => state.games);
  const { addMessage } = useMessages();
  const { setGames } = useGames();
  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const handleBlur = (value, game) => {
    if (value.length === 0) {
      return
    }
    fetch(apiUrl+'/check_key/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ 
            game_id: game.id,
            key: value
        })
    })
    .then(response => response.json())
    .then(data => {
      if ('new_balance' in data) {
        setAccount({...account, balance: data.new_balance });
        const gameIndex = games.findIndex(game_ => game_.id === game.id);
        if (gameIndex !== -1) {
          const updatedGame = {...game, keyInput: null, used_keys_count: data.used_game_keys_count || 0};
          setGames([
            ...games.slice(0, gameIndex),
            updatedGame,
            ...games.slice(gameIndex + 1)
        ])
        }
        addMessage({
          type: 'success',
          text: 'Ключ успешно активирован',
          name: 'Успех:'
        })
        if (data.used_game_keys_count === 3) {
          setIsOpen(true);
        }
      } else {
        addMessage({
          type: 'error',
          text: data.error,
          name: 'Ошибка:'
        })
      }
    })
    .catch(error => {
      addMessage({
        type: 'error',
        text: error,
        name: 'Ошибка:'
      })
      console.error('Error:', error);
    });
  };
  const handlePaste = async (game) => {
    try {
      const text = await navigator.clipboard.readText();
      const gameIndex = games.findIndex(game_ => game_.id === game.id);
      if (gameIndex !== -1) {
        const updatedGame = {...game, keyInput: text};
        setGames([
            ...games.slice(0, gameIndex),
            updatedGame,
            ...games.slice(gameIndex + 1)
        ])
      }
      handleBlur(text, game);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };
  const handleChange = (value, game) => {
    const gameIndex = games.findIndex(game_ => game_.id === game.id);
    if (gameIndex !== -1) {
      const updatedGame = {...game, keyInput: value};
      setGames([
          ...games.slice(0, gameIndex),
          updatedGame,
          ...games.slice(gameIndex + 1)
      ]);
    }
  }
  useEffect(() => {
    if (token) {
      fetch(apiUrl+'/games/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
      })
      .then(response => response.json())
      .then(data => {
        setGames(data.games);
      })
      .catch(error => console.error('Error:', error));
    }
  }, [token]);
  return (
    <>
      <div className="relative flex flex-col h-screen overflow-x-hidden pb-[120px]">
        <img
          className="absolute z-[-1] opacity-[0.1] rotate-[-30deg] scale-[2.49] inset-0 m-auto blur-lg"
          src={bgImage}
          alt=""
        />
        <div className="text-[24px] leading-[30.96px] mt-[10%] px-[20px] font-[600] text-[#fff]">
          Играйте в игры, собирайте ключи и зарабатывайте токен Traff
        </div>
        <div className="text-[14px] leading-[18.06px] px-[20px] font-[400] mt-[20px]">
          В каждой игре по 3 ключа, активируй их и<br/>получи 1000000 монет.
        </div>
        {games.length > 0 &&
        <div className="flex flex-col gap-[15px] px-[20px] mt-[20px]">
          {games.map((game, index) => (
            <div className="relative bg-[rgba(117,117,117,0.1)] p-[10px] rounded-[10px] backdrop-blur-[40px]" key={index}>
              <div className="flex justify-between items-start">
                <div className="text-[#fff] font-[600] text-[16px] leading-[20.64px]">{game.name}</div>
                <div className="flex items-center gap-[10px]">
                  <img className="w-[24px] h-[24px]" src={keyIcon} alt="" />
                  <span className="text-[#FFD900] text-[16px] font-[600] leading-[20.64px]">{game.used_keys_count}/3</span>
                </div>
              </div>
              <div className="bg-[#464646] h-[5px] w-[100%] rounded-[26px] mt-[6px] overflow-hidden">
                <div className="h-[100%] w-[100%] rounded-[26px] bg-[#FFD900]" style={{ transition: ".3s", transform: `translateX(-${100 * (3 - game.used_keys_count) / 3}%)` }}></div>
              </div>
              {game.used_keys_count < 3 &&
              <div className="relative mt-[10px]">
                <input type="text" name={"inputKey" + game.id} placeholder="ВСТАВЬТЕ КЛЮЧ СЮДА" value={game.keyInput || ""} onChange={(event) => handleChange(event.target.value, game)} onBlur={(event) => handleBlur(event.target.value, game)} className="placeholder:text-[#646464] placeholder:font-[400] placeholder:font-['TT Firs Neue'] outline-0 bg-inherit border-[1px] border-dashed border-[#646464] rounded-[10px] text-[14px] leading-[18.06px] font-[400] px-[10px] pt-[10px] pb-[9px] w-[100%]" />
                <img className="cursor-pointer absolute p-[10px] right-0 top-0 bottom-0 my-auto" src={pasteIcon} alt="" onClick={() => handlePaste(game)} />
              </div>}
              <div className="mt-[10px] rounded-[10px] overflow-hidden relative">
                <img
                  className="w-[100%]"
                  src={apiUrl + game.picture}
                  alt=""
                />
                <div onClick={() => window.open(game.link, '_blank')} className="transform active:scale-[0.9] transition-transform cursor-pointer absolute bottom-[10px] right-[10px] text-[#494949] text-[20px] leading-[20px] font-[600] rounded-[10px] bg-[#fff] px-[22px] pt-[15px] pb-[15px]">
                  Играть
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>
      {isOpen && <GamePopUp setIsOpen={setIsOpen} />}
    </>
  );
}

export default Games;