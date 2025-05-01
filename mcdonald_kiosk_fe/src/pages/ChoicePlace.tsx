import { useNavigate } from 'react-router-dom';

function ChoicePlace() {
    const navigate = useNavigate();
    return (
        <div className='h-full w-full flex flex-col justify-start items-center'>
            <div className='font-["Helvetica"] font-bold text-7xl text-white mt-[70px]'>
                <p>EDIYA</p>
                <p>COFFEE</p>
            </div>

            <div className='w-3/4 flex justify-around mt-[70px]'>
                <button
                    className='h-72 w-52 bg-white rounded-[30px]'
                    onClick={() => navigate('/menu')}
                >
                    <img
                        src='/assets/cup.png'
                        alt='매장'
                        className='w-40 h-36 m-auto'
                    />
                    <p className='text-xl font-bold mt-5'>매장에서 식사</p>
                </button>
                <button
                    className='h-72 w-52 bg-white rounded-[30px]'
                    onClick={() => navigate('/menu')}
                >
                    <img
                        src='/assets/drink.png'
                        alt='매장'
                        className='w-40 h-36 m-auto'
                    />
                    <p className='text-xl font-bold mt-5'>테이크 아웃</p>
                </button>
            </div>

            <img
                src='https://ediya.com/files/banner/IMG_1745831451535.jpg'
                className='w-full h-48 object-cover mt-[120px]'
                alt='logo'
            />
        </div>
    );
}
export default ChoicePlace;
