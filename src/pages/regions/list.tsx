import {
  DateField,
  DeleteButton,
  EditButton,
  Form,
  FormProps,
  Icons,
  Input,
  List,
  ShowButton,
  Space,
  Table,
  useTable,
  useTranslate,
  CrudFilters,
  HttpError,
} from "@pankod/refine";
import { IRegion, IRegionFilterVariables } from "../../interfaces";

export const RegionList: React.FC = () => {
  const { tableProps, searchFormProps } = useTable<
    IRegion,
    HttpError,
    IRegionFilterVariables
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
    <List>
      <Filter formProps={searchFormProps} />
      <Table
        {...tableProps}
        rowKey="id"
      >
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

        <Table.Column<IRegion>
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

const Filter: React.FC<{ formProps: FormProps }> = (props) => {
  const t = useTranslate();
  return (
    <Form {...props.formProps}>
      <Form.Item name="q">
        <Input placeholder="Search" prefix={<Icons.SearchOutlined />} />
      </Form.Item>
    </Form>
  );
};
