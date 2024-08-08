function Ad() {
  return (
    <>
      <div className="relative flex flex-col h-screen overflow-hidden">
        <img
          className="absolute z-[-1] opacity-[0.1] rotate-[-30deg] scale-[2.49] inset-0 m-auto blur-lg"
          src="https://s3-alpha-sig.figma.com/img/c2f0/e149/2a0988f8fbb8d9c554cdc72724b5246d?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jxUqVB-5U2vIKJ4HzKzSr6XtWYvwR8N8U8-DZuKOr9dECas1fz3Co2IsG3hO55T0HRC9g~Neq~cVkYX-BZ1vOTeNHEgeqFbsdA0slQVeoQrgu2rlP3bHVThX5hBNLFjyNAckFIdWVU20Nm~hEtwNQEEtJnlXii-KSj~t1ATlpQVrBQlgXx8IMDVJxCuCNrD4bJ0gkRsr7qzlMRQTEZ8PtO-RpIrVXqQ1-hMTBpqz6MBj6b9DyV-5cj9CWP77cq0SRAcQorbyAu8hxX-4A~NGQ4PefYevFg~BJ5dt6Ufi1IBkgaNIF87NAOGNspQO1B124i0pSohCJcHlLjQ0yJInFg__"
          alt=""
        />
        <div className="text-[24px] leading-[30.96px] mt-[10%] px-[20px] font-[600] text-[#fff]">
          Вам нужен трафик? Вы в нужном месте!
        </div>
        <div className="text-[16px] leading-[20.64px] px-[20px] font-[400] mt-[10px] text-[#B0B0B0]">
          Заполняйте форму и мы свяжемся с вами
        </div>
        <div className="absolute z-[-1] top-[30.27%] left-0 right-0 mx-auto bg-[#5BC3FD] w-[51.79%] h-[26.93%] rounded-[100%] blur-[100px]"></div>
        <img
          className="w-[100%] ad-image"
          src="https://s3-alpha-sig.figma.com/img/93d5/3985/6727f8719463bee17e3ec6e0ed82f244?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=O2hAJdxzx2VWoujkXoHabmpX10tVNPtRRZwd6DHBjlNW~C-TFQuEgIOa33UPnjJSKv7-iKfqi7xK7MJKNk9N1sYLCkgwURFb4FMq7~k6ub85Gd6EcSSqAGjkdM18TQlI6RARlP4~RJPg~3OT888JYGK33Ork1weG6Rr0vXjcFe~BNiwSzTj6YnX6B1EzPslwy9trUs~iYm2M0uRq0zQj9CQrxDpaumykJMv2HFyhusnar3f82XhHE7ljo0TeW2~YOSr4u7YsmcOrc8UB191gCd~3jMxi1s04FSr1yhA5ElOEqjyxtI3G0wKb-BsPSH8jOhhdFQjOzqXFzzsN16SioQ__"
          alt=""
        />
      </div>
      <div className="absolute bottom-[120px] left-[20px] rounded-[10px] w-[calc(100%-40px)] h-[64px] bg-gradient-to-r from-[#5097EE] from-[0%] to-[#5CC9FF] to-[100%] flex items-center justify-center text-[#fff] font-[600] text-[24px] leading-[24px]">
        Связаться
      </div>
    </>
  );
}

export default Ad;