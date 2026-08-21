export default function CategoryBadge({ icon: Icon, name, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200 ${
        isActive ? 'badge-active' : 'badge-inactive'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{name}</span>
    </button>
  );
}