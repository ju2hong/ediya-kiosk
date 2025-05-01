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
        <div className='flex justify-center items-center h-screen bg-[#12225c]'>
            <div className='bg-slate-200 p-[50px] rounded-lg shadow-lg'>
                <div className='mb-2 text-center'>
                    <img
                        src='/assets/textlogo.png'
                        alt='ediya Logo'
                        className='w-[220px] h-[80px] mx-auto'
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type='text'
                        placeholder='아이디'
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="bg-[url('assets/id.png')] bg-no-repeat  bg-[position:12px_center]  bg-[length:20px_20px] pl-10
                        input-field rounded-md py-3 mb-2 block mx-auto border border-gray-300
                        focus:outline-none focus:ring focus:ring-blue-400"
                    />
                </div>

                <div className='mb-4'>
                    <input
                        type='password'
                        placeholder='비밀번호'
                        value={userPw}
                        onChange={(e) => setUserPw(e.target.value)}
                        className="bg-[url('assets/pw.png')] bg-no-repeat  bg-[position:12px_center]  bg-[length:20px_20px] pl-10
                        input-field rounded-md py-3 mb-2 block mx-auto border border-gray-300
                        focus:outline-none focus:ring focus:ring-blue-400"
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type='text'
                        placeholder='이름'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="bg-[url('assets/name.png')] bg-no-repeat  bg-[position:12px_center]  bg-[length:20px_20px] pl-10
                        input-field rounded-md py-3 mb-2 block mx-auto border border-gray-300
                        focus:outline-none focus:ring focus:ring-blue-400"
                    />
                </div>
                <div className='text-center'>
                    <button
                        onClick={handleJoin}
                        className='bg-[#12225c] w-[250px] text-white rounded-xl py-2.5 mt-2 mb-3 mr-2'
                    >
                        회원가입
                    </button>
                    <br />
                    <button
                        onClick={handleCancel}
                        className='bg-gray-500 w-[250px] text-white rounded-xl py-2.5 mr-2'
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Join;
