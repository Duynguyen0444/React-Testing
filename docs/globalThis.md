<!-- vậy ngoài globalThis.fetch còn globalThis chấm gì nữa  -->
`globalThis` có rất nhiều thuộc tính và methods! Đây là các thuộc tính phổ biến:

## **Standard Global Objects:**

### **Constructors:**
```tsx
globalThis.Object
globalThis.Array
globalThis.String
globalThis.Number
globalThis.Boolean
globalThis.Date
globalThis.RegExp
globalThis.Error
globalThis.Promise
globalThis.Map
globalThis.Set
globalThis.WeakMap
globalThis.WeakSet
```

### **Functions:**
```tsx
globalThis.parseInt
globalThis.parseFloat
globalThis.isNaN
globalThis.isFinite
globalThis.encodeURI
globalThis.decodeURI
globalThis.encodeURIComponent
globalThis.decodeURIComponent
globalThis.eval
```

### **Console & Timers:**
```tsx
globalThis.console
globalThis.setTimeout
globalThis.setInterval
globalThis.clearTimeout
globalThis.clearInterval
globalThis.setImmediate (Node.js)
globalThis.clearImmediate (Node.js)
```

## **Web APIs (Browser Environment):**

### **DOM & Window:**
```tsx
globalThis.window
globalThis.document
globalThis.navigator
globalThis.location
globalThis.history
globalThis.screen
```

### **Storage:**
```tsx
globalThis.localStorage
globalThis.sessionStorage
globalThis.indexedDB
```

### **Network:**
```tsx
globalThis.fetch          // ← Cái bạn đang dùng
globalThis.XMLHttpRequest
globalThis.WebSocket
globalThis.EventSource
```

### **Crypto & Random:**
```tsx
globalThis.crypto
globalThis.Math.random
```

## **Node.js Specific:**

```tsx
globalThis.global    // Node.js global object
globalThis.process   // Node.js process
globalThis.Buffer    // Node.js Buffer
globalThis.require   // Node.js require function
globalThis.__dirname
globalThis.__filename
```

## **Testing Environment (Jest):**

Trong Jest environment, bạn có thể mock nhiều thứ khác:

```tsx
beforeAll(() => {
  // Network
  globalThis.fetch = jest.fn()
  globalThis.XMLHttpRequest = jest.fn()
  
  // Storage
  globalThis.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  }
  
  // Console (như trong code của bạn)
  globalThis.console.log = jest.fn()
  globalThis.console.error = jest.fn()
  globalThis.console.warn = jest.fn()
  
  // Timers
  globalThis.setTimeout = jest.fn()
  globalThis.setInterval = jest.fn()
  
  // Location/Navigation
  globalThis.location = {
    href: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: ''
  }
  
  // Crypto
  globalThis.crypto = {
    randomUUID: jest.fn(() => 'mock-uuid')
  }
})
```

## **Practical Examples:**

### **Mock localStorage:**
```tsx
beforeAll(() => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }
  globalThis.localStorage = localStorageMock as any
})

// Trong test
test('should save to localStorage', () => {
  (localStorage.setItem as jest.Mock).mockImplementation(() => {})
  
  // Test code...
  
  expect(localStorage.setItem).toHaveBeenCalledWith('key', 'value')
})
```

### **Mock window.location:**
```tsx
beforeAll(() => {
  globalThis.location = {
    ...globalThis.location,
    assign: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn()
  }
})
```

### **Mock crypto:**
```tsx
beforeAll(() => {
  globalThis.crypto = {
    ...globalThis.crypto,
    randomUUID: jest.fn(() => 'test-uuid-123')
  }
})
```

## **Check Available Properties:**

Bạn có thể xem tất cả properties của `globalThis`:

```tsx
console.log(Object.keys(globalThis))
console.log(Object.getOwnPropertyNames(globalThis))
```

## **Environment Differences:**

```tsx
// Browser
globalThis === window // true

// Node.js  
globalThis === global // true

// Web Worker
globalThis === self // true
```

**Kết luận:** `globalThis` chứa hầu hết mọi thứ global trong JavaScript environment. Trong testing, bạn có thể mock bất kỳ thuộc tính nào để control behavior trong tests!