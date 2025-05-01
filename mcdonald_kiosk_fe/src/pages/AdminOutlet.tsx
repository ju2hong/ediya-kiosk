import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Menu, Users, ShoppingCart, List, CupSoda } from 'lucide-react'; // 아이콘

function AdminLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/admin') {
            navigate('/admin/user');
        }
    }, []);

    return (
        <div className='flex h-screen bg-gray-100'>
            {/* 햄버거 사이드바 */}
            <aside className='group fixed top-0 h-full bg-[#12225c] text-white transition-all duration-300 w-16 hover:w-40 overflow-hidden z-10'>
                <div className='flex items-center justify-center py-4'></div>
                <NavLink
                    to='/admin/user'
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 hover:bg-slate-200 hover:text-black transition-all ${
                            isActive ? 'bg-white text-black' : 'text-slate-200'
                        }`
                    }
                >
                    <Users />
                    <span className='whitespace-nowrap hidden group-hover:inline'>
                        회원 관리
                    </span>
                </NavLink>
                <NavLink
                    to='/admin/menu'
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 hover:bg-slate-200 hover:text-black transition-all ${
                            isActive ? 'bg-white text-black' : 'text-slate-200'
                        }`
                    }
                >
                    <CupSoda />
                    <span className='whitespace-nowrap hidden group-hover:inline'>
                        상품 관리
                    </span>
                </NavLink>
                <NavLink
                    to='/admin/order'
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 hover:bg-slate-200 hover:text-black transition-all ${
                            isActive ? 'bg-white text-black' : 'text-slate-200'
                        }`
                    }
                >
                    <ShoppingCart />
                    <span className='whitespace-nowrap hidden group-hover:inline'>
                        주문 관리
                    </span>
                </NavLink>
            </aside>

            {/* 메인 컨텐츠 */}
            <main className='ml-16 group-hover:ml-40 transition-all duration-300 flex-1 p-10 overflow-y-auto bg-slate-400'>
                <header className='mb-6 flex justify-between items-center'>
                    <h1 className='text-3xl font-bold'>관리자 페이지</h1>
                    <button
                        onClick={() => {
                            sessionStorage.clear();
                            navigate('/');
                        }}
                        className='bg-stone-400 text-white px-4 py-2 rounded hover:bg-stone-800'
                    >
                        로그아웃
                    </button>
                </header>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
