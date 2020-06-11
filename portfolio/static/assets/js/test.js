function i(e)
{
    return getComputedStyle(e)
}

function r(e, t)
{
    for (var n in t)
    {
        var i = t[n];
        "number" == typeof i && (i += "px"), e.style[n] = i
    }
    return e
}

function a(e)
{
    var t = document.createElement("div");
    return t.className = e, t
}
var o = "undefined" != typeof Element && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);

function l(e, t)
{
    if (!o) throw new Error("No element matching method supported");
    return o.call(e, t)
}

function s(e)
{
    e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e)
}

function d(e, t)
{
    return Array.prototype.filter.call(e.children, function (e)
    {
        return l(e, t)
    })
}
var u = {
        main: "ps",
        element:
        {
            thumb: function (e)
            {
                return "ps__thumb-" + e
            },
            rail: function (e)
            {
                return "ps__rail-" + e
            },
            consuming: "ps__child--consume"
        },
        state:
        {
            focus: "ps--focus",
            clicking: "ps--clicking",
            active: function (e)
            {
                return "ps--active-" + e
            },
            scrolling: function (e)
            {
                return "ps--scrolling-" + e
            }
        }
    },
    c = {
        x: null,
        y: null
    };

function h(e, t)
{
    var n = e.element.classList,
        i = u.state.scrolling(t);
    n.contains(i) ? clearTimeout(c[t]) : n.add(i)
}

function p(e, t)
{
    c[t] = setTimeout(function ()
    {
        return e.isAlive && e.element.classList.remove(u.state.scrolling(t))
    }, e.settings.scrollingThreshold)
}
var f = function (e)
    {
        this.element = e, this.handlers = {}
    },
    m = {
        isEmpty:
        {
            configurable: !0
        }
    };
f.prototype.bind = function (e, t)
{
    void 0 === this.handlers[e] && (this.handlers[e] = []), this.handlers[e].push(t), this.element.addEventListener(e, t, !1)
}, f.prototype.unbind = function (e, t)
{
    var n = this;
    this.handlers[e] = this.handlers[e].filter(function (i)
    {
        return !(!t || i === t) || (n.element.removeEventListener(e, i, !1), !1)
    })
}, f.prototype.unbindAll = function ()
{
    for (var e in this.handlers) this.unbind(e)
}, m.isEmpty.get = function ()
{
    var e = this;
    return Object.keys(this.handlers).every(function (t)
    {
        return 0 === e.handlers[t].length
    })
}, Object.defineProperties(f.prototype, m);
var g = function ()
{
    this.eventElements = []
};

function _(e)
{
    if ("function" == typeof window.CustomEvent) return new CustomEvent(e);
    var t = document.createEvent("CustomEvent");
    return t.initCustomEvent(e, !1, !1, void 0), t
}
g.prototype.eventElement = function (e)
{
    var t = this.eventElements.filter(function (t)
    {
        return t.element === e
    })[0];
    return t || (t = new f(e), this.eventElements.push(t)), t
}, g.prototype.bind = function (e, t, n)
{
    this.eventElement(e).bind(t, n)
}, g.prototype.unbind = function (e, t, n)
{
    var i = this.eventElement(e);
    i.unbind(t, n), i.isEmpty && this.eventElements.splice(this.eventElements.indexOf(i), 1)
}, g.prototype.unbindAll = function ()
{
    this.eventElements.forEach(function (e)
    {
        return e.unbindAll()
    }), this.eventElements = []
}, g.prototype.once = function (e, t, n)
{
    var i = this.eventElement(e),
        r = function (e)
        {
            i.unbind(t, r), n(e)
        };
    i.bind(t, r)
};
var y = function (e, t, n, i, r)
{
    var a;
    if (void 0 === i && (i = !0), void 0 === r && (r = !1), "top" === t) a = ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"];
    else
    {
        if ("left" !== t) throw new Error("A proper axis should be provided");
        a = ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"]
    }! function (e, t, n, i, r)
    {
        var a = n[0],
            o = n[1],
            l = n[2],
            s = n[3],
            d = n[4],
            u = n[5];
        void 0 === i && (i = !0);
        void 0 === r && (r = !1);
        var c = e.element;
        e.reach[s] = null, c[l] < 1 && (e.reach[s] = "start");
        c[l] > e[a] - e[o] - 1 && (e.reach[s] = "end");
        t && (c.dispatchEvent(_("ps-scroll-" + s)), t < 0 ? c.dispatchEvent(_("ps-scroll-" + d)) : t > 0 && c.dispatchEvent(_("ps-scroll-" + u)), i && function (e, t)
        {
            h(e, t), p(e, t)
        }(e, s));
        e.reach[s] && (t || r) && c.dispatchEvent(_("ps-" + s + "-reach-" + e.reach[s]))
    }(e, n, a, i, r)
};

function v(e)
{
    return parseInt(e, 10) || 0
}
var M = {
        isWebKit: "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style,
        supportsTouch: "undefined" != typeof window && ("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
        supportsIePointer: "undefined" != typeof navigator && navigator.msMaxTouchPoints,
        isChrome: "undefined" != typeof navigator && /Chrome/i.test(navigator && navigator.userAgent)
    },
    b = function (e)
    {
        var t = e.element,
            n = Math.floor(t.scrollTop);
        e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight, t.contains(e.scrollbarXRail) || (d(t, u.element.rail("x")).forEach(function (e)
            {
                return s(e)
            }), t.appendChild(e.scrollbarXRail)), t.contains(e.scrollbarYRail) || (d(t, u.element.rail("y")).forEach(function (e)
            {
                return s(e)
            }), t.appendChild(e.scrollbarYRail)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = w(e, v(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = v((e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = w(e, v(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = v(n * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight),
            function (e, t)
            {
                var n = {
                        width: t.railXWidth
                    },
                    i = Math.floor(e.scrollTop);
                t.isRtl ? n.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth - t.contentWidth : n.left = e.scrollLeft;
                t.isScrollbarXUsingBottom ? n.bottom = t.scrollbarXBottom - i : n.top = t.scrollbarXTop + i;
                r(t.scrollbarXRail, n);
                var a = {
                    top: i,
                    height: t.railYHeight
                };
                t.isScrollbarYUsingRight ? t.isRtl ? a.right = t.contentWidth - (t.negativeScrollAdjustment + e.scrollLeft) - t.scrollbarYRight - t.scrollbarYOuterWidth : a.right = t.scrollbarYRight - e.scrollLeft : t.isRtl ? a.left = t.negativeScrollAdjustment + e.scrollLeft + 2 * t.containerWidth - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : a.left = t.scrollbarYLeft + e.scrollLeft;
                r(t.scrollbarYRail, a), r(t.scrollbarX,
                {
                    left: t.scrollbarXLeft,
                    width: t.scrollbarXWidth - t.railBorderXWidth
                }), r(t.scrollbarY,
                {
                    top: t.scrollbarYTop,
                    height: t.scrollbarYHeight - t.railBorderYWidth
                })
            }(t, e), e.scrollbarXActive ? t.classList.add(u.state.active("x")) : (t.classList.remove(u.state.active("x")), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, t.scrollLeft = 0), e.scrollbarYActive ? t.classList.add(u.state.active("y")) : (t.classList.remove(u.state.active("y")), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, t.scrollTop = 0)
    };

function w(e, t)
{
    return e.settings.minScrollbarLength && (t = Math.max(t, e.settings.minScrollbarLength)), e.settings.maxScrollbarLength && (t = Math.min(t, e.settings.maxScrollbarLength)), t
}

function L(e, t)
{
    var n = t[0],
        i = t[1],
        r = t[2],
        a = t[3],
        o = t[4],
        l = t[5],
        s = t[6],
        d = t[7],
        c = t[8],
        f = e.element,
        m = null,
        g = null,
        _ = null;

    function y(t)
    {
        f[s] = m + _ * (t[r] - g), h(e, d), b(e), t.stopPropagation(), t.preventDefault()
    }

    function v()
    {
        p(e, d), e[c].classList.remove(u.state.clicking), e.event.unbind(e.ownerDocument, "mousemove", y)
    }
    e.event.bind(e[o], "mousedown", function (t)
    {
        m = f[s], g = t[r], _ = (e[i] - e[n]) / (e[a] - e[l]), e.event.bind(e.ownerDocument, "mousemove", y), e.event.once(e.ownerDocument, "mouseup", v), e[c].classList.add(u.state.clicking), t.stopPropagation(), t.preventDefault()
    })
}
var D = {
        "click-rail": function (e)
        {
            e.event.bind(e.scrollbarY, "mousedown", function (e)
            {
                return e.stopPropagation()
            }), e.event.bind(e.scrollbarYRail, "mousedown", function (t)
            {
                var n = t.pageY - window.pageYOffset - e.scrollbarYRail.getBoundingClientRect().top > e.scrollbarYTop ? 1 : -1;
                e.element.scrollTop += n * e.containerHeight, b(e), t.stopPropagation()
            }), e.event.bind(e.scrollbarX, "mousedown", function (e)
            {
                return e.stopPropagation()
            }), e.event.bind(e.scrollbarXRail, "mousedown", function (t)
            {
                var n = t.pageX - window.pageXOffset - e.scrollbarXRail.getBoundingClientRect().left > e.scrollbarXLeft ? 1 : -1;
                e.element.scrollLeft += n * e.containerWidth, b(e), t.stopPropagation()
            })
        },
        "drag-thumb": function (e)
        {
            L(e, ["containerWidth", "contentWidth", "pageX", "railXWidth", "scrollbarX", "scrollbarXWidth", "scrollLeft", "x", "scrollbarXRail"]), L(e, ["containerHeight", "contentHeight", "pageY", "railYHeight", "scrollbarY", "scrollbarYHeight", "scrollTop", "y", "scrollbarYRail"])
        },
        keyboard: function (e)
        {
            var t = e.element;
            e.event.bind(e.ownerDocument, "keydown", function (n)
            {
                if (!(n.isDefaultPrevented && n.isDefaultPrevented() || n.defaultPrevented) && (l(t, ":hover") || l(e.scrollbarX, ":focus") || l(e.scrollbarY, ":focus")))
                {
                    var i, r = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
                    if (r)
                    {
                        if ("IFRAME" === r.tagName) r = r.contentDocument.activeElement;
                        else
                            for (; r.shadowRoot;) r = r.shadowRoot.activeElement;
                        if (l(i = r, "input,[contenteditable]") || l(i, "select,[contenteditable]") || l(i, "textarea,[contenteditable]") || l(i, "button,[contenteditable]")) return
                    }
                    var a = 0,
                        o = 0;
                    switch (n.which)
                    {
                    case 37:
                        a = n.metaKey ? -e.contentWidth : n.altKey ? -e.containerWidth : -30;
                        break;
                    case 38:
                        o = n.metaKey ? e.contentHeight : n.altKey ? e.containerHeight : 30;
                        break;
                    case 39:
                        a = n.metaKey ? e.contentWidth : n.altKey ? e.containerWidth : 30;
                        break;
                    case 40:
                        o = n.metaKey ? -e.contentHeight : n.altKey ? -e.containerHeight : -30;
                        break;
                    case 32:
                        o = n.shiftKey ? e.containerHeight : -e.containerHeight;
                        break;
                    case 33:
                        o = e.containerHeight;
                        break;
                    case 34:
                        o = -e.containerHeight;
                        break;
                    case 36:
                        o = e.contentHeight;
                        break;
                    case 35:
                        o = -e.contentHeight;
                        break;
                    default:
                        return
                    }
                    e.settings.suppressScrollX && 0 !== a || e.settings.suppressScrollY && 0 !== o || (t.scrollTop -= o, t.scrollLeft += a, b(e), function (n, i)
                    {
                        var r = Math.floor(t.scrollTop);
                        if (0 === n)
                        {
                            if (!e.scrollbarYActive) return !1;
                            if (0 === r && i > 0 || r >= e.contentHeight - e.containerHeight && i < 0) return !e.settings.wheelPropagation
                        }
                        var a = t.scrollLeft;
                        if (0 === i)
                        {
                            if (!e.scrollbarXActive) return !1;
                            if (0 === a && n < 0 || a >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                        }
                        return !0
                    }(a, o) && n.preventDefault())
                }
            })
        },
        wheel: function (e)
        {
            var t = e.element;

            function n(n)
            {
                var r = function (e)
                    {
                        var t = e.deltaX,
                            n = -1 * e.deltaY;
                        return void 0 !== t && void 0 !== n || (t = -1 * e.wheelDeltaX / 6, n = e.wheelDeltaY / 6), e.deltaMode && 1 === e.deltaMode && (t *= 10, n *= 10), t != t && n != n && (t = 0, n = e.wheelDelta), e.shiftKey ? [-n, -t] : [t, n]
                    }(n),
                    a = r[0],
                    o = r[1];
                if (! function (e, n, r)
                    {
                        if (!M.isWebKit && t.querySelector("select:focus")) return !0;
                        if (!t.contains(e)) return !1;
                        for (var a = e; a && a !== t;)
                        {
                            if (a.classList.contains(u.element.consuming)) return !0;
                            var o = i(a);
                            if ([o.overflow, o.overflowX, o.overflowY].join("").match(/(scroll|auto)/))
                            {
                                var l = a.scrollHeight - a.clientHeight;
                                if (l > 0 && !(0 === a.scrollTop && r > 0 || a.scrollTop === l && r < 0)) return !0;
                                var s = a.scrollWidth - a.clientWidth;
                                if (s > 0 && !(0 === a.scrollLeft && n < 0 || a.scrollLeft === s && n > 0)) return !0
                            }
                            a = a.parentNode
                        }
                        return !1
                    }(n.target, a, o))
                {
                    var l = !1;
                    e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (o ? t.scrollTop -= o * e.settings.wheelSpeed : t.scrollTop += a * e.settings.wheelSpeed, l = !0) : e.scrollbarXActive && !e.scrollbarYActive && (a ? t.scrollLeft += a * e.settings.wheelSpeed : t.scrollLeft -= o * e.settings.wheelSpeed, l = !0) : (t.scrollTop -= o * e.settings.wheelSpeed, t.scrollLeft += a * e.settings.wheelSpeed), b(e), (l = l || function (n, i)
                    {
                        var r = Math.floor(t.scrollTop),
                            a = 0 === t.scrollTop,
                            o = r + t.offsetHeight === t.scrollHeight,
                            l = 0 === t.scrollLeft,
                            s = t.scrollLeft + t.offsetWidth === t.scrollWidth;
                        return !(Math.abs(i) > Math.abs(n) ? a || o : l || s) || !e.settings.wheelPropagation
                    }(a, o)) && !n.ctrlKey && (n.stopPropagation(), n.preventDefault())
                }
            }
            void 0 !== window.onwheel ? e.event.bind(t, "wheel", n) : void 0 !== window.onmousewheel && e.event.bind(t, "mousewheel", n)
        },
        touch: function (e)
        {
            if (M.supportsTouch || M.supportsIePointer)
            {
                var t = e.element,
                    n = {},
                    r = 0,
                    a = {},
                    o = null;
                M.supportsTouch ? (e.event.bind(t, "touchstart", c), e.event.bind(t, "touchmove", h), e.event.bind(t, "touchend", p)) : M.supportsIePointer && (window.PointerEvent ? (e.event.bind(t, "pointerdown", c), e.event.bind(t, "pointermove", h), e.event.bind(t, "pointerup", p)) : window.MSPointerEvent && (e.event.bind(t, "MSPointerDown", c), e.event.bind(t, "MSPointerMove", h), e.event.bind(t, "MSPointerUp", p)))
            }

            function l(n, i)
            {
                t.scrollTop -= i, t.scrollLeft -= n, b(e)
            }

            function s(e)
            {
                return e.targetTouches ? e.targetTouches[0] : e
            }

            function d(e)
            {
                return !(e.pointerType && "pen" === e.pointerType && 0 === e.buttons || (!e.targetTouches || 1 !== e.targetTouches.length) && (!e.pointerType || "mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE))
            }

            function c(e)
            {
                if (d(e))
                {
                    var t = s(e);
                    n.pageX = t.pageX, n.pageY = t.pageY, r = (new Date).getTime(), null !== o && clearInterval(o)
                }
            }

            function h(o)
            {
                if (d(o))
                {
                    var c = s(o),
                        h = {
                            pageX: c.pageX,
                            pageY: c.pageY
                        },
                        p = h.pageX - n.pageX,
                        f = h.pageY - n.pageY;
                    if (function (e, n, r)
                        {
                            if (!t.contains(e)) return !1;
                            for (var a = e; a && a !== t;)
                            {
                                if (a.classList.contains(u.element.consuming)) return !0;
                                var o = i(a);
                                if ([o.overflow, o.overflowX, o.overflowY].join("").match(/(scroll|auto)/))
                                {
                                    var l = a.scrollHeight - a.clientHeight;
                                    if (l > 0 && !(0 === a.scrollTop && r > 0 || a.scrollTop === l && r < 0)) return !0;
                                    var s = a.scrollLeft - a.clientWidth;
                                    if (s > 0 && !(0 === a.scrollLeft && n < 0 || a.scrollLeft === s && n > 0)) return !0
                                }
                                a = a.parentNode
                            }
                            return !1
                        }(o.target, p, f)) return;
                    l(p, f), n = h;
                    var m = (new Date).getTime(),
                        g = m - r;
                    g > 0 && (a.x = p / g, a.y = f / g, r = m),
                        function (n, i)
                        {
                            var r = Math.floor(t.scrollTop),
                                a = t.scrollLeft,
                                o = Math.abs(n),
                                l = Math.abs(i);
                            if (l > o)
                            {
                                if (i < 0 && r === e.contentHeight - e.containerHeight || i > 0 && 0 === r) return 0 === window.scrollY && i > 0 && M.isChrome
                            }
                            else if (o > l && (n < 0 && a === e.contentWidth - e.containerWidth || n > 0 && 0 === a)) return !0;
                            return !0
                        }(p, f) && o.preventDefault()
                }
            }

            function p()
            {
                e.settings.swipeEasing && (clearInterval(o), o = setInterval(function ()
                {
                    e.isInitialized ? clearInterval(o) : a.x || a.y ? Math.abs(a.x) < .01 && Math.abs(a.y) < .01 ? clearInterval(o) : (l(30 * a.x, 30 * a.y), a.x *= .8, a.y *= .8) : clearInterval(o)
                }, 10))
            }
        }
    },
    T = function (e, t)
    {
        var n = this;
        if (void 0 === t && (t = {}), "string" == typeof e && (e = document.querySelector(e)), !e || !e.nodeName) throw new Error("no element is specified to initialize PerfectScrollbar");
        for (var o in this.element = e, e.classList.add(u.main), this.settings = {
                handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
                maxScrollbarLength: null,
                minScrollbarLength: null,
                scrollingThreshold: 1e3,
                scrollXMarginOffset: 0,
                scrollYMarginOffset: 0,
                suppressScrollX: !1,
                suppressScrollY: !1,
                swipeEasing: !0,
                useBothWheelAxes: !1,
                wheelPropagation: !0,
                wheelSpeed: 1
            }, t) n.settings[o] = t[o];
        this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;
        var l, s, d = function ()
            {
                return e.classList.add(u.state.focus)
            },
            c = function ()
            {
                return e.classList.remove(u.state.focus)
            };
        this.isRtl = "rtl" === i(e).direction, this.isNegativeScroll = (s = e.scrollLeft, e.scrollLeft = -1, l = e.scrollLeft < 0, e.scrollLeft = s, l), this.negativeScrollAdjustment = this.isNegativeScroll ? e.scrollWidth - e.clientWidth : 0, this.event = new g, this.ownerDocument = e.ownerDocument || document, this.scrollbarXRail = a(u.element.rail("x")), e.appendChild(this.scrollbarXRail), this.scrollbarX = a(u.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", d), this.event.bind(this.scrollbarX, "blur", c), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
        var h = i(this.scrollbarXRail);
        this.scrollbarXBottom = parseInt(h.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1, this.scrollbarXTop = v(h.top)) : this.isScrollbarXUsingBottom = !0, this.railBorderXWidth = v(h.borderLeftWidth) + v(h.borderRightWidth), r(this.scrollbarXRail,
        {
            display: "block"
        }), this.railXMarginWidth = v(h.marginLeft) + v(h.marginRight), r(this.scrollbarXRail,
        {
            display: ""
        }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = a(u.element.rail("y")), e.appendChild(this.scrollbarYRail), this.scrollbarY = a(u.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", d), this.event.bind(this.scrollbarY, "blur", c), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
        var p = i(this.scrollbarYRail);
        this.scrollbarYRight = parseInt(p.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1, this.scrollbarYLeft = v(p.left)) : this.isScrollbarYUsingRight = !0, this.scrollbarYOuterWidth = this.isRtl ? function (e)
        {
            var t = i(e);
            return v(t.width) + v(t.paddingLeft) + v(t.paddingRight) + v(t.borderLeftWidth) + v(t.borderRightWidth)
        }(this.scrollbarY) : null, this.railBorderYWidth = v(p.borderTopWidth) + v(p.borderBottomWidth), r(this.scrollbarYRail,
        {
            display: "block"
        }), this.railYMarginHeight = v(p.marginTop) + v(p.marginBottom), r(this.scrollbarYRail,
        {
            display: ""
        }), this.railYHeight = null, this.railYRatio = null, this.reach = {
            x: e.scrollLeft <= 0 ? "start" : e.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
            y: e.scrollTop <= 0 ? "start" : e.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
        }, this.isAlive = !0, this.settings.handlers.forEach(function (e)
        {
            return D[e](n)
        }), this.lastScrollTop = Math.floor(e.scrollTop), this.lastScrollLeft = e.scrollLeft, this.event.bind(this.element, "scroll", function (e)
        {
            return n.onScroll(e)
        }), b(this)
    };
T.prototype.update = function ()
{
    this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, r(this.scrollbarXRail,
    {
        display: "block"
    }), r(this.scrollbarYRail,
    {
        display: "block"
    }), this.railXMarginWidth = v(i(this.scrollbarXRail).marginLeft) + v(i(this.scrollbarXRail).marginRight), this.railYMarginHeight = v(i(this.scrollbarYRail).marginTop) + v(i(this.scrollbarYRail).marginBottom), r(this.scrollbarXRail,
    {
        display: "none"
    }), r(this.scrollbarYRail,
    {
        display: "none"
    }), b(this), y(this, "top", 0, !1, !0), y(this, "left", 0, !1, !0), r(this.scrollbarXRail,
    {
        display: ""
    }), r(this.scrollbarYRail,
    {
        display: ""
    }))
}, T.prototype.onScroll = function (e)
{
    this.isAlive && (b(this), y(this, "top", this.element.scrollTop - this.lastScrollTop), y(this, "left", this.element.scrollLeft - this.lastScrollLeft), this.lastScrollTop = Math.floor(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft)
}, T.prototype.destroy = function ()
{
    this.isAlive && (this.event.unbindAll(), s(this.scrollbarX), s(this.scrollbarY), s(this.scrollbarXRail), s(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = !1)
}, T.prototype.removePsClasses = function ()
{
    this.element.className = this.element.className.split(" ").filter(function (e)
    {
        return !e.match(/^ps([-_].+|)$/)
    }).join(" ")
}, t.a = T
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("af",
        {
            months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),
            monthsShort: "Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),
            weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),
            weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),
            weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"),
            meridiemParse: /vm|nm/i,
            isPM: function (e)
            {
                return /^nm$/i.test(e)
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? n ? "vm" : "VM" : n ? "nm" : "NM"
            },
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Vandag om] LT",
                nextDay: "[Môre om] LT",
                nextWeek: "dddd [om] LT",
                lastDay: "[Gister om] LT",
                lastWeek: "[Laas] dddd [om] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "oor %s",
                past: "%s gelede",
                s: "'n paar sekondes",
                ss: "%d sekondes",
                m: "'n minuut",
                mm: "%d minute",
                h: "'n uur",
                hh: "%d ure",
                d: "'n dag",
                dd: "%d dae",
                M: "'n maand",
                MM: "%d maande",
                y: "'n jaar",
                yy: "%d jaar"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
            ordinal: function (e)
            {
                return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de")
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "١",
                2: "٢",
                3: "٣",
                4: "٤",
                5: "٥",
                6: "٦",
                7: "٧",
                8: "٨",
                9: "٩",
                0: "٠"
            },
            n = {
                "١": "1",
                "٢": "2",
                "٣": "3",
                "٤": "4",
                "٥": "5",
                "٦": "6",
                "٧": "7",
                "٨": "8",
                "٩": "9",
                "٠": "0"
            },
            i = function (e)
            {
                return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5
            },
            r = {
                s: ["أقل من ثانية", "ثانية واحدة", ["ثانيتان", "ثانيتين"], "%d ثوان", "%d ثانية", "%d ثانية"],
                m: ["أقل من دقيقة", "دقيقة واحدة", ["دقيقتان", "دقيقتين"], "%d دقائق", "%d دقيقة", "%d دقيقة"],
                h: ["أقل من ساعة", "ساعة واحدة", ["ساعتان", "ساعتين"], "%d ساعات", "%d ساعة", "%d ساعة"],
                d: ["أقل من يوم", "يوم واحد", ["يومان", "يومين"], "%d أيام", "%d يومًا", "%d يوم"],
                M: ["أقل من شهر", "شهر واحد", ["شهران", "شهرين"], "%d أشهر", "%d شهرا", "%d شهر"],
                y: ["أقل من عام", "عام واحد", ["عامان", "عامين"], "%d أعوام", "%d عامًا", "%d عام"]
            },
            a = function (e)
            {
                return function (t, n, a, o)
                {
                    var l = i(t),
                        s = r[e][i(t)];
                    return 2 === l && (s = s[n ? 0 : 1]), s.replace(/%d/i, t)
                }
            },
            o = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
        e.defineLocale("ar",
        {
            months: o,
            monthsShort: o,
            weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "D/‏M/‏YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            meridiemParse: /ص|م/,
            isPM: function (e)
            {
                return "م" === e
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "ص" : "م"
            },
            calendar:
            {
                sameDay: "[اليوم عند الساعة] LT",
                nextDay: "[غدًا عند الساعة] LT",
                nextWeek: "dddd [عند الساعة] LT",
                lastDay: "[أمس عند الساعة] LT",
                lastWeek: "dddd [عند الساعة] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "بعد %s",
                past: "منذ %s",
                s: a("s"),
                ss: a("s"),
                m: a("m"),
                mm: a("m"),
                h: a("h"),
                hh: a("h"),
                d: a("d"),
                dd: a("d"),
                M: a("M"),
                MM: a("M"),
                y: a("y"),
                yy: a("y")
            },
            preparse: function (e)
            {
                return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (e)
                {
                    return n[e]
                }).replace(/،/g, ",")
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                }).replace(/,/g, "،")
            },
            week:
            {
                dow: 6,
                doy: 12
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("ar-dz",
        {
            months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
            monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
            weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "أح_إث_ثلا_أر_خم_جم_سب".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[اليوم على الساعة] LT",
                nextDay: "[غدا على الساعة] LT",
                nextWeek: "dddd [على الساعة] LT",
                lastDay: "[أمس على الساعة] LT",
                lastWeek: "dddd [على الساعة] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "في %s",
                past: "منذ %s",
                s: "ثوان",
                ss: "%d ثانية",
                m: "دقيقة",
                mm: "%d دقائق",
                h: "ساعة",
                hh: "%d ساعات",
                d: "يوم",
                dd: "%d أيام",
                M: "شهر",
                MM: "%d أشهر",
                y: "سنة",
                yy: "%d سنوات"
            },
            week:
            {
                dow: 0,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("ar-kw",
        {
            months: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
            monthsShort: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
            weekdays: "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[اليوم على الساعة] LT",
                nextDay: "[غدا على الساعة] LT",
                nextWeek: "dddd [على الساعة] LT",
                lastDay: "[أمس على الساعة] LT",
                lastWeek: "dddd [على الساعة] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "في %s",
                past: "منذ %s",
                s: "ثوان",
                ss: "%d ثانية",
                m: "دقيقة",
                mm: "%d دقائق",
                h: "ساعة",
                hh: "%d ساعات",
                d: "يوم",
                dd: "%d أيام",
                M: "شهر",
                MM: "%d أشهر",
                y: "سنة",
                yy: "%d سنوات"
            },
            week:
            {
                dow: 0,
                doy: 12
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "1",
                2: "2",
                3: "3",
                4: "4",
                5: "5",
                6: "6",
                7: "7",
                8: "8",
                9: "9",
                0: "0"
            },
            n = function (e)
            {
                return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5
            },
            i = {
                s: ["أقل من ثانية", "ثانية واحدة", ["ثانيتان", "ثانيتين"], "%d ثوان", "%d ثانية", "%d ثانية"],
                m: ["أقل من دقيقة", "دقيقة واحدة", ["دقيقتان", "دقيقتين"], "%d دقائق", "%d دقيقة", "%d دقيقة"],
                h: ["أقل من ساعة", "ساعة واحدة", ["ساعتان", "ساعتين"], "%d ساعات", "%d ساعة", "%d ساعة"],
                d: ["أقل من يوم", "يوم واحد", ["يومان", "يومين"], "%d أيام", "%d يومًا", "%d يوم"],
                M: ["أقل من شهر", "شهر واحد", ["شهران", "شهرين"], "%d أشهر", "%d شهرا", "%d شهر"],
                y: ["أقل من عام", "عام واحد", ["عامان", "عامين"], "%d أعوام", "%d عامًا", "%d عام"]
            },
            r = function (e)
            {
                return function (t, r, a, o)
                {
                    var l = n(t),
                        s = i[e][n(t)];
                    return 2 === l && (s = s[r ? 0 : 1]), s.replace(/%d/i, t)
                }
            },
            a = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
        e.defineLocale("ar-ly",
        {
            months: a,
            monthsShort: a,
            weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "D/‏M/‏YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            meridiemParse: /ص|م/,
            isPM: function (e)
            {
                return "م" === e
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "ص" : "م"
            },
            calendar:
            {
                sameDay: "[اليوم عند الساعة] LT",
                nextDay: "[غدًا عند الساعة] LT",
                nextWeek: "dddd [عند الساعة] LT",
                lastDay: "[أمس عند الساعة] LT",
                lastWeek: "dddd [عند الساعة] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "بعد %s",
                past: "منذ %s",
                s: r("s"),
                ss: r("s"),
                m: r("m"),
                mm: r("m"),
                h: r("h"),
                hh: r("h"),
                d: r("d"),
                dd: r("d"),
                M: r("M"),
                MM: r("M"),
                y: r("y"),
                yy: r("y")
            },
            preparse: function (e)
            {
                return e.replace(/،/g, ",")
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                }).replace(/,/g, "،")
            },
            week:
            {
                dow: 6,
                doy: 12
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("ar-ma",
        {
            months: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
            monthsShort: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
            weekdays: "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[اليوم على الساعة] LT",
                nextDay: "[غدا على الساعة] LT",
                nextWeek: "dddd [على الساعة] LT",
                lastDay: "[أمس على الساعة] LT",
                lastWeek: "dddd [على الساعة] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "في %s",
                past: "منذ %s",
                s: "ثوان",
                ss: "%d ثانية",
                m: "دقيقة",
                mm: "%d دقائق",
                h: "ساعة",
                hh: "%d ساعات",
                d: "يوم",
                dd: "%d أيام",
                M: "شهر",
                MM: "%d أشهر",
                y: "سنة",
                yy: "%d سنوات"
            },
            week:
            {
                dow: 6,
                doy: 12
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "١",
                2: "٢",
                3: "٣",
                4: "٤",
                5: "٥",
                6: "٦",
                7: "٧",
                8: "٨",
                9: "٩",
                0: "٠"
            },
            n = {
                "١": "1",
                "٢": "2",
                "٣": "3",
                "٤": "4",
                "٥": "5",
                "٦": "6",
                "٧": "7",
                "٨": "8",
                "٩": "9",
                "٠": "0"
            };
        e.defineLocale("ar-sa",
        {
            months: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
            monthsShort: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
            weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            meridiemParse: /ص|م/,
            isPM: function (e)
            {
                return "م" === e
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "ص" : "م"
            },
            calendar:
            {
                sameDay: "[اليوم على الساعة] LT",
                nextDay: "[غدا على الساعة] LT",
                nextWeek: "dddd [على الساعة] LT",
                lastDay: "[أمس على الساعة] LT",
                lastWeek: "dddd [على الساعة] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "في %s",
                past: "منذ %s",
                s: "ثوان",
                ss: "%d ثانية",
                m: "دقيقة",
                mm: "%d دقائق",
                h: "ساعة",
                hh: "%d ساعات",
                d: "يوم",
                dd: "%d أيام",
                M: "شهر",
                MM: "%d أشهر",
                y: "سنة",
                yy: "%d سنوات"
            },
            preparse: function (e)
            {
                return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (e)
                {
                    return n[e]
                }).replace(/،/g, ",")
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                }).replace(/,/g, "،")
            },
            week:
            {
                dow: 0,
                doy: 6
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("ar-tn",
        {
            months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
            monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
            weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[اليوم على الساعة] LT",
                nextDay: "[غدا على الساعة] LT",
                nextWeek: "dddd [على الساعة] LT",
                lastDay: "[أمس على الساعة] LT",
                lastWeek: "dddd [على الساعة] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "في %s",
                past: "منذ %s",
                s: "ثوان",
                ss: "%d ثانية",
                m: "دقيقة",
                mm: "%d دقائق",
                h: "ساعة",
                hh: "%d ساعات",
                d: "يوم",
                dd: "%d أيام",
                M: "شهر",
                MM: "%d أشهر",
                y: "سنة",
                yy: "%d سنوات"
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
            1: "-inci",
            5: "-inci",
            8: "-inci",
            70: "-inci",
            80: "-inci",
            2: "-nci",
            7: "-nci",
            20: "-nci",
            50: "-nci",
            3: "-üncü",
            4: "-üncü",
            100: "-üncü",
            6: "-ncı",
            9: "-uncu",
            10: "-uncu",
            30: "-uncu",
            60: "-ıncı",
            90: "-ıncı"
        };
        e.defineLocale("az",
        {
            months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),
            monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
            weekdays: "Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"),
            weekdaysShort: "Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),
            weekdaysMin: "Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[bugün saat] LT",
                nextDay: "[sabah saat] LT",
                nextWeek: "[gələn həftə] dddd [saat] LT",
                lastDay: "[dünən] LT",
                lastWeek: "[keçən həftə] dddd [saat] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s sonra",
                past: "%s əvvəl",
                s: "birneçə saniyə",
                ss: "%d saniyə",
                m: "bir dəqiqə",
                mm: "%d dəqiqə",
                h: "bir saat",
                hh: "%d saat",
                d: "bir gün",
                dd: "%d gün",
                M: "bir ay",
                MM: "%d ay",
                y: "bir il",
                yy: "%d il"
            },
            meridiemParse: /gecə|səhər|gündüz|axşam/,
            isPM: function (e)
            {
                return /^(gündüz|axşam)$/.test(e)
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "gecə" : e < 12 ? "səhər" : e < 17 ? "gündüz" : "axşam"
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
            ordinal: function (e)
            {
                if (0 === e) return e + "-ıncı";
                var n = e % 10,
                    i = e % 100 - n,
                    r = e >= 100 ? 100 : null;
                return e + (t[n] || t[i] || t[r])
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n)
        {
            var i, r, a = {
                ss: t ? "секунда_секунды_секунд" : "секунду_секунды_секунд",
                mm: t ? "хвіліна_хвіліны_хвілін" : "хвіліну_хвіліны_хвілін",
                hh: t ? "гадзіна_гадзіны_гадзін" : "гадзіну_гадзіны_гадзін",
                dd: "дзень_дні_дзён",
                MM: "месяц_месяцы_месяцаў",
                yy: "год_гады_гадоў"
            };
            return "m" === n ? t ? "хвіліна" : "хвіліну" : "h" === n ? t ? "гадзіна" : "гадзіну" : e + " " + (i = +e, r = a[n].split("_"), i % 10 == 1 && i % 100 != 11 ? r[0] : i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20) ? r[1] : r[2])
        }
        e.defineLocale("be",
        {
            months:
            {
                format: "студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_"),
                standalone: "студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_")
            },
            monthsShort: "студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split("_"),
            weekdays:
            {
                format: "нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу".split("_"),
                standalone: "нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split("_"),
                isFormat: /\[ ?[Ууў] ?(?:мінулую|наступную)? ?\] ?dddd/
            },
            weekdaysShort: "нд_пн_ат_ср_чц_пт_сб".split("_"),
            weekdaysMin: "нд_пн_ат_ср_чц_пт_сб".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY г.",
                LLL: "D MMMM YYYY г., HH:mm",
                LLLL: "dddd, D MMMM YYYY г., HH:mm"
            },
            calendar:
            {
                sameDay: "[Сёння ў] LT",
                nextDay: "[Заўтра ў] LT",
                lastDay: "[Учора ў] LT",
                nextWeek: function ()
                {
                    return "[У] dddd [ў] LT"
                },
                lastWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return "[У мінулую] dddd [ў] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[У мінулы] dddd [ў] LT"
                    }
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "праз %s",
                past: "%s таму",
                s: "некалькі секунд",
                m: t,
                mm: t,
                h: t,
                hh: t,
                d: "дзень",
                dd: t,
                M: "месяц",
                MM: t,
                y: "год",
                yy: t
            },
            meridiemParse: /ночы|раніцы|дня|вечара/,
            isPM: function (e)
            {
                return /^(дня|вечара)$/.test(e)
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "ночы" : e < 12 ? "раніцы" : e < 17 ? "дня" : "вечара"
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(і|ы|га)/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                case "M":
                case "d":
                case "DDD":
                case "w":
                case "W":
                    return e % 10 != 2 && e % 10 != 3 || e % 100 == 12 || e % 100 == 13 ? e + "-ы" : e + "-і";
                case "D":
                    return e + "-га";
                default:
                    return e
                }
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("bg",
        {
            months: "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
            monthsShort: "янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
            weekdays: "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
            weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"),
            weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "D.MM.YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY H:mm",
                LLLL: "dddd, D MMMM YYYY H:mm"
            },
            calendar:
            {
                sameDay: "[Днес в] LT",
                nextDay: "[Утре в] LT",
                nextWeek: "dddd [в] LT",
                lastDay: "[Вчера в] LT",
                lastWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                    case 3:
                    case 6:
                        return "[В изминалата] dddd [в] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[В изминалия] dddd [в] LT"
                    }
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "след %s",
                past: "преди %s",
                s: "няколко секунди",
                ss: "%d секунди",
                m: "минута",
                mm: "%d минути",
                h: "час",
                hh: "%d часа",
                d: "ден",
                dd: "%d дни",
                M: "месец",
                MM: "%d месеца",
                y: "година",
                yy: "%d години"
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
            ordinal: function (e)
            {
                var t = e % 10,
                    n = e % 100;
                return 0 === e ? e + "-ев" : 0 === n ? e + "-ен" : n > 10 && n < 20 ? e + "-ти" : 1 === t ? e + "-ви" : 2 === t ? e + "-ри" : 7 === t || 8 === t ? e + "-ми" : e + "-ти"
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("bm",
        {
            months: "Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_Mɛkalo_Zuwɛnkalo_Zuluyekalo_Utikalo_Sɛtanburukalo_ɔkutɔburukalo_Nowanburukalo_Desanburukalo".split("_"),
            monthsShort: "Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des".split("_"),
            weekdays: "Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri".split("_"),
            weekdaysShort: "Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib".split("_"),
            weekdaysMin: "Ka_Nt_Ta_Ar_Al_Ju_Si".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "MMMM [tile] D [san] YYYY",
                LLL: "MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm",
                LLLL: "dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm"
            },
            calendar:
            {
                sameDay: "[Bi lɛrɛ] LT",
                nextDay: "[Sini lɛrɛ] LT",
                nextWeek: "dddd [don lɛrɛ] LT",
                lastDay: "[Kunu lɛrɛ] LT",
                lastWeek: "dddd [tɛmɛnen lɛrɛ] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s kɔnɔ",
                past: "a bɛ %s bɔ",
                s: "sanga dama dama",
                ss: "sekondi %d",
                m: "miniti kelen",
                mm: "miniti %d",
                h: "lɛrɛ kelen",
                hh: "lɛrɛ %d",
                d: "tile kelen",
                dd: "tile %d",
                M: "kalo kelen",
                MM: "kalo %d",
                y: "san kelen",
                yy: "san %d"
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "১",
                2: "২",
                3: "৩",
                4: "৪",
                5: "৫",
                6: "৬",
                7: "৭",
                8: "৮",
                9: "৯",
                0: "০"
            },
            n = {
                "১": "1",
                "২": "2",
                "৩": "3",
                "৪": "4",
                "৫": "5",
                "৬": "6",
                "৭": "7",
                "৮": "8",
                "৯": "9",
                "০": "0"
            };
        e.defineLocale("bn",
        {
            months: "জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"),
            monthsShort: "জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে".split("_"),
            weekdays: "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"),
            weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"),
            weekdaysMin: "রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি".split("_"),
            longDateFormat:
            {
                LT: "A h:mm সময়",
                LTS: "A h:mm:ss সময়",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY, A h:mm সময়",
                LLLL: "dddd, D MMMM YYYY, A h:mm সময়"
            },
            calendar:
            {
                sameDay: "[আজ] LT",
                nextDay: "[আগামীকাল] LT",
                nextWeek: "dddd, LT",
                lastDay: "[গতকাল] LT",
                lastWeek: "[গত] dddd, LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s পরে",
                past: "%s আগে",
                s: "কয়েক সেকেন্ড",
                ss: "%d সেকেন্ড",
                m: "এক মিনিট",
                mm: "%d মিনিট",
                h: "এক ঘন্টা",
                hh: "%d ঘন্টা",
                d: "এক দিন",
                dd: "%d দিন",
                M: "এক মাস",
                MM: "%d মাস",
                y: "এক বছর",
                yy: "%d বছর"
            },
            preparse: function (e)
            {
                return e.replace(/[১২৩৪৫৬৭৮৯০]/g, function (e)
                {
                    return n[e]
                })
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                })
            },
            meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "রাত" === t && e >= 4 || "দুপুর" === t && e < 5 || "বিকাল" === t ? e + 12 : e
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "রাত" : e < 10 ? "সকাল" : e < 17 ? "দুপুর" : e < 20 ? "বিকাল" : "রাত"
            },
            week:
            {
                dow: 0,
                doy: 6
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "༡",
                2: "༢",
                3: "༣",
                4: "༤",
                5: "༥",
                6: "༦",
                7: "༧",
                8: "༨",
                9: "༩",
                0: "༠"
            },
            n = {
                "༡": "1",
                "༢": "2",
                "༣": "3",
                "༤": "4",
                "༥": "5",
                "༦": "6",
                "༧": "7",
                "༨": "8",
                "༩": "9",
                "༠": "0"
            };
        e.defineLocale("bo",
        {
            months: "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),
            monthsShort: "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),
            weekdays: "གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"),
            weekdaysShort: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),
            weekdaysMin: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),
            longDateFormat:
            {
                LT: "A h:mm",
                LTS: "A h:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY, A h:mm",
                LLLL: "dddd, D MMMM YYYY, A h:mm"
            },
            calendar:
            {
                sameDay: "[དི་རིང] LT",
                nextDay: "[སང་ཉིན] LT",
                nextWeek: "[བདུན་ཕྲག་རྗེས་མ], LT",
                lastDay: "[ཁ་སང] LT",
                lastWeek: "[བདུན་ཕྲག་མཐའ་མ] dddd, LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s ལ་",
                past: "%s སྔན་ལ",
                s: "ལམ་སང",
                ss: "%d སྐར་ཆ།",
                m: "སྐར་མ་གཅིག",
                mm: "%d སྐར་མ",
                h: "ཆུ་ཚོད་གཅིག",
                hh: "%d ཆུ་ཚོད",
                d: "ཉིན་གཅིག",
                dd: "%d ཉིན་",
                M: "ཟླ་བ་གཅིག",
                MM: "%d ཟླ་བ",
                y: "ལོ་གཅིག",
                yy: "%d ལོ"
            },
            preparse: function (e)
            {
                return e.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (e)
                {
                    return n[e]
                })
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                })
            },
            meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "མཚན་མོ" === t && e >= 4 || "ཉིན་གུང" === t && e < 5 || "དགོང་དག" === t ? e + 12 : e
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "མཚན་མོ" : e < 10 ? "ཞོགས་ཀས" : e < 17 ? "ཉིན་གུང" : e < 20 ? "དགོང་དག" : "མཚན་མོ"
            },
            week:
            {
                dow: 0,
                doy: 6
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n)
        {
            return e + " " + function (e, t)
            {
                return 2 === t ? function (e)
                {
                    var t = {
                        m: "v",
                        b: "v",
                        d: "z"
                    };
                    return void 0 === t[e.charAt(0)] ? e : t[e.charAt(0)] + e.substring(1)
                }(e) : e
            }(
            {
                mm: "munutenn",
                MM: "miz",
                dd: "devezh"
            } [n], e)
        }
        e.defineLocale("br",
        {
            months: "Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),
            monthsShort: "Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
            weekdays: "Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),
            weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
            weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "h[e]mm A",
                LTS: "h[e]mm:ss A",
                L: "DD/MM/YYYY",
                LL: "D [a viz] MMMM YYYY",
                LLL: "D [a viz] MMMM YYYY h[e]mm A",
                LLLL: "dddd, D [a viz] MMMM YYYY h[e]mm A"
            },
            calendar:
            {
                sameDay: "[Hiziv da] LT",
                nextDay: "[Warc'hoazh da] LT",
                nextWeek: "dddd [da] LT",
                lastDay: "[Dec'h da] LT",
                lastWeek: "dddd [paset da] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "a-benn %s",
                past: "%s 'zo",
                s: "un nebeud segondennoù",
                ss: "%d eilenn",
                m: "ur vunutenn",
                mm: t,
                h: "un eur",
                hh: "%d eur",
                d: "un devezh",
                dd: t,
                M: "ur miz",
                MM: t,
                y: "ur bloaz",
                yy: function (e)
                {
                    switch (function e(t)
                    {
                        return t > 9 ? e(t % 10) : t
                    }(e))
                    {
                    case 1:
                    case 3:
                    case 4:
                    case 5:
                    case 9:
                        return e + " bloaz";
                    default:
                        return e + " vloaz"
                    }
                }
            },
            dayOfMonthOrdinalParse: /\d{1,2}(añ|vet)/,
            ordinal: function (e)
            {
                var t = 1 === e ? "añ" : "vet";
                return e + t
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n)
        {
            var i = e + " ";
            switch (n)
            {
            case "ss":
                return i += 1 === e ? "sekunda" : 2 === e || 3 === e || 4 === e ? "sekunde" : "sekundi";
            case "m":
                return t ? "jedna minuta" : "jedne minute";
            case "mm":
                return i += 1 === e ? "minuta" : 2 === e || 3 === e || 4 === e ? "minute" : "minuta";
            case "h":
                return t ? "jedan sat" : "jednog sata";
            case "hh":
                return i += 1 === e ? "sat" : 2 === e || 3 === e || 4 === e ? "sata" : "sati";
            case "dd":
                return i += 1 === e ? "dan" : "dana";
            case "MM":
                return i += 1 === e ? "mjesec" : 2 === e || 3 === e || 4 === e ? "mjeseca" : "mjeseci";
            case "yy":
                return i += 1 === e ? "godina" : 2 === e || 3 === e || 4 === e ? "godine" : "godina"
            }
        }
        e.defineLocale("bs",
        {
            months: "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),
            monthsShort: "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),
            monthsParseExact: !0,
            weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
            weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
            weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY H:mm",
                LLLL: "dddd, D. MMMM YYYY H:mm"
            },
            calendar:
            {
                sameDay: "[danas u] LT",
                nextDay: "[sutra u] LT",
                nextWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                        return "[u] [nedjelju] [u] LT";
                    case 3:
                        return "[u] [srijedu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                    }
                },
                lastDay: "[jučer u] LT",
                lastWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                    case 3:
                        return "[prošlu] dddd [u] LT";
                    case 6:
                        return "[prošle] [subote] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[prošli] dddd [u] LT"
                    }
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "za %s",
                past: "prije %s",
                s: "par sekundi",
                ss: t,
                m: t,
                mm: t,
                h: t,
                hh: t,
                d: "dan",
                dd: t,
                M: "mjesec",
                MM: t,
                y: "godinu",
                yy: t
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("ca",
        {
            months:
            {
                standalone: "gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),
                format: "de gener_de febrer_de març_d'abril_de maig_de juny_de juliol_d'agost_de setembre_d'octubre_de novembre_de desembre".split("_"),
                isFormat: /D[oD]?(\s)+MMMM/
            },
            monthsShort: "gen._febr._març_abr._maig_juny_jul._ag._set._oct._nov._des.".split("_"),
            monthsParseExact: !0,
            weekdays: "diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),
            weekdaysShort: "dg._dl._dt._dc._dj._dv._ds.".split("_"),
            weekdaysMin: "dg_dl_dt_dc_dj_dv_ds".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM [de] YYYY",
                ll: "D MMM YYYY",
                LLL: "D MMMM [de] YYYY [a les] H:mm",
                lll: "D MMM YYYY, H:mm",
                LLLL: "dddd D MMMM [de] YYYY [a les] H:mm",
                llll: "ddd D MMM YYYY, H:mm"
            },
            calendar:
            {
                sameDay: function ()
                {
                    return "[avui a " + (1 !== this.hours() ? "les" : "la") + "] LT"
                },
                nextDay: function ()
                {
                    return "[demà a " + (1 !== this.hours() ? "les" : "la") + "] LT"
                },
                nextWeek: function ()
                {
                    return "dddd [a " + (1 !== this.hours() ? "les" : "la") + "] LT"
                },
                lastDay: function ()
                {
                    return "[ahir a " + (1 !== this.hours() ? "les" : "la") + "] LT"
                },
                lastWeek: function ()
                {
                    return "[el] dddd [passat a " + (1 !== this.hours() ? "les" : "la") + "] LT"
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "d'aquí %s",
                past: "fa %s",
                s: "uns segons",
                ss: "%d segons",
                m: "un minut",
                mm: "%d minuts",
                h: "una hora",
                hh: "%d hores",
                d: "un dia",
                dd: "%d dies",
                M: "un mes",
                MM: "%d mesos",
                y: "un any",
                yy: "%d anys"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/,
            ordinal: function (e, t)
            {
                var n = 1 === e ? "r" : 2 === e ? "n" : 3 === e ? "r" : 4 === e ? "t" : "è";
                return "w" !== t && "W" !== t || (n = "a"), e + n
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),
            n = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_");

        function i(e)
        {
            return e > 1 && e < 5 && 1 != ~~(e / 10)
        }

        function r(e, t, n, r)
        {
            var a = e + " ";
            switch (n)
            {
            case "s":
                return t || r ? "pár sekund" : "pár sekundami";
            case "ss":
                return t || r ? a + (i(e) ? "sekundy" : "sekund") : a + "sekundami";
            case "m":
                return t ? "minuta" : r ? "minutu" : "minutou";
            case "mm":
                return t || r ? a + (i(e) ? "minuty" : "minut") : a + "minutami";
            case "h":
                return t ? "hodina" : r ? "hodinu" : "hodinou";
            case "hh":
                return t || r ? a + (i(e) ? "hodiny" : "hodin") : a + "hodinami";
            case "d":
                return t || r ? "den" : "dnem";
            case "dd":
                return t || r ? a + (i(e) ? "dny" : "dní") : a + "dny";
            case "M":
                return t || r ? "měsíc" : "měsícem";
            case "MM":
                return t || r ? a + (i(e) ? "měsíce" : "měsíců") : a + "měsíci";
            case "y":
                return t || r ? "rok" : "rokem";
            case "yy":
                return t || r ? a + (i(e) ? "roky" : "let") : a + "lety"
            }
        }
        e.defineLocale("cs",
        {
            months: t,
            monthsShort: n,
            monthsParse: function (e, t)
            {
                var n, i = [];
                for (n = 0; n < 12; n++) i[n] = new RegExp("^" + e[n] + "$|^" + t[n] + "$", "i");
                return i
            }(t, n),
            shortMonthsParse: function (e)
            {
                var t, n = [];
                for (t = 0; t < 12; t++) n[t] = new RegExp("^" + e[t] + "$", "i");
                return n
            }(n),
            longMonthsParse: function (e)
            {
                var t, n = [];
                for (t = 0; t < 12; t++) n[t] = new RegExp("^" + e[t] + "$", "i");
                return n
            }(t),
            weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),
            weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"),
            weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"),
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY H:mm",
                LLLL: "dddd D. MMMM YYYY H:mm",
                l: "D. M. YYYY"
            },
            calendar:
            {
                sameDay: "[dnes v] LT",
                nextDay: "[zítra v] LT",
                nextWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                        return "[v neděli v] LT";
                    case 1:
                    case 2:
                        return "[v] dddd [v] LT";
                    case 3:
                        return "[ve středu v] LT";
                    case 4:
                        return "[ve čtvrtek v] LT";
                    case 5:
                        return "[v pátek v] LT";
                    case 6:
                        return "[v sobotu v] LT"
                    }
                },
                lastDay: "[včera v] LT",
                lastWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                        return "[minulou neděli v] LT";
                    case 1:
                    case 2:
                        return "[minulé] dddd [v] LT";
                    case 3:
                        return "[minulou středu v] LT";
                    case 4:
                    case 5:
                        return "[minulý] dddd [v] LT";
                    case 6:
                        return "[minulou sobotu v] LT"
                    }
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "za %s",
                past: "před %s",
                s: r,
                ss: r,
                m: r,
                mm: r,
                h: r,
                hh: r,
                d: r,
                dd: r,
                M: r,
                MM: r,
                y: r,
                yy: r
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("cv",
        {
            months: "кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"),
            monthsShort: "кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"),
            weekdays: "вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"),
            weekdaysShort: "выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"),
            weekdaysMin: "вр_тн_ыт_юн_кҫ_эр_шм".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD-MM-YYYY",
                LL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]",
                LLL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",
                LLLL: "dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm"
            },
            calendar:
            {
                sameDay: "[Паян] LT [сехетре]",
                nextDay: "[Ыран] LT [сехетре]",
                lastDay: "[Ӗнер] LT [сехетре]",
                nextWeek: "[Ҫитес] dddd LT [сехетре]",
                lastWeek: "[Иртнӗ] dddd LT [сехетре]",
                sameElse: "L"
            },
            relativeTime:
            {
                future: function (e)
                {
                    var t = /сехет$/i.exec(e) ? "рен" : /ҫул$/i.exec(e) ? "тан" : "ран";
                    return e + t
                },
                past: "%s каялла",
                s: "пӗр-ик ҫеккунт",
                ss: "%d ҫеккунт",
                m: "пӗр минут",
                mm: "%d минут",
                h: "пӗр сехет",
                hh: "%d сехет",
                d: "пӗр кун",
                dd: "%d кун",
                M: "пӗр уйӑх",
                MM: "%d уйӑх",
                y: "пӗр ҫул",
                yy: "%d ҫул"
            },
            dayOfMonthOrdinalParse: /\d{1,2}-мӗш/,
            ordinal: "%d-мӗш",
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("cy",
        {
            months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),
            monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
            weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),
            weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
            weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Heddiw am] LT",
                nextDay: "[Yfory am] LT",
                nextWeek: "dddd [am] LT",
                lastDay: "[Ddoe am] LT",
                lastWeek: "dddd [diwethaf am] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "mewn %s",
                past: "%s yn ôl",
                s: "ychydig eiliadau",
                ss: "%d eiliad",
                m: "munud",
                mm: "%d munud",
                h: "awr",
                hh: "%d awr",
                d: "diwrnod",
                dd: "%d diwrnod",
                M: "mis",
                MM: "%d mis",
                y: "blwyddyn",
                yy: "%d flynedd"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
            ordinal: function (e)
            {
                var t = e,
                    n = "";
                return t > 20 ? n = 40 === t || 50 === t || 60 === t || 80 === t || 100 === t ? "fed" : "ain" : t > 0 && (n = ["", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed"][t]), e + n
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("da",
        {
            months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
            monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
            weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
            weekdaysShort: "søn_man_tir_ons_tor_fre_lør".split("_"),
            weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY HH:mm",
                LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm"
            },
            calendar:
            {
                sameDay: "[i dag kl.] LT",
                nextDay: "[i morgen kl.] LT",
                nextWeek: "på dddd [kl.] LT",
                lastDay: "[i går kl.] LT",
                lastWeek: "[i] dddd[s kl.] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "om %s",
                past: "%s siden",
                s: "få sekunder",
                ss: "%d sekunder",
                m: "et minut",
                mm: "%d minutter",
                h: "en time",
                hh: "%d timer",
                d: "en dag",
                dd: "%d dage",
                M: "en måned",
                MM: "%d måneder",
                y: "et år",
                yy: "%d år"
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n, i)
        {
            var r = {
                m: ["eine Minute", "einer Minute"],
                h: ["eine Stunde", "einer Stunde"],
                d: ["ein Tag", "einem Tag"],
                dd: [e + " Tage", e + " Tagen"],
                M: ["ein Monat", "einem Monat"],
                MM: [e + " Monate", e + " Monaten"],
                y: ["ein Jahr", "einem Jahr"],
                yy: [e + " Jahre", e + " Jahren"]
            };
            return t ? r[n][0] : r[n][1]
        }
        e.defineLocale("de",
        {
            months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
            monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
            monthsParseExact: !0,
            weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
            weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
            weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY HH:mm",
                LLLL: "dddd, D. MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[heute um] LT [Uhr]",
                sameElse: "L",
                nextDay: "[morgen um] LT [Uhr]",
                nextWeek: "dddd [um] LT [Uhr]",
                lastDay: "[gestern um] LT [Uhr]",
                lastWeek: "[letzten] dddd [um] LT [Uhr]"
            },
            relativeTime:
            {
                future: "in %s",
                past: "vor %s",
                s: "ein paar Sekunden",
                ss: "%d Sekunden",
                m: t,
                mm: "%d Minuten",
                h: t,
                hh: "%d Stunden",
                d: t,
                dd: t,
                M: t,
                MM: t,
                y: t,
                yy: t
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n, i)
        {
            var r = {
                m: ["eine Minute", "einer Minute"],
                h: ["eine Stunde", "einer Stunde"],
                d: ["ein Tag", "einem Tag"],
                dd: [e + " Tage", e + " Tagen"],
                M: ["ein Monat", "einem Monat"],
                MM: [e + " Monate", e + " Monaten"],
                y: ["ein Jahr", "einem Jahr"],
                yy: [e + " Jahre", e + " Jahren"]
            };
            return t ? r[n][0] : r[n][1]
        }
        e.defineLocale("de-at",
        {
            months: "Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
            monthsShort: "Jän._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
            monthsParseExact: !0,
            weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
            weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
            weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY HH:mm",
                LLLL: "dddd, D. MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[heute um] LT [Uhr]",
                sameElse: "L",
                nextDay: "[morgen um] LT [Uhr]",
                nextWeek: "dddd [um] LT [Uhr]",
                lastDay: "[gestern um] LT [Uhr]",
                lastWeek: "[letzten] dddd [um] LT [Uhr]"
            },
            relativeTime:
            {
                future: "in %s",
                past: "vor %s",
                s: "ein paar Sekunden",
                ss: "%d Sekunden",
                m: t,
                mm: "%d Minuten",
                h: t,
                hh: "%d Stunden",
                d: t,
                dd: t,
                M: t,
                MM: t,
                y: t,
                yy: t
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n, i)
        {
            var r = {
                m: ["eine Minute", "einer Minute"],
                h: ["eine Stunde", "einer Stunde"],
                d: ["ein Tag", "einem Tag"],
                dd: [e + " Tage", e + " Tagen"],
                M: ["ein Monat", "einem Monat"],
                MM: [e + " Monate", e + " Monaten"],
                y: ["ein Jahr", "einem Jahr"],
                yy: [e + " Jahre", e + " Jahren"]
            };
            return t ? r[n][0] : r[n][1]
        }
        e.defineLocale("de-ch",
        {
            months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
            monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
            monthsParseExact: !0,
            weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
            weekdaysShort: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
            weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY HH:mm",
                LLLL: "dddd, D. MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[heute um] LT [Uhr]",
                sameElse: "L",
                nextDay: "[morgen um] LT [Uhr]",
                nextWeek: "dddd [um] LT [Uhr]",
                lastDay: "[gestern um] LT [Uhr]",
                lastWeek: "[letzten] dddd [um] LT [Uhr]"
            },
            relativeTime:
            {
                future: "in %s",
                past: "vor %s",
                s: "ein paar Sekunden",
                ss: "%d Sekunden",
                m: t,
                mm: "%d Minuten",
                h: t,
                hh: "%d Stunden",
                d: t,
                dd: t,
                M: t,
                MM: t,
                y: t,
                yy: t
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = ["ޖެނުއަރީ", "ފެބްރުއަރީ", "މާރިޗު", "އޭޕްރީލު", "މޭ", "ޖޫން", "ޖުލައި", "އޯގަސްޓު", "ސެޕްޓެމްބަރު", "އޮކްޓޯބަރު", "ނޮވެމްބަރު", "ޑިސެމްބަރު"],
            n = ["އާދިއްތަ", "ހޯމަ", "އަންގާރަ", "ބުދަ", "ބުރާސްފަތި", "ހުކުރު", "ހޮނިހިރު"];
        e.defineLocale("dv",
        {
            months: t,
            monthsShort: t,
            weekdays: n,
            weekdaysShort: n,
            weekdaysMin: "އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "D/M/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            meridiemParse: /މކ|މފ/,
            isPM: function (e)
            {
                return "މފ" === e
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "މކ" : "މފ"
            },
            calendar:
            {
                sameDay: "[މިއަދު] LT",
                nextDay: "[މާދަމާ] LT",
                nextWeek: "dddd LT",
                lastDay: "[އިއްޔެ] LT",
                lastWeek: "[ފާއިތުވި] dddd LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "ތެރޭގައި %s",
                past: "ކުރިން %s",
                s: "ސިކުންތުކޮޅެއް",
                ss: "d% ސިކުންތު",
                m: "މިނިޓެއް",
                mm: "މިނިޓު %d",
                h: "ގަޑިއިރެއް",
                hh: "ގަޑިއިރު %d",
                d: "ދުވަހެއް",
                dd: "ދުވަސް %d",
                M: "މަހެއް",
                MM: "މަސް %d",
                y: "އަހަރެއް",
                yy: "އަހަރު %d"
            },
            preparse: function (e)
            {
                return e.replace(/،/g, ",")
            },
            postformat: function (e)
            {
                return e.replace(/,/g, "،")
            },
            week:
            {
                dow: 7,
                doy: 12
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("el",
        {
            monthsNominativeEl: "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),
            monthsGenitiveEl: "Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),
            months: function (e, t)
            {
                return e ? "string" == typeof t && /D/.test(t.substring(0, t.indexOf("MMMM"))) ? this._monthsGenitiveEl[e.month()] : this._monthsNominativeEl[e.month()] : this._monthsNominativeEl
            },
            monthsShort: "Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),
            weekdays: "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),
            weekdaysShort: "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
            weekdaysMin: "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
            meridiem: function (e, t, n)
            {
                return e > 11 ? n ? "μμ" : "ΜΜ" : n ? "πμ" : "ΠΜ"
            },
            isPM: function (e)
            {
                return "μ" === (e + "").toLowerCase()[0]
            },
            meridiemParse: /[ΠΜ]\.?Μ?\.?/i,
            longDateFormat:
            {
                LT: "h:mm A",
                LTS: "h:mm:ss A",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY h:mm A",
                LLLL: "dddd, D MMMM YYYY h:mm A"
            },
            calendarEl:
            {
                sameDay: "[Σήμερα {}] LT",
                nextDay: "[Αύριο {}] LT",
                nextWeek: "dddd [{}] LT",
                lastDay: "[Χθες {}] LT",
                lastWeek: function ()
                {
                    switch (this.day())
                    {
                    case 6:
                        return "[το προηγούμενο] dddd [{}] LT";
                    default:
                        return "[την προηγούμενη] dddd [{}] LT"
                    }
                },
                sameElse: "L"
            },
            calendar: function (e, t)
            {
                var n, i = this._calendarEl[e],
                    r = t && t.hours();
                return ((n = i) instanceof Function || "[object Function]" === Object.prototype.toString.call(n)) && (i = i.apply(t)), i.replace("{}", r % 12 == 1 ? "στη" : "στις")
            },
            relativeTime:
            {
                future: "σε %s",
                past: "%s πριν",
                s: "λίγα δευτερόλεπτα",
                ss: "%d δευτερόλεπτα",
                m: "ένα λεπτό",
                mm: "%d λεπτά",
                h: "μία ώρα",
                hh: "%d ώρες",
                d: "μία μέρα",
                dd: "%d μέρες",
                M: "ένας μήνας",
                MM: "%d μήνες",
                y: "ένας χρόνος",
                yy: "%d χρόνια"
            },
            dayOfMonthOrdinalParse: /\d{1,2}η/,
            ordinal: "%dη",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("en-au",
        {
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat:
            {
                LT: "h:mm A",
                LTS: "h:mm:ss A",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY h:mm A",
                LLLL: "dddd, D MMMM YYYY h:mm A"
            },
            calendar:
            {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                ss: "%d seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e)
            {
                var t = e % 10,
                    n = 1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
                return e + n
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("en-ca",
        {
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat:
            {
                LT: "h:mm A",
                LTS: "h:mm:ss A",
                L: "YYYY-MM-DD",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY h:mm A",
                LLLL: "dddd, MMMM D, YYYY h:mm A"
            },
            calendar:
            {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                ss: "%d seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e)
            {
                var t = e % 10,
                    n = 1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
                return e + n
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("en-gb",
        {
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                ss: "%d seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e)
            {
                var t = e % 10,
                    n = 1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
                return e + n
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("en-ie",
        {
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD-MM-YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                ss: "%d seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e)
            {
                var t = e % 10,
                    n = 1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
                return e + n
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("en-il",
        {
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e)
            {
                var t = e % 10,
                    n = 1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
                return e + n
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("en-nz",
        {
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat:
            {
                LT: "h:mm A",
                LTS: "h:mm:ss A",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY h:mm A",
                LLLL: "dddd, D MMMM YYYY h:mm A"
            },
            calendar:
            {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                ss: "%d seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e)
            {
                var t = e % 10,
                    n = 1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
                return e + n
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("eo",
        {
            months: "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),
            monthsShort: "jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),
            weekdays: "dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato".split("_"),
            weekdaysShort: "dim_lun_mard_merk_ĵaŭ_ven_sab".split("_"),
            weekdaysMin: "di_lu_ma_me_ĵa_ve_sa".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "YYYY-MM-DD",
                LL: "D[-a de] MMMM, YYYY",
                LLL: "D[-a de] MMMM, YYYY HH:mm",
                LLLL: "dddd, [la] D[-a de] MMMM, YYYY HH:mm"
            },
            meridiemParse: /[ap]\.t\.m/i,
            isPM: function (e)
            {
                return "p" === e.charAt(0).toLowerCase()
            },
            meridiem: function (e, t, n)
            {
                return e > 11 ? n ? "p.t.m." : "P.T.M." : n ? "a.t.m." : "A.T.M."
            },
            calendar:
            {
                sameDay: "[Hodiaŭ je] LT",
                nextDay: "[Morgaŭ je] LT",
                nextWeek: "dddd [je] LT",
                lastDay: "[Hieraŭ je] LT",
                lastWeek: "[pasinta] dddd [je] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "post %s",
                past: "antaŭ %s",
                s: "sekundoj",
                ss: "%d sekundoj",
                m: "minuto",
                mm: "%d minutoj",
                h: "horo",
                hh: "%d horoj",
                d: "tago",
                dd: "%d tagoj",
                M: "monato",
                MM: "%d monatoj",
                y: "jaro",
                yy: "%d jaroj"
            },
            dayOfMonthOrdinalParse: /\d{1,2}a/,
            ordinal: "%da",
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
            n = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
            i = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i],
            r = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
        e.defineLocale("es",
        {
            months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
            monthsShort: function (e, i)
            {
                return e ? /-MMM-/.test(i) ? n[e.month()] : t[e.month()] : t
            },
            monthsRegex: r,
            monthsShortRegex: r,
            monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
            monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
            monthsParse: i,
            longMonthsParse: i,
            shortMonthsParse: i,
            weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
            weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
            weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D [de] MMMM [de] YYYY",
                LLL: "D [de] MMMM [de] YYYY H:mm",
                LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
            },
            calendar:
            {
                sameDay: function ()
                {
                    return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                nextDay: function ()
                {
                    return "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                nextWeek: function ()
                {
                    return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                lastDay: function ()
                {
                    return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                lastWeek: function ()
                {
                    return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "en %s",
                past: "hace %s",
                s: "unos segundos",
                ss: "%d segundos",
                m: "un minuto",
                mm: "%d minutos",
                h: "una hora",
                hh: "%d horas",
                d: "un día",
                dd: "%d días",
                M: "un mes",
                MM: "%d meses",
                y: "un año",
                yy: "%d años"
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
            n = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
            i = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i],
            r = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
        e.defineLocale("es-do",
        {
            months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
            monthsShort: function (e, i)
            {
                return e ? /-MMM-/.test(i) ? n[e.month()] : t[e.month()] : t
            },
            monthsRegex: r,
            monthsShortRegex: r,
            monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
            monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
            monthsParse: i,
            longMonthsParse: i,
            shortMonthsParse: i,
            weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
            weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
            weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "h:mm A",
                LTS: "h:mm:ss A",
                L: "DD/MM/YYYY",
                LL: "D [de] MMMM [de] YYYY",
                LLL: "D [de] MMMM [de] YYYY h:mm A",
                LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
            },
            calendar:
            {
                sameDay: function ()
                {
                    return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                nextDay: function ()
                {
                    return "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                nextWeek: function ()
                {
                    return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                lastDay: function ()
                {
                    return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                lastWeek: function ()
                {
                    return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "en %s",
                past: "hace %s",
                s: "unos segundos",
                ss: "%d segundos",
                m: "un minuto",
                mm: "%d minutos",
                h: "una hora",
                hh: "%d horas",
                d: "un día",
                dd: "%d días",
                M: "un mes",
                MM: "%d meses",
                y: "un año",
                yy: "%d años"
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
            n = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
        e.defineLocale("es-us",
        {
            months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
            monthsShort: function (e, i)
            {
                return e ? /-MMM-/.test(i) ? n[e.month()] : t[e.month()] : t
            },
            monthsParseExact: !0,
            weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
            weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
            weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "h:mm A",
                LTS: "h:mm:ss A",
                L: "MM/DD/YYYY",
                LL: "MMMM [de] D [de] YYYY",
                LLL: "MMMM [de] D [de] YYYY h:mm A",
                LLLL: "dddd, MMMM [de] D [de] YYYY h:mm A"
            },
            calendar:
            {
                sameDay: function ()
                {
                    return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                nextDay: function ()
                {
                    return "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                nextWeek: function ()
                {
                    return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                lastDay: function ()
                {
                    return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                lastWeek: function ()
                {
                    return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "en %s",
                past: "hace %s",
                s: "unos segundos",
                ss: "%d segundos",
                m: "un minuto",
                mm: "%d minutos",
                h: "una hora",
                hh: "%d horas",
                d: "un día",
                dd: "%d días",
                M: "un mes",
                MM: "%d meses",
                y: "un año",
                yy: "%d años"
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week:
            {
                dow: 0,
                doy: 6
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n, i)
        {
            var r = {
                s: ["mõne sekundi", "mõni sekund", "paar sekundit"],
                ss: [e + "sekundi", e + "sekundit"],
                m: ["ühe minuti", "üks minut"],
                mm: [e + " minuti", e + " minutit"],
                h: ["ühe tunni", "tund aega", "üks tund"],
                hh: [e + " tunni", e + " tundi"],
                d: ["ühe päeva", "üks päev"],
                M: ["kuu aja", "kuu aega", "üks kuu"],
                MM: [e + " kuu", e + " kuud"],
                y: ["ühe aasta", "aasta", "üks aasta"],
                yy: [e + " aasta", e + " aastat"]
            };
            return t ? r[n][2] ? r[n][2] : r[n][1] : i ? r[n][0] : r[n][1]
        }
        e.defineLocale("et",
        {
            months: "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
            monthsShort: "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
            weekdays: "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),
            weekdaysShort: "P_E_T_K_N_R_L".split("_"),
            weekdaysMin: "P_E_T_K_N_R_L".split("_"),
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY H:mm",
                LLLL: "dddd, D. MMMM YYYY H:mm"
            },
            calendar:
            {
                sameDay: "[Täna,] LT",
                nextDay: "[Homme,] LT",
                nextWeek: "[Järgmine] dddd LT",
                lastDay: "[Eile,] LT",
                lastWeek: "[Eelmine] dddd LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s pärast",
                past: "%s tagasi",
                s: t,
                ss: t,
                m: t,
                mm: t,
                h: t,
                hh: t,
                d: t,
                dd: "%d päeva",
                M: t,
                MM: t,
                y: t,
                yy: t
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("eu",
        {
            months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),
            monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),
            monthsParseExact: !0,
            weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),
            weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"),
            weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "YYYY-MM-DD",
                LL: "YYYY[ko] MMMM[ren] D[a]",
                LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm",
                LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",
                l: "YYYY-M-D",
                ll: "YYYY[ko] MMM D[a]",
                lll: "YYYY[ko] MMM D[a] HH:mm",
                llll: "ddd, YYYY[ko] MMM D[a] HH:mm"
            },
            calendar:
            {
                sameDay: "[gaur] LT[etan]",
                nextDay: "[bihar] LT[etan]",
                nextWeek: "dddd LT[etan]",
                lastDay: "[atzo] LT[etan]",
                lastWeek: "[aurreko] dddd LT[etan]",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s barru",
                past: "duela %s",
                s: "segundo batzuk",
                ss: "%d segundo",
                m: "minutu bat",
                mm: "%d minutu",
                h: "ordu bat",
                hh: "%d ordu",
                d: "egun bat",
                dd: "%d egun",
                M: "hilabete bat",
                MM: "%d hilabete",
                y: "urte bat",
                yy: "%d urte"
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "۱",
                2: "۲",
                3: "۳",
                4: "۴",
                5: "۵",
                6: "۶",
                7: "۷",
                8: "۸",
                9: "۹",
                0: "۰"
            },
            n = {
                "۱": "1",
                "۲": "2",
                "۳": "3",
                "۴": "4",
                "۵": "5",
                "۶": "6",
                "۷": "7",
                "۸": "8",
                "۹": "9",
                "۰": "0"
            };
        e.defineLocale("fa",
        {
            months: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
            monthsShort: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
            weekdays: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
            weekdaysShort: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
            weekdaysMin: "ی_د_س_چ_پ_ج_ش".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            meridiemParse: /قبل از ظهر|بعد از ظهر/,
            isPM: function (e)
            {
                return /بعد از ظهر/.test(e)
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "قبل از ظهر" : "بعد از ظهر"
            },
            calendar:
            {
                sameDay: "[امروز ساعت] LT",
                nextDay: "[فردا ساعت] LT",
                nextWeek: "dddd [ساعت] LT",
                lastDay: "[دیروز ساعت] LT",
                lastWeek: "dddd [پیش] [ساعت] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "در %s",
                past: "%s پیش",
                s: "چند ثانیه",
                ss: "ثانیه d%",
                m: "یک دقیقه",
                mm: "%d دقیقه",
                h: "یک ساعت",
                hh: "%d ساعت",
                d: "یک روز",
                dd: "%d روز",
                M: "یک ماه",
                MM: "%d ماه",
                y: "یک سال",
                yy: "%d سال"
            },
            preparse: function (e)
            {
                return e.replace(/[۰-۹]/g, function (e)
                {
                    return n[e]
                }).replace(/،/g, ",")
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                }).replace(/,/g, "،")
            },
            dayOfMonthOrdinalParse: /\d{1,2}م/,
            ordinal: "%dم",
            week:
            {
                dow: 6,
                doy: 12
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "),
            n = ["nolla", "yhden", "kahden", "kolmen", "neljän", "viiden", "kuuden", t[7], t[8], t[9]];

        function i(e, i, r, a)
        {
            var o = "";
            switch (r)
            {
            case "s":
                return a ? "muutaman sekunnin" : "muutama sekunti";
            case "ss":
                return a ? "sekunnin" : "sekuntia";
            case "m":
                return a ? "minuutin" : "minuutti";
            case "mm":
                o = a ? "minuutin" : "minuuttia";
                break;
            case "h":
                return a ? "tunnin" : "tunti";
            case "hh":
                o = a ? "tunnin" : "tuntia";
                break;
            case "d":
                return a ? "päivän" : "päivä";
            case "dd":
                o = a ? "päivän" : "päivää";
                break;
            case "M":
                return a ? "kuukauden" : "kuukausi";
            case "MM":
                o = a ? "kuukauden" : "kuukautta";
                break;
            case "y":
                return a ? "vuoden" : "vuosi";
            case "yy":
                o = a ? "vuoden" : "vuotta"
            }
            return o = function (e, i)
            {
                return e < 10 ? i ? n[e] : t[e] : e
            }(e, a) + " " + o
        }
        e.defineLocale("fi",
        {
            months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
            monthsShort: "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),
            weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
            weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
            weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
            longDateFormat:
            {
                LT: "HH.mm",
                LTS: "HH.mm.ss",
                L: "DD.MM.YYYY",
                LL: "Do MMMM[ta] YYYY",
                LLL: "Do MMMM[ta] YYYY, [klo] HH.mm",
                LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm",
                l: "D.M.YYYY",
                ll: "Do MMM YYYY",
                lll: "Do MMM YYYY, [klo] HH.mm",
                llll: "ddd, Do MMM YYYY, [klo] HH.mm"
            },
            calendar:
            {
                sameDay: "[tänään] [klo] LT",
                nextDay: "[huomenna] [klo] LT",
                nextWeek: "dddd [klo] LT",
                lastDay: "[eilen] [klo] LT",
                lastWeek: "[viime] dddd[na] [klo] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s päästä",
                past: "%s sitten",
                s: i,
                ss: i,
                m: i,
                mm: i,
                h: i,
                hh: i,
                d: i,
                dd: i,
                M: i,
                MM: i,
                y: i,
                yy: i
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("fo",
        {
            months: "januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),
            monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
            weekdays: "sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),
            weekdaysShort: "sun_mán_týs_mik_hós_frí_ley".split("_"),
            weekdaysMin: "su_má_tý_mi_hó_fr_le".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D. MMMM, YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Í dag kl.] LT",
                nextDay: "[Í morgin kl.] LT",
                nextWeek: "dddd [kl.] LT",
                lastDay: "[Í gjár kl.] LT",
                lastWeek: "[síðstu] dddd [kl] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "um %s",
                past: "%s síðani",
                s: "fá sekund",
                ss: "%d sekundir",
                m: "ein minutt",
                mm: "%d minuttir",
                h: "ein tími",
                hh: "%d tímar",
                d: "ein dagur",
                dd: "%d dagar",
                M: "ein mánaði",
                MM: "%d mánaðir",
                y: "eitt ár",
                yy: "%d ár"
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("fr",
        {
            months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
            monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
            monthsParseExact: !0,
            weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
            weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
            weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Aujourd’hui à] LT",
                nextDay: "[Demain à] LT",
                nextWeek: "dddd [à] LT",
                lastDay: "[Hier à] LT",
                lastWeek: "dddd [dernier à] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "dans %s",
                past: "il y a %s",
                s: "quelques secondes",
                ss: "%d secondes",
                m: "une minute",
                mm: "%d minutes",
                h: "une heure",
                hh: "%d heures",
                d: "un jour",
                dd: "%d jours",
                M: "un mois",
                MM: "%d mois",
                y: "un an",
                yy: "%d ans"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                case "D":
                    return e + (1 === e ? "er" : "");
                default:
                case "M":
                case "Q":
                case "DDD":
                case "d":
                    return e + (1 === e ? "er" : "e");
                case "w":
                case "W":
                    return e + (1 === e ? "re" : "e")
                }
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("fr-ca",
        {
            months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
            monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
            monthsParseExact: !0,
            weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
            weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
            weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "YYYY-MM-DD",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Aujourd’hui à] LT",
                nextDay: "[Demain à] LT",
                nextWeek: "dddd [à] LT",
                lastDay: "[Hier à] LT",
                lastWeek: "dddd [dernier à] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "dans %s",
                past: "il y a %s",
                s: "quelques secondes",
                ss: "%d secondes",
                m: "une minute",
                mm: "%d minutes",
                h: "une heure",
                hh: "%d heures",
                d: "un jour",
                dd: "%d jours",
                M: "un mois",
                MM: "%d mois",
                y: "un an",
                yy: "%d ans"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                default:
                case "M":
                case "Q":
                case "D":
                case "DDD":
                case "d":
                    return e + (1 === e ? "er" : "e");
                case "w":
                case "W":
                    return e + (1 === e ? "re" : "e")
                }
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("fr-ch",
        {
            months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
            monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
            monthsParseExact: !0,
            weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
            weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
            weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Aujourd’hui à] LT",
                nextDay: "[Demain à] LT",
                nextWeek: "dddd [à] LT",
                lastDay: "[Hier à] LT",
                lastWeek: "dddd [dernier à] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "dans %s",
                past: "il y a %s",
                s: "quelques secondes",
                ss: "%d secondes",
                m: "une minute",
                mm: "%d minutes",
                h: "une heure",
                hh: "%d heures",
                d: "un jour",
                dd: "%d jours",
                M: "un mois",
                MM: "%d mois",
                y: "un an",
                yy: "%d ans"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                default:
                case "M":
                case "Q":
                case "D":
                case "DDD":
                case "d":
                    return e + (1 === e ? "er" : "e");
                case "w":
                case "W":
                    return e + (1 === e ? "re" : "e")
                }
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"),
            n = "jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_");
        e.defineLocale("fy",
        {
            months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),
            monthsShort: function (e, i)
            {
                return e ? /-MMM-/.test(i) ? n[e.month()] : t[e.month()] : t
            },
            monthsParseExact: !0,
            weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),
            weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"),
            weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD-MM-YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[hjoed om] LT",
                nextDay: "[moarn om] LT",
                nextWeek: "dddd [om] LT",
                lastDay: "[juster om] LT",
                lastWeek: "[ôfrûne] dddd [om] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "oer %s",
                past: "%s lyn",
                s: "in pear sekonden",
                ss: "%d sekonden",
                m: "ien minút",
                mm: "%d minuten",
                h: "ien oere",
                hh: "%d oeren",
                d: "ien dei",
                dd: "%d dagen",
                M: "ien moanne",
                MM: "%d moannen",
                y: "ien jier",
                yy: "%d jierren"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
            ordinal: function (e)
            {
                return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de")
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("gd",
        {
            months: ["Am Faoilleach", "An Gearran", "Am Màrt", "An Giblean", "An Cèitean", "An t-Ògmhios", "An t-Iuchar", "An Lùnastal", "An t-Sultain", "An Dàmhair", "An t-Samhain", "An Dùbhlachd"],
            monthsShort: ["Faoi", "Gear", "Màrt", "Gibl", "Cèit", "Ògmh", "Iuch", "Lùn", "Sult", "Dàmh", "Samh", "Dùbh"],
            monthsParseExact: !0,
            weekdays: ["Didòmhnaich", "Diluain", "Dimàirt", "Diciadain", "Diardaoin", "Dihaoine", "Disathairne"],
            weekdaysShort: ["Did", "Dil", "Dim", "Dic", "Dia", "Dih", "Dis"],
            weekdaysMin: ["Dò", "Lu", "Mà", "Ci", "Ar", "Ha", "Sa"],
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[An-diugh aig] LT",
                nextDay: "[A-màireach aig] LT",
                nextWeek: "dddd [aig] LT",
                lastDay: "[An-dè aig] LT",
                lastWeek: "dddd [seo chaidh] [aig] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "ann an %s",
                past: "bho chionn %s",
                s: "beagan diogan",
                ss: "%d diogan",
                m: "mionaid",
                mm: "%d mionaidean",
                h: "uair",
                hh: "%d uairean",
                d: "latha",
                dd: "%d latha",
                M: "mìos",
                MM: "%d mìosan",
                y: "bliadhna",
                yy: "%d bliadhna"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
            ordinal: function (e)
            {
                var t = 1 === e ? "d" : e % 10 == 2 ? "na" : "mh";
                return e + t
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("gl",
        {
            months: "xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),
            monthsShort: "xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.".split("_"),
            monthsParseExact: !0,
            weekdays: "domingo_luns_martes_mércores_xoves_venres_sábado".split("_"),
            weekdaysShort: "dom._lun._mar._mér._xov._ven._sáb.".split("_"),
            weekdaysMin: "do_lu_ma_mé_xo_ve_sá".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D [de] MMMM [de] YYYY",
                LLL: "D [de] MMMM [de] YYYY H:mm",
                LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
            },
            calendar:
            {
                sameDay: function ()
                {
                    return "[hoxe " + (1 !== this.hours() ? "ás" : "á") + "] LT"
                },
                nextDay: function ()
                {
                    return "[mañá " + (1 !== this.hours() ? "ás" : "á") + "] LT"
                },
                nextWeek: function ()
                {
                    return "dddd [" + (1 !== this.hours() ? "ás" : "a") + "] LT"
                },
                lastDay: function ()
                {
                    return "[onte " + (1 !== this.hours() ? "á" : "a") + "] LT"
                },
                lastWeek: function ()
                {
                    return "[o] dddd [pasado " + (1 !== this.hours() ? "ás" : "a") + "] LT"
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: function (e)
                {
                    return 0 === e.indexOf("un") ? "n" + e : "en " + e
                },
                past: "hai %s",
                s: "uns segundos",
                ss: "%d segundos",
                m: "un minuto",
                mm: "%d minutos",
                h: "unha hora",
                hh: "%d horas",
                d: "un día",
                dd: "%d días",
                M: "un mes",
                MM: "%d meses",
                y: "un ano",
                yy: "%d anos"
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n, i)
        {
            var r = {
                s: ["thodde secondanim", "thodde second"],
                ss: [e + " secondanim", e + " second"],
                m: ["eka mintan", "ek minute"],
                mm: [e + " mintanim", e + " mintam"],
                h: ["eka horan", "ek hor"],
                hh: [e + " horanim", e + " horam"],
                d: ["eka disan", "ek dis"],
                dd: [e + " disanim", e + " dis"],
                M: ["eka mhoinean", "ek mhoino"],
                MM: [e + " mhoineanim", e + " mhoine"],
                y: ["eka vorsan", "ek voros"],
                yy: [e + " vorsanim", e + " vorsam"]
            };
            return t ? r[n][0] : r[n][1]
        }
        e.defineLocale("gom-latn",
        {
            months: "Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"),
            monthsShort: "Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"),
            monthsParseExact: !0,
            weekdays: "Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split("_"),
            weekdaysShort: "Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"),
            weekdaysMin: "Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "A h:mm [vazta]",
                LTS: "A h:mm:ss [vazta]",
                L: "DD-MM-YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY A h:mm [vazta]",
                LLLL: "dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]",
                llll: "ddd, D MMM YYYY, A h:mm [vazta]"
            },
            calendar:
            {
                sameDay: "[Aiz] LT",
                nextDay: "[Faleam] LT",
                nextWeek: "[Ieta to] dddd[,] LT",
                lastDay: "[Kal] LT",
                lastWeek: "[Fatlo] dddd[,] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s",
                past: "%s adim",
                s: t,
                ss: t,
                m: t,
                mm: t,
                h: t,
                hh: t,
                d: t,
                dd: t,
                M: t,
                MM: t,
                y: t,
                yy: t
            },
            dayOfMonthOrdinalParse: /\d{1,2}(er)/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                case "D":
                    return e + "er";
                default:
                case "M":
                case "Q":
                case "DDD":
                case "d":
                case "w":
                case "W":
                    return e
                }
            },
            week:
            {
                dow: 1,
                doy: 4
            },
            meridiemParse: /rati|sokalli|donparam|sanje/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "rati" === t ? e < 4 ? e : e + 12 : "sokalli" === t ? e : "donparam" === t ? e > 12 ? e : e + 12 : "sanje" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "rati" : e < 12 ? "sokalli" : e < 16 ? "donparam" : e < 20 ? "sanje" : "rati"
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "૧",
                2: "૨",
                3: "૩",
                4: "૪",
                5: "૫",
                6: "૬",
                7: "૭",
                8: "૮",
                9: "૯",
                0: "૦"
            },
            n = {
                "૧": "1",
                "૨": "2",
                "૩": "3",
                "૪": "4",
                "૫": "5",
                "૬": "6",
                "૭": "7",
                "૮": "8",
                "૯": "9",
                "૦": "0"
            };
        e.defineLocale("gu",
        {
            months: "જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર".split("_"),
            monthsShort: "જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.".split("_"),
            monthsParseExact: !0,
            weekdays: "રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર".split("_"),
            weekdaysShort: "રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ".split("_"),
            weekdaysMin: "ર_સો_મં_બુ_ગુ_શુ_શ".split("_"),
            longDateFormat:
            {
                LT: "A h:mm વાગ્યે",
                LTS: "A h:mm:ss વાગ્યે",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY, A h:mm વાગ્યે",
                LLLL: "dddd, D MMMM YYYY, A h:mm વાગ્યે"
            },
            calendar:
            {
                sameDay: "[આજ] LT",
                nextDay: "[કાલે] LT",
                nextWeek: "dddd, LT",
                lastDay: "[ગઇકાલે] LT",
                lastWeek: "[પાછલા] dddd, LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s મા",
                past: "%s પેહલા",
                s: "અમુક પળો",
                ss: "%d સેકંડ",
                m: "એક મિનિટ",
                mm: "%d મિનિટ",
                h: "એક કલાક",
                hh: "%d કલાક",
                d: "એક દિવસ",
                dd: "%d દિવસ",
                M: "એક મહિનો",
                MM: "%d મહિનો",
                y: "એક વર્ષ",
                yy: "%d વર્ષ"
            },
            preparse: function (e)
            {
                return e.replace(/[૧૨૩૪૫૬૭૮૯૦]/g, function (e)
                {
                    return n[e]
                })
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                })
            },
            meridiemParse: /રાત|બપોર|સવાર|સાંજ/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "રાત" === t ? e < 4 ? e : e + 12 : "સવાર" === t ? e : "બપોર" === t ? e >= 10 ? e : e + 12 : "સાંજ" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "રાત" : e < 10 ? "સવાર" : e < 17 ? "બપોર" : e < 20 ? "સાંજ" : "રાત"
            },
            week:
            {
                dow: 0,
                doy: 6
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("he",
        {
            months: "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),
            monthsShort: "ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),
            weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
            weekdaysShort: "א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),
            weekdaysMin: "א_ב_ג_ד_ה_ו_ש".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D [ב]MMMM YYYY",
                LLL: "D [ב]MMMM YYYY HH:mm",
                LLLL: "dddd, D [ב]MMMM YYYY HH:mm",
                l: "D/M/YYYY",
                ll: "D MMM YYYY",
                lll: "D MMM YYYY HH:mm",
                llll: "ddd, D MMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[היום ב־]LT",
                nextDay: "[מחר ב־]LT",
                nextWeek: "dddd [בשעה] LT",
                lastDay: "[אתמול ב־]LT",
                lastWeek: "[ביום] dddd [האחרון בשעה] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "בעוד %s",
                past: "לפני %s",
                s: "מספר שניות",
                ss: "%d שניות",
                m: "דקה",
                mm: "%d דקות",
                h: "שעה",
                hh: function (e)
                {
                    return 2 === e ? "שעתיים" : e + " שעות"
                },
                d: "יום",
                dd: function (e)
                {
                    return 2 === e ? "יומיים" : e + " ימים"
                },
                M: "חודש",
                MM: function (e)
                {
                    return 2 === e ? "חודשיים" : e + " חודשים"
                },
                y: "שנה",
                yy: function (e)
                {
                    return 2 === e ? "שנתיים" : e % 10 == 0 && 10 !== e ? e + " שנה" : e + " שנים"
                }
            },
            meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
            isPM: function (e)
            {
                return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(e)
            },
            meridiem: function (e, t, n)
            {
                return e < 5 ? "לפנות בוקר" : e < 10 ? "בבוקר" : e < 12 ? n ? 'לפנה"צ' : "לפני הצהריים" : e < 18 ? n ? 'אחה"צ' : "אחרי הצהריים" : "בערב"
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "१",
                2: "२",
                3: "३",
                4: "४",
                5: "५",
                6: "६",
                7: "७",
                8: "८",
                9: "९",
                0: "०"
            },
            n = {
                "१": "1",
                "२": "2",
                "३": "3",
                "४": "4",
                "५": "5",
                "६": "6",
                "७": "7",
                "८": "8",
                "९": "9",
                "०": "0"
            };
        e.defineLocale("hi",
        {
            months: "जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),
            monthsShort: "जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),
            monthsParseExact: !0,
            weekdays: "रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
            weekdaysShort: "रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),
            weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
            longDateFormat:
            {
                LT: "A h:mm बजे",
                LTS: "A h:mm:ss बजे",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY, A h:mm बजे",
                LLLL: "dddd, D MMMM YYYY, A h:mm बजे"
            },
            calendar:
            {
                sameDay: "[आज] LT",
                nextDay: "[कल] LT",
                nextWeek: "dddd, LT",
                lastDay: "[कल] LT",
                lastWeek: "[पिछले] dddd, LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s में",
                past: "%s पहले",
                s: "कुछ ही क्षण",
                ss: "%d सेकंड",
                m: "एक मिनट",
                mm: "%d मिनट",
                h: "एक घंटा",
                hh: "%d घंटे",
                d: "एक दिन",
                dd: "%d दिन",
                M: "एक महीने",
                MM: "%d महीने",
                y: "एक वर्ष",
                yy: "%d वर्ष"
            },
            preparse: function (e)
            {
                return e.replace(/[१२३४५६७८९०]/g, function (e)
                {
                    return n[e]
                })
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                })
            },
            meridiemParse: /रात|सुबह|दोपहर|शाम/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "रात" === t ? e < 4 ? e : e + 12 : "सुबह" === t ? e : "दोपहर" === t ? e >= 10 ? e : e + 12 : "शाम" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "रात" : e < 10 ? "सुबह" : e < 17 ? "दोपहर" : e < 20 ? "शाम" : "रात"
            },
            week:
            {
                dow: 0,
                doy: 6
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n)
        {
            var i = e + " ";
            switch (n)
            {
            case "ss":
                return i += 1 === e ? "sekunda" : 2 === e || 3 === e || 4 === e ? "sekunde" : "sekundi";
            case "m":
                return t ? "jedna minuta" : "jedne minute";
            case "mm":
                return i += 1 === e ? "minuta" : 2 === e || 3 === e || 4 === e ? "minute" : "minuta";
            case "h":
                return t ? "jedan sat" : "jednog sata";
            case "hh":
                return i += 1 === e ? "sat" : 2 === e || 3 === e || 4 === e ? "sata" : "sati";
            case "dd":
                return i += 1 === e ? "dan" : "dana";
            case "MM":
                return i += 1 === e ? "mjesec" : 2 === e || 3 === e || 4 === e ? "mjeseca" : "mjeseci";
            case "yy":
                return i += 1 === e ? "godina" : 2 === e || 3 === e || 4 === e ? "godine" : "godina"
            }
        }
        e.defineLocale("hr",
        {
            months:
            {
                format: "siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"),
                standalone: "siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_")
            },
            monthsShort: "sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),
            monthsParseExact: !0,
            weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
            weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
            weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY H:mm",
                LLLL: "dddd, D. MMMM YYYY H:mm"
            },
            calendar:
            {
                sameDay: "[danas u] LT",
                nextDay: "[sutra u] LT",
                nextWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                        return "[u] [nedjelju] [u] LT";
                    case 3:
                        return "[u] [srijedu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                    }
                },
                lastDay: "[jučer u] LT",
                lastWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                    case 3:
                        return "[prošlu] dddd [u] LT";
                    case 6:
                        return "[prošle] [subote] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[prošli] dddd [u] LT"
                    }
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "za %s",
                past: "prije %s",
                s: "par sekundi",
                ss: t,
                m: t,
                mm: t,
                h: t,
                hh: t,
                d: "dan",
                dd: t,
                M: "mjesec",
                MM: t,
                y: "godinu",
                yy: t
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = "vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ");

        function n(e, t, n, i)
        {
            var r = e;
            switch (n)
            {
            case "s":
                return i || t ? "néhány másodperc" : "néhány másodperce";
            case "ss":
                return r + (i || t) ? " másodperc" : " másodperce";
            case "m":
                return "egy" + (i || t ? " perc" : " perce");
            case "mm":
                return r + (i || t ? " perc" : " perce");
            case "h":
                return "egy" + (i || t ? " óra" : " órája");
            case "hh":
                return r + (i || t ? " óra" : " órája");
            case "d":
                return "egy" + (i || t ? " nap" : " napja");
            case "dd":
                return r + (i || t ? " nap" : " napja");
            case "M":
                return "egy" + (i || t ? " hónap" : " hónapja");
            case "MM":
                return r + (i || t ? " hónap" : " hónapja");
            case "y":
                return "egy" + (i || t ? " év" : " éve");
            case "yy":
                return r + (i || t ? " év" : " éve")
            }
            return ""
        }

        function i(e)
        {
            return (e ? "" : "[múlt] ") + "[" + t[this.day()] + "] LT[-kor]"
        }
        e.defineLocale("hu",
        {
            months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
            monthsShort: "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
            weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
            weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"),
            weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "YYYY.MM.DD.",
                LL: "YYYY. MMMM D.",
                LLL: "YYYY. MMMM D. H:mm",
                LLLL: "YYYY. MMMM D., dddd H:mm"
            },
            meridiemParse: /de|du/i,
            isPM: function (e)
            {
                return "u" === e.charAt(1).toLowerCase()
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? !0 === n ? "de" : "DE" : !0 === n ? "du" : "DU"
            },
            calendar:
            {
                sameDay: "[ma] LT[-kor]",
                nextDay: "[holnap] LT[-kor]",
                nextWeek: function ()
                {
                    return i.call(this, !0)
                },
                lastDay: "[tegnap] LT[-kor]",
                lastWeek: function ()
                {
                    return i.call(this, !1)
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s múlva",
                past: "%s",
                s: n,
                ss: n,
                m: n,
                mm: n,
                h: n,
                hh: n,
                d: n,
                dd: n,
                M: n,
                MM: n,
                y: n,
                yy: n
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("hy-am",
        {
            months:
            {
                format: "հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_"),
                standalone: "հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_")
            },
            monthsShort: "հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_"),
            weekdays: "կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_"),
            weekdaysShort: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
            weekdaysMin: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY թ.",
                LLL: "D MMMM YYYY թ., HH:mm",
                LLLL: "dddd, D MMMM YYYY թ., HH:mm"
            },
            calendar:
            {
                sameDay: "[այսօր] LT",
                nextDay: "[վաղը] LT",
                lastDay: "[երեկ] LT",
                nextWeek: function ()
                {
                    return "dddd [օրը ժամը] LT"
                },
                lastWeek: function ()
                {
                    return "[անցած] dddd [օրը ժամը] LT"
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s հետո",
                past: "%s առաջ",
                s: "մի քանի վայրկյան",
                ss: "%d վայրկյան",
                m: "րոպե",
                mm: "%d րոպե",
                h: "ժամ",
                hh: "%d ժամ",
                d: "օր",
                dd: "%d օր",
                M: "ամիս",
                MM: "%d ամիս",
                y: "տարի",
                yy: "%d տարի"
            },
            meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
            isPM: function (e)
            {
                return /^(ցերեկվա|երեկոյան)$/.test(e)
            },
            meridiem: function (e)
            {
                return e < 4 ? "գիշերվա" : e < 12 ? "առավոտվա" : e < 17 ? "ցերեկվա" : "երեկոյան"
            },
            dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                case "DDD":
                case "w":
                case "W":
                case "DDDo":
                    return 1 === e ? e + "-ին" : e + "-րդ";
                default:
                    return e
                }
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("id",
        {
            months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
            monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"),
            weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
            weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
            weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
            longDateFormat:
            {
                LT: "HH.mm",
                LTS: "HH.mm.ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY [pukul] HH.mm",
                LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
            },
            meridiemParse: /pagi|siang|sore|malam/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "pagi" === t ? e : "siang" === t ? e >= 11 ? e : e + 12 : "sore" === t || "malam" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                return e < 11 ? "pagi" : e < 15 ? "siang" : e < 19 ? "sore" : "malam"
            },
            calendar:
            {
                sameDay: "[Hari ini pukul] LT",
                nextDay: "[Besok pukul] LT",
                nextWeek: "dddd [pukul] LT",
                lastDay: "[Kemarin pukul] LT",
                lastWeek: "dddd [lalu pukul] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "dalam %s",
                past: "%s yang lalu",
                s: "beberapa detik",
                ss: "%d detik",
                m: "semenit",
                mm: "%d menit",
                h: "sejam",
                hh: "%d jam",
                d: "sehari",
                dd: "%d hari",
                M: "sebulan",
                MM: "%d bulan",
                y: "setahun",
                yy: "%d tahun"
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e)
        {
            return e % 100 == 11 || e % 10 != 1
        }

        function n(e, n, i, r)
        {
            var a = e + " ";
            switch (i)
            {
            case "s":
                return n || r ? "nokkrar sekúndur" : "nokkrum sekúndum";
            case "ss":
                return t(e) ? a + (n || r ? "sekúndur" : "sekúndum") : a + "sekúnda";
            case "m":
                return n ? "mínúta" : "mínútu";
            case "mm":
                return t(e) ? a + (n || r ? "mínútur" : "mínútum") : n ? a + "mínúta" : a + "mínútu";
            case "hh":
                return t(e) ? a + (n || r ? "klukkustundir" : "klukkustundum") : a + "klukkustund";
            case "d":
                return n ? "dagur" : r ? "dag" : "degi";
            case "dd":
                return t(e) ? n ? a + "dagar" : a + (r ? "daga" : "dögum") : n ? a + "dagur" : a + (r ? "dag" : "degi");
            case "M":
                return n ? "mánuður" : r ? "mánuð" : "mánuði";
            case "MM":
                return t(e) ? n ? a + "mánuðir" : a + (r ? "mánuði" : "mánuðum") : n ? a + "mánuður" : a + (r ? "mánuð" : "mánuði");
            case "y":
                return n || r ? "ár" : "ári";
            case "yy":
                return t(e) ? a + (n || r ? "ár" : "árum") : a + (n || r ? "ár" : "ári")
            }
        }
        e.defineLocale("is",
        {
            months: "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),
            monthsShort: "jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),
            weekdays: "sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),
            weekdaysShort: "sun_mán_þri_mið_fim_fös_lau".split("_"),
            weekdaysMin: "Su_Má_Þr_Mi_Fi_Fö_La".split("_"),
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY [kl.] H:mm",
                LLLL: "dddd, D. MMMM YYYY [kl.] H:mm"
            },
            calendar:
            {
                sameDay: "[í dag kl.] LT",
                nextDay: "[á morgun kl.] LT",
                nextWeek: "dddd [kl.] LT",
                lastDay: "[í gær kl.] LT",
                lastWeek: "[síðasta] dddd [kl.] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "eftir %s",
                past: "fyrir %s síðan",
                s: n,
                ss: n,
                m: n,
                mm: n,
                h: "klukkustund",
                hh: n,
                d: n,
                dd: n,
                M: n,
                MM: n,
                y: n,
                yy: n
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("it",
        {
            months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
            monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
            weekdays: "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"),
            weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
            weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Oggi alle] LT",
                nextDay: "[Domani alle] LT",
                nextWeek: "dddd [alle] LT",
                lastDay: "[Ieri alle] LT",
                lastWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                        return "[la scorsa] dddd [alle] LT";
                    default:
                        return "[lo scorso] dddd [alle] LT"
                    }
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: function (e)
                {
                    return (/^[0-9].+$/.test(e) ? "tra" : "in") + " " + e
                },
                past: "%s fa",
                s: "alcuni secondi",
                ss: "%d secondi",
                m: "un minuto",
                mm: "%d minuti",
                h: "un'ora",
                hh: "%d ore",
                d: "un giorno",
                dd: "%d giorni",
                M: "un mese",
                MM: "%d mesi",
                y: "un anno",
                yy: "%d anni"
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("ja",
        {
            months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
            weekdaysShort: "日_月_火_水_木_金_土".split("_"),
            weekdaysMin: "日_月_火_水_木_金_土".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "YYYY/MM/DD",
                LL: "YYYY年M月D日",
                LLL: "YYYY年M月D日 HH:mm",
                LLLL: "YYYY年M月D日 dddd HH:mm",
                l: "YYYY/MM/DD",
                ll: "YYYY年M月D日",
                lll: "YYYY年M月D日 HH:mm",
                llll: "YYYY年M月D日(ddd) HH:mm"
            },
            meridiemParse: /午前|午後/i,
            isPM: function (e)
            {
                return "午後" === e
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "午前" : "午後"
            },
            calendar:
            {
                sameDay: "[今日] LT",
                nextDay: "[明日] LT",
                nextWeek: function (e)
                {
                    return e.week() < this.week() ? "[来週]dddd LT" : "dddd LT"
                },
                lastDay: "[昨日] LT",
                lastWeek: function (e)
                {
                    return this.week() < e.week() ? "[先週]dddd LT" : "dddd LT"
                },
                sameElse: "L"
            },
            dayOfMonthOrdinalParse: /\d{1,2}日/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                case "d":
                case "D":
                case "DDD":
                    return e + "日";
                default:
                    return e
                }
            },
            relativeTime:
            {
                future: "%s後",
                past: "%s前",
                s: "数秒",
                ss: "%d秒",
                m: "1分",
                mm: "%d分",
                h: "1時間",
                hh: "%d時間",
                d: "1日",
                dd: "%d日",
                M: "1ヶ月",
                MM: "%dヶ月",
                y: "1年",
                yy: "%d年"
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("jv",
        {
            months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),
            monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),
            weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),
            weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),
            weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),
            longDateFormat:
            {
                LT: "HH.mm",
                LTS: "HH.mm.ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY [pukul] HH.mm",
                LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
            },
            meridiemParse: /enjing|siyang|sonten|ndalu/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "enjing" === t ? e : "siyang" === t ? e >= 11 ? e : e + 12 : "sonten" === t || "ndalu" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                return e < 11 ? "enjing" : e < 15 ? "siyang" : e < 19 ? "sonten" : "ndalu"
            },
            calendar:
            {
                sameDay: "[Dinten puniko pukul] LT",
                nextDay: "[Mbenjang pukul] LT",
                nextWeek: "dddd [pukul] LT",
                lastDay: "[Kala wingi pukul] LT",
                lastWeek: "dddd [kepengker pukul] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "wonten ing %s",
                past: "%s ingkang kepengker",
                s: "sawetawis detik",
                ss: "%d detik",
                m: "setunggal menit",
                mm: "%d menit",
                h: "setunggal jam",
                hh: "%d jam",
                d: "sedinten",
                dd: "%d dinten",
                M: "sewulan",
                MM: "%d wulan",
                y: "setaun",
                yy: "%d taun"
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("ka",
        {
            months:
            {
                standalone: "იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),
                format: "იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_")
            },
            monthsShort: "იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),
            weekdays:
            {
                standalone: "კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),
                format: "კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_"),
                isFormat: /(წინა|შემდეგ)/
            },
            weekdaysShort: "კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),
            weekdaysMin: "კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),
            longDateFormat:
            {
                LT: "h:mm A",
                LTS: "h:mm:ss A",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY h:mm A",
                LLLL: "dddd, D MMMM YYYY h:mm A"
            },
            calendar:
            {
                sameDay: "[დღეს] LT[-ზე]",
                nextDay: "[ხვალ] LT[-ზე]",
                lastDay: "[გუშინ] LT[-ზე]",
                nextWeek: "[შემდეგ] dddd LT[-ზე]",
                lastWeek: "[წინა] dddd LT-ზე",
                sameElse: "L"
            },
            relativeTime:
            {
                future: function (e)
                {
                    return /(წამი|წუთი|საათი|წელი)/.test(e) ? e.replace(/ი$/, "ში") : e + "ში"
                },
                past: function (e)
                {
                    return /(წამი|წუთი|საათი|დღე|თვე)/.test(e) ? e.replace(/(ი|ე)$/, "ის წინ") : /წელი/.test(e) ? e.replace(/წელი$/, "წლის წინ") : void 0
                },
                s: "რამდენიმე წამი",
                ss: "%d წამი",
                m: "წუთი",
                mm: "%d წუთი",
                h: "საათი",
                hh: "%d საათი",
                d: "დღე",
                dd: "%d დღე",
                M: "თვე",
                MM: "%d თვე",
                y: "წელი",
                yy: "%d წელი"
            },
            dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
            ordinal: function (e)
            {
                return 0 === e ? e : 1 === e ? e + "-ლი" : e < 20 || e <= 100 && e % 20 == 0 || e % 100 == 0 ? "მე-" + e : e + "-ე"
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
            0: "-ші",
            1: "-ші",
            2: "-ші",
            3: "-ші",
            4: "-ші",
            5: "-ші",
            6: "-шы",
            7: "-ші",
            8: "-ші",
            9: "-шы",
            10: "-шы",
            20: "-шы",
            30: "-шы",
            40: "-шы",
            50: "-ші",
            60: "-шы",
            70: "-ші",
            80: "-ші",
            90: "-шы",
            100: "-ші"
        };
        e.defineLocale("kk",
        {
            months: "қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан".split("_"),
            monthsShort: "қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел".split("_"),
            weekdays: "жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі".split("_"),
            weekdaysShort: "жек_дүй_сей_сәр_бей_жұм_сен".split("_"),
            weekdaysMin: "жк_дй_сй_ср_бй_жм_сн".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Бүгін сағат] LT",
                nextDay: "[Ертең сағат] LT",
                nextWeek: "dddd [сағат] LT",
                lastDay: "[Кеше сағат] LT",
                lastWeek: "[Өткен аптаның] dddd [сағат] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s ішінде",
                past: "%s бұрын",
                s: "бірнеше секунд",
                ss: "%d секунд",
                m: "бір минут",
                mm: "%d минут",
                h: "бір сағат",
                hh: "%d сағат",
                d: "бір күн",
                dd: "%d күн",
                M: "бір ай",
                MM: "%d ай",
                y: "бір жыл",
                yy: "%d жыл"
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/,
            ordinal: function (e)
            {
                var n = e % 10,
                    i = e >= 100 ? 100 : null;
                return e + (t[e] || t[n] || t[i])
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "១",
                2: "២",
                3: "៣",
                4: "៤",
                5: "៥",
                6: "៦",
                7: "៧",
                8: "៨",
                9: "៩",
                0: "០"
            },
            n = {
                "១": "1",
                "២": "2",
                "៣": "3",
                "៤": "4",
                "៥": "5",
                "៦": "6",
                "៧": "7",
                "៨": "8",
                "៩": "9",
                "០": "0"
            };
        e.defineLocale("km",
        {
            months: "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
            monthsShort: "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
            weekdays: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
            weekdaysShort: "អា_ច_អ_ព_ព្រ_សុ_ស".split("_"),
            weekdaysMin: "អា_ច_អ_ព_ព្រ_សុ_ស".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            meridiemParse: /ព្រឹក|ល្ងាច/,
            isPM: function (e)
            {
                return "ល្ងាច" === e
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "ព្រឹក" : "ល្ងាច"
            },
            calendar:
            {
                sameDay: "[ថ្ងៃនេះ ម៉ោង] LT",
                nextDay: "[ស្អែក ម៉ោង] LT",
                nextWeek: "dddd [ម៉ោង] LT",
                lastDay: "[ម្សិលមិញ ម៉ោង] LT",
                lastWeek: "dddd [សប្តាហ៍មុន] [ម៉ោង] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%sទៀត",
                past: "%sមុន",
                s: "ប៉ុន្មានវិនាទី",
                ss: "%d វិនាទី",
                m: "មួយនាទី",
                mm: "%d នាទី",
                h: "មួយម៉ោង",
                hh: "%d ម៉ោង",
                d: "មួយថ្ងៃ",
                dd: "%d ថ្ងៃ",
                M: "មួយខែ",
                MM: "%d ខែ",
                y: "មួយឆ្នាំ",
                yy: "%d ឆ្នាំ"
            },
            dayOfMonthOrdinalParse: /ទី\d{1,2}/,
            ordinal: "ទី%d",
            preparse: function (e)
            {
                return e.replace(/[១២៣៤៥៦៧៨៩០]/g, function (e)
                {
                    return n[e]
                })
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                })
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "೧",
                2: "೨",
                3: "೩",
                4: "೪",
                5: "೫",
                6: "೬",
                7: "೭",
                8: "೮",
                9: "೯",
                0: "೦"
            },
            n = {
                "೧": "1",
                "೨": "2",
                "೩": "3",
                "೪": "4",
                "೫": "5",
                "೬": "6",
                "೭": "7",
                "೮": "8",
                "೯": "9",
                "೦": "0"
            };
        e.defineLocale("kn",
        {
            months: "ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್".split("_"),
            monthsShort: "ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋ_ನವೆಂ_ಡಿಸೆಂ".split("_"),
            monthsParseExact: !0,
            weekdays: "ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ".split("_"),
            weekdaysShort: "ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ".split("_"),
            weekdaysMin: "ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ".split("_"),
            longDateFormat:
            {
                LT: "A h:mm",
                LTS: "A h:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY, A h:mm",
                LLLL: "dddd, D MMMM YYYY, A h:mm"
            },
            calendar:
            {
                sameDay: "[ಇಂದು] LT",
                nextDay: "[ನಾಳೆ] LT",
                nextWeek: "dddd, LT",
                lastDay: "[ನಿನ್ನೆ] LT",
                lastWeek: "[ಕೊನೆಯ] dddd, LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s ನಂತರ",
                past: "%s ಹಿಂದೆ",
                s: "ಕೆಲವು ಕ್ಷಣಗಳು",
                ss: "%d ಸೆಕೆಂಡುಗಳು",
                m: "ಒಂದು ನಿಮಿಷ",
                mm: "%d ನಿಮಿಷ",
                h: "ಒಂದು ಗಂಟೆ",
                hh: "%d ಗಂಟೆ",
                d: "ಒಂದು ದಿನ",
                dd: "%d ದಿನ",
                M: "ಒಂದು ತಿಂಗಳು",
                MM: "%d ತಿಂಗಳು",
                y: "ಒಂದು ವರ್ಷ",
                yy: "%d ವರ್ಷ"
            },
            preparse: function (e)
            {
                return e.replace(/[೧೨೩೪೫೬೭೮೯೦]/g, function (e)
                {
                    return n[e]
                })
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                })
            },
            meridiemParse: /ರಾತ್ರಿ|ಬೆಳಿಗ್ಗೆ|ಮಧ್ಯಾಹ್ನ|ಸಂಜೆ/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "ರಾತ್ರಿ" === t ? e < 4 ? e : e + 12 : "ಬೆಳಿಗ್ಗೆ" === t ? e : "ಮಧ್ಯಾಹ್ನ" === t ? e >= 10 ? e : e + 12 : "ಸಂಜೆ" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "ರಾತ್ರಿ" : e < 10 ? "ಬೆಳಿಗ್ಗೆ" : e < 17 ? "ಮಧ್ಯಾಹ್ನ" : e < 20 ? "ಸಂಜೆ" : "ರಾತ್ರಿ"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(ನೇ)/,
            ordinal: function (e)
            {
                return e + "ನೇ"
            },
            week:
            {
                dow: 0,
                doy: 6
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("ko",
        {
            months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
            monthsShort: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
            weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
            weekdaysShort: "일_월_화_수_목_금_토".split("_"),
            weekdaysMin: "일_월_화_수_목_금_토".split("_"),
            longDateFormat:
            {
                LT: "A h:mm",
                LTS: "A h:mm:ss",
                L: "YYYY.MM.DD.",
                LL: "YYYY년 MMMM D일",
                LLL: "YYYY년 MMMM D일 A h:mm",
                LLLL: "YYYY년 MMMM D일 dddd A h:mm",
                l: "YYYY.MM.DD.",
                ll: "YYYY년 MMMM D일",
                lll: "YYYY년 MMMM D일 A h:mm",
                llll: "YYYY년 MMMM D일 dddd A h:mm"
            },
            calendar:
            {
                sameDay: "오늘 LT",
                nextDay: "내일 LT",
                nextWeek: "dddd LT",
                lastDay: "어제 LT",
                lastWeek: "지난주 dddd LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s 후",
                past: "%s 전",
                s: "몇 초",
                ss: "%d초",
                m: "1분",
                mm: "%d분",
                h: "한 시간",
                hh: "%d시간",
                d: "하루",
                dd: "%d일",
                M: "한 달",
                MM: "%d달",
                y: "일 년",
                yy: "%d년"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(일|월|주)/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                case "d":
                case "D":
                case "DDD":
                    return e + "일";
                case "M":
                    return e + "월";
                case "w":
                case "W":
                    return e + "주";
                default:
                    return e
                }
            },
            meridiemParse: /오전|오후/,
            isPM: function (e)
            {
                return "오후" === e
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "오전" : "오후"
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "١",
                2: "٢",
                3: "٣",
                4: "٤",
                5: "٥",
                6: "٦",
                7: "٧",
                8: "٨",
                9: "٩",
                0: "٠"
            },
            n = {
                "١": "1",
                "٢": "2",
                "٣": "3",
                "٤": "4",
                "٥": "5",
                "٦": "6",
                "٧": "7",
                "٨": "8",
                "٩": "9",
                "٠": "0"
            },
            i = ["کانونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران", "تەمموز", "ئاب", "ئەیلوول", "تشرینی یەكەم", "تشرینی دووەم", "كانونی یەکەم"];
        e.defineLocale("ku",
        {
            months: i,
            monthsShort: i,
            weekdays: "یه‌كشه‌ممه‌_دووشه‌ممه‌_سێشه‌ممه‌_چوارشه‌ممه‌_پێنجشه‌ممه‌_هه‌ینی_شه‌ممه‌".split("_"),
            weekdaysShort: "یه‌كشه‌م_دووشه‌م_سێشه‌م_چوارشه‌م_پێنجشه‌م_هه‌ینی_شه‌ممه‌".split("_"),
            weekdaysMin: "ی_د_س_چ_پ_ه_ش".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            meridiemParse: /ئێواره‌|به‌یانی/,
            isPM: function (e)
            {
                return /ئێواره‌/.test(e)
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "به‌یانی" : "ئێواره‌"
            },
            calendar:
            {
                sameDay: "[ئه‌مرۆ كاتژمێر] LT",
                nextDay: "[به‌یانی كاتژمێر] LT",
                nextWeek: "dddd [كاتژمێر] LT",
                lastDay: "[دوێنێ كاتژمێر] LT",
                lastWeek: "dddd [كاتژمێر] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "له‌ %s",
                past: "%s",
                s: "چه‌ند چركه‌یه‌ك",
                ss: "چركه‌ %d",
                m: "یه‌ك خوله‌ك",
                mm: "%d خوله‌ك",
                h: "یه‌ك كاتژمێر",
                hh: "%d كاتژمێر",
                d: "یه‌ك ڕۆژ",
                dd: "%d ڕۆژ",
                M: "یه‌ك مانگ",
                MM: "%d مانگ",
                y: "یه‌ك ساڵ",
                yy: "%d ساڵ"
            },
            preparse: function (e)
            {
                return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (e)
                {
                    return n[e]
                }).replace(/،/g, ",")
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                }).replace(/,/g, "،")
            },
            week:
            {
                dow: 6,
                doy: 12
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
            0: "-чү",
            1: "-чи",
            2: "-чи",
            3: "-чү",
            4: "-чү",
            5: "-чи",
            6: "-чы",
            7: "-чи",
            8: "-чи",
            9: "-чу",
            10: "-чу",
            20: "-чы",
            30: "-чу",
            40: "-чы",
            50: "-чү",
            60: "-чы",
            70: "-чи",
            80: "-чи",
            90: "-чу",
            100: "-чү"
        };
        e.defineLocale("ky",
        {
            months: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
            monthsShort: "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
            weekdays: "Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби".split("_"),
            weekdaysShort: "Жек_Дүй_Шей_Шар_Бей_Жум_Ише".split("_"),
            weekdaysMin: "Жк_Дй_Шй_Шр_Бй_Жм_Иш".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Бүгүн саат] LT",
                nextDay: "[Эртең саат] LT",
                nextWeek: "dddd [саат] LT",
                lastDay: "[Кечээ саат] LT",
                lastWeek: "[Өткөн аптанын] dddd [күнү] [саат] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s ичинде",
                past: "%s мурун",
                s: "бирнече секунд",
                ss: "%d секунд",
                m: "бир мүнөт",
                mm: "%d мүнөт",
                h: "бир саат",
                hh: "%d саат",
                d: "бир күн",
                dd: "%d күн",
                M: "бир ай",
                MM: "%d ай",
                y: "бир жыл",
                yy: "%d жыл"
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
            ordinal: function (e)
            {
                var n = e % 10,
                    i = e >= 100 ? 100 : null;
                return e + (t[e] || t[n] || t[i])
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n, i)
        {
            var r = {
                m: ["eng Minutt", "enger Minutt"],
                h: ["eng Stonn", "enger Stonn"],
                d: ["een Dag", "engem Dag"],
                M: ["ee Mount", "engem Mount"],
                y: ["ee Joer", "engem Joer"]
            };
            return t ? r[n][0] : r[n][1]
        }

        function n(e)
        {
            if (e = parseInt(e, 10), isNaN(e)) return !1;
            if (e < 0) return !0;
            if (e < 10) return 4 <= e && e <= 7;
            if (e < 100)
            {
                var t = e % 10,
                    i = e / 10;
                return n(0 === t ? i : t)
            }
            if (e < 1e4)
            {
                for (; e >= 10;) e /= 10;
                return n(e)
            }
            return n(e /= 1e3)
        }
        e.defineLocale("lb",
        {
            months: "Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
            monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
            monthsParseExact: !0,
            weekdays: "Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),
            weekdaysShort: "So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),
            weekdaysMin: "So_Mé_Dë_Më_Do_Fr_Sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "H:mm [Auer]",
                LTS: "H:mm:ss [Auer]",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY H:mm [Auer]",
                LLLL: "dddd, D. MMMM YYYY H:mm [Auer]"
            },
            calendar:
            {
                sameDay: "[Haut um] LT",
                sameElse: "L",
                nextDay: "[Muer um] LT",
                nextWeek: "dddd [um] LT",
                lastDay: "[Gëschter um] LT",
                lastWeek: function ()
                {
                    switch (this.day())
                    {
                    case 2:
                    case 4:
                        return "[Leschten] dddd [um] LT";
                    default:
                        return "[Leschte] dddd [um] LT"
                    }
                }
            },
            relativeTime:
            {
                future: function (e)
                {
                    return n(e.substr(0, e.indexOf(" "))) ? "a " + e : "an " + e
                },
                past: function (e)
                {
                    return n(e.substr(0, e.indexOf(" "))) ? "viru " + e : "virun " + e
                },
                s: "e puer Sekonnen",
                ss: "%d Sekonnen",
                m: t,
                mm: "%d Minutten",
                h: t,
                hh: "%d Stonnen",
                d: t,
                dd: "%d Deeg",
                M: t,
                MM: "%d Méint",
                y: t,
                yy: "%d Joer"
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("lo",
        {
            months: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),
            monthsShort: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),
            weekdays: "ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),
            weekdaysShort: "ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),
            weekdaysMin: "ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "ວັນdddd D MMMM YYYY HH:mm"
            },
            meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
            isPM: function (e)
            {
                return "ຕອນແລງ" === e
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "ຕອນເຊົ້າ" : "ຕອນແລງ"
            },
            calendar:
            {
                sameDay: "[ມື້ນີ້ເວລາ] LT",
                nextDay: "[ມື້ອື່ນເວລາ] LT",
                nextWeek: "[ວັນ]dddd[ໜ້າເວລາ] LT",
                lastDay: "[ມື້ວານນີ້ເວລາ] LT",
                lastWeek: "[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "ອີກ %s",
                past: "%sຜ່ານມາ",
                s: "ບໍ່ເທົ່າໃດວິນາທີ",
                ss: "%d ວິນາທີ",
                m: "1 ນາທີ",
                mm: "%d ນາທີ",
                h: "1 ຊົ່ວໂມງ",
                hh: "%d ຊົ່ວໂມງ",
                d: "1 ມື້",
                dd: "%d ມື້",
                M: "1 ເດືອນ",
                MM: "%d ເດືອນ",
                y: "1 ປີ",
                yy: "%d ປີ"
            },
            dayOfMonthOrdinalParse: /(ທີ່)\d{1,2}/,
            ordinal: function (e)
            {
                return "ທີ່" + e
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
            ss: "sekundė_sekundžių_sekundes",
            m: "minutė_minutės_minutę",
            mm: "minutės_minučių_minutes",
            h: "valanda_valandos_valandą",
            hh: "valandos_valandų_valandas",
            d: "diena_dienos_dieną",
            dd: "dienos_dienų_dienas",
            M: "mėnuo_mėnesio_mėnesį",
            MM: "mėnesiai_mėnesių_mėnesius",
            y: "metai_metų_metus",
            yy: "metai_metų_metus"
        };

        function n(e, t, n, i)
        {
            return t ? r(n)[0] : i ? r(n)[1] : r(n)[2]
        }

        function i(e)
        {
            return e % 10 == 0 || e > 10 && e < 20
        }

        function r(e)
        {
            return t[e].split("_")
        }

        function a(e, t, a, o)
        {
            var l = e + " ";
            return 1 === e ? l + n(0, t, a[0], o) : t ? l + (i(e) ? r(a)[1] : r(a)[0]) : o ? l + r(a)[1] : l + (i(e) ? r(a)[1] : r(a)[2])
        }
        e.defineLocale("lt",
        {
            months:
            {
                format: "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),
                standalone: "sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"),
                isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
            },
            monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
            weekdays:
            {
                format: "sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį".split("_"),
                standalone: "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"),
                isFormat: /dddd HH:mm/
            },
            weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),
            weekdaysMin: "S_P_A_T_K_Pn_Š".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "YYYY-MM-DD",
                LL: "YYYY [m.] MMMM D [d.]",
                LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
                LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
                l: "YYYY-MM-DD",
                ll: "YYYY [m.] MMMM D [d.]",
                lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
                llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
            },
            calendar:
            {
                sameDay: "[Šiandien] LT",
                nextDay: "[Rytoj] LT",
                nextWeek: "dddd LT",
                lastDay: "[Vakar] LT",
                lastWeek: "[Praėjusį] dddd LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "po %s",
                past: "prieš %s",
                s: function (e, t, n, i)
                {
                    return t ? "kelios sekundės" : i ? "kelių sekundžių" : "kelias sekundes"
                },
                ss: a,
                m: n,
                mm: a,
                h: n,
                hh: a,
                d: n,
                dd: a,
                M: n,
                MM: a,
                y: n,
                yy: a
            },
            dayOfMonthOrdinalParse: /\d{1,2}-oji/,
            ordinal: function (e)
            {
                return e + "-oji"
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
            ss: "sekundes_sekundēm_sekunde_sekundes".split("_"),
            m: "minūtes_minūtēm_minūte_minūtes".split("_"),
            mm: "minūtes_minūtēm_minūte_minūtes".split("_"),
            h: "stundas_stundām_stunda_stundas".split("_"),
            hh: "stundas_stundām_stunda_stundas".split("_"),
            d: "dienas_dienām_diena_dienas".split("_"),
            dd: "dienas_dienām_diena_dienas".split("_"),
            M: "mēneša_mēnešiem_mēnesis_mēneši".split("_"),
            MM: "mēneša_mēnešiem_mēnesis_mēneši".split("_"),
            y: "gada_gadiem_gads_gadi".split("_"),
            yy: "gada_gadiem_gads_gadi".split("_")
        };

        function n(e, t, n)
        {
            return n ? t % 10 == 1 && t % 100 != 11 ? e[2] : e[3] : t % 10 == 1 && t % 100 != 11 ? e[0] : e[1]
        }

        function i(e, i, r)
        {
            return e + " " + n(t[r], e, i)
        }

        function r(e, i, r)
        {
            return n(t[r], e, i)
        }
        e.defineLocale("lv",
        {
            months: "janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
            monthsShort: "jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),
            weekdays: "svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),
            weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"),
            weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY.",
                LL: "YYYY. [gada] D. MMMM",
                LLL: "YYYY. [gada] D. MMMM, HH:mm",
                LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm"
            },
            calendar:
            {
                sameDay: "[Šodien pulksten] LT",
                nextDay: "[Rīt pulksten] LT",
                nextWeek: "dddd [pulksten] LT",
                lastDay: "[Vakar pulksten] LT",
                lastWeek: "[Pagājušā] dddd [pulksten] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "pēc %s",
                past: "pirms %s",
                s: function (e, t)
                {
                    return t ? "dažas sekundes" : "dažām sekundēm"
                },
                ss: i,
                m: r,
                mm: i,
                h: r,
                hh: i,
                d: r,
                dd: i,
                M: r,
                MM: i,
                y: r,
                yy: i
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
            words:
            {
                ss: ["sekund", "sekunda", "sekundi"],
                m: ["jedan minut", "jednog minuta"],
                mm: ["minut", "minuta", "minuta"],
                h: ["jedan sat", "jednog sata"],
                hh: ["sat", "sata", "sati"],
                dd: ["dan", "dana", "dana"],
                MM: ["mjesec", "mjeseca", "mjeseci"],
                yy: ["godina", "godine", "godina"]
            },
            correctGrammaticalCase: function (e, t)
            {
                return 1 === e ? t[0] : e >= 2 && e <= 4 ? t[1] : t[2]
            },
            translate: function (e, n, i)
            {
                var r = t.words[i];
                return 1 === i.length ? n ? r[0] : r[1] : e + " " + t.correctGrammaticalCase(e, r)
            }
        };
        e.defineLocale("me",
        {
            months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),
            monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),
            monthsParseExact: !0,
            weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
            weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
            weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY H:mm",
                LLLL: "dddd, D. MMMM YYYY H:mm"
            },
            calendar:
            {
                sameDay: "[danas u] LT",
                nextDay: "[sjutra u] LT",
                nextWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                        return "[u] [nedjelju] [u] LT";
                    case 3:
                        return "[u] [srijedu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                    }
                },
                lastDay: "[juče u] LT",
                lastWeek: function ()
                {
                    return ["[prošle] [nedjelje] [u] LT", "[prošlog] [ponedjeljka] [u] LT", "[prošlog] [utorka] [u] LT", "[prošle] [srijede] [u] LT", "[prošlog] [četvrtka] [u] LT", "[prošlog] [petka] [u] LT", "[prošle] [subote] [u] LT"][this.day()]
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "za %s",
                past: "prije %s",
                s: "nekoliko sekundi",
                ss: t.translate,
                m: t.translate,
                mm: t.translate,
                h: t.translate,
                hh: t.translate,
                d: "dan",
                dd: t.translate,
                M: "mjesec",
                MM: t.translate,
                y: "godinu",
                yy: t.translate
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("mi",
        {
            months: "Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea".split("_"),
            monthsShort: "Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"),
            monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
            monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
            monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
            monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
            weekdays: "Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei".split("_"),
            weekdaysShort: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),
            weekdaysMin: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY [i] HH:mm",
                LLLL: "dddd, D MMMM YYYY [i] HH:mm"
            },
            calendar:
            {
                sameDay: "[i teie mahana, i] LT",
                nextDay: "[apopo i] LT",
                nextWeek: "dddd [i] LT",
                lastDay: "[inanahi i] LT",
                lastWeek: "dddd [whakamutunga i] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "i roto i %s",
                past: "%s i mua",
                s: "te hēkona ruarua",
                ss: "%d hēkona",
                m: "he meneti",
                mm: "%d meneti",
                h: "te haora",
                hh: "%d haora",
                d: "he ra",
                dd: "%d ra",
                M: "he marama",
                MM: "%d marama",
                y: "he tau",
                yy: "%d tau"
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("mk",
        {
            months: "јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),
            monthsShort: "јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),
            weekdays: "недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),
            weekdaysShort: "нед_пон_вто_сре_чет_пет_саб".split("_"),
            weekdaysMin: "нe_пo_вт_ср_че_пе_сa".split("_"),
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "D.MM.YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY H:mm",
                LLLL: "dddd, D MMMM YYYY H:mm"
            },
            calendar:
            {
                sameDay: "[Денес во] LT",
                nextDay: "[Утре во] LT",
                nextWeek: "[Во] dddd [во] LT",
                lastDay: "[Вчера во] LT",
                lastWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                    case 3:
                    case 6:
                        return "[Изминатата] dddd [во] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[Изминатиот] dddd [во] LT"
                    }
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "после %s",
                past: "пред %s",
                s: "неколку секунди",
                ss: "%d секунди",
                m: "минута",
                mm: "%d минути",
                h: "час",
                hh: "%d часа",
                d: "ден",
                dd: "%d дена",
                M: "месец",
                MM: "%d месеци",
                y: "година",
                yy: "%d години"
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
            ordinal: function (e)
            {
                var t = e % 10,
                    n = e % 100;
                return 0 === e ? e + "-ев" : 0 === n ? e + "-ен" : n > 10 && n < 20 ? e + "-ти" : 1 === t ? e + "-ви" : 2 === t ? e + "-ри" : 7 === t || 8 === t ? e + "-ми" : e + "-ти"
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("ml",
        {
            months: "ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),
            monthsShort: "ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),
            monthsParseExact: !0,
            weekdays: "ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),
            weekdaysShort: "ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),
            weekdaysMin: "ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),
            longDateFormat:
            {
                LT: "A h:mm -നു",
                LTS: "A h:mm:ss -നു",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY, A h:mm -നു",
                LLLL: "dddd, D MMMM YYYY, A h:mm -നു"
            },
            calendar:
            {
                sameDay: "[ഇന്ന്] LT",
                nextDay: "[നാളെ] LT",
                nextWeek: "dddd, LT",
                lastDay: "[ഇന്നലെ] LT",
                lastWeek: "[കഴിഞ്ഞ] dddd, LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s കഴിഞ്ഞ്",
                past: "%s മുൻപ്",
                s: "അൽപ നിമിഷങ്ങൾ",
                ss: "%d സെക്കൻഡ്",
                m: "ഒരു മിനിറ്റ്",
                mm: "%d മിനിറ്റ്",
                h: "ഒരു മണിക്കൂർ",
                hh: "%d മണിക്കൂർ",
                d: "ഒരു ദിവസം",
                dd: "%d ദിവസം",
                M: "ഒരു മാസം",
                MM: "%d മാസം",
                y: "ഒരു വർഷം",
                yy: "%d വർഷം"
            },
            meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "രാത്രി" === t && e >= 4 || "ഉച്ച കഴിഞ്ഞ്" === t || "വൈകുന്നേരം" === t ? e + 12 : e
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "രാത്രി" : e < 12 ? "രാവിലെ" : e < 17 ? "ഉച്ച കഴിഞ്ഞ്" : e < 20 ? "വൈകുന്നേരം" : "രാത്രി"
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n, i)
        {
            switch (n)
            {
            case "s":
                return t ? "хэдхэн секунд" : "хэдхэн секундын";
            case "ss":
                return e + (t ? " секунд" : " секундын");
            case "m":
            case "mm":
                return e + (t ? " минут" : " минутын");
            case "h":
            case "hh":
                return e + (t ? " цаг" : " цагийн");
            case "d":
            case "dd":
                return e + (t ? " өдөр" : " өдрийн");
            case "M":
            case "MM":
                return e + (t ? " сар" : " сарын");
            case "y":
            case "yy":
                return e + (t ? " жил" : " жилийн");
            default:
                return e
            }
        }
        e.defineLocale("mn",
        {
            months: "Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар".split("_"),
            monthsShort: "1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар".split("_"),
            monthsParseExact: !0,
            weekdays: "Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба".split("_"),
            weekdaysShort: "Ням_Дав_Мяг_Лха_Пүр_Баа_Бям".split("_"),
            weekdaysMin: "Ня_Да_Мя_Лх_Пү_Ба_Бя".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "YYYY-MM-DD",
                LL: "YYYY оны MMMMын D",
                LLL: "YYYY оны MMMMын D HH:mm",
                LLLL: "dddd, YYYY оны MMMMын D HH:mm"
            },
            meridiemParse: /ҮӨ|ҮХ/i,
            isPM: function (e)
            {
                return "ҮХ" === e
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "ҮӨ" : "ҮХ"
            },
            calendar:
            {
                sameDay: "[Өнөөдөр] LT",
                nextDay: "[Маргааш] LT",
                nextWeek: "[Ирэх] dddd LT",
                lastDay: "[Өчигдөр] LT",
                lastWeek: "[Өнгөрсөн] dddd LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s дараа",
                past: "%s өмнө",
                s: t,
                ss: t,
                m: t,
                mm: t,
                h: t,
                hh: t,
                d: t,
                dd: t,
                M: t,
                MM: t,
                y: t,
                yy: t
            },
            dayOfMonthOrdinalParse: /\d{1,2} өдөр/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                case "d":
                case "D":
                case "DDD":
                    return e + " өдөр";
                default:
                    return e
                }
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "१",
                2: "२",
                3: "३",
                4: "४",
                5: "५",
                6: "६",
                7: "७",
                8: "८",
                9: "९",
                0: "०"
            },
            n = {
                "१": "1",
                "२": "2",
                "३": "3",
                "४": "4",
                "५": "5",
                "६": "6",
                "७": "7",
                "८": "8",
                "९": "9",
                "०": "0"
            };

        function i(e, t, n, i)
        {
            var r = "";
            if (t) switch (n)
            {
            case "s":
                r = "काही सेकंद";
                break;
            case "ss":
                r = "%d सेकंद";
                break;
            case "m":
                r = "एक मिनिट";
                break;
            case "mm":
                r = "%d मिनिटे";
                break;
            case "h":
                r = "एक तास";
                break;
            case "hh":
                r = "%d तास";
                break;
            case "d":
                r = "एक दिवस";
                break;
            case "dd":
                r = "%d दिवस";
                break;
            case "M":
                r = "एक महिना";
                break;
            case "MM":
                r = "%d महिने";
                break;
            case "y":
                r = "एक वर्ष";
                break;
            case "yy":
                r = "%d वर्षे"
            }
            else switch (n)
            {
            case "s":
                r = "काही सेकंदां";
                break;
            case "ss":
                r = "%d सेकंदां";
                break;
            case "m":
                r = "एका मिनिटा";
                break;
            case "mm":
                r = "%d मिनिटां";
                break;
            case "h":
                r = "एका तासा";
                break;
            case "hh":
                r = "%d तासां";
                break;
            case "d":
                r = "एका दिवसा";
                break;
            case "dd":
                r = "%d दिवसां";
                break;
            case "M":
                r = "एका महिन्या";
                break;
            case "MM":
                r = "%d महिन्यां";
                break;
            case "y":
                r = "एका वर्षा";
                break;
            case "yy":
                r = "%d वर्षां"
            }
            return r.replace(/%d/i, e)
        }
        e.defineLocale("mr",
        {
            months: "जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),
            monthsShort: "जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),
            monthsParseExact: !0,
            weekdays: "रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
            weekdaysShort: "रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),
            weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
            longDateFormat:
            {
                LT: "A h:mm वाजता",
                LTS: "A h:mm:ss वाजता",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY, A h:mm वाजता",
                LLLL: "dddd, D MMMM YYYY, A h:mm वाजता"
            },
            calendar:
            {
                sameDay: "[आज] LT",
                nextDay: "[उद्या] LT",
                nextWeek: "dddd, LT",
                lastDay: "[काल] LT",
                lastWeek: "[मागील] dddd, LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%sमध्ये",
                past: "%sपूर्वी",
                s: i,
                ss: i,
                m: i,
                mm: i,
                h: i,
                hh: i,
                d: i,
                dd: i,
                M: i,
                MM: i,
                y: i,
                yy: i
            },
            preparse: function (e)
            {
                return e.replace(/[१२३४५६७८९०]/g, function (e)
                {
                    return n[e]
                })
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                })
            },
            meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "रात्री" === t ? e < 4 ? e : e + 12 : "सकाळी" === t ? e : "दुपारी" === t ? e >= 10 ? e : e + 12 : "सायंकाळी" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "रात्री" : e < 10 ? "सकाळी" : e < 17 ? "दुपारी" : e < 20 ? "सायंकाळी" : "रात्री"
            },
            week:
            {
                dow: 0,
                doy: 6
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("ms",
        {
            months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
            monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
            weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
            weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
            weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
            longDateFormat:
            {
                LT: "HH.mm",
                LTS: "HH.mm.ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY [pukul] HH.mm",
                LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
            },
            meridiemParse: /pagi|tengahari|petang|malam/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "pagi" === t ? e : "tengahari" === t ? e >= 11 ? e : e + 12 : "petang" === t || "malam" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                return e < 11 ? "pagi" : e < 15 ? "tengahari" : e < 19 ? "petang" : "malam"
            },
            calendar:
            {
                sameDay: "[Hari ini pukul] LT",
                nextDay: "[Esok pukul] LT",
                nextWeek: "dddd [pukul] LT",
                lastDay: "[Kelmarin pukul] LT",
                lastWeek: "dddd [lepas pukul] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "dalam %s",
                past: "%s yang lepas",
                s: "beberapa saat",
                ss: "%d saat",
                m: "seminit",
                mm: "%d minit",
                h: "sejam",
                hh: "%d jam",
                d: "sehari",
                dd: "%d hari",
                M: "sebulan",
                MM: "%d bulan",
                y: "setahun",
                yy: "%d tahun"
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("ms-my",
        {
            months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
            monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
            weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
            weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
            weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
            longDateFormat:
            {
                LT: "HH.mm",
                LTS: "HH.mm.ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY [pukul] HH.mm",
                LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
            },
            meridiemParse: /pagi|tengahari|petang|malam/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "pagi" === t ? e : "tengahari" === t ? e >= 11 ? e : e + 12 : "petang" === t || "malam" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                return e < 11 ? "pagi" : e < 15 ? "tengahari" : e < 19 ? "petang" : "malam"
            },
            calendar:
            {
                sameDay: "[Hari ini pukul] LT",
                nextDay: "[Esok pukul] LT",
                nextWeek: "dddd [pukul] LT",
                lastDay: "[Kelmarin pukul] LT",
                lastWeek: "dddd [lepas pukul] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "dalam %s",
                past: "%s yang lepas",
                s: "beberapa saat",
                ss: "%d saat",
                m: "seminit",
                mm: "%d minit",
                h: "sejam",
                hh: "%d jam",
                d: "sehari",
                dd: "%d hari",
                M: "sebulan",
                MM: "%d bulan",
                y: "setahun",
                yy: "%d tahun"
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("mt",
        {
            months: "Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru".split("_"),
            monthsShort: "Jan_Fra_Mar_Apr_Mej_Ġun_Lul_Aww_Set_Ott_Nov_Diċ".split("_"),
            weekdays: "Il-Ħadd_It-Tnejn_It-Tlieta_L-Erbgħa_Il-Ħamis_Il-Ġimgħa_Is-Sibt".split("_"),
            weekdaysShort: "Ħad_Tne_Tli_Erb_Ħam_Ġim_Sib".split("_"),
            weekdaysMin: "Ħa_Tn_Tl_Er_Ħa_Ġi_Si".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Illum fil-]LT",
                nextDay: "[Għada fil-]LT",
                nextWeek: "dddd [fil-]LT",
                lastDay: "[Il-bieraħ fil-]LT",
                lastWeek: "dddd [li għadda] [fil-]LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "f’ %s",
                past: "%s ilu",
                s: "ftit sekondi",
                ss: "%d sekondi",
                m: "minuta",
                mm: "%d minuti",
                h: "siegħa",
                hh: "%d siegħat",
                d: "ġurnata",
                dd: "%d ġranet",
                M: "xahar",
                MM: "%d xhur",
                y: "sena",
                yy: "%d sni"
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "၁",
                2: "၂",
                3: "၃",
                4: "၄",
                5: "၅",
                6: "၆",
                7: "၇",
                8: "၈",
                9: "၉",
                0: "၀"
            },
            n = {
                "၁": "1",
                "၂": "2",
                "၃": "3",
                "၄": "4",
                "၅": "5",
                "၆": "6",
                "၇": "7",
                "၈": "8",
                "၉": "9",
                "၀": "0"
            };
        e.defineLocale("my",
        {
            months: "ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"),
            monthsShort: "ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"),
            weekdays: "တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"),
            weekdaysShort: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),
            weekdaysMin: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[ယနေ.] LT [မှာ]",
                nextDay: "[မနက်ဖြန်] LT [မှာ]",
                nextWeek: "dddd LT [မှာ]",
                lastDay: "[မနေ.က] LT [မှာ]",
                lastWeek: "[ပြီးခဲ့သော] dddd LT [မှာ]",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "လာမည့် %s မှာ",
                past: "လွန်ခဲ့သော %s က",
                s: "စက္ကန်.အနည်းငယ်",
                ss: "%d စက္ကန့်",
                m: "တစ်မိနစ်",
                mm: "%d မိနစ်",
                h: "တစ်နာရီ",
                hh: "%d နာရီ",
                d: "တစ်ရက်",
                dd: "%d ရက်",
                M: "တစ်လ",
                MM: "%d လ",
                y: "တစ်နှစ်",
                yy: "%d နှစ်"
            },
            preparse: function (e)
            {
                return e.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (e)
                {
                    return n[e]
                })
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                })
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("nb",
        {
            months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
            monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
            monthsParseExact: !0,
            weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
            weekdaysShort: "sø._ma._ti._on._to._fr._lø.".split("_"),
            weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY [kl.] HH:mm",
                LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
            },
            calendar:
            {
                sameDay: "[i dag kl.] LT",
                nextDay: "[i morgen kl.] LT",
                nextWeek: "dddd [kl.] LT",
                lastDay: "[i går kl.] LT",
                lastWeek: "[forrige] dddd [kl.] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "om %s",
                past: "%s siden",
                s: "noen sekunder",
                ss: "%d sekunder",
                m: "ett minutt",
                mm: "%d minutter",
                h: "en time",
                hh: "%d timer",
                d: "en dag",
                dd: "%d dager",
                M: "en måned",
                MM: "%d måneder",
                y: "ett år",
                yy: "%d år"
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "१",
                2: "२",
                3: "३",
                4: "४",
                5: "५",
                6: "६",
                7: "७",
                8: "८",
                9: "९",
                0: "०"
            },
            n = {
                "१": "1",
                "२": "2",
                "३": "3",
                "४": "4",
                "५": "5",
                "६": "6",
                "७": "7",
                "८": "8",
                "९": "9",
                "०": "0"
            };
        e.defineLocale("ne",
        {
            months: "जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),
            monthsShort: "जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),
            monthsParseExact: !0,
            weekdays: "आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),
            weekdaysShort: "आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),
            weekdaysMin: "आ._सो._मं._बु._बि._शु._श.".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "Aको h:mm बजे",
                LTS: "Aको h:mm:ss बजे",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY, Aको h:mm बजे",
                LLLL: "dddd, D MMMM YYYY, Aको h:mm बजे"
            },
            preparse: function (e)
            {
                return e.replace(/[१२३४५६७८९०]/g, function (e)
                {
                    return n[e]
                })
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                })
            },
            meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "राति" === t ? e < 4 ? e : e + 12 : "बिहान" === t ? e : "दिउँसो" === t ? e >= 10 ? e : e + 12 : "साँझ" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                return e < 3 ? "राति" : e < 12 ? "बिहान" : e < 16 ? "दिउँसो" : e < 20 ? "साँझ" : "राति"
            },
            calendar:
            {
                sameDay: "[आज] LT",
                nextDay: "[भोलि] LT",
                nextWeek: "[आउँदो] dddd[,] LT",
                lastDay: "[हिजो] LT",
                lastWeek: "[गएको] dddd[,] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%sमा",
                past: "%s अगाडि",
                s: "केही क्षण",
                ss: "%d सेकेण्ड",
                m: "एक मिनेट",
                mm: "%d मिनेट",
                h: "एक घण्टा",
                hh: "%d घण्टा",
                d: "एक दिन",
                dd: "%d दिन",
                M: "एक महिना",
                MM: "%d महिना",
                y: "एक बर्ष",
                yy: "%d बर्ष"
            },
            week:
            {
                dow: 0,
                doy: 6
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
            n = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
            i = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i],
            r = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
        e.defineLocale("nl",
        {
            months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
            monthsShort: function (e, i)
            {
                return e ? /-MMM-/.test(i) ? n[e.month()] : t[e.month()] : t
            },
            monthsRegex: r,
            monthsShortRegex: r,
            monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
            monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
            monthsParse: i,
            longMonthsParse: i,
            shortMonthsParse: i,
            weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
            weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
            weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD-MM-YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[vandaag om] LT",
                nextDay: "[morgen om] LT",
                nextWeek: "dddd [om] LT",
                lastDay: "[gisteren om] LT",
                lastWeek: "[afgelopen] dddd [om] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "over %s",
                past: "%s geleden",
                s: "een paar seconden",
                ss: "%d seconden",
                m: "één minuut",
                mm: "%d minuten",
                h: "één uur",
                hh: "%d uur",
                d: "één dag",
                dd: "%d dagen",
                M: "één maand",
                MM: "%d maanden",
                y: "één jaar",
                yy: "%d jaar"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
            ordinal: function (e)
            {
                return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de")
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
            n = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
            i = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i],
            r = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
        e.defineLocale("nl-be",
        {
            months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
            monthsShort: function (e, i)
            {
                return e ? /-MMM-/.test(i) ? n[e.month()] : t[e.month()] : t
            },
            monthsRegex: r,
            monthsShortRegex: r,
            monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
            monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
            monthsParse: i,
            longMonthsParse: i,
            shortMonthsParse: i,
            weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
            weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
            weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[vandaag om] LT",
                nextDay: "[morgen om] LT",
                nextWeek: "dddd [om] LT",
                lastDay: "[gisteren om] LT",
                lastWeek: "[afgelopen] dddd [om] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "over %s",
                past: "%s geleden",
                s: "een paar seconden",
                ss: "%d seconden",
                m: "één minuut",
                mm: "%d minuten",
                h: "één uur",
                hh: "%d uur",
                d: "één dag",
                dd: "%d dagen",
                M: "één maand",
                MM: "%d maanden",
                y: "één jaar",
                yy: "%d jaar"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
            ordinal: function (e)
            {
                return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de")
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("nn",
        {
            months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
            monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
            weekdays: "sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
            weekdaysShort: "sun_mån_tys_ons_tor_fre_lau".split("_"),
            weekdaysMin: "su_må_ty_on_to_fr_lø".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY [kl.] H:mm",
                LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
            },
            calendar:
            {
                sameDay: "[I dag klokka] LT",
                nextDay: "[I morgon klokka] LT",
                nextWeek: "dddd [klokka] LT",
                lastDay: "[I går klokka] LT",
                lastWeek: "[Føregåande] dddd [klokka] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "om %s",
                past: "%s sidan",
                s: "nokre sekund",
                ss: "%d sekund",
                m: "eit minutt",
                mm: "%d minutt",
                h: "ein time",
                hh: "%d timar",
                d: "ein dag",
                dd: "%d dagar",
                M: "ein månad",
                MM: "%d månader",
                y: "eit år",
                yy: "%d år"
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "੧",
                2: "੨",
                3: "੩",
                4: "੪",
                5: "੫",
                6: "੬",
                7: "੭",
                8: "੮",
                9: "੯",
                0: "੦"
            },
            n = {
                "੧": "1",
                "੨": "2",
                "੩": "3",
                "੪": "4",
                "੫": "5",
                "੬": "6",
                "੭": "7",
                "੮": "8",
                "੯": "9",
                "੦": "0"
            };
        e.defineLocale("pa-in",
        {
            months: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"),
            monthsShort: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"),
            weekdays: "ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ".split("_"),
            weekdaysShort: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),
            weekdaysMin: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),
            longDateFormat:
            {
                LT: "A h:mm ਵਜੇ",
                LTS: "A h:mm:ss ਵਜੇ",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY, A h:mm ਵਜੇ",
                LLLL: "dddd, D MMMM YYYY, A h:mm ਵਜੇ"
            },
            calendar:
            {
                sameDay: "[ਅਜ] LT",
                nextDay: "[ਕਲ] LT",
                nextWeek: "[ਅਗਲਾ] dddd, LT",
                lastDay: "[ਕਲ] LT",
                lastWeek: "[ਪਿਛਲੇ] dddd, LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s ਵਿੱਚ",
                past: "%s ਪਿਛਲੇ",
                s: "ਕੁਝ ਸਕਿੰਟ",
                ss: "%d ਸਕਿੰਟ",
                m: "ਇਕ ਮਿੰਟ",
                mm: "%d ਮਿੰਟ",
                h: "ਇੱਕ ਘੰਟਾ",
                hh: "%d ਘੰਟੇ",
                d: "ਇੱਕ ਦਿਨ",
                dd: "%d ਦਿਨ",
                M: "ਇੱਕ ਮਹੀਨਾ",
                MM: "%d ਮਹੀਨੇ",
                y: "ਇੱਕ ਸਾਲ",
                yy: "%d ਸਾਲ"
            },
            preparse: function (e)
            {
                return e.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (e)
                {
                    return n[e]
                })
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                })
            },
            meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "ਰਾਤ" === t ? e < 4 ? e : e + 12 : "ਸਵੇਰ" === t ? e : "ਦੁਪਹਿਰ" === t ? e >= 10 ? e : e + 12 : "ਸ਼ਾਮ" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "ਰਾਤ" : e < 10 ? "ਸਵੇਰ" : e < 17 ? "ਦੁਪਹਿਰ" : e < 20 ? "ਸ਼ਾਮ" : "ਰਾਤ"
            },
            week:
            {
                dow: 0,
                doy: 6
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),
            n = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");

        function i(e)
        {
            return e % 10 < 5 && e % 10 > 1 && ~~(e / 10) % 10 != 1
        }

        function r(e, t, n)
        {
            var r = e + " ";
            switch (n)
            {
            case "ss":
                return r + (i(e) ? "sekundy" : "sekund");
            case "m":
                return t ? "minuta" : "minutę";
            case "mm":
                return r + (i(e) ? "minuty" : "minut");
            case "h":
                return t ? "godzina" : "godzinę";
            case "hh":
                return r + (i(e) ? "godziny" : "godzin");
            case "MM":
                return r + (i(e) ? "miesiące" : "miesięcy");
            case "yy":
                return r + (i(e) ? "lata" : "lat")
            }
        }
        e.defineLocale("pl",
        {
            months: function (e, i)
            {
                return e ? "" === i ? "(" + n[e.month()] + "|" + t[e.month()] + ")" : /D MMMM/.test(i) ? n[e.month()] : t[e.month()] : t
            },
            monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
            weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
            weekdaysShort: "ndz_pon_wt_śr_czw_pt_sob".split("_"),
            weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Dziś o] LT",
                nextDay: "[Jutro o] LT",
                nextWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                        return "[W niedzielę o] LT";
                    case 2:
                        return "[We wtorek o] LT";
                    case 3:
                        return "[W środę o] LT";
                    case 6:
                        return "[W sobotę o] LT";
                    default:
                        return "[W] dddd [o] LT"
                    }
                },
                lastDay: "[Wczoraj o] LT",
                lastWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                        return "[W zeszłą niedzielę o] LT";
                    case 3:
                        return "[W zeszłą środę o] LT";
                    case 6:
                        return "[W zeszłą sobotę o] LT";
                    default:
                        return "[W zeszły] dddd [o] LT"
                    }
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "za %s",
                past: "%s temu",
                s: "kilka sekund",
                ss: r,
                m: r,
                mm: r,
                h: r,
                hh: r,
                d: "1 dzień",
                dd: "%d dni",
                M: "miesiąc",
                MM: r,
                y: "rok",
                yy: r
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("pt",
        {
            months: "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
            monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
            weekdays: "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),
            weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
            weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sá".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D [de] MMMM [de] YYYY",
                LLL: "D [de] MMMM [de] YYYY HH:mm",
                LLLL: "dddd, D [de] MMMM [de] YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Hoje às] LT",
                nextDay: "[Amanhã às] LT",
                nextWeek: "dddd [às] LT",
                lastDay: "[Ontem às] LT",
                lastWeek: function ()
                {
                    return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT"
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "em %s",
                past: "há %s",
                s: "segundos",
                ss: "%d segundos",
                m: "um minuto",
                mm: "%d minutos",
                h: "uma hora",
                hh: "%d horas",
                d: "um dia",
                dd: "%d dias",
                M: "um mês",
                MM: "%d meses",
                y: "um ano",
                yy: "%d anos"
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("pt-br",
        {
            months: "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
            monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
            weekdays: "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),
            weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
            weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sá".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D [de] MMMM [de] YYYY",
                LLL: "D [de] MMMM [de] YYYY [às] HH:mm",
                LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm"
            },
            calendar:
            {
                sameDay: "[Hoje às] LT",
                nextDay: "[Amanhã às] LT",
                nextWeek: "dddd [às] LT",
                lastDay: "[Ontem às] LT",
                lastWeek: function ()
                {
                    return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT"
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "em %s",
                past: "há %s",
                s: "poucos segundos",
                ss: "%d segundos",
                m: "um minuto",
                mm: "%d minutos",
                h: "uma hora",
                hh: "%d horas",
                d: "um dia",
                dd: "%d dias",
                M: "um mês",
                MM: "%d meses",
                y: "um ano",
                yy: "%d anos"
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº"
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n)
        {
            var i = " ";
            return (e % 100 >= 20 || e >= 100 && e % 100 == 0) && (i = " de "), e + i +
            {
                ss: "secunde",
                mm: "minute",
                hh: "ore",
                dd: "zile",
                MM: "luni",
                yy: "ani"
            } [n]
        }
        e.defineLocale("ro",
        {
            months: "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
            monthsShort: "ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),
            monthsParseExact: !0,
            weekdays: "duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),
            weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
            weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY H:mm",
                LLLL: "dddd, D MMMM YYYY H:mm"
            },
            calendar:
            {
                sameDay: "[azi la] LT",
                nextDay: "[mâine la] LT",
                nextWeek: "dddd [la] LT",
                lastDay: "[ieri la] LT",
                lastWeek: "[fosta] dddd [la] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "peste %s",
                past: "%s în urmă",
                s: "câteva secunde",
                ss: t,
                m: "un minut",
                mm: t,
                h: "o oră",
                hh: t,
                d: "o zi",
                dd: t,
                M: "o lună",
                MM: t,
                y: "un an",
                yy: t
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n)
        {
            var i, r, a = {
                ss: t ? "секунда_секунды_секунд" : "секунду_секунды_секунд",
                mm: t ? "минута_минуты_минут" : "минуту_минуты_минут",
                hh: "час_часа_часов",
                dd: "день_дня_дней",
                MM: "месяц_месяца_месяцев",
                yy: "год_года_лет"
            };
            return "m" === n ? t ? "минута" : "минуту" : e + " " + (i = +e, r = a[n].split("_"), i % 10 == 1 && i % 100 != 11 ? r[0] : i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20) ? r[1] : r[2])
        }
        var n = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];
        e.defineLocale("ru",
        {
            months:
            {
                format: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),
                standalone: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_")
            },
            monthsShort:
            {
                format: "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),
                standalone: "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_")
            },
            weekdays:
            {
                standalone: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
                format: "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_"),
                isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
            },
            weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"),
            weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
            monthsParse: n,
            longMonthsParse: n,
            shortMonthsParse: n,
            monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
            monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
            monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
            monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY г.",
                LLL: "D MMMM YYYY г., H:mm",
                LLLL: "dddd, D MMMM YYYY г., H:mm"
            },
            calendar:
            {
                sameDay: "[Сегодня, в] LT",
                nextDay: "[Завтра, в] LT",
                lastDay: "[Вчера, в] LT",
                nextWeek: function (e)
                {
                    if (e.week() === this.week()) return 2 === this.day() ? "[Во] dddd, [в] LT" : "[В] dddd, [в] LT";
                    switch (this.day())
                    {
                    case 0:
                        return "[В следующее] dddd, [в] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[В следующий] dddd, [в] LT";
                    case 3:
                    case 5:
                    case 6:
                        return "[В следующую] dddd, [в] LT"
                    }
                },
                lastWeek: function (e)
                {
                    if (e.week() === this.week()) return 2 === this.day() ? "[Во] dddd, [в] LT" : "[В] dddd, [в] LT";
                    switch (this.day())
                    {
                    case 0:
                        return "[В прошлое] dddd, [в] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[В прошлый] dddd, [в] LT";
                    case 3:
                    case 5:
                    case 6:
                        return "[В прошлую] dddd, [в] LT"
                    }
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "через %s",
                past: "%s назад",
                s: "несколько секунд",
                ss: t,
                m: t,
                mm: t,
                h: "час",
                hh: t,
                d: "день",
                dd: t,
                M: "месяц",
                MM: t,
                y: "год",
                yy: t
            },
            meridiemParse: /ночи|утра|дня|вечера/i,
            isPM: function (e)
            {
                return /^(дня|вечера)$/.test(e)
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "ночи" : e < 12 ? "утра" : e < 17 ? "дня" : "вечера"
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                case "M":
                case "d":
                case "DDD":
                    return e + "-й";
                case "D":
                    return e + "-го";
                case "w":
                case "W":
                    return e + "-я";
                default:
                    return e
                }
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = ["جنوري", "فيبروري", "مارچ", "اپريل", "مئي", "جون", "جولاءِ", "آگسٽ", "سيپٽمبر", "آڪٽوبر", "نومبر", "ڊسمبر"],
            n = ["آچر", "سومر", "اڱارو", "اربع", "خميس", "جمع", "ڇنڇر"];
        e.defineLocale("sd",
        {
            months: t,
            monthsShort: t,
            weekdays: n,
            weekdaysShort: n,
            weekdaysMin: n,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd، D MMMM YYYY HH:mm"
            },
            meridiemParse: /صبح|شام/,
            isPM: function (e)
            {
                return "شام" === e
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "صبح" : "شام"
            },
            calendar:
            {
                sameDay: "[اڄ] LT",
                nextDay: "[سڀاڻي] LT",
                nextWeek: "dddd [اڳين هفتي تي] LT",
                lastDay: "[ڪالهه] LT",
                lastWeek: "[گزريل هفتي] dddd [تي] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s پوء",
                past: "%s اڳ",
                s: "چند سيڪنڊ",
                ss: "%d سيڪنڊ",
                m: "هڪ منٽ",
                mm: "%d منٽ",
                h: "هڪ ڪلاڪ",
                hh: "%d ڪلاڪ",
                d: "هڪ ڏينهن",
                dd: "%d ڏينهن",
                M: "هڪ مهينو",
                MM: "%d مهينا",
                y: "هڪ سال",
                yy: "%d سال"
            },
            preparse: function (e)
            {
                return e.replace(/،/g, ",")
            },
            postformat: function (e)
            {
                return e.replace(/,/g, "،")
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("se",
        {
            months: "ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu".split("_"),
            monthsShort: "ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov".split("_"),
            weekdays: "sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat".split("_"),
            weekdaysShort: "sotn_vuos_maŋ_gask_duor_bear_láv".split("_"),
            weekdaysMin: "s_v_m_g_d_b_L".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "MMMM D. [b.] YYYY",
                LLL: "MMMM D. [b.] YYYY [ti.] HH:mm",
                LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm"
            },
            calendar:
            {
                sameDay: "[otne ti] LT",
                nextDay: "[ihttin ti] LT",
                nextWeek: "dddd [ti] LT",
                lastDay: "[ikte ti] LT",
                lastWeek: "[ovddit] dddd [ti] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s geažes",
                past: "maŋit %s",
                s: "moadde sekunddat",
                ss: "%d sekunddat",
                m: "okta minuhta",
                mm: "%d minuhtat",
                h: "okta diimmu",
                hh: "%d diimmut",
                d: "okta beaivi",
                dd: "%d beaivvit",
                M: "okta mánnu",
                MM: "%d mánut",
                y: "okta jahki",
                yy: "%d jagit"
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("si",
        {
            months: "ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්".split("_"),
            monthsShort: "ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ".split("_"),
            weekdays: "ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"),
            weekdaysShort: "ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"),
            weekdaysMin: "ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "a h:mm",
                LTS: "a h:mm:ss",
                L: "YYYY/MM/DD",
                LL: "YYYY MMMM D",
                LLL: "YYYY MMMM D, a h:mm",
                LLLL: "YYYY MMMM D [වැනි] dddd, a h:mm:ss"
            },
            calendar:
            {
                sameDay: "[අද] LT[ට]",
                nextDay: "[හෙට] LT[ට]",
                nextWeek: "dddd LT[ට]",
                lastDay: "[ඊයේ] LT[ට]",
                lastWeek: "[පසුගිය] dddd LT[ට]",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%sකින්",
                past: "%sකට පෙර",
                s: "තත්පර කිහිපය",
                ss: "තත්පර %d",
                m: "මිනිත්තුව",
                mm: "මිනිත්තු %d",
                h: "පැය",
                hh: "පැය %d",
                d: "දිනය",
                dd: "දින %d",
                M: "මාසය",
                MM: "මාස %d",
                y: "වසර",
                yy: "වසර %d"
            },
            dayOfMonthOrdinalParse: /\d{1,2} වැනි/,
            ordinal: function (e)
            {
                return e + " වැනි"
            },
            meridiemParse: /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
            isPM: function (e)
            {
                return "ප.ව." === e || "පස් වරු" === e
            },
            meridiem: function (e, t, n)
            {
                return e > 11 ? n ? "ප.ව." : "පස් වරු" : n ? "පෙ.ව." : "පෙර වරු"
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),
            n = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");

        function i(e)
        {
            return e > 1 && e < 5
        }

        function r(e, t, n, r)
        {
            var a = e + " ";
            switch (n)
            {
            case "s":
                return t || r ? "pár sekúnd" : "pár sekundami";
            case "ss":
                return t || r ? a + (i(e) ? "sekundy" : "sekúnd") : a + "sekundami";
            case "m":
                return t ? "minúta" : r ? "minútu" : "minútou";
            case "mm":
                return t || r ? a + (i(e) ? "minúty" : "minút") : a + "minútami";
            case "h":
                return t ? "hodina" : r ? "hodinu" : "hodinou";
            case "hh":
                return t || r ? a + (i(e) ? "hodiny" : "hodín") : a + "hodinami";
            case "d":
                return t || r ? "deň" : "dňom";
            case "dd":
                return t || r ? a + (i(e) ? "dni" : "dní") : a + "dňami";
            case "M":
                return t || r ? "mesiac" : "mesiacom";
            case "MM":
                return t || r ? a + (i(e) ? "mesiace" : "mesiacov") : a + "mesiacmi";
            case "y":
                return t || r ? "rok" : "rokom";
            case "yy":
                return t || r ? a + (i(e) ? "roky" : "rokov") : a + "rokmi"
            }
        }
        e.defineLocale("sk",
        {
            months: t,
            monthsShort: n,
            weekdays: "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
            weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"),
            weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"),
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY H:mm",
                LLLL: "dddd D. MMMM YYYY H:mm"
            },
            calendar:
            {
                sameDay: "[dnes o] LT",
                nextDay: "[zajtra o] LT",
                nextWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                        return "[v nedeľu o] LT";
                    case 1:
                    case 2:
                        return "[v] dddd [o] LT";
                    case 3:
                        return "[v stredu o] LT";
                    case 4:
                        return "[vo štvrtok o] LT";
                    case 5:
                        return "[v piatok o] LT";
                    case 6:
                        return "[v sobotu o] LT"
                    }
                },
                lastDay: "[včera o] LT",
                lastWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                        return "[minulú nedeľu o] LT";
                    case 1:
                    case 2:
                        return "[minulý] dddd [o] LT";
                    case 3:
                        return "[minulú stredu o] LT";
                    case 4:
                    case 5:
                        return "[minulý] dddd [o] LT";
                    case 6:
                        return "[minulú sobotu o] LT"
                    }
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "za %s",
                past: "pred %s",
                s: r,
                ss: r,
                m: r,
                mm: r,
                h: r,
                hh: r,
                d: r,
                dd: r,
                M: r,
                MM: r,
                y: r,
                yy: r
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n, i)
        {
            var r = e + " ";
            switch (n)
            {
            case "s":
                return t || i ? "nekaj sekund" : "nekaj sekundami";
            case "ss":
                return r += 1 === e ? t ? "sekundo" : "sekundi" : 2 === e ? t || i ? "sekundi" : "sekundah" : e < 5 ? t || i ? "sekunde" : "sekundah" : "sekund";
            case "m":
                return t ? "ena minuta" : "eno minuto";
            case "mm":
                return r += 1 === e ? t ? "minuta" : "minuto" : 2 === e ? t || i ? "minuti" : "minutama" : e < 5 ? t || i ? "minute" : "minutami" : t || i ? "minut" : "minutami";
            case "h":
                return t ? "ena ura" : "eno uro";
            case "hh":
                return r += 1 === e ? t ? "ura" : "uro" : 2 === e ? t || i ? "uri" : "urama" : e < 5 ? t || i ? "ure" : "urami" : t || i ? "ur" : "urami";
            case "d":
                return t || i ? "en dan" : "enim dnem";
            case "dd":
                return r += 1 === e ? t || i ? "dan" : "dnem" : 2 === e ? t || i ? "dni" : "dnevoma" : t || i ? "dni" : "dnevi";
            case "M":
                return t || i ? "en mesec" : "enim mesecem";
            case "MM":
                return r += 1 === e ? t || i ? "mesec" : "mesecem" : 2 === e ? t || i ? "meseca" : "mesecema" : e < 5 ? t || i ? "mesece" : "meseci" : t || i ? "mesecev" : "meseci";
            case "y":
                return t || i ? "eno leto" : "enim letom";
            case "yy":
                return r += 1 === e ? t || i ? "leto" : "letom" : 2 === e ? t || i ? "leti" : "letoma" : e < 5 ? t || i ? "leta" : "leti" : t || i ? "let" : "leti"
            }
        }
        e.defineLocale("sl",
        {
            months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
            monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
            monthsParseExact: !0,
            weekdays: "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
            weekdaysShort: "ned._pon._tor._sre._čet._pet._sob.".split("_"),
            weekdaysMin: "ne_po_to_sr_če_pe_so".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY H:mm",
                LLLL: "dddd, D. MMMM YYYY H:mm"
            },
            calendar:
            {
                sameDay: "[danes ob] LT",
                nextDay: "[jutri ob] LT",
                nextWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                        return "[v] [nedeljo] [ob] LT";
                    case 3:
                        return "[v] [sredo] [ob] LT";
                    case 6:
                        return "[v] [soboto] [ob] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[v] dddd [ob] LT"
                    }
                },
                lastDay: "[včeraj ob] LT",
                lastWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                        return "[prejšnjo] [nedeljo] [ob] LT";
                    case 3:
                        return "[prejšnjo] [sredo] [ob] LT";
                    case 6:
                        return "[prejšnjo] [soboto] [ob] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[prejšnji] dddd [ob] LT"
                    }
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "čez %s",
                past: "pred %s",
                s: t,
                ss: t,
                m: t,
                mm: t,
                h: t,
                hh: t,
                d: t,
                dd: t,
                M: t,
                MM: t,
                y: t,
                yy: t
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("sq",
        {
            months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),
            monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
            weekdays: "E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),
            weekdaysShort: "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
            weekdaysMin: "D_H_Ma_Më_E_P_Sh".split("_"),
            weekdaysParseExact: !0,
            meridiemParse: /PD|MD/,
            isPM: function (e)
            {
                return "M" === e.charAt(0)
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "PD" : "MD"
            },
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Sot në] LT",
                nextDay: "[Nesër në] LT",
                nextWeek: "dddd [në] LT",
                lastDay: "[Dje në] LT",
                lastWeek: "dddd [e kaluar në] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "në %s",
                past: "%s më parë",
                s: "disa sekonda",
                ss: "%d sekonda",
                m: "një minutë",
                mm: "%d minuta",
                h: "një orë",
                hh: "%d orë",
                d: "një ditë",
                dd: "%d ditë",
                M: "një muaj",
                MM: "%d muaj",
                y: "një vit",
                yy: "%d vite"
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
            words:
            {
                ss: ["sekunda", "sekunde", "sekundi"],
                m: ["jedan minut", "jedne minute"],
                mm: ["minut", "minute", "minuta"],
                h: ["jedan sat", "jednog sata"],
                hh: ["sat", "sata", "sati"],
                dd: ["dan", "dana", "dana"],
                MM: ["mesec", "meseca", "meseci"],
                yy: ["godina", "godine", "godina"]
            },
            correctGrammaticalCase: function (e, t)
            {
                return 1 === e ? t[0] : e >= 2 && e <= 4 ? t[1] : t[2]
            },
            translate: function (e, n, i)
            {
                var r = t.words[i];
                return 1 === i.length ? n ? r[0] : r[1] : e + " " + t.correctGrammaticalCase(e, r)
            }
        };
        e.defineLocale("sr",
        {
            months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),
            monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),
            monthsParseExact: !0,
            weekdays: "nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota".split("_"),
            weekdaysShort: "ned._pon._uto._sre._čet._pet._sub.".split("_"),
            weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY H:mm",
                LLLL: "dddd, D. MMMM YYYY H:mm"
            },
            calendar:
            {
                sameDay: "[danas u] LT",
                nextDay: "[sutra u] LT",
                nextWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                        return "[u] [nedelju] [u] LT";
                    case 3:
                        return "[u] [sredu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                    }
                },
                lastDay: "[juče u] LT",
                lastWeek: function ()
                {
                    return ["[prošle] [nedelje] [u] LT", "[prošlog] [ponedeljka] [u] LT", "[prošlog] [utorka] [u] LT", "[prošle] [srede] [u] LT", "[prošlog] [četvrtka] [u] LT", "[prošlog] [petka] [u] LT", "[prošle] [subote] [u] LT"][this.day()]
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "za %s",
                past: "pre %s",
                s: "nekoliko sekundi",
                ss: t.translate,
                m: t.translate,
                mm: t.translate,
                h: t.translate,
                hh: t.translate,
                d: "dan",
                dd: t.translate,
                M: "mesec",
                MM: t.translate,
                y: "godinu",
                yy: t.translate
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
            words:
            {
                ss: ["секунда", "секунде", "секунди"],
                m: ["један минут", "једне минуте"],
                mm: ["минут", "минуте", "минута"],
                h: ["један сат", "једног сата"],
                hh: ["сат", "сата", "сати"],
                dd: ["дан", "дана", "дана"],
                MM: ["месец", "месеца", "месеци"],
                yy: ["година", "године", "година"]
            },
            correctGrammaticalCase: function (e, t)
            {
                return 1 === e ? t[0] : e >= 2 && e <= 4 ? t[1] : t[2]
            },
            translate: function (e, n, i)
            {
                var r = t.words[i];
                return 1 === i.length ? n ? r[0] : r[1] : e + " " + t.correctGrammaticalCase(e, r)
            }
        };
        e.defineLocale("sr-cyrl",
        {
            months: "јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар".split("_"),
            monthsShort: "јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.".split("_"),
            monthsParseExact: !0,
            weekdays: "недеља_понедељак_уторак_среда_четвртак_петак_субота".split("_"),
            weekdaysShort: "нед._пон._уто._сре._чет._пет._суб.".split("_"),
            weekdaysMin: "не_по_ут_ср_че_пе_су".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM YYYY",
                LLL: "D. MMMM YYYY H:mm",
                LLLL: "dddd, D. MMMM YYYY H:mm"
            },
            calendar:
            {
                sameDay: "[данас у] LT",
                nextDay: "[сутра у] LT",
                nextWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                        return "[у] [недељу] [у] LT";
                    case 3:
                        return "[у] [среду] [у] LT";
                    case 6:
                        return "[у] [суботу] [у] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[у] dddd [у] LT"
                    }
                },
                lastDay: "[јуче у] LT",
                lastWeek: function ()
                {
                    return ["[прошле] [недеље] [у] LT", "[прошлог] [понедељка] [у] LT", "[прошлог] [уторка] [у] LT", "[прошле] [среде] [у] LT", "[прошлог] [четвртка] [у] LT", "[прошлог] [петка] [у] LT", "[прошле] [суботе] [у] LT"][this.day()]
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "за %s",
                past: "пре %s",
                s: "неколико секунди",
                ss: t.translate,
                m: t.translate,
                mm: t.translate,
                h: t.translate,
                hh: t.translate,
                d: "дан",
                dd: t.translate,
                M: "месец",
                MM: t.translate,
                y: "годину",
                yy: t.translate
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("ss",
        {
            months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"),
            monthsShort: "Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"),
            weekdays: "Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"),
            weekdaysShort: "Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"),
            weekdaysMin: "Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "h:mm A",
                LTS: "h:mm:ss A",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY h:mm A",
                LLLL: "dddd, D MMMM YYYY h:mm A"
            },
            calendar:
            {
                sameDay: "[Namuhla nga] LT",
                nextDay: "[Kusasa nga] LT",
                nextWeek: "dddd [nga] LT",
                lastDay: "[Itolo nga] LT",
                lastWeek: "dddd [leliphelile] [nga] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "nga %s",
                past: "wenteka nga %s",
                s: "emizuzwana lomcane",
                ss: "%d mzuzwana",
                m: "umzuzu",
                mm: "%d emizuzu",
                h: "lihora",
                hh: "%d emahora",
                d: "lilanga",
                dd: "%d emalanga",
                M: "inyanga",
                MM: "%d tinyanga",
                y: "umnyaka",
                yy: "%d iminyaka"
            },
            meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
            meridiem: function (e, t, n)
            {
                return e < 11 ? "ekuseni" : e < 15 ? "emini" : e < 19 ? "entsambama" : "ebusuku"
            },
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "ekuseni" === t ? e : "emini" === t ? e >= 11 ? e : e + 12 : "entsambama" === t || "ebusuku" === t ? 0 === e ? 0 : e + 12 : void 0
            },
            dayOfMonthOrdinalParse: /\d{1,2}/,
            ordinal: "%d",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("sv",
        {
            months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
            monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
            weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
            weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
            weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "YYYY-MM-DD",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY [kl.] HH:mm",
                LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
                lll: "D MMM YYYY HH:mm",
                llll: "ddd D MMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Idag] LT",
                nextDay: "[Imorgon] LT",
                lastDay: "[Igår] LT",
                nextWeek: "[På] dddd LT",
                lastWeek: "[I] dddd[s] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "om %s",
                past: "för %s sedan",
                s: "några sekunder",
                ss: "%d sekunder",
                m: "en minut",
                mm: "%d minuter",
                h: "en timme",
                hh: "%d timmar",
                d: "en dag",
                dd: "%d dagar",
                M: "en månad",
                MM: "%d månader",
                y: "ett år",
                yy: "%d år"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
            ordinal: function (e)
            {
                var t = e % 10,
                    n = 1 == ~~(e % 100 / 10) ? "e" : 1 === t ? "a" : 2 === t ? "a" : "e";
                return e + n
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("sw",
        {
            months: "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),
            monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),
            weekdays: "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),
            weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),
            weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[leo saa] LT",
                nextDay: "[kesho saa] LT",
                nextWeek: "[wiki ijayo] dddd [saat] LT",
                lastDay: "[jana] LT",
                lastWeek: "[wiki iliyopita] dddd [saat] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s baadaye",
                past: "tokea %s",
                s: "hivi punde",
                ss: "sekunde %d",
                m: "dakika moja",
                mm: "dakika %d",
                h: "saa limoja",
                hh: "masaa %d",
                d: "siku moja",
                dd: "masiku %d",
                M: "mwezi mmoja",
                MM: "miezi %d",
                y: "mwaka mmoja",
                yy: "miaka %d"
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
                1: "௧",
                2: "௨",
                3: "௩",
                4: "௪",
                5: "௫",
                6: "௬",
                7: "௭",
                8: "௮",
                9: "௯",
                0: "௦"
            },
            n = {
                "௧": "1",
                "௨": "2",
                "௩": "3",
                "௪": "4",
                "௫": "5",
                "௬": "6",
                "௭": "7",
                "௮": "8",
                "௯": "9",
                "௦": "0"
            };
        e.defineLocale("ta",
        {
            months: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),
            monthsShort: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),
            weekdays: "ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"),
            weekdaysShort: "ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),
            weekdaysMin: "ஞா_தி_செ_பு_வி_வெ_ச".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY, HH:mm",
                LLLL: "dddd, D MMMM YYYY, HH:mm"
            },
            calendar:
            {
                sameDay: "[இன்று] LT",
                nextDay: "[நாளை] LT",
                nextWeek: "dddd, LT",
                lastDay: "[நேற்று] LT",
                lastWeek: "[கடந்த வாரம்] dddd, LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s இல்",
                past: "%s முன்",
                s: "ஒரு சில விநாடிகள்",
                ss: "%d விநாடிகள்",
                m: "ஒரு நிமிடம்",
                mm: "%d நிமிடங்கள்",
                h: "ஒரு மணி நேரம்",
                hh: "%d மணி நேரம்",
                d: "ஒரு நாள்",
                dd: "%d நாட்கள்",
                M: "ஒரு மாதம்",
                MM: "%d மாதங்கள்",
                y: "ஒரு வருடம்",
                yy: "%d ஆண்டுகள்"
            },
            dayOfMonthOrdinalParse: /\d{1,2}வது/,
            ordinal: function (e)
            {
                return e + "வது"
            },
            preparse: function (e)
            {
                return e.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (e)
                {
                    return n[e]
                })
            },
            postformat: function (e)
            {
                return e.replace(/\d/g, function (e)
                {
                    return t[e]
                })
            },
            meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
            meridiem: function (e, t, n)
            {
                return e < 2 ? " யாமம்" : e < 6 ? " வைகறை" : e < 10 ? " காலை" : e < 14 ? " நண்பகல்" : e < 18 ? " எற்பாடு" : e < 22 ? " மாலை" : " யாமம்"
            },
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "யாமம்" === t ? e < 2 ? e : e + 12 : "வைகறை" === t || "காலை" === t ? e : "நண்பகல்" === t && e >= 10 ? e : e + 12
            },
            week:
            {
                dow: 0,
                doy: 6
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("te",
        {
            months: "జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్".split("_"),
            monthsShort: "జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.".split("_"),
            monthsParseExact: !0,
            weekdays: "ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం".split("_"),
            weekdaysShort: "ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని".split("_"),
            weekdaysMin: "ఆ_సో_మం_బు_గు_శు_శ".split("_"),
            longDateFormat:
            {
                LT: "A h:mm",
                LTS: "A h:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY, A h:mm",
                LLLL: "dddd, D MMMM YYYY, A h:mm"
            },
            calendar:
            {
                sameDay: "[నేడు] LT",
                nextDay: "[రేపు] LT",
                nextWeek: "dddd, LT",
                lastDay: "[నిన్న] LT",
                lastWeek: "[గత] dddd, LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s లో",
                past: "%s క్రితం",
                s: "కొన్ని క్షణాలు",
                ss: "%d సెకన్లు",
                m: "ఒక నిమిషం",
                mm: "%d నిమిషాలు",
                h: "ఒక గంట",
                hh: "%d గంటలు",
                d: "ఒక రోజు",
                dd: "%d రోజులు",
                M: "ఒక నెల",
                MM: "%d నెలలు",
                y: "ఒక సంవత్సరం",
                yy: "%d సంవత్సరాలు"
            },
            dayOfMonthOrdinalParse: /\d{1,2}వ/,
            ordinal: "%dవ",
            meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "రాత్రి" === t ? e < 4 ? e : e + 12 : "ఉదయం" === t ? e : "మధ్యాహ్నం" === t ? e >= 10 ? e : e + 12 : "సాయంత్రం" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "రాత్రి" : e < 10 ? "ఉదయం" : e < 17 ? "మధ్యాహ్నం" : e < 20 ? "సాయంత్రం" : "రాత్రి"
            },
            week:
            {
                dow: 0,
                doy: 6
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("tet",
        {
            months: "Janeiru_Fevereiru_Marsu_Abril_Maiu_Juñu_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru".split("_"),
            monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
            weekdays: "Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu".split("_"),
            weekdaysShort: "Dom_Seg_Ters_Kua_Kint_Sest_Sab".split("_"),
            weekdaysMin: "Do_Seg_Te_Ku_Ki_Ses_Sa".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Ohin iha] LT",
                nextDay: "[Aban iha] LT",
                nextWeek: "dddd [iha] LT",
                lastDay: "[Horiseik iha] LT",
                lastWeek: "dddd [semana kotuk] [iha] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "iha %s",
                past: "%s liuba",
                s: "minutu balun",
                ss: "minutu %d",
                m: "minutu ida",
                mm: "minutu %d",
                h: "oras ida",
                hh: "oras %d",
                d: "loron ida",
                dd: "loron %d",
                M: "fulan ida",
                MM: "fulan %d",
                y: "tinan ida",
                yy: "tinan %d"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e)
            {
                var t = e % 10,
                    n = 1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
                return e + n
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
            0: "-ум",
            1: "-ум",
            2: "-юм",
            3: "-юм",
            4: "-ум",
            5: "-ум",
            6: "-ум",
            7: "-ум",
            8: "-ум",
            9: "-ум",
            10: "-ум",
            12: "-ум",
            13: "-ум",
            20: "-ум",
            30: "-юм",
            40: "-ум",
            50: "-ум",
            60: "-ум",
            70: "-ум",
            80: "-ум",
            90: "-ум",
            100: "-ум"
        };
        e.defineLocale("tg",
        {
            months: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"),
            monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
            weekdays: "якшанбе_душанбе_сешанбе_чоршанбе_панҷшанбе_ҷумъа_шанбе".split("_"),
            weekdaysShort: "яшб_дшб_сшб_чшб_пшб_ҷум_шнб".split("_"),
            weekdaysMin: "яш_дш_сш_чш_пш_ҷм_шб".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Имрӯз соати] LT",
                nextDay: "[Пагоҳ соати] LT",
                lastDay: "[Дирӯз соати] LT",
                nextWeek: "dddd[и] [ҳафтаи оянда соати] LT",
                lastWeek: "dddd[и] [ҳафтаи гузашта соати] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "баъди %s",
                past: "%s пеш",
                s: "якчанд сония",
                m: "як дақиқа",
                mm: "%d дақиқа",
                h: "як соат",
                hh: "%d соат",
                d: "як рӯз",
                dd: "%d рӯз",
                M: "як моҳ",
                MM: "%d моҳ",
                y: "як сол",
                yy: "%d сол"
            },
            meridiemParse: /шаб|субҳ|рӯз|бегоҳ/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "шаб" === t ? e < 4 ? e : e + 12 : "субҳ" === t ? e : "рӯз" === t ? e >= 11 ? e : e + 12 : "бегоҳ" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "шаб" : e < 11 ? "субҳ" : e < 16 ? "рӯз" : e < 19 ? "бегоҳ" : "шаб"
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(ум|юм)/,
            ordinal: function (e)
            {
                var n = e % 10,
                    i = e >= 100 ? 100 : null;
                return e + (t[e] || t[n] || t[i])
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("th",
        {
            months: "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),
            monthsShort: "ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.".split("_"),
            monthsParseExact: !0,
            weekdays: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),
            weekdaysShort: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),
            weekdaysMin: "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "H:mm",
                LTS: "H:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY เวลา H:mm",
                LLLL: "วันddddที่ D MMMM YYYY เวลา H:mm"
            },
            meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
            isPM: function (e)
            {
                return "หลังเที่ยง" === e
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "ก่อนเที่ยง" : "หลังเที่ยง"
            },
            calendar:
            {
                sameDay: "[วันนี้ เวลา] LT",
                nextDay: "[พรุ่งนี้ เวลา] LT",
                nextWeek: "dddd[หน้า เวลา] LT",
                lastDay: "[เมื่อวานนี้ เวลา] LT",
                lastWeek: "[วัน]dddd[ที่แล้ว เวลา] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "อีก %s",
                past: "%sที่แล้ว",
                s: "ไม่กี่วินาที",
                ss: "%d วินาที",
                m: "1 นาที",
                mm: "%d นาที",
                h: "1 ชั่วโมง",
                hh: "%d ชั่วโมง",
                d: "1 วัน",
                dd: "%d วัน",
                M: "1 เดือน",
                MM: "%d เดือน",
                y: "1 ปี",
                yy: "%d ปี"
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("tl-ph",
        {
            months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),
            monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
            weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),
            weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
            weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "MM/D/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY HH:mm",
                LLLL: "dddd, MMMM DD, YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "LT [ngayong araw]",
                nextDay: "[Bukas ng] LT",
                nextWeek: "LT [sa susunod na] dddd",
                lastDay: "LT [kahapon]",
                lastWeek: "LT [noong nakaraang] dddd",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "sa loob ng %s",
                past: "%s ang nakalipas",
                s: "ilang segundo",
                ss: "%d segundo",
                m: "isang minuto",
                mm: "%d minuto",
                h: "isang oras",
                hh: "%d oras",
                d: "isang araw",
                dd: "%d araw",
                M: "isang buwan",
                MM: "%d buwan",
                y: "isang taon",
                yy: "%d taon"
            },
            dayOfMonthOrdinalParse: /\d{1,2}/,
            ordinal: function (e)
            {
                return e
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = "pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");

        function n(e, n, i, r)
        {
            var a = function (e)
            {
                var n = Math.floor(e % 1e3 / 100),
                    i = Math.floor(e % 100 / 10),
                    r = e % 10,
                    a = "";
                return n > 0 && (a += t[n] + "vatlh"), i > 0 && (a += ("" !== a ? " " : "") + t[i] + "maH"), r > 0 && (a += ("" !== a ? " " : "") + t[r]), "" === a ? "pagh" : a
            }(e);
            switch (i)
            {
            case "ss":
                return a + " lup";
            case "mm":
                return a + " tup";
            case "hh":
                return a + " rep";
            case "dd":
                return a + " jaj";
            case "MM":
                return a + " jar";
            case "yy":
                return a + " DIS"
            }
        }
        e.defineLocale("tlh",
        {
            months: "tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split("_"),
            monthsShort: "jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split("_"),
            monthsParseExact: !0,
            weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
            weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
            weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[DaHjaj] LT",
                nextDay: "[wa’leS] LT",
                nextWeek: "LLL",
                lastDay: "[wa’Hu’] LT",
                lastWeek: "LLL",
                sameElse: "L"
            },
            relativeTime:
            {
                future: function (e)
                {
                    var t = e;
                    return t = -1 !== e.indexOf("jaj") ? t.slice(0, -3) + "leS" : -1 !== e.indexOf("jar") ? t.slice(0, -3) + "waQ" : -1 !== e.indexOf("DIS") ? t.slice(0, -3) + "nem" : t + " pIq"
                },
                past: function (e)
                {
                    var t = e;
                    return t = -1 !== e.indexOf("jaj") ? t.slice(0, -3) + "Hu’" : -1 !== e.indexOf("jar") ? t.slice(0, -3) + "wen" : -1 !== e.indexOf("DIS") ? t.slice(0, -3) + "ben" : t + " ret"
                },
                s: "puS lup",
                ss: n,
                m: "wa’ tup",
                mm: n,
                h: "wa’ rep",
                hh: n,
                d: "wa’ jaj",
                dd: n,
                M: "wa’ jar",
                MM: n,
                y: "wa’ DIS",
                yy: n
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = {
            1: "'inci",
            5: "'inci",
            8: "'inci",
            70: "'inci",
            80: "'inci",
            2: "'nci",
            7: "'nci",
            20: "'nci",
            50: "'nci",
            3: "'üncü",
            4: "'üncü",
            100: "'üncü",
            6: "'ncı",
            9: "'uncu",
            10: "'uncu",
            30: "'uncu",
            60: "'ıncı",
            90: "'ıncı"
        };
        e.defineLocale("tr",
        {
            months: "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
            monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
            weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
            weekdaysShort: "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
            weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[bugün saat] LT",
                nextDay: "[yarın saat] LT",
                nextWeek: "[gelecek] dddd [saat] LT",
                lastDay: "[dün] LT",
                lastWeek: "[geçen] dddd [saat] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s sonra",
                past: "%s önce",
                s: "birkaç saniye",
                ss: "%d saniye",
                m: "bir dakika",
                mm: "%d dakika",
                h: "bir saat",
                hh: "%d saat",
                d: "bir gün",
                dd: "%d gün",
                M: "bir ay",
                MM: "%d ay",
                y: "bir yıl",
                yy: "%d yıl"
            },
            ordinal: function (e, n)
            {
                switch (n)
                {
                case "d":
                case "D":
                case "Do":
                case "DD":
                    return e;
                default:
                    if (0 === e) return e + "'ıncı";
                    var i = e % 10,
                        r = e % 100 - i,
                        a = e >= 100 ? 100 : null;
                    return e + (t[i] || t[r] || t[a])
                }
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n, i)
        {
            var r = {
                s: ["viensas secunds", "'iensas secunds"],
                ss: [e + " secunds", e + " secunds"],
                m: ["'n míut", "'iens míut"],
                mm: [e + " míuts", e + " míuts"],
                h: ["'n þora", "'iensa þora"],
                hh: [e + " þoras", e + " þoras"],
                d: ["'n ziua", "'iensa ziua"],
                dd: [e + " ziuas", e + " ziuas"],
                M: ["'n mes", "'iens mes"],
                MM: [e + " mesen", e + " mesen"],
                y: ["'n ar", "'iens ar"],
                yy: [e + " ars", e + " ars"]
            };
            return i ? r[n][0] : t ? r[n][0] : r[n][1]
        }
        e.defineLocale("tzl",
        {
            months: "Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"),
            monthsShort: "Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"),
            weekdays: "Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"),
            weekdaysShort: "Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"),
            weekdaysMin: "Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"),
            longDateFormat:
            {
                LT: "HH.mm",
                LTS: "HH.mm.ss",
                L: "DD.MM.YYYY",
                LL: "D. MMMM [dallas] YYYY",
                LLL: "D. MMMM [dallas] YYYY HH.mm",
                LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm"
            },
            meridiemParse: /d\'o|d\'a/i,
            isPM: function (e)
            {
                return "d'o" === e.toLowerCase()
            },
            meridiem: function (e, t, n)
            {
                return e > 11 ? n ? "d'o" : "D'O" : n ? "d'a" : "D'A"
            },
            calendar:
            {
                sameDay: "[oxhi à] LT",
                nextDay: "[demà à] LT",
                nextWeek: "dddd [à] LT",
                lastDay: "[ieiri à] LT",
                lastWeek: "[sür el] dddd [lasteu à] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "osprei %s",
                past: "ja%s",
                s: t,
                ss: t,
                m: t,
                mm: t,
                h: t,
                hh: t,
                d: t,
                dd: t,
                M: t,
                MM: t,
                y: t,
                yy: t
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("tzm",
        {
            months: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
            monthsShort: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
            weekdays: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
            weekdaysShort: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
            weekdaysMin: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[ⴰⵙⴷⵅ ⴴ] LT",
                nextDay: "[ⴰⵙⴽⴰ ⴴ] LT",
                nextWeek: "dddd [ⴴ] LT",
                lastDay: "[ⴰⵚⴰⵏⵜ ⴴ] LT",
                lastWeek: "dddd [ⴴ] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",
                past: "ⵢⴰⵏ %s",
                s: "ⵉⵎⵉⴽ",
                ss: "%d ⵉⵎⵉⴽ",
                m: "ⵎⵉⵏⵓⴺ",
                mm: "%d ⵎⵉⵏⵓⴺ",
                h: "ⵙⴰⵄⴰ",
                hh: "%d ⵜⴰⵙⵙⴰⵄⵉⵏ",
                d: "ⴰⵙⵙ",
                dd: "%d oⵙⵙⴰⵏ",
                M: "ⴰⵢoⵓⵔ",
                MM: "%d ⵉⵢⵢⵉⵔⵏ",
                y: "ⴰⵙⴳⴰⵙ",
                yy: "%d ⵉⵙⴳⴰⵙⵏ"
            },
            week:
            {
                dow: 6,
                doy: 12
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("tzm-latn",
        {
            months: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
            monthsShort: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
            weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
            weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
            weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[asdkh g] LT",
                nextDay: "[aska g] LT",
                nextWeek: "dddd [g] LT",
                lastDay: "[assant g] LT",
                lastWeek: "dddd [g] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "dadkh s yan %s",
                past: "yan %s",
                s: "imik",
                ss: "%d imik",
                m: "minuḍ",
                mm: "%d minuḍ",
                h: "saɛa",
                hh: "%d tassaɛin",
                d: "ass",
                dd: "%d ossan",
                M: "ayowr",
                MM: "%d iyyirn",
                y: "asgas",
                yy: "%d isgasn"
            },
            week:
            {
                dow: 6,
                doy: 12
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("ug-cn",
        {
            months: "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split("_"),
            monthsShort: "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split("_"),
            weekdays: "يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە".split("_"),
            weekdaysShort: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"),
            weekdaysMin: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "YYYY-MM-DD",
                LL: "YYYY-يىلىM-ئاينىڭD-كۈنى",
                LLL: "YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm",
                LLLL: "dddd، YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm"
            },
            meridiemParse: /يېرىم كېچە|سەھەر|چۈشتىن بۇرۇن|چۈش|چۈشتىن كېيىن|كەچ/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "يېرىم كېچە" === t || "سەھەر" === t || "چۈشتىن بۇرۇن" === t ? e : "چۈشتىن كېيىن" === t || "كەچ" === t ? e + 12 : e >= 11 ? e : e + 12
            },
            meridiem: function (e, t, n)
            {
                var i = 100 * e + t;
                return i < 600 ? "يېرىم كېچە" : i < 900 ? "سەھەر" : i < 1130 ? "چۈشتىن بۇرۇن" : i < 1230 ? "چۈش" : i < 1800 ? "چۈشتىن كېيىن" : "كەچ"
            },
            calendar:
            {
                sameDay: "[بۈگۈن سائەت] LT",
                nextDay: "[ئەتە سائەت] LT",
                nextWeek: "[كېلەركى] dddd [سائەت] LT",
                lastDay: "[تۆنۈگۈن] LT",
                lastWeek: "[ئالدىنقى] dddd [سائەت] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s كېيىن",
                past: "%s بۇرۇن",
                s: "نەچچە سېكونت",
                ss: "%d سېكونت",
                m: "بىر مىنۇت",
                mm: "%d مىنۇت",
                h: "بىر سائەت",
                hh: "%d سائەت",
                d: "بىر كۈن",
                dd: "%d كۈن",
                M: "بىر ئاي",
                MM: "%d ئاي",
                y: "بىر يىل",
                yy: "%d يىل"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(-كۈنى|-ئاي|-ھەپتە)/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                case "d":
                case "D":
                case "DDD":
                    return e + "-كۈنى";
                case "w":
                case "W":
                    return e + "-ھەپتە";
                default:
                    return e
                }
            },
            preparse: function (e)
            {
                return e.replace(/،/g, ",")
            },
            postformat: function (e)
            {
                return e.replace(/,/g, "،")
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";

        function t(e, t, n)
        {
            var i, r, a = {
                ss: t ? "секунда_секунди_секунд" : "секунду_секунди_секунд",
                mm: t ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин",
                hh: t ? "година_години_годин" : "годину_години_годин",
                dd: "день_дні_днів",
                MM: "місяць_місяці_місяців",
                yy: "рік_роки_років"
            };
            return "m" === n ? t ? "хвилина" : "хвилину" : "h" === n ? t ? "година" : "годину" : e + " " + (i = +e, r = a[n].split("_"), i % 10 == 1 && i % 100 != 11 ? r[0] : i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20) ? r[1] : r[2])
        }

        function n(e)
        {
            return function ()
            {
                return e + "о" + (11 === this.hours() ? "б" : "") + "] LT"
            }
        }
        e.defineLocale("uk",
        {
            months:
            {
                format: "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"),
                standalone: "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_")
            },
            monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),
            weekdays: function (e, t)
            {
                var n = {
                    nominative: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),
                    accusative: "неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),
                    genitive: "неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")
                };
                if (!e) return n.nominative;
                var i = /(\[[ВвУу]\]) ?dddd/.test(t) ? "accusative" : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(t) ? "genitive" : "nominative";
                return n[i][e.day()]
            },
            weekdaysShort: "нд_пн_вт_ср_чт_пт_сб".split("_"),
            weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD.MM.YYYY",
                LL: "D MMMM YYYY р.",
                LLL: "D MMMM YYYY р., HH:mm",
                LLLL: "dddd, D MMMM YYYY р., HH:mm"
            },
            calendar:
            {
                sameDay: n("[Сьогодні "),
                nextDay: n("[Завтра "),
                lastDay: n("[Вчора "),
                nextWeek: n("[У] dddd ["),
                lastWeek: function ()
                {
                    switch (this.day())
                    {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return n("[Минулої] dddd [").call(this);
                    case 1:
                    case 2:
                    case 4:
                        return n("[Минулого] dddd [").call(this)
                    }
                },
                sameElse: "L"
            },
            relativeTime:
            {
                future: "за %s",
                past: "%s тому",
                s: "декілька секунд",
                ss: t,
                m: t,
                mm: t,
                h: "годину",
                hh: t,
                d: "день",
                dd: t,
                M: "місяць",
                MM: t,
                y: "рік",
                yy: t
            },
            meridiemParse: /ночі|ранку|дня|вечора/,
            isPM: function (e)
            {
                return /^(дня|вечора)$/.test(e)
            },
            meridiem: function (e, t, n)
            {
                return e < 4 ? "ночі" : e < 12 ? "ранку" : e < 17 ? "дня" : "вечора"
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                case "M":
                case "d":
                case "DDD":
                case "w":
                case "W":
                    return e + "-й";
                case "D":
                    return e + "-го";
                default:
                    return e
                }
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        var t = ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"],
            n = ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"];
        e.defineLocale("ur",
        {
            months: t,
            monthsShort: t,
            weekdays: n,
            weekdaysShort: n,
            weekdaysMin: n,
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd، D MMMM YYYY HH:mm"
            },
            meridiemParse: /صبح|شام/,
            isPM: function (e)
            {
                return "شام" === e
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? "صبح" : "شام"
            },
            calendar:
            {
                sameDay: "[آج بوقت] LT",
                nextDay: "[کل بوقت] LT",
                nextWeek: "dddd [بوقت] LT",
                lastDay: "[گذشتہ روز بوقت] LT",
                lastWeek: "[گذشتہ] dddd [بوقت] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s بعد",
                past: "%s قبل",
                s: "چند سیکنڈ",
                ss: "%d سیکنڈ",
                m: "ایک منٹ",
                mm: "%d منٹ",
                h: "ایک گھنٹہ",
                hh: "%d گھنٹے",
                d: "ایک دن",
                dd: "%d دن",
                M: "ایک ماہ",
                MM: "%d ماہ",
                y: "ایک سال",
                yy: "%d سال"
            },
            preparse: function (e)
            {
                return e.replace(/،/g, ",")
            },
            postformat: function (e)
            {
                return e.replace(/,/g, "،")
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("uz",
        {
            months: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"),
            monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
            weekdays: "Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),
            weekdaysShort: "Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),
            weekdaysMin: "Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "D MMMM YYYY, dddd HH:mm"
            },
            calendar:
            {
                sameDay: "[Бугун соат] LT [да]",
                nextDay: "[Эртага] LT [да]",
                nextWeek: "dddd [куни соат] LT [да]",
                lastDay: "[Кеча соат] LT [да]",
                lastWeek: "[Утган] dddd [куни соат] LT [да]",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "Якин %s ичида",
                past: "Бир неча %s олдин",
                s: "фурсат",
                ss: "%d фурсат",
                m: "бир дакика",
                mm: "%d дакика",
                h: "бир соат",
                hh: "%d соат",
                d: "бир кун",
                dd: "%d кун",
                M: "бир ой",
                MM: "%d ой",
                y: "бир йил",
                yy: "%d йил"
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("uz-latn",
        {
            months: "Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"),
            monthsShort: "Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"),
            weekdays: "Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"),
            weekdaysShort: "Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"),
            weekdaysMin: "Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "D MMMM YYYY, dddd HH:mm"
            },
            calendar:
            {
                sameDay: "[Bugun soat] LT [da]",
                nextDay: "[Ertaga] LT [da]",
                nextWeek: "dddd [kuni soat] LT [da]",
                lastDay: "[Kecha soat] LT [da]",
                lastWeek: "[O'tgan] dddd [kuni soat] LT [da]",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "Yaqin %s ichida",
                past: "Bir necha %s oldin",
                s: "soniya",
                ss: "%d soniya",
                m: "bir daqiqa",
                mm: "%d daqiqa",
                h: "bir soat",
                hh: "%d soat",
                d: "bir kun",
                dd: "%d kun",
                M: "bir oy",
                MM: "%d oy",
                y: "bir yil",
                yy: "%d yil"
            },
            week:
            {
                dow: 1,
                doy: 7
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("vi",
        {
            months: "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),
            monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
            monthsParseExact: !0,
            weekdays: "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
            weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
            weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
            weekdaysParseExact: !0,
            meridiemParse: /sa|ch/i,
            isPM: function (e)
            {
                return /^ch$/i.test(e)
            },
            meridiem: function (e, t, n)
            {
                return e < 12 ? n ? "sa" : "SA" : n ? "ch" : "CH"
            },
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM [năm] YYYY",
                LLL: "D MMMM [năm] YYYY HH:mm",
                LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
                l: "DD/M/YYYY",
                ll: "D MMM YYYY",
                lll: "D MMM YYYY HH:mm",
                llll: "ddd, D MMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[Hôm nay lúc] LT",
                nextDay: "[Ngày mai lúc] LT",
                nextWeek: "dddd [tuần tới lúc] LT",
                lastDay: "[Hôm qua lúc] LT",
                lastWeek: "dddd [tuần rồi lúc] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "%s tới",
                past: "%s trước",
                s: "vài giây",
                ss: "%d giây",
                m: "một phút",
                mm: "%d phút",
                h: "một giờ",
                hh: "%d giờ",
                d: "một ngày",
                dd: "%d ngày",
                M: "một tháng",
                MM: "%d tháng",
                y: "một năm",
                yy: "%d năm"
            },
            dayOfMonthOrdinalParse: /\d{1,2}/,
            ordinal: function (e)
            {
                return e
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("x-pseudo",
        {
            months: "J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér".split("_"),
            monthsShort: "J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc".split("_"),
            monthsParseExact: !0,
            weekdays: "S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý".split("_"),
            weekdaysShort: "S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát".split("_"),
            weekdaysMin: "S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá".split("_"),
            weekdaysParseExact: !0,
            longDateFormat:
            {
                LT: "HH:mm",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm"
            },
            calendar:
            {
                sameDay: "[T~ódá~ý át] LT",
                nextDay: "[T~ómó~rró~w át] LT",
                nextWeek: "dddd [át] LT",
                lastDay: "[Ý~ést~érdá~ý át] LT",
                lastWeek: "[L~ást] dddd [át] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "í~ñ %s",
                past: "%s á~gó",
                s: "á ~féw ~sécó~ñds",
                ss: "%d s~écóñ~ds",
                m: "á ~míñ~úté",
                mm: "%d m~íñú~tés",
                h: "á~ñ hó~úr",
                hh: "%d h~óúrs",
                d: "á ~dáý",
                dd: "%d d~áýs",
                M: "á ~móñ~th",
                MM: "%d m~óñt~hs",
                y: "á ~ýéár",
                yy: "%d ý~éárs"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function (e)
            {
                var t = e % 10,
                    n = 1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
                return e + n
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("yo",
        {
            months: "Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀".split("_"),
            monthsShort: "Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀".split("_"),
            weekdays: "Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta".split("_"),
            weekdaysShort: "Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá".split("_"),
            weekdaysMin: "Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb".split("_"),
            longDateFormat:
            {
                LT: "h:mm A",
                LTS: "h:mm:ss A",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY h:mm A",
                LLLL: "dddd, D MMMM YYYY h:mm A"
            },
            calendar:
            {
                sameDay: "[Ònì ni] LT",
                nextDay: "[Ọ̀la ni] LT",
                nextWeek: "dddd [Ọsẹ̀ tón'bọ] [ni] LT",
                lastDay: "[Àna ni] LT",
                lastWeek: "dddd [Ọsẹ̀ tólọ́] [ni] LT",
                sameElse: "L"
            },
            relativeTime:
            {
                future: "ní %s",
                past: "%s kọjá",
                s: "ìsẹjú aayá die",
                ss: "aayá %d",
                m: "ìsẹjú kan",
                mm: "ìsẹjú %d",
                h: "wákati kan",
                hh: "wákati %d",
                d: "ọjọ́ kan",
                dd: "ọjọ́ %d",
                M: "osù kan",
                MM: "osù %d",
                y: "ọdún kan",
                yy: "ọdún %d"
            },
            dayOfMonthOrdinalParse: /ọjọ́\s\d{1,2}/,
            ordinal: "ọjọ́ %d",
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("zh-cn",
        {
            months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
            monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
            weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
            weekdaysMin: "日_一_二_三_四_五_六".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "YYYY/MM/DD",
                LL: "YYYY年M月D日",
                LLL: "YYYY年M月D日Ah点mm分",
                LLLL: "YYYY年M月D日ddddAh点mm分",
                l: "YYYY/M/D",
                ll: "YYYY年M月D日",
                lll: "YYYY年M月D日 HH:mm",
                llll: "YYYY年M月D日dddd HH:mm"
            },
            meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "凌晨" === t || "早上" === t || "上午" === t ? e : "下午" === t || "晚上" === t ? e + 12 : e >= 11 ? e : e + 12
            },
            meridiem: function (e, t, n)
            {
                var i = 100 * e + t;
                return i < 600 ? "凌晨" : i < 900 ? "早上" : i < 1130 ? "上午" : i < 1230 ? "中午" : i < 1800 ? "下午" : "晚上"
            },
            calendar:
            {
                sameDay: "[今天]LT",
                nextDay: "[明天]LT",
                nextWeek: "[下]ddddLT",
                lastDay: "[昨天]LT",
                lastWeek: "[上]ddddLT",
                sameElse: "L"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                case "d":
                case "D":
                case "DDD":
                    return e + "日";
                case "M":
                    return e + "月";
                case "w":
                case "W":
                    return e + "周";
                default:
                    return e
                }
            },
            relativeTime:
            {
                future: "%s内",
                past: "%s前",
                s: "几秒",
                ss: "%d 秒",
                m: "1 分钟",
                mm: "%d 分钟",
                h: "1 小时",
                hh: "%d 小时",
                d: "1 天",
                dd: "%d 天",
                M: "1 个月",
                MM: "%d 个月",
                y: "1 年",
                yy: "%d 年"
            },
            week:
            {
                dow: 1,
                doy: 4
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("zh-hk",
        {
            months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
            monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
            weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
            weekdaysMin: "日_一_二_三_四_五_六".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "YYYY/MM/DD",
                LL: "YYYY年M月D日",
                LLL: "YYYY年M月D日 HH:mm",
                LLLL: "YYYY年M月D日dddd HH:mm",
                l: "YYYY/M/D",
                ll: "YYYY年M月D日",
                lll: "YYYY年M月D日 HH:mm",
                llll: "YYYY年M月D日dddd HH:mm"
            },
            meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "凌晨" === t || "早上" === t || "上午" === t ? e : "中午" === t ? e >= 11 ? e : e + 12 : "下午" === t || "晚上" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                var i = 100 * e + t;
                return i < 600 ? "凌晨" : i < 900 ? "早上" : i < 1130 ? "上午" : i < 1230 ? "中午" : i < 1800 ? "下午" : "晚上"
            },
            calendar:
            {
                sameDay: "[今天]LT",
                nextDay: "[明天]LT",
                nextWeek: "[下]ddddLT",
                lastDay: "[昨天]LT",
                lastWeek: "[上]ddddLT",
                sameElse: "L"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                case "d":
                case "D":
                case "DDD":
                    return e + "日";
                case "M":
                    return e + "月";
                case "w":
                case "W":
                    return e + "週";
                default:
                    return e
                }
            },
            relativeTime:
            {
                future: "%s內",
                past: "%s前",
                s: "幾秒",
                ss: "%d 秒",
                m: "1 分鐘",
                mm: "%d 分鐘",
                h: "1 小時",
                hh: "%d 小時",
                d: "1 天",
                dd: "%d 天",
                M: "1 個月",
                MM: "%d 個月",
                y: "1 年",
                yy: "%d 年"
            }
        })
    }(n(0))
},
function (e, t, n)
{
    ! function (e)
    {
        "use strict";
        e.defineLocale("zh-tw",
        {
            months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
            monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
            weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
            weekdaysMin: "日_一_二_三_四_五_六".split("_"),
            longDateFormat:
            {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "YYYY/MM/DD",
                LL: "YYYY年M月D日",
                LLL: "YYYY年M月D日 HH:mm",
                LLLL: "YYYY年M月D日dddd HH:mm",
                l: "YYYY/M/D",
                ll: "YYYY年M月D日",
                lll: "YYYY年M月D日 HH:mm",
                llll: "YYYY年M月D日dddd HH:mm"
            },
            meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
            meridiemHour: function (e, t)
            {
                return 12 === e && (e = 0), "凌晨" === t || "早上" === t || "上午" === t ? e : "中午" === t ? e >= 11 ? e : e + 12 : "下午" === t || "晚上" === t ? e + 12 : void 0
            },
            meridiem: function (e, t, n)
            {
                var i = 100 * e + t;
                return i < 600 ? "凌晨" : i < 900 ? "早上" : i < 1130 ? "上午" : i < 1230 ? "中午" : i < 1800 ? "下午" : "晚上"
            },
            calendar:
            {
                sameDay: "[今天] LT",
                nextDay: "[明天] LT",
                nextWeek: "[下]dddd LT",
                lastDay: "[昨天] LT",
                lastWeek: "[上]dddd LT",
                sameElse: "L"
            },
            dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
            ordinal: function (e, t)
            {
                switch (t)
                {
                case "d":
                case "D":
                case "DDD":
                    return e + "日";
                case "M":
                    return e + "月";
                case "w":
                case "W":
                    return e + "週";
                default:
                    return e
                }
            },
            relativeTime:
            {
                future: "%s內",
                past: "%s前",
                s: "幾秒",
                ss: "%d 秒",
                m: "1 分鐘",
                mm: "%d 分鐘",
                h: "1 小時",
                hh: "%d 小時",
                d: "1 天",
                dd: "%d 天",
                M: "1 個月",
                MM: "%d 個月",
                y: "1 年",
                yy: "%d 年"
            }
        })
    }(n(0))
},
function (e, t, n)
{
    var i = n(169),
        r = n(171),
        a = function (e)
        {
            return e instanceof a ? e : this instanceof a ? (this.valid = !1, this.values = {
                rgb: [0, 0, 0],
                hsl: [0, 0, 0],
                hsv: [0, 0, 0],
                hwb: [0, 0, 0],
                cmyk: [0, 0, 0, 0],
                alpha: 1
            }, void("string" == typeof e ? (t = r.getRgba(e)) ? this.setValues("rgb", t) : (t = r.getHsla(e)) ? this.setValues("hsl", t) : (t = r.getHwb(e)) && this.setValues("hwb", t) : "object" == typeof e && (void 0 !== (t = e).r || void 0 !== t.red ? this.setValues("rgb", t) : void 0 !== t.l || void 0 !== t.lightness ? this.setValues("hsl", t) : void 0 !== t.v || void 0 !== t.value ? this.setValues("hsv", t) : void 0 !== t.w || void 0 !== t.whiteness ? this.setValues("hwb", t) : void 0 === t.c && void 0 === t.cyan || this.setValues("cmyk", t)))) : new a(e);
            var t
        };
    a.prototype = {
        isValid: function ()
        {
            return this.valid
        },
        rgb: function ()
        {
            return this.setSpace("rgb", arguments)
        },
        hsl: function ()
        {
            return this.setSpace("hsl", arguments)
        },
        hsv: function ()
        {
            return this.setSpace("hsv", arguments)
        },
        hwb: function ()
        {
            return this.setSpace("hwb", arguments)
        },
        cmyk: function ()
        {
            return this.setSpace("cmyk", arguments)
        },
        rgbArray: function ()
        {
            return this.values.rgb
        },
        hslArray: function ()
        {
            return this.values.hsl
        },
        hsvArray: function ()
        {
            return this.values.hsv
        },
        hwbArray: function ()
        {
            var e = this.values;
            return 1 !== e.alpha ? e.hwb.concat([e.alpha]) : e.hwb
        },
        cmykArray: function ()
        {
            return this.values.cmyk
        },
        rgbaArray: function ()
        {
            var e = this.values;
            return e.rgb.concat([e.alpha])
        },
        hslaArray: function ()
        {
            var e = this.values;
            return e.hsl.concat([e.alpha])
        },
        alpha: function (e)
        {
            return void 0 === e ? this.values.alpha : (this.setValues("alpha", e), this)
        },
        red: function (e)
        {
            return this.setChannel("rgb", 0, e)
        },
        green: function (e)
        {
            return this.setChannel("rgb", 1, e)
        },
        blue: function (e)
        {
            return this.setChannel("rgb", 2, e)
        },
        hue: function (e)
        {
            return e && (e = (e %= 360) < 0 ? 360 + e : e), this.setChannel("hsl", 0, e)
        },
        saturation: function (e)
        {
            return this.setChannel("hsl", 1, e)
        },
        lightness: function (e)
        {
            return this.setChannel("hsl", 2, e)
        },
        saturationv: function (e)
        {
            return this.setChannel("hsv", 1, e)
        },
        whiteness: function (e)
        {
            return this.setChannel("hwb", 1, e)
        },
        blackness: function (e)
        {
            return this.setChannel("hwb", 2, e)
        },
        value: function (e)
        {
            return this.setChannel("hsv", 2, e)
        },
        cyan: function (e)
        {
            return this.setChannel("cmyk", 0, e)
        },
        magenta: function (e)
        {
            return this.setChannel("cmyk", 1, e)
        },
        yellow: function (e)
        {
            return this.setChannel("cmyk", 2, e)
        },
        black: function (e)
        {
            return this.setChannel("cmyk", 3, e)
        },
        hexString: function ()
        {
            return r.hexString(this.values.rgb)
        },
        rgbString: function ()
        {
            return r.rgbString(this.values.rgb, this.values.alpha)
        },
        rgbaString: function ()
        {
            return r.rgbaString(this.values.rgb, this.values.alpha)
        },
        percentString: function ()
        {
            return r.percentString(this.values.rgb, this.values.alpha)
        },
        hslString: function ()
        {
            return r.hslString(this.values.hsl, this.values.alpha)
        },
        hslaString: function ()
        {
            return r.hslaString(this.values.hsl, this.values.alpha)
        },
        hwbString: function ()
        {
            return r.hwbString(this.values.hwb, this.values.alpha)
        },
        keyword: function ()
        {
            return r.keyword(this.values.rgb, this.values.alpha)
        },
        rgbNumber: function ()
        {
            var e = this.values.rgb;
            return e[0] << 16 | e[1] << 8 | e[2]
        },
        luminosity: function ()
        {
            for (var e = this.values.rgb, t = [], n = 0; n < e.length; n++)
            {
                var i = e[n] / 255;
                t[n] = i <= .03928 ? i / 12.92 : Math.pow((i + .055) / 1.055, 2.4)
            }
            return .2126 * t[0] + .7152 * t[1] + .0722 * t[2]
        },
        contrast: function (e)
        {
            var t = this.luminosity(),
                n = e.luminosity();
            return t > n ? (t + .05) / (n + .05) : (n + .05) / (t + .05)
        },
        level: function (e)
        {
            var t = this.contrast(e);
            return t >= 7.1 ? "AAA" : t >= 4.5 ? "AA" : ""
        },
        dark: function ()
        {
            var e = this.values.rgb;
            return (299 * e[0] + 587 * e[1] + 114 * e[2]) / 1e3 < 128
        },
        light: function ()
        {
            return !this.dark()
        },
        negate: function ()
        {
            for (var e = [], t = 0; t < 3; t++) e[t] = 255 - this.values.rgb[t];
            return this.setValues("rgb", e), this
        },
        lighten: function (e)
        {
            var t = this.values.hsl;
            return t[2] += t[2] * e, this.setValues("hsl", t), this
        },
        darken: function (e)
        {
            var t = this.values.hsl;
            return t[2] -= t[2] * e, this.setValues("hsl", t), this
        },
        saturate: function (e)
        {
            var t = this.values.hsl;
            return t[1] += t[1] * e, this.setValues("hsl", t), this
        },
        desaturate: function (e)
        {
            var t = this.values.hsl;
            return t[1] -= t[1] * e, this.setValues("hsl", t), this
        },
        whiten: function (e)
        {
            var t = this.values.hwb;
            return t[1] += t[1] * e, this.setValues("hwb", t), this
        },
        blacken: function (e)
        {
            var t = this.values.hwb;
            return t[2] += t[2] * e, this.setValues("hwb", t), this
        },
        greyscale: function ()
        {
            var e = this.values.rgb,
                t = .3 * e[0] + .59 * e[1] + .11 * e[2];
            return this.setValues("rgb", [t, t, t]), this
        },
        clearer: function (e)
        {
            var t = this.values.alpha;
            return this.setValues("alpha", t - t * e), this
        },
        opaquer: function (e)
        {
            var t = this.values.alpha;
            return this.setValues("alpha", t + t * e), this
        },
        rotate: function (e)
        {
            var t = this.values.hsl,
                n = (t[0] + e) % 360;
            return t[0] = n < 0 ? 360 + n : n, this.setValues("hsl", t), this
        },
        mix: function (e, t)
        {
            var n = e,
                i = void 0 === t ? .5 : t,
                r = 2 * i - 1,
                a = this.alpha() - n.alpha(),
                o = ((r * a == -1 ? r : (r + a) / (1 + r * a)) + 1) / 2,
                l = 1 - o;
            return this.rgb(o * this.red() + l * n.red(), o * this.green() + l * n.green(), o * this.blue() + l * n.blue()).alpha(this.alpha() * i + n.alpha() * (1 - i))
        },
        toJSON: function ()
        {
            return this.rgb()
        },
        clone: function ()
        {
            var e, t, n = new a,
                i = this.values,
                r = n.values;
            for (var o in i) i.hasOwnProperty(o) && (e = i[o], "[object Array]" === (t = {}.toString.call(e)) ? r[o] = e.slice(0) : "[object Number]" === t ? r[o] = e : console.error("unexpected color value:", e));
            return n
        }
    }, a.prototype.spaces = {
        rgb: ["red", "green", "blue"],
        hsl: ["hue", "saturation", "lightness"],
        hsv: ["hue", "saturation", "value"],
        hwb: ["hue", "whiteness", "blackness"],
        cmyk: ["cyan", "magenta", "yellow", "black"]
    }, a.prototype.maxes = {
        rgb: [255, 255, 255],
        hsl: [360, 100, 100],
        hsv: [360, 100, 100],
        hwb: [360, 100, 100],
        cmyk: [100, 100, 100, 100]
    }, a.prototype.getValues = function (e)
    {
        for (var t = this.values, n = {}, i = 0; i < e.length; i++) n[e.charAt(i)] = t[e][i];
        return 1 !== t.alpha && (n.a = t.alpha), n
    }, a.prototype.setValues = function (e, t)
    {
        var n, r, a = this.values,
            o = this.spaces,
            l = this.maxes,
            s = 1;
        if (this.valid = !0, "alpha" === e) s = t;
        else if (t.length) a[e] = t.slice(0, e.length), s = t[e.length];
        else if (void 0 !== t[e.charAt(0)])
        {
            for (n = 0; n < e.length; n++) a[e][n] = t[e.charAt(n)];
            s = t.a
        }
        else if (void 0 !== t[o[e][0]])
        {
            var d = o[e];
            for (n = 0; n < e.length; n++) a[e][n] = t[d[n]];
            s = t.alpha
        }
        if (a.alpha = Math.max(0, Math.min(1, void 0 === s ? a.alpha : s)), "alpha" === e) return !1;
        for (n = 0; n < e.length; n++) r = Math.max(0, Math.min(l[e][n], a[e][n])), a[e][n] = Math.round(r);
        for (var u in o) u !== e && (a[u] = i[e][u](a[e]));
        return !0
    }, a.prototype.setSpace = function (e, t)
    {
        var n = t[0];
        return void 0 === n ? this.getValues(e) : ("number" == typeof n && (n = Array.prototype.slice.call(t)), this.setValues(e, n), this)
    }, a.prototype.setChannel = function (e, t, n)
    {
        var i = this.values[e];
        return void 0 === n ? i[t] : n === i[t] ? this : (i[t] = n, this.setValues(e, i), this)
    }, "undefined" != typeof window && (window.Color = a), e.exports = a
},
function (e, t, n)
{
    "use strict";
    var i = n(6);
    t = e.exports = i.extend(
    {
        chart: null,
        currentStep: 0,
        numSteps: 60,
        easing: "",
        render: null,
        onAnimationProgress: null,
        onAnimationComplete: null
    });
    Object.defineProperty(t.prototype, "animationObject",
    {
        get: function ()
        {
            return this
        }
    }), Object.defineProperty(t.prototype, "chartInstance",
    {
        get: function ()
        {
            return this.chart
        },
        set: function (e)
        {
            this.chart = e
        }
    })
},
function (e, t, n)
{
    "use strict";
    var i = n(3),
        r = n(2);
    i._set("global",
    {
        animation:
        {
            duration: 1e3,
            easing: "easeOutQuart",
            onProgress: r.noop,
            onComplete: r.noop
        }
    }), e.exports = {
        frameDuration: 17,
        animations: [],
        dropFrames: 0,
        request: null,
        addAnimation: function (e, t, n, i)
        {
            var r, a, o = this.animations;
            for (t.chart = e, i || (e.animating = !0), r = 0, a = o.length; r < a; ++r)
                if (o[r].chart === e) return void(o[r] = t);
            o.push(t), 1 === o.length && this.requestAnimationFrame()
        },
        cancelAnimation: function (e)
        {
            var t = r.findIndex(this.animations, function (t)
            {
                return t.chart === e
            }); - 1 !== t && (this.animations.splice(t, 1), e.animating = !1)
        },
        requestAnimationFrame: function ()
        {
            var e = this;
            null === e.request && (e.request = r.requestAnimFrame.call(window, function ()
            {
                e.request = null, e.startDigest()
            }))
        },
        startDigest: function ()
        {
            var e = this,
                t = Date.now(),
                n = 0;
            e.dropFrames > 1 && (n = Math.floor(e.dropFrames), e.dropFrames = e.dropFrames % 1), e.advance(1 + n);
            var i = Date.now();
            e.dropFrames += (i - t) / e.frameDuration, e.animations.length > 0 && e.requestAnimationFrame()
        },
        advance: function (e)
        {
            for (var t, n, i = this.animations, a = 0; a < i.length;) n = (t = i[a]).chart, t.currentStep = (t.currentStep || 0) + e, t.currentStep = Math.min(t.currentStep, t.numSteps), r.callback(t.render, [n, t], n), r.callback(t.onAnimationProgress, [t], n), t.currentStep >= t.numSteps ? (r.callback(t.onAnimationComplete, [t], n), n.animating = !1, i.splice(a, 1)) : ++a
        }
    }
},
function (e, t, n)
{
    "use strict";
    var i = n(2);

    function r(e, t)
    {
        return e.native ?
        {
            x: e.x,
            y: e.y
        } : i.getRelativePosition(e, t)
    }

    function a(e, t)
    {
        var n, i, r, a, o;
        for (i = 0, a = e.data.datasets.length; i < a; ++i)
            if (e.isDatasetVisible(i))
                for (r = 0, o = (n = e.getDatasetMeta(i)).data.length; r < o; ++r)
                {
                    var l = n.data[r];
                    l._view.skip || t(l)
                }
    }

    function o(e, t)
    {
        var n = [];
        return a(e, function (e)
        {
            e.inRange(t.x, t.y) && n.push(e)
        }), n
    }

    function l(e, t, n, i)
    {
        var r = Number.POSITIVE_INFINITY,
            o = [];
        return a(e, function (e)
        {
            if (!n || e.inRange(t.x, t.y))
            {
                var a = e.getCenterPoint(),
                    l = i(t, a);
                l < r ? (o = [e], r = l) : l === r && o.push(e)
            }
        }), o
    }

    function s(e)
    {
        var t = -1 !== e.indexOf("x"),
            n = -1 !== e.indexOf("y");
        return function (e, i)
        {
            var r = t ? Math.abs(e.x - i.x) : 0,
                a = n ? Math.abs(e.y - i.y) : 0;
            return Math.sqrt(Math.pow(r, 2) + Math.pow(a, 2))
        }
    }

    function d(e, t, n)
    {
        var i = r(t, e);
        n.axis = n.axis || "x";
        var a = s(n.axis),
            d = n.intersect ? o(e, i) : l(e, i, !1, a),
            u = [];
        return d.length ? (e.data.datasets.forEach(function (t, n)
        {
            if (e.isDatasetVisible(n))
            {
                var i = e.getDatasetMeta(n).data[d[0]._index];
                i && !i._view.skip && u.push(i)
            }
        }), u) : []
    }
    e.exports = {
        modes:
        {
            single: function (e, t)
            {
                var n = r(t, e),
                    i = [];
                return a(e, function (e)
                {
                    if (e.inRange(n.x, n.y)) return i.push(e), i
                }), i.slice(0, 1)
            },
            label: d,
            index: d,
            dataset: function (e, t, n)
            {
                var i = r(t, e);
                n.axis = n.axis || "xy";
                var a = s(n.axis),
                    d = n.intersect ? o(e, i) : l(e, i, !1, a);
                return d.length > 0 && (d = e.getDatasetMeta(d[0]._datasetIndex).data), d
            },
            "x-axis": function (e, t)
            {
                return d(e, t,
                {
                    intersect: !1
                })
            },
            point: function (e, t)
            {
                return o(e, r(t, e))
            },
            nearest: function (e, t, n)
            {
                var i = r(t, e);
                n.axis = n.axis || "xy";
                var a = s(n.axis),
                    o = l(e, i, n.intersect, a);
                return o.length > 1 && o.sort(function (e, t)
                {
                    var n = e.getArea() - t.getArea();
                    return 0 === n && (n = e._datasetIndex - t._datasetIndex), n
                }), o.slice(0, 1)
            },
            x: function (e, t, n)
            {
                var i = r(t, e),
                    o = [],
                    l = !1;
                return a(e, function (e)
                {
                    e.inXRange(i.x) && o.push(e), e.inRange(i.x, i.y) && (l = !0)
                }), n.intersect && !l && (o = []), o
            },
            y: function (e, t, n)
            {
                var i = r(t, e),
                    o = [],
                    l = !1;
                return a(e, function (e)
                {
                    e.inYRange(i.y) && o.push(e), e.inRange(i.x, i.y) && (l = !0)
                }), n.intersect && !l && (o = []), o
            }
        }
    }
},
function (e, t, n)
{
    "use strict";
    var i = n(2),
        r = n(177),
        a = n(178),
        o = a._enabled ? a : r;
    e.exports = i.extend(
    {
        initialize: function () {},
        acquireContext: function () {},
        releaseContext: function () {},
        addEventListener: function () {},
        removeEventListener: function () {}
    }, o)
},
function (e, t, n)
{
    "use strict";
    var i = n(3),
        r = n(2);
    i._set("global",
    {
        plugins:
        {}
    }), e.exports = {
        _plugins: [],
        _cacheId: 0,
        register: function (e)
        {
            var t = this._plugins;
            [].concat(e).forEach(function (e)
            {
                -1 === t.indexOf(e) && t.push(e)
            }), this._cacheId++
        },
        unregister: function (e)
        {
            var t = this._plugins;
            [].concat(e).forEach(function (e)
            {
                var n = t.indexOf(e); - 1 !== n && t.splice(n, 1)
            }), this._cacheId++
        },
        clear: function ()
        {
            this._plugins = [], this._cacheId++
        },
        count: function ()
        {
            return this._plugins.length
        },
        getAll: function ()
        {
            return this._plugins
        },
        notify: function (e, t, n)
        {
            var i, r, a, o, l, s = this.descriptors(e),
                d = s.length;
            for (i = 0; i < d; ++i)
                if ("function" == typeof (l = (a = (r = s[i]).plugin)[t]) && ((o = [e].concat(n || [])).push(r.options), !1 === l.apply(a, o))) return !1;
            return !0
        },
        descriptors: function (e)
        {
            var t = e.$plugins || (e.$plugins = {});
            if (t.id === this._cacheId) return t.descriptors;
            var n = [],
                a = [],
                o = e && e.config ||
                {},
                l = o.options && o.options.plugins ||
                {};
            return this._plugins.concat(o.plugins || []).forEach(function (e)
            {
                if (-1 === n.indexOf(e))
                {
                    var t = e.id,
                        o = l[t];
                    !1 !== o && (!0 === o && (o = r.clone(i.global.plugins[t])), n.push(e), a.push(
                    {
                        plugin: e,
                        options: o ||
                        {}
                    }))
                }
            }), t.descriptors = a, t.id = this._cacheId, a
        },
        _invalidate: function (e)
        {
            delete e.$plugins
        }
    }
},
function (e, t, n)
{
    "use strict";
    var i = n(3),
        r = n(6),
        a = n(2);
    i._set("global",
    {
        tooltips:
        {
            enabled: !0,
            custom: null,
            mode: "nearest",
            position: "average",
            intersect: !0,
            backgroundColor: "rgba(0,0,0,0.8)",
            titleFontStyle: "bold",
            titleSpacing: 2,
            titleMarginBottom: 6,
            titleFontColor: "#fff",
            titleAlign: "left",
            bodySpacing: 2,
            bodyFontColor: "#fff",
            bodyAlign: "left",
            footerFontStyle: "bold",
            footerSpacing: 2,
            footerMarginTop: 6,
            footerFontColor: "#fff",
            footerAlign: "left",
            yPadding: 6,
            xPadding: 6,
            caretPadding: 2,
            caretSize: 5,
            cornerRadius: 6,
            multiKeyBackground: "#fff",
            displayColors: !0,
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            callbacks:
            {
                beforeTitle: a.noop,
                title: function (e, t)
                {
                    var n = "",
                        i = t.labels,
                        r = i ? i.length : 0;
                    if (e.length > 0)
                    {
                        var a = e[0];
                        a.xLabel ? n = a.xLabel : r > 0 && a.index < r && (n = i[a.index])
                    }
                    return n
                },
                afterTitle: a.noop,
                beforeBody: a.noop,
                beforeLabel: a.noop,
                label: function (e, t)
                {
                    var n = t.datasets[e.datasetIndex].label || "";
                    return n && (n += ": "), n += e.yLabel
                },
                labelColor: function (e, t)
                {
                    var n = t.getDatasetMeta(e.datasetIndex).data[e.index]._view;
                    return {
                        borderColor: n.borderColor,
                        backgroundColor: n.backgroundColor
                    }
                },
                labelTextColor: function ()
                {
                    return this._options.bodyFontColor
                },
                afterLabel: a.noop,
                afterBody: a.noop,
                beforeFooter: a.noop,
                footer: a.noop,
                afterFooter: a.noop
            }
        }
    });
    var o = {
        average: function (e)
        {
            if (!e.length) return !1;
            var t, n, i = 0,
                r = 0,
                a = 0;
            for (t = 0, n = e.length; t < n; ++t)
            {
                var o = e[t];
                if (o && o.hasValue())
                {
                    var l = o.tooltipPosition();
                    i += l.x, r += l.y, ++a
                }
            }
            return {
                x: Math.round(i / a),
                y: Math.round(r / a)
            }
        },
        nearest: function (e, t)
        {
            var n, i, r, o = t.x,
                l = t.y,
                s = Number.POSITIVE_INFINITY;
            for (n = 0, i = e.length; n < i; ++n)
            {
                var d = e[n];
                if (d && d.hasValue())
                {
                    var u = d.getCenterPoint(),
                        c = a.distanceBetweenPoints(t, u);
                    c < s && (s = c, r = d)
                }
            }
            if (r)
            {
                var h = r.tooltipPosition();
                o = h.x, l = h.y
            }
            return {
                x: o,
                y: l
            }
        }
    };

    function l(e, t)
    {
        var n = a.color(e);
        return n.alpha(t * n.alpha()).rgbaString()
    }

    function s(e, t)
    {
        return t && (a.isArray(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e
    }

    function d(e)
    {
        return ("string" == typeof e || e instanceof String) && e.indexOf("\n") > -1 ? e.split("\n") : e
    }

    function u(e)
    {
        var t = i.global,
            n = a.valueOrDefault;
        return {
            xPadding: e.xPadding,
            yPadding: e.yPadding,
            xAlign: e.xAlign,
            yAlign: e.yAlign,
            bodyFontColor: e.bodyFontColor,
            _bodyFontFamily: n(e.bodyFontFamily, t.defaultFontFamily),
            _bodyFontStyle: n(e.bodyFontStyle, t.defaultFontStyle),
            _bodyAlign: e.bodyAlign,
            bodyFontSize: n(e.bodyFontSize, t.defaultFontSize),
            bodySpacing: e.bodySpacing,
            titleFontColor: e.titleFontColor,
            _titleFontFamily: n(e.titleFontFamily, t.defaultFontFamily),
            _titleFontStyle: n(e.titleFontStyle, t.defaultFontStyle),
            titleFontSize: n(e.titleFontSize, t.defaultFontSize),
            _titleAlign: e.titleAlign,
            titleSpacing: e.titleSpacing,
            titleMarginBottom: e.titleMarginBottom,
            footerFontColor: e.footerFontColor,
            _footerFontFamily: n(e.footerFontFamily, t.defaultFontFamily),
            _footerFontStyle: n(e.footerFontStyle, t.defaultFontStyle),
            footerFontSize: n(e.footerFontSize, t.defaultFontSize),
            _footerAlign: e.footerAlign,
            footerSpacing: e.footerSpacing,
            footerMarginTop: e.footerMarginTop,
            caretSize: e.caretSize,
            cornerRadius: e.cornerRadius,
            backgroundColor: e.backgroundColor,
            opacity: 0,
            legendColorBackground: e.multiKeyBackground,
            displayColors: e.displayColors,
            borderColor: e.borderColor,
            borderWidth: e.borderWidth
        }
    }

    function c(e)
    {
        return s([], d(e))
    }(e.exports = r.extend(
    {
        initialize: function ()
        {
            this._model = u(this._options), this._lastActive = []
        },
        getTitle: function ()
        {
            var e = this._options.callbacks,
                t = e.beforeTitle.apply(this, arguments),
                n = e.title.apply(this, arguments),
                i = e.afterTitle.apply(this, arguments),
                r = [];
            return r = s(r, d(t)), r = s(r, d(n)), r = s(r, d(i))
        },
        getBeforeBody: function ()
        {
            return c(this._options.callbacks.beforeBody.apply(this, arguments))
        },
        getBody: function (e, t)
        {
            var n = this,
                i = n._options.callbacks,
                r = [];
            return a.each(e, function (e)
            {
                var a = {
                    before: [],
                    lines: [],
                    after: []
                };
                s(a.before, d(i.beforeLabel.call(n, e, t))), s(a.lines, i.label.call(n, e, t)), s(a.after, d(i.afterLabel.call(n, e, t))), r.push(a)
            }), r
        },
        getAfterBody: function ()
        {
            return c(this._options.callbacks.afterBody.apply(this, arguments))
        },
        getFooter: function ()
        {
            var e = this._options.callbacks,
                t = e.beforeFooter.apply(this, arguments),
                n = e.footer.apply(this, arguments),
                i = e.afterFooter.apply(this, arguments),
                r = [];
            return r = s(r, d(t)), r = s(r, d(n)), r = s(r, d(i))
        },
        update: function (e)
        {
            var t, n, i, r, l, s, d, c = this,
                h = c._options,
                p = c._model,
                f = c._model = u(h),
                m = c._active,
                g = c._data,
                _ = {
                    xAlign: p.xAlign,
                    yAlign: p.yAlign
                },
                y = {
                    x: p.x,
                    y: p.y
                },
                v = {
                    width: p.width,
                    height: p.height
                },
                M = {
                    x: p.caretX,
                    y: p.caretY
                };
            if (m.length)
            {
                f.opacity = 1;
                var b = [],
                    w = [];
                M = o[h.position].call(c, m, c._eventPosition);
                var L = [];
                for (t = 0, n = m.length; t < n; ++t) L.push((i = m[t], r = void 0, l = void 0, s = void 0, d = void 0, r = i._xScale, l = i._yScale || i._scale, s = i._index, d = i._datasetIndex,
                {
                    xLabel: r ? r.getLabelForIndex(s, d) : "",
                    yLabel: l ? l.getLabelForIndex(s, d) : "",
                    index: s,
                    datasetIndex: d,
                    x: i._model.x,
                    y: i._model.y
                }));
                h.filter && (L = L.filter(function (e)
                {
                    return h.filter(e, g)
                })), h.itemSort && (L = L.sort(function (e, t)
                {
                    return h.itemSort(e, t, g)
                })), a.each(L, function (e)
                {
                    b.push(h.callbacks.labelColor.call(c, e, c._chart)), w.push(h.callbacks.labelTextColor.call(c, e, c._chart))
                }), f.title = c.getTitle(L, g), f.beforeBody = c.getBeforeBody(L, g), f.body = c.getBody(L, g), f.afterBody = c.getAfterBody(L, g), f.footer = c.getFooter(L, g), f.x = Math.round(M.x), f.y = Math.round(M.y), f.caretPadding = h.caretPadding, f.labelColors = b, f.labelTextColors = w, f.dataPoints = L, v = function (e, t)
                {
                    var n = e._chart.ctx,
                        i = 2 * t.yPadding,
                        r = 0,
                        o = t.body,
                        l = o.reduce(function (e, t)
                        {
                            return e + t.before.length + t.lines.length + t.after.length
                        }, 0);
                    l += t.beforeBody.length + t.afterBody.length;
                    var s = t.title.length,
                        d = t.footer.length,
                        u = t.titleFontSize,
                        c = t.bodyFontSize,
                        h = t.footerFontSize;
                    i += s * u, i += s ? (s - 1) * t.titleSpacing : 0, i += s ? t.titleMarginBottom : 0, i += l * c, i += l ? (l - 1) * t.bodySpacing : 0, i += d ? t.footerMarginTop : 0, i += d * h, i += d ? (d - 1) * t.footerSpacing : 0;
                    var p = 0,
                        f = function (e)
                        {
                            r = Math.max(r, n.measureText(e).width + p)
                        };
                    return n.font = a.fontString(u, t._titleFontStyle, t._titleFontFamily), a.each(t.title, f), n.font = a.fontString(c, t._bodyFontStyle, t._bodyFontFamily), a.each(t.beforeBody.concat(t.afterBody), f), p = t.displayColors ? c + 2 : 0, a.each(o, function (e)
                    {
                        a.each(e.before, f), a.each(e.lines, f), a.each(e.after, f)
                    }), p = 0, n.font = a.fontString(h, t._footerFontStyle, t._footerFontFamily), a.each(t.footer, f),
                    {
                        width: r += 2 * t.xPadding,
                        height: i
                    }
                }(this, f), y = function (e, t, n, i)
                {
                    var r = e.x,
                        a = e.y,
                        o = e.caretSize,
                        l = e.caretPadding,
                        s = e.cornerRadius,
                        d = n.xAlign,
                        u = n.yAlign,
                        c = o + l,
                        h = s + l;
                    return "right" === d ? r -= t.width : "center" === d && ((r -= t.width / 2) + t.width > i.width && (r = i.width - t.width), r < 0 && (r = 0)), "top" === u ? a += c : a -= "bottom" === u ? t.height + c : t.height / 2, "center" === u ? "left" === d ? r += c : "right" === d && (r -= c) : "left" === d ? r -= h : "right" === d && (r += h),
                    {
                        x: r,
                        y: a
                    }
                }(f, v, _ = function (e, t)
                {
                    var n, i, r, a, o, l = e._model,
                        s = e._chart,
                        d = e._chart.chartArea,
                        u = "center",
                        c = "center";
                    l.y < t.height ? c = "top" : l.y > s.height - t.height && (c = "bottom");
                    var h = (d.left + d.right) / 2,
                        p = (d.top + d.bottom) / 2;
                    "center" === c ? (n = function (e)
                    {
                        return e <= h
                    }, i = function (e)
                    {
                        return e > h
                    }) : (n = function (e)
                    {
                        return e <= t.width / 2
                    }, i = function (e)
                    {
                        return e >= s.width - t.width / 2
                    }), r = function (e)
                    {
                        return e + t.width + l.caretSize + l.caretPadding > s.width
                    }, a = function (e)
                    {
                        return e - t.width - l.caretSize - l.caretPadding < 0
                    }, o = function (e)
                    {
                        return e <= p ? "top" : "bottom"
                    }, n(l.x) ? (u = "left", r(l.x) && (u = "center", c = o(l.y))) : i(l.x) && (u = "right", a(l.x) && (u = "center", c = o(l.y)));
                    var f = e._options;
                    return {
                        xAlign: f.xAlign ? f.xAlign : u,
                        yAlign: f.yAlign ? f.yAlign : c
                    }
                }(this, v), c._chart)
            }
            else f.opacity = 0;
            return f.xAlign = _.xAlign, f.yAlign = _.yAlign, f.x = y.x, f.y = y.y, f.width = v.width, f.height = v.height, f.caretX = M.x, f.caretY = M.y, c._model = f, e && h.custom && h.custom.call(c, f), c
        },
        drawCaret: function (e, t)
        {
            var n = this._chart.ctx,
                i = this._view,
                r = this.getCaretPosition(e, t, i);
            n.lineTo(r.x1, r.y1), n.lineTo(r.x2, r.y2), n.lineTo(r.x3, r.y3)
        },
        getCaretPosition: function (e, t, n)
        {
            var i, r, a, o, l, s, d = n.caretSize,
                u = n.cornerRadius,
                c = n.xAlign,
                h = n.yAlign,
                p = e.x,
                f = e.y,
                m = t.width,
                g = t.height;
            if ("center" === h) l = f + g / 2, "left" === c ? (r = (i = p) - d, a = i, o = l + d, s = l - d) : (r = (i = p + m) + d, a = i, o = l - d, s = l + d);
            else if ("left" === c ? (i = (r = p + u + d) - d, a = r + d) : "right" === c ? (i = (r = p + m - u - d) - d, a = r + d) : (i = (r = n.caretX) - d, a = r + d), "top" === h) l = (o = f) - d, s = o;
            else
            {
                l = (o = f + g) + d, s = o;
                var _ = a;
                a = i, i = _
            }
            return {
                x1: i,
                x2: r,
                x3: a,
                y1: o,
                y2: l,
                y3: s
            }
        },
        drawTitle: function (e, t, n, i)
        {
            var r = t.title;
            if (r.length)
            {
                n.textAlign = t._titleAlign, n.textBaseline = "top";
                var o, s, d = t.titleFontSize,
                    u = t.titleSpacing;
                for (n.fillStyle = l(t.titleFontColor, i), n.font = a.fontString(d, t._titleFontStyle, t._titleFontFamily), o = 0, s = r.length; o < s; ++o) n.fillText(r[o], e.x, e.y), e.y += d + u, o + 1 === r.length && (e.y += t.titleMarginBottom - u)
            }
        },
        drawBody: function (e, t, n, i)
        {
            var r = t.bodyFontSize,
                o = t.bodySpacing,
                s = t.body;
            n.textAlign = t._bodyAlign, n.textBaseline = "top", n.font = a.fontString(r, t._bodyFontStyle, t._bodyFontFamily);
            var d = 0,
                u = function (t)
                {
                    n.fillText(t, e.x + d, e.y), e.y += r + o
                };
            n.fillStyle = l(t.bodyFontColor, i), a.each(t.beforeBody, u);
            var c = t.displayColors;
            d = c ? r + 2 : 0, a.each(s, function (o, s)
            {
                var d = l(t.labelTextColors[s], i);
                n.fillStyle = d, a.each(o.before, u), a.each(o.lines, function (a)
                {
                    c && (n.fillStyle = l(t.legendColorBackground, i), n.fillRect(e.x, e.y, r, r), n.lineWidth = 1, n.strokeStyle = l(t.labelColors[s].borderColor, i), n.strokeRect(e.x, e.y, r, r), n.fillStyle = l(t.labelColors[s].backgroundColor, i), n.fillRect(e.x + 1, e.y + 1, r - 2, r - 2), n.fillStyle = d), u(a)
                }), a.each(o.after, u)
            }), d = 0, a.each(t.afterBody, u), e.y -= o
        },
        drawFooter: function (e, t, n, i)
        {
            var r = t.footer;
            r.length && (e.y += t.footerMarginTop, n.textAlign = t._footerAlign, n.textBaseline = "top", n.fillStyle = l(t.footerFontColor, i), n.font = a.fontString(t.footerFontSize, t._footerFontStyle, t._footerFontFamily), a.each(r, function (i)
            {
                n.fillText(i, e.x, e.y), e.y += t.footerFontSize + t.footerSpacing
            }))
        },
        drawBackground: function (e, t, n, i, r)
        {
            n.fillStyle = l(t.backgroundColor, r), n.strokeStyle = l(t.borderColor, r), n.lineWidth = t.borderWidth;
            var a = t.xAlign,
                o = t.yAlign,
                s = e.x,
                d = e.y,
                u = i.width,
                c = i.height,
                h = t.cornerRadius;
            n.beginPath(), n.moveTo(s + h, d), "top" === o && this.drawCaret(e, i), n.lineTo(s + u - h, d), n.quadraticCurveTo(s + u, d, s + u, d + h), "center" === o && "right" === a && this.drawCaret(e, i), n.lineTo(s + u, d + c - h), n.quadraticCurveTo(s + u, d + c, s + u - h, d + c), "bottom" === o && this.drawCaret(e, i), n.lineTo(s + h, d + c), n.quadraticCurveTo(s, d + c, s, d + c - h), "center" === o && "left" === a && this.drawCaret(e, i), n.lineTo(s, d + h), n.quadraticCurveTo(s, d, s + h, d), n.closePath(), n.fill(), t.borderWidth > 0 && n.stroke()
        },
        draw: function ()
        {
            var e = this._chart.ctx,
                t = this._view;
            if (0 !== t.opacity)
            {
                var n = {
                        width: t.width,
                        height: t.height
                    },
                    i = {
                        x: t.x,
                        y: t.y
                    },
                    r = Math.abs(t.opacity < .001) ? 0 : t.opacity,
                    a = t.title.length || t.beforeBody.length || t.body.length || t.afterBody.length || t.footer.length;
                this._options.enabled && a && (this.drawBackground(i, t, e, n, r), i.x += t.xPadding, i.y += t.yPadding, this.drawTitle(i, t, e, r), this.drawBody(i, t, e, r), this.drawFooter(i, t, e, r))
            }
        },
        handleEvent: function (e)
        {
            var t, n = this,
                i = n._options;
            return n._lastActive = n._lastActive || [], "mouseout" === e.type ? n._active = [] : n._active = n._chart.getElementsAtEventForMode(e, i.mode, i), (t = !a.arrayEquals(n._active, n._lastActive)) && (n._lastActive = n._active, (i.enabled || i.custom) && (n._eventPosition = {
                x: e.x,
                y: e.y
            }, n.update(!0), n.pivot())), t
        }
    })).positioners = o
},
function (t, n, i)
{
    "use strict";
    (function (n)
    {
        var i, r, a, o, l, s, d, u, c;
        t.exports = (a = function (e, t)
        {
            var n;
            if (e === t) return e;
            for (n in t) void 0 !== t[n] && (e[n] = t[n]);
            return e
        }, o = function (e, t)
        {
            var n, i = Array.prototype.slice.call(arguments, 2),
                r = [],
                a = e.length;
            if (Array.prototype.map && e.map === Array.prototype.map) r = Array.prototype.map.call(e, function (e)
            {
                var n = i.slice(0);
                return n.splice(0, 0, e), t.apply(this, n)
            });
            else
                for (n = 0; n < a; n++) callback_params = i, callback_params.splice(0, 0, e[n]), r.push(t.apply(this, callback_params));
            return r
        }, l = function (e)
        {
            var t, n = [];
            for (t = 0; t < e.length; t++) n = n.concat(e[t]);
            return n
        }, s = function (e, t)
        {
            var n = e[0],
                i = e[1];
            return t && (n = e[1], i = e[0]), new google.maps.LatLng(n, i)
        }, d = function (e, t)
        {
            var n;
            for (n = 0; n < e.length; n++) e[n] instanceof google.maps.LatLng || (e[n].length > 0 && "object" == typeof e[n][0] ? e[n] = d(e[n], t) : e[n] = s(e[n], t));
            return e
        }, u = function (e, t)
        {
            var e = e.replace("#", "");
            return "jQuery" in window && t ? n("#" + e, t)[0] : document.getElementById(e)
        }, (c = function (e)
        {
            var t = document,
                i = function (e)
                {
                    if ("object" != typeof window.google || !window.google.maps) return "object" == typeof window.console && window.console.error && console.error("Google Maps API is required. Please register the following JavaScript library https://maps.googleapis.com/maps/api/js."),
                        function () {};
                    if (!this) return new i(e);
                    e.zoom = e.zoom || 15, e.mapType = e.mapType || "roadmap";
                    var r, o = function (e, t)
                        {
                            return void 0 === e ? t : e
                        },
                        l = this,
                        s = ["bounds_changed", "center_changed", "click", "dblclick", "drag", "dragend", "dragstart", "idle", "maptypeid_changed", "projection_changed", "resize", "tilesloaded", "zoom_changed"],
                        d = ["mousemove", "mouseout", "mouseover"],
                        c = ["el", "lat", "lng", "mapType", "width", "height", "markerClusterer", "enableNewStyle"],
                        h = e.el || e.div,
                        p = e.markerClusterer,
                        f = google.maps.MapTypeId[e.mapType.toUpperCase()],
                        m = new google.maps.LatLng(e.lat, e.lng),
                        g = o(e.zoomControl, !0),
                        _ = e.zoomControlOpt ||
                        {
                            style: "DEFAULT",
                            position: "TOP_LEFT"
                        },
                        y = _.style || "DEFAULT",
                        v = _.position || "TOP_LEFT",
                        M = o(e.panControl, !0),
                        b = o(e.mapTypeControl, !0),
                        w = o(e.scaleControl, !0),
                        L = o(e.streetViewControl, !0),
                        D = o(D, !0),
                        T = {},
                        k = {
                            zoom: this.zoom,
                            center: m,
                            mapTypeId: f
                        },
                        S = {
                            panControl: M,
                            zoomControl: g,
                            zoomControlOptions:
                            {
                                style: google.maps.ZoomControlStyle[y],
                                position: google.maps.ControlPosition[v]
                            },
                            mapTypeControl: b,
                            scaleControl: w,
                            streetViewControl: L,
                            overviewMapControl: D
                        };
                    if ("string" == typeof e.el || "string" == typeof e.div ? h.indexOf("#") > -1 ? this.el = u(h, e.context) : this.el = function (e, t)
                        {
                            var i = e.replace(".", "");
                            return "jQuery" in this && t ? n("." + i, t)[0] : document.getElementsByClassName(i)[0]
                        }.apply(this, [h, e.context]) : this.el = h, void 0 === this.el || null === this.el) throw "No element defined.";
                    for (window.context_menu = window.context_menu ||
                        {}, window.context_menu[l.el.id] = {}, this.controls = [], this.overlays = [], this.layers = [], this.singleLayers = {}, this.markers = [], this.polylines = [], this.routes = [], this.polygons = [], this.infoWindow = null, this.overlay_el = null, this.zoom = e.zoom, this.registered_events = {}, this.el.style.width = e.width || this.el.scrollWidth || this.el.offsetWidth, this.el.style.height = e.height || this.el.scrollHeight || this.el.offsetHeight, google.maps.visualRefresh = e.enableNewStyle, r = 0; r < c.length; r++) delete e[c[r]];
                    for (1 != e.disableDefaultUI && (k = a(k, S)), T = a(k, e), r = 0; r < s.length; r++) delete T[s[r]];
                    for (r = 0; r < d.length; r++) delete T[d[r]];
                    this.map = new google.maps.Map(this.el, T), p && (this.markerClusterer = p.apply(this, [this.map]));
                    var x = function (e, t)
                    {
                        var n = "",
                            i = window.context_menu[l.el.id][e];
                        for (var r in i)
                            if (i.hasOwnProperty(r))
                            {
                                var a = i[r];
                                n += '<li><a id="' + e + "_" + r + '" href="#">' + a.title + "</a></li>"
                            } if (u("gmaps_context_menu"))
                        {
                            var o = u("gmaps_context_menu");
                            o.innerHTML = n;
                            var s = o.getElementsByTagName("a"),
                                d = s.length;
                            for (r = 0; r < d; r++)
                            {
                                var c = s[r];
                                google.maps.event.clearListeners(c, "click"), google.maps.event.addDomListenerOnce(c, "click", function (n)
                                {
                                    n.preventDefault(), i[this.id.replace(e + "_", "")].action.apply(l, [t]), l.hideContextMenu()
                                }, !1)
                            }
                            var h = function (e)
                                {
                                    var t = 0,
                                        n = 0;
                                    if (e.offsetParent)
                                        do {
                                            t += e.offsetLeft, n += e.offsetTop
                                        } while (e = e.offsetParent);
                                    return [t, n]
                                }.apply(this, [l.el]),
                                p = h[0] + t.pixel.x - 15,
                                f = h[1] + t.pixel.y - 15;
                            o.style.left = p + "px", o.style.top = f + "px"
                        }
                    };
                    this.buildContextMenu = function (e, t)
                    {
                        if ("marker" === e)
                        {
                            t.pixel = {};
                            var n = new google.maps.OverlayView;
                            n.setMap(l.map), n.draw = function ()
                            {
                                var i = n.getProjection(),
                                    r = t.marker.getPosition();
                                t.pixel = i.fromLatLngToContainerPixel(r), x(e, t)
                            }
                        }
                        else x(e, t);
                        var i = u("gmaps_context_menu");
                        setTimeout(function ()
                        {
                            i.style.display = "block"
                        }, 0)
                    }, this.setContextMenu = function (e)
                    {
                        window.context_menu[l.el.id][e.control] = {};
                        var n, i = t.createElement("ul");
                        for (n in e.options)
                            if (e.options.hasOwnProperty(n))
                            {
                                var r = e.options[n];
                                window.context_menu[l.el.id][e.control][r.name] = {
                                    title: r.title,
                                    action: r.action
                                }
                            } i.id = "gmaps_context_menu", i.style.display = "none", i.style.position = "absolute", i.style.minWidth = "100px", i.style.background = "white", i.style.listStyle = "none", i.style.padding = "8px", i.style.boxShadow = "2px 2px 6px #ccc", u("gmaps_context_menu") || t.body.appendChild(i);
                        var a = u("gmaps_context_menu");
                        google.maps.event.addDomListener(a, "mouseout", function (e)
                        {
                            e.relatedTarget && this.contains(e.relatedTarget) || window.setTimeout(function ()
                            {
                                a.style.display = "none"
                            }, 400)
                        }, !1)
                    }, this.hideContextMenu = function ()
                    {
                        var e = u("gmaps_context_menu");
                        e && (e.style.display = "none")
                    };
                    var Y = function (t, n)
                    {
                        google.maps.event.addListener(t, n, function (t)
                        {
                            null == t && (t = this), e[n].apply(this, [t]), l.hideContextMenu()
                        })
                    };
                    google.maps.event.addListener(this.map, "zoom_changed", this.hideContextMenu);
                    for (var E = 0; E < s.length; E++)
                    {
                        var C = s[E];
                        C in e && Y(this.map, C)
                    }
                    for (var E = 0; E < d.length; E++)
                    {
                        var C = d[E];
                        C in e && Y(this.map, C)
                    }
                    google.maps.event.addListener(this.map, "rightclick", function (t)
                    {
                        e.rightclick && e.rightclick.apply(this, [t]), null != window.context_menu[l.el.id].map && l.buildContextMenu("map", t)
                    }), this.refresh = function ()
                    {
                        google.maps.event.trigger(this.map, "resize")
                    }, this.fitZoom = function ()
                    {
                        var e, t = [],
                            n = this.markers.length;
                        for (e = 0; e < n; e++) "boolean" == typeof this.markers[e].visible && this.markers[e].visible && t.push(this.markers[e].getPosition());
                        this.fitLatLngBounds(t)
                    }, this.fitLatLngBounds = function (e)
                    {
                        var t, n = e.length,
                            i = new google.maps.LatLngBounds;
                        for (t = 0; t < n; t++) i.extend(e[t]);
                        this.map.fitBounds(i)
                    }, this.setCenter = function (e, t, n)
                    {
                        this.map.panTo(new google.maps.LatLng(e, t)), n && n()
                    }, this.getElement = function ()
                    {
                        return this.el
                    }, this.zoomIn = function (e)
                    {
                        e = e || 1, this.zoom = this.map.getZoom() + e, this.map.setZoom(this.zoom)
                    }, this.zoomOut = function (e)
                    {
                        e = e || 1, this.zoom = this.map.getZoom() - e, this.map.setZoom(this.zoom)
                    };
                    var H, P = [];
                    for (H in this.map) "function" != typeof this.map[H] || this[H] || P.push(H);
                    for (r = 0; r < P.length; r++) ! function (e, t, n)
                    {
                        e[n] = function ()
                        {
                            return t[n].apply(t, arguments)
                        }
                    }(this, this.map, P[r])
                };
            return i
        }()).prototype.createControl = function (e)
        {
            var t = document.createElement("div");
            for (var n in t.style.cursor = "pointer", !0 !== e.disableDefaultStyles && (t.style.fontFamily = "Roboto, Arial, sans-serif", t.style.fontSize = "11px", t.style.boxShadow = "rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px"), e.style) t.style[n] = e.style[n];
            for (var i in e.id && (t.id = e.id), e.title && (t.title = e.title), e.classes && (t.className = e.classes), e.content && ("string" == typeof e.content ? t.innerHTML = e.content : e.content instanceof HTMLElement && t.appendChild(e.content)), e.position && (t.position = google.maps.ControlPosition[e.position.toUpperCase()]), e.events) ! function (t, n)
            {
                google.maps.event.addDomListener(t, n, function ()
                {
                    e.events[n].apply(this, [this])
                })
            }(t, i);
            return t.index = 1, t
        }, c.prototype.addControl = function (e)
        {
            var t = this.createControl(e);
            return this.controls.push(t), this.map.controls[t.position].push(t), t
        }, c.prototype.removeControl = function (e)
        {
            var t, n = null;
            for (t = 0; t < this.controls.length; t++) this.controls[t] == e && (n = this.controls[t].position, this.controls.splice(t, 1));
            if (n)
                for (t = 0; t < this.map.controls.length; t++)
                {
                    var i = this.map.controls[e.position];
                    if (i.getAt(t) == e)
                    {
                        i.removeAt(t);
                        break
                    }
                }
            return e
        }, c.prototype.createMarker = function (e)
        {
            if (null == e.lat && null == e.lng && null == e.position) throw "No latitude or longitude defined.";
            var t = this,
                n = e.details,
                i = e.fences,
                r = e.outside,
                o = {
                    position: new google.maps.LatLng(e.lat, e.lng),
                    map: null
                },
                l = a(o, e);
            delete l.lat, delete l.lng, delete l.fences, delete l.outside;
            var s = new google.maps.Marker(l);
            if (s.fences = i, e.infoWindow)
            {
                s.infoWindow = new google.maps.InfoWindow(e.infoWindow);
                for (var d = ["closeclick", "content_changed", "domready", "position_changed", "zindex_changed"], u = 0; u < d.length; u++) ! function (t, n)
                {
                    e.infoWindow[n] && google.maps.event.addListener(t, n, function (t)
                    {
                        e.infoWindow[n].apply(this, [t])
                    })
                }(s.infoWindow, d[u])
            }
            var c = ["animation_changed", "clickable_changed", "cursor_changed", "draggable_changed", "flat_changed", "icon_changed", "position_changed", "shadow_changed", "shape_changed", "title_changed", "visible_changed", "zindex_changed"],
                h = ["dblclick", "drag", "dragend", "dragstart", "mousedown", "mouseout", "mouseover", "mouseup"];
            for (u = 0; u < c.length; u++) ! function (t, n)
            {
                e[n] && google.maps.event.addListener(t, n, function ()
                {
                    e[n].apply(this, [this])
                })
            }(s, c[u]);
            for (u = 0; u < h.length; u++) ! function (t, n, i)
            {
                e[i] && google.maps.event.addListener(n, i, function (n)
                {
                    n.pixel || (n.pixel = t.getProjection().fromLatLngToPoint(n.latLng)), e[i].apply(this, [n])
                })
            }(this.map, s, h[u]);
            return google.maps.event.addListener(s, "click", function ()
            {
                this.details = n, e.click && e.click.apply(this, [this]), s.infoWindow && (t.hideInfoWindows(), s.infoWindow.open(t.map, s))
            }), google.maps.event.addListener(s, "rightclick", function (n)
            {
                n.marker = this, e.rightclick && e.rightclick.apply(this, [n]), null != window.context_menu[t.el.id].marker && t.buildContextMenu("marker", n)
            }), s.fences && google.maps.event.addListener(s, "dragend", function ()
            {
                t.checkMarkerGeofence(s, function (e, t)
                {
                    r(e, t)
                })
            }), s
        }, c.prototype.addMarker = function (e)
        {
            var t;
            if (e.hasOwnProperty("gm_accessors_")) t = e;
            else
            {
                if (!(e.hasOwnProperty("lat") && e.hasOwnProperty("lng") || e.position)) throw "No latitude or longitude defined.";
                t = this.createMarker(e)
            }
            return t.setMap(this.map), this.markerClusterer && this.markerClusterer.addMarker(t), this.markers.push(t), c.fire("marker_added", t, this), t
        }, c.prototype.addMarkers = function (e)
        {
            for (var t, n = 0; t = e[n]; n++) this.addMarker(t);
            return this.markers
        }, c.prototype.hideInfoWindows = function ()
        {
            for (var e, t = 0; e = this.markers[t]; t++) e.infoWindow && e.infoWindow.close()
        }, c.prototype.removeMarker = function (e)
        {
            for (var t = 0; t < this.markers.length; t++)
                if (this.markers[t] === e)
                {
                    this.markers[t].setMap(null), this.markers.splice(t, 1), this.markerClusterer && this.markerClusterer.removeMarker(e), c.fire("marker_removed", e, this);
                    break
                } return e
        }, c.prototype.removeMarkers = function (e)
        {
            var t = [];
            if (void 0 === e)
            {
                for (var n = 0; n < this.markers.length; n++)(r = this.markers[n]).setMap(null), c.fire("marker_removed", r, this);
                this.markerClusterer && this.markerClusterer.clearMarkers && this.markerClusterer.clearMarkers(), this.markers = t
            }
            else
            {
                for (n = 0; n < e.length; n++)
                {
                    var i = this.markers.indexOf(e[n]);
                    i > -1 && ((r = this.markers[i]).setMap(null), this.markerClusterer && this.markerClusterer.removeMarker(r), c.fire("marker_removed", r, this))
                }
                for (n = 0; n < this.markers.length; n++)
                {
                    var r;
                    null != (r = this.markers[n]).getMap() && t.push(r)
                }
                this.markers = t
            }
        }, c.prototype.drawOverlay = function (e)
        {
            var t = new google.maps.OverlayView,
                n = !0;
            return t.setMap(this.map), null != e.auto_show && (n = e.auto_show), t.onAdd = function ()
            {
                var n = document.createElement("div");
                n.style.borderStyle = "none", n.style.borderWidth = "0px", n.style.position = "absolute", n.style.zIndex = 100, n.innerHTML = e.content, t.el = n, e.layer || (e.layer = "overlayLayer");
                var i, r, a = this.getPanes(),
                    o = ["contextmenu", "DOMMouseScroll", "dblclick", "mousedown"];
                a[e.layer].appendChild(n);
                for (var l = 0; l < o.length; l++) i = n, r = o[l], google.maps.event.addDomListener(i, r, function (e)
                {
                    -1 != navigator.userAgent.toLowerCase().indexOf("msie") && document.all ? (e.cancelBubble = !0, e.returnValue = !1) : e.stopPropagation()
                });
                e.click && (a.overlayMouseTarget.appendChild(t.el), google.maps.event.addDomListener(t.el, "click", function ()
                {
                    e.click.apply(t, [t])
                })), google.maps.event.trigger(this, "ready")
            }, t.draw = function ()
            {
                var i = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(e.lat, e.lng));
                e.horizontalOffset = e.horizontalOffset || 0, e.verticalOffset = e.verticalOffset || 0;
                var r = t.el,
                    a = r.children[0],
                    o = a.clientHeight,
                    l = a.clientWidth;
                switch (e.verticalAlign)
                {
                case "top":
                    r.style.top = i.y - o + e.verticalOffset + "px";
                    break;
                default:
                case "middle":
                    r.style.top = i.y - o / 2 + e.verticalOffset + "px";
                    break;
                case "bottom":
                    r.style.top = i.y + e.verticalOffset + "px"
                }
                switch (e.horizontalAlign)
                {
                case "left":
                    r.style.left = i.x - l + e.horizontalOffset + "px";
                    break;
                default:
                case "center":
                    r.style.left = i.x - l / 2 + e.horizontalOffset + "px";
                    break;
                case "right":
                    r.style.left = i.x + e.horizontalOffset + "px"
                }
                r.style.display = n ? "block" : "none", n || e.show.apply(this, [r])
            }, t.onRemove = function ()
            {
                var n = t.el;
                e.remove ? e.remove.apply(this, [n]) : (t.el.parentNode.removeChild(t.el), t.el = null)
            }, this.overlays.push(t), t
        }, c.prototype.removeOverlay = function (e)
        {
            for (var t = 0; t < this.overlays.length; t++)
                if (this.overlays[t] === e)
                {
                    this.overlays[t].setMap(null), this.overlays.splice(t, 1);
                    break
                }
        }, c.prototype.removeOverlays = function ()
        {
            for (var e, t = 0; e = this.overlays[t]; t++) e.setMap(null);
            this.overlays = []
        }, c.prototype.drawPolyline = function (e)
        {
            var t = [],
                n = e.path;
            if (n.length)
                if (void 0 === n[0][0]) t = n;
                else
                    for (var i, r = 0; i = n[r]; r++) t.push(new google.maps.LatLng(i[0], i[1]));
            var a = {
                map: this.map,
                path: t,
                strokeColor: e.strokeColor,
                strokeOpacity: e.strokeOpacity,
                strokeWeight: e.strokeWeight,
                geodesic: e.geodesic,
                clickable: !0,
                editable: !1,
                visible: !0
            };
            e.hasOwnProperty("clickable") && (a.clickable = e.clickable), e.hasOwnProperty("editable") && (a.editable = e.editable), e.hasOwnProperty("icons") && (a.icons = e.icons), e.hasOwnProperty("zIndex") && (a.zIndex = e.zIndex);
            for (var o = new google.maps.Polyline(a), l = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], s = 0; s < l.length; s++) ! function (t, n)
            {
                e[n] && google.maps.event.addListener(t, n, function (t)
                {
                    e[n].apply(this, [t])
                })
            }(o, l[s]);
            return this.polylines.push(o), c.fire("polyline_added", o, this), o
        }, c.prototype.removePolyline = function (e)
        {
            for (var t = 0; t < this.polylines.length; t++)
                if (this.polylines[t] === e)
                {
                    this.polylines[t].setMap(null), this.polylines.splice(t, 1), c.fire("polyline_removed", e, this);
                    break
                }
        }, c.prototype.removePolylines = function ()
        {
            for (var e, t = 0; e = this.polylines[t]; t++) e.setMap(null);
            this.polylines = []
        }, c.prototype.drawCircle = function (e)
        {
            delete(e = a(
            {
                map: this.map,
                center: new google.maps.LatLng(e.lat, e.lng)
            }, e)).lat, delete e.lng;
            for (var t = new google.maps.Circle(e), n = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], i = 0; i < n.length; i++) ! function (t, n)
            {
                e[n] && google.maps.event.addListener(t, n, function (t)
                {
                    e[n].apply(this, [t])
                })
            }(t, n[i]);
            return this.polygons.push(t), t
        }, c.prototype.drawRectangle = function (e)
        {
            e = a(
            {
                map: this.map
            }, e);
            var t = new google.maps.LatLngBounds(new google.maps.LatLng(e.bounds[0][0], e.bounds[0][1]), new google.maps.LatLng(e.bounds[1][0], e.bounds[1][1]));
            e.bounds = t;
            for (var n = new google.maps.Rectangle(e), i = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], r = 0; r < i.length; r++) ! function (t, n)
            {
                e[n] && google.maps.event.addListener(t, n, function (t)
                {
                    e[n].apply(this, [t])
                })
            }(n, i[r]);
            return this.polygons.push(n), n
        }, c.prototype.drawPolygon = function (e)
        {
            var t = !1;
            e.hasOwnProperty("useGeoJSON") && (t = e.useGeoJSON), delete e.useGeoJSON, e = a(
            {
                map: this.map
            }, e), 0 == t && (e.paths = [e.paths.slice(0)]), e.paths.length > 0 && e.paths[0].length > 0 && (e.paths = l(o(e.paths, d, t)));
            for (var n = new google.maps.Polygon(e), i = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], r = 0; r < i.length; r++) ! function (t, n)
            {
                e[n] && google.maps.event.addListener(t, n, function (t)
                {
                    e[n].apply(this, [t])
                })
            }(n, i[r]);
            return this.polygons.push(n), c.fire("polygon_added", n, this), n
        }, c.prototype.removePolygon = function (e)
        {
            for (var t = 0; t < this.polygons.length; t++)
                if (this.polygons[t] === e)
                {
                    this.polygons[t].setMap(null), this.polygons.splice(t, 1), c.fire("polygon_removed", e, this);
                    break
                }
        }, c.prototype.removePolygons = function ()
        {
            for (var e, t = 0; e = this.polygons[t]; t++) e.setMap(null);
            this.polygons = []
        }, c.prototype.getFromFusionTables = function (e)
        {
            var t = e.events;
            delete e.events;
            var n = e,
                i = new google.maps.FusionTablesLayer(n);
            for (var r in t) ! function (e, n)
            {
                google.maps.event.addListener(e, n, function (e)
                {
                    t[n].apply(this, [e])
                })
            }(i, r);
            return this.layers.push(i), i
        }, c.prototype.loadFromFusionTables = function (e)
        {
            var t = this.getFromFusionTables(e);
            return t.setMap(this.map), t
        }, c.prototype.getFromKML = function (e)
        {
            var t = e.url,
                n = e.events;
            delete e.url, delete e.events;
            var i = e,
                r = new google.maps.KmlLayer(t, i);
            for (var a in n) ! function (e, t)
            {
                google.maps.event.addListener(e, t, function (e)
                {
                    n[t].apply(this, [e])
                })
            }(r, a);
            return this.layers.push(r), r
        }, c.prototype.loadFromKML = function (e)
        {
            var t = this.getFromKML(e);
            return t.setMap(this.map), t
        }, c.prototype.addLayer = function (e, t)
        {
            var n;
            switch (t = t ||
            {}, e)
            {
            case "weather":
                this.singleLayers.weather = n = new google.maps.weather.WeatherLayer;
                break;
            case "clouds":
                this.singleLayers.clouds = n = new google.maps.weather.CloudLayer;
                break;
            case "traffic":
                this.singleLayers.traffic = n = new google.maps.TrafficLayer;
                break;
            case "transit":
                this.singleLayers.transit = n = new google.maps.TransitLayer;
                break;
            case "bicycling":
                this.singleLayers.bicycling = n = new google.maps.BicyclingLayer;
                break;
            case "panoramio":
                this.singleLayers.panoramio = n = new google.maps.panoramio.PanoramioLayer, n.setTag(t.filter), delete t.filter, t.click && google.maps.event.addListener(n, "click", function (e)
                {
                    t.click(e), delete t.click
                });
                break;
            case "places":
                if (this.singleLayers.places = n = new google.maps.places.PlacesService(this.map), t.search || t.nearbySearch || t.radarSearch)
                {
                    var i = {
                        bounds: t.bounds || null,
                        keyword: t.keyword || null,
                        location: t.location || null,
                        name: t.name || null,
                        radius: t.radius || null,
                        rankBy: t.rankBy || null,
                        types: t.types || null
                    };
                    t.radarSearch && n.radarSearch(i, t.radarSearch), t.search && n.search(i, t.search), t.nearbySearch && n.nearbySearch(i, t.nearbySearch)
                }
                if (t.textSearch)
                {
                    var r = {
                        bounds: t.bounds || null,
                        location: t.location || null,
                        query: t.query || null,
                        radius: t.radius || null
                    };
                    n.textSearch(r, t.textSearch)
                }
            }
            if (void 0 !== n) return "function" == typeof n.setOptions && n.setOptions(t), "function" == typeof n.setMap && n.setMap(this.map), n
        }, c.prototype.removeLayer = function (e)
        {
            if ("string" == typeof e && void 0 !== this.singleLayers[e]) this.singleLayers[e].setMap(null), delete this.singleLayers[e];
            else
                for (var t = 0; t < this.layers.length; t++)
                    if (this.layers[t] === e)
                    {
                        this.layers[t].setMap(null), this.layers.splice(t, 1);
                        break
                    }
        }, c.prototype.getRoutes = function (e)
        {
            switch (e.travelMode)
            {
            case "bicycling":
                i = google.maps.TravelMode.BICYCLING;
                break;
            case "transit":
                i = google.maps.TravelMode.TRANSIT;
                break;
            case "driving":
                i = google.maps.TravelMode.DRIVING;
                break;
            default:
                i = google.maps.TravelMode.WALKING
            }
            r = "imperial" === e.unitSystem ? google.maps.UnitSystem.IMPERIAL : google.maps.UnitSystem.METRIC;
            var t = a(
            {
                avoidHighways: !1,
                avoidTolls: !1,
                optimizeWaypoints: !1,
                waypoints: []
            }, e);
            t.origin = /string/.test(typeof e.origin) ? e.origin : new google.maps.LatLng(e.origin[0], e.origin[1]), t.destination = /string/.test(typeof e.destination) ? e.destination : new google.maps.LatLng(e.destination[0], e.destination[1]), t.travelMode = i, t.unitSystem = r, delete t.callback, delete t.error;
            var n = [];
            (new google.maps.DirectionsService).route(t, function (t, i)
            {
                if (i === google.maps.DirectionsStatus.OK)
                {
                    for (var r in t.routes) t.routes.hasOwnProperty(r) && n.push(t.routes[r]);
                    e.callback && e.callback(n, t, i)
                }
                else e.error && e.error(t, i)
            })
        }, c.prototype.removeRoutes = function ()
        {
            this.routes.length = 0
        }, c.prototype.getElevations = function (e)
        {
            (e = a(
            {
                locations: [],
                path: !1,
                samples: 256
            }, e)).locations.length > 0 && e.locations[0].length > 0 && (e.locations = l(o([e.locations], d, !1)));
            var t = e.callback;
            delete e.callback;
            var n = new google.maps.ElevationService;
            if (e.path)
            {
                var i = {
                    path: e.locations,
                    samples: e.samples
                };
                n.getElevationAlongPath(i, function (e, n)
                {
                    t && "function" == typeof t && t(e, n)
                })
            }
            else delete e.path, delete e.samples, n.getElevationForLocations(e, function (e, n)
            {
                t && "function" == typeof t && t(e, n)
            })
        }, c.prototype.cleanRoute = c.prototype.removePolylines, c.prototype.renderRoute = function (e, t)
        {
            var n, i = "string" == typeof t.panel ? document.getElementById(t.panel.replace("#", "")) : t.panel;
            t.panel = i, t = a(
            {
                map: this.map
            }, t), n = new google.maps.DirectionsRenderer(t), this.getRoutes(
            {
                origin: e.origin,
                destination: e.destination,
                travelMode: e.travelMode,
                waypoints: e.waypoints,
                unitSystem: e.unitSystem,
                error: e.error,
                avoidHighways: e.avoidHighways,
                avoidTolls: e.avoidTolls,
                optimizeWaypoints: e.optimizeWaypoints,
                callback: function (e, t, i)
                {
                    i === google.maps.DirectionsStatus.OK && n.setDirections(t)
                }
            })
        }, c.prototype.drawRoute = function (e)
        {
            var t = this;
            this.getRoutes(
            {
                origin: e.origin,
                destination: e.destination,
                travelMode: e.travelMode,
                waypoints: e.waypoints,
                unitSystem: e.unitSystem,
                error: e.error,
                avoidHighways: e.avoidHighways,
                avoidTolls: e.avoidTolls,
                optimizeWaypoints: e.optimizeWaypoints,
                callback: function (n)
                {
                    if (n.length > 0)
                    {
                        var i = {
                            path: n[n.length - 1].overview_path,
                            strokeColor: e.strokeColor,
                            strokeOpacity: e.strokeOpacity,
                            strokeWeight: e.strokeWeight
                        };
                        e.hasOwnProperty("icons") && (i.icons = e.icons), t.drawPolyline(i), e.callback && e.callback(n[n.length - 1])
                    }
                }
            })
        }, c.prototype.travelRoute = function (e)
        {
            if (e.origin && e.destination) this.getRoutes(
            {
                origin: e.origin,
                destination: e.destination,
                travelMode: e.travelMode,
                waypoints: e.waypoints,
                unitSystem: e.unitSystem,
                error: e.error,
                callback: function (t)
                {
                    if (t.length > 0 && e.start && e.start(t[t.length - 1]), t.length > 0 && e.step)
                    {
                        var n = t[t.length - 1];
                        if (n.legs.length > 0)
                            for (var i, r = n.legs[0].steps, a = 0; i = r[a]; a++) i.step_number = a, e.step(i, n.legs[0].steps.length - 1)
                    }
                    t.length > 0 && e.end && e.end(t[t.length - 1])
                }
            });
            else if (e.route && e.route.legs.length > 0)
                for (var t, n = e.route.legs[0].steps, i = 0; t = n[i]; i++) t.step_number = i, e.step(t)
        }, c.prototype.drawSteppedRoute = function (e)
        {
            var t = this;
            if (e.origin && e.destination) this.getRoutes(
            {
                origin: e.origin,
                destination: e.destination,
                travelMode: e.travelMode,
                waypoints: e.waypoints,
                error: e.error,
                callback: function (n)
                {
                    if (n.length > 0 && e.start && e.start(n[n.length - 1]), n.length > 0 && e.step)
                    {
                        var i = n[n.length - 1];
                        if (i.legs.length > 0)
                            for (var r, a = i.legs[0].steps, o = 0; r = a[o]; o++)
                            {
                                r.step_number = o;
                                var l = {
                                    path: r.path,
                                    strokeColor: e.strokeColor,
                                    strokeOpacity: e.strokeOpacity,
                                    strokeWeight: e.strokeWeight
                                };
                                e.hasOwnProperty("icons") && (l.icons = e.icons), t.drawPolyline(l), e.step(r, i.legs[0].steps.length - 1)
                            }
                    }
                    n.length > 0 && e.end && e.end(n[n.length - 1])
                }
            });
            else if (e.route && e.route.legs.length > 0)
                for (var n, i = e.route.legs[0].steps, r = 0; n = i[r]; r++)
                {
                    n.step_number = r;
                    var a = {
                        path: n.path,
                        strokeColor: e.strokeColor,
                        strokeOpacity: e.strokeOpacity,
                        strokeWeight: e.strokeWeight
                    };
                    e.hasOwnProperty("icons") && (a.icons = e.icons), t.drawPolyline(a), e.step(n)
                }
        }, c.Route = function (e)
        {
            this.origin = e.origin, this.destination = e.destination, this.waypoints = e.waypoints, this.map = e.map, this.route = e.route, this.step_count = 0, this.steps = this.route.legs[0].steps, this.steps_length = this.steps.length;
            var t = {
                path: new google.maps.MVCArray,
                strokeColor: e.strokeColor,
                strokeOpacity: e.strokeOpacity,
                strokeWeight: e.strokeWeight
            };
            e.hasOwnProperty("icons") && (t.icons = e.icons), this.polyline = this.map.drawPolyline(t).getPath()
        }, c.Route.prototype.getRoute = function (t)
        {
            var n = this;
            this.map.getRoutes(
            {
                origin: this.origin,
                destination: this.destination,
                travelMode: t.travelMode,
                waypoints: this.waypoints || [],
                error: t.error,
                callback: function ()
                {
                    n.route = e[0], t.callback && t.callback.call(n)
                }
            })
        }, c.Route.prototype.back = function ()
        {
            if (this.step_count > 0)
            {
                this.step_count--;
                var e = this.route.legs[0].steps[this.step_count].path;
                for (var t in e) e.hasOwnProperty(t) && this.polyline.pop()
            }
        }, c.Route.prototype.forward = function ()
        {
            if (this.step_count < this.steps_length)
            {
                var e = this.route.legs[0].steps[this.step_count].path;
                for (var t in e) e.hasOwnProperty(t) && this.polyline.push(e[t]);
                this.step_count++
            }
        }, c.prototype.checkGeofence = function (e, t, n)
        {
            return n.containsLatLng(new google.maps.LatLng(e, t))
        }, c.prototype.checkMarkerGeofence = function (e, t)
        {
            if (e.fences)
                for (var n, i = 0; n = e.fences[i]; i++)
                {
                    var r = e.getPosition();
                    this.checkGeofence(r.lat(), r.lng(), n) || t(e, n)
                }
        }, c.prototype.toImage = function (e)
        {
            e = e ||
            {};
            var t = {};
            if (t.size = e.size || [this.el.clientWidth, this.el.clientHeight], t.lat = this.getCenter().lat(), t.lng = this.getCenter().lng(), this.markers.length > 0)
            {
                t.markers = [];
                for (var n = 0; n < this.markers.length; n++) t.markers.push(
                {
                    lat: this.markers[n].getPosition().lat(),
                    lng: this.markers[n].getPosition().lng()
                })
            }
            if (this.polylines.length > 0)
            {
                var i = this.polylines[0];
                t.polyline = {}, t.polyline.path = google.maps.geometry.encoding.encodePath(i.getPath()), t.polyline.strokeColor = i.strokeColor, t.polyline.strokeOpacity = i.strokeOpacity, t.polyline.strokeWeight = i.strokeWeight
            }
            return c.staticMapURL(t)
        }, c.staticMapURL = function (e)
        {
            var t, n = [],
                i = ("file:" === location.protocol ? "http:" : location.protocol) + "//maps.googleapis.com/maps/api/staticmap";
            e.url && (i = e.url, delete e.url), i += "?";
            var r = e.markers;
            delete e.markers, !r && e.marker && (r = [e.marker], delete e.marker);
            var a = e.styles;
            delete e.styles;
            var o = e.polyline;
            if (delete e.polyline, e.center) n.push("center=" + e.center), delete e.center;
            else if (e.address) n.push("center=" + e.address), delete e.address;
            else if (e.lat) n.push(["center=", e.lat, ",", e.lng].join("")), delete e.lat, delete e.lng;
            else if (e.visible)
            {
                var l = encodeURI(e.visible.join("|"));
                n.push("visible=" + l)
            }
            var s = e.size;
            s ? (s.join && (s = s.join("x")), delete e.size) : s = "630x300", n.push("size=" + s), e.zoom || !1 === e.zoom || (e.zoom = 15);
            var d = !e.hasOwnProperty("sensor") || !!e.sensor;
            for (var u in delete e.sensor, n.push("sensor=" + d), e) e.hasOwnProperty(u) && n.push(u + "=" + e[u]);
            if (r)
                for (var c, h, p = 0; t = r[p]; p++)
                {
                    for (var u in c = [], t.size && "normal" !== t.size ? (c.push("size:" + t.size), delete t.size) : t.icon && (c.push("icon:" + encodeURI(t.icon)), delete t.icon), t.color && (c.push("color:" + t.color.replace("#", "0x")), delete t.color), t.label && (c.push("label:" + t.label[0].toUpperCase()), delete t.label), h = t.address ? t.address : t.lat + "," + t.lng, delete t.address, delete t.lat, delete t.lng, t) t.hasOwnProperty(u) && c.push(u + ":" + t[u]);
                    c.length || 0 === p ? (c.push(h), c = c.join("|"), n.push("markers=" + encodeURI(c))) : (c = n.pop() + encodeURI("|" + h), n.push(c))
                }
            if (a)
                for (p = 0; p < a.length; p++)
                {
                    var f = [];
                    a[p].featureType && f.push("feature:" + a[p].featureType.toLowerCase()), a[p].elementType && f.push("element:" + a[p].elementType.toLowerCase());
                    for (var m = 0; m < a[p].stylers.length; m++)
                        for (var g in a[p].stylers[m])
                        {
                            var _ = a[p].stylers[m][g];
                            "hue" != g && "color" != g || (_ = "0x" + _.substring(1)), f.push(g + ":" + _)
                        }
                    var y = f.join("|");
                    "" != y && n.push("style=" + y)
                }

            function v(e, t)
            {
                if ("#" === e[0] && (e = e.replace("#", "0x"), t))
                {
                    if (t = parseFloat(t), 0 === (t = Math.min(1, Math.max(t, 0)))) return "0x00000000";
                    1 === (t = (255 * t).toString(16)).length && (t += t), e = e.slice(0, 8) + t
                }
                return e
            }
            if (o)
            {
                if (t = o, o = [], t.strokeWeight && o.push("weight:" + parseInt(t.strokeWeight, 10)), t.strokeColor)
                {
                    var M = v(t.strokeColor, t.strokeOpacity);
                    o.push("color:" + M)
                }
                if (t.fillColor)
                {
                    var b = v(t.fillColor, t.fillOpacity);
                    o.push("fillcolor:" + b)
                }
                var w, L = t.path;
                if (L.join)
                    for (m = 0; w = L[m]; m++) o.push(w.join(","));
                else o.push("enc:" + L);
                o = o.join("|"), n.push("path=" + encodeURI(o))
            }
            var D = window.devicePixelRatio || 1;
            return n.push("scale=" + D), i + (n = n.join("&"))
        }, c.prototype.addMapType = function (e, t)
        {
            if (!t.hasOwnProperty("getTileUrl") || "function" != typeof t.getTileUrl) throw "'getTileUrl' function required.";
            t.tileSize = t.tileSize || new google.maps.Size(256, 256);
            var n = new google.maps.ImageMapType(t);
            this.map.mapTypes.set(e, n)
        }, c.prototype.addOverlayMapType = function (e)
        {
            if (!e.hasOwnProperty("getTile") || "function" != typeof e.getTile) throw "'getTile' function required.";
            var t = e.index;
            delete e.index, this.map.overlayMapTypes.insertAt(t, e)
        }, c.prototype.removeOverlayMapType = function (e)
        {
            this.map.overlayMapTypes.removeAt(e)
        }, c.prototype.addStyle = function (e)
        {
            var t = new google.maps.StyledMapType(e.styles,
            {
                name: e.styledMapName
            });
            this.map.mapTypes.set(e.mapTypeId, t)
        }, c.prototype.setStyle = function (e)
        {
            this.map.setMapTypeId(e)
        }, c.prototype.createPanorama = function (e)
        {
            return e.hasOwnProperty("lat") && e.hasOwnProperty("lng") || (e.lat = this.getCenter().lat(), e.lng = this.getCenter().lng()), this.panorama = c.createPanorama(e), this.map.setStreetView(this.panorama), this.panorama
        }, c.createPanorama = function (e)
        {
            var t = u(e.el, e.context);
            e.position = new google.maps.LatLng(e.lat, e.lng), delete e.el, delete e.context, delete e.lat, delete e.lng;
            for (var n = ["closeclick", "links_changed", "pano_changed", "position_changed", "pov_changed", "resize", "visible_changed"], i = a(
                {
                    visible: !0
                }, e), r = 0; r < n.length; r++) delete i[n[r]];
            var o = new google.maps.StreetViewPanorama(t, i);
            for (r = 0; r < n.length; r++) ! function (t, n)
            {
                e[n] && google.maps.event.addListener(t, n, function ()
                {
                    e[n].apply(this)
                })
            }(o, n[r]);
            return o
        }, c.prototype.on = function (e, t)
        {
            return c.on(e, this, t)
        }, c.prototype.off = function (e)
        {
            c.off(e, this)
        }, c.prototype.once = function (e, t)
        {
            return c.once(e, this, t)
        }, c.custom_events = ["marker_added", "marker_removed", "polyline_added", "polyline_removed", "polygon_added", "polygon_removed", "geolocated", "geolocation_failed"], c.on = function (e, t, n)
        {
            if (-1 == c.custom_events.indexOf(e)) return t instanceof c && (t = t.map), google.maps.event.addListener(t, e, n);
            var i = {
                handler: n,
                eventName: e
            };
            return t.registered_events[e] = t.registered_events[e] || [], t.registered_events[e].push(i), i
        }, c.off = function (e, t)
        {
            -1 == c.custom_events.indexOf(e) ? (t instanceof c && (t = t.map), google.maps.event.clearListeners(t, e)) : t.registered_events[e] = []
        }, c.once = function (e, t, n)
        {
            if (-1 == c.custom_events.indexOf(e)) return t instanceof c && (t = t.map), google.maps.event.addListenerOnce(t, e, n)
        }, c.fire = function (e, t, n)
        {
            if (-1 == c.custom_events.indexOf(e)) google.maps.event.trigger(t, e, Array.prototype.slice.apply(arguments).slice(2));
            else if (e in n.registered_events)
                for (var i = n.registered_events[e], r = 0; r < i.length; r++) ! function (e, t, n)
                {
                    e.apply(t, [n])
                }(i[r].handler, n, t)
        }, c.geolocate = function (e)
        {
            var t = e.always || e.complete;
            navigator.geolocation ? navigator.geolocation.getCurrentPosition(function (n)
            {
                e.success(n), t && t()
            }, function (n)
            {
                e.error(n), t && t()
            }, e.options) : (e.not_supported(), t && t())
        }, c.geocode = function (e)
        {
            this.geocoder = new google.maps.Geocoder;
            var t = e.callback;
            e.hasOwnProperty("lat") && e.hasOwnProperty("lng") && (e.latLng = new google.maps.LatLng(e.lat, e.lng)), delete e.lat, delete e.lng, delete e.callback, this.geocoder.geocode(e, function (e, n)
            {
                t(e, n)
            })
        }, "object" == typeof window.google && window.google.maps && (google.maps.Polygon.prototype.getBounds || (google.maps.Polygon.prototype.getBounds = function (e)
        {
            for (var t, n = new google.maps.LatLngBounds, i = this.getPaths(), r = 0; r < i.getLength(); r++)
            {
                t = i.getAt(r);
                for (var a = 0; a < t.getLength(); a++) n.extend(t.getAt(a))
            }
            return n
        }), google.maps.Polygon.prototype.containsLatLng || (google.maps.Polygon.prototype.containsLatLng = function (e)
        {
            var t = this.getBounds();
            if (null !== t && !t.contains(e)) return !1;
            for (var n = !1, i = this.getPaths().getLength(), r = 0; r < i; r++)
                for (var a = this.getPaths().getAt(r), o = a.getLength(), l = o - 1, s = 0; s < o; s++)
                {
                    var d = a.getAt(s),
                        u = a.getAt(l);
                    (d.lng() < e.lng() && u.lng() >= e.lng() || u.lng() < e.lng() && d.lng() >= e.lng()) && d.lat() + (e.lng() - d.lng()) / (u.lng() - d.lng()) * (u.lat() - d.lat()) < e.lat() && (n = !n), l = s
                }
            return n
        }), google.maps.Circle.prototype.containsLatLng || (google.maps.Circle.prototype.containsLatLng = function (e)
        {
            return !google.maps.geometry || google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), e) <= this.getRadius()
        }), google.maps.Rectangle.prototype.containsLatLng = function (e)
        {
            return this.getBounds().contains(e)
        }, google.maps.LatLngBounds.prototype.containsLatLng = function (e)
        {
            return this.contains(e)
        }, google.maps.Marker.prototype.setFences = function (e)
        {
            this.fences = e
        }, google.maps.Marker.prototype.addFence = function (e)
        {
            this.fences.push(e)
        }, google.maps.Marker.prototype.getId = function ()
        {
            return this.__gm_id
        }), Array.prototype.indexOf || (Array.prototype.indexOf = function (e)
        {
            if (null == this) throw new TypeError;
            var t = Object(this),
                n = t.length >>> 0;
            if (0 === n) return -1;
            var i = 0;
            if (arguments.length > 1 && ((i = Number(arguments[1])) != i ? i = 0 : 0 != i && i != 1 / 0 && i != -1 / 0 && (i = (i > 0 || -1) * Math.floor(Math.abs(i)))), i >= n) return -1;
            for (var r = i >= 0 ? i : Math.max(n - Math.abs(i), 0); r < n; r++)
                if (r in t && t[r] === e) return r;
            return -1
        }), c)
    }).call(this, i(1))
},
function (e, t, n)
{
    n(147), n(152), n(153), n(155), n(156), n(160), e.exports = n(163)
},
function (e, t, n)
{
    "use strict";
    n.r(t);
    var i = n(1),
        r = n.n(i);
    n(148), n(151), n(206);
    r()(document).ready(function ()
    {
        setTimeout(function ()
        {
            r()(".vertical-nav-menu").metisMenu()
        }, 100), r()(".search-icon").click(function ()
        {
            r()(this).parent().parent().addClass("active")
        }), r()(".search-wrapper .close").click(function ()
        {
            r()(this).parent().removeClass("active")
        }), r()(".dropdown-menu").on("click", function (e)
        {
            var t = r.a._data(document, "events") ||
            {};
            t = t.click || [];
            for (var n = 0; n < t.length; n++) t[n].selector && (r()(e.target).is(t[n].selector) && t[n].handler.call(e.target, e), r()(e.target).parents(t[n].selector).each(function ()
            {
                t[n].handler.call(this, e)
            }));
            e.stopPropagation()
        }), r()(function ()
        {
            r()('[data-toggle="popover"]').popover()
        }), r()(function ()
        {
            r()('[data-toggle="tooltip"]').tooltip()
        }), r()(".mobile-toggle-nav").click(function ()
        {
            r()(this).toggleClass("is-active"), r()(".app-container").toggleClass("sidebar-mobile-open")
        }), r()(".mobile-toggle-header-nav").click(function ()
        {
            r()(this).toggleClass("active"), r()(".app-header__content").toggleClass("header-mobile-open")
        });
        var e = function ()
        {
            document.body.clientWidth < 1250 ? r()(".app-container").addClass("closed-sidebar-mobile closed-sidebar") : r()(".app-container").removeClass("closed-sidebar-mobile closed-sidebar")
        };
        r()(window).on("resize", function ()
        {
            e()
        }), e()
    })
},
function (e, t, n)
{
    /