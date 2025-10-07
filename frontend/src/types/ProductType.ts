export enum PackageType {
  COMPRESSION = 'компрессия',
  NON_COMPRESSION = 'некомпрессия',
}

export interface ProductType {
  id: string
  packsNumber: number
  packageType: PackageType
  isArchived: boolean
  description?: string
  createdAt: string
}

export interface CreateProductTypeData {
  packsNumber: number
  packageType: PackageType
  isArchived: boolean
  description?: string
}

export interface CreateProductFormData {
  packsNumber?: number
  packageType?: PackageType
  isArchived: boolean
  description?: string
}

export type UpdateProductTypeData = Partial<CreateProductTypeData>
