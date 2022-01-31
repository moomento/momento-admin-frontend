export interface IScope {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IScopeFilterVariables {
  q: string;
}

export interface IRegion {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IRegionFilterVariables {
  q: string;
}


export interface ICollection {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface ICollectionFilterVariables {
  q: string;
}

export interface ICategory {
  id: string;
  name: string;
  content: string;
  scope?: IScope;
  scopeId?: number;
  region?: IRegion;
  reginId?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface ICategoryFilterVariables {
  q: string;
  scopeId?: number;
  regionId?: number;
}