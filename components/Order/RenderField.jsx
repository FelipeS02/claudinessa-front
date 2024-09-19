import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';

const RenderField = ({
  name,
  label,
  placeholder = '',
  form,
  required = true,
  className = '',
  ...props
}) => {
  if (!form) return null;
  return (
    <div className={className}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel required={required}>{label}</FormLabel>
            <FormControl>
              <Input
                autoComplete={name}
                placeholder={placeholder}
                {...field}
                {...props}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default RenderField;
