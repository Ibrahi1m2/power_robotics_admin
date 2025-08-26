import React, { useState, useEffect } from "react"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Badge,
  Alert,
} from "reactstrap"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../helpers/nodeAuth_helper"
import API_CONFIG from "../../config/api.config"

const Products = props => {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image_url: "",
    stock: "",
  })
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const breadcrumbItems = [
    { title: "Power Robotics", link: "#" },
    { title: "Products", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Products", breadcrumbItems)
    fetchProducts()
    // Get search term from localStorage
    const savedSearchTerm = localStorage.getItem('productSearchTerm') || ""
    setSearchTerm(savedSearchTerm)
  }, [])

  // Listen for search term changes from header
  useEffect(() => {
    const handleStorageChange = () => {
      const savedSearchTerm = localStorage.getItem('productSearchTerm') || ""
      setSearchTerm(savedSearchTerm)
    }

    const handleSearchTermChanged = (event) => {
      setSearchTerm(event.detail)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('searchTermChanged', handleSearchTermChanged)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('searchTermChanged', handleSearchTermChanged)
    }
  }, [])

  // Also check for localStorage changes on focus (for same-tab updates)
  useEffect(() => {
    const handleFocus = () => {
      const savedSearchTerm = localStorage.getItem('productSearchTerm') || ""
      if (savedSearchTerm !== searchTerm) {
        setSearchTerm(savedSearchTerm)
      }
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [searchTerm])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      console.log("Fetching products")
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      setError(error.message || 'Failed to load products. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        image_url: formData.image_url,
        stock: parseInt(formData.stock),
      }
      if (editingId) {
        await updateProduct(editingId, productData)
      } else {
        console.log("Create")
        await createProduct(productData)
      }
      await fetchProducts()
      setFormData({
        name: "",
        price: "",
        image_url: "",
        stock: "",
      })
      setEditingId(null)
    } catch (error) {
      setError(error.message || 'Failed to save product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      stock: product.stock,
    })
    setEditingId(product.id)
  }

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      await deleteProduct(id)
      await fetchProducts()
    } catch (error) {
      setError(error.message || 'Failed to delete product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    localStorage.setItem('productSearchTerm', value)
  }

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name && 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Check authentication
  const isAuthenticated = !!localStorage.getItem(API_CONFIG.AUTH.TOKEN_KEY);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {error && (
            <Alert color="danger" className="mb-4">
              {error}
              <Button
                close
                className="float-end"
                onClick={() => setError(null)}
              />
            </Alert>
          )}

          {!isAuthenticated ? (
            <Alert color="warning" className="mb-4 text-center">
              You must be logged in to add or edit products.<br/>
              <Button color="primary" onClick={() => window.location.href = '/login'}>
                Go to Login
              </Button>
            </Alert>
          ) : (
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h4>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="name">Product Name</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="price">Price</Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="image_url">Image URL</Label>
                          <Input
                            type="url"
                            className="form-control"
                            id="image_url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="stock">Stock</Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="stock"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="text-end">
                      <Button type="submit" color="primary" disabled={loading}>
                        {loading ? 'Saving...' : (editingId ? 'Update Product' : 'Add Product')}
                      </Button>
                      {editingId && (
                        <Button 
                          color="secondary" 
                          className="ms-2"
                          disabled={loading}
                          onClick={() => {
                            setEditingId(null)
                            setFormData({
                              name: "",
                              price: "",
                              image_url: "",
                              stock: "",
                            })
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          )}

          {/* Products List Header */}
          <Row className="mt-4 mb-4">
            <Col lg={12}>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Products ({filteredProducts.length})</h5>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            {filteredProducts.map(product => (
              <Col md={4} key={product.id} className="mb-4">
                <Card>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <CardBody>
                    <h5>{product.name}</h5>
                    <p className="mb-1">Stock: {product.stock}</p>
                    <h6 className="mb-3">₹{product.price}</h6>
                    <div className="d-flex gap-2">
                      <Button color="primary" onClick={() => handleEdit(product)}>
                        Edit
                      </Button>
                      <Button color="danger" onClick={() => handleDelete(product.id)}>
                        Delete
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Products) 