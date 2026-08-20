import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'error' | 'success';
  onClose: () => void;
}

export default function Toast({ message, type = 'error', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed left-1/2 top-6 z-50 w-[90%] max-w-sm -translate-x-1/2 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg ${
        type === 'error'
          ? 'border-red-500/30 bg-red-950 text-red-300'
          : 'border-green-500/30 bg-green-950 text-green-300'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span>{message}</span>
        <button onClick={onClose} className="text-lg leading-none opacity-70">
          ×
        </button>
      </div>
    </div>
  );
}