export const runtime = "edge";

export const size = {
    width: 24,
    height: 24,
};

export default function Icon() {
    return (
        <div style={{ width: size.width, height: size.height }}>
            <img
                src="/icon.svg"
                className="w-full h-full flex justify-center items-center text-white"
                alt="Icon"
            />
        </div>
    );
}
