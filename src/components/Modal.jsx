import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className={`bg-white rounded-3xl p-6 md:p-8 w-full ${maxWidth} max-h-[95vh] overflow-y-auto relative shadow-2xl z-10`}>
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        {title && <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>}
        {children}
      </div>
    </div>
  );
}