<template>
  <div>
    <h1>Hello John,</h1>
    <div class="card px-3 py-2">
      <Vueform class="w-100">
        <TextElement label="Username" name="user" type="text" :readonly="true" default="John_D" 
          :columns="{ container: 12, label: 6, wrapper: 6 }"/>
        <TextElement label="ID" :readonly="true" default="1"/>
        <TextElement label="Email" :readonly="true" default="john.doe@email.com" />
        <TextElement label="apm" :readonly="true" default="KTB" />
        <TextElement label="partshop_code" :readonly="true" default="jd_ktb" />
        <hr />
        <TextElement label="Total Piutang"/>
      </Vueform>
    </div>
  </div>
</template>

<script setup>
  defineOptions({ name: 'Home' })
</script>