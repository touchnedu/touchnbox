/*  Copyright 2015, Mathscribe, Inc.  Released under the MIT license (same as jQuery).
	See e.g. http://jquery.org/license for an explanation of this license.  */
"use strict";
var jsCurry = function() {
  function e(t) {
    if ("function" == typeof t) return e.curry.apply(void 0, arguments);
    if (2 == arguments.length) {
      var r = arguments[1];
      if ("string" == typeof t) return r[t].bind(r);
      if ("function" == typeof r) return ("number" == typeof t ? e.aritize : e.partial)(t, r)
    }
    return 1 == arguments.length || e.err(err_F_1_), "number" == typeof t || "string" == typeof t ? e.pToF(t) : 1 == t.nodeType ? jQuery.data(t) : t && "object" == typeof t ? e.aToF(t) : void e.err(err_F_2_)
  }
  var t = Array.prototype.slice;
  return Function.prototype.bind || (Function.prototype.bind = function(e) {
    var r = this,
      n = t.call(arguments, 1);
    return function() {
      return r.apply(e, n.concat(t.call(arguments, 0)))
    }
  }), String.prototype.trim || (String.prototype.trim = function() {
    return String(this).replace(/^\s+|\s+$/g, "")
  }), Array.isArray || (Array.isArray = function(e) {
    return "object" == typeof e && null !== e && "[object Array]" === Object.prototype.toString.call(e)
  }), Object.keys || (Object.keys = function(e) {
    var t = [];
    for (var r in e) e.hasOwnProperty(r) && t.push(r);
    return t
  }), Date.now || (Date.now = function() {
    return (new Date).getTime()
  }), e.err = function() {
    throw e.debug, Error("Assertion failed")
  }, e.id = function(e) {
    return e
  }, e.constant = function(e) {
    return function() {
      return e
    }
  }, e.applyF = function(e, t) {
    return e.apply(void 0, t)
  }, e.curry = function(e) {
    var t = e;
    return arguments[0] = void 0, t.bind.apply(t, arguments)
  }, e._ = {}, e.partial = function(r, n) {
    var a = r.length;
    return function() {
      for (var i = t.call(arguments, 0), s = 0; a > s; s++) r[s] !== e._ && i.splice(s, 0, r[s]);
      return n.apply(this, i)
    }
  }, e.uncurry = function(e) {
    return function(t, r) {
      return e(t)(r)
    }
  }, e.o = function() {
    var e = arguments;
    return function() {
      for (var t = e.length, r = e[--t].apply(void 0, arguments); t > 0;) r = e[--t](r);
      return r
    }
  }, e.oMap = function(t, r) {
    return function() {
      return e.applyF(t, e.map(r, arguments))
    }
  }, e.flip = function(e) {
    return function(t, r) {
      return e(r, t)
    }
  }, e.seqF = function() {
    var e = arguments,
      t = e.length;
    return function() {
      for (var r, n = 0; t > n; n++) r = e[n].apply(void 0, arguments);
      return r
    }
  }, e.cor = function() {
    var t = arguments;
    return function() {
      return e.any(e([e._, arguments], e.applyF), t)
    }
  }, e.aritize = function(r, n) {
    return function() {
      return e.applyF(n, t.call(arguments, 0, r))
    }
  }, e.not = function(e) {
    return !e
  }, e.cmpX = function(e, t) {
    return e - t
  }, e.cmpJS = function(e, t) {
    return t > e ? -1 : e == t ? 0 : 1
  }, e.cmpLex = function(t, r, n) {
    return e.any(function(e, r) {
      return r == n.length ? 1 : t(e, n[r])
    }, r) || r.length - n.length
  }, e.eqTo = function(t, r) {
    return r || (r = function(e, t) {
      return e !== t
    }), e.o(e.not, e(r, t))
  }, e.pToF = function(e) {
    return function(t) {
      return t[e]
    }
  }, e.aToF = function(e) {
    return function(t) {
      return e[t]
    }
  }, e.fToA = function(e, t) {
    for (var r = new Array(t), n = 0; t > n; n++) r[n] = e(n);
    return r
  }, e.memoF = function(e, t) {
    return t || (t = {}),
      function(r) {
        return t.hasOwnProperty(r) ? t[r] : t[r] = e(r)
      }
  }, e.replicate = function(t, r) {
    return e.fToA(e.constant(r), t)
  }, e.setF = function(e, t, r) {
    e[t] = r
  }, e.obj1 = function(e, t) {
    var r = {};
    return r[e] = t, r
  }, e.slice = function(e, t, r) {
    if (null == t && (t = 0), Array.isArray(e)) return e.slice(t, r);
    var n = e.length;
    t = 0 > t ? Math.max(0, n + t) : Math.min(n, t), r = void 0 === r ? n : 0 > r ? Math.max(0, n + r) : Math.min(n, r);
    for (var a = []; r > t;) a.push(e[t++]);
    return a
  }, e.array = function() {
    return t.call(arguments, 0)
  }, e.concatArgs = e.oMap(e("concat", []), function(t) {
    return Array.isArray(t) ? t : e.slice(t)
  }), e.concatMap = function(t, r) {
    return e.applyF(e.concatArgs, e.map(t, r))
  }, e.reverseCopy = function(t) {
    return e.slice(t).reverse()
  }, e.findIndex = function(e, t) {
    for (var r = t.length, n = 0; r > n; n++)
      if (e(t[n], n, t)) return n;
    return -1
  }, e.findLastIndex = function(e, t) {
    for (var r = t.length; --r >= 0;)
      if (e(t[r], r, t)) return r;
    return -1
  }, e.find = function(t, r) {
    var n = e.findIndex(t, r);
    return -1 == n ? void 0 : r[n]
  }, e.elemIndex = function(t, r, n) {
    return r.indexOf && !n && Array.isArray(r) ? r.indexOf(t) : e.findIndex(e.eqTo(t, n), r)
  }, e.elemLastIndex = function(t, r, n) {
    return r.lastIndexOf && !n && Array.isArray(r) ? r.lastIndexOf(t) : e.findLastIndex(e.eqTo(t, n), r)
  }, e.elem = function(t, r, n) {
    return -1 != e.elemIndex(t, r, n)
  }, e.all = function(e, t) {
    if (t.every && Array.isArray(t)) return t.every(e);
    for (var r = t.length, n = 0; r > n; n++)
      if (!e(t[n], n, t)) return !1;
    return !0
  }, e.any = function(e, t) {
    for (var r = t.length, n = !1, a = 0; r > a; a++)
      if (n = e(t[a], a, t)) return n;
    return n
  }, e.iter = function(r, n) {
    if (2 == arguments.length) {
      if (n.forEach && Array.isArray(n)) return n.forEach(r);
      for (var a = n.length, i = 0; a > i; i++) r(n[i], i, n)
    } else {
      arguments.length > 2 || e.err(err_iter_);
      for (var s = t.call(arguments, 1), a = e.applyF(Math.min, e.map(e("length"), s)), i = 0; a > i; i++) e.applyF(r, e.map(e(i), s).concat(i, s))
    }
  }, e.map = function(e, t) {
    if (t.map && Array.isArray(t)) return t.map(e);
    for (var r = t.length, n = new Array(r), a = 0; r > a; a++) n[a] = e(t[a], a, t);
    return n
  }, e.map1 = function(t, r) {
    return e.map(e(1, t), r)
  }, e.zipWith = function(t) {
    arguments.length > 1 || e.err(err_zipWith_);
    for (var r = [], n = 0;; n++) {
      for (var a = [], i = 1; i < arguments.length; i++) {
        var s = arguments[i];
        if (!(n < s.length)) return r;
        a.push(s[n])
      }
      r.push(e.applyF(t, a))
    }
    return r
  }, e.zip = e(e.zipWith, e.array), e.unzip = function(t) {
    return t.length ? e.applyF(e.zip, t) : []
  }, e.filter = function(t, r) {
    return r.filter && Array.isArray(r) ? r.filter(t) : e.fold(function(e, r, n, a) {
      return t(r, n, a) && e.push(r), e
    }, r, [])
  }, e.fold = function(t, r, n) {
    if (r.reduce && Array.isArray(r)) return arguments.length < 3 ? r.reduce(t) : r.reduce(t, n);
    var a = r.length,
      i = 0;
    for (arguments.length < 3 && (n = a ? r[i++] : e.err(err_fold_)); a > i; i++) n = t(n, r[i], i, r);
    return n
  }, e.foldR = function(t, r, n) {
    if (r.reduceRight && Array.isArray(r)) return arguments.length < 3 ? r.reduceRight(t) : r.reduceRight(t, n);
    var a = r.length;
    for (arguments.length < 3 && (n = a ? r[--a] : e.err(err_foldR_)); --a >= 0;) n = t(n, r[a], a, r);
    return n
  }, e.sum = function(e) {
    for (var t = e.length, r = 0, n = 0; t > n; n++) r += e[n];
    return r
  }, e.test = function(t) {
    if ((0 === t || "" === t) && (t = typeof t), "string" == typeof t) return function(e) {
      return typeof e == t
    };
    if (t === Array || t === Date || t === RegExp) return function(e) {
      return null != e && e.constructor == t
    };
    if (null === t) return e.eqTo(null);
    if (t.constructor == RegExp) return e("test", t);
    if ("function" == typeof t) return t;
    if (Array.isArray(t)) return 1 == t.length ? (t = e.test(t[0]), function(r) {
      return Array.isArray(r) && e.all(t, r)
    }) : (t = e.map(e.test, t), function(r) {
      return e.any(function(e) {
        return e(r)
      }, t)
    });
    if ("object" == typeof t) {
      var r = Object.keys(t),
        n = e.map(e.o(e.test, e(t)), r);
      return function(t) {
        return null != t && e.all(function(e, r) {
          return n[r](t[e])
        }, r)
      }
    }
    e.err(err_test_)
  }, e
}(),
F;
void 0 === F && (F = jsCurry), "object" == typeof module && (module.exports = jsCurry);
var jqMath = function() {
  function e(t, r, n) {
    return "number" == typeof t && (t = String(t)), "string" == typeof t || Array.isArray(t) ? e.sToMathE(t, r, n) : 1 == t.nodeType && "math" == t.tagName.toLowerCase() ? e.eToMathE(t) : void E.err(err_M_)
  }

  function t(t, r, n) {
    return null == r || ("string" == typeof r ? t.appendChild(t.ownerDocument.createTextNode(r)) : r.nodeType ? t.appendChild(r) : (r.constructor != Array && (r = E.slice(r)), E.iter(function(e) {
      t.appendChild(e)
    }, r))), e.setAttrs(t, n)
  }

  function r(r) {
    function n(t) {
      return i.createElementNS(e.mathmlNS, t)
    }
    if (e.MathML && !$) return r;
    var a = r.tagName.toLowerCase(),
        i = r.ownerDocument;
    if ("mi" == a) !r.getAttribute("mathvariant") && r.firstChild && 3 == r.firstChild.nodeType && r.setAttribute("mathvariant", 1 == r.firstChild.data.length ? "italic" : "normal");
    else if ("mo" == a) {
      if (1 == r.childNodes.length && 3 == r.firstChild.nodeType) {
        var s = r.firstChild.data;
        /^[\u2061-\u2064]$/.test(s) && e.addClass(r, "ma-non-marking")
      }
    } else if ("mspace" == a) e.webkitVersion && e.MathML && (r.style.display = "inline-block", r.style.minWidth = r.getAttribute("width") || "0px");
    else if ("menclose" == a) e.webkitVersion && e.MathML && e.addClass(r, "fm-menclose");
    else if ("mmultiscripts" == a && e.webkitVersion) {
      var o = E.slice(r.childNodes);
      if (0 == o.length) throw "Wrong number of <mmultiscripts> arguments: 0";
      for (var l = [o[0]], u = 1; u < o.length; u++)
        if ("mprescripts" != o[u].tagName) {
          if (u + 1 == o.length) throw "Missing argument in <mmultiscripts>";
          var m = [l[0], o[u], o[u + 1]];
          u++, l[0] = n("msubsup"), E.iter(function(e) {
            l[0].appendChild(e)
          }, m)
        } else l.unshift(n("none"));
      var f = r;
      r = t(n("mrow"), l, r.attributes), f.parentNode && f.parentNode.replaceChild(r, f)
    }
    var c = r.getAttribute("mathcolor"),
      p = r.getAttribute("href");
    if (c && r.style && (r.style.color = c), p && (!e.MathML || e.webkitVersion)) {
      var d = i.createElement("A"),
        h = r.parentNode,
        g = r.nextSibling;
      d.appendChild(r), d.href = p, r = d, h && h.insertBefore(r, g)
    }
    return r
  }

  function n(n, a, i, s) {
    s || (s = document);
    var o = e.MathPlayer ? s.createElement("m:" + n) : s.createElementNS(e.mathmlNS, n);
    return r(t(o, a, i))
  }

  function a(t, r, n, a) {
    if ("mo" == n.nodeName.toLowerCase() && 1 == n.childNodes.length) {
      var i = n.firstChild,
        s = i.data;
      if (3 == i.nodeType && (t > .9 || r > .9) && (e.prefix_[s] < 25 || e.postfix_[s] < 25 || -1 != "|‖√".indexOf(s) || a)) {
        var o = (t + r) / 1.2,
          l = "√" == s,
          u = (l ? .26 : .35) + ((l ? .15 : .25) - r) / o;
        n.style.fontSize = "1em", n.style.verticalAlign = "0.1em", n.fmUp = t, n.fmDn = r, n.style.display = "inline-block", n.style.transform = n.style.msTransform = n.style.MozTransform = n.style.WebkitTransform = "scaleY(2.5)"
      }
    }
  }

  function i(e, t, r) {
    var n = D("<span/>").append(r);
    return n[0].fmUp = e, n[0].fmDn = t, n[0].style.verticalAlign = (.5 * (e - t)).toFixed(3) + 0.2 + "em", n
  }

  function s(e, t) {
    E.iter(function(t) {
      var r = t[0];
      E.iter(function(t) {
        e[t] = r
      }, t[1].split(""))
    }, t)
  }

  function o(t, r, n) {
    return e.newMe(t, r, n, H)
  }

  function l() {
    return o("mspace")
  }

  function u(t) {
    var r = /\s*([-\w.]*)/g;
    r.lastIndex = e.re_.lastIndex;
    var n = r.exec(V);
    if (!n[1]) throw "Missing " + (t || "word");
    return e.re_.lastIndex = r.lastIndex, n[1]
  }

  function m(t) {
    var r = /\s*(?:(["'])|([-\w.]*))/g;
    r.lastIndex = e.re_.lastIndex;
    var n = r.exec(V);
    if (n[2]) return e.re_.lastIndex = r.lastIndex, n[2];
    if (!n[1]) throw "Missing " + (t || "string");
    var a = n[1],
      i = RegExp("[^\\`" + a + "]+|[\\`](.|\n)|(" + a + ")", "g"),
      s = "";
    for (i.lastIndex = r.lastIndex;;) {
      if (n = i.exec(V), !n) throw "Missing closing " + a;
      if (n[2]) break;
      s += n[1] || n[0]
    }
    return e.re_.lastIndex = i.lastIndex, s
  }

  function f(t) {
    var r = N();
    if (!r || !r[0]) throw "Missing expression argument" + (t ? " after " + t : "") + ", before position " + e.re_.lastIndex;
    return r
  }

  function c(e) {
    var t = m("mtext" == e ? "text" : e);
    return [o(e, t), "mo" == e ? t : null]
  }

  function p() {
    if (!e.trustHtml) throw "\\html use requires M.trustHtml";
    var t = m("html"),
      r = D("<div/>", H || document).css("display", "inline-block").html(t)[0];
    return 1 == r.childNodes.length && (r = r.childNodes[0]), [o("mtext", r), null]
  }

  function d() {
      var t = m("\\sp width");
      return [e.spaceMe(t, H), /^[^-]*[1-9]/.test(t) ? " " : null]
  }

  function h() {
    var t = N();
    if (t && "↖" == t[1] && !t[0]) {
      var r = P();
      if (t = r[1] || N(), !r[0] || !t || "}" != t[1] || t[0]) throw 'Expected an embellished operator and "}" after "{↖", before position ' + e.re_.lastIndex;
      return r[0]
    }
    var n = j(0, t);
    return t = n[1], !t || "}" == t[1] && !t[0] || E.err(err_braceScan_), [n[0] || l(), null]
  }

  function g(t, r) {
    t || (t = u("attribute name"));
    var n = m(t + " attribute"),
      a = f(t);
    return (!r || e.MathML) && a[0].setAttribute(t, n), a
  }

  function v() {
    var t = "CSS class name(s)",
      r = m(t),
      n = f(t);
    return e.addClass(n[0], r), n
  }

  function y(t) {
    var r = t || m("mathvariant"),
      n = f(r),
      a = n[0];
    if (!E.elem(e.mtagName(a), ["mi", "mn", "mo", "mtext", "mspace", "ms"])) throw "Can only apply a mathvariant to a MathML token (atomic) element, at position " + e.re_.lastIndex;
    return a.setAttribute("mathvariant", r), /bold/.test(r) ? e.addClass(a, "ma-bold") : ("normal" == r || "italic" == r) && e.addClass(a, "ma-nonbold"), e.addClass(a, /italic/.test(r) ? "ma-italic" : "ma-upright"), /double-struck/.test(r) ? e.addClass(a, "ma-double-struck") : /fraktur/.test(r) ? e.addClass(a, "ma-fraktur") : /script/.test(r) ? e.addClass(a, "ma-script") : /sans-serif/.test(r) && e.addClass(a, "ma-sans-serif"), n
  }

  function M(e) {
    e || (e = u("tagName"));
    var t = f({
      menclose: "enclose"
    }[e] || e);
    return [o(e, t[0]), E.elem(e, ["mstyle", "mpadded"]) ? t[1] : null]
  }

  function b(e) {
    var t = f(e);
    return E.iter(function(e) {
      e.disabled = !0
    }, D("input", t[0])), "vphantom" == e && (t[0] = o("mpadded", t[0], {
      width: "0",
      style: "display: inline-block; width: 0"
    })), [o("mphantom", t[0]), t[1]]
  }

  function _() {
    return [e.menclose(f("\\ov")[0], {
      notation: "top"
    }, H), null]
  }

  function x() {
    var t = m("minsize"),
      r = f("minsize"),
      n = r[0];
    if ("mo" != e.mtagName(n)) throw "Can only stretch an operator symbol, before position " + e.re_.lastIndex;
    if (e.MathML) n.setAttribute("minsize", t);
    else {
      var i = /^(.+)em$/.exec(t);
      i && (t = i[1]);
      var s = Number(t);
      s > 1 ? a(.6 * s, .6 * s, n, !0) : s || (n.style.fontSize = t)
    }
    return r
  }

  function w() {
    return [o("mrow", f("\\mrowOne")[0]), null]
  }

  function A() {
    function t(e) {
      return o("mtr", o("mtd", e))
    }
    var r = f("\\binom")[0],
      n = f("\\binom")[0],
      a = o("mtable", E.map(t, [r, n]));
    return e.addClass(a, "ma-binom"), e.MathML || (a.fmUp -= .41, a.fmDn -= .41), [o("mrow", [o("mo", "("), a, o("mo", ")")]), null]
  }

  function N() {
    for (var t = e.re_.exec(V); !t;) {
      if (e.re_.lastIndex = V.length, W == Q.length) return null;
      var r = Q[W++];
      if ("string" == typeof r) e.re_.lastIndex = 0, V = r, t = e.re_.exec(V);
      else {
        if (1 == r.nodeType) return [r, null];
        E.err(err_scanTokP_)
      }
    }
    var n = t[2] || t[0],
      a = null;
    if (/^[_^}\u2196\u2199]$/.test(t[0]) || t[2] && e.macro1s_[n]) return [null, n];
    if ("{" == t[0]) return h();
    if (t[2] && e.macros_[n]) return e.macros_[n]();
    if (t[1]) return [e.newMe("mn", n, H), null];
    if (/^[,:;!]$/.test(t[2])) n = " ";
    else if ("/" == t[2]) n = "∕";
    else if (e.alias_[n] && !t[2]) {
      var i = e.alias_[n];
      "string" == typeof i ? n = i : (n = i[0], a = i[1])
    }
    var s, l = e.infix_[n] || e.prefix_[n] || e.postfix_[n] ? n : null;
    if (" " == n) s = e.spaceMe(Z[t[2] || ","], H);
    else if (l) {
      if (/^[∛∜]$/.test(n) && !t[2]) return s = o("mn", "∛" == n ? "3" : "4"), [o("msup", [o("mo", "√"), s]), "√"];
      s = e.newMe("mo", n, H), /^[∀∃∄∂∇]$/.test(n) ? (s.setAttribute("lspace", ".11em"), s.setAttribute("rspace", ".06em")) : "!" == n ? (s.setAttribute("lspace", ".06em"), s.setAttribute("rspace", "0")) : "×" == n && (s.setAttribute("lspace", ".22em"), s.setAttribute("rspace", ".22em"))
    } else s = e.newMe("mi", n, H), t[2] && 1 == n.length ? (s.setAttribute("mathvariant", "normal"), e.addClass(s, "ma-upright"), e.MathML || (s.style.paddingRight = "0")) : a && (s.setAttribute("mathvariant", a), e.addClass(s, "ma-upright"), e.addClass(s, "ma-" + a)), /\w\w/.test(n) && e.addClass(s, "ma-repel-adj");
    return [s, l]
  }

  function C(t) {
    var r = j(e.infix_[","]),
      n = r[1] || N(),
      a = r[0];
    if (!a) {
      if (t && (!n || "," != n[1])) return [null, n];
      a = l()
    }
    var i = e.mtagName(a);
    return "mtd" == i || "mtr" == i && t || (a = e.newMe("mtd", a, H)), [a, n]
  }

  function k() {
    var t = m("rowspan"),
      r = C(),
      n = r[0];
    return n.setAttribute(e.MathML ? "rowspan" : "rowSpan", t), e.hasClass(n, "middle") || e.addClass(n, "middle"), r
  }

  function T() {
    var t = m("colspan"),
      r = C();
    return r[0].setAttribute(e.MathML ? "columnspan" : "colSpan", t), r
  }

  function L(t) {
    for (var r = [];;) {
      var n = C(0 == r.length),
        a = n[0],
        i = n[1] || N();
      if (a) {
        if ("mtr" == e.mtagName(a)) return [a, i];
        r.push(a)
      }
      if (!i || "," != i[1]) return [r.length || !t || i && ";" == i[1] ? e.newMe("mtr", r, H) : null, i]
    }
  }

  function S(t) {
    null == t && (t = e.dtableQ);
    for (var r = [];;) {
      var n = L(0 == r.length),
        a = n[0],
        i = n[1] || N();
      if (a && r.push(a), !i || ";" != i[1]) return [o("mtable", r, t ? {
        displaystyle: !0
      } : null), i]
    }
  }

  function I() {
    var t = j(0);
    return t[0] = e.newMe("math", t[0], H), t
  }

  function F(e) {
    var t = J[e];
    return t && (t.length < 4 ? "ss" : "uo")
  }

  function P(t, r) {
    for (;;) {
      if (r || (r = N()), !r || r[0] || !J[r[1]]) {
        if (r && !t) {
          t = r, r = null;
          continue
        }
        return [t, r]
      }
      var n = F(r[1]),
        a = function() {
          for (var e = {}, t = {};;) {
            if (r || (r = N()), !r || r[0]) break;
            var a = r[1];
            if (F(a) != n || t[a]) break;
            if (t[a] = !0, r = N(), !r || F(r[1]) != n || r[0]) {
              var i = j(999, r);
              e[a] = i[0], r = i[1]
            }
          }
          return e
        },
        i = a();
      if ("uo" == n || !r || (r[0] ? t : "ss" != F(r[1]))) {
        t || (t = [l(), null]);
        var s = "m",
          o = [t[0]];
        E.iter(function(e) {
          i[e] && (s += J[e], o.push(i[e]))
        }, ["_", "^", "↙", "↖"]), o.length > 1 && (t = [e.newMe(s, o, H), t[1]])
      } else {
        for (var u = [i]; r && !r[0] && "ss" == F(r[1]);) u.push(a());
        if (!t)
          if (r && r[0]) {
            t = r, r = N();
            for (var m = []; r && !r[0] && "ss" == F(r[1]);) m.push(a());
            u = m.concat(null, u)
          } else t = [l(), null];
        var o = [t[0]];
        E.iter(function(t) {
          t ? o.push(t._ || e.newMe("none", null, H), t["^"] || e.newMe("none", null, H)) : o.push(e.newMe("mprescripts", null, H))
        }, u), t = [e.newMe("mmultiscripts", o, H), t[1]]
      }
    }
  }

  function j(t, r) {
    for (var n = null;;) {
      if (!r && (r = N(), !r)) break;
      var a = r[1];
      if (!a || n && (r[0] ? !(e.infix_[a] || e.postfix_[a]) : e.macro1s_[a]))
        if (n) {
          if (t >= X) break;
          var i = j(X, r),
            s = i[0];
          s || E.err(err_parse_mxP_tokP_1_);
          var o = e.newMe("mrow", [n, s], H);
          (e.hasClass(n, "ma-repel-adj") || e.hasClass(s, "ma-repel-adj")) && (a && r[0] && e.prefix_[a] < 25 || D(n).after(e.spaceMe(".17em", H)), e.addClass(o, "ma-repel-adj")), n = o, r = i[1]
        } else n = r[0], r = null;
      else {
        var l = r[0];
        if (l) {
          var u = e.infix_[a] || e.postfix_[a];
          if (u && t >= u) break;
          var m = e.infix_[a] || !(n && e.postfix_[a]) && e.prefix_[a];
          !e.MathML && !n && m >= 290 && 350 >= m && (D(l).addClass("fm-large-op"), l.fmUp = .855, l.fmDn = .705);
          var f = P(r),
            c = [];
          f[0] || E.err(err_parse_mxP_tokP_embel_);
          var p = f[0][0];
          if (r = f[1], n && c.push(n), c.push(p), m) {
            var i = j(m, r);
            i[0] && c.push(i[0]), r = i[1], 25 > m && !n && (r || (r = N()), r && r[1] && r[0] && (e.postfix_[r[1]] || e.infix_[r[1]]) == m && (c.push(r[0]), r = null))
          }
          if (1 == c.length) n = c[0];
          else if ("/" == a && n && 3 == c.length || "√" == a && !n && 2 == c.length) "√" == a && "msup" == e.mtagName(c[0]) ? n = e.newMe("mroot", [c[1], e.mchilds(c[0])[1]], H) : (c.splice(c.length - 2, 1), n = e.newMe("/" == a ? "mfrac" : "msqrt", c, H));
          else {
            var o = e.newMe("mrow", c, H);
            if (" " == a || (u || m) >= X);
            else {
              var d = "";
              "=" == a ? d = "infix-loose" : 2 == c.length ? (d = n ? "postfix" : "prefix", e.infix_[a] ? d += "-tight" : (/^[∀∃∄∂∇]$/.test(a) && (d = "quantifier"), e.addClass(o, "ma-repel-adj"))) : n && (d = "," == a || ";" == a ? "separator" : 270 >= u ? "infix-loose" : "infix", "|" == a && e.MathML && "mo" == l.tagName && (l.setAttribute("lspace", ".11em"), l.setAttribute("rspace", ".11em"))), e.MathML || !d || l.style.fontSize || D(p).addClass("fm-" + d)
            }
            n = o
          }
        } else {
          if ("}" == a) break;
          if (e.macro1s_[a]) {
            !n || E.err(err_parse_mxP_tokP_macro_);
            var i = e.macro1s_[a]();
            n = i[0], r = i[1]
          } else {
            if (J[a] || E.err(err_parse_mxP_tokP_script_), t >= 999) break;
            var f = P(n && [n, null], r),
              h = f[0];
            h || E.err(err_parse_mxP_tokP_embel_2_), r = f[1];
            var c = [h[0]],
              g = h[1];
            if (g) {
              var m = e.infix_[g] || e.prefix_[g];
              if (m) {
                var i = j(m, r);
                i[0] && c.push(i[0]), r = i[1]
              }
            }
            n = 1 == c.length ? c[0] : e.newMe("mrow", c, H)
          }
        }
      }
    }
    return [n, r]
  }
  var D = jQuery,
    E = jsCurry;
  Math.sign || (Math.sign = function(e) {
    return e = Number(e), e > 0 ? 1 : 0 > e ? -1 : e
  }), Math.trunc || (Math.trunc = function(e) {
    return (0 > e ? Math.ceil : Math.floor)(e)
  }), e.toArray1 = function(e) {
    return Array.isArray(e) ? e : [e]
  }, e.getSpecAttrP = function(e, t) {
    var r = e.getAttributeNode(t);
    return r && r.specified !== !1 ? r.value : null
  }, e.objToAttrs = function(e) {
    var t = [];
    for (var r in e) t.push({
      name: r,
      value: e[r]
    });
    return t
  }, e.setAttrs = function(t, r) {
    return r && null == r.length && (r = e.objToAttrs(r)), E.iter(function(e) {
      e.specified !== !1 && t.setAttribute(e.name, e.value)
    }, r || []), t
  }, e.replaceNode = function(e, t) {
    return t.parentNode.replaceChild(e, t), e
  }, e.addClass = function(e, t) {
    if ("undefined" != typeof e.className) {
      var r = e.className;
      e.className = (r ? r + " " : "") + t
    } else {
      var r = e.getAttribute("class");
      e.setAttribute("class", (r ? r + " " : "") + t)
    }
    return e
  }, e.eToClassesS = function(e) {
    var t = "undefined" != typeof e.className ? e.className : e.getAttribute("class");
    return t || ""
  }, e.hasClass = function(t, r) {
    return -1 != (" " + e.eToClassesS(t) + " ").replace(/[\n\t]/g, " ").indexOf(" " + r + " ")
  }, e.inlineBlock = function() {
    var e = D("<div/>").css("display", "inline-block");
    return arguments.length && e.append.apply(e, arguments), e[0]
  }, e.tr$ = function() {
    function t(t) {
      return r.apply(D("<td/>"), e.toArray1(t))
    }
    var r = D.fn.append;
    return r.apply(D("<tr/>"), E.map(t, arguments))
  }, e.mathmlNS = "http://www.w3.org/1998/Math/MathML";
  var $ = !1;
  ! function() {
    var t = navigator.userAgent.toLowerCase(),
      r = t.match(/webkit[ \/](\d+)\.(\d+)/);
    r ? (e.webkitVersion = [Number(r[1]), Number(r[2])], $ = e.webkitVersion[0] <= 540) : (r = t.match(/(opera)(?:.*version)?[ \/]([\w.]+)/) || t.match(/(msie) ([\w.]+)/) || t.indexOf("compatible") < 0 && t.match(/(mozilla)(?:.*? rv:([\w.]+))?/), r && (e[r[1] + "Version"] = r[2] || "0"))
  }(), e.msieVersion && document.write('<object id=MathPlayer classid="clsid:32F66A20-7614-11D4-BD11-00104BD3F987">', '</object><?IMPORT namespace="m" implementation="#MathPlayer" ?>'),
    function() {
      if (self.location) {
        var t = location.search.match(/[?&;]mathml=(?:(off|false)|(on|true))\b/i);
        t ? e.MathML = !t[1] : (e.webkitVersion && E.cmpLex(E.cmpX, e.webkitVersion, [537, 17]) < 0 || e.operaVersion) && (e.MathML = !1)
      }
    }(), e.canMathML = function() {
      function t(e) {
        return e.setAttribute("display", "block"), D("<div/>").append(e)[0]
      }
      if (e.msieVersion && !e.MathPlayer) try {
        if (new ActiveXObject("MathPlayer.Factory.1"), null == e.MathPlayer) e.MathPlayer = !0;
        else if (!e.MathPlayer) return !1
      } catch (r) {
        e.MathPlayer = !1
      }
      if (!e.MathPlayer && "undefined" == typeof document.createElementNS) return !1;
      var a = n("math", n("mn", "1")),
          i = n("math", n("mfrac", [n("mn", "1"), n("mn", "2")])),
          s = D(E.map(t, [a, i]));
      s.css("visibility", "hidden").appendTo(document.body);
      var o = D(s[1]).height() > D(s[0]).height() + 2;
      return s.remove(), o
    }, e.mtagName = function(e) {
        return "A" == e.tagName && 1 == e.childNodes.length && (e = e.firstChild), e.getAttribute("mtagname") || e.tagName.toLowerCase().replace(/^m:/, "")
    }, e.mchilds = function(e) {
      function t(e) {
        return "SPAN" == e.tagName || E.err(err_span0_), e.firstChild
      }
      "A" == e.tagName && 1 == e.childNodes.length && (e = e.firstChild);
      for (var r = e.getAttribute("mtagname");
        "SPAN" == e.tagName;) e = e.firstChild;
      if ("TABLE" == e.tagName) {
        if (e = e.firstChild, "TBODY" == e.tagName || E.err(err_mchilds_tbody_), "mtable" == r) return e.childNodes;
        var n = e.childNodes;
        return "mover" == r ? n = [n[1], n[0]] : "munderover" == r && (n = [n[1], n[2], n[0]]), E.map(function(e) {
          return e.firstChild.firstChild
        }, n)
      }
      if ("MROW" == e.tagName && r) {
        var n = e.childNodes;
        if ("msqrt" == r) return [t(t(n[1]))];
        if ("mroot" == r) return [t(t(n[2])), t(n[0])];
        "mmultiscripts" == r || E.err(err_mchilds_mrow_);
        var a = Number(e.getAttribute("nprescripts"));
        a >= 0 && a < n.length && a % 2 == 0 || E.err(err_mchilds_mmultiscripts_);
        for (var i = [n[a]], s = a + 1; s < n.length; s++) i.push(t(n[s]));
        if (a) {
          i.push(e.ownerDocument.createElement("mprescripts"));
          for (var s = 0; a > s; s++) i.push(t(n[s]))
        }
        return i
      }
      return E.elem(e.tagName, ["MSUB", "MSUP", "MSUBSUP"]) ? E.map(function(e, r) {
        return r ? t(e) : e
      }, e.childNodes) : "MSPACE" == e.tagName ? [] : e.childNodes
    };
  var O = ["mn", "mi", "mo", "mtext", "mspace", "ms"],
      z = ["fmath", "msqrt", "mtd", "mstyle", "merror", "mpadded", "mphantom", "menclose"],
      R = {
          "¯": [0, .85],
          "‾": [0, .85],
          "˙": [0, .75],
          "ˇ": [0, .7],
          "^": [0, .5],
          "~": [0, .4],
          "→": [.25, .25],
          _: [.7, 0],
          "−": [.25, .45],
          ".": [.6, .1]
      };
  e.newMe = function(s, o, l, u) {
    if (u || (l && 9 == l.nodeType ? (u = l, l = null) : u = document), null != e.MathML || E.err(err_newMe_MathML_), e.MathML) return n(s, o, l, u);
    "math" == s && (s = "fmath");
    var m = D(t(u.createElement(s.toUpperCase()), o)),
      f = E.slice(m[0].childNodes);
    E.elem(s, z) && 1 != f.length && (f = [e.newMe("mrow", f, null, u)], 0 == m[0].childNodes.length || E.err(err_newMe_imp_mrow_), m.append(f[0]));
    var c = E.map(function(e) {
        return Number(e.fmUp || .6)
      }, f),
      p = E.map(function(e) {
        return Number(e.fmDn || .6)
      }, f);
    if ("fmath" == s || "mn" == s || "mtext" == s || "mprescripts" == s || "none" == s);
    else if ("mstyle" == s || "merror" == s || "mpadded" == s || "mphantom" == s || "menclose" == s) f[0].fmUp && (m[0].fmUp = f[0].fmUp), f[0].fmDn && (m[0].fmDn = f[0].fmDn);
    else if ("mi" == s) {
      var d = 1 == f.length ? f[0] : {};
      3 == d.nodeType && 1 == d.data.length && (m.addClass("fm-mi-length-1"), -1 != "EFHIJKMNTUVWXYZdfl".indexOf(d.data) && m.css("padding-right", "0.44ex"))
    } else if ("mo" == s) {
      var d = 1 == f.length ? f[0] : {};
      3 == d.nodeType && /[\]|([{‖)}]/.test(d.data) && m.addClass("fm-mo-Luc")
    } else if ("mspace" == s) {
      var h = e.setAttrs(m[0], l);
      l = null, h.style.marginRight = h.getAttribute("width") || "0px", h.style.paddingRight = "0.001em", m.append("‌"), m.css("visibility", "hidden")
    } else if ("mrow" == s) {
      var g = E.applyF(Math.max, c),
        v = E.applyF(Math.max, p);
      (g > .65 || v > .65) && (m[0].fmUp = g, m[0].fmDn = v, E.iter(E([g, v, E._, null], a), f))
    } else if ("mfrac" == s) {
      if (2 != f.length) throw "Wrong number of <mfrac> arguments: " + f.length;
      var y = D('<td class="fm-num-frac fm-inline"></td>', u).append(f[0]),
        M = D('<td class="fm-den-frac fm-inline"></td>', u).append(f[1]);
      m = i(c[0] + p[0] + .03, c[1] + p[1] + .03, D('<span class="fm-vert fm-frac"></span>', u).append(D("<table/>", u).append(D("<tbody/>", u).append(D("<tr/>", u).append(y)).append(D("<tr/>", u).append(M))))).attr("mtagname", s)
    } else if ("msqrt" == s || "mroot" == s) {
      if (f.length != ("msqrt" == s ? 1 : 2)) throw "Wrong number of <" + s + "> arguments: " + f.length;
      m = D("<mrow/>", u).attr("mtagname", s);
      var b = .06 * (c[0] + p[0]),
        g = c[0] + b + .1,
        v = p[0];
      if ("mroot" == s) {
        var _ = .6 * (c[1] + p[1]),
          x = .25 / .6 - .25;
        g > _ ? x += g / .6 - c[1] : (x += p[1], g = _), m.append(D('<span class="fm-root fm-inline"></span>', u).append(f[1]).css("verticalAlign", x.toFixed(2) + "em"))
      }
      var w = D("<mo/>", u).addClass("fm-radic").append("√"),
        A = i(g, v, D('<span class="fm-vert fm-radicand"></span>', u).append(f[0]).css("borderTopWidth", "1px"));
      a(g, v, w[0]), m.append(w).append(A), m[0].fmUp = g, m[0].fmDn = v
    } else if ("msub" == s || "msup" == s || "msubsup" == s || "mmultiscripts" == s) {
      if ("mmultiscripts" != s && f.length != ("msubsup" == s ? 3 : 2)) throw "Wrong number of <" + s + "> arguments: " + f.length;
      for (var g = c[0], v = p[0], N = "msup" == s, C = g / .71 - .6, k = v / .71 - .6, T = 1; T < f.length; T++) {
        if ("mmultiscripts" == s) {
          var L = e.mtagName(f[T]);
          if ("none" == L) continue;
          if ("mprescripts" == L) {
            if (N) throw 'Repeated "mprescripts"';
            N = !0;
            continue
          }
        }
        T % 2 == (N ? 0 : 1) ? k = Math.max(k, c[T]) : C = Math.max(C, p[T])
      }
      for (var S = null, I = [], F = 0, T = 1; T < f.length; T++) {
        if ("mmultiscripts" == s) {
          var L = e.mtagName(f[T]);
          if ("mprescripts" == L) {
            S = [], F = f.length - T - 1;
            continue
          }
        }
        var x = .25 / .71 - .25;
        T % 2 == (S ? 0 : 1) && "msup" != s ? (x -= k, v = Math.max(v, .71 * (k + p[T]))) : (x += C, g = Math.max(g, .71 * (C + c[T]))), D(f[T]).wrap('<span class="fm-script fm-inline"></span>').parent().css("verticalAlign", x.toFixed(2) + "em"), e.msieVersion && (document.documentMode || e.msieVersion) < 8 && (f[T].style.zoom = 1), "mmultiscripts" == s && (S || I).push(f[T].parentNode)
      }
      "mmultiscripts" == s && (m = D("<mrow/>").append(D((S || []).concat(f[0], I))).attr({
        mtagname: "mmultiscripts",
        nprescripts: F
      })), m[0].fmUp = g, m[0].fmDn = v
    } else if ("munder" == s || "mover" == s || "munderover" == s) {
      if (f.length != ("munderover" == s ? 3 : 2)) throw "Wrong number of <" + s + "> arguments: " + f.length;
      var P, j = D("<tbody/>", u),
          g = .85 * c[0],
          v = .85 * p[0];
      if ("munder" != s) {
        var $ = f[f.length - 1],
            O = null;
        if (P = D("<td/>", u).append($), "MO" == $.nodeName && 1 == $.childNodes.length) {
          var d = $.firstChild;
          3 == d.nodeType && (O = R[d.data])
        }
        O ? ($.style.display = "block", $.style.marginTop = (-O[0]).toFixed(2) + "em", $.style.marginBottom = (-O[1]).toFixed(2) + "em", g += 1.2 - E.sum(O)) : (P.addClass("fm-script fm-inline"), g += .71 * (c[f.length - 1] + p[f.length - 1])), j.append(D("<tr/>", u).append(P))
      }
      if ("MI" == f[0].nodeName && 1 == f[0].childNodes.length) {
        var d = f[0].firstChild,
            U = d.data;
        if (3 == d.nodeType && 1 == U.length) {
          var x = -1 != "acegmnopqrsuvwxyz".indexOf(U) ? .25 : "t" == U ? .15 : 0;
          x && (f[0].style.display = "block", f[0].style.marginTop = (-x).toFixed(2) + "em", g -= x)
        }
      }
      P = D('<td class="fm-underover-base"></td>', u).append(f[0]), j.append(D("<tr/>", u).append(P)), "mover" != s && (P = D('<td class="fm-script fm-inline"></td>', u).append(f[1]), j.append(D("<tr/>", u).append(P)), v += .71 * (c[1] + p[1])), m = i(g, v, D('<span class="fm-vert"></span>', u).append(D("<table/>", u).append(j))).attr("mtagname", s)
    } else if ("mtable" == s) {
      var j = D("<tbody/>", u).append(D(f));
      m = D('<span class="fm-vert" mtagname="mtable"></span>', u).append(D("<table/>", u).append(j));
      var q = E.sum(c) + E.sum(p);
      m[0].fmUp = m[0].fmDn = .5 * q
    } else if ("mtr" == s) {
      m = D('<tr class="fm-mtr" mtagname="mtr"></tr>', u).append(D(f));
      var g = .6,
          v = .6;
      E.iter(function(t, r) {
        1 == (t.getAttribute(e.MathML ? "rowspan" : "rowSpan") || 1) && (g = Math.max(g, c[r]), v = Math.max(v, p[r]))
      }, f), m[0].fmUp = g + .25, m[0].fmDn = v + .25
    } else {
      if ("mtd" != s) {
        if ("mfenced" == s) {
          var h = e.setAttrs(m[0], l);
          return e.newMe("mrow", e.mfencedToMRowArgs(h), l, u)
        }
        throw "Unrecognized or unimplemented MathML tagName: " + s
      }
      m = D('<td class="fm-mtd" mtagname="mtd"></td>', u).append(D(f)), c[0] > .65 && (m[0].fmUp = c[0]), p[0] > .65 && (m[0].fmDn = p[0]);
      var h = e.setAttrs(m[0], l);
      l = null;
      var B = h.getAttribute("rowspan"),
          V = h.getAttribute("columnspan");
      B && (h.setAttribute("rowSpan", B), e.hasClass(h, "middle") || e.addClass(h, "middle")), V && h.setAttribute("colSpan", V)
    }
    return r(e.setAttrs(m[0], l))
  }, e.mfencedToMRowArgs = function(t) {
    function r(t) {
      return e.newMe("mo", t, null, n)
    }
    "mfenced" == t.tagName.toLowerCase() || E.err(err_mfencedToMRowArgs_);
    var n = t.ownerDocument,
        a = e.getSpecAttrP(t, "open"),
        i = e.getSpecAttrP(t, "close"),
        s = [r(null == a ? "(" : a), r(null == i ? ")" : i)],
        o = E.slice(t.childNodes);
    if (0 == o.length) return s;
    var l;
    if (1 == o.length) l = o[0];
    else {
      for (var u = e.getSpecAttrP(t, "separators"), m = (null == u ? "," : u).match(/\S/g), f = m ? o.length - 1 : 0, c = 0; f > c; c++) o.splice(2 * c + 1, 0, r(m[Math.min(c, m.length - 1)]));
      l = e.newMe("mrow", o, null, n)
    }
    return s.splice(1, 0, l), s
  }, e.spaceMe = function(t, r) {
    return e.newMe("mspace", null, {
      width: t
    }, r)
  }, e.fenceMe = function(t, r, n, a) {
    return e.newMe("mrow", [e.newMe("mo", null == r ? "(" : r, a), t, e.newMe("mo", null == n ? ")" : n, a)], a)
  }, E.iter(function(t) {
    e[t] = E(e.newMe, t)
  }, ["mn", "mi", "mo", "mtext", "mspace", "mrow", "mfenced", "mfrac", "msqrt", "mroot", "msub", "msup", "msubsup", "mmultiscripts", "mprescripts", "none", "munder", "mover", "munderover", "mtable", "mtr", "mtd", "mstyle", "merror", "mpadded", "mphantom", "menclose"]), e.setMathBlockQ = function(t, r) {
    return r ? (t.setAttribute("display", "block"), e.addClass(t, "ma-block")) : e.MathML || D(t).addClass("fm-inline"), t
  }, e.math = function(t, r, n) {
    return e.setMathBlockQ(e.newMe("math", t, n), r)
  }, e.eToMathE = function(t) {
    function n(e) {
      return 1 != e.nodeType ? e : (E.elem(e.tagName, O) || E.iter(n, e.childNodes), r(e))
    }

    function a(t) {
      function r(r) {
        return 3 == r.nodeType ? /^\s*$/.test(r.data) ? [] : [e.mtext(r.data, i)] : 8 == r.nodeType ? [] : (1 == t.nodeType || E.err(err_newMeDeep_), [a(r)])
      }
      var n = t.tagName.toLowerCase(),
          s = t.childNodes;
      E.elem(n, O) ? "mo" == n && 1 == s.length && 3 == s[0].nodeType && "-" == s[0].data && (s = e["-"]) : s = E.concatMap(r, s);
      var o = e.newMe(n, s, t.attributes, i);
      return "math" == n && e.setMathBlockQ(o, "block" == t.getAttribute("display")), o
    }
    if ((null == e.MathML || "math" != t.tagName.toLowerCase()) && E.err(err_eToMathE_), e.MathML && "math" == t.tagName) return $ ? n(t) : t;
    var i = t.ownerDocument;
    return a(t)
  }, e["-"] = "−", e.trimNumS = function(e) {
    return e.replace(/(\d\.\d*?)0+(?!\d)/g, "$1").replace(/(\d)\.(?!\d)/g, "$1").replace(/[-\u2212]0(?![.\d])/g, "0")
  }, e.numS = function(t, r) {
    return r && (t = e.trimNumS(t)), t.replace(/Infinity/gi, "∞").replace(/NaN/gi, "{?}").replace(/e(-\d+)/gi, "·10^{$1}").replace(/e\+?(\d+)/gi, "·10^$1").replace(/-/g, e["-"])
  }, e.combiningChar_ = "[̀-ͯ᷀-᷿⃐-⃿︠-︯]", e.surrPair_ = "[�-�][�-�]";
  var U, q = "[\\\\`]([A-Za-z]+|.)";
  e.decimalComma = function(t) {
    if (null != t) {
      U = t;
      var r = (t ? "\\d*,\\d+|" : "") + "\\d+\\.?\\d*|\\.\\d+";
      e.re_ = RegExp("(" + r + ")|" + q + "|" + e.surrPair_ + "|\\S" + e.combiningChar_ + "*", "g")
    }
    return U
  };
  var B = "af|an|ar|av|az|ba|be|bg|bs|ca|ce|co|cs|cu|cv|da|de|el|es|et|eu|fi|fo|fr|gl|hr|hu|hy|id|is|it|jv|kk|kl|kv|lb|lt|lv|mk|mn|mo|nl|no|os|pl|pt|ro|ru|sc|sk|sq|sr|su|sv|tr|tt|ug|uk|vi|yi";
  e.decimalComma(RegExp("^(" + B + ")\\b", "i").test(document.documentElement.lang)), e.infix_ = {
    "⊂⃒": 240,
    "⊃⃒": 240,
    "≪̸": 260,
    "≫̸": 260,
    "⪯̸": 260,
    "⪰̸": 260,
    "∽̱": 265,
    "≂̸": 265,
    "≎̸": 265,
    "≏̸": 265,
    "≦̸": 265,
    "≿̸": 265,
    "⊏̸": 265,
    "⊐̸": 265,
    "⧏̸": 265,
    "⧐̸": 265,
    "⩽̸": 265,
    "⩾̸": 265,
    "⪡̸": 265,
    "⪢̸": 265,
    " ": 390,
    "": 500
  }, e.prefix_ = {}, e.postfix_ = {}, s(e.infix_, [
    [21, "|"],
    [30, ";"],
    [40, ",⁣"],
    [70, "∴∵"],
    [100, ":"],
    [110, "϶"],
    [150, "…⋮⋯⋱"],
    [160, "∋"],
    [170, "⊢⊣⊤⊨⊩⊬⊭⊮⊯"],
    [190, "∨"],
    [200, "∧"],
    [240, "∁∈∉∌⊂⊃⊄⊅⊆⊇⊈⊉⊊⊋"],
    [241, "≤"],
    [242, "≥"],
    [243, ">"],
    [244, "≯"],
    [245, "<"],
    [246, "≮"],
    [247, "≈"],
    [250, "∼≉"],
    [252, "≢"],
    [255, "≠"],
    [260, "=∝∤∥∦≁≃≄≅≆≇≍≔≗≙≚≜≟≡≨≩≪≫≭≰≱≺≻≼≽⊀⊁⊥⊴⊵⋉⋊⋋⋌⋔⋖⋗⋘⋙⋪⋫⋬⋭■□▪▫▭▮▯▰▱△▴▵▶▷▸▹▼▽▾▿◀◁◂◃◄◅◆◇◈◉◌◍◎●◖◗◦⧀⧁⧣⧤⧥⧦⧳⪇⪈⪯⪰"],
    [265, "⁄∆∊∍∎∕∗∘∙∟∣∶∷∸∹∺∻∽∾∿≂≊≋≌≎≏≐≑≒≓≕≖≘≝≞≣≦≧≬≲≳≴≵≶≷≸≹≾≿⊌⊍⊎⊏⊐⊑⊒⊓⊔⊚⊛⊜⊝⊦⊧⊪⊫⊰⊱⊲⊳⊶⊷⊹⊺⊻⊼⊽⊾⊿⋄⋆⋇⋈⋍⋎⋏⋐⋑⋒⋓⋕⋚⋛⋜⋝⋞⋟⋠⋡⋢⋣⋤⋥⋦⋧⋨⋩⋰⋲⋳⋴⋵⋶⋷⋸⋹⋺⋻⋼⋽⋾⋿▲❘⦁⦂⦠⦡⦢⦣⦤⦥⦦⦧⦨⦩⦪⦫⦬⦭⦮⦯⦰⦱⦲⦳⦴⦵⦶⦷⦸⦹⦺⦻⦼⦽⦾⦿⧂⧃⧄⧅⧆⧇⧈⧉⧊⧋⧌⧍⧎⧏⧐⧑⧒⧓⧔⧕⧖⧗⧘⧙⧛⧜⧝⧞⧠⧡⧢⧧⧨⧩⧪⧫⧬⧭⧮⧰⧱⧲⧵⧶⧷⧸⧹⧺⧻⧾⧿⨝⨞⨟⨠⨡⨢⨣⨤⨥⨦⨧⨨⨩⨪⨫⨬⨭⨮⨰⨱⨲⨳⨴⨵⨶⨷⨸⨹⨺⨻⨼⨽⨾⩀⩁⩂⩃⩄⩅⩆⩇⩈⩉⩊⩋⩌⩍⩎⩏⩐⩑⩒⩓⩔⩕⩖⩗⩘⩙⩚⩛⩜⩝⩞⩟⩠⩡⩢⩣⩤⩥⩦⩧⩨⩩⩪⩫⩬⩭⩮⩯⩰⩱⩲⩳⩴⩵⩶⩷⩸⩹⩺⩻⩼⩽⩾⩿⪀⪁⪂⪃⪄⪅⪆⪉⪊⪋⪌⪍⪎⪏⪐⪑⪒⪓⪔⪕⪖⪗⪘⪙⪚⪛⪜⪝⪞⪟⪠⪡⪢⪣⪤⪥⪦⪧⪨⪩⪪⪫⪬⪭⪮⪱⪲⪳⪴⪵⪶⪷⪸⪹⪺⪻⪼⪽⪾⪿⫀⫁⫂⫃⫄⫅⫆⫇⫈⫉⫊⫋⫌⫍⫎⫏⫐⫑⫒⫓⫔⫕⫖⫗⫘⫙⫚⫛⫝⫝⫞⫟⫠⫡⫢⫣⫤⫥⫦⫧⫨⫩⫪⫫⫬⫭⫮⫯⫰⫱⫲⫳⫴⫵⫶⫷⫸⫹⫺⫻⫽⫾"],
    [270, "←↑→↓↔↕↖↗↘↙↚↛↜↝↞↟↠↡↢↣↤↥↦↧↨↩↪↫↬↭↮↯↰↱↲↳↴↵↶↷↸↹↺↻↼↽↾↿⇀⇁⇂⇃⇄⇅⇆⇇⇈⇉⇊⇋⇌⇍⇎⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇚⇛⇜⇝⇞⇟⇠⇡⇢⇣⇤⇥⇦⇧⇨⇩⇪⇫⇬⇭⇮⇯⇰⇱⇲⇳⇴⇵⇶⇷⇸⇹⇺⇻⇼⇽⇾⇿⊸⟰⟱⟵⟶⟷⟸⟹⟺⟻⟼⟽⟾⟿⤀⤁⤂⤃⤄⤅⤆⤇⤈⤉⤊⤋⤌⤍⤎⤏⤐⤑⤒⤓⤔⤕⤖⤗⤘⤙⤚⤛⤜⤝⤞⤟⤠⤡⤢⤣⤤⤥⤦⤧⤨⤩⤪⤫⤬⤭⤮⤯⤰⤱⤲⤳⤴⤵⤶⤷⤸⤹⤺⤻⤼⤽⤾⤿⥀⥁⥂⥃⥄⥅⥆⥇⥈⥉⥊⥋⥌⥍⥎⥏⥐⥑⥒⥓⥔⥕⥖⥗⥘⥙⥚⥛⥜⥝⥞⥟⥠⥡⥢⥣⥤⥥⥦⥧⥨⥩⥪⥫⥬⥭⥮⥯⥰⥱⥲⥳⥴⥵⥶⥷⥸⥹⥺⥻⥼⥽⥾⥿⦙⦚⦛⦜⦝⦞⦟⧟⧯⧴⭅⭆"],
    [275, "+-±−∓∔⊞⊟"],
    [300, "⊕⊖⊘"],
    [340, "≀"],
    [350, "∩∪"],
    [390, "*.×•⁢⊠⊡⋅⨯⨿"],
    [400, "·"],
    [410, "⊗"],
    [640, "%"],
    [650, "\\∖"],
    [660, "/÷"],
    [710, "⊙"],
    [825, "@"],
    [835, "?"],
    [850, "⁡"],
    [880, "^_⁤"]
  ]), s(e.prefix_, [
    [10, "‘“"],
    [20, "([{‖⌈⌊❲⟦⟨⟪⟬⟮⦀⦃⦅⦇⦉⦋⦍⦏⦑⦓⦕⦗⧼"],
    [230, "∀∃∄"],
    [290, "∑⨊⨋"],
    [300, "∬∭⨁"],
    [310, "∫∮∯∰∱∲∳⨌⨍⨎⨏⨐⨑⨒⨓⨔⨕⨖⨗⨘⨙⨚⨛⨜"],
    [320, "⋃⨃⨄"],
    [330, "⋀⋁⋂⨀⨂⨅⨆⨇⨈⨉⫼⫿"],
    [350, "∏∐"],
    [670, "∠∡∢"],
    [680, "¬"],
    [740, "∂∇"],
    [845, "ⅅⅆ√∛∜"]
  ]), s(e.postfix_, [
    [10, "’”"],
    [20, ")]}‖⌉⌋❳⟧⟩⟫⟭⟯⦀⦄⦆⦈⦊⦌⦎⦐⦒⦔⦖⦘⧽"],
    [800, "′♭♮♯"],
    [810, "!"],
    [880, "&'`~¨¯°´¸ˆˇˉˊˋˍ˘˙˚˜˝˷̂̑‾⃛⃜⎴⎵⏜⏝⏞⏟⏠⏡"]
  ]);
  var V, Q, W, H, X;
  e.macros_ = {
    mn: E(c, "mn"),
    mi: E(c, "mi"),
    mo: E(c, "mo"),
    text: E(c, "mtext"),
    html: p,
    sp: d,
    attr: g,
    attrMML: E(g, null, !0),
    id: E(g, "id"),
    dir: E(g, "dir"),
    cl: v,
    mv: y,
    bo: E(y, "bold"),
    it: E(y, "italic"),
    bi: E(y, "bold-italic"),
    sc: E(y, "script"),
    bs: E(y, "bold-script"),
    fr: E(y, "fraktur"),
    ds: E(y, "double-struck"),
    bf: E(y, "bold-fraktur"),
    mstyle: E(M, "mstyle"),
    merror: E(M, "merror"),
    mpadded: E(M, "mpadded"),
    phantom: E(b, "phantom"),
    vphantom: E(b, "vphantom"),
    enclose: E(M, "menclose"),
    ov: _,
    minsize: x,
    mrowOne: w,
    binom: A
  }, e.alias_ = {
    "-": e["-"],
    "'": "′",
    "ℭ": ["C", "fraktur"],
    "ℌ": ["H", "fraktur"],
    "ℑ": ["I", "fraktur"],
    "ℜ": ["R", "fraktur"],
    "ℨ": ["Z", "fraktur"],
    "ℬ": ["B", "script"],
    "ℰ": ["E", "script"],
    "ℱ": ["F", "script"],
    "ℋ": ["H", "script"],
    "ℐ": ["I", "script"],
    "ℒ": ["L", "script"],
    "ℳ": ["M", "script"],
    "ℛ": ["R", "script"],
    "ℯ": ["e", "script"],
    "ℊ": ["g", "script"],
    "ℴ": ["o", "script"]
  };
  var Z = {
    ",": ".17em",
    ":": ".22em",
    ";": ".28em",
    "!": "-.17em"
  };
  e.dtableQ = !1, e.macro1s_ = {
    mtd: C,
    rowspan: k,
    colspan: T,
    mtr: L,
    dtable: E(S, !0),
    ttable: E(S, !1),
    table: E(S, null),
    math: I
  };
  var J = {
    _: "sub",
    "^": "sup",
    "↙": "under",
    "↖": "over"
  };
  return e.sMxAToMe = function(t, r) {
    r || (r = document), e.infix_[""] && e.infix_[","] || E.err(err_sToMe_1_), null == e.MathML && (e.MathML = e.canMathML()), e.re_.lastIndex = 0, V = "", Q = Array.isArray(t) ? t : [t], W = 0, H = r, X = e.infix_[""];
    var n = j(0);
    if (n[1]) throw "Extra input:  " + n[1][1] + V.substring(e.re_.lastIndex) + (W < Q.length ? "..." : "");
    return (e.re_.lastIndex < V.length || W < Q.length) && E.err(err_sToMe_2_), n[0] || l()
  }, e.sToMathE = function(t, r, n) {
    var a = e.sMxAToMe(t, n);
    return E.elem(e.mtagName(a), ["math", "fmath"]) || (a = e.newMe("math", a, n)), "string" == typeof t && a.setAttribute("alttext", t), e.setMathBlockQ(a, r)
  }, e.$mathQ = !0, e.inline$$Q = !1, e.parseMath = function(t) {
    if (1 == t.nodeType && "SCRIPT" != t.tagName)
      if ("MATH" == t.tagName.toUpperCase()) {
        var r = e.eToMathE(t);
        r != t && t.parentNode.replaceChild(r, t)
      } else
        for (var n = t.firstChild; n;) {
          var a = n.nextSibling;
          e.parseMath(n), n = a
        } else if (3 == t.nodeType && /[$\\]/.test(t.data)) {
          for (var i = t.ownerDocument, s = t.data, o = [], l = "", u = /\\([$\\])|\$\$?|\\[([]/g;;) {
            var m = u.lastIndex,
                f = u.exec(s),
                c = f ? f.index : s.length;
            if (c > m && (l += s.substring(m, c)), f && f[1]) l += f[1];
            else {
              var p, d = -1;
              if (f) {
                if (p = "\\(" == f[0] ? "\\)" : "\\[" == f[0] ? "\\]" : f[0], u.lastIndex < s.length && ("$" != f[0] || e.$mathQ))
                  for (d = s.indexOf(p, u.lastIndex); - 1 != d && "\\" == s.charAt(d - 1);) d = s.indexOf(p, d + 1);
                if (-1 == d) {
                  l += f[0];
                  continue
                }
              }
              if (l && (o.push(i.createTextNode(l)), l = ""), !f) break;
              var h = "$$" == f[0] || "\\[" == f[0],
                  g = e.sToMathE(s.substring(u.lastIndex, d), h, i);
              if (h && e.inline$$Q && E.elem(t.parentNode.nodeName, ["P", "SPAN"])) {
                var v = D("<div/>", i).css("display", "inline-block").append(g);
                v = D("<span/>", i).css("white-space", "nowrap").append(v), g = v[0]
              }
              o.push(g), u.lastIndex = d + p.length
            }
          }
          E.iter(function(e) {
            t.parentNode.insertBefore(e, t)
          }, o), t.parentNode.removeChild(t)
        }
  }, e.parseMathQ = !0, D(function() {
    if (null == e.MathML && (e.MathML = e.canMathML()), e.parseMathQ) try {
      e.parseMath(document.body)
    } catch (t) {
      alert(t)
    }
  }), null == D.fn.parseMath && (D.fn.parseMath = function() {
    return E.iter(e.parseMath, this), this
  }), e
}(),
M;
void 0 === M && (M = jqMath);