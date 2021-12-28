import { TextField } from '@mui/material';
import { UseFormRegister, FieldValues } from 'react-hook-form';

// can pass a full object here of hybrid interface | type of each possible form schema and destructure it in args

function renderInput(labelText: string, placeholder: string, name: string, type: string, errorMessages: any, index: number, registerFunction: UseFormRegister<FieldValues>) {
    return (
        <div key={index} data-testid={`input-${name}`}>
            <TextField className="input-container" {...registerFunction(name)} type={type} label={labelText} variant="outlined" placeholder={placeholder} error={!!errorMessages[name]?.message} helperText={errorMessages[name] ? errorMessages[name]?.message : ""} />
        </div>
    )
}

export default renderInput