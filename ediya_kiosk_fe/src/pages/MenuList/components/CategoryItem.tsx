interface CategoryItem {
    name: string;
    bgColor: string;
    color: string;
    onClick: () => void;
}

function CategoryItem({ name, bgColor, color, onClick }: CategoryItem) {
    return (
        <button
            onClick={onClick}
            className={`w-full h-10 rounded-[50px] mb-0.5 ${bgColor} ${color}`}
        >
            <p className='text-sm font-semibold text-center'>{name}</p>
        </button>
    );
}
export default CategoryItem;
