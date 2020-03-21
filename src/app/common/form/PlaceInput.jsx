import react from 'reac';
import PlaceAutocomplete from 'react-places-autocomplete';
import { Form, Label } from 'semantic-ui-react';

const PlaceInput = ({ input: { value, onChange, onBlur }, width, options,placeholder, meta: { touched, error } }) => {
    return (
        <PlaceAutocomplete
         value={value}
         onChange={onChange}
         searchOptions ={options}
        >
            {({getInputProps,suggestions,getSuggestionItemProps,loading})=>(
                <Form.Field error={touched && !!error} > 
                <input placeholder={placeholder} {...getInputProps(placeholder,onBlur)}/>
                {touched && error && <Label basic color='red'>{error}</Label>}

                </Form.Field>
            )}

        </PlaceAutocomplete>

    )

}