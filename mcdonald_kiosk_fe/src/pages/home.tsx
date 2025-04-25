/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className='h-full flex flex-col items-center cursor-pointer'
            onClick={() => navigate('/login')}
        >
            <div className='relative w-full h-5/6 bg-red-600'>
                <div className='absolute bottom-52 -right-96 overflow-hidden'>
                    <img
                        src='/assets/Mcdonald_Logo.png'
                        alt='logo'
                        className='w-full'
                    />
                </div>
                <div className='absolute w-72 left-52 bottom-36 flex flex-col items-center'>
                    <img src='/assets/potato.png' alt='potato' />
                    <p className='text-xs text-white'>
                        안녕하세요. 맥도날드입니다.
                    </p>
                </div>
            </div>
            <button className='h-1/6 w-4/5 flex justify-around items-center'>
                <div className='w-28'>
                    <img
                        src='/assets/Mcdonald_Logo.png'
                        alt='logo'
                        className='h-full'
                    />
                </div>
                <p className='text-white text-xl font-semibold'>
                    주문하시려면 터치하세요.
                </p>
            </button>
        </div>
    );
}

export default Home;
