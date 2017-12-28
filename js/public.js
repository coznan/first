 
/*axios.defaults.baseURL = 'data'; //请求本地数据

axios.interceptors.request.use(function (config) {
	console.log(config);
	if (config.baseURL == 'data') {
		config.url = config.url + '.json';
	}
	return config;
});  //拦截器将对本地数据目录的请求加上后缀*/

axios.defaults.baseURL = 'http://www.easy-mock.com/mock/5a0f949137da1d5b8800bdbb/mkt'; //请求easy-mock数据

var mixin = {
 	data:{
 		cart:[],
 		good:{}
 	},
 	filters: {
	    formatMoney: function(value) {
	      return "￥" + value.toFixed(2); //格式化价格
	    }
	},
 	methods:{
 		cartView:function () {
			this.cart = store.get('cart');
			var _this = this;
			if (this.cart == undefined) {
				axios.get("/cct").then(function(res){
					_this.cart = res.data.cart;
				});
			};
		},  //加载购物车

 		goodView:function () {
			this.good = store.get('good');  //加载商品信息
		},

 		cartStore:function () {
        	var _this = this;
        	var c_cart = [];
        	_.forEach(_this.cart, function(item, key){
	                if(item.quantity > 0){
	                	c_cart.push(item);
	                };
	            }); //清除数量为零的商品
			store.set('cart',c_cart); //将购物车计入缓存
        },

        goodStore:function (good) {
			store.set('good',good); //将商品信息计入缓存
			this.cartStore();  //跳转到商品详情时需缓存购物车
        },
 	},
 }