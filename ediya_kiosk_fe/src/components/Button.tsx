interface Button {
    classes?: string;
    bgColor: string;
    text: string;
    textColor: string;
    textSize: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
    onClick?: () => void;
}

function Button({
    classes,
    bgColor,
    text,
    textColor,
    textSize,
    onClick,
}: Button) {
    return (
        <button
            onClick={onClick}
            className={`border border-none rounded py-1 px-3 text-${textSize} ${bgColor} text-${textColor} ${classes}`}
        >
            {text}
        </button>
    );
}
export default Button;
