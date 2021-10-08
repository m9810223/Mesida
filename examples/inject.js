// window.addEventListener(
//   'beforeunload',
//   function () {
//     debugger;
//   },
//   false
// );

((siteId) => {
  console.log(`[inject] ***
    location.pathname = ${location.pathname}`);

  setTimeout(() => {
    if ([''].includes(location.pathname)) {
      return;
    }

    const old_siteId = window.tagtoo_advertiser_id;
    window.tagtoo_advertiser_id = siteId;

    console.warn(`[inject] ***
    location.pathname = ${location.pathname}
    window.tagtoo_advertiser_id = ${old_siteId} -> ${window.tagtoo_advertiser_id}`);

    const script = document.createElement('script');
    const port = 4000; // package.json:  config.port
    const url = `http://localhost:${port}/${window.tagtoo_advertiser_id}.js`;
    script.charset = 'UTF-8';
    script.src = url;
    document.body.appendChild(script);

    // window.tgDataLayer ||= [];
    // window.tgDataLayer.push(['autoRun']);
  }, 0 * 1000);
})(1);
