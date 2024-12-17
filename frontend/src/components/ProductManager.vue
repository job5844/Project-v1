<template>
    <div class="product-manager">
      <div class="header">
        <h2>จัดการสินค้า</h2>
        <button class="btn-add" @click="openAddModal">เพิ่มสินค้า</button>
      </div>
      
  
      <table class="product-table">
        <thead>
          <tr>
            <th>รหัสสินค้า</th>
            <th>ชื่อสินค้า</th>
            <th>ต้นทุน</th>
            <th>ราคาขาย</th>
            <th>คงเหลือ</th>
            <th>ประเภทสินค้า</th>
            <th>การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.proId">
            <td>{{ product.proId }}</td>
            <td>{{ product.proName }}</td>
            <td>{{ product.proCost }}</td>
            <td>{{ product.proPrice }}</td>
            <td>{{ product.proStock }}</td>
            <td>{{ product.category.categoryName }}</td>
            <td>
              <button class="btn-edit" @click="openEditModal(product)">แก้ไข</button>
              <button class="btn-delete" @click="openDeleteModal(product)">ลบ</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Add/Edit Modal -->
      <div class="modal" v-if="showModal">
        <div class="modal-content">
          <h3>{{ isEditing ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า' }}</h3>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label>รหัสสินค้า</label>
              <input v-model="formData.proId" required :disabled="isEditing">
            </div>
            <div class="form-group">
              <label>ชื่อสินค้า</label>
              <input v-model="formData.proName" required>
            </div>
            <div class="form-group">
              <label>ต้นทุน</label>
              <input type="number" v-model="formData.proCost" required>
            </div>
            <div class="form-group">
              <label>ราคาขาย</label>
              <input type="number" v-model="formData.proPrice" required>
            </div>
            <div class="form-group">
              <label>คงเหลือ</label>
              <input type="number" v-model="formData.proStock" required>
            </div>
            <div class="form-group">
              <label>ประเภทสินค้า</label>
              <select v-model="formData.categoryId" required>
                <option v-for="category in categories" 
                        :key="category.categoryId" 
                        :value="category.categoryId">
                  {{ category.categoryName }}
                </option>
              </select>
            </div>
            <div class="modal-buttons">
              <button type="submit" class="btn-submit">
                {{ isEditing ? 'บันทึก' : 'เพิ่ม' }}
              </button>
              <button type="button" class="btn-cancel" @click="closeModal">
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Delete Confirmation Modal -->
      <div class="modal" v-if="showDeleteModal">
        <div class="modal-content">
          <h3>ยืนยันการลบ</h3>
          <p>คุณต้องการลบสินค้า "{{ selectedProduct?.proName }}" ใช่หรือไม่?</p>
          <div class="modal-buttons">
            <button class="btn-delete" @click="handleDelete">ลบ</button>
            <button class="btn-cancel" @click="closeDeleteModal">ยกเลิก</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductManager',
    data() {
      return {
        products: [],
        categories: [],
        showModal: false,
        showDeleteModal: false,
        isEditing: false,
        selectedProduct: null,
        formData: {
          proId: '',
          proName: '',
          proCost: '',
          proPrice: '',
          proStock: '',
          categoryId: ''
        }
      }
    },
    async created() {
      await this.fetchProducts();
      await this.fetchCategories();
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await fetch('http://localhost:3000/products');
          this.products = await response.json();
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },
      async fetchCategories() {
        try {
          const response = await fetch('http://localhost:3000/categories');
          this.categories = await response.json();
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },
      openAddModal() {
        this.isEditing = false;
        this.formData = {
          proId: '',
          proName: '',
          proCost: '',
          proPrice: '',
          proStock: '',
          categoryId: ''
        };
        this.showModal = true;
      },
      openEditModal(product) {
        this.isEditing = true;
        this.formData = { ...product };
        this.showModal = true;
      },
      openDeleteModal(product) {
        this.selectedProduct = product;
        this.showDeleteModal = true;
      },
      closeModal() {
        this.showModal = false;
        this.formData = {
          proId: '',
          proName: '',
          proCost: '',
          proPrice: '',
          proStock: '',
          categoryId: ''
        };
      },
      closeDeleteModal() {
        this.showDeleteModal = false;
        this.selectedProduct = null;
      },
      async handleSubmit() {
        try {
          const url = this.isEditing 
            ? `http://localhost:3000/products/${this.formData.proId}`
            : 'http://localhost:3000/products';
          
          const response = await fetch(url, {
            method: this.isEditing ? 'PUT' : 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.formData)
          });
  
          if (!response.ok) {
            throw new Error('Failed to save product');
          }
  
          await this.fetchProducts();
          this.closeModal();
        } catch (error) {
          console.error('Error saving product:', error);
        }
      },
      async handleDelete() {
        try {
          const response = await fetch(`http://localhost:3000/products/${this.selectedProduct.proId}`, {
            method: 'DELETE'
          });
  
          if (!response.ok) {
            throw new Error('Failed to delete product');
          }
  
          await this.fetchProducts();
          this.closeDeleteModal();
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .product-manager {
    padding: 20px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .product-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .product-table th,
  .product-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .product-table th {
    background-color: #f4f4f4;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
  
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-add {
    background-color: #4CAF50;
    color: white;
  }
  
  .btn-edit {
    background-color: #2196F3;
    color: white;
  }
  
  .btn-delete {
    background-color: #f44336;
    color: white;
  }
  
  .btn-cancel {
    background-color: #9e9e9e;
    color: white;
  }
  
  .btn-submit {
    background-color: #4CAF50;
    color: white;
  }
  </style>