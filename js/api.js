/**
 * API Integration Module
 * This file handles all communication between frontend and backend
 * 
 * In a corporate office:
 * - Backend team provides the API_BASE_URL
 * - You use these functions to fetch/send data
 * - Different URLs for dev, staging, and production environments
 */

// Configuration - This would come from environment variables in production
const API_CONFIG = {
  // Development (local testing)
  development: 'http://localhost:3000/api',
  
  // Staging (testing environment)
  staging: 'https://api-staging.company.com/api',
  
  // Production (live website)
  production: 'https://api.company.com/api'
};

// Get the correct API URL based on environment
const getAPIUrl = () => {
  const env = process.env.NODE_ENV || 'development';
  return API_CONFIG[env];
};

const API_BASE_URL = getAPIUrl();

/**
 * ============================================
 * 1. FETCH PRODUCTS (For Shop Page)
 * ============================================
 */
async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products = await response.json();
    return products;
    
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * ============================================
 * 2. FETCH SINGLE PRODUCT (For Product Detail Page)
 * ============================================
 */
async function fetchProductById(productId) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    
    if (!response.ok) {
      throw new Error(`Product not found`);
    }
    
    const product = await response.json();
    return product;
    
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    return null;
  }
}

/**
 * ============================================
 * 3. USER LOGIN (For Login Page)
 * ============================================
 */
async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const data = await response.json();
    
    // Save token to localStorage for future requests
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return data;
    
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

/**
 * ============================================
 * 4. USER SIGNUP (For Registration Page)
 * ============================================
 */
async function signupUser(name, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });
    
    if (!response.ok) {
      throw new Error('Signup failed');
    }
    
    const data = await response.json();
    
    // Auto login after signup
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return data;
    
  } catch (error) {
    console.error('Signup error:', error);
    return null;
  }
}

/**
 * ============================================
 * 5. CREATE ORDER (For Checkout Page)
 * ============================================
 */
async function createOrder(orderData) {
  try {
    // Get the saved token from login
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Send token for authentication
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      throw new Error('Order creation failed');
    }
    
    const order = await response.json();
    return order;
    
  } catch (error) {
    console.error('Order error:', error);
    return null;
  }
}

/**
 * ============================================
 * 6. ADD TO CART (For Product Pages)
 * ============================================
 */
async function addToCart(productId, quantity) {
  try {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }
    
    const cart = await response.json();
    return cart;
    
  } catch (error) {
    console.error('Add to cart error:', error);
    return null;
  }
}

/**
 * ============================================
 * 7. FETCH CART (For Cart Page)
 * ============================================
 */
async function fetchCart() {
  try {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    
    const cart = await response.json();
    return cart;
    
  } catch (error) {
    console.error('Fetch cart error:', error);
    return null;
  }
}

/**
 * ============================================
 * 8. REMOVE FROM CART
 * ============================================
 */
async function removeFromCart(productId) {
  try {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove from cart');
    }
    
    const cart = await response.json();
    return cart;
    
  } catch (error) {
    console.error('Remove from cart error:', error);
    return null;
  }
}

/**
 * ============================================
 * 9. UPDATE CART QUANTITY
 * ============================================
 */
async function updateCartQuantity(productId, quantity) {
  try {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ quantity: quantity })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update cart');
    }
    
    const cart = await response.json();
    return cart;
    
  } catch (error) {
    console.error('Update cart error:', error);
    return null;
  }
}

/**
 * ============================================
 * 10. PROCESS PAYMENT (For Checkout Page)
 * ============================================
 */
async function processPayment(paymentData) {
  try {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(paymentData)
    });
    
    if (!response.ok) {
      throw new Error('Payment failed');
    }
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error('Payment error:', error);
    return null;
  }
}

/**
 * ============================================
 * 11. FETCH USER ORDERS (For My Orders Page)
 * ============================================
 */
async function fetchUserOrders() {
  try {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    
    const orders = await response.json();
    return orders;
    
  } catch (error) {
    console.error('Fetch orders error:', error);
    return null;
  }
}

/**
 * ============================================
 * 12. FETCH SINGLE ORDER DETAILS
 * ============================================
 */
async function fetchOrderDetails(orderId) {
  try {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch order details');
    }
    
    const order = await response.json();
    return order;
    
  } catch (error) {
    console.error('Fetch order details error:', error);
    return null;
  }
}

/**
 * ============================================
 * 13. FETCH USER PROFILE
 * ============================================
 */
async function fetchUserProfile() {
  try {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    
    const profile = await response.json();
    return profile;
    
  } catch (error) {
    console.error('Fetch profile error:', error);
    return null;
  }
}

/**
 * ============================================
 * 14. UPDATE USER PROFILE
 * ============================================
 */
async function updateUserProfile(profileData) {
  try {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    
    const updated = await response.json();
    return updated;
    
  } catch (error) {
    console.error('Update profile error:', error);
    return null;
  }
}

/**
 * ============================================
 * 15. LOGOUT USER
 * ============================================
 */
function logoutUser() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  console.log('User logged out');
}

/**
 * ============================================
 * 16. CHECK IF USER IS LOGGED IN
 * ============================================
 */
function isUserLoggedIn() {
  const token = localStorage.getItem('authToken');
  return !!token;
}

/**
 * ============================================
 * 17. GET LOGGED IN USER
 * ============================================
 */
function getLoggedInUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}