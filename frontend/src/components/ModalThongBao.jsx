import React from 'react';

const ModalThongBao = ({ show, type = 'success', title, message, primaryAction, secondaryAction }) => {
  if (!show) return null;

  const isError = type === 'error';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden text-center p-8 animate-in zoom-in-95 duration-200 relative">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isError ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
          {isError ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          )}
        </div>
        
        <h3 className="text-xl font-black text-navy mb-2 tracking-tight">
          {title}
        </h3>
        
        <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">
          {message}
        </p>
        
        <div className="flex flex-col gap-3">
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className={`w-full py-3.5 px-6 font-bold text-sm rounded-2xl shadow-lg transition-all active:scale-[0.98] ${
                isError 
                ? 'bg-rose-500 text-white shadow-rose-200 hover:bg-rose-600' 
                : 'bg-primary text-white shadow-primary/20 hover:bg-primary-dark'
              }`}
            >
              {primaryAction.label}
            </button>
          )}
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="w-full py-3.5 px-6 bg-slate-50 border border-slate-100 text-navy font-bold text-sm rounded-2xl hover:bg-slate-100 transition-colors active:scale-[0.98]"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalThongBao;
