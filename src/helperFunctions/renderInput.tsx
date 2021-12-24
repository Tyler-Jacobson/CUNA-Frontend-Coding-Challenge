import { TextField } from '@mui/material';

// can pass a full object here of hybrid interface | type of each possible form schema and destructure it in args

function renderInput(labelText: any, placeholder: any, name: any, type: any, errorMessages: any, index: any, registerFunction: any) {
    return (
        <div key={index}>
            <TextField className="input-container" {...registerFunction(name)} type={type} label={labelText} variant="outlined" placeholder={placeholder} error={!!errorMessages[name]?.message} helperText={errorMessages[name] ? errorMessages[name]?.message : ""} />
        </div>
    )
}

export default renderInput