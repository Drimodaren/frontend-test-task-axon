import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../store/hooks'
import { updateProductType, deleteProductType } from '../../store/productTypesSlice'
import { ProductTypeService } from '../../services/ProductTypeService'
import { PackageType } from '../../types/ProductType'
import type { ProductType, UpdateProductTypeData } from '../../types/ProductType'
import {
  Button,
  FormField,
  Input,
  Select,
  Checkbox,
  ConfirmModal,
  Loading,
  ErrorMessage,
} from '../../components'
import './EditPage.css'

const EditPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [productType, setProductType] = useState<ProductType | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProductTypeData>()

  useEffect(() => {
    const loadProductType = async () => {
      if (!id) return

      try {
        const product = await ProductTypeService.getProductTypeById(id)
        setProductType(product)

        setValue('packsNumber', product.packsNumber)
        setValue('packageType', product.packageType)
        setValue('isArchived', product.isArchived)
        setValue('description', product.description || '')
      } catch (error) {
        console.error('Failed to load product type:', error)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    loadProductType()
  }, [id, setValue, navigate])

  const onSubmit = async (data: UpdateProductTypeData) => {
    if (!id) return

    try {
      await dispatch(updateProductType({ id, data })).unwrap()
      navigate('/')
    } catch (error) {
      console.error('Failed to update product type:', error)
    }
  }

  const handleDelete = async () => {
    if (!id) return

    try {
      await dispatch(deleteProductType(id)).unwrap()
      navigate('/')
    } catch (error) {
      console.error('Failed to delete product type:', error)
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className="product-form-page">
        <Loading />
      </div>
    )
  }

  if (!productType) {
    return (
      <div className="product-form-page">
        <ErrorMessage message="Тип продукции не найден" />
      </div>
    )
  }

  return (
    <div className="product-form-page">
      <div className="form-container">
        <h1>Редактирование типа продукции</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="product-form">
          <FormField label="Кол-во пачек" required error={errors.packsNumber?.message}>
            <Input
              id="packsNumber"
              type="number"
              placeholder="123"
              {...register('packsNumber', {
                required: 'Это поле обязательно',
                min: { value: 1, message: 'Значение должно быть больше 0' },
              })}
            />
          </FormField>

          <FormField label="Тип упаковки" required error={errors.packageType?.message}>
            <Select
              id="packageType"
              {...register('packageType', { required: 'Это поле обязательно' })}
            >
              <option value="">Выберите тип</option>
              <option value={PackageType.COMPRESSION}>{PackageType.COMPRESSION}</option>
              <option value={PackageType.NON_COMPRESSION}>{PackageType.NON_COMPRESSION}</option>
            </Select>
          </FormField>

          <Checkbox label="Архивировано" {...register('isArchived')} />

          <FormField label="Описание">
            <Input
              variant="textarea"
              id="description"
              placeholder="Описание продукции&#10;В несколько строк"
              rows={4}
              {...register('description')}
            />
          </FormField>

          <div className="form-actions">
            <Button type="button" variant="danger" onClick={() => setShowDeleteModal(true)}>
              Удалить
            </Button>
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Отмена
            </Button>
            <Button type="submit" variant="primary">
              Сохранить
            </Button>
          </div>
        </form>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Подтверждение удаления"
        message="Вы уверены, что хотите удалить этот тип продукции?"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  )
}

export default EditPage
