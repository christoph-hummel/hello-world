window.MyApp = window.Application2 || {};

$(function() {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });

    MyApp.app = new DevExpress.framework.html.HtmlApplication({
        namespace: MyApp,
        navigationType: MyApp.config.navigationType,
        navigation: MyApp.config.navigation
    });
    MyApp.app.router.register(":view/:id", { view: "home", id: undefined });

    MyApp.app.navigate();
});