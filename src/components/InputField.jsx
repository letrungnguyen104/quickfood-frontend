export default function InputField({
  label, type = 'text', placeholder, value, onChange, error, name
}) {
  return (
    <div className="mb-4 w-full">
      {label && <label className="block text-sm font-semibold mb-2 text-gray-700">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-4 transition duration-200 ${
          error ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-100'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
  );
}