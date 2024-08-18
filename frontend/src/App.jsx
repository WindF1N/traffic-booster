import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import Loading from './components/Loading';
import OnboardingSlider from './components/OnboardingSlider';
import useAuthStore from './hooks/useAuthStore';
import useAccount from './hooks/useAccount';
import useLocalBalance from './hooks/useLocalBalance';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(!localStorage.getItem('onboardingComplete'));
  const [currentPage, setCurrentPage] = useState('home'); // Добавлено состояние для текущей страницы
  const location = useLocation(); // Используем хук useLocation для отслеживания текущего пути
  const { setToken } = useAuthStore();
  const { setAccount } = useAccount();
  const { setLocalBalance } = useLocalBalance();
  const token = useAuthStore((state) => state.token);
  const account = useAccount((state) => state.account);
  const localBalance = useLocalBalance((state) => state.localBalance);

  useEffect(() => {
    if (isLoading) {
      const initData = window.Telegram?.WebApp?.initData || null;
      if (initData) {
        fetch('http://127.0.0.1:8000/auth/telegram/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ initData })
        })
        .then(response => response.json())
        .then(data => {
            setIsLoading(false);
            setToken(data.token);
        })
        .catch(error => console.error('Error:', error));
      }
    }
  }, [isLoading]);

  useEffect(() => {
    const syncBalance = async () => {
      if (localBalance > 0) {
        try {
          const response = await fetch('http://127.0.0.1:8000/sync_balance/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ balance: localBalance }), // Замените на реальный ID пользователя
          });

          const data = await response.json();
          if (response.ok) {
            setAccount({ ...account, balance: { ...account.balance, amount: data.new_balance } });
            setLocalBalance(0);
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Server error', error);
        }
      }
    };
    const interval = setInterval(syncBalance, 5000); // Синхронизируем баланс каждые 5 секунд
    const handleBeforeUnload = () => {
      syncBalance(); // Синхронизируем баланс перед выходом
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [localBalance, account, token]);

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
    // localStorage.setItem('onboardingComplete', 'true'); // Сохраняем состояние onboarding в localStorage
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