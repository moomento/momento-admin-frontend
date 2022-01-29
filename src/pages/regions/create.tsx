import { Create, Form, Input, useForm } from "@pankod/refine";
import { IScope } from "interfaces";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

export const RegionCreate = () => {
  const { formProps, saveButtonProps } = useForm<IScope>();
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

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
      </Form>
    </Create>
  );
};
