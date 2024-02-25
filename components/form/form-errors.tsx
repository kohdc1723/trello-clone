import { XCircle } from "lucide-react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface FormErrorsProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
}

const FormErrors = ({
    id,
    errors
}: FormErrorsProps) => {
    if (!errors) {
        return null;
    }

    return (
        <div
            id={`${id}-error`}
            aria-live={"polite"}
            className={"mt-2 text-xs text-rose-500"}
        >
            {errors?.[id]?.map((err: string) => (
                <div
                    key={err}
                    className={"flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"}
                >
                    <XCircle className={"h-4 w-4 mr-2"} />
                    {err}
                </div>
            ))}
        </div>
    );
};

export default FormErrors;