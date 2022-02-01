import axios, { AxiosInstance } from "axios";
import {
  CrudFilters,
  CrudOperators,
  CrudSorting,
  DataProvider,
} from "@pankod/refine";
import * as qs from "qs";

export const axiosInstance = axios.create();

const generateSort = (sort?: CrudSorting) => {
  let _sort = ["id"]; // default sorting field
  let _order = ["desc"]; // default sorting

  if (sort) {
    _sort = [];
    _order = [];

    sort.forEach((item) => {
      _sort.push(item.field);
      _order.push(item.order);
    });
  }

  return {
    _sort,
    _order,
  };
};

const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case "ne":
    case "gte":
    case "lte":
      return `_${operator}`;
    case "contains":
      return "_like";
  }

  return ""; // default "eq"
};

const generateFilter = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {};
  if (filters) {
    filters.forEach(({ field, operator, value }) => {
      const mappedOperator = mapOperator(operator);
      queryFilters[`${field}${mappedOperator}`] = value;
    });
  }

  return queryFilters;
};

const SimpleRestDataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): DataProvider => ({
  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;
    const { data } = await httpClient.post(url, variables);

    return {
      data,
    };
  },
  createMany: async ({ resource, variables }) => {
    const response = await Promise.all(
      variables.map(async (param) => {
        const { data } = await httpClient.post(`${apiUrl}/${resource}`, param);
        return data;
      })
    );

    return { data: response };
  },
  deleteOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await httpClient.delete(url);

    return {
      data,
    };
  },
  deleteMany: async ({ resource, ids }) => {
    const response = await Promise.all(
      ids.map(async (id) => {
        const { data } = await httpClient.delete(`${apiUrl}/${resource}/${id}`);
        return data;
      })
    );
    return { data: response };
  },
  getList: async ({ resource, pagination, filters, sort }) => {
    const url = `${apiUrl}/${resource}`;

    const current = pagination?.current || 1;
    const pageSize = pagination?.pageSize || 10;

    const { _sort, _order } = generateSort(sort);

    const queryFilters = generateFilter(filters);

    const query = {
      skip: (current - 1) * pageSize,
      take: pageSize,
      sort: _sort.join(","),
      order: _order.join(","),
    };

    const { data } = await httpClient.get(
      `${url}?${qs.stringify(query)}&${qs.stringify(queryFilters)}`
    );
    return data;
  },
  getMany: async ({ resource, ids }) => {
    const { data } = await httpClient.get(
      `${apiUrl}/${resource}?${qs.stringify({ id: ids })}`
    );

    return data;
  },
  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.get(url);

    return {
      data,
    };
  },
  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.patch(url, variables);

    return {
      data,
    };
  },
  updateMany: async ({ resource, ids, variables }) => {
    const response = await Promise.all(
      ids.map(async (id) => {
        const { data } = await httpClient.patch(
          `${apiUrl}/${resource}/${id}`,
          variables
        );
        return data;
      })
    );

    return { data: response };
  },
  custom: async ({ url, method, sort, filters, payload, query, headers }) => {
    let requestUrl = `${url}?`;

    if (sort) {
      const { _sort, _order } = generateSort(sort);
      const sortQuery = {
        _sort: _sort.join(","),
        _order: _order.join(","),
      };
      requestUrl = `${requestUrl}&${qs.stringify(sortQuery)}`;
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${qs.stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${qs.stringify(query)}`;
    }

    if (headers) {
      httpClient.defaults.headers = {
        ...httpClient.defaults.headers,
        ...headers,
      };
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](url, payload);
        break;
      case "delete":
        axiosResponse = await httpClient.delete(url);
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl);
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
  getApiUrl: () => apiUrl,
});

export default SimpleRestDataProvider;
