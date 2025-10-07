import { PackageType, type ProductType } from '../types/ProductType'

export const mockProductTypes: ProductType[] = [
  {
    id: 'KatJDS1',
    packsNumber: 24,
    packageType: PackageType.COMPRESSION,
    isArchived: true,
    description: 'Описание продукции\nВ несколько строк',
    createdAt: '2024-02-01T16:08:24.630Z',
  },
  {
    id: '2Pj88FE',
    packsNumber: 12,
    packageType: PackageType.NON_COMPRESSION,
    isArchived: false,
    createdAt: '2024-01-25T16:08:24.630Z',
  },
  {
    id: '3s-oN_s',
    packsNumber: 20,
    packageType: PackageType.COMPRESSION,
    isArchived: false,
    description: 'Тестовая продукция для демонстрации',
    createdAt: '2024-01-23T16:08:24.630Z',
  },
  {
    id: '1Ce9CMg',
    packsNumber: 114,
    packageType: PackageType.COMPRESSION,
    isArchived: false,
    description: 'Демо данные для GitHub Pages',
    createdAt: '2025-10-07T19:58:34.772Z',
  },
  {
    id: 'ebp6nIa',
    packsNumber: 222,
    packageType: PackageType.COMPRESSION,
    isArchived: true,
    description: 'Архивированная продукция',
    createdAt: '2025-10-07T19:58:44.561Z',
  },
]
