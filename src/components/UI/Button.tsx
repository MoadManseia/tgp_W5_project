import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-white text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600",
    secondary:
      "bg-transparent text-blue-600 border border-transparent hover:bg-blue-50",
    danger:
      "bg-white text-red-600 border border-red-100 hover:bg-red-50 hover:border-red-300",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-normal shadow-none transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;