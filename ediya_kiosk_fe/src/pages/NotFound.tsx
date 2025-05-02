import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function NotFound() {
    const navigate = useNavigate();
    return (
        <div className='h-full flex flex-col justify-center items-center'>
            <h1 className='text-8xl text-red-600 font-bold font-mono'>404</h1>
            <p className='mt-5 text-2xl text-white'>Page not found...</p>
            <Button
                classes='mt-7 py-2 text-lg font-semibold text-slate-200'
                bgColor='bg-gray-400'
                text='뒤로 가기'
                textColor='black'
                textSize='base'
                onClick={() => navigate(-1)}
            />
        </div>
    );
}

export default NotFound;
