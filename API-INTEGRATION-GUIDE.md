
# Frontend-Backend API Integration Guide
## For Corporate Development Environment

This guide shows you how to connect your frontend (HTML/CSS/JS) with a backend API in a corporate office setting.

---

## 📚 Table of Contents
1. [Basic Concepts](#basic-concepts)
2. [API Communication Flow](#api-communication-flow)
3. [Authentication & Tokens](#authentication--tokens)
4. [Practical Examples](#practical-examples)
5. [Error Handling](#error-handling)
6. [Best Practices](#best-practices)

---

## 🎯 Basic Concepts

### What is an API?
An API (Application Programming Interface) is a set of rules that allows your frontend to talk to the backend.

**Example Flow:**
```
You (Frontend) → "Give me products" → Backend Server → Database → "Here are products" → You
```

### HTTP Methods
| Method | Purpose | Example |
|--------|---------|---------|
| **GET** | Fetch data | Get all products |
| **POST** | Send/Create data | Create new order |
| **PUT** | Update data | Update cart quantity |
| **DELETE** | Remove data | Delete item from cart |

---

## 🔄 API Communication Flow

### 1. **Simple GET Request** (Fetch data)
```javascript
// Frontend asks backend for products
fetch('https://api.company.com/products')
  .then(response => response.json())  // Convert to JSON
  .then(data => console.log(data))    // Use the data
  .catch(error => console.error(error)); // Handle errors
```

**Backend Response (JSON):**
```json
[
  { "id": 1, "name": "Laptop", "price": 999 },
  { "id": 2, "name": "Phone", "price": 599 }
]
```

### 2. **POST Request** (Send data)
```javascript
// Frontend sends user login data to backend
fetch('https://api.company.com/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
})
```

---

## 🔐 Authentication & Tokens

### How Login Works

**Step 1: User sends credentials**
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({
    email: 'user@email.com',
    password: 'password'
  })
});
```

**Step 2: Backend returns token**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "name": "John" }
}
```

**Step 3: Store token & use in future requests**
```javascript
// Save token
localStorage.setItem('authToken', data.token);

// Use token in future requests
const token = localStorage.getItem('authToken');
fetch('/api/cart', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## 💡 Practical Examples from Your E-commerce Site

### Example 1: Display Products (Shop Page)
See: `examples/shop-page-example.html`

**Key Points:**
- Fetch products when page loads
- Display in a grid layout
- Handle loading states
- Show error messages if API fails

### Example 2: User Login (Login Page)
See: `examples/login-page-example.html`

**Key Points:**
- Get email and password from form
- Send to `/api/auth/login`
- Save token to localStorage
- Redirect on success

### Example 3: User Signup (Registration Page)
See: `examples/signup-page-example.html`

**Key Points:**
- Validate password confirmation
- Send to `/api/auth/signup`
- Auto-login after registration
- Show validation errors

### Example 4: Shopping Cart (Cart Page)
See: `examples/cart-page-example.html`

**Key Points:**
- Fetch cart items from backend
- Calculate totals
- Allow quantity updates
- Allow item removal

### Example 5: Checkout (Checkout Page)
See: `examples/checkout-page-example.html`

**Key Points:**
- Collect shipping address
- Collect payment information
- Create order on backend
- Process payment
- Redirect to confirmation

### Example 6: My Orders (Order History)
See: `examples/my-orders-page-example.html`

**Key Points:**
- Fetch user's orders
- Display order list with status
- Link to order details

### Example 7: Order Details
See: `examples/order-details-page-example.html`

**Key Points:**
- Fetch specific order from ID
- Display all order information
- Show tracking if available
- Show shipping address

---

## ⚠️ Error Handling

### Common HTTP Status Codes

| Status Code | Meaning | What to Do |
|-------------|---------|-----------|
| **200** | Success | Use the data |
| **400** | Bad Request | Check your request format |
| **401** | Unauthorized | Ask user to login |
| **403** | Forbidden | User doesn't have permission |
| **404** | Not Found | Resource doesn't exist |
| **500** | Server Error | Show error message, contact support |

### How to Handle Errors

```javascript
async function safeApiCall() {
  try {
    const response = await fetch('/api/products');
    
    // Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('API Error:', error.message);
    // Show error to user
    alert('Failed to load products. Please try again.');
    return null;
  }
}
```

---

## 📋 Best Practices for Corporate Development

### 1. **Centralize API Calls**
All API functions are in `js/api.js`. Use this module in all pages.

```javascript
// Good ✅
const products = await fetchProducts();

// Bad ❌
const response = await fetch('/api/products');
```

### 2. **Check Authentication Before Making Requests**
```javascript
if (!isUserLoggedIn()) {
  window.location.href = '/login.html';
  return;
}
```

### 3. **Use Environment Variables**
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL;
// Different URL for dev, staging, production
```

### 4. **Handle Loading States**
```javascript
// Show loading
submitBtn.disabled = true;
submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';

// Hide loading
submitBtn.disabled = false;
submitBtn.innerHTML = 'Submit';
```

### 5. **Communicate with Backend Team**
- 📄 Ask for API documentation
- 🔑 Get authentication details
- 🌍 Know the correct API URLs
- 📞 Have a contact for API issues

---

## 🏢 In Your First Corporate Job

**Week 1:**
- Meet backend team
- Get API documentation
- Set up local environment
- Understand authentication

**Week 2:**
- Start integrating first API
- Test locally
- Code review with team
- Deploy to staging

**Week 3+:**
- Integrate remaining APIs
- Handle edge cases
- Performance optimization
- Monitor errors

---

## 📁 Files Included

| File | Purpose |
|------|---------|
| `js/api.js` | All API functions (reusable) |
| `examples/shop-page-example.html` | Display products |
| `examples/login-page-example.html` | User login |
| `examples/signup-page-example.html` | User registration |
| `examples/cart-page-example.html` | Shopping cart |
| `examples/checkout-page-example.html` | Order checkout |
| `examples/my-orders-page-example.html` | Order history |
| `examples/order-details-page-example.html` | Order details |

---

## 🎓 Key Takeaways

1. ✅ **Frontend = User Interface** - What users see and interact with
2. ✅ **Backend = Logic & Data** - Server and database
3. ✅ **API = Communication** - How they talk to each other
4. ✅ **Token = Authentication** - Proves user is logged in
5. ✅ **Error Handling = Reliability** - Always handle failures gracefully

---

## 📞 Common Questions

**Q: What if the API is slow?**
- Add loading spinners
- Show skeleton screens
- Cache data locally when possible
- Talk to backend team

**Q: How do I test my integration?**
- Use Postman to test APIs
- Test locally before deploying
- Ask backend for test data
- Check browser console for errors

**Q: What if the API changes?**
- Backend team should notify you
- Update your functions in `api.js`
- Test thoroughly
- Update the version number

---

## 🔗 Resources

- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JSON Guide](https://www.json.org/)
- [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [Postman API Testing](https://www.postman.com/)
- [JWT Authentication](https://jwt.io/)

---

**You're all set! Start integrating your frontend with the backend! 🚀**
