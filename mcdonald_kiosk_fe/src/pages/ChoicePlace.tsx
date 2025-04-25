import { useNavigate } from 'react-router-dom';

function ChoicePlace() {
    const navigate = useNavigate();
    return (
        <div className='h-full flex flex-col justify-start items-center'>
            <div className='w-3/4 flex justify-between items-center mt-16'>
                <div className='w-32'>
                    <img
                        src='/assets/Mcdonald_Logo.png'
                        alt='logo'
                        className='w-full'
                    />
                </div>
                <p className='mr-10 text-white text-xl font-medium'>
                    식사하실 장소를 선택해주세요.
                </p>
            </div>
            <div className='w-3/4 flex justify-around mt-24'>
                <button
                    className='h-72 w-52 bg-white border border-none rounded-xl'
                    onClick={() => navigate('/menu')}
                >
                    <img
                        src='/assets/burger_set1.png'
                        alt='매장'
                        className='w-44 h-36 m-auto'
                    />
                    <p className='text-lg font-bold text-red-600 mt-5'>
                        매장에서 식사
                    </p>
                </button>
                <button
                    className='h-72 w-52 bg-white border border-none rounded-xl'
                    onClick={() => navigate('/menu')}
                >
                    <img
                        src='/assets/takeout.jpg'
                        alt='매장'
                        className='w-44 h-36 m-auto'
                    />
                    <p className='text-lg font-bold text-red-600 mt-5'>
                        테이크 아웃
                    </p>
                </button>
            </div>
        </div>
    );
}
export default ChoicePlace;
