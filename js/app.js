(() => {
  "use strict";
  let t = (t, e = 500, a = 0) => {
      t.classList.contains("_slide") ||
        (t.classList.add("_slide"),
        (t.style.transitionProperty = "height, margin, padding"),
        (t.style.transitionDuration = e + "ms"),
        (t.style.height = `${t.offsetHeight}px`),
        t.offsetHeight,
        (t.style.overflow = "hidden"),
        (t.style.height = a ? `${a}px` : "0px"),
        (t.style.paddingTop = 0),
        (t.style.paddingBottom = 0),
        (t.style.marginTop = 0),
        (t.style.marginBottom = 0),
        window.setTimeout(() => {
          (t.hidden = !a),
            !a && t.style.removeProperty("height"),
            t.style.removeProperty("padding-top"),
            t.style.removeProperty("padding-bottom"),
            t.style.removeProperty("margin-top"),
            t.style.removeProperty("margin-bottom"),
            !a && t.style.removeProperty("overflow"),
            t.style.removeProperty("transition-duration"),
            t.style.removeProperty("transition-property"),
            t.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: t } })
            );
        }, e));
    },
    e = (t, e = 500, a = 0) => {
      if (!t.classList.contains("_slide")) {
        t.classList.add("_slide"),
          (t.hidden = !t.hidden && null),
          a && t.style.removeProperty("height");
        let s = t.offsetHeight;
        (t.style.overflow = "hidden"),
          (t.style.height = a ? `${a}px` : "0px"),
          (t.style.paddingTop = 0),
          (t.style.paddingBottom = 0),
          (t.style.marginTop = 0),
          (t.style.marginBottom = 0),
          t.offsetHeight,
          (t.style.transitionProperty = "height, margin, padding"),
          (t.style.transitionDuration = e + "ms"),
          (t.style.height = s + "px"),
          t.style.removeProperty("padding-top"),
          t.style.removeProperty("padding-bottom"),
          t.style.removeProperty("margin-top"),
          t.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            t.style.removeProperty("height"),
              t.style.removeProperty("overflow"),
              t.style.removeProperty("transition-duration"),
              t.style.removeProperty("transition-property"),
              t.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: t } })
              );
          }, e);
      }
    };
  function a(t, e) {
    const a = Array.from(t).filter(function (t, a, s) {
      if (t.dataset[e]) return t.dataset[e].split(",")[0];
    });
    if (a.length) {
      const t = [];
      a.forEach((a) => {
        const s = {},
          i = a.dataset[e].split(",");
        (s.value = i[0]),
          (s.type = i[1] ? i[1].trim() : "max"),
          (s.item = a),
          t.push(s);
      });
      let s = t.map(function (t) {
        return (
          "(" + t.type + "-width: " + t.value + "px)," + t.value + "," + t.type
        );
      });
      s = (function (t) {
        return t.filter(function (t, e, a) {
          return a.indexOf(t) === e;
        });
      })(s);
      const i = [];
      if (s.length)
        return (
          s.forEach((e) => {
            const a = e.split(","),
              s = a[1],
              o = a[2],
              r = window.matchMedia(a[0]),
              n = t.filter(function (t) {
                if (t.value === s && t.type === o) return !0;
              });
            i.push({ itemsArray: n, matchMedia: r });
          }),
          i
        );
    }
  }
  let s = !1;
  setTimeout(() => {
    if (s) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    (function () {
      const s = document.querySelectorAll("[data-tabs]");
      let i = [];
      if (s.length > 0) {
        const t = (function () {
          if (location.hash) return location.hash.replace("#", "");
        })();
        t && t.startsWith("tab-") && (i = t.replace("tab-", "").split("-")),
          s.forEach((t, e) => {
            t.classList.add("_tab-init"),
              t.setAttribute("data-tabs-index", e),
              t.addEventListener("click", n),
              (function (t) {
                let e = t.querySelectorAll("[data-tabs-titles]>*"),
                  a = t.querySelectorAll("[data-tabs-body]>*");
                const s = t.dataset.tabsIndex,
                  o = i[0] == s;
                if (o) {
                  const e = t.querySelector("[data-tabs-titles]>._tab-active");
                  e && e.classList.remove("_tab-active");
                }
                a.length &&
                  ((a = Array.from(a).filter(
                    (e) => e.closest("[data-tabs]") === t
                  )),
                  (e = Array.from(e).filter(
                    (e) => e.closest("[data-tabs]") === t
                  )),
                  a.forEach((t, a) => {
                    e[a].setAttribute("data-tabs-title", ""),
                      t.setAttribute("data-tabs-item", ""),
                      o && a == i[1] && e[a].classList.add("_tab-active"),
                      (t.hidden = !e[a].classList.contains("_tab-active"));
                  }));
              })(t);
          });
        let e = a(s, "tabs");
        e &&
          e.length &&
          e.forEach((t) => {
            t.matchMedia.addEventListener("change", function () {
              o(t.itemsArray, t.matchMedia);
            }),
              o(t.itemsArray, t.matchMedia);
          });
      }
      function o(t, e) {
        t.forEach((t) => {
          let a = (t = t.item).querySelector("[data-tabs-titles]"),
            s = t.querySelectorAll("[data-tabs-title]"),
            i = t.querySelector("[data-tabs-body]"),
            o = t.querySelectorAll("[data-tabs-item]");
          (s = Array.from(s).filter((e) => e.closest("[data-tabs]") === t)),
            (o = Array.from(o).filter((e) => e.closest("[data-tabs]") === t)),
            o.forEach((o, r) => {
              e.matches
                ? (i.append(s[r]), i.append(o), t.classList.add("_tab-spoller"))
                : (a.append(s[r]), t.classList.remove("_tab-spoller"));
            });
        });
      }
      function r(a) {
        let s = a.querySelectorAll("[data-tabs-title]"),
          i = a.querySelectorAll("[data-tabs-item]");
        const o = a.dataset.tabsIndex;
        const r = (function (t) {
          if (t.hasAttribute("data-tabs-animate"))
            return t.dataset.tabsAnimate > 0
              ? Number(t.dataset.tabsAnimate)
              : 500;
        })(a);
        if (i.length > 0) {
          const n = a.hasAttribute("data-tabs-hash");
          (i = Array.from(i).filter((t) => t.closest("[data-tabs]") === a)),
            (s = Array.from(s).filter((t) => t.closest("[data-tabs]") === a)),
            i.forEach((a, i) => {
              var l;
              s[i].classList.contains("_tab-active")
                ? (r ? e(a, r) : (a.hidden = !1),
                  n &&
                    !a.closest(".popup") &&
                    ((l = (l = `tab-${o}-${i}`)
                      ? `#${l}`
                      : window.location.href.split("#")[0]),
                    history.pushState("", "", l)))
                : r
                ? t(a, r)
                : (a.hidden = !0);
            });
        }
      }
      function n(t) {
        const e = t.target;
        if (e.closest("[data-tabs-title]")) {
          const a = e.closest("[data-tabs-title]"),
            s = a.closest("[data-tabs]");
          if (
            !a.classList.contains("_tab-active") &&
            !s.querySelector("._slide")
          ) {
            let t = s.querySelectorAll("[data-tabs-title]._tab-active");
            t.length &&
              (t = Array.from(t).filter((t) => t.closest("[data-tabs]") === s)),
              t.length && t[0].classList.remove("_tab-active"),
              a.classList.add("_tab-active"),
              r(s);
          }
          t.preventDefault();
        }
      }
    })();
})();
