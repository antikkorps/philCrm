export const inputTypes = {
    text: "text",
    email: "email",
    password: "password",
    number: "number",
    date: "date",
    url: "url",
    select: "select",
    checkbox: "checkbox",
    radio: "radio",
    file: "file",
    textarea: "textarea",
    hidden: "hidden",
    otp: "otp",
    wysiwyg: "wysiwyg",
    switch: "switch",
    combobox: "combobox",
} as const;
export type InputType = (typeof inputTypes)[keyof typeof inputTypes];

export interface Field {
    data: any;
    setData?: (key: string, value: any) => void;
    inputType: InputType;
    loading?: boolean;
    disabled?: boolean;
    placeholder?: string;
    noOptionFound?: string;
    handleInput?: (e: any) => void;
    file?: {
        variant?: "dropzone" | "default";
        multiple?: boolean;
        accept?: string;
        helper?: string;
        uploadText?: string;
        dragText?: string;
    };
    number?: {
        min?: number;
        max?: number;
        step?: number;
    };
    options?: {
        value: string;
        label: string;
    }[];
    selectFallbackMessage?: string;
    charCount?: number;
}
export interface PhilInputProps {
    group: {
        label?: string;
        description?: string;
        className?: string;
        error?: string;
    };
    field: Field;
    fieldName: string;
    required?: boolean;
}