import {
  List,
  DateField,
  Table,
  useTable,
  ShowButton,
  Space,
  EditButton,
  DeleteButton,
} from "@pankod/refine";

import { IScope } from "../../interfaces";

export const ScopeList: React.FC = () => {
  const { tableProps } = useTable<IScope>();
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="name" />
        <Table.Column
          dataIndex="createdAt"
          title="Created at"
          render={(value) => <DateField format="LLL" value={value} />}
        />
        <Table.Column
          dataIndex="updatedAt"
          title="Updated at"
          render={(value) => <DateField format="LLL" value={value} />}
        />

        <Table.Column<IScope>
          title="Actions"
          dataIndex="actions"
          render={(_text, record): React.ReactNode => {
            return (
              <Space>
                <ShowButton size="small" recordItemId={record.id} hideText />
                <EditButton size="small" recordItemId={record.id} hideText />
                <DeleteButton size="small" recordItemId={record.id} hideText />
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );
};
