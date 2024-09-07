import { useState, useEffect } from 'react';
import tasksImage from '../assets/tasks-image.png';
import raster3dIcon from '../assets/3d-raster-small.png';
import bgImage from '../assets/bg.png';
import TaskPopUp from '../components/TaskPopUp';
import useAccount from '../hooks/useAccount';
import useAuthStore from '../hooks/useAuthStore';
import useTasks from '../hooks/useTasks';

function Tasks() {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ selectedTask, setSelectedTask ] = useState(null);
  const token = useAuthStore((state) => state.token);
  const account = useAccount((state) => state.account);
  const tasks = useTasks((state) => state.tasks);
  const { setTasks } = useTasks();
  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  useEffect(() => {
    if (token) {
      fetch(apiUrl+'/tasks/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
      })
      .then(response => response.json())
      .then(data => {
        setTasks(data.tasks.filter(task => task.status !== "awarded"));
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
        <div className="relative min-h-[206px] px-[20px] bg-[rgba(117,117,117,0.1)] backdrop-blur-[40px] overflow-hidden flex flex-col justify-end">
          <img className="absolute right-0 bottom-0 z-[-1] w-[50%]" src={tasksImage} alt="" />
          <div className="font-[600] text-[20px] leading-[25.8px] text-[#fff] pt-[10%]">Приглашай друзей и получай по 100.000 тыс монет за каждого</div>
          <a className="flex w-[54.35%]" href={"https://t.me/share/url?url=https://t.me/TraffBooster_bot/app?startapp="+account?.user?.referral_code+"&text=Приглашаю тебя вместе со мной принять участие в Traffic Booster"}>
            <div className="transform active:scale-[0.9] transition-transform cursor-pointer mb-[20px] mt-[8%] drop-shadow-2xl font-[600] text-[20px] leading-[25.8px] text-[#fff] h-[85px] w-[100%] flex justify-center items-center bg-gradient-to-br from-[#00C0E7] from-[10.37%] to-[#0070B0] to-[109.67%] rounded-[10px]" onTouchEnd={() => {
              try {
                window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
              } catch {
                console.error('Telegram.WebApp.HapticFeedback.impactOccurred is not defined')
              }
            }}>
              Пригласить
            </div>
          </a>
        </div>
        {tasks.length > 0 &&
        <div className="flex flex-wrap gap-[10px] px-[20px] pt-[10px] mt-[20px]">
          {tasks.map((task, index) => {
            if (task.limit_type === "limited") {
              return (
                <div className="transform active:scale-[0.9] transition-transform cursor-pointer w-[100%]" key={index}>
                  <div
                    className="bg-[rgba(117,117,117,0.1)] p-[10px] rounded-[10px] flex justify-between relative overflow-hidden"
                    onClick={() => {
                      setSelectedTask(task);
                      setIsOpen(true);
                    }}
                    onTouchEnd={() => {
                      try {
                        window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
                      } catch {
                        console.error('Telegram.WebApp.HapticFeedback.impactOccurred is not defined')
                      }
                    }}
                  >
                    <div>
                      <div className="text-[10px] font-[400] leading-[12.9px] text-[#646464] mb-[3px]">{task.category}</div>
                      <div className="text-[16px] font-[500] leading-[20.64px] text-[#fff] pb-[3px]">{task.title}</div>
                    </div>
                    <div className="text-[#FFD900] font-[600] text-[28px] leading-[36.12px] flex items-center gap-[5px]">
                      {(Number(task.reward) * Number(account?.character?.multiplier)).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      <img
                        className="w-[20px] h-[20px] mt-[-4px]"
                        src={raster3dIcon}
                        alt=""
                      />
                    </div>
                    <div
                      className="absolute bottom-0 left-0 h-[8px] bg-[#B331FF]"
                      style={{
                        width: (100 - ((task.limit_count - task.limit_count_reserved) / task.limit_count * 100)).toString() + "%",
                      }}
                    ></div>
                  </div>
                  <div
                    className="mt-[5px] flex items-center justify-between gap-[10px]"
                    style={{
                      width: (100 - ((task.limit_count - task.limit_count_reserved) / task.limit_count * 100)).toString() + "%",
                    }}
                  >
                    <div className="text-[#B331FF] text-[12px] font-[400] whitespace-nowrap ">Мест осталось</div>
                    <div className="text-[#B331FF] text-[12px] font-[400]">{task.limit_count - task.limit_count_reserved}/{task.limit_count}</div>
                  </div>
                </div>
              );
            } else if (task.limit_type === "unlimited") {
              return (
                <div
                  className="transform active:scale-[0.9] transition-transform cursor-pointer relative overflow-hidden bg-[rgba(117,117,117,0.1)] rounded-[10px] p-[10px] w-[calc(50%-5px)]"
                  key={index}
                  onClick={() => {
                    setSelectedTask(task);
                    setIsOpen(true);
                  }}
                  onTouchEnd={() => {
                    try {
                      window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
                    } catch {
                      console.error('Telegram.WebApp.HapticFeedback.impactOccurred is not defined')
                    }
                  }}
                >
                  <div className="text-[#646464] text-[10px] font-[400] leading-[12.9px]">{task.category}</div>
                  <div className="text-[#FFD900] font-[600] text-[14px] leading-[18.06px] flex items-center mt-[5px] gap-[3px]">
                    {(Number(task.reward) * Number(account?.character?.multiplier)).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    <img
                      className="w-[10px] h-[10px] mt-[-2px]"
                      src={raster3dIcon}
                      alt=""
                    />
                  </div>
                  <div className="text-[#fff] font-[500] text-[14px] leading-[18.06px] mt-[5px] w-[68.82%] line-clamp-2">
                    {task.title}
                  </div>
                  <img
                    className="w-[44.7%] absolute bottom-[-25%] right-[-10%]"
                    src={apiUrl + task.picture}
                    alt=""
                  />
                </div>
              );
            }
            return null;
          })}
        </div>}
      </div>
      {isOpen && <TaskPopUp setIsOpen={setIsOpen} selectedTask={selectedTask} setSelectedTask={setSelectedTask}  />}
    </>
  );
}

export default Tasks;