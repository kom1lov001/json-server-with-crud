// quasar.config.js

module.exports = configure(function (ctx) {
    return {
        framework: {
            plugins: ["Router"],
            config: {
                router: {
                    mode: "hash",
                    base: "/",
                    linkActiveClass: "active-link",
                    linkExactActiveClass: "exact-active-link",
                },
            },
        },
    };
});
