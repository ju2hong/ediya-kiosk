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

        try {
            const response = await fetch('http://localhost:8080/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, userPw }),
            });

            const data = await response.json();

            if (!data.success) {
                alert(data.error.message);
                return;
            }

            const { userName, accessToken } = data.data;

            sessionStorage.setItem('token', accessToken);
            sessionStorage.setItem('userName', userName);

            // JWT 토큰에서 역할 추출
            const role = getUserRoleFromToken(accessToken);

            if (role === 'ROLE_ADMIN') {
                navigate('/admin');
            } else if (role === 'ROLE_USER') {
                navigate('/place');
            } else {
                alert('정의되지 않은 권한입니다.');
            }
        } catch (error) {
            console.error('로그인 에러:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    };

    // JWT 토큰에서 역할(role) 추출
    const getUserRoleFromToken = (token: string): string | null => {
        try {
            const payload = token.split('.')[1]; // JWT 구조: header.payload.signature
            const decodedPayload = atob(payload); // base64 디코딩
            const parsedPayload = JSON.parse(decodedPayload);

            return parsedPayload.role || null;
        } catch (e) {
            console.error('토큰 파싱 실패:', e);
            return null;
        }
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
