

const FormField = ({ label, ...otherProps }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={otherProps.id} className={`font-medium text-sm`}>
          {label}
        </label>
      )}
      <input
        className="py-2 px-3 rounded-md outline-none font-medium placeholder:font-normal placeholder:italic placeholder:text-sm active: focus-within: auto-complete-none text-sm"
        {...otherProps}
      />
    </div>
  );
};

export default FormField;
