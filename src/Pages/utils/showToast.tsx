// utils/toast.tsx
import toast, { type Toast } from 'react-hot-toast';
import { FiX } from 'react-icons/fi';
import { FaCheck } from "react-icons/fa";
import { IoAlertOutline } from "react-icons/io5";

function ToastCard({ t, type, title, description }: {
  t: Toast;
  type: 'success' | 'error';
  title: string;
  description?: string;
}) {
  const isSuccess = type === 'success';
  return (
    <div
      className={`${t.visible ? 'animate-enter' : 'animate-leave'}
        flex items-start gap-3 bg-white shadow-xl rounded-lg  z-10 pointer-events-auto
        border-l-4 ${isSuccess ? 'border-green-600' : 'border-red-600'}
        px-4 py-3 min-w-[320px] max-w-[420px]`}
    >
      <div className={`flex items-center justify-center w-6 h-6 rounded-full mt-0.5 shrink-0
        ${isSuccess ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
        {isSuccess ? <FaCheck size={10} /> : <IoAlertOutline size={10} />}
      </div>
      <div className="flex-1">
        <p className={`font-semibold text-[10px] ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
          {title}
        </p>
        {description && <p className="text-[13px] text-gray-700 mt-0.5">{description}</p>}
      </div>
      <button onClick={() => toast.dismiss(t.id)} className="text-gray-500 hover:text-gray-800 mt-0.5 shrink-0">
        <FiX size={16} />
      </button>
    </div>
  );
}

export const customToast = {
  success: (title: string, description?: string) =>
    toast.custom((t) => <ToastCard t={t} type="success" title={title} description={description} />),

  error: (title: string, description?: string) =>
    toast.custom((t) => <ToastCard t={t} type="error" title={title} description={description} />),

  promise: async <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: (data: T) => { title: string; description?: string };
      error: (err: any) => { title: string; description?: string };
    }
  ): Promise<T> => {
    const loadingId = toast.loading(messages.loading);
    try {
      const data = await promise;
      const isHookFailure = typeof data === 'object' && data !== null && 'success' in data && (data as { success?: boolean }).success === false;

      if (isHookFailure) {
        toast.dismiss(loadingId);
        const result = data as { success: boolean; message?: string };
        const { title, description } = messages.error(result);
        customToast.error(title, description ?? result.message);
        throw new Error(result.message ?? 'Operasi gagal.');
      }

      toast.dismiss(loadingId);
      const { title, description } = messages.success(data);
      customToast.success(title, description);
      return data;
    } catch (err) {
      toast.dismiss(loadingId);
      const { title, description } = messages.error(err);
      customToast.error(title, description ?? (err as Error)?.message);
      throw err;
    }
  },
};