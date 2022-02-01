import {
  CrudFilters,
  DateField,
  DeleteButton,
  EditButton,
  Form,
  FormProps,
  HttpError,
  Icons,
  Input,
  List,
  ShowButton,
  Space,
  Table,
  useTable,
  useTranslate,
} from "@pankod/refine";
import { IScope, IScopeFilterVariables } from "../../interfaces";

export const ScopeList: React.FC = () => {
  const { tableProps, searchFormProps } = useTable<
    IScope,
    HttpError,
    IScopeFilterVariables
  >({
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q } = params;
      filters.push({
        field: "q",
        operator: "eq",
        value: q,
      });
      return filters;
    },
  });
  return (
    <>
      <List>
        <Filter formProps={searchFormProps} />
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="name" title="Name" />
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
                  <DeleteButton
                    size="small"
                    recordItemId={record.id}
                    hideText
                  />
                </Space>
              );
            }}
          />
        </Table>
      </List>
    </>
  );
};

const Filter: React.FC<{ formProps: FormProps }> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = useTranslate();
  return (
    <Form {...props.formProps}>
      <Form.Item name="q">
        <Input placeholder="Search" prefix={<Icons.SearchOutlined />} />
      </Form.Item>
    </Form>
  );
};
