import { useForm, Form, Input, Edit } from "@pankod/refine";
import { IScope } from "interfaces";

export const ScopeEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IScope>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
