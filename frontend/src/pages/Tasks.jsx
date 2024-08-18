import { useState, useEffect } from 'react';
import tasksImage from '../assets/tasks-image.png';
import raster3dIcon from '../assets/3d-raster-small.png';
import TaskPopUp from '../components/TaskPopUp';
import useAccount from '../hooks/useAccount';
import useAuthStore from '../hooks/useAuthStore';

function Tasks() {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ selectedTask, setSelectedTask ] = useState(null);
  const token = useAuthStore((state) => state.token);
  const account = useAccount((state) => state.account);
  const [ tasks, setTasks ] = useState(null);
  useEffect(() => {
    if (!tasks && token) {
      fetch('http://127.0.0.1:8000/tasks/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
      })
      .then(response => response.json())
      .then(data => {
        setTasks(data.tasks);
      })
      .catch(error => console.error('Error:', error));
    }
  }, [tasks, token]);
  return (
    <>
      <div className="relative flex flex-col h-screen overflow-x-hidden pb-[120px]">
        <img
          className="absolute z-[-1] opacity-[0.1] rotate-[-30deg] scale-[2.49] inset-0 m-auto blur-lg"
          src="https://s3-alpha-sig.figma.com/img/c2f0/e149/2a0988f8fbb8d9c554cdc72724b5246d?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jxUqVB-5U2vIKJ4HzKzSr6XtWYvwR8N8U8-DZuKOr9dECas1fz3Co2IsG3hO55T0HRC9g~Neq~cVkYX-BZ1vOTeNHEgeqFbsdA0slQVeoQrgu2rlP3bHVThX5hBNLFjyNAckFIdWVU20Nm~hEtwNQEEtJnlXii-KSj~t1ATlpQVrBQlgXx8IMDVJxCuCNrD4bJ0gkRsr7qzlMRQTEZ8PtO-RpIrVXqQ1-hMTBpqz6MBj6b9DyV-5cj9CWP77cq0SRAcQorbyAu8hxX-4A~NGQ4PefYevFg~BJ5dt6Ufi1IBkgaNIF87NAOGNspQO1B124i0pSohCJcHlLjQ0yJInFg__"
          alt=""
        />
        <div className="relative min-h-[206px] px-[20px] bg-[rgba(117,117,117,0.1)] backdrop-blur-[40px] overflow-hidden flex flex-col justify-end">
          <img className="absolute right-0 bottom-0 z-[-1] w-[50%]" src={tasksImage} alt="" />
          <div className="font-[600] text-[20px] leading-[25.8px] text-[#fff] pt-[10%]">Приглашай друзей и получай по 100.000 тыс монет за каждого</div>
          <a className="flex w-[54.35%]" href={"https://t.me/share/url?url=https://t.me/traffic_booster_dev_bot/dev?startapp="+account?.user?.referral_code+"&text=Приглашаю тебя вместе со мной принять участие в Traffic Booster"}>
            <div className="cursor-pointer mb-[20px] mt-[8%] drop-shadow-2xl font-[600] text-[20px] leading-[25.8px] text-[#fff] h-[85px] w-[100%] flex justify-center items-center bg-gradient-to-br from-[#00C0E7] from-[10.37%] to-[#0070B0] to-[109.67%] rounded-[10px]">
              Пригласить
            </div>
          </a>
        </div>
        {tasks &&
        <div className="flex flex-wrap gap-[10px] px-[20px] pt-[10px] mt-[20px]">
          {tasks.map((task, index) => (
            <>
              {task.limit_type == "limited" &&
              <div className="cursor-pointer w-[100%]">
                <div className="bg-[rgba(117,117,117,0.1)] p-[10px] rounded-[10px] flex justify-between relative overflow-hidden" onClick={() => {
                  setSelectedTask(task);
                  setIsOpen(true);
                }}>
                  <div>
                    <div className="text-[10px] font-[400] leading-[12.9px] text-[#646464] mb-[3px]">{task.category}</div>
                    <div className="text-[16px] font-[500] leading-[20.64px] text-[#fff] pb-[3px]">{task.title}</div>
                  </div>
                  <div className="text-[#FFD900] font-[600] text-[28px] leading-[36.12px] flex items-center gap-[5px]">
                    {Number(task.reward)} 
                    <img
                      className="w-[20px] h-[20px] mt-[-4px]"
                      src={raster3dIcon}
                      alt=""
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 h-[8px] bg-[#B331FF]" style={{width: (100 - (75 / task.limit_count * 100)).toString() + "%"}}></div>
                </div>
                <div className="mt-[5px] flex items-center justify-between gap-[10px]" style={{width: (100 - (75 / task.limit_count * 100)).toString() + "%"}}>
                  <div className="text-[#B331FF] text-[12px] font-[400] whitespace-nowrap ">Мест осталось</div>
                  <div className="text-[#B331FF] text-[12px] font-[400]">75/{task.limit_count}</div>
                </div>
              </div>}
              {task.limit_type == "unlimited" &&
              <div className="cursor-pointer relative overflow-hidden bg-[rgba(117,117,117,0.1)] rounded-[10px] p-[10px] w-[calc(50%-5px)]" onClick={() => {
                setSelectedTask(task);
                setIsOpen(true);
              }}>
                <div className="text-[#646464] text-[10px] font-[400] leading-[12.9px]">{task.category}</div>
                <div className="text-[#FFD900] font-[600] text-[14px] leading-[18.06px] flex items-center mt-[5px] gap-[3px]">
                  {Number(task.reward)} 
                  <img
                    className="w-[10px] h-[10px] mt-[-2px]"
                    src={raster3dIcon}
                    alt=""
                  />
                </div>
                <div className="text-[#fff] font-[500] text-[14px] leading-[18.06px] mt-[5px] w-[68.82%] line-clamp-2">
                 {task.title}
                </div>
                <img className="w-[44.7%] absolute bottom-[-25%] right-[-10%]" src={"http://127.0.0.1:8000"+task.picture} alt="" />
              </div>}
            </>
          ))}
        </div>}
      </div>
      {isOpen && <TaskPopUp setIsOpen={setIsOpen} selectedTask={selectedTask} />}
    </>
  );
}

export default Tasks;