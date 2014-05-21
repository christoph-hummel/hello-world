MyApp.home = function (params) {

	var viewModel,
		localStore = new DevExpress.data.LocalStore({
			name: "locations",
			key: "name"
		});
	viewModel = {
		ds: new DevExpress.data.DataSource({ store: localStore }),
		viewShown: function (e) {
			console.log("1");
			if (e.direction == 'backward') {			
				localStore.load().done(function () {
					console.log("2");
                    viewModel.ds.load();
                }).fail(function () {
                    DevExpress.ui.notify("Error", 'error', 3000);
                });
				console.log(viewModel.ds);
			}
		}
	};

    return viewModel;
};