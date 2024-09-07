import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

import useAuthStore from '../hooks/useAuthStore';
import useAccount from '../hooks/useAccount';
import useMessages from '../hooks/useMessages';

import closeIcon from '../assets/close.svg';
import tonIcon from '../assets/ton-icon.png';
import arrowIcon from '../assets/arrow.svg';
import raster3dIcon from '../assets/3d-raster-small.png';

import leon1Image from '../assets/leon1.png';
import leon2Image from '../assets/leon2.png';
import leon3Image from '../assets/leon3.png';

import { useTonAddress, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';
import { TonClient, fromNano, toNano } from "@ton/ton";
import LoadingSpinner from '../components/LoadingSpinner';

function BoostPopUp({ setIsOpen, characters, nextCharacterIndex }) {
    const [loading, setLoading] = useState(true);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0)
    useEffect(() => {
        if (loadedImagesCount >= 8 && loading) {
            setLoading(false);
        }
    }, [loadedImagesCount, loading])
    const [currentSlide, setCurrentSlide] = useState(nextCharacterIndex || 0);
    const token = useAuthStore((state) => state.token);
    const account = useAccount((state) => state.account);
    const { setAccount } = useAccount();
    const { addMessage } = useMessages();
    const userFriendlyAddress = useTonAddress();
    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();
    const [setBalance] = useState(null);
    const [invoiceLink, setInvoiceLink] = useState(null);
    const [selectedCharacter, setSelectedCharacter] = useState();
    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/";
    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    }
    const nextSlide = () => {
        if (currentSlide < characters.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    }
    const handlers = useSwipeable({
        onSwipedLeft: nextSlide,
        onSwipedRight: prevSlide,
        trackMouse: true,
        trackTouch: true,
    });
    useEffect(() => {
        const initTon = async () => {
          const client = new TonClient({
            endpoint: import.meta.env.VITE_TON_ENDPOINT || 'https://testnet.toncenter.com/api/v2/jsonRPC',
          });
          const balance = await client.getBalance(wallet.account.address);
          setBalance(fromNano(balance));
          const transactions = await client.getTransactions(wallet.account.address, {inclusive: false});
          for (let trx in transactions) {
            console.log(fromNano(transactions[trx].address));
          }
        };
        if (userFriendlyAddress) {
          initTon();
        }
    }, [userFriendlyAddress])
    useEffect(() => {
        if (invoiceLink && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.openInvoice(invoiceLink, (status) => {
                console.log(status)
                setInvoiceLink(null);
                if (status === "paid") {
                    buyCharacter("stars", selectedCharacter)
                }
            });
        }
    }, [invoiceLink, window.Telegram?.WebApp])
    
    const buyCharacter = (currency, character) => {
        if (currency === 'stars') {
            fetch(apiUrl+'/characters/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(!invoiceLink ? { 
                    currency: currency,
                    character_id: character.id
                } : { 
                    currency: currency,
                    character_id: character.id,
                    invoice_link: invoiceLink
                })
            })
            .then(response => response.json())
            .then(data => {
                if ('error' in data) {
                    addMessage({
                        type: 'error',
                        text: data.error,
                        name: 'Ошибка:'
                    })
                } else {
                    if ('purchase' in data) {
                        setAccount({...account, character, balance: {...account.balance, amount: Number(account.balance.amount) - Number(data["purchase"]["amount_paid"])} });
                        setIsOpen(false);
                        addMessage({
                            type: 'success',
                            text: 'Уровень '+ character.name +' получен',
                            name: 'Успех:'
                        })
                    } else {
                        setInvoiceLink(data.invoice_link);
                        setSelectedCharacter(character);
                    }
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
        } else if ( currency === 'ton' ) {
            if (userFriendlyAddress) {
                const sendTransaction = async () => {
                    console.log(toNano(character.price_ton).toString())
                    const transaction = {
                        validUntil: Math.floor(new Date() / 1000) + 360,
                        messages: [
                            {
                                address: "0:c9b1596c848c266a856e3d88378a1500b0868c4cf77df8e807eebb63f980c01d", // destination address
                                amount: toNano(character.price_ton).toString() //Toncoin in nanotons
                            }
                        ]
                    }
                    const response = await tonConnectUI.sendTransaction(transaction);
                    if (response.boc) {
                        fetch(apiUrl+'/characters/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            },
                            body: JSON.stringify({ 
                                currency: currency,
                                character_id: character.id,
                                boc: response.boc
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if ('error' in data) {
                                addMessage({
                                    type: 'error',
                                    text: data.error,
                                    name: 'Ошибка:'
                                })
                            } else {
                                setAccount({...account, character, balance: {...account.balance, amount: Number(account.balance.amount) - Number(data["purchase"]["amount_paid"])} });
                                setIsOpen(false);
                                addMessage({
                                    type: 'success',
                                    text: 'Уровень '+ character.name +' получен',
                                    name: 'Успех:'
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
                    }
                };
                sendTransaction()
            } else {
                document.querySelector('.tonbutton button').click();
            }
        }
    }
    return (
        <div className="fixed flex flex-col h-[100%] w-[100%] max-w-[420px] mx-auto bg-[rgba(0,0,0,0.8)] left-0 right-0 top-0 z-[4]">
            <div className="boostpopup relative flex flex-col bg-[#282828] rounded-[10px] w-[calc(100%-40px)] h-[61.33%] m-auto overflow-hidden" {...handlers} style={loading ? { display: "none"} : null}>
                <div className="bg-gradient-to-tr from-[#B331FF] from-[33.32%] to-[#FFF600] to-[103.28%] px-[20px] py-[12px]">
                    <div className="text-[#fff] text-[28px] leading-[36px] font-[600]">Улучшение</div>
                    <img className="cursor-pointer absolute z-[4] right-[15px] top-[15px] w-[32px] h-[32px] brightness-0" onLoad={() => setLoadedImagesCount(prevState => prevState + 1)} src={closeIcon} alt="" onClick={() => setIsOpen(false)} />
                </div>
                <div className="relative w-[100%] h-[100%]">
                    <div className="relative flex transition-transform duration-300 ease-in-out h-[100%]" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {characters.map((character, index) => (
                        <div className="relative overflow-hidden h-[100%] w-[100%] flex-shrink-0" key={index}>
                            {character.type == "standart" &&
                            <div className="px-[20px] mt-[20px] text-[16px] font-[400] leading-[21px] text-[#fff]">Уровень: <span className="text-[#319BFF]">{character.name}</span></div>}
                            {character.type == "silver" &&
                            <div className="px-[20px] mt-[20px] text-[16px] font-[400] leading-[21px] text-[#fff]">Уровень: <span className="text-[#9CFF11]">{character.name}</span></div>}
                            {character.type == "gold" &&
                            <div className="px-[20px] mt-[20px] text-[16px] font-[400] leading-[21px] text-[#fff]">Уровень: <span className="text-[#FF11DF]">{character.name}</span></div>}
                            {Number(character.multiplier) !== 1 && <div className="px-[20px] mt-[10px] text-[14px] font-[400] leading-[18px] text-[#ADADAD]">Зарабатывай со всех заданий в {Number(character.multiplier)} раза больше!</div>}
                            {Number(character.multiplier) === 1 && <div className="px-[20px] mt-[10px] text-[14px] font-[400] leading-[18px] text-[#ADADAD]">Стандартный персонаж, стандартный заработок...</div>}
                            {character.type == "standart" &&
                                <>
                                    <div className='w-[36%] h-[32.18%] rounded-[100%] absolute inset-0 m-auto blur-[75px] z-[0] bg-[#319BFF]'></div>
                                    <img onLoad={() => setLoadedImagesCount(prevState => prevState + 1)} className="z-[1] w-[58.57%] absolute inset-0 m-auto" src={leon1Image} alt="" />
                                </>}
                            {character.type == "silver" &&
                                <>
                                    <div className='w-[36%] h-[32.18%] rounded-[100%] absolute inset-0 m-auto blur-[75px] z-[0] bg-[#9CFF11]'></div>
                                    <img onLoad={() => setLoadedImagesCount(prevState => prevState + 1)} className="z-[1] w-[58.57%] absolute inset-0 m-auto" src={leon2Image} alt="" />
                                </>}
                            {character.type == "gold" &&
                                <>
                                    <div className='w-[36%] h-[32.18%] rounded-[100%] absolute inset-0 m-auto blur-[75px] z-[0] bg-[#FF11DF]'></div>
                                    <img onLoad={() => setLoadedImagesCount(prevState => prevState + 1)} className="z-[1] w-[58.57%] absolute inset-0 m-auto" src={leon3Image} alt="" />
                                </>}
                            {index >= nextCharacterIndex ?
                                <div className="absolute bottom-[10px] left-[10px] right-[10px] p-[10px] border border-[#4B4B4B] rounded-[10px] backdrop-blur-[20px] bg-[rgba(117,117,117,0.1)] flex gap-[15px] items-center justify-around">
                                    <div className="text-[16px] font-[600] leading-[21px] text-[#fff]">Улучшить за:</div>
                                    <div className="flex gap-[7px] items-center">
                                        <div className="transform active:scale-[0.9] transition-transform cursor-pointer flex gap-[5px] justify-center text-[#FFD900] font-[600] text-[16px] leading-[17px] items-center min-w-[80px] min-h-[40px] pt-[2px] bg-[#262626] rounded-[10px] border border-[#FFD900]"
                                            onClick={() => buyCharacter("stars", character)}>
                                            {Number(character.price_stars)}
                                            <img
                                                className="flex w-[16px] h-[16px] mt-[-2px] mr-[-4px]"
                                                src={raster3dIcon}
                                                alt=""
                                                onLoad={() => setLoadedImagesCount(prevState => prevState + 1)}
                                            />
                                        </div>
                                        <div className="text-[14px] leading-[16px] font-[400] text-[#A7A7A7]">/</div>
                                        <div className="transform active:scale-[0.9] transition-transform cursor-pointer flex gap-[5px] justify-center text-[#0088CC] font-[600] text-[16px] leading-[17px] items-center min-w-[80px] min-h-[40px] pt-[2px] bg-[#fff] rounded-[10px] border border-[#fff]"
                                            onClick={() => buyCharacter("ton", character)}>
                                            {Number(character.price_ton)}
                                            <img
                                                className="flex w-[16px] h-[16px] mt-[-2.5px]"
                                                src={tonIcon}
                                                alt=""
                                                onLoad={() => setLoadedImagesCount(prevState => prevState + 1)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            : (index === nextCharacterIndex - 1 &&
                                <div className="absolute bottom-[10px] left-[10px] right-[10px] p-[10px] border border-[#4B4B4B] rounded-[10px] backdrop-blur-[20px] bg-[rgba(117,117,117,0.1)] flex gap-[15px] items-center justify-around">
                                    <div className="text-[16px] font-[600] leading-[21px] text-[#fff]">Используется</div>
                                </div>
                            )}
                    </div>
                    ))}
                </div>
                <div className="fixed top-0 bottom-0 left-[20px] right-[20px] m-auto flex items-center justify-between h-[48px]">
                    <div><img src={arrowIcon} className="cursor-pointer rotate-[180deg] w-[48px]" alt="" onClick={prevSlide} onLoad={() => setLoadedImagesCount(prevState => prevState + 1)} style={currentSlide > 0 ? null : {display: "none"}} /></div>
                    <div><img src={arrowIcon} className="cursor-pointer w-[48px]" alt="" onClick={nextSlide} onLoad={() => setLoadedImagesCount(prevState => prevState + 1)} style={currentSlide < characters.length - 1 ? null : {display: "none"}} /></div>
                </div>
                </div>
            </div>
            <div className="w-[100%] h-[100%] flex items-center justify-center" style={loading ? null : { display: "none"}}>
                <LoadingSpinner />
            </div>
        </div>
    );
}
                            
export default BoostPopUp;