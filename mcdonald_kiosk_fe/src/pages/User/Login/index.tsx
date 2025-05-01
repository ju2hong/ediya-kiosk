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
        <div className='flex justify-center items-center h-screen bg-[#12225c]'>
            <div className='bg-slate-200 p-[50px] rounded-lg shadow-lg'>
                <div className='text-center'>
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
                        input-field rounded-md py-3 mb-2 mt-2 block mx-auto border border-gray-300
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
                <div className='text-center mb-2'>
                    <button
                        onClick={handleLogin}
                        className='bg-[#12225c] w-[250px] text-white rounded-xl py-2.5 mr-2 mt-3'
                    >
                        로그인
                    </button>
                    <br />
                    <Link to='/join'>
                        <button className='bg-[#12225c] w-[250px] text-white rounded-xl py-2.5 mt-2 mb-6 mr-2'>
                            회원가입
                        </button>
                    </Link>
                </div>

                <div className='text-center'>
                    <p className='text-sm mb-2 '>
                        *회원 주문시 포인트 적립을 받을 수 있습니다.
                    </p>
                    <button
                        onClick={() => navigate('/place')}
                        className='bg-gray-500  w-[250px] text-white rounded-xl py-2.5  mr-2'
                    >
                        비회원
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
