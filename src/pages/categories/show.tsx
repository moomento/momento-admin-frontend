import { Show, useShow, Typography } from "@pankod/refine";
import ReactMarkdown from "react-markdown";

const { Title, Text } = Typography;

export const CategoryShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>
      <Title level={5}>Content</Title>
      <ReactMarkdown>{record?.content}</ReactMarkdown>
    </Show>
  );
};
