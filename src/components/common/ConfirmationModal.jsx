import React, { useEffect } from 'react';
import { FiAlertTriangle, FiX, FiLoader } from 'react-icons/fi';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger', // 'danger' | 'warning' | 'info'
  isLoading = false,
}) => {
  // Close on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  // Visual variants for danger/warning/info
  const typeStyles = {
    danger: {
      iconBg: 'bg-red-50 text-red-600',
      buttonBg: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    },
    warning: {
      iconBg: 'bg-amber-50 text-amber-600',
      buttonBg: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
    },
    info: {
      iconBg: 'bg-blue-50 text-blue-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    },
  };

  const currentStyle = typeStyles[type] || typeStyles.danger;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity"
      onClick={!isLoading ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Card */}
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Close button */}
        <div className="flex items-start justify-between p-6 pb-0">
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center w-11 h-11 rounded-full ${currentStyle.iconBg}`}
            >
              <FiAlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3
                id="modal-title"
                className="text-lg font-semibold text-gray-900"
              >
                {title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 rounded-lg p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Message body */}
        <div className="px-6 py-4 pl-20">
          <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50/70 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors disabled:opacity-50 ${currentStyle.buttonBg}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <FiLoader className="w-4 h-4 animate-spin" />
                Processing...
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
