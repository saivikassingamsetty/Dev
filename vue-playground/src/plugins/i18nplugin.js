export const myPlugin = {
  install(app, options) {
    //define a translate function globally which passed a key
    app.config.globalProperties.$translate = (key) => {
      //search in user defined options if it available to translate
      key.split(".").reduce((o, i) => {
        if (o) return o[i];
      }, options);
    };
  },
};
