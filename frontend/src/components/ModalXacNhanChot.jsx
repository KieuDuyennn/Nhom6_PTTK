import React from 'react';

export default function ModalXacNhanChot({ open, onConfirm, onCancel, confirmLabel = 'Xác nhận', cancelLabel = 'Hủy' }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-[384px] max-w-[90vw] p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#fce7f3] rounded-full p-4 w-16 h-16 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e60076" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-[#1e2939] font-bold text-[20px] mb-4">
          Xác nhận chọn phòng
        </h2>

        {/* Description */}
        <p className="text-center text-[#4a5565] text-[14px] leading-[22.75px] mb-8">
          Bạn có chắc chắn muốn xác nhận đã chọn phòng/dưỡng này, sau đó khách hàng sẽ tiếp tục đặt cọc không?
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-[#d1d5dc] rounded-[10px] py-3 px-4 font-semibold text-[16px] text-[#364153] hover:bg-gray-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-[#e60076] to-[#ec003f] rounded-[10px] py-3 px-4 font-semibold text-[16px] text-white shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)] hover:opacity-90 transition-opacity"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
