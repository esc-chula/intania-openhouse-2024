import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, description, helperText, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          className={`peer w-[200px] bg-transparent bg-button-glass px-3.5 pt-1 text-[15px] font-bold text-white placeholder-transparent shadow-button-glass ring-[1.5px] ring-white ring-opacity-30 backdrop-blur-sm duration-300 focus:h-14 focus:rounded-[24px] focus:outline-none ${props.value ? "h-14 rounded-[24px]" : "h-10 rounded-[18px]"}`}
          required
          ref={ref}
          {...props}
        />
        <label className="pointer-events-none absolute left-3.5 top-1.5 text-[0.5rem] text-white transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-normal  peer-placeholder-shown:text-white peer-placeholder-shown:opacity-50 peer-focus:top-1.5  peer-focus:text-[0.5rem] peer-focus:text-white peer-focus:opacity-100">
          {props.placeholder}
        </label>
        {description && (
          <p className="-mb-2 mt-2 text-right text-[0.5rem] text-white/80">
            {description}
          </p>
        )}
        {helperText && (
          <p className="mt-1 text-[0.5rem] text-red-500">{helperText}</p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
