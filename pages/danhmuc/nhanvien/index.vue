<template>
  <div class="columns">
    <div class="column container">
      <br />
      <div class="box" style="margin-left: 3px; margin-right: 3px">
        <div class="columns">
          <div class="column">
            <div class="control">
              <span class="icon is-small is-left">
                <i style="color: #00d1b2" class="fas fa-address-card"></i>
              </span>
              <span style="color: #3850b7; font-size: 15px; font-weight: bold"
                >Danh mục Nhân viên</span
              >
            </div>
          </div>
        </div>

        <div class="box">
          <div class="columns">
            <div class="column is-10">
              <span>Có tất cả: </span>
              <span style="font-weight: bold">{{
                dsnhanvien.length | formatNumber
              }}</span>
              <span>nhân viên văn phòng</span>
            </div>
            <div class="column" style="text-align: right">
              <button
                @click="isActive = true"
                class="button is-success is-fullwidth is-small"
              >
                <span class="icon is-small">
                  <i class="fas fa-pen-fancy"></i>
                </span>
                <span>Thêm nhân viên</span>
              </button>
            </div>
          </div>

          <div class="columns">
            <div class="column" style="text-align: right">
              <div class="control has-icons-left">
                <div class="select is-small is-fullwidth">
                  <select @change="getWithBp($event)">
                    <option selected>-- Xem theo phòng ban --</option>
                    <option v-for="item in phongban" :value="item.mapx">
                      {{ item.maphong }} -- {{ item.tenphong }}
                    </option>
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <i style="color: #48c78e" class="fas fa-kaaba"></i>
                </span>
              </div>
            </div>
            <div class="column" style="text-align: right">
              <div class="control has-icons-left">
                <div class="select is-small is-fullwidth">
                  <select @change="getWithKhoi($event)">
                    <option selected>-- Xem theo khối --</option>
                    <option v-for="item in khoivp" :value="item.makhoi">
                      {{ item.makhoi }} -- {{ item.tenkhoi }}
                    </option>
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <i style="color: #48c78e" class="fas fa-kaaba"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 3px; text-align: right">
          <vue-excel-xlsx
            :data="dsnhanvien"
            :columns="columns"
            :file-name="'Danh_nhan_vien'"
            :file-type="'xlsx'"
            :sheet-name="'Danh mục nhân viên'"
          >
            Download Excel
          </vue-excel-xlsx>
        </div>
        <div class="table_wrapper">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead>
              <tr style="background-color: #fffaeb">
                <td
                  style="text-align: right; font-size: small; font-weight: bold"
                  colspan="11"
                >
                  <a @click="getDsnv">
                    <span class="icon is-small is-left">
                      <i style="color: #f96854" class="fab fa-audible"></i>
                    </span>
                    Hiển thị tất cả
                  </a>
                </td>
              </tr>
              <tr style="background-color: #fffaeb">
                <th style="text-align: center; font-size: small; width: 3%">
                  STT
                </th>
                <th style="text-align: center; font-size: small">Mã khối</th>
                <th style="text-align: center; font-size: small">
                  Tên nhân viên
                </th>
                <th style="text-align: center; font-size: small">Mã phòng</th>
                <th style="text-align: center; font-size: small">Tên phòng</th>
                <th style="text-align: center; font-size: small">CCCD</th>
                <th style="text-align: center; font-size: small">Ngày sinh</th>
                <th style="text-align: center; font-size: small">Giới tính</th>
                <th style="text-align: center; font-size: small">Trạng thái</th>
                <th style="text-align: center; font-size: small">Ngày tạo</th>
                <th style="text-align: center; font-size: small; width: 4%">
                  Sửa
                </th>
                <!-- <th style="text-align: center; font-size: small; width: 4%">
                  Xóa
                </th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(nv, index) in dsnhanvien" :key="index">
                <td style="text-align: center; font-size: small">
                  {{ index + 1 }}
                </td>
                <td
                  style="font-size: small; text-align: center; font-weight: 600"
                >
                  {{ nv.makhoi }}
                </td>
                <td style="font-size: small">{{ nv.tennv }}</td>
                <td style="font-size: small; text-align: center">
                  {{ nv.mapb }}
                </td>
                <td style="font-size: small">{{ nv.tenphong }}</td>
                <!-- <td style="font-size: small">{{ nv.mucluong }}</td> -->
                <td style="text-align: center; font-size: small">
                  {{ nv.cccd }}
                </td>
                <td style="text-align: center; font-size: small">
                  {{ nv.ngaysinh | formatDate }}
                </td>
                <td style="text-align: center; font-size: small">
                  {{ nv.gioitinh }}
                </td>
                <td
                  style="
                    font-size: small;
                    text-align: center;
                    font-weight: bold;
                  "
                >
                  <template v-if="nv.trangthai == 1">
                    <span style="color: green; font-weight: 900">Đang làm</span>
                  </template>
                  <template v-else>
                    <span style="color: #f96854; font-weight: 900"
                      >Đã nghỉ</span
                    >
                  </template>
                </td>
                <td style="text-align: center; font-size: small">
                  {{ nv.createdAt | formatDate }}
                </td>
                <td style="text-align: center; color: green">
                  <!-- <nuxt-link :to="`/danhmuc/nhanvien/${nv._id}/manage`">
                    <span class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </nuxt-link> -->
                  <a @click="updateNhanvien(nv)">
                    <span class="icon is-small">
                      <i class="far fa-check-circle"></i>
                    </span>
                  </a>
                </td>
                <!-- <td style="text-align: center">
                  <a @click="onDelete(nv)">
                    <span style="color: red" class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                  </a>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal Add nhân viên -->
        <div class="">
          <!-- Toggle class  -->
          <div :class="{ 'is-active': isActive }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card">
              <header
                style="
                  background-color: #3e8ed0;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
                "
              >
                <div class="columns is-mobile">
                  <div class="column">
                    <p
                      style="
                        font-size: small;
                        font-weight: bold;
                        color: white;
                        padding: 15px;
                      "
                    >
                      <span class="icon is-small is-left">
                        <i
                          style="color: #ffd863ff"
                          class="fas fa-feather-alt"
                        ></i>
                      </span>
                      Thêm Nhân viên
                    </p>
                  </div>
                </div>
              </header>
              <section class="modal-card-body">
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Mã khối</label>
                      <div class="control has-icons-left">
                        <div class="select is-small is-fullwidth">
                          <select @change="getWithKhoi_Addmodal($event)">
                            <option selected>-- Xem theo khối --</option>
                            <option v-for="item in khoivp" :value="item.makhoi">
                              {{ item.makhoi }} -- {{ item.tenkhoi }}
                            </option>
                          </select>
                        </div>
                        <span class="icon is-small is-left">
                          <i style="color: #48c78e" class="fas fa-kaaba"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Phòng ban</label>
                      <div class="control has-icons-left">
                        <div class="select is-small is-fullwidth">
                          <select @change="showmapx($event)">
                            <option selected>-- Chọn phòng ban --</option>
                            <option
                              v-for="item in phongban"
                              :value="item.maphong"
                            >
                              {{ item.maphong }} -- {{ item.tenphong }}
                            </option>
                          </select>
                        </div>
                        <span class="icon is-small is-left">
                          <i style="color: #48c78e" class="fas fa-kaaba"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Mã nhân viên</label>
                      <div class="control">
                        <input
                          v-model.trim="form.manv"
                          @blur="[$v.form.manv.$touch(), checkManv()]"
                          class="input is-danger is-small"
                          type="text"
                          placeholder="Nhập vào tên nhân viên"
                        />
                      </div>
                      <div v-if="$v.form.manv.$error" class="form-error">
                        <span
                          v-if="!$v.form.manv.required"
                          class="help is-danger"
                          >Yêu cầu nhập mã nhân viên</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Tên nhân viên</label>
                      <div class="control">
                        <input
                          v-model.trim="form.tennv"
                          @blur="$v.form.tennv.$touch()"
                          class="input is-danger is-small"
                          type="text"
                          placeholder="Nhập vào tên nhân viên"
                        />
                      </div>
                      <div v-if="$v.form.tennv.$error" class="form-error">
                        <span
                          v-if="!$v.form.tennv.required"
                          class="help is-danger"
                          >Yêu cầu nhập tên nhân viên</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Số điện thoại</label>
                      <div class="control">
                        <input
                          @blur="$v.form.sodienthoai.$touch()"
                          v-model.trim="form.sodienthoai"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                      <div v-if="$v.form.sodienthoai.$error" class="form-error">
                        <span
                          v-if="!$v.form.sodienthoai.required"
                          class="help is-danger"
                          >Yêu cầu nhập số điện thoại</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Căn cước công dân</label>
                      <div class="control">
                        <input
                          @blur="$v.form.cccd.$touch()"
                          @change="getNvccd"
                          v-model.trim="form.cccd"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập căn cước công dân"
                        />
                      </div>
                      <div v-if="$v.form.cccd.$error" class="form-error">
                        <span
                          v-if="!$v.form.cccd.required"
                          class="help is-danger"
                          >Yêu cầu nhập căn cước công dân</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Ngày sinh</label>
                      <div class="control">
                        <input
                          v-model="form.ngaysinh"
                          @blur="$v.form.ngaysinh.$touch()"
                          class="input is-small"
                          type="date"
                        />
                      </div>
                      <div v-if="$v.form.ngaysinh.$error" class="form-error">
                        <span
                          v-if="!$v.form.ngaysinh.required"
                          class="help is-danger"
                          >Yêu cầu nhập ngày sinh</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Giới tính</label>
                      <div class="control">
                        <label class="radio">
                          <input
                            v-model="form.gioitinh"
                            value="Nam"
                            type="radio"
                            name="answer"
                          />
                          Nam
                        </label>
                        <label class="radio">
                          <input
                            v-model="form.gioitinh"
                            value="Nữ"
                            type="radio"
                            name="answer"
                          />
                          Nữ
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Mức lương</label>
                      <div class="control">
                        <input
                          v-model="form.mucluong"
                          v-mask="mask"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập mức lương"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <label class="label">Liên hệ khẩn cấp</label>
                    <div class="control">
                      <input
                        v-model.trim="form.lhkhancap"
                        class="input is-small"
                        type="text"
                        placeholder="Nhập địa chỉ liên hệ của nhân viên"
                      />
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Số tài khoản ngân hàng</label>
                      <div class="control">
                        <input
                          v-model.trim="form.sotknh"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập số tài khoản"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <label class="label">Tên ngân hàng</label>
                    <div class="control">
                      <input
                        v-model.trim="form.tennh"
                        class="input is-small"
                        placeholder="Nhập tên ngân hàng"
                      />
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Chủ tài khoản</label>
                      <div class="control">
                        <input
                          v-model.trim="form.chutaikhoan"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập chủ tài khoản"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Địa chỉ liên hệ</label>
                      <div class="control">
                        <input
                          v-model.trim="form.diachilh"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập địa chỉ liên hệ của nhân viên"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-8">
                    <div class="field">
                      <label class="label">Chọn ảnh hồ sơ</label>
                      <span
                        style="color: red; font-size: 12px; margin-bottom: 5px"
                        >Yêu cầu phải chọn ảnh hồ sơ</span
                      >
                      <div class="file is-info has-name is-small">
                        <label class="file-label">
                          <input
                            @change="onFileChange"
                            class="file-input"
                            type="file"
                            name="resume"
                          />
                          <span class="file-cta">
                            <span class="file-icon">
                              <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label"> Chọn ảnh </span>
                          </span>
                          <span class="file-name">
                            {{ fileName }}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div v-if="url" class="column">
                      <div id="preview" class="box">
                        <img :src="url" />
                      </div>
                    </div>
                  </div>
                </div>
                <div style="margin-bottom: 10px">
                  <label class="checkbox">
                    <input type="checkbox" v-model="checkGhichu" />
                    <span style="font-weight: bold">Ghi chú </span>
                  </label>
                </div>
                <div
                  v-if="checkGhichu == true"
                  class="field"
                  style="margin-top: 10px"
                >
                  <div class="control">
                    <textarea
                      v-model="form.diengiai"
                      class="textarea is-small"
                      placeholder="Ghi chú thêm ..."
                    ></textarea>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">
                    <button
                      :disabled="$v.form.$invalid"
                      @click.prevent="onAddNhanvien"
                      class="button is-success is-fullwidth is-small"
                    >
                      Ghi nhận
                    </button>
                  </div>
                  <div class="column">
                    <button
                      @click="isActive = false"
                      class="button is-danger is-light is-fullwidth is-small"
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <!-- Modal update-->
        <div class="">
          <div :class="{ 'is-active': isActive_update }" class="modal">
            <div class="modal-background"></div>
            <div class="modal-content modal-card-predata">
              <section class="modal-card-body">
                <div v-if="form_update != null">
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Tên nhân viên</label>
                        <div class="control">
                          <input
                            v-model.trim="form_update.tennv"
                            class="input is-small"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Số điện thoại</label>
                        <div class="control">
                          <input
                            v-model="form_update.sodienthoai"
                            class="input is-small"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Căn cước công dân</label>
                        <div class="control">
                          <input
                            v-model="form_update.cccd"
                            class="input is-small"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Giới tính</label>
                        <div class="control">
                          <label class="radio is-small">
                            <input
                              v-model="form_update.gioitinh"
                              value="Nam"
                              type="radio"
                              name="answer"
                            />
                            Nam
                          </label>
                          <label class="radio">
                            <input
                              v-model="form_update.gioitinh"
                              value="Nữ"
                              type="radio"
                              name="answer"
                            />
                            Nữ
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Địa chỉ liên hệ</label>
                        <div class="control">
                          <input
                            v-model="form_update.diachilh"
                            class="input is-small"
                            type="text"
                            placeholder="Nhập địa chỉ liên hệ"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Liên hệ khẩn cấp</label>
                        <div class="control">
                          <input
                            v-model="form_update.lhkhancap"
                            class="input is-small"
                            type="text"
                            placeholder="Nhập địa chỉ liên hệ khẩn cấp"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Làm việc</label>
                        <template v-if="form_update.trangthai == true">
                          <span
                            style="
                              font-weight: bold;
                              font-size: small;
                              color: green;
                            "
                            >Đang làm</span
                          >
                        </template>
                        <template v-else>
                          <span
                            style="
                              font-weight: bold;
                              font-size: small;
                              color: red;
                            "
                            >Đã nghỉ</span
                          >
                        </template>
                        &nbsp;
                        <label class="switch" style="vertical-align: middle">
                          <input
                            v-model="form_update.trangthai"
                            type="checkbox"
                          />
                          <span class="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Mã khối</label>
                        <div class="control has-icons-left">
                          <div class="select is-small is-fullwidth">
                            <select @change="getWithKhoi_update($event)">
                              <option selected disabled>
                                {{ form_update.makhoi }}
                              </option>
                              <option
                                v-for="item in khoivp"
                                :value="item.makhoi"
                              >
                                {{ item.makhoi }} -- {{ item.tenkhoi }}
                              </option>
                            </select>
                          </div>
                          <span class="icon is-small is-left">
                            <i style="color: #48c78e" class="fas fa-kaaba"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Phòng ban</label>
                        <div class="control has-icons-left">
                          <div class="select is-fullwidth is-small">
                            <select @change="showmapx($event)">
                              <option selected disabled>
                                {{ form_update.tenphong }}
                              </option>
                              <option
                                v-for="item in phongban"
                                :value="item.maphong"
                              >
                                {{ item.maphong }} -- {{ item.tenphong }}
                              </option>
                            </select>
                          </div>
                          <span class="icon is-small is-left">
                            <i style="color: #48c78e" class="fas fa-kaaba"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Ngày sinh</label>
                        <div class="control">
                          <input
                            :value="formattedNgaybd(form_update)"
                            class="input is-small"
                            type="date"
                            @blur="updateNgaysinh($event.target.value)"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Mức lương</label>
                        <div class="control">
                          <input
                            v-model="form_update.mucluong"
                            class="input is-small"
                            type="text"
                            placeholder="Nhập địa chỉ liên hệ khẩn cấp"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <label class="label">Số tài khoản</label>
                        <div class="control">
                          <input
                            v-model="form_update.sotknh"
                            class="input is-small"
                            type="text"
                            placeholder="Nhập địa chỉ liên hệ khẩn cấp"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Tên ngân hàng</label>
                        <div class="control">
                          <input
                            v-model="form_update.tennh"
                            class="input is-small"
                            type="text"
                            placeholder="Nhập địa chỉ liên hệ khẩn cấp"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <label class="label">Chủ tài khoản</label>
                      <div class="control">
                        <input
                          v-model.trim="form_update.chutaikhoan"
                          class="input is-small"
                          type="text"
                          placeholder="Nhập tên ngân hàng"
                        />
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <div style="margin-bottom: 10px">
                          <label class="checkbox">
                            <input type="checkbox" v-model.trim="checkGhichu" />
                            <span style="font-weight: bold">Ghi chú </span>
                          </label>
                        </div>
                      </div>
                      <div
                        v-if="checkGhichu == true"
                        class="field"
                        style="margin-top: 10px"
                      >
                        <div class="control">
                          <textarea
                            v-model="form_update.diengiai"
                            class="textarea is-small"
                            placeholder="Ghi chú thêm ..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns" style="margin-top: 5px">
                    <div class="column">
                      <div class="field">
                        <label class="label">Sửa ảnh hồ sơ</label>
                        <div class="file is-info has-name is-small">
                          <label class="file-label">
                            <input
                              @change="onFileChange"
                              class="file-input"
                              type="file"
                              name="resume"
                            />
                            <span class="file-cta">
                              <span class="file-icon">
                                <i class="fas fa-upload"></i>
                              </span>
                              <span class="file-label"> Chọn ảnh </span>
                            </span>
                            <span class="file-name">
                              {{ fileName }}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div v-if="form_update.anhdd && !url" class="column">
                        <div id="preview" class="box">
                          <img :src="form_update.anhdd" />
                        </div>
                      </div>
                      <div v-if="url" class="column">
                        <div id="preview" class="box">
                          <img :src="url" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <button
                        @click="onUpdate"
                        class="button is-small is-success is-fullwidth"
                      >
                        Cập nhật
                      </button>
                    </div>
                    <div class="column">
                      <button
                        @click="isActive_update = false"
                        class="button is-small is-danger is-fullwidth"
                      >
                        Thoát
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Khai báo sweet2. Nhớ khai báo trong plugin
import Swal from "sweetalert2";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
import {
  required,
  email,
  minLength,
  url,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  middleware: "auth",
  data() {
    return {
      mask: currencyMask,
      url: null,
      fileName: "",
      selectedFile: null,
      file: null,
      pageOfitems: [],
      dsnhanvien: [],
      ngayip: new Date().toISOString().substr(0, 10),
      checkData: false,
      phongban: [],
      exits: {},
      checkGhichu: false,
      form_update: [],
      khoivp: [
        { makhoi: "VPBP", tenkhoi: "Văn phòng bộ phận" },
        { makhoi: "VPGT1", tenkhoi: "Văn phòng gián tiếp 1" },
        { makhoi: "VPGT2", tenkhoi: "Văn phòng gián tiếp 2" },
      ],
      mapb: "",
      makhoi: "",
      form: {
        manv: "",
        tennv: "",
        mapb: "",
        makhoi: "",
        tenkhoi: "",
        tenphong: "",
        sodienthoai: "",
        cccd: "",
        anhdd: "",
        ngaysinh: "",
        gioitinh: null,
        mucluong: 0,
        lhkhancap: "",
        diachilh: "",
        sotknh: "",
        tennh: "",
        diengiai: "",
        createdAt: null,
        thuong: 0,
        dt_dieuchinh: 0,
        dt_thuong: 0,
        dt_phat: 0,
        luongngoaih: 0,
        luongngay: 0,
        bacluong: 0,
        luongtrachnhiem: 0,
        congdoan: 50000,
        trangthai: 1,
        chutaikhoan: "",
        phucaptn: 0,
        luongphatsinh: 0,
        thuongdoanhthu: 0,
        ngaycong: 0,
        luongthemgio: 0,
      },
      hisform: {
        tenthaotac: null,
        createdAt: null,
        createdBy: this.$auth.$state.user.username,
        ghichu: null,
      },

      // Modals
      isActive: false,
      isActive_update: false,

      columns: [
        {
          label: "Id nhân viên",
          field: "_id",
          // dataFormat: this.trimData
        },
        {
          label: "Mã nhân viên",
          field: "manv",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Tên nhân viên",
          field: "tennv",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Mã phòng",
          field: "mapb",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Tên phòng",
          field: "tenphong",
          /* dataFormat: this.priceFormat */
          // dataFormat: this.trimData
        },
        {
          label: "Số điện thoại",
          field: "sdt",
        },
        {
          label: "CCCD",
          field: "cccd",
        },
        {
          label: "Ngày sinh",
          field: "ngaysinh",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Giới tính",
          field: "gioitinh",
        },
        {
          label: "Mức lương",
          field: "mucluong",
        },
        {
          label: "Liên hệ khẩn cấp",
          field: "lhkhancap",
        },
        {
          label: "Địa chỉ liên hệ",
          field: "diachilh",
        },
        {
          label: "Số tài khoản ngân hàng",
          field: "sotknh",
        },
        {
          label: "Tên ngân hàng",
          field: "tennh",
        },
        {
          label: "Phụ cấp",
          field: "phucaptn",
        },
        {
          label: "Lương phát sinh",
          field: "luongphatsinh",
        },
        {
          label: "Thưởng doanh thu",
          field: "thuongdoanhthu",
        },
        {
          label: "Ngày công",
          field: "ngaycong",
        },
        {
          label: "Lương thêm giờ",
          field: "luongthemgio",
        },
        {
          label: "Tạo ngày",
          field: "createdAt",
          dataFormat: this.prefixformatDate,
        },
        {
          label: "Tạo bởi",
          field: "accadd",
        },
        {
          label: "Cập nhật ngày",
          field: "updatedAt",
          dataFormat: this.prefixformatDate,
        },
      ],
    };
  },

  validations: {
    form: {
      manv: {
        required,
      },
      tennv: {
        required,
      },
      sodienthoai: {
        required,
      },
      cccd: {
        required,
      },
      ngaysinh: {
        required,
      },
    },

    form_update: {
      ngaysinh: {
        required,
      },
    },
  },

  computed: {
    isDisabled() {
      // you can  check your form is filled or not here.
      return this.checkData == false;
    },

    formattedNgaybd() {
      return function (form) {
        // console.log(form);
        if (!form.ngaysinh) return "";
        const date = new Date(form.ngaysinh);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      };
    },
  },

  mounted() {
    this.getDsnv();
    this.currentDateTime();
    this.getphongban();
    // this.getNvccd();
  },

  isFormValid() {
    return !this.$v.form.$invalid;
  },

  methods: {
    currentDateTime() {
      const current = new Date();
      const date =
        current.getFullYear() +
        "-" +
        (current.getMonth() + 1) +
        "-" +
        current.getDate();
      const time =
        current.getHours() +
        ":" +
        current.getMinutes() +
        ":" +
        current.getSeconds();
      this.form.createdAt = date + " " + time;
      this.hisform.createdAt = date + " " + time;
    },

    // format date
    prefixformatDate(value) {
      if (!value) {
        return "";
      }
      value = new Date(value);
      return (
        value.getFullYear() +
        "-" +
        ("0" + (value.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + value.getDate()).slice(-2)
      );
    },

    onFileChange(e) {
      this.fileName = e.target.files[0];
      this.url = URL.createObjectURL(this.fileName);
      this.fileName = e.target.files[0].name;
      this.selectedFile = e.target.files[0];
    },

    async getDsnv() {
      this.dsnhanvien = await this.$axios.$get(`/api/nhanvien/`);
      if (this.dsnhanvien.length <= 0) {
        this.$toasted.show("Không có danh sách nhân viên", {
          duration: 3000,
          theme: "bubble",
        });
      }
    },

    updateNgaysinh(value) {
      // console.log(value);
      this.form_update.ngaysinh = value;
    },

    async getNvccd() {
      this.exits = await this.$axios.$get(
        `/api/nhanvien/getcccd?cccd=${this.form.cccd}`
      );
      if (this.exits.length > 0) {
        Swal.fire(
          `Nhân viên có căn cước công dân số: ${this.form.cccd} đã tồn tại trong hệ thống!`
        );
      }
    },

    async getphongban() {
      this.phongban = await this.$axios.$get(`/api/phongban/allphongban`);
    },

    async checkManv() {
      // alert(this.form.manv);
      const dataNhanvien = await this.$axios.get("api/nhanvien/");
      // console.log(dataNhanvien);
      const data = dataNhanvien.data;
      const arrayManv = data.map((item) => item.manv);
      // console.log(arrayMacn);
      if (arrayManv.includes(this.form.manv)) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: `Mã nhân viên: ${this.form.manv} đã tồn tại trong dữ liệu, nhập vào mã mới`,
        });
        this.form.manv = "";
      }
    },

    async showmapx(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      this.form.mapb = position[0].trim();
      this.form.tenphong = position[1].trim();
    },

    async getWithBp(e) {
      this.mapb = "";
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      this.mapb = p1;
      this.makhoi = "";
      // console.log(p1);
      this.dsnhanvien = await this.$axios.$get(
        `/api/nhanvien/getallnhanvien?mapb=${p1}`
      );
    },

    async getWithKhoi(e) {
      this.makhoi = "";
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      this.makhoi = p1;
      this.mapb = "";
      this.dsnhanvien = await this.$axios.$get(
        `/api/nhanvien/getallnhanvienmakhoi?makhoi=${p1}`
      );
    },

    async getWithKhoi_Addmodal(e) {
      this.form.makhoi = "";
      this.form.tenkhoi = "";
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let p2 = position[1].trim();
      this.form.makhoi = p1;
      this.form.tenkhoi = p2;
    },

    async getWithKhoi_update(e) {
      // console.log(this.mapx)
      var name = e.target.options[e.target.options.selectedIndex].text;
      // console.log(name)
      let position = name.split("--");
      let p1 = position[0].trim();
      let p2 = position[1].trim();
      this.form_update.makhoi = p1;
      this.form_update.tenkhoi = p2;
    },

    async updateNhanvien(nhanvien) {
      this.form_update = [];
      // console.log(nhanvien);
      this.isActive_update = true;
      this.form_update = { ...nhanvien };
      // console.log(this.form_update);
    },

    async onUpdate() {
      const result = await Swal.fire({
        title: `Bạn chắc chắn cập nhật thông tin?`,
        showDenyButton: true,
        confirmButtonText: "Chắc chắn",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          console.log(this.form_update.chutaikhoan);
          if (this.form_update.ngaysinh == "") {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "error",
              title: "Yêu cầu nhập thông tin ngày sinh",
            });
            return;
          }
          let data = new FormData();
          data.append("tennv", this.form_update.tennv);
          data.append("mapb", this.form_update.mapb);
          data.append("makhoi", this.form_update.makhoi);
          data.append("tenkhoi", this.form_update.tenkhoi);
          data.append("tenphong", this.form_update.tenphong);
          data.append("sodienthoai", this.form_update.sodienthoai);
          data.append("cccd", this.form_update.cccd);
          if (this.selectedFile) {
            data.append("anhdd", this.selectedFile, this.selectedFile.name);
          } else {
            data.append("anhdd", this.form_update.anhdd);
          }
          data.append("ngaysinh", this.form_update.ngaysinh);
          data.append("gioitinh", this.form_update.gioitinh);
          data.append("mucluong", this.form_update.mucluong);
          data.append("lhkhancap", this.form_update.lhkhancap);
          data.append("diachilh", this.form_update.diachilh);
          data.append("sotknh", this.form_update.sotknh);
          data.append("tennh", this.form_update.tennh);
          data.append("diengiai", this.form_update.diengiai);
          data.append("trangthai", this.form_update.trangthai);
          data.append("updatedAt", this.form.createdAt);
          data.append("chutaikhoan", this.form_update.chutaikhoan);

          const res = await this.$axios.$patch(
            `/api/nhanvien/${this.form_update._id}`,
            data,
            {}
          );

          if (res.success == true) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Cập nhật thông tin thành công",
            });

            // save log
            this.hisform.tenthaotac = `Cập nhật nhân viên, tên: ${this.form_update.tennv}`;
            this.hisform.ghichu = `Cập nhật một nhân viên`;
            this.$axios.$post(`/api/logsystem/record-action`, this.hisform);

            if (this.mapb != "" && this.makhoi == "") {
              this.dsnhanvien = await this.$axios.$get(
                `/api/nhanvien/getallnhanvien?mapb=${this.mapb}`
              );
              this.dsnhanvien = this.dsnhanvien;
              console.log(this.dsnhanvien);
            } else if (this.mapb == "" && this.makhoi != "") {
              this.dsnhanvien = await this.$axios.$get(
                `/api/nhanvien/getallnhanvienmakhoi?makhoi=${this.makhoi}`
              );
              this.dsnhanvien = this.dsnhanvien;
              console.log(this.dsnhanvien);
            } else {
              this.getDsnv();
            }
          }
        } catch (error) {
          // console.log(error);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "error",
            title: "Có lỗi xảy ra !!!",
          });
        }
      }
    },

    async onAddNhanvien() {
      const result = await Swal.fire({
        title: `Chắc chắn thêm nhân viên?`,
        showDenyButton: true,
        confirmButtonText: "Chắc chắn thêm",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          this.$v.form.$touch();
          // console.log(this.form.ngaysinh);
          if (this.exits.length > 0) {
            Swal.fire(
              `Nhân viên có căn cước công dân số: ${this.form.cccd} đã tồn tại trong hệ thống!`
            );
            return;
          } else {
            // console.log(this.$auth.$state.user.username);
            // console.log(this.form.createdAt);
            let data = new FormData();
            data.append("manv", this.form.manv);
            data.append("tennv", this.form.tennv);
            data.append("mapb", this.form.mapb);
            data.append("makhoi", this.form.makhoi);
            data.append("tenkhoi", this.form.tenkhoi);
            data.append("tenphong", this.form.tenphong);
            data.append("sodienthoai", this.form.sodienthoai);
            data.append("cccd", this.form.cccd);
            if (this.selectedFile) {
              data.append("anhdd", this.selectedFile, this.selectedFile.name);
            } else {
              data.append("anhdd", this.form.anhdd);
            }
            data.append("ngaysinh", this.form.ngaysinh);
            data.append("gioitinh", this.form.gioitinh);
            data.append("mucluong", this.form.mucluong.replace(/,/g, ""));
            data.append("lhkhancap", this.form.lhkhancap);
            data.append("diachilh", this.form.diachilh);
            data.append("sotknh", this.form.sotknh);
            data.append("tennh", this.form.tennh);
            data.append("diengiai", this.form.diengiai);
            data.append("createdAt", this.form.createdAt);
            data.append("accadd", this.$auth.$state.user.username);
            data.append("thuong", this.form.thuong);
            data.append("dt_dieuchinh", this.form.dt_dieuchinh);
            data.append("dt_thuong", this.form.dt_thuong);
            data.append("dt_phat", this.form.dt_phat);
            data.append("luongngoaih", this.form.luongngoaih);
            data.append("luongngay", this.form.luongngay);
            data.append("bacluong", this.form.bacluong);
            data.append("luongtrachnhiem", this.form.luongtrachnhiem);
            data.append("congdoan", this.form.congdoan);
            data.append("trangthai", this.form.trangthai);
            data.append("chutaikhoan", this.form.chutaikhoan);
            data.append("phucaptn", this.form.phucaptn);
            data.append("luongphatsinh", this.form.luongphatsinh);
            data.append("thuongdoanhthu", this.form.thuongdoanhthu);
            data.append("ngaycong", this.form.ngaycong);
            data.append("luongthemgio", this.form.luongthemgio);
            data.append("sogiongoaigio", 0);
            data.append("sogiongoaigiochunhat", 0);
            const res = await this.$axios.$post(
              "/api/nhanvien/addnhanvien",
              data
            );

            if (res.success == true) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });
              Toast.fire({
                icon: "success",
                title: "Thêm nhân viên mới thành công",
              });
              this.getDsnv();
              this.isActive = false;
              this.form = [];
            }
          }
        } catch (error) {
          console.log(error);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: "Có lỗi xảy ra !!!",
          });
        }
      }
    },

    async onDelete(cn) {
      const result = await Swal.fire({
        title: `Bạn có xóa hẳn công nhân: ${cn.tencn}?`,
        showDenyButton: true,
        confirmButtonText: "Có, Xóa",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          await this.$axios
            .$delete(`/api/nhanvien/${nv._id}`)
            .then((response) => {
              const index = this.dsnhanvien.findIndex((p) => p._id === nv._id); // find the post index
              if (~index)
                // if the post exists in array
                this.dsnhanvien.splice(index, 1); //delete the post
            });
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: "Xóa thành công",
          });
        } catch (error) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: `Có lỗi xảy ra`,
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.table_wrapper {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

.table_wrapper {
  position: sticky;
  left: 0;
  background-color: whitesmoke;
}

.table-height {
  height: 650px;
  display: block;
  overflow: scroll;
  width: 100%;
  position: sticky;
  top: 0;
}

.modal-content,
.modal-card {
  width: 920px;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 90px;
  max-height: 90px;
}

@media (max-width: 768px) {
  .modal-card {
    width: 90%;
    max-width: 400px;
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 15px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f14668;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 7px;
  width: 7px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: green;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>
