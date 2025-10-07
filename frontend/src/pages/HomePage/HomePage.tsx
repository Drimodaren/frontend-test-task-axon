import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiInfo, FiEdit3, FiTrash2 } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchProductTypes, deleteProductType } from '../../store/productTypesSlice'
import { Button, ConfirmModal, Loading, ErrorMessage } from '../../components'
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { items: productTypes, loading, error } = useAppSelector(state => state.productTypes)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchProductTypes())
  }, [dispatch])

  useEffect(() => {
    const handleFocus = () => {
      dispatch(fetchProductTypes())
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [dispatch])

  const handleCreateNew = () => {
    navigate('/create')
  }

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`)
  }

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteProductType(id)).unwrap()
      setShowDeleteModal(null)
    } catch (error) {
      console.error('Failed to delete product type:', error)
    }
  }

  const sortedProductTypes = [...productTypes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <div className="home-page">
      <div className="header">
        <h1>Список выпускаемой продукции</h1>
        <Button variant="primary" onClick={handleCreateNew}>
          Создать тип продукции
        </Button>
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Кол-во пачек</th>
              <th>Тип упаковки</th>
              <th>Дата создания</th>
              <th>Статус</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedProductTypes.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.packsNumber}</td>
                <td>{product.packageType}</td>
                <td>{formatDate(product.createdAt)}</td>
                <td>
                  <span className={`status ${product.isArchived ? 'archived' : 'active'}`}>
                    {product.isArchived ? 'Архив' : 'Активно'}
                  </span>
                </td>
                <td className="actions">
                  <div className="action-buttons">
                    <Button
                      variant="icon"
                      iconVariant="info"
                      onMouseEnter={() => setShowTooltip(product.id)}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      <FiInfo />
                      {showTooltip === product.id && product.description && (
                        <div className="tooltip">{product.description}</div>
                      )}
                    </Button>
                    <Button
                      variant="icon"
                      iconVariant="edit"
                      onClick={() => handleEdit(product.id)}
                    >
                      <FiEdit3 />
                    </Button>
                    <Button
                      variant="icon"
                      iconVariant="delete"
                      onClick={() => setShowDeleteModal(product.id)}
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!showDeleteModal}
        title="Подтверждение удаления"
        message="Вы уверены, что хотите удалить этот тип продукции?"
        onConfirm={() => showDeleteModal && handleDelete(showDeleteModal)}
        onCancel={() => setShowDeleteModal(null)}
      />
    </div>
  )
}

export default HomePage
