Vue.component('EditableCell', {
	template:
	'<div @click="onFieldClick" class="edit-cell">\
		<el-tooltip v-if="!editMode && !showInput"\
		:placement="toolTipPlacement"\
		:open-delay="toolTipDelay"\
		:content="toolTipContent">\
			<div tabindex="0" @keyup.enter="onFieldClick">\
				<slot name="content"></slot>\
			</div>\
		</el-tooltip>\
		\
		<component :is="editableComponent"\
		v-if="editMode || showInput"\
		ref="input"\
		@focus="onFieldClick"\
		@keyup.enter.native="onInputExit"\
		v-on="listeners"\
		v-bind="$attrs"\
		v-model="model">\
			<slot name="edit-component-slot"></slot>\
		</component>\
	</div>',
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
	data: function(){
		return {
			editMode: false,
			preValue: null
		}
	},
	// watch: {
	// 	showInput: function(val){
	// 		console.log(val, '[val]')
	// 	}
	// },
	computed: {
		model: {
			get: function(){
				return this.value;
			},
			set: function(val){
				// this.$emit("input", val);
			}
		},
		listeners: function(){
			// console.log(this.$listeners, '[this.$listeners]')
			var listeners = {};
			// listeners = {
			// 	[this.closeEvent]: this.onInputExit,
			// 	...this.$listeners
			// }

			for(var key in this.$listeners){
				listeners[key] =  this.$listeners[key];
			}

			listeners[this.closeEvent] = this.onInputExit;
			// console.log(listeners, '[listeners]')
			return listeners;
		}
	},
	methods: {
		onFieldClick: function(){
			if(!this.cellTrigger){
				return;
			}
			this.editMode = true;
			this.$nextTick(function(){
				var inputRef = this.$refs.input;
				if(inputRef){
					inputRef.focus();
					this.preValue = this.value;
				}
			});
		},
		onInputExit: function(){
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
	mounted: function(){
		// console.log(this.showInput, '[showInput]')
	}
})