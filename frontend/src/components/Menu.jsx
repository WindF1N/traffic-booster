import React from 'react';
import { Link } from 'react-router-dom';
import useImages from '../hooks/useImages';

function Menu({ currentPage }) {
  const images = useImages((state) => state.images);
  const menuItems = [
    { page: 'home', icon: images['./assets/home.svg'], activeIcon: images['./assets/home-active.svg'], label: 'Главная', path: '/' },
    { page: 'tasks', icon: images['./assets/tasks.svg'], activeIcon: images['./assets/tasks-active.svg'], label: 'Задания', path: '/tasks' },
    { page: 'games', icon: images['./assets/games.svg'], activeIcon: images['./assets/games-active.svg'], label: 'Игры', path: '/games' },
    { page: 'ad', icon: images['./assets/ad.svg'], activeIcon: images['./assets/ad-active.svg'], label: 'Реклама', path: '/ad' },
    { page: 'airdrop', icon: images['./assets/airdrop.svg'], activeIcon: images['./assets/airdrop-active.svg'], label: 'Airdrop', path: '/airdrop' },
  ];

  return (
    <div className="menu fixed bottom-[20px] left-[20px] right-[20px] flex justify-around bg-[#262626] w-[calc(100% - 40px)] h-[80px] rounded-[10px] z-[3]" onTouchEnd={() => {
      try {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
      } catch {
        console.error('Telegram.WebApp.HapticFeedback.impactOccurred is not defined')
      }
    }}>
      {menuItems.map((item) => (
        <Link key={item.page} to={item.path} className="flex flex-col justify-center items-center">
          <img
            className="w-[24px] h-[24px]"
            src={currentPage === item.page ? item.activeIcon : item.icon}
            alt={item.label}
          />
          <div className={`text-[10px] ${currentPage === item.page ? (item.page === 'games' ? 'text-[#FFF600]' : 'text-white') : 'text-[#5A5A5A]'}`}>
            {item.label}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Menu;