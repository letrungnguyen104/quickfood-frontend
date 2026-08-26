export default function TimePickerField({
  label,
  name,
  value,
  onChange,
  required = false,
  icon: Icon,
  className = "",
}) {
  return (
    <div className={`mb-4 w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}

        <input
          type="time"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-4
            focus:border-primary-500 focus:ring-primary-100
            transition duration-200
            ${Icon ? "pl-10" : ""}`}
        />
      </div>
    </div>
  );
}