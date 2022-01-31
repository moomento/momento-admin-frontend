import {
  Create,
  Form,
  Input,
  Select,
  useForm,
  useSelect,
} from "@pankod/refine";
import { ICategory, IRegion, IScope } from "interfaces";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

export const CategoryCreate = () => {
  const { formProps, saveButtonProps } = useForm<ICategory>();
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const { selectProps: scopeSelectProps } = useSelect<IScope>({
    resource: "scopes",
    optionLabel: "name",
    optionValue: "id",
  });
  const { selectProps: regionSelectProps } = useSelect<IRegion>({
    resource: "regions",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Content" name="content">
          <ReactMde
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
            }
          />
        </Form.Item>
        <Form.Item label="Scope" name="scopeId">
          <Select {...scopeSelectProps} allowClear placeholder="Scope" />
        </Form.Item>
        <Form.Item label="Region" name="regionId">
          <Select {...regionSelectProps} allowClear placeholder="Region" />
        </Form.Item>
      </Form>
    </Create>
  );
};
