<template>
	<transition name="component-animation">
		<component :is="currentView" @close="close" :id='id' @change="changeView"></component>
	</transition>
</template>

<script>
	import login from './Authorize';
	import registration from './Reg';
	import passForget from './PassForget';
	import oneElem from './OneElem';
	import create from './Create';
	import passChange from './PassChange';
	import emailChange from './EmailChange';
	import createResume from './ResumeCreate'
	
	export default {
		name: 'popup',
		props: ['viewName', 'id'],
		data: function() {
			return {
				views: {
					login: login,
					registration: registration,
					passForget: passForget,
					oneElem: oneElem,
					create: create,
					passChange: passChange,
					emailChange: emailChange,
					createResume: createResume
				},
				currentView: login
			}
		},
		created: function() {
			this.currentView = this.views[this.viewName];
		},
		methods: {
			changeView: function(e) {
				this.currentView = this.views[e];
			},
			close: function(e) {
				this.$emit('close', e);
			}
		}
	}
</script>

<style>
	
</style>