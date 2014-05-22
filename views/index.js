HRworksReceipt.index = function (params) {

	var viewModel = {
		ds: new DevExpress.data.DataSource({ store: HRworksReceipt.localStoreReceipts }),
		searchQuery: ko.observable().extend({ throttle: 500 }),
        map: function(item) {
            return new localStore;
        },
		viewShown: function (e) {
			if (e.direction == 'backward') {
				viewModel.ds.load();
			}
		},
	};

	viewModel.searchQuery.subscribe(function (value) {
        viewModel.ds.filter("text", "contains", value);
        viewModel.ds.load();
    });

    return viewModel;
};