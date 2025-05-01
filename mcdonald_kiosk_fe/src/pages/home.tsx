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
            <div className='relative w-full h-5/6 bg-[#243c85]'>
                <div className='ms-12 mt-[100px]'>
                    <p className=' text-white text-8xl font-["Helvetica"] font-bold pb-2'>
                        EDIYA
                    </p>
                    <p className=' text-white text-8xl font-["Helvetica"] font-bold'>
                        COFFEE
                    </p>
                </div>
            </div>
            <button className='bg-white h-1/6 w-full flex items-center p-[50px] gap-[130px]'>
                <div className='w-28'>
                    <img
                        src='/assets/ediyaLogo.png'
                        alt='logo'
                        className='h-full'
                    />
                </div>
                <p className='text-2xl font-semibold'>
                    주문하시려면 터치하세요.
                </p>
            </button>
        </div>
    );
}

export default Home;
