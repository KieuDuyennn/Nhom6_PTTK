import React from 'react';

export default function ModalXacNhanHuy({ open, title, message, onConfirm, onCancel, confirmLabel='Xác nhận', cancelLabel='Đóng lại' }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl w-[520px] max-w-[90%] p-8 shadow-2xl z-10">
        <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef233c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <h3 className="text-[20px] font-extrabold text-[#0f172a]">{title}</h3>
          <p className="text-[14px] text-gray-500">{message}</p>

          <div className="w-full mt-4 flex flex-col gap-3">
            <button onClick={onConfirm} className="w-full inline-flex items-center justify-center bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 rounded-lg font-semibold">{confirmLabel}</button>
            <button onClick={onCancel} className="w-full inline-flex items-center justify-center border border-gray-200 text-gray-700 py-3 rounded-lg">{cancelLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
