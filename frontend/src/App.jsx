import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import Loading from './components/Loading';
import OnboardingSlider from './components/OnboardingSlider';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(!localStorage.getItem('onboardingComplete'));
  const [currentPage, setCurrentPage] = useState('home'); // Добавлено состояние для текущей страницы
  const location = useLocation(); // Используем хук useLocation для отслеживания текущего пути

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 6000);
    }
  }, [isLoading]);

  useEffect(() => {
    // Обновляем текущую страницу на основе пути
    switch (location.pathname) {
      case '/':
        setCurrentPage('home');
        break;
      case '/tasks':
        setCurrentPage('tasks');
        break;
      case '/games':
        setCurrentPage('games');
        break;
      case '/ad':
        setCurrentPage('ad');
        break;
      case '/airdrop':
        setCurrentPage('airdrop');
        break;
      default:
        setCurrentPage('home');
    }
  }, [location]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboardingComplete', 'true'); // Сохраняем состояние onboarding в localStorage
  };

  return (
    <div className="relative flex flex-col h-[100%] overflow-x-hidden">
      {isLoading ? (
        <Loading />
      ) : showOnboarding ? (
        <OnboardingSlider onComplete={handleOnboardingComplete} />
      ) : (
        <div className="relative flex-1 overflow-auto">
          <Outlet />
          <Menu currentPage={currentPage} /> {/* Передаем текущую страницу в Menu */}
        </div>
      )}
    </div>
  );
}

export default App;