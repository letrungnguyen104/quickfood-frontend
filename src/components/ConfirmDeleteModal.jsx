import Modal from "./Modal";
import Button from "./Button";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDeleteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Deletion", 
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  isLoading = false 
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-danger-100 text-danger-500 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500 mb-8">{message}</p>
        
        <div className="flex w-full gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1" disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={onConfirm} 
            className="flex-1 !bg-danger-600 hover:!bg-danger-700"
            isLoading={isLoading}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}