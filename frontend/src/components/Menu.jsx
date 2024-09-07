import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../assets/home.svg';
import homeActiveIcon from '../assets/home-active.svg';
import tasksIcon from '../assets/tasks.svg';
import tasksActiveIcon from '../assets/tasks-active.svg';
import gamesIcon from '../assets/games.svg';
import gamesActiveIcon from '../assets/games-active.svg';
import adIcon from '../assets/ad.svg';
import adActiveIcon from '../assets/ad-active.svg';
import airdropIcon from '../assets/airdrop.svg';
import airdropActiveIcon from '../assets/airdrop-active.svg';

function Menu({ currentPage, setLoadedImagesCount }) {
  const menuItems = [
    { page: 'home', icon: homeIcon, activeIcon: homeActiveIcon, label: 'Главная', path: '/' },
    { page: 'tasks', icon: tasksIcon, activeIcon: tasksActiveIcon, label: 'Задания', path: '/tasks' },
    { page: 'games', icon: gamesIcon, activeIcon: gamesActiveIcon, label: 'Игры', path: '/games' },
    { page: 'ad', icon: adIcon, activeIcon: adActiveIcon, label: 'Реклама', path: '/ad' },
    { page: 'airdrop', icon: airdropIcon, activeIcon: airdropActiveIcon, label: 'Airdrop', path: '/airdrop' },
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
            onLoad={() => setLoadedImagesCount(prevState => prevState + 1)}
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