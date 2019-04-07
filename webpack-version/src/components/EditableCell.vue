<template>
  <div @click="onFieldClick" class="edit-cell">
    <el-tooltip v-if="!editMode && !showInput"
    :placement="toolTipPlacement"
    :open-delay="toolTipDelay"
    :content="toolTipContent">
      <div tabindex="0" @keyup.enter="onFieldClick">
        <slot name="content"></slot>
      </div>
    </el-tooltip>
    
    <component :is="editableComponent"
    v-if="editMode || showInput"
    ref="input"
    @focus="onFieldClick"
    @keyup.enter.native="onInputExit"
    v-on="listeners"
    v-bind="$attrs"
    v-model="model">
      <slot name="edit-component-slot"></slot>
    </component>
  </div>
</template>

<script>
export default {
  name: 'EditableCell',
  props: {
    value: {
      type: String,
      default: ""
    },
    toolTipContent: {
      type: String,
      default: "Click to edit"
    },
    toolTipDelay: {
      type: Number,
      default: 500
    },
    toolTipPlacement: {
      type: String,
      default: "top-start"
    },
    showInput: {
      type: Boolean,
      default: false
    },
    editableComponent: {
      type: String,
      default: "el-input"
    },
    closeEvent: {
      type: String,
      default: "blur"
    },
    cellTrigger: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      editMode: false,
      preValue: null
    }
  },
  computed: {
    model: {
      get () {
        return this.value;
      },
      set (val) {
        // this.$emit("input", val);
      }
    },
    listeners () {
      let listeners = {};
      listeners = {
       [this.closeEvent]: this.onInputExit,
       ...this.$listeners
      }

      // for(let key in this.$listeners){
      //   listeners[key] =  this.$listeners[key];
      // }

      // listeners[this.closeEvent] = this.onInputExit;
      
      return listeners;
    },
  },
  methods: {
    onFieldClick () {
      if(!this.cellTrigger){
        return;
      }
      this.editMode = true;
      this.$nextTick(function(){
        let inputRef = this.$refs.input;
        if(inputRef){
          inputRef.focus();
          this.preValue = this.value;
        }
      });
    },
    onInputExit () {
      // console.log(this.preValue, this.value, '[this.preValue]')
      if(!this.cellTrigger){
        return;
      }
      this.editMode = false;
      if(this.editableComponent !== 'el-select'&&this.preValue === this.value){
        return;
      }
      this.$emit('input-exit');
    }
  },
  mounted () {
    // console.log(this.showInput, '[showInput]')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
