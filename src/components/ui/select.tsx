import React from "react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={`peer h-10 w-[200px] rounded-[18px] bg-transparent bg-button-glass px-3.5 text-[15px] text-white placeholder-transparent shadow-button-glass ring-[1.5px] ring-white ring-opacity-30 focus:outline-none ${props.value ? "text-white" : "text-opacity-60"}`}
        required
        ref={ref}
        {...props}
      />
    );
  },
);
Select.displayName = "Select";

export { Select };
