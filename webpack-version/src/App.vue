<template>
  <div id="app">
    <el-table
    :data="gridData"
    style="width: 100%">

      <el-table-column
      label="Name"
      min-width="180">
        <editable-cell
        :cell-trigger="cellTrigger"
        @input-exit="inputExit(row, $index)"
        :show-input="!!row.editMode"
        slot-scope="{row, $index}"
        v-model="row.name">
          <span slot="content">{{row.name}}</span>
        </editable-cell>
      </el-table-column>

      <el-table-column
      min-width="150"
      label="Gender">
        <editable-cell 
        :cell-trigger="cellTrigger"
        @input-exit="inputExit(row, $index)"
        :show-input="!!row.editMode"
        slot-scope="{row, $index}" 
        editable-component="el-select"
        close-event="change"
        v-model="row.gender">
          <el-tag size="medium" 
          :type="row.gender === 'M' ? 'primary' : 'danger'" 
          slot="content">
          {{row.gender === 'M' ? 'Male': 'Female'}}
          </el-tag>
          <template slot="edit-component-slot">
            <el-option value="M" label="Male"></el-option>
            <el-option value="F" label="Female"></el-option>
          </template>
        </editable-cell>
      </el-table-column>

      <el-table-column
      label="Birth Date"
      min-width="250">
        <editable-cell 
        :cell-trigger="cellTrigger"
        @input-exit="inputExit(row, $index)"
        :show-input="!!row.editMode"
        slot-scope="{row, $index}" 
        editable-component="el-date-picker"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        v-model="row.date">
          <span slot="content">{{row.date}}</span>
        </editable-cell>
      </el-table-column>

      <el-table-column
      v-if="!cellTrigger"
      label="Operations"
      min-width="180">
        <template slot-scope="{row, $index}">
          <el-button icon="el-icon-edit"
          @click="setEditMode(row, $index)">
          </el-button>
          <el-button type="success" icon="el-icon-check"
          @click="saveRow(row, $index)">
          </el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import EditableCell from './components/EditableCell'

export default {
  name: 'App',
  components: {
    EditableCell
  },
  data () {
    return {
        cellTrigger: true,
        rawGridData: [
          {
            date: "2016-05-03",
            name: "Tom",
            gender: "M"
          },
          {
            date: "2016-05-02",
            name: "Lisa",
            gender: "F"
          },
          {
            date: "2016-05-04",
            name: "Jon",
            gender: "M"
          }
        ]
      };
  },
  computed: {
    gridData () {
      let gridData = this.rawGridData.map((item) => {
        return {
          ...item,
          editMode: false
        }
      });
      console.log(gridData, '【gridData】')
      return gridData;
    }
  },
  methods: {
    setEditMode (row, index) {
      row.editMode = true;
    },
    saveRow (row, index) {
      console.log(row, index, '[saveRow]')
      row.editMode = false;
    },
    inputExit (row, index) {
      console.log(row, index, '[inputExit]')
    }
  },
  mounted: function(){

  }
}
</script>

<style>
#app {
  width: 850px;
  height:320px;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
