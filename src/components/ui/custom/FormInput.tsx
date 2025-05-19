
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  description?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  error,
  description,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className={error ? "text-destructive" : ""}
      >
        {label}
      </Label>
      <Input
        id={id}
        className={`${error ? "border-destructive" : ""} ${props.className || ""}`}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
      {error ? (
        <p className="text-xs text-destructive mt-1">{error}</p>
      ) : description ? (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      ) : null}
    </div>
  );
};
