<template>
  <div>
    <h1>Beli SparePart</h1>
    <div>
      <div class="card px-4 py-3 mb-4">
        <div class="row g-3">
          <div class="col-md-2">
            <select 
              v-model="categoryFilter"
              class="form-select"
              @change="applyFilters"
            >
              <option value="" disabled hidden>Pilih Kategori</option>
              <option value="">Semua</option>
              <option value="Engine">Engine</option>
              <option value="Brake System">Brake System</option>
              <option value="Air System">Air System</option>
              <option value="Ignition">Ignition</option>
              <option value="Cooling System">Cooling System</option>
            </select>
          </div>
          <div class="col-md-2">
            <select 
              v-model="availabilityFilter"
              class="form-select"
              @change="applyFilters"
            >
              <option value="" disabled hidden>Status Tersedia</option>
              <option value="">Semua</option>
              <option value="">Tersedia</option>
              <option value="">Tidak Tersedia</option>
            </select>
          </div>
          <div class="col-md-7">
            <input 
              v-model="searchQuery"
              type="text" 
              class="form-control" 
              placeholder="Cari part berdasarkan nama, nomor part, atau kategori..."
              @input="handleSearch"
            >
          </div>
          <div class="col-md-1">
            <button class="btn btn-primary w-100" @click="handleSearch">
              Cari
            </button>
          </div>
        </div>
      </div>
    </div>
     <!-- Products Table -->
    <div class="card px-4 py-3">
      <div v-if="loading" class="text-center py-4">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      
      <div v-else>
        <table class="table table-bordered table-hover rounded">
          <thead class="table-light">
            <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <th 
                v-for="header in headerGroup.headers" 
                :key="header.id"
                scope="col"
              >
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in table.getRowModel().rows" :key="row.id">
              <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="d-flex align-items-center justify-content-between mt-3">
          <div class="d-flex align-items-center gap-2">
            <button 
              @click="table.previousPage()" 
              :disabled="!table.getCanPreviousPage()"
              class="btn btn-sm btn-outline-secondary"
            >
              Previous
            </button>
            <button 
              @click="table.nextPage()" 
              :disabled="!table.getCanNextPage()"
              class="btn btn-sm btn-outline-secondary"
            >
              Next
            </button>
          </div>
          
          <span class="text-muted">
            Page {{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }}
          </span>
          
          <select 
            :value="table.getState().pagination.pageSize"
            @change="table.setPageSize(Number($event.target.value))"
            class="form-select form-select-sm"
            style="width: auto;"
          >
            <option :value="10">10 rows</option>
            <option :value="20">20 rows</option>
            <option :value="50">50 rows</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed, h } from 'vue'
  import {
    useVueTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    FlexRender
  } from '@tanstack/vue-table'

  defineOptions({ name: 'Shop' })

  const data = ref([])
  const loading = ref(true)

  const searchInput = ref('')
  const searchQuery = ref('')

  const categoryFilter = ref('') 
  const availabilityFilter = ref('')

  // Define columns for products
  const columns = [
    { accessorKey: 'partNo', header: 'Part No' },
    { accessorKey: 'partName', header: 'Part Name' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'price', header: 'Price', cell: (info) => `Rp ${info.getValue().toLocaleString()}` },
    { accessorKey: 'stock', header: 'Stock' },
    { 
      accessorKey: 'availability', 
      header: 'Status',
      cell: (info) => {
        const available = info.getValue()
        const badgeClass = available ? 'bg-success' : 'bg-danger'
        const text = available ? 'Available' : 'Preorder'
        return h('span', { class: `badge ${badgeClass}` }, text)
      }
    },
    {
      id: 'actions',
      header: 'Action',
      cell: (info) => {
        return h('button', {
          class: 'btn btn-sm btn-primary',
          onClick: () => addToCart(info.row.original)
        }, 'Add to Cart')
      }
    }
  ]

  // Filtered data based on all filters
  const filteredData = computed(() => {
    let result = data.value

    // Text search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(item => 
        item.partName.toLowerCase().includes(query) ||
        item.partNo.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (categoryFilter.value) {
      result = result.filter(item => item.category === categoryFilter.value)
    }

    // Availability filter
    if (availabilityFilter.value) {
      const isAvailable = availabilityFilter.value === 'available'
      result = result.filter(item => item.availability === isAvailable)
    }

    return result
  })

  // Mock data - replace with API call later
  onMounted(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      data.value = Array.from({ length: 50 }, (_, i) => ({
        partNo: `PN-${Math.floor(Math.random() * 9000) + 1000}`,
        partName: ['Engine Oil Filter', 'Brake Pad Set', 'Air Filter', 'Spark Plug', 'Oil Seal', 'Gasket Kit', 'Timing Belt', 'Water Pump'][i % 8],
        category: ['Engine', 'Brake System', 'Air System', 'Ignition', 'Cooling System'][i % 5],
        price: Math.floor(Math.random() * 500000) + 50000,
        stock: Math.floor(Math.random() * 100),
        availability: Math.random() > 0.2
      }))
    } catch (error) {
      console.error('Error:', error)
    } finally {
      loading.value = false
    }
  })

  const table = useVueTable({
    get data() { return filteredData.value },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      get globalFilter() { return searchQuery.value }
    },
    onGlobalFilterChange: (value) => {
      searchQuery.value = value
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  const handleSearch = () => {
    searchQuery.value = searchInput.value
    table.setPageIndex(0)
  }

  const applyFilters = () => {
    table.setPageIndex(0) 
  }

  const addToCart = (product) => {
    console.log('Adding to cart:', product)
    // Implement your add to cart logic here
    alert(`Added ${product.partName} to cart`)
  }
</script>
<style scoped>
  table {
    table-layout: fixed;
    width: 100%;
  }
  th, td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /* prevents wrapping */
  }
</style>