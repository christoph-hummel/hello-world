MyApp.receipt = function (params) {

	var viewModel,
		localStore = new DevExpress.data.LocalStore({
			name: "locations",
			key: "name"
		});
	viewModel = {
		name: ko.observable(),
		ds: new DevExpress.data.DataSource({ store: localStore }),
		add_receipt: function () {
			if (viewModel.name()) {
				localStore.insert({ name: viewModel.name() }).done(function () {
					//console.log("speichern");
					//console.log(viewModel.ds);					
					viewModel.ds.load();
					MyApp.app.navigate('home', { direction: 'backward', root: true });
				}).fail(function () {
					DevExpress.ui.notify("itemExists", 'error', 3000);
				});
            }
		}
	};
	return viewModel;
};