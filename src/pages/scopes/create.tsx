import {
  Create,
  Form,
  Input, useForm
} from "@pankod/refine";
import { IScope } from "interfaces";


export const ScopeCreate = () => {
  const { formProps, saveButtonProps } = useForm<IScope>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
