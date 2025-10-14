<!-- vậy globalThis như một môi trường mà ở đó giả lập đuọc việc fetch api? Vjaya muốn kiểm tra Post hoặc Put api thì sao -->

Đúng rồi! `globalThis` giống như **môi trường ảo** để giả lập các API calls. Còn về POST/PUT API, bạn hoàn toàn có thể test được! Để tôi giải thích:

## **`globalThis` - Môi Trường Giả Lập**

```tsx
// globalThis = "Thế giới ảo" cho testing
beforeAll(() => {
  globalThis.fetch = jest.fn() // Giả lập fetch API
  globalThis.localStorage = mockLocalStorage // Giả lập localStorage
  globalThis.console.log = jest.fn() // Giả lập console
})
```

**Hiểu đơn giản:** `globalThis` như **studio phim** - mọi thứ đều giả lập nhưng trông như thật!

## **Test POST API:**

### **Component với POST:**
```tsx
// UserForm.tsx
const UserForm = () => {
  const handleSubmit = async (userData) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    
    if (response.ok) {
      alert('User created!')
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" />
      <button type="submit">Create User</button>
    </form>
  )
}
```

### **Test POST:**
```tsx
test('should create user via POST API', async () => {
  const user = userEvent.setup()
  
  // Mock POST response
  (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    status: 201,
    json: async () => ({ id: 1, name: 'John Doe' })
  })
  
  render(<UserForm />)
  
  // Điền form
  await user.type(screen.getByPlaceholderText('Name'), 'John Doe')
  await user.click(screen.getByText('Create User'))
  
  // Kiểm tra POST call
  expect(globalThis.fetch).toHaveBeenCalledWith('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'John Doe' })
  })
  
  expect(globalThis.fetch).toHaveBeenCalledTimes(1)
})
```

## **Test PUT API:**

### **Component với PUT:**
```tsx
// EditUser.tsx
const EditUser = ({ userId }) => {
  const handleUpdate = async (userData) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    
    if (response.ok) {
      alert('User updated!')
    }
  }
  
  // Component logic...
}
```

### **Test PUT:**
```tsx
test('should update user via PUT API', async () => {
  const user = userEvent.setup()
  
  // Mock PUT response
  (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => ({ id: 1, name: 'John Updated' })
  })
  
  render(<EditUser userId={1} />)
  
  // User interactions...
  await user.clear(screen.getByDisplayValue('John'))
  await user.type(screen.getByDisplayValue(''), 'John Updated')
  await user.click(screen.getByText('Update User'))
  
  // Kiểm tra PUT call
  expect(globalThis.fetch).toHaveBeenCalledWith('/api/users/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'John Updated' })
  })
})
```

## **Test DELETE API:**

```tsx
test('should delete user via DELETE API', async () => {
  const user = userEvent.setup()
  
  // Mock DELETE response
  (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    status: 204
  })
  
  render(<UserList />)
  
  await user.click(screen.getByText('Delete User'))
  
  // Kiểm tra DELETE call
  expect(globalThis.fetch).toHaveBeenCalledWith('/api/users/1', {
    method: 'DELETE'
  })
})
```

## **Test Error Scenarios:**

### **Test Failed POST:**
```tsx
test('should handle POST error', async () => {
  // Mock failed response
  (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status: 400,
    json: async () => ({ error: 'Invalid data' })
  })
  
  render(<UserForm />)
  
  // Submit form...
  
  // Kiểm tra error handling
  expect(screen.getByText('Error: Invalid data')).toBeInTheDocument()
})
```

### **Test Network Error:**
```tsx
test('should handle network error', async () => {
  // Mock network failure
  (globalThis.fetch as jest.Mock).mockRejectedValueOnce(
    new Error('Network error')
  )
  
  render(<UserForm />)
  
  // Submit form...
  
  expect(screen.getByText('Network error occurred')).toBeInTheDocument()
})
```

## **Advanced: Multiple API Calls:**

```tsx
test('should handle multiple API calls', async () => {
  // Mock multiple responses in order
  (globalThis.fetch as jest.Mock)
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ users: [] }) // GET users
    })
    .mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => ({ id: 1, name: 'John' }) // POST new user
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ users: [{ id: 1, name: 'John' }] }) // GET updated users
    })
  
  render(<UserManager />)
  
  // Component sẽ gọi các API theo thứ tự
  // 1. GET /api/users (load initial data)
  // 2. POST /api/users (create new user)  
  // 3. GET /api/users (refresh data)
  
  expect(globalThis.fetch).toHaveBeenCalledTimes(3)
})
```

## **Kết Luận:**

- **`globalThis.fetch`** = Giả lập **TẤT CẢ** HTTP methods (GET, POST, PUT, DELETE, PATCH...)
- **Method testing** = Kiểm tra `method`, `headers`, `body` trong fetch call
- **Response mocking** = Giả lập success/error responses  
- **Error testing** = Test network errors, HTTP errors, validation errors
- **Multiple calls** = Test sequence của nhiều API calls

**Hiểu đơn giản:** `globalThis.fetch` như **diễn viên đóng thế** - có thể đóng vai bất kỳ API nào (GET, POST, PUT, DELETE) mà component cần!