import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export interface FormField {
  code: string;
  name: string;
  inputType: 'text' | 'textarea' | 'select' | 'checkbox' | 'nestedselect';
  editable: boolean;
  required: boolean;
  placeholder?: string;
  default?: any;
  range?: any[];
  terms?: any[];
}

interface DynamicFormProps {
  config: FormField[];
  defaultValues: any;
  onSubmit: (data: any) => void;
  onStatusChange?: (isValid: boolean) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config, defaultValues, onSubmit, onStatusChange }) => {
  // Build Zod schema dynamically
  const schemaShape: any = {};
  config.forEach(field => {
    let fieldSchema: any = z.any();
    if (field.required) {
      if (field.inputType === 'text' || field.inputType === 'textarea') {
        fieldSchema = z.string().min(1, `${field.name} is required`);
      }
    } else {
      fieldSchema = z.string().optional().or(z.any());
    }
    schemaShape[field.code] = fieldSchema;
  });

  const schema = z.object(schemaShape);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    if (onStatusChange) onStatusChange(isValid);
  }, [isValid, onStatusChange]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        {config.map(field => {
            if (!field.editable && field.inputType !== 'nestedselect') return null;
            const isFullWidth = field.inputType === 'textarea' || field.code === 'keywords';

            return (
            <div key={field.code} className={isFullWidth ? "md:col-span-2" : ""}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.name} {field.required && <span className="text-red-500">*</span>}
                </label>

                {field.inputType === 'textarea' ? (
                <textarea
                    {...register(field.code)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 outline-none transition-all resize-none text-sm"
                    placeholder={field.placeholder}
                    rows={3}
                />
                ) : field.inputType === 'select' ? (
                <div className="relative">
                    <select
                        {...register(field.code)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 outline-none transition-all text-sm appearance-none bg-white"
                    >
                        <option value="">Select {field.name}</option>
                        {(field.range || field.terms || []).map((opt: any) => (
                        <option key={opt.value || opt} value={opt.value || opt}>
                            {opt.label || opt}
                        </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
                ) : field.inputType === 'checkbox' ? (
                    <div className="flex items-center gap-3">
                        <input type="checkbox" {...register(field.code)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <span className="text-sm text-gray-600">Enable {field.name}</span>
                    </div>
                ) : (
                <input
                    {...register(field.code)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 outline-none transition-all text-sm"
                    placeholder={field.placeholder}
                />
                )}

                {errors[field.code] && (
                <p className="mt-1 text-[10px] text-red-500 font-medium">
                    {errors[field.code]?.message as string}
                </p>
                )}
            </div>
            );
        })}
      </div>

      <div className="flex justify-end pt-4 border-t mt-4">
        <button
          type="submit"
          className="px-4 py-2 border border-gray-300 text-gray-500 hover:bg-gray-50 rounded transition-all text-xs font-medium"
        >
          <span className="flex items-center gap-1">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
             Add from library
          </span>
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
