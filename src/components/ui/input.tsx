import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          className="peer h-10 w-[200px] rounded-[18px] bg-transparent bg-button-glass px-3.5 pt-2.5 text-[15px] font-bold text-white placeholder-transparent shadow-button-glass ring-[1.5px] ring-white ring-opacity-30 focus:outline-none"
          required
          ref={ref}
          {...props}
        />
        <label className="pointer-events-none absolute left-3.5 top-1.5 text-[0.5rem] text-white transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-normal  peer-placeholder-shown:text-white peer-placeholder-shown:opacity-50 peer-focus:top-1.5  peer-focus:text-[0.5rem] peer-focus:text-white peer-focus:opacity-100">
          {props.placeholder}
        </label>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
