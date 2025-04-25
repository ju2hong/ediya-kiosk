import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function AdminOutlet() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/admin') {
            navigate('/admin/user');
        }
    }, []);
    return (
        <>
            <h1 className='text-5xl font-bold font-mono text-center mt-10 text-white'>
                키오스크 관리자 화면
            </h1>
            <ul className='w-full flex justify-between items-center mt-7 border-y-2 border-gray-100-200'>
                <NavLink
                    to='/admin/user'
                    className='text-lg font-semibold w-1/3 py-2 border-r-2 text-slate-200 hover:bg-slate-200 hover:text-black'
                    style={({ isActive }) => ({
                        backgroundColor: isActive
                            ? 'rgb(226 232 240)'
                            : 'transparent',
                        color: isActive ? 'black' : 'rgb(226 232 240)',
                    })}
                >
                    <button className='w-full text-lg font-semibold'>
                        회원 관리
                    </button>
                </NavLink>
                <NavLink
                    to='/admin/menu'
                    className='text-lg font-semibold w-1/3 py-2 border-r-2 text-slate-200 hover:bg-slate-200 hover:text-black active:bg-slate-200 active:text-black'
                    style={({ isActive }) => ({
                        backgroundColor: isActive
                            ? 'rgb(226 232 240)'
                            : 'transparent',
                        color: isActive ? 'black' : 'rgb(226 232 240)',
                    })}
                >
                    <button className=' w-full text-lg font-semibold'>
                        상품 관리
                    </button>
                </NavLink>

                <NavLink
                    to='/admin/order'
                    className='w-1/3 py-2 text-slate-200 hover:bg-slate-200 hover:text-black active:bg-slate-200 active:text-black'
                    style={({ isActive }) => ({
                        backgroundColor: isActive
                            ? 'rgb(226 232 240)'
                            : 'transparent',
                        color: isActive ? 'black' : 'rgb(226 232 240)',
                    })}
                >
                    <button className=' w-full text-lg font-semibold'>
                        주문 관리
                    </button>
                </NavLink>
            </ul>
            <Outlet />
        </>
    );
}
export default AdminOutlet;
