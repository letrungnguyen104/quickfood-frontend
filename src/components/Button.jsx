import Spinner from "./Spinner";

export default function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false,
  isLoading = false
}) {
  const baseStyle = "py-2 px-4 rounded-lg font-semibold transition duration-200 flex justify-center items-center gap-2";
  
  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-300",
    outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 disabled:border-primary-300 disabled:text-primary-300",
    danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
}