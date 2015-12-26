/**
 * Config options at: http://requirejs.org/docs/api.html#config
 */
require.config({

	shim : {

	},

	paths : {

		// jQuery
		'jquery' : '../../js/jquery.min',
		'slick' : '../../slick/slick.min',
		'datepicker' : '../../js/bootstrap-datepicker.min',
		
		// Plugins
		'text' : 'plugins/text',
		'json' : 'plugins/json',
		'tpl' : 'plugins/tpl',
		
		// Templating
		'dot' : '../../js/vendor/doT.min',
	},
	waitSeconds : 200
});