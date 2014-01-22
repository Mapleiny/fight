require.config({
    baseUrl: 'javscripts/app',
     paths: {
        lib: '../lib',
        jQuery : '../lib/jquery/jquery-2.0.min',
    },urlArgs: "bust=" + (new Date()).getTime()
});


require(['create/assembl','jQuery'],function (assembl){
    //console.log(test);
    assembl.init();

});