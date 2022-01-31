import {
  Button,
  Card,
  Col,
  CrudFilters,
  DateField,
  DeleteButton,
  EditButton,
  Form,
  FormProps,
  getDefaultFilter,
  HttpError,
  Icons,
  Input,
  List,
  Row,
  Select,
  ShowButton,
  Space,
  Table,
  useSelect,
  useTable,
  useTranslate,
} from "@pankod/refine";
import {
  ICategory,
  ICategoryFilterVariables,
  IRegion,
  IScope,
} from "../../interfaces";

export const CategoryList: React.FC = () => {
  const { tableProps, sorter, searchFormProps, filters } = useTable<
    ICategory,
    HttpError,
    ICategoryFilterVariables
  >({
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q, scopeId, regionId } = params;

      filters.push({
        field: "q",
        operator: "eq",
        value: q,
      });

      filters.push({
        field: "scopeId",
        operator: "eq",
        value: scopeId,
      });

      filters.push({
        field: "regionId",
        operator: "eq",
        value: regionId,
      });
      return filters;
    },
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xl={6} lg={24} xs={24}>
        <Card bordered={false} title="Filters">
          <Filter formProps={searchFormProps} filters={filters || []} />
        </Card>
      </Col>
      <Col xl={18} xs={24}>
        <List>
          <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex="name" title="Name" />
            <Table.Column
              dataIndex="scope"
              title="Scope"
              render={(scope) => (scope ? <>{scope.name}</> : null)}
            />
            <Table.Column
              dataIndex="region"
              title="Region"
              render={(region) => (region ? <>{region.name}</> : null)}
            />
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

            <Table.Column<ICategory>
              title="Actions"
              dataIndex="actions"
              render={(_text, record): React.ReactNode => {
                return (
                  <Space>
                    <ShowButton
                      size="small"
                      recordItemId={record.id}
                      hideText
                    />
                    <EditButton
                      size="small"
                      recordItemId={record.id}
                      hideText
                    />
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
      </Col>
    </Row>
  );
};

const Filter: React.FC<{ formProps: FormProps; filters: CrudFilters }> = (
  props
) => {
  const t = useTranslate();

  const { formProps, filters } = props;
  const { selectProps: scopeSelectProps } = useSelect<IScope>({
    resource: "scopes",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: getDefaultFilter("scopeId", filters),
  });

  const { selectProps: regionSelectProps } = useSelect<IRegion>({
    resource: "regions",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: getDefaultFilter("regionId", filters),
  });

  return (
    <Form
      layout="vertical"
      initialValues={{
        q: getDefaultFilter("q", filters),
        scopeId: getDefaultFilter("scopeId", filters),
        regionId: getDefaultFilter("reginId", filters),
      }}
      {...formProps}
    >
      <Row gutter={[10, 0]} align="bottom">
        <Col xl={24} md={8} sm={12} xs={24}>
          <Form.Item label="Search" name="q">
            <Input placeholder="Search..." prefix={<Icons.SearchOutlined />} />
          </Form.Item>
        </Col>
        <Col xl={24} md={8} sm={12} xs={24}>
          <Form.Item label="Scope" name="scopeId">
            <Select {...scopeSelectProps} allowClear placeholder="Scope" />
          </Form.Item>
        </Col>
        <Col xl={24} md={8} sm={12} xs={24}>
          <Form.Item label="Region" name="regionId">
            <Select {...regionSelectProps} allowClear placeholder="Region" />
          </Form.Item>
        </Col>
        <Col xl={24} md={8} sm={12} xs={24}>
          <Form.Item>
            <Button htmlType="submit" type="primary" size="large" block>
              Filter
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
