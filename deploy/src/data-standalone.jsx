// Standalone photo resolver: uses window.__resources (populated by the
// bundler from ext-resource-dependency meta tags with data-resource-id).
// Applied AFTER data.jsx to replace external URLs with inlined blob: URLs.
(function () {
  if (!window.MR || !window.__resources) return;
  var R = window.__resources;
  var p = window.MR.photos;
  var map = {
    kitchen: "img_kitchen",
    bathroom: "img_bathroom",
    bedroom: "img_bedroom",
    living1: "img_living1",
    living2: "img_living2",
    staged: "img_staged",
    stagedWide: "img_stagedWide",
    fitness: "img_fitness",
    clubhouse: "img_clubhouse",
    leasing: "img_leasing",
    pool: "img_pool",
    site: "img_site",
    exterior: "img_exterior",
    exterior2: "img_exterior2",
    exteriorSide: "img_exteriorSide",
  };
  Object.keys(map).forEach(function (k) {
    if (R[map[k]]) p[k] = R[map[k]];
  });
})();
