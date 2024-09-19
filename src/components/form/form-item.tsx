import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Input, InputProps } from '../ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

interface CustomFormInputProps extends InputProps {
  label?: string,
  type?: 'text' | 'password'
}

const CustomFormItem: React.FC<CustomFormInputProps> = ({ name, label, type = 'text' }) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name ? name : ""}
      render={({ field }) =>
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} className='focus-visible:ring-primary1' />
          </FormControl>
          <FormMessage />
        </FormItem>
      }
    />
  )
}

export default CustomFormItem
