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
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    if (onStatusChange) onStatusChange(isValid);
  }, [isValid, onStatusChange]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {config.map(field => {
        if (!field.editable && field.inputType !== 'nestedselect') return null;

        return (
          <div key={field.code}>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {field.name} {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.inputType === 'textarea' ? (
              <textarea
                {...register(field.code)}
                className="w-full px-4 py-2.5 border rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none"
                placeholder={field.placeholder}
                rows={4}
              />
            ) : field.inputType === 'select' ? (
              <select
                {...register(field.code)}
                className="w-full px-4 py-2.5 border rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
              >
                <option value="">Select {field.name}</option>
                {(field.range || field.terms || []).map((opt: any) => (
                  <option key={opt.value || opt} value={opt.value || opt}>
                    {opt.label || opt}
                  </option>
                ))}
              </select>
            ) : field.inputType === 'checkbox' ? (
                <div className="flex items-center gap-3">
                    <input type="checkbox" {...register(field.code)} className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary" />
                    <span className="text-sm text-gray-600 font-medium">Enable {field.name}</span>
                </div>
            ) : (
              <input
                {...register(field.code)}
                className="w-full px-4 py-2.5 border rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                placeholder={field.placeholder}
              />
            )}

            {errors[field.code] && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">
                {errors[field.code]?.message as string}
              </p>
            )}
          </div>
        );
      })}

      <div className="flex justify-end pt-6 border-t mt-8">
        <button
          type="submit"
          disabled={!isDirty}
          className="px-10 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
        >
          Save Metadata
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
