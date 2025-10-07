import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { createProductType } from '../../store/productTypesSlice'
import { PackageType } from '../../types/ProductType'
import type { CreateProductTypeData, CreateProductFormData } from '../../types/ProductType'
import { Button, FormField, Input, Select, Checkbox } from '../../components'
import './CreatePage.css'

const CreatePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    defaultValues: {
      packsNumber: undefined,
      packageType: undefined,
      isArchived: false,
      description: '',
    },
  })

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      const apiData: CreateProductTypeData = {
        packsNumber: data.packsNumber!,
        packageType: data.packageType!,
        isArchived: data.isArchived,
        description: data.description,
      }

      await dispatch(createProductType(apiData))
      navigate('/')
    } catch (error) {
      console.error('Failed to create product type:', error)
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className="product-form-page">
      <div className="form-container">
        <h1>Создание типа продукции</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="product-form">
          <FormField label="Кол-во пачек" required error={errors.packsNumber?.message}>
            <Input
              id="packsNumber"
              type="number"
              placeholder="123"
              min="1"
              {...register('packsNumber', {
                required: 'Это поле обязательно',
                min: { value: 1, message: 'Значение должно быть больше 0' },
                valueAsNumber: true,
                validate: value => (value && value > 0) || 'Значение должно быть больше 0',
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
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Отмена
            </Button>
            <Button type="submit" variant="primary">
              Создать
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePage
