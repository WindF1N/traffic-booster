import keyIcon from '../assets/key.svg';
import pasteIcon from '../assets/paste.svg';

function Games() {
  return (
    <div className="relative flex flex-col h-screen overflow-x-hidden pb-[120px]">
      <img
        className="absolute z-[-1] opacity-[0.1] rotate-[-30deg] scale-[2.49] inset-0 m-auto blur-lg"
        src="https://s3-alpha-sig.figma.com/img/c2f0/e149/2a0988f8fbb8d9c554cdc72724b5246d?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jxUqVB-5U2vIKJ4HzKzSr6XtWYvwR8N8U8-DZuKOr9dECas1fz3Co2IsG3hO55T0HRC9g~Neq~cVkYX-BZ1vOTeNHEgeqFbsdA0slQVeoQrgu2rlP3bHVThX5hBNLFjyNAckFIdWVU20Nm~hEtwNQEEtJnlXii-KSj~t1ATlpQVrBQlgXx8IMDVJxCuCNrD4bJ0gkRsr7qzlMRQTEZ8PtO-RpIrVXqQ1-hMTBpqz6MBj6b9DyV-5cj9CWP77cq0SRAcQorbyAu8hxX-4A~NGQ4PefYevFg~BJ5dt6Ufi1IBkgaNIF87NAOGNspQO1B124i0pSohCJcHlLjQ0yJInFg__"
        alt=""
       />
      <div className="text-[24px] leading-[30.96px] mt-[10%] px-[20px] font-[600] text-[#fff]">
        Играйте в игры, собирайте ключи и зарабатывайте токен Traff
      </div>
      <div className="text-[14px] leading-[18.06px] px-[20px] font-[400] mt-[20px]">
        В каждой игре по 3 ключа, активируй их и<br/>получи 1000000 монет.
      </div>
      <div className="flex flex-col gap-[15px] px-[20px] mt-[20px]">
        <div className="relative bg-[rgba(117,117,117,0.1)] p-[10px] rounded-[10px] backdrop-blur-[40px]">
          <div className="flex justify-between items-start">
            <div className="text-[#fff] font-[600] text-[16px] leading-[20.64px]">Название игры</div>
            <div className="flex items-center gap-[10px]">
              <img className="w-[24px] h-[24px]" src={keyIcon} alt="" />
              <span className="text-[#FFD900] text-[16px] font-[600] leading-[20.64px]">1/3</span>
            </div>
          </div>
          <div className="bg-[#464646] h-[5px] w-[100%] rounded-[26px] mt-[6px] overflow-hidden">
            <div className="h-[100%] w-[33.33%] rounded-[26px] bg-[#FFD900]"></div>
          </div>
          <div className="relative mt-[10px]">
            <input type="text" placeholder="ВСТАВЬТЕ КЛЮЧ СЮДА" className="placeholder:text-[#646464] placeholder:font-[400] placeholder:font-['TT Firs Neue'] outline-0 bg-inherit border-[1px] border-dashed border-[#646464] rounded-[10px] text-[14px] leading-[18.06px] font-[400] p-[10px] w-[100%]" />
            <img className="absolute p-[10px] right-0 top-0 bottom-0 my-auto" src={pasteIcon} alt="" />
          </div>
          <div className="mt-[10px] rounded-[10px] overflow-hidden relative">
            <img
              className="w-[100%]"
              src="https://s3-alpha-sig.figma.com/img/cd9e/872d/93de0bacbf9537d4058d7f1c69ff681b?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LU1d-Ja3krYs42DdiWgvG71tOhcj8u5YysmJ~-Om6KYFt11~4f8v7~61QfD~j74EOl-5OWhjoCjWJF49HgE9wrdwNb3bpjEgmZ8lPecMioCdKSH06jVCtP5m3PyjPlyMZ09rELVAu8pPBF8GonTEePRyCBjB0D9dlKc6UUzfvr2afxbFOWdSpJbnQQBWRm~jT-0DiOuREfFaXfrq6HPZuVpx5Sh9h3qf~dk-KStGWP-A6h5~WY0B1IzWuduN0qP91SywelbduvZuGaAF2IarmLFmEBL-0blkCJD7505L2mHX6gaQ4axqFC1zUL1g-RkR6spvsNiEwAJTUza33NZy-w__"
              alt=""
             />
            <div className="absolute bottom-[10px] right-[10px] text-[#494949] text-[20px] leading-[20px] font-[600] rounded-[10px] bg-[#fff] px-[22px] py-[15px]">
              Играть
            </div>
          </div>
        </div>
        <div className="relative bg-[rgba(117,117,117,0.1)] p-[10px] rounded-[10px] backdrop-blur-[40px]">
          <div className="flex justify-between items-start">
            <div className="text-[#fff] font-[600] text-[16px] leading-[20.64px]">Название игры</div>
            <div className="flex items-center gap-[10px]">
              <img className="w-[24px] h-[24px]" src={keyIcon} alt="" />
              <span className="text-[#FFD900] text-[16px] font-[600] leading-[20.64px]">1/3</span>
            </div>
          </div>
          <div className="bg-[#464646] h-[5px] w-[100%] rounded-[26px] mt-[6px] overflow-hidden">
            <div className="h-[100%] w-[33.33%] rounded-[26px] bg-[#FFD900]"></div>
          </div>
          <div className="relative mt-[10px]">
            <input type="text" placeholder="ВСТАВЬТЕ КЛЮЧ СЮДА" className="placeholder:text-[#646464] placeholder:font-[400] placeholder:font-['TT Firs Neue'] outline-0 bg-inherit border-[1px] border-dashed border-[#646464] rounded-[10px] text-[14px] leading-[18.06px] font-[400] p-[10px] w-[100%]" />
            <img className="absolute p-[10px] right-0 top-0 bottom-0 my-auto" src={pasteIcon} alt="" />
          </div>
          <div className="mt-[10px] rounded-[10px] overflow-hidden relative">
            <img
              className="w-[100%]"
              src="https://s3-alpha-sig.figma.com/img/cd9e/872d/93de0bacbf9537d4058d7f1c69ff681b?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LU1d-Ja3krYs42DdiWgvG71tOhcj8u5YysmJ~-Om6KYFt11~4f8v7~61QfD~j74EOl-5OWhjoCjWJF49HgE9wrdwNb3bpjEgmZ8lPecMioCdKSH06jVCtP5m3PyjPlyMZ09rELVAu8pPBF8GonTEePRyCBjB0D9dlKc6UUzfvr2afxbFOWdSpJbnQQBWRm~jT-0DiOuREfFaXfrq6HPZuVpx5Sh9h3qf~dk-KStGWP-A6h5~WY0B1IzWuduN0qP91SywelbduvZuGaAF2IarmLFmEBL-0blkCJD7505L2mHX6gaQ4axqFC1zUL1g-RkR6spvsNiEwAJTUza33NZy-w__"
              alt=""
             />
            <div className="absolute bottom-[10px] right-[10px] text-[#494949] text-[20px] leading-[20px] font-[600] rounded-[10px] bg-[#fff] px-[22px] py-[15px]">
              Играть
            </div>
          </div>
        </div>
        <div className="relative bg-[rgba(117,117,117,0.1)] p-[10px] rounded-[10px] backdrop-blur-[40px]">
          <div className="flex justify-between items-start">
            <div className="text-[#fff] font-[600] text-[16px] leading-[20.64px]">Название игры</div>
            <div className="flex items-center gap-[10px]">
              <img className="w-[24px] h-[24px]" src={keyIcon} alt="" />
              <span className="text-[#FFD900] text-[16px] font-[600] leading-[20.64px]">1/3</span>
            </div>
          </div>
          <div className="bg-[#464646] h-[5px] w-[100%] rounded-[26px] mt-[6px] overflow-hidden">
            <div className="h-[100%] w-[33.33%] rounded-[26px] bg-[#FFD900]"></div>
          </div>
          <div className="relative mt-[10px]">
            <input type="text" placeholder="ВСТАВЬТЕ КЛЮЧ СЮДА" className="placeholder:text-[#646464] placeholder:font-[400] placeholder:font-['TT Firs Neue'] outline-0 bg-inherit border-[1px] border-dashed border-[#646464] rounded-[10px] text-[14px] leading-[18.06px] font-[400] p-[10px] w-[100%]" />
            <img className="absolute p-[10px] right-0 top-0 bottom-0 my-auto" src={pasteIcon} alt="" />
          </div>
          <div className="mt-[10px] rounded-[10px] overflow-hidden relative">
            <img
              className="w-[100%]"
              src="https://s3-alpha-sig.figma.com/img/cd9e/872d/93de0bacbf9537d4058d7f1c69ff681b?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LU1d-Ja3krYs42DdiWgvG71tOhcj8u5YysmJ~-Om6KYFt11~4f8v7~61QfD~j74EOl-5OWhjoCjWJF49HgE9wrdwNb3bpjEgmZ8lPecMioCdKSH06jVCtP5m3PyjPlyMZ09rELVAu8pPBF8GonTEePRyCBjB0D9dlKc6UUzfvr2afxbFOWdSpJbnQQBWRm~jT-0DiOuREfFaXfrq6HPZuVpx5Sh9h3qf~dk-KStGWP-A6h5~WY0B1IzWuduN0qP91SywelbduvZuGaAF2IarmLFmEBL-0blkCJD7505L2mHX6gaQ4axqFC1zUL1g-RkR6spvsNiEwAJTUza33NZy-w__"
              alt=""
             />
            <div className="absolute bottom-[10px] right-[10px] text-[#494949] text-[20px] leading-[20px] font-[600] rounded-[10px] bg-[#fff] px-[22px] py-[15px]">
              Играть
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Games;