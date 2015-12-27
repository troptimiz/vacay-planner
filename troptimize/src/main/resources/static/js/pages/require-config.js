/**
 * Config options at: http://requirejs.org/docs/api.html#config
 */
require.config({

	shim : {

	},

	paths : {

		// jQuery
		'jquery' : '../../js/jquery.min',
		//responsive-menu
		'responsive-menu': '../../js/responsive-menu',
		//bootstrap
		'bootstrap' : '../../js/vendor/bootstrap',
		//slick
		'slick' : '../../slick/slick.min',
		//datepicker
		'datepicker' : '../../js/bootstrap-datepicker.min',
		//pgwslideshow
		'pgwslideshow' : '../../js/pgwslideshow',
		//bootstrap spinner
		'bspinner' : '../../js/bootstrap-spinner',
		//bootstrap tabcollapse
		'btab' :'../../js/bootstrap-tabcollapse',
		//enscroll
		'enscroll' : '../../js/enscroll-0.6.0.min',
		//typeahead
		'typeahead' : '../../js/typeahead.min',
		//mousehold
		'mousehold' : '../../js/mousehold',
		//bootstrap tool tip
		'boostrap-tooltip' : '../../js/jquery-validate.bootstrap-tooltip',
		//expander
		'expander' : '../../js/jquery.expander',
		
		// Plugins
		'text' : 'plugins/text',
		'json' : 'plugins/json',
		'tpl' : 'plugins/tpl',
		
		// Templating
		'dot' : '../../js/vendor/doT.min',
	},
	waitSeconds : 200
});