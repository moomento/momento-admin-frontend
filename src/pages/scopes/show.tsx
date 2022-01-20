import { Show, useShow, Typography } from "@pankod/refine";

const { Title, Text } = Typography;

export const ScopeShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>
    </Show>
  );
};
