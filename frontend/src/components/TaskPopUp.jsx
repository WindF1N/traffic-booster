import closeIcon from '../assets/close.svg';
import raster3dIcon from '../assets/3d-raster-small.png';
import useAuthStore from '../hooks/useAuthStore';
import useAccount from '../hooks/useAccount';
import useMessages from '../hooks/useMessages';
import useTasks from '../hooks/useTasks';

function TaskPopUp({ setIsOpen, selectedTask, setSelectedTask }) {
    const token = useAuthStore((state) => state.token);
    const account = useAccount((state) => state.account);
    const tasks = useTasks((state) => state.tasks);
    const { setAccount } = useAccount();
    const { addMessage } = useMessages();
    const { setTasks } = useTasks();
    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    const startTask = () => {
        fetch(apiUrl+'/tasks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ 
                task_id: selectedTask.id
            })
        })
        .then(response => response.json())
        .then(data => {
            setAccount({...account, balance: data.new_balance });
            if (data.task.status === "awarded") {
                setTasks([...tasks.filter(task => task.id !== data.task.id)]);
            } else {
                const taskIndex = tasks.findIndex(task => task.id === selectedTask.id);
                if (taskIndex !== -1) {
                    setTasks([
                        ...tasks.slice(0, taskIndex),
                        data.task,
                        ...tasks.slice(taskIndex + 1)
                    ])
                }
            }
            setSelectedTask(data.task);
    
            // Перенаправляем пользователя по ссылке из задания
            if ( selectedTask.link.includes('https://t.me') ) {
                window.Telegram?.WebApp?.openTelegramLink(selectedTask.link);
            } else {
                window.Telegram?.WebApp?.openLink(selectedTask.link);
            }
            
            addMessage({
                type: 'success',
                text: 'Задание "'+ data.task.title +'" выполнено',
                name: 'Успех:'
            })
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
        <div className="fixed flex flex-col h-[100%] w-[100%] max-w-[420px] mx-auto bg-[rgba(0,0,0,0.8)] left-0 right-0 top-0 z-[4]">
            <div className="taskpopup relative flex flex-col bg-[#282828] rounded-[10px] w-[calc(100%-40px)] h-[73.33%] m-auto overflow-hidden">
                <div className="bg-gradient-to-tr from-[#B331FF] from-[33.32%] to-[#FFF600] to-[103.28%] px-[20px] py-[12px]">
                    <div className="text-[#fff] text-[28px] leading-[36px] font-[600]">Задание №{selectedTask.id}</div>
                    <img className="cursor-pointer absolute z-[4] right-[15px] top-[15px] w-[32px] h-[32px] brightness-0" src={closeIcon} alt="" onClick={() => setIsOpen(false)} />
                </div>
                {selectedTask.limit_type === "limited" &&
                <div className="px-[20px] mt-[5px]">
                    <div className="h-[8px] ml-[-20px] bg-[#B331FF]" style={{width: "calc(" + (100 - ((selectedTask.limit_count - selectedTask.limit_count_reserved) / selectedTask.limit_count * 100)).toString() + "% + 20px)"}}></div>
                    <div className="mt-[5px] flex items-center justify-between gap-[10px]" style={{width: (100 - ((selectedTask.limit_count - selectedTask.limit_count_reserved) / selectedTask.limit_count * 100)).toString() + "%"}}>
                        <div className="text-[#B331FF] text-[12px] font-[400] whitespace-nowrap">Мест осталось</div>
                        <div className="text-[#B331FF] text-[12px] font-[400]">{selectedTask.limit_count - selectedTask.limit_count_reserved}/{selectedTask.limit_count}</div>
                    </div>
                </div>}
                <div className="relative px-[20px] pt-[5.45%] pb-[20px] h-[100%] flex flex-col">
                    <div className="text-[#646464] text-[16px] font-[400] leading-[21px]">
                        {selectedTask.category}
                    </div>
                    <div className="text-[24px] font-[600] text-[#fff] leading-[31px] mt-[3.72%] pb-[4.38%] border-b border-dashed border-[#646464]">
                        {selectedTask.title}
                    </div>
                    <ol className="list-decimal text-[16px] font-[400] text-[#fff] leading-[21px] mt-[3.28%] z-[4] pl-[20px]">
                        {selectedTask.description.split("\r\n").map((item, index) => (
                            <li key={index} style={index !== 0 ? {marginTop: "2.19%"} : null}>{item}</li>
                        ))}
                    </ol>
                    <div className="flex max-w-[60%] overflow-hidden text-ellipsis">
                        <div className="mt-[4.38%] text-[#1DFFFF] text-[16px] font-[400] underline underline-offset-2 z-[4] whitespace-nowrap text-ellipsis overflow-hidden"
                             onClick={() => {
                                if ( selectedTask.link.includes('https://t.me') ) {
                                    window.Telegram?.WebApp?.openTelegramLink(selectedTask.link);
                                } else {
                                    window.Telegram?.WebApp?.openLink(selectedTask.link);
                                }
                             }}>
                            {selectedTask.link.split("//")[1]}
                        </div>
                    </div>
                    <div className="mt-[6.56%] text-[#646464] text-[16px] font-[400]">
                        Награда
                    </div>
                    <div className="text-[#FFD900] text-[26px] font-[600] leading-[34px] mt-[2.19%] z-[4]">
                        {(Number(selectedTask.reward) * Number(account?.character?.multiplier)).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <div className="flex mt-auto">
                    {!selectedTask.status ? (
                        <div 
                            className="cursor-pointer text-[#494949] text-[20px] font-[600] leading-[20px] rounded-[10px] bg-[#fff] p-[15px] z-[4]" 
                            onClick={() => {
                                // setIsOpen(false);
                                startTask();
                            }}
                        >
                            Выполнить
                        </div>
                    ) : (
                        selectedTask.status === "pending" ? (
                            <div className="cursor-pointer text-[#494949] text-[20px] font-[600] leading-[20px] rounded-[10px] bg-[#fff] p-[15px] z-[5] brightness-[0.6]">
                                Проверяется...
                            </div>
                        ) : (
                            selectedTask.status === "awarded" && (
                                <div 
                                    className="text-[#bbb] text-[20px] font-[600] leading-[20px] z-[5]" 
                                >
                                    Выполнено
                                </div>
                            )
                        )
                    )}
                    </div>
                    <div className="absolute z-[3] bottom-[-7.09%] right-[-10.29%] w-[60.28%] h-[45.87%] rounded-[100%] blur-[100px]" style={{background: selectedTask.picture_color}}></div>
                    {selectedTask.link === 'https://t.me/TraffVPN_bot' ? 
                    <img className="absolute z-[3] w-[81.14%] bottom-[-12.25%] right-[-19.71%]" src={apiUrl+selectedTask.picture} alt="" />
                    : <img className="absolute z-[3] w-[60.57%] bottom-[-8.42%] right-[-10.57%]" src={apiUrl+selectedTask.picture} alt="" />}
                </div>
            </div>
        </div>
    );
}

export default TaskPopUp;