import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Row,
  Col,
  Badge,
} from 'reactstrap';
import { getConfig, getBackendUrl, getBackendBaseUrl, debug } from '../../config/config';

const ConfigManager = () => {
  const [config, setConfig] = useState(getConfig());
  const [isEditing, setIsEditing] = useState(false);
  const [tempConfig, setTempConfig] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTempConfig({
      baseUrl: config.api.NODE_SERVER.BASE_URL,
      apiBaseUrl: config.api.NODE_SERVER.API_BASE_URL,
    });
  }, [config]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempConfig(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // In a real application, you might want to save this to localStorage or a config file
    // For now, we'll just update the current session
    setMessage('Configuration updated! (Note: Changes are temporary in this demo)');
    setIsEditing(false);
    
    // Log the change for debugging
    debug('Configuration updated', tempConfig);
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancel = () => {
    setTempConfig({
      baseUrl: config.api.NODE_SERVER.BASE_URL,
      apiBaseUrl: config.api.NODE_SERVER.API_BASE_URL,
    });
    setIsEditing(false);
    setMessage('');
  };

  const handleTestConnection = async () => {
    try {
      setMessage('Testing connection...');
      const response = await fetch(getBackendBaseUrl());
      if (response.ok) {
        setMessage('✅ Connection successful!');
      } else {
        setMessage('❌ Connection failed - Server responded with error');
      }
    } catch (error) {
      setMessage(`❌ Connection failed - ${error.message}`);
    }
    
    setTimeout(() => setMessage(''), 5000);
  };

  // Only show in development mode
  if (!config.features.enableDebugMode) {
    return null;
  }

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle className="d-flex justify-content-between align-items-center">
          <span>🔧 Configuration Manager</span>
          <Badge color="info">Development Mode</Badge>
        </CardTitle>
        
        {message && (
          <Alert color={message.includes('✅') ? 'success' : message.includes('❌') ? 'danger' : 'info'} className="mb-3">
            {message}
          </Alert>
        )}

        <Row>
          <Col md={6}>
            <h6>Current Configuration</h6>
            <div className="mb-3">
              <strong>Environment:</strong> {process.env.NODE_ENV || 'development'}
            </div>
            <div className="mb-3">
              <strong>Base URL:</strong> {getBackendBaseUrl()}
            </div>
            <div className="mb-3">
              <strong>API Base URL:</strong> {getBackendUrl()}
            </div>
            <div className="mb-3">
              <strong>Debug Mode:</strong> {config.features.enableDebugMode ? 'Enabled' : 'Disabled'}
            </div>
          </Col>
          
          <Col md={6}>
            <h6>Quick Actions</h6>
            <div className="d-grid gap-2">
              <Button 
                color="primary" 
                size="sm"
                onClick={handleTestConnection}
              >
                Test Connection
              </Button>
              <Button 
                color="secondary" 
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel Edit' : 'Edit Configuration'}
              </Button>
            </div>
          </Col>
        </Row>

        {isEditing && (
          <div className="mt-4">
            <h6>Edit Configuration</h6>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="baseUrl">Base URL</Label>
                    <Input
                      type="url"
                      name="baseUrl"
                      id="baseUrl"
                      value={tempConfig.baseUrl || ''}
                      onChange={handleInputChange}
                      placeholder="http://localhost:5000"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="apiBaseUrl">API Base URL</Label>
                    <Input
                      type="url"
                      name="apiBaseUrl"
                      id="apiBaseUrl"
                      value={tempConfig.apiBaseUrl || ''}
                      onChange={handleInputChange}
                      placeholder="http://localhost:5000/api"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="d-flex gap-2">
                <Button color="success" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        )}

        <div className="mt-3">
          <small className="text-muted">
            💡 Tip: To permanently change the backend URL, edit the environment configuration in{' '}
            <code>src/config/environment.js</code>
          </small>
        </div>
      </CardBody>
    </Card>
  );
};

export default ConfigManager; 