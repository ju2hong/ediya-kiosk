interface CategoryItem {
    img: string;
    name: string;
    onClick: () => void;
}

function CategoryItem({ img, name, onClick }: CategoryItem) {
    return (
        <button
            onClick={onClick}
            className='w-full h-16 border border-1 rounded-lg mb-0.5 bg-white drop-shadow-2xl'
        >
            <div className='w-16 m-auto'>
                <img src={img} alt={name} className='w-full object-cover' />
            </div>
            <p className='text-sm font-semibold text-center'>{name}</p>
        </button>
    );
}
export default CategoryItem;
