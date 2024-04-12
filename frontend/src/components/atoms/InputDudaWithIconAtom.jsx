import React from 'react';

const InputDudaWithIconAtom = React.forwardRef(({ placeholder, type }, ref) => {
    return (
      <div>
        <input
          placeholder={placeholder}
          type={type}
          ref={ref}
          required
          className="pl-4 pr-4 py-2 w-full rounded-md border border-grisClaro shadow-sm focus:border-verdeSena2 focus:ring-0"
        />
      </div>
    );
});

export default InputDudaWithIconAtom;
