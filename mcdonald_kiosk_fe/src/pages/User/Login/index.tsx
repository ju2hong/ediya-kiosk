import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

    const handleLogin = async () => {
        if (!userId || !userPw) {
            alert('모든 필드를 입력하세요.');
            return;
        }

        const data = await fetch('http://localhost:8080/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                userPw,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.error(err));

        if (!data.success) {
            alert(data.error.message);
            return;
        }

        const { userName, accessToken } = data.data;
        sessionStorage.setItem('token', accessToken);
        sessionStorage.setItem('userName', userName);

        navigate('/place');
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='bg-emerald-100 p-8 rounded-lg shadow-md'>
                <div className='mb-8 text-center'>
                    <img
                        src='/assets/Mcdonald_Logo.png'
                        alt="McDonald's Logo"
                        className='w-32 h-32 mx-auto'
                    />
                </div>
                <h2 className='mb-4 text-2xl font-semibold text-gray-800 text-center'>
                    로그인
                </h2>
                <div className='mb-4'>
                    <input
                        type='text'
                        placeholder='아이디'
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className='input-field rounded-md px-4 py-2 mb-2 mt-5 block mx-auto border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400'
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type='password'
                        placeholder='비밀번호'
                        value={userPw}
                        onChange={(e) => setUserPw(e.target.value)}
                        className='input-field rounded-md px-4 py-2 mb-2 block mx-auto border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400'
                    />
                </div>
                <div className='text-center mb-20'>
                    <button
                        onClick={handleLogin}
                        className='bg-blue-600 text-white rounded-md px-4 py-2 mr-2'
                    >
                        로그인
                    </button>
                    <button
                        onClick={() => navigate('/place')}
                        className='bg-red-600 text-white rounded-md px-4 py-2'
                    >
                        비회원 로그인
                    </button>
                </div>
                <div className='text-center'>
                    <p className='text-sm'>
                        *회원가입 하시면 포인트 적립을 받을 수 있습니다.
                    </p>
                    <Link to='/join'>
                        <button className='bg-gray-400 text-white rounded-md px-4 py-2 mt-4'>
                            회원가입
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
