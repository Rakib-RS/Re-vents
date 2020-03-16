import React from "react";
import { Form, Label, Select } from "semantic-ui-react";

const SelectInput = ({
  input,
  type,
  placeholder,
  multiple,
  options,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <Select
        value ={input.value ||null}
      />
    </Form.Field>
  );
};

export default SelectInput;
