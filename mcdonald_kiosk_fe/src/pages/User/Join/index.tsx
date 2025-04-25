import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Join() {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const handleJoin = async () => {
        if (!userId || !userPw || !userName) {
            alert('모든 필드를 입력하세요');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    userPw: userPw,
                    userName: userName,
                }),
            });

            const responseData = await response.json();

            if (!responseData.success) {
                throw new Error(responseData.error.message);
            }

            alert('회원가입에 성공하였습니다');
            navigate('/login');
        } catch (error: any) {
            console.log(error);
            alert(error.message);
        }
    };

    const handleCancel = () => {
        navigate('/login');
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
                    회원가입
                </h2>
                <div className='mb-4'>
                    <input
                        type='text'
                        placeholder='아이디'
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className='input-field rounded-md px-4 py-2 mb-2 mt-5 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400'
                    />
                </div>

                <div className='mb-4'>
                    <input
                        type='password'
                        placeholder='비밀번호'
                        value={userPw}
                        onChange={(e) => setUserPw(e.target.value)}
                        className='input-field rounded-md px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400'
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type='text'
                        placeholder='이름'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className='input-field rounded-md px-4 py-2 mb-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400'
                    />
                </div>
                <div className='flex justify-between'>
                    <button
                        onClick={handleJoin}
                        className='bg-blue-600 text-white rounded-md px-4 py-2'
                    >
                        회원가입
                    </button>

                    <button
                        onClick={handleCancel}
                        className='bg-red-600 text-white rounded-md px-4 py-2'
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Join;
