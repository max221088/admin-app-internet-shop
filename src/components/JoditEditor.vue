<template>
	<div class="editor-wrapper">
		<textarea :id="selector">content</textarea>
	</div>
</template>

<script>
	const Jodit = require('jodit');

	export default {
		data: function () {
			return {
				editor: null
			}
		},
		props: ['selector', 'buttons', 'content'],
		methods: {
			getContent() {
				return this.editor.value;		
			},
			setContent(value) {
				this.editor.value = value;
			}
		},
		mounted() {
			this.editor = new Jodit.Jodit('#' + this.selector, {
				buttons: this.buttons
			});
		}
	}
</script>
<style>
@import '../../node_modules/jodit/es2021/jodit.css';
</style>
