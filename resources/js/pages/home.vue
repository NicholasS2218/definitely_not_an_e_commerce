<template>
  <div>
    <h1>Hello John D,</h1>
    <h2>Profil User</h2>
    <div class="card px-5 py-4">
      <div class="col-12 d-flex">
        <div class="col-6 d-flex">
          <h6 class="col-5 d-block">Username</h6><h6 class="col-6 d-block">: John D</h6>
        </div>
        <div class="col-6 d-flex">
          <h6 class="col-5 d-block">ID</h6><h6 class="col-6 d-block">: JD001</h6>
        </div>
      </div>
      <div class="col-12 d-flex">
        <div class="col-6 d-flex">
          <h6 class="col-5 d-block">Email</h6><h6 class="col-6 d-block">: john.doe@test.mail</h6>
        </div>
        <div class="col-6 d-flex">
          <h6 class="col-5 d-block">Kode Partshop</h6><h6 class="col-6 d-block">: JD_KTB</h6>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-5 w-100">
    <h2>Detail Order</h2>
    <div v-if="loading" class="text-center py-4">
      <div class="spinner" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <table class="w-100 table">
        <thead>
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
      <div class="mt-2 d-flex align-items-center justify-content-between">
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

  <div class="mt-5 w-100">
    <h2>Detail Invoice</h2>
  </div>
</template>
<script setup>
  import { ref, onMounted, h } from 'vue'
  import {
    useVueTable,
    getCoreRowModel,
    getPaginationRowModel,
    FlexRender
  } from '@tanstack/vue-table'

  defineOptions({ name: 'Home' })

  const data = ref([])
  const loading = ref(true)

  // Define columns for orders
  const columns = [
    { accessorKey: 'orderID', header: 'Order ID' },
    { accessorKey: 'partID', header: 'Part ID' },
    { accessorKey: 'partNo', header: 'Part No' },
    { accessorKey: 'partName', header: 'Part Name' },
    { accessorKey: 'quantity', header: 'Quantity' },
    { 
      accessorKey: 'orderStatus', 
      header: 'Order Status',
      cell: (info) => {
        const status = info.getValue()
        const badgeClass = status === 'Completed' ? 'bg-success' : 
                          status === 'Pending' ? 'bg-warning' : 
                          status === 'Processing' ? 'bg-info' : 'bg-secondary'
        // `<span class="badge ${badgeClass}">${status}</span>`
        return h('span', { class: ['badge', badgeClass] }, status)
      }
    },
  ]

  // Mock data - replace with API call later
  onMounted(async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock order data
      data.value = Array.from({ length: 45 }, (_, i) => ({
        orderID: `ORD-${String(i + 1).padStart(4, '0')}`,
        partID: `PRT-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        partNo: `PN-${Math.floor(Math.random() * 9000) + 1000}`,
        partName: ['Engine Oil Filter', 'Brake Pad', 'Air Filter', 'Spark Plug', 'Oil Seal', 'Gasket'][i % 6],
        quantity: Math.floor(Math.random() * 50) + 1,
        orderStatus: ['Pending', 'Processing', 'Completed', 'Cancelled'][i % 4]
      }))
    } catch (error) {
      console.error('Error:', error)
    } finally {
      loading.value = false
    }
  })

  const table = useVueTable({
    get data() { return data.value },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })
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