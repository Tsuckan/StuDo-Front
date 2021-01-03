<template>
	<transition name="component-animation">
		<component :is="currentView" @close="close" :id='id' @change="changeView"></component>
	</transition>
</template>

<script>
	import login from './Authorization';
	import registration from './Registration';
	import passForget from './PassForget';
	import adInfo from '../Ads/AdInfo';
	import createAd from '../Ads/CreateAd';
	import passChange from './PassChange';
	import emailChange from './EmailChange';
	import createResume from '../Resumes/CreateResume';
	
	export default {
		name: 'popup',
		props: ['viewName', 'id'],
		data: function() {
			return {
				views: {
					login: login,
					registration: registration,
					passForget: passForget,
					adInfo: adInfo,
					createAd: createAd,
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