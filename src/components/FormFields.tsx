import { FieldError, UseFormRegister } from "react-hook-form";

export type FormData = {
  taskTitle: string;
  taskNote: string;
};

export type FormFieldProps = {
  label: string;
  inputType: string;
  type: string;
  //   placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = "taskTitle" | "taskNote";

const FormField: React.FC<FormFieldProps> = ({
  label,
  inputType,
  type,
  //   placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <div className="flex flex-col">
    <label>{label}</label>
    <div className="px-4 border-border border rounded-md">
      {inputType === "input" ? (
        <input
          type={type}
          // placeholder={placeholder}
          {...register(name, { valueAsNumber })}
          className="my-3 w-full outline-none bg-transparent"
        />
      ) : inputType === "textarea" ? (
        <textarea
          //   type={type}
          // placeholder={placeholder}
          {...register(name, { valueAsNumber })}
          className="my-3 w-full outline-none bg-transparent"
        />
      ) : null}
    </div>
    {error && (
      <span className="error-message text-sm font-medium text-red-500">
        {error.message}
      </span>
    )}
  </div>
);
export default FormField;
