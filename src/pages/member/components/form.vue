<template>
  <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="69150287">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model="name" maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model="tel" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select v-model='provinceValue' class="js-province-selector">
              <option value="-1">选择省份</option>
              <option v-for='province in addressData.list' :value="province.value">{{province.label}}</option>
            </select>
            <select v-model='cityValue' class="js-city-selector">
              <option value="-1">选择城市</option>
              <option v-for='city in cityList'  :value="city.value">{{city.label}}</option>
            </select>
            <select v-model='districtValue' class="js-county-selector" name="area_code" data-code="440402">
              <option value="-1">选择地区</option>
              <option v-for='district in districtList' :value="district.value">{{district.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" v-model="address" maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn" @click='add'>
      <div class="block-item c-blue center">保存</div>
    </div>
    <div class="block section js-delete block-control-btn" @click='remove'>
      <div class="block-item c-red center">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default" @click='setDefault'>
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>
<style scoped>
@import './address.css'
</style>
<script src='./form.js'></script>