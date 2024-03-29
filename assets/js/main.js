parcelRequire = function (e, r, t, n) {
    var i, o = "function" == typeof parcelRequire && parcelRequire,
        u = "function" == typeof require && require;

    function f(t, n) {
        if (!r[t]) {
            if (!e[t]) {
                var i = "function" == typeof parcelRequire && parcelRequire;
                if (!n && i) return i(t, !0);
                if (o) return o(t, !0);
                if (u && "string" == typeof t) return u(t);
                var c = new Error("Cannot find module '" + t + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            p.resolve = function (r) {
                return e[t][1][r] || r
            }, p.cache = {};
            var l = r[t] = new f.Module(t);
            e[t][0].call(l.exports, p, l, l.exports, this)
        }
        return r[t].exports;

        function p(e) {
            return f(p.resolve(e))
        }
    }
    f.isParcelRequire = !0, f.Module = function (e) {
        this.id = e, this.bundle = f, this.exports = {}
    }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
        e[r] = [function (e, r) {
            r.exports = t
        }, {}]
    };
    for (var c = 0; c < t.length; c++) try {
        f(t[c])
    } catch (e) {
        i || (i = e)
    }
    if (t.length) {
        var l = f(t[t.length - 1]);
        "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
            return l
        }) : n && (this[n] = l)
    }
    if (parcelRequire = f, i) throw i;
    return f
}({
    "Jy7r": [function (require, module, exports) {
        var define;
        var t;
        ! function (t) {
            var e = setTimeout;

            function n() {}

            function i(t) {
                if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                if ("function" != typeof t) throw new TypeError("not a function");
                this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], c(t, this)
            }

            function o(t, e) {
                for (; 3 === t._state;) t = t._value;
                0 !== t._state ? (t._handled = !0, i._immediateFn(function () {
                    var n = 1 === t._state ? e.onFulfilled : e.onRejected;
                    if (null !== n) {
                        var i;
                        try {
                            i = n(t._value)
                        } catch (o) {
                            return void r(e.promise, o)
                        }
                        s(e.promise, i)
                    } else(1 === t._state ? s : r)(e.promise, t._value)
                })) : t._deferreds.push(e)
            }

            function s(t, e) {
                try {
                    if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
                    if (e && ("object" == typeof e || "function" == typeof e)) {
                        var n = e.then;
                        if (e instanceof i) return t._state = 3, t._value = e, void a(t);
                        if ("function" == typeof n) return void c((o = n, s = e, function () {
                            o.apply(s, arguments)
                        }), t)
                    }
                    t._state = 1, t._value = e, a(t)
                } catch (l) {
                    r(t, l)
                }
                var o, s
            }

            function r(t, e) {
                t._state = 2, t._value = e, a(t)
            }

            function a(t) {
                2 === t._state && 0 === t._deferreds.length && i._immediateFn(function () {
                    t._handled || i._unhandledRejectionFn(t._value)
                });
                for (var e = 0, n = t._deferreds.length; e < n; e++) o(t, t._deferreds[e]);
                t._deferreds = null
            }

            function l(t, e, n) {
                this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = n
            }

            function c(t, e) {
                var n = !1;
                try {
                    t(function (t) {
                        n || (n = !0, s(e, t))
                    }, function (t) {
                        n || (n = !0, r(e, t))
                    })
                } catch (i) {
                    if (n) return;
                    n = !0, r(e, i)
                }
            }
            i.prototype.catch = function (t) {
                return this.then(null, t)
            }, i.prototype.then = function (t, e) {
                var i = new this.constructor(n);
                return o(this, new l(t, e, i)), i
            }, i.all = function (t) {
                var e = Array.prototype.slice.call(t);
                return new i(function (t, n) {
                    if (0 === e.length) return t([]);
                    var i = e.length;

                    function o(s, r) {
                        try {
                            if (r && ("object" == typeof r || "function" == typeof r)) {
                                var a = r.then;
                                if ("function" == typeof a) return void a.call(r, function (t) {
                                    o(s, t)
                                }, n)
                            }
                            e[s] = r, 0 == --i && t(e)
                        } catch (l) {
                            n(l)
                        }
                    }
                    for (var s = 0; s < e.length; s++) o(s, e[s])
                })
            }, i.resolve = function (t) {
                return t && "object" == typeof t && t.constructor === i ? t : new i(function (e) {
                    e(t)
                })
            }, i.reject = function (t) {
                return new i(function (e, n) {
                    n(t)
                })
            }, i.race = function (t) {
                return new i(function (e, n) {
                    for (var i = 0, o = t.length; i < o; i++) t[i].then(e, n)
                })
            }, i._immediateFn = "function" == typeof setImmediate && function (t) {
                setImmediate(t)
            } || function (t) {
                e(t, 0)
            }, i._unhandledRejectionFn = function (t) {
                "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
            }, i._setImmediateFn = function (t) {
                i._immediateFn = t
            }, i._setUnhandledRejectionFn = function (t) {
                i._unhandledRejectionFn = t
            }, "undefined" != typeof module && module.exports ? module.exports = i : t.Promise || (t.Promise = i)
        }(this);
        try {
            var e = new window.CustomEvent("test");
            if (e.preventDefault(), !0 !== e.defaultPrevented) throw new Error("Could not prevent default")
        } catch (s) {
            var n = function (t, e) {
                var n, i;
                return e = e || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                }, (n = document.createEvent("CustomEvent")).initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i = n.preventDefault, n.preventDefault = function () {
                    i.call(this);
                    try {
                        Object.defineProperty(this, "defaultPrevented", {
                            get: function () {
                                return !0
                            }
                        })
                    } catch (s) {
                        this.defaultPrevented = !0
                    }
                }, n
            };
            n.prototype = window.Event.prototype, window.CustomEvent = n
        }! function (t) {
            var e = function () {
                function t() {}
                return t.lerp = function (t, e, n) {
                    return (n - e) * t + e
                }, t.norm = function (t, e, n) {
                    return (t - e) / (n - e)
                }, t.getXYFromMouseTouchEvent = function (t) {
                    var e = null;
                    return t.originalEvent ? e = t.originalEvent.touches || t.originalEvent.changedTouches : t.changedTouches && (e = t.changedTouches), e ? {
                        x: e[0].pageX,
                        y: e[0].pageY,
                        touches: e[0]
                    } : {
                        x: t.pageX,
                        y: t.pageY,
                        touches: null
                    }
                }, t.getInnerTextOfElement = function (t) {
                    var e = document.createElement("DIV");
                    e.innerHTML = t.innerHTML;
                    var n = e.textContent || e.innerText || "";
                    return n = String(n).replace(/^\s+|\s+$/g, "")
                }, t.getMouseEvent = function (t) {
                    var e = [];
                    return e.click = "ontouchstart" in window ? "touchstart" : "click", e.mousedown = "ontouchstart" in window ? "touchstart" : "mousedown", e.mouseup = "ontouchstart" in window ? "touchend" : "mouseup", e.mousemove = "ontouchstart" in window ? "touchmove" : "mousemove", e[t]
                }, t.isInternetExlorer = function () {
                    return window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)
                }, t.getValuesOfBars = function (t) {
                    var e = t.split("||");
                    return e.length <= 1 && (e = t.split("|")), e
                }, t.setTransform = function (t, e) {
                    t.style["-webkit-transform"] = e, t.style["-moz-transform"] = e, t.style["-ms-transform"] = e, t.style.transform = e
                }, t.extendObject = function (t, e) {
                    for (var n in e) e[n] && e[n].constructor && e[n].constructor === Object ? (t[n] = t[n] || {}, arguments.callee(t[n], e[n])) : t[n] = e[n];
                    return t
                }, t.caniuse = {
                    fileReader: function () {
                        return !!(window.File && window.FileReader && window.FileList && window.Blob)
                    }
                }, t
            }();
            t.Helpers = e
        }(o || (o = {})),
        function (t) {
            var e = function () {
                function t(t) {
                    void 0 === t && (t = null), this._cf = t, this.target = document.createDocumentFragment()
                }
                return Object.defineProperty(t.prototype, "cf", {
                    get: function () {
                        return this._cf
                    },
                    set: function (t) {
                        this._cf = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.addEventListener = function (t, e, n) {
                    return this.target.addEventListener(t, e, n)
                }, t.prototype.dispatchEvent = function (t) {
                    return this.target.dispatchEvent(t)
                }, t.prototype.removeEventListener = function (t, e, n) {
                    this.target.removeEventListener(t, e, n)
                }, t
            }();
            t.EventDispatcher = e
        }(o || (o = {})),
        function (t) {
            var e = function () {
                function t() {}
                return t.parseTag = function (t) {
                    var e = document.createElement(t.tag);
                    for (var n in e.setAttribute("cf-formless", ""), t) "tag" !== n && "children" !== n && e.setAttribute(n, t[n]);
                    return e
                }, t.parseGroupTag = function (e) {
                    for (var n = t.parseTag(e), i = e.children, o = 0; o < i.length; o++) {
                        var s = i[o],
                            r = t.parseTag(s);
                        n.appendChild(r)
                    }
                    return n
                }, t.parseJSONIntoElements = function (e) {
                    for (var n = document.createElement("form"), i = 0; i < e.length; i++) {
                        var o = e[i],
                            s = t.parseTag(o);
                        if (o.children && o.children.length > 0)
                            for (var r = 0; r < o.children.length; r++) {
                                var a = t.parseTag(o.children[r]);
                                s.appendChild(a)
                            }
                        n.appendChild(s)
                    }
                    return n
                }, t.isElementFormless = function (t) {
                    return !!t.hasAttribute("cf-formless")
                }, t
            }();
            t.TagsParser = e
        }(o || (o = {})),
        function (t) {
            t.UserInterfaceDefaultOptions = {
                controlElementsInAnimationDelay: 250,
                robot: {
                    robotResponseTime: 0,
                    chainedResponseTime: 500
                },
                user: {
                    showThinking: !1,
                    showThumb: !1
                }
            }
        }(o || (o = {})),
        function (t) {
            var e = function () {
                function t(t) {
                    if (this.eventTarget = t.eventTarget, this.cfReference = t.cfReference, t.customTemplate && (this.customTemplate = t.customTemplate), !this.eventTarget) throw new Error("this.eventTarget not set!! : " + this.constructor.name);
                    this.setData(t), this.createElement(), this.onElementCreated()
                }
                return t.prototype.setData = function (t) {}, t.prototype.onElementCreated = function () {}, t.prototype.createElement = function () {
                    var t = document.createElement("template");
                    return t.innerHTML = this.getTemplate(), this.el = t.firstChild || t.content.firstChild, this.el
                }, t.prototype.getTemplate = function () {
                    return this.customTemplate || "should be overwritten..."
                }, t.prototype.dealloc = function () {
                    this.el.parentNode.removeChild(this.el)
                }, t
            }();
            t.BasicElement = e
        }(o || (o = {}));
        var i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            t.ControlElementEvents = {
                SUBMIT_VALUE: "cf-basic-element-submit",
                PROGRESS_CHANGE: "cf-basic-element-progress",
                ON_FOCUS: "cf-basic-element-on-focus",
                ON_LOADED: "cf-basic-element-on-loaded"
            }, t.ControlElementProgressStates = {
                BUSY: "cf-control-element-progress-BUSY",
                READY: "cf-control-element-progress-READY"
            };
            var e = function (e) {
                function o(t) {
                    var n = e.call(this, t) || this;
                    return n.animateInTimer = 0, n._partOfSeveralChoices = !1, n._focus = !1, n.onFocusCallback = n.onFocus.bind(n), n.el.addEventListener("focus", n.onFocusCallback, !1), n.onBlurCallback = n.onBlur.bind(n), n.el.addEventListener("blur", n.onBlurCallback, !1), n.referenceTag.disabled && n.el.setAttribute("disabled", "disabled"), n
                }
                return i(o, e), Object.defineProperty(o.prototype, "type", {
                    get: function () {
                        return "ControlElement"
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "partOfSeveralChoices", {
                    get: function () {
                        return this._partOfSeveralChoices
                    },
                    set: function (t) {
                        this._partOfSeveralChoices = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "value", {
                    get: function () {
                        var e, n = this.referenceTag.hasImage;
                        n && !this.partOfSeveralChoices ? e = (n ? '<img src="' + this.referenceTag.domElement.getAttribute("cf-image") + '"/>' : "") + t.Helpers.getInnerTextOfElement(this.el) : e = t.Helpers.getInnerTextOfElement(this.el);
                        return e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "positionVector", {
                    get: function () {
                        return this._positionVector
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "tabIndex", {
                    set: function (t) {
                        this.el.tabIndex = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "highlight", {
                    get: function () {
                        return this.el.classList.contains("highlight")
                    },
                    set: function (t) {
                        t ? this.el.classList.add("highlight") : this.el.classList.remove("highlight")
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "focus", {
                    get: function () {
                        return this._focus
                    },
                    set: function (t) {
                        this._focus = t, this._focus ? this.el.focus() : this.el.blur()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "visible", {
                    get: function () {
                        return !this.el.classList.contains("hide")
                    },
                    set: function (t) {
                        t ? this.el.classList.remove("hide") : (this.el.classList.add("hide"), this.tabIndex = -1, this.highlight = !1)
                    },
                    enumerable: !0,
                    configurable: !0
                }), o.prototype.onBlur = function (t) {
                    this._focus = !1
                }, o.prototype.onFocus = function (e) {
                    this._focus = !0, t.ConversationalForm.illustrateFlow(this, "dispatch", t.ControlElementEvents.ON_FOCUS, this.referenceTag), this.eventTarget.dispatchEvent(new n(t.ControlElementEvents.ON_FOCUS, {
                        detail: this.positionVector
                    }))
                }, o.prototype.hasImage = function () {
                    return !1
                }, o.prototype.calcPosition = function () {
                    var t = parseInt(window.getComputedStyle(this.el).getPropertyValue("margin-right"), 10);
                    this._positionVector = {
                        height: this.el.offsetHeight,
                        width: this.el.offsetWidth + t,
                        x: this.el.offsetLeft,
                        y: this.el.offsetTop,
                        el: this
                    }, this._positionVector.centerX = this._positionVector.x + .5 * this._positionVector.width, this._positionVector.centerY = this._positionVector.y + .5 * this._positionVector.height
                }, o.prototype.setData = function (t) {
                    this.referenceTag = t.referenceTag, e.prototype.setData.call(this, t)
                }, o.prototype.animateIn = function () {
                    clearTimeout(this.animateInTimer), this.el.classList.add("animate-in")
                }, o.prototype.animateOut = function () {
                    this.el.classList.add("animate-out")
                }, o.prototype.onChoose = function () {
                    t.ConversationalForm.illustrateFlow(this, "dispatch", t.ControlElementEvents.SUBMIT_VALUE, this.referenceTag), this.eventTarget.dispatchEvent(new n(t.ControlElementEvents.SUBMIT_VALUE, {
                        detail: this
                    }))
                }, o.prototype.dealloc = function () {
                    this.el.removeEventListener("blur", this.onBlurCallback, !1), this.onBlurCallback = null, this.el.removeEventListener("focus", this.onFocusCallback, !1), this.onFocusCallback = null, e.prototype.dealloc.call(this)
                }, o
            }(t.BasicElement);
            t.ControlElement = e
        }(o || (o = {})),
        function (t) {
            t.ControlElementsEvents = {
                ON_RESIZE: "cf-on-control-elements-resize",
                CHANGED: "cf-on-control-elements-changed"
            };
            var e = function () {
                function e(e) {
                    this.ignoreKeyboardInput = !1, this.rowIndex = -1, this.columnIndex = 0, this.elementWidth = 0, this.filterListNumberOfVisible = 0, this.listWidth = 0, this.el = e.el, this.eventTarget = e.eventTarget, this.cfReference = e.cfReference, this.list = this.el.getElementsByTagName("cf-list")[0], this.infoElement = e.infoEl, this.onScrollCallback = this.onScroll.bind(this), this.el.addEventListener("scroll", this.onScrollCallback, !1), this.onResizeCallback = this.onResize.bind(this), window.addEventListener("resize", this.onResizeCallback, !1), this.onElementFocusCallback = this.onElementFocus.bind(this), this.eventTarget.addEventListener(t.ControlElementEvents.ON_FOCUS, this.onElementFocusCallback, !1), this.onElementLoadedCallback = this.onElementLoaded.bind(this), this.eventTarget.addEventListener(t.ControlElementEvents.ON_LOADED, this.onElementLoadedCallback, !1), this.onChatReponsesUpdatedCallback = this.onChatReponsesUpdated.bind(this), this.eventTarget.addEventListener(t.ChatListEvents.CHATLIST_UPDATED, this.onChatReponsesUpdatedCallback, !1), this.onUserInputKeyChangeCallback = this.onUserInputKeyChange.bind(this), this.eventTarget.addEventListener(t.UserInputEvents.KEY_CHANGE, this.onUserInputKeyChangeCallback, !1), this.userInputUpdateCallback = this.onUserInputUpdate.bind(this), this.eventTarget.addEventListener(t.FlowEvents.USER_INPUT_UPDATE, this.userInputUpdateCallback, !1), this.listScrollController = new t.ScrollController({
                        interactionListener: this.el,
                        listToScroll: this.list,
                        eventTarget: this.eventTarget,
                        listNavButtons: this.el.getElementsByTagName("cf-list-button")
                    })
                }
                return Object.defineProperty(e.prototype, "active", {
                    get: function () {
                        return this.elements && this.elements.length > 0
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "focus", {
                    get: function () {
                        if (!this.elements) return !1;
                        for (var t = this.getElements(), e = 0; e < t.length; e++) {
                            if (t[e].focus) return !0
                        }
                        return !1
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "highlighted", {
                    get: function () {
                        if (!this.elements) return !1;
                        for (var t = this.getElements(), e = 0; e < t.length; e++) {
                            if (t[e].highlight) return !0
                        }
                        return !1
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "disabled", {
                    set: function (t) {
                        t ? this.list.classList.add("disabled") : this.list.classList.remove("disabled")
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "length", {
                    get: function () {
                        return this.getElements().length
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.onScroll = function (t) {
                    this.el.scrollLeft = 0
                }, e.prototype.onElementLoaded = function (t) {
                    this.onResize(null)
                }, e.prototype.onElementFocus = function (t) {
                    var e = t.detail,
                        n = e.x + e.width < this.elementWidth ? 0 : e.x - e.width;
                    n *= -1, this.updateRowColIndexFromVector(e), this.listScrollController.setScroll(n, 0)
                }, e.prototype.updateRowColIndexFromVector = function (t) {
                    for (var e = 0; e < this.tableableRows.length; e++)
                        for (var n = this.tableableRows[e], i = 0; i < n.length; i++) {
                            if (n[i] == t.el) {
                                this.rowIndex = e, this.columnIndex = i;
                                break
                            }
                        }
                }, e.prototype.onChatReponsesUpdated = function (t) {
                    var e = this;
                    clearTimeout(this.animateInFromResponseTimer), t.detail.currentResponse.isRobotResponse || (this.animateInFromResponseTimer = setTimeout(function () {
                        e.animateElementsIn()
                    }, this.cfReference.uiOptions.controlElementsInAnimationDelay))
                }, e.prototype.onListChanged = function () {
                    var e = this;
                    this.list.offsetHeight, requestAnimationFrame(function () {
                        t.ConversationalForm.illustrateFlow(e, "dispatch", t.ControlElementsEvents.CHANGED), e.eventTarget.dispatchEvent(new n(t.ControlElementsEvents.CHANGED))
                    })
                }, e.prototype.onUserInputKeyChange = function (e) {
                    if (this.ignoreKeyboardInput) this.ignoreKeyboardInput = !1;
                    else {
                        var n = e.detail,
                            i = n.dto.input;
                        if (this.active) {
                            var o = -1 != [t.Dictionary.keyCodes.left, t.Dictionary.keyCodes.right, t.Dictionary.keyCodes.down, t.Dictionary.keyCodes.up].indexOf(n.keyCode);
                            if (n.inputFieldActive && !o) {
                                var s = e.detail.dto.input.getInputValue();
                                this.filterElementsFrom(s)
                            } else n.keyCode == t.Dictionary.keyCodes.left ? this.columnIndex-- : n.keyCode == t.Dictionary.keyCodes.right ? this.columnIndex++ : n.keyCode == t.Dictionary.keyCodes.down ? this.updateRowIndex(1) : n.keyCode == t.Dictionary.keyCodes.up ? this.updateRowIndex(-1) : n.keyCode != t.Dictionary.keyCodes.enter && n.keyCode != t.Dictionary.keyCodes.space || (this.tableableRows[this.rowIndex] && this.tableableRows[this.rowIndex][this.columnIndex] ? this.tableableRows[this.rowIndex][this.columnIndex].el.click() : this.tableableRows[0] && 1 == this.tableableRows[0].length && this.tableableRows[0][0].el.click()), this.validateRowColIndexes() || i.setFocusOnInput()
                        }
                        i.active || !this.validateRowColIndexes() || !this.tableableRows || 0 != this.rowIndex && 1 != this.rowIndex ? i.active || i.setFocusOnInput() : this.tableableRows[this.rowIndex][this.columnIndex].focus = !0
                    }
                }, e.prototype.validateRowColIndexes = function () {
                    this.el.classList.contains("two-row");
                    return -1 != this.rowIndex && this.tableableRows[this.rowIndex] ? (this.columnIndex < 0 && (this.columnIndex = this.tableableRows[this.rowIndex].length - 1), this.columnIndex > this.tableableRows[this.rowIndex].length - 1 && (this.columnIndex = 0), !0) : (this.resetTabList(), !1)
                }, e.prototype.updateRowIndex = function (t) {
                    var e = this.rowIndex;
                    if (this.rowIndex += t, this.tableableRows[this.rowIndex])
                        for (var n = this.tableableRows[e] ? this.tableableRows[e][this.columnIndex].positionVector.centerX : 0, i = this.tableableRows[this.rowIndex], o = 1e13, s = 0; s < i.length; s++) {
                            var r = i[s];
                            o > Math.abs(n - r.positionVector.centerX) && (o = Math.abs(n - r.positionVector.centerX), this.columnIndex = s)
                        }
                }, e.prototype.resetTabList = function () {
                    this.rowIndex = -1, this.columnIndex = -1
                }, e.prototype.onUserInputUpdate = function (t) {
                    if (this.el.classList.remove("animate-in"), this.infoElement.classList.remove("show"), this.elements)
                        for (var e = this.getElements(), n = 0; n < e.length; n++) {
                            e[n].animateOut()
                        }
                }, e.prototype.filterElementsFrom = function (e) {
                    var n = e.toLowerCase().split(" "); - 1 != n.indexOf("") && n.splice(n.indexOf(""), 1);
                    var i = this.getElements();
                    if (i.length > 1) {
                        for (var o = [], s = 0; s < i.length; s++) {
                            var r = i[s];
                            r.highlight = !1;
                            for (var a = !0, l = 0; l < n.length; l++) {
                                var c = n[l];
                                a && (a = -1 != r.value.toLowerCase().indexOf(c))
                            }
                            r.visible = a, a && r.visible && o.push(r)
                        }
                        this.infoElement.innerHTML = 0 == o.length ? t.Dictionary.get("input-no-filter").split("{input-value}").join(e) : "", 0 == o.length ? this.infoElement.classList.add("show") : this.infoElement.classList.remove("show"), this.filterListNumberOfVisible != o.length && this.animateElementsIn(), this.filterListNumberOfVisible = o.length, "" != e && this.filterListNumberOfVisible > 0 && (o[0].highlight = !0)
                    }
                }, e.prototype.clickOnHighlighted = function () {
                    for (var t = this.getElements(), e = 0; e < t.length; e++) {
                        var n = t[e];
                        if (n.highlight) {
                            n.el.click();
                            break
                        }
                    }
                }, e.prototype.animateElementsIn = function () {
                    var t = this;
                    this.elements.length > 0 && (this.resize(), this.list.style.height = "0px", setTimeout(function () {
                        t.list.style.height = t.list.scrollHeight + "px";
                        var e = t.getElements();
                        setTimeout(function () {
                            if (e.length > 0) {
                                t.el.classList.contains("animate-in") || t.el.classList.add("animate-in");
                                for (var n = 0; n < e.length; n++) {
                                    e[n].animateIn()
                                }
                            }
                            document.querySelector(".scrollableInner").classList.remove("scroll");
                            var i = document.querySelector("scrollable");
                            i.scrollTop < i.scrollHeight && (i.scrollTop = i.scrollHeight)
                        }, 300)
                    }, 200))
                }, e.prototype.getElements = function () {
                    return this.elements && this.elements.length > 0 && "OptionsList" == this.elements[0].type ? this.elements[0].elements : this.elements
                }, e.prototype.buildTabableRows = function () {
                    this.tableableRows = [], this.resetTabList();
                    var t = this.getElements();
                    if (this.el.classList.contains("two-row")) {
                        this.tableableRows[0] = [], this.tableableRows[1] = [];
                        for (var e = 0; e < t.length; e++) {
                            (n = t[e]).visible && (n.positionVector.y < 30 ? this.tableableRows[0].push(n) : this.tableableRows[1].push(n))
                        }
                    } else {
                        this.tableableRows[0] = [];
                        for (e = 0; e < t.length; e++) {
                            var n;
                            (n = t[e]).visible && this.tableableRows[0].push(n)
                        }
                    }
                }, e.prototype.resetAfterErrorMessage = function () {
                    this.currentControlElement = null, this.disabled = !1
                }, e.prototype.focusFrom = function (t) {
                    this.tableableRows && (this.columnIndex = 0, "bottom" == t ? this.rowIndex = this.el.classList.contains("two-row") ? 1 : 0 : "top" == t && (this.rowIndex = 0), this.tableableRows[this.rowIndex] && this.tableableRows[this.rowIndex][this.columnIndex] ? (this.ignoreKeyboardInput = !0, this.cfReference.options.preventAutoFocus || (this.tableableRows[this.rowIndex][this.columnIndex].focus = !0)) : this.resetTabList())
                }, e.prototype.updateStateOnElementsFromTag = function (t) {
                    for (var e = 0; e < this.elements.length; e++) {
                        var n = this.elements[e];
                        if (n.referenceTag == t) {
                            this.updateStateOnElements(n);
                            break
                        }
                    }
                }, e.prototype.updateStateOnElements = function (t) {
                    if (this.currentControlElement = t, "RadioButton" == this.currentControlElement.type)
                        for (var e = this.getElements(), n = 0; n < e.length; n++) {
                            (i = e[n]).checked = i == t
                        } else if ("CheckboxButton" == this.currentControlElement.type)
                            for (e = this.getElements(), n = 0; n < e.length; n++) {
                                var i;
                                if ((i = e[n]) == t) {
                                    var o = i.referenceTag.domElement.checked;
                                    i.checked = o
                                }
                            }
                }, e.prototype.reset = function () {
                    this.infoElement.classList.remove("show"), this.el.classList.remove("one-row"), this.el.classList.remove("two-row"), this.list.style.height = "0px"
                }, e.prototype.getElement = function (t) {
                    return this.elements[t]
                }, e.prototype.getDTO = function () {
                    var e = {
                        text: void 0,
                        controlElements: []
                    };
                    if (this.elements && this.elements.length > 0) switch (this.elements[0].type) {
                        case "CheckboxButton":
                            for (var n = 0, i = [], o = 0; o < this.elements.length; o++) {
                                if (this.elements[o].checked && n++ > 1) break
                            }
                            for (o = 0; o < this.elements.length; o++) {
                                var s = this.elements[o];
                                s.checked && (n > 1 && (s.partOfSeveralChoices = !0), i.push(s.value)), e.controlElements.push(s)
                            }
                            e.text = t.Dictionary.parseAndGetMultiValueString(i);
                            break;
                        case "RadioButton":
                            for (o = 0; o < this.elements.length; o++) {
                                var r = this.elements[o];
                                r.checked && (e.text = r.value), e.controlElements.push(r)
                            }
                            break;
                        case "OptionsList":
                            var a = this.elements[0];
                            e.controlElements = a.getValue();
                            i = [];
                            if (e.controlElements && e.controlElements[0])
                                for (var l = 0; l < e.controlElements.length; l++) {
                                    e.controlElements[l];
                                    i.push(e.controlElements[l].value)
                                }
                            e.controlElements = a.elements, e.text = t.Dictionary.parseAndGetMultiValueString(i);
                            break;
                        case "UploadFileUI":
                            e.text = this.elements[0].getFilesAsString(), e.controlElements.push(this.elements[0])
                    }
                    return e
                }, e.prototype.clearTagsAndReset = function () {
                    if (this.reset(), this.elements)
                        for (; this.elements.length > 0;) this.elements.pop().dealloc();
                    this.list.innerHTML = "", this.onListChanged()
                }, e.prototype.buildTags = function (e) {
                    var i = this;
                    this.disabled = !1;
                    this.el.parentNode.getElementsByTagName("ul")[0], this.el.parentNode.getElementsByTagName("ul")[1];
                    this.clearTagsAndReset(), this.elements = [];
                    for (var o = 0; o < e.length; o++) {
                        var s = e[o];
                        switch (s.type) {
                            case "radio":
                                this.elements.push(new t.RadioButton({
                                    referenceTag: s,
                                    eventTarget: this.eventTarget
                                }));
                                break;
                            case "checkbox":
                                this.elements.push(new t.CheckboxButton({
                                    referenceTag: s,
                                    eventTarget: this.eventTarget
                                }));
                                break;
                            case "select":
                                this.elements.push(new t.OptionsList({
                                    referenceTag: s,
                                    context: this.list,
                                    eventTarget: this.eventTarget
                                }));
                                break;
                            case "input":
                            default:
                                "file" == s.type && this.elements.push(new t.UploadFileUI({
                                    referenceTag: s,
                                    eventTarget: this.eventTarget
                                }))
                        }
                        if ("select" != s.type && this.elements.length > 0) {
                            var r = this.elements[this.elements.length - 1];
                            this.list.appendChild(r.el)
                        }
                    }
                    var a = this.elements[0] && "OptionsList" == this.elements[0].type;
                    this.filterListNumberOfVisible = a ? this.elements[0].elements.length : e.length, new Promise(function (t, e) {
                        return i.resize(t, e)
                    }).then(function () {
                        var e = {
                            height: i.list.offsetHeight
                        };
                        i.onListChanged(), t.ConversationalForm.illustrateFlow(i, "dispatch", t.UserInputEvents.CONTROL_ELEMENTS_ADDED, e), i.eventTarget.dispatchEvent(new n(t.UserInputEvents.CONTROL_ELEMENTS_ADDED, {
                            detail: e
                        }))
                    })
                }, e.prototype.onResize = function (t) {
                    this.resize()
                }, e.prototype.resize = function (e, i) {
                    this.list.style.width = "100%", this.el.classList.remove("resized"), this.el.classList.remove("one-row"), this.el.classList.remove("two-row"), this.elementWidth = 0, this.listWidth = 0;
                    var o = this.getElements();
                    if (o && o.length > 0) {
                        for (var s = [], r = [], a = !1, l = 0; l < o.length; l++) {
                            (d = o[l]).visible && (d.calcPosition(), this.listWidth += d.positionVector.width, s.push(d.positionVector.x + d.positionVector.width), r.push(d)), d.hasImage() && (a = !0)
                        }
                        var c = this.el.offsetWidth,
                            h = this.listWidth > c;
                        h && !a ? (this.el.classList.add("two-row"), this.listWidth = Math.max(c, Math.round(s[Math.floor(s.length / 2)] + 50)), this.list.style.width = this.listWidth + "px") : this.el.classList.add("one-row");
                        for (l = 0; l < o.length; l++) {
                            (d = o[l]).visible && d.calcPosition()
                        }
                        c = this.el.offsetWidth, h = this.listWidth > c;
                        var u = o.slice().sort(function (t, e) {
                                var n = t.positionVector.y > e.positionVector.y;
                                return t.positionVector.x == e.positionVector.x ? n ? 1 : -1 : t.positionVector.x < e.positionVector.x ? -1 : 1
                            }),
                            p = 0;
                        for (l = 0; l < u.length; l++) {
                            var d;
                            (d = u[l]).visible ? d.tabIndex = 2 + p++ : d.tabIndex = -1
                        }
                        h ? this.el.classList.remove("hide-nav-buttons") : this.el.classList.add("hide-nav-buttons"), this.elementWidth = c, this.listScrollController.resize(this.listWidth, this.elementWidth), this.el.classList.add("resized"), this.eventTarget.dispatchEvent(new n(t.ControlElementsEvents.ON_RESIZE)), e && (this.buildTabableRows(), e())
                    }
                }, e.prototype.dealloc = function () {
                    this.currentControlElement = null, this.tableableRows = null, window.removeEventListener("resize", this.onResizeCallback, !1), this.onResizeCallback = null, this.el.removeEventListener("scroll", this.onScrollCallback, !1), this.onScrollCallback = null, this.eventTarget.removeEventListener(t.ControlElementEvents.ON_FOCUS, this.onElementFocusCallback, !1), this.onElementFocusCallback = null, this.eventTarget.removeEventListener(t.ChatListEvents.CHATLIST_UPDATED, this.onChatReponsesUpdatedCallback, !1), this.onChatReponsesUpdatedCallback = null, this.eventTarget.removeEventListener(t.UserInputEvents.KEY_CHANGE, this.onUserInputKeyChangeCallback, !1), this.onUserInputKeyChangeCallback = null, this.eventTarget.removeEventListener(t.FlowEvents.USER_INPUT_UPDATE, this.userInputUpdateCallback, !1), this.userInputUpdateCallback = null, this.eventTarget.removeEventListener(t.ControlElementEvents.ON_LOADED, this.onElementLoadedCallback, !1), this.onElementLoadedCallback = null, this.listScrollController.dealloc()
                }, e
            }();
            t.ControlElements = e
        }(o || (o = {})),
        function (t) {
            var e = function () {
                function e(e) {
                    this.listWidth = 0, this.visibleAreaWidth = 0, this.max = 0, this.interacting = !1, this.x = 0, this.xTarget = 0, this.startX = 0, this.startXTarget = 0, this.mouseSpeed = 0, this.mouseSpeedTarget = 0, this.direction = 0, this.directionTarget = 0, this.inputAccerlation = 0, this.inputAccerlationTarget = 0, this.interactionListener = e.interactionListener, this.eventTarget = e.eventTarget, this.listToScroll = e.listToScroll, this.prevButton = e.listNavButtons[0], this.nextButton = e.listNavButtons[1], this.onListNavButtonsClickCallback = this.onListNavButtonsClick.bind(this), this.prevButton.addEventListener("click", this.onListNavButtonsClickCallback, !1), this.nextButton.addEventListener("click", this.onListNavButtonsClickCallback, !1), this.documentLeaveCallback = this.documentLeave.bind(this), this.onInteractStartCallback = this.onInteractStart.bind(this), this.onInteractEndCallback = this.onInteractEnd.bind(this), this.onInteractMoveCallback = this.onInteractMove.bind(this), document.addEventListener("mouseleave", this.documentLeaveCallback, !1), document.addEventListener(t.Helpers.getMouseEvent("mouseup"), this.documentLeaveCallback, !1), this.interactionListener.addEventListener(t.Helpers.getMouseEvent("mousedown"), this.onInteractStartCallback, !1), this.interactionListener.addEventListener(t.Helpers.getMouseEvent("mouseup"), this.onInteractEndCallback, !1), this.interactionListener.addEventListener(t.Helpers.getMouseEvent("mousemove"), this.onInteractMoveCallback, !1)
                }
                return e.prototype.onListNavButtonsClick = function (t) {
                    var e = t.currentTarget.getAttribute("direction");
                    this.pushDirection("next" == e ? -1 : 1)
                }, e.prototype.documentLeave = function (t) {
                    this.onInteractEnd(t)
                }, e.prototype.onInteractStart = function (e) {
                    var n = t.Helpers.getXYFromMouseTouchEvent(e);
                    this.interacting = !0, this.startX = n.x, this.startXTarget = this.startX, this.inputAccerlation = 0, this.render()
                }, e.prototype.onInteractEnd = function (t) {
                    this.interacting = !1
                }, e.prototype.onInteractMove = function (e) {
                    if (this.interacting) {
                        var n = t.Helpers.getXYFromMouseTouchEvent(e),
                            i = n.x - this.startX;
                        this.inputAccerlationTarget = 6.2 * i, this.directionTarget = this.inputAccerlationTarget < 0 ? -1 : 1, this.startXTarget = n.x
                    }
                }, e.prototype.render = function () {
                    var n = this;
                    this.rAF && cancelAnimationFrame(this.rAF), this.startX += .2 * (this.startXTarget - this.startX), this.inputAccerlation += (this.inputAccerlationTarget - this.inputAccerlation) * (this.interacting ? Math.min(e.acceleration + .1, 1) : e.acceleration);
                    this.inputAccerlationTarget *= .25, this.direction += .2 * (this.directionTarget - this.direction), this.mouseSpeed += .2 * (this.mouseSpeedTarget - this.mouseSpeed), this.direction += this.mouseSpeed, this.xTarget += .05 * this.inputAccerlation, this.xTarget > 0 && (this.xTarget += (0 - this.xTarget) * t.Helpers.lerp(e.acceleration, .3, .8)), this.xTarget < this.max && (this.xTarget += (this.max - this.xTarget) * t.Helpers.lerp(e.acceleration, .3, .8)), this.x += .4 * (this.xTarget - this.x);
                    var i = Math.round(this.x);
                    i < 0 && (this.prevButton.classList.contains("active") || this.prevButton.classList.add("active"), this.prevButton.classList.contains("cf-gradient") || this.prevButton.classList.add("cf-gradient")), 0 == i && (this.prevButton.classList.contains("active") && this.prevButton.classList.remove("active"), this.prevButton.classList.contains("cf-gradient") && this.prevButton.classList.remove("cf-gradient")), i > this.max && (this.nextButton.classList.contains("active") || this.nextButton.classList.add("active"), this.nextButton.classList.contains("cf-gradient") || this.nextButton.classList.add("cf-gradient")), i <= this.max && (this.nextButton.classList.contains("active") && this.nextButton.classList.remove("active"), this.nextButton.classList.contains("cf-gradient") && this.nextButton.classList.remove("cf-gradient"));
                    var o = this.x;
                    t.Helpers.setTransform(this.listToScroll, "translateX(" + o + "px)"), (this.interacting || Math.abs(this.x - this.xTarget) > .02 && !this.interacting) && (this.rAF = window.requestAnimationFrame(function () {
                        return n.render()
                    }))
                }, e.prototype.setScroll = function (t, e) {
                    this.xTarget = this.visibleAreaWidth == this.listWidth ? 0 : t, this.render()
                }, e.prototype.pushDirection = function (t) {
                    this.inputAccerlationTarget += 5e3 * t, this.render()
                }, e.prototype.dealloc = function () {
                    this.prevButton.removeEventListener("click", this.onListNavButtonsClickCallback, !1), this.nextButton.removeEventListener("click", this.onListNavButtonsClickCallback, !1), this.onListNavButtonsClickCallback = null, this.prevButton = null, this.nextButton = null, document.removeEventListener("mouseleave", this.documentLeaveCallback, !1), document.removeEventListener(t.Helpers.getMouseEvent("mouseup"), this.documentLeaveCallback, !1), this.interactionListener.removeEventListener(t.Helpers.getMouseEvent("mousedown"), this.onInteractStartCallback, !1), this.interactionListener.removeEventListener(t.Helpers.getMouseEvent("mouseup"), this.onInteractEndCallback, !1), this.interactionListener.removeEventListener(t.Helpers.getMouseEvent("mousemove"), this.onInteractMoveCallback, !1), this.documentLeaveCallback = null, this.onInteractStartCallback = null, this.onInteractEndCallback = null, this.onInteractMoveCallback = null
                }, e.prototype.reset = function () {
                    this.interacting = !1, this.startX = 0, this.startXTarget = this.startX, this.inputAccerlation = 0, this.x = 0, this.xTarget = 0, t.Helpers.setTransform(this.listToScroll, "translateX(0px)"), this.render(), this.prevButton.classList.remove("active"), this.nextButton.classList.remove("active")
                }, e.prototype.resize = function (t, e) {
                    this.reset(), this.visibleAreaWidth = e, this.listWidth = Math.max(e, t), this.max = -1 * (this.listWidth - this.visibleAreaWidth), this.render()
                }, e.acceleration = .1, e
            }();
            t.ScrollController = e
        }(o || (o = {})),
        function (t) {
            var e = function () {
                function e(e) {
                    var n = this;
                    this.flowUpdateCallback = this.onFlowUpdate.bind(this), this.eventTarget = e.eventTarget, this.eventTarget.addEventListener(t.FlowEvents.FLOW_UPDATE, this.flowUpdateCallback, !1), this.eventTarget.addEventListener(t.FlowEvents.FORM_SUBMIT, function () {
                        return n.setWidth(100)
                    }, !1), this.el = document.createElement("div"), this.el.className = "cf-progressBar", this.bar = document.createElement("div"), this.bar.className = "bar", this.el.appendChild(this.bar), setTimeout(function () {
                        return n.init()
                    }, 800)
                }
                return e.prototype.init = function () {
                    this.el.classList.add("show")
                }, e.prototype.onFlowUpdate = function (t) {
                    this.setWidth(t.detail.step / t.detail.maxSteps * 100)
                }, e.prototype.setWidth = function (t) {
                    this.bar.style.width = t + "%"
                }, e.prototype.dealloc = function () {
                    this.eventTarget.removeEventListener(t.FlowEvents.FLOW_UPDATE, this.flowUpdateCallback, !1), this.flowUpdateCallback = null
                }, e
            }();
            t.ProgressBar = e
        }(o || (o = {})),
        function (t) {
            var e = function () {
                function e(t) {
                    this.data = {
                        "user-image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMTAwIiBmaWxsPSIjMzAzMDMwIi8+CjxwYXRoIGQ9Ik0xMDAgNTVMMTM4Ljk3MSAxMjIuNUg2MS4wMjg5TDEwMCA1NVoiIGZpbGw9IiNFNUU2RUEiLz4KPC9zdmc+Cg==",
                        "entry-not-found": "Dictionary item not found.",
                        "awaiting-mic-permission": "Awaiting mic permission",
                        "user-audio-reponse-invalid": "I didn't get that, try again.",
                        "microphone-terminal-error": "Audio input not supported",
                        "input-placeholder": "Type your answer here ...",
                        "group-placeholder": "Type to filter ...",
                        "input-placeholder-error": "Your input is not correct ...",
                        "input-placeholder-required": "Input is required ...",
                        "input-placeholder-file-error": "File upload failed ...",
                        "input-placeholder-file-size-error": "File size too big ...",
                        "input-no-filter": "No results found for ‛{input-value}‛",
                        "user-reponse-and": " and ",
                        "user-reponse-missing": "Missing input ...",
                        "user-reponse-missing-group": "Nothing selected ...",
                        general: "General type1||General type2",
                        "icon-type-file": "<svg class='cf-icon-file' viewBox='0 0 10 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g transform='translate(-756.000000, -549.000000)' fill='#0D83FF'><g transform='translate(736.000000, 127.000000)'><g transform='translate(0.000000, 406.000000)'><polygon points='20 16 26.0030799 16 30 19.99994 30 30 20 30'></polygon></g></g></g></g></svg>"
                    }, this.robotData = {
                        "robot-image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMTAwIiBmaWxsPSIjRTVFNkVBIi8+CjxyZWN0IHg9IjY2IiB5PSI2NiIgd2lkdGg9IjY4IiBoZWlnaHQ9IjY4IiBmaWxsPSIjMzAzMDMwIi8+Cjwvc3ZnPgo=",
                        input: "Please write some text.",
                        text: "Please write some text.",
                        textarea: "Please write some text.",
                        checkbox: "Select as many as you want.",
                        name: "What's your name?",
                        email: "Need your e-mail.",
                        password: "Please provide password",
                        tel: "What's your phone number?",
                        radio: "I need you to select one of these.",
                        select: "Choose any of these options.",
                        file: "Select a file to upload.",
                        general: "General1||General2||General3.."
                    }, e.instance = this, this.version = t.version, t && t.data && (this.data = this.validateAndSetNewData(t.data, this.data)), t.userImage ? this.data["user-image"] = t.userImage : this.data["user-image"] = this.data["user-image"], t.robotImage ? this.robotData["robot-image"] = t.robotImage : this.robotData["robot-image"] = this.robotData["robot-image"], t && t.robotData && (this.robotData = this.validateAndSetNewData(t.robotData, this.robotData))
                }
                return e.get = function (n) {
                    var i = e.instance,
                        o = i.data[n];
                    if (o) {
                        var s = t.Helpers.getValuesOfBars(o);
                        o = s[Math.floor(Math.random() * s.length)]
                    } else o = i.data["entry-not-found"];
                    return o
                }, e.set = function (t, n, i) {
                    var o = e.instance,
                        s = "robot" == n ? o.robotData : o.data;
                    return s[t] = i, s[t]
                }, e.getRobotResponse = function (n) {
                    var i = e.instance,
                        o = i.robotData[n];
                    if (o) {
                        var s = t.Helpers.getValuesOfBars(o);
                        o = s[Math.floor(Math.random() * s.length)]
                    } else {
                        var r = t.Helpers.getValuesOfBars(i.robotData.general);
                        o = r[Math.floor(Math.random() * r.length)]
                    }
                    return o
                }, e.parseAndGetMultiValueString = function (t) {
                    for (var n = "", i = 0; i < t.length; i++) {
                        var o = t[i],
                            s = t.length > 1 && i == t.length - 2 ? e.get("user-reponse-and") : ", ";
                        n += o + (i < t.length - 1 ? s : "")
                    }
                    return n
                }, e.prototype.validateAndSetNewData = function (t, e) {
                    for (var n in e) t[n] || (console.warn("Conversational Form Dictionary warning, '" + n + "' value is undefined, mapping '" + n + "' to default value. See Dictionary.ts for keys."), t[n] = e[n]);
                    return t
                }, e.keyCodes = {
                    left: 37,
                    right: 39,
                    down: 40,
                    up: 38,
                    backspace: 8,
                    enter: 13,
                    space: 32,
                    shift: 16,
                    tab: 9
                }, e
            }();
            t.Dictionary = e
        }(o || (o = {})),
        function (t) {
            t.TagEvents = {
                ORIGINAL_ELEMENT_CHANGED: "cf-tag-dom-element-changed"
            };
            var e = function () {
                function e(e) {
                    if (this.domElement = e.domElement, this.initialDefaultValue = this.domElement.value || this.domElement.getAttribute("value") || "", this.changeCallback = this.onDomElementChange.bind(this), this.domElement.addEventListener("change", this.changeCallback, !1), this.domElement.tabIndex = -1, this.skipUserInput = !1, e.questions && (this.questions = e.questions), this.domElement.getAttribute("cf-validation")) {
                        var n = window[this.domElement.getAttribute("cf-validation")];
                        this.validationCallback = n
                    }
                    this.domElement.getAttribute("pattern") && (this.pattern = new RegExp(this.domElement.getAttribute("pattern"))), "group" != this.type && t.ConversationalForm.illustrateAppFlow && (t.ConversationalForm.suppressLog || console.log("Conversational Form > Tag registered:", this.type, this)), this.refresh()
                }
                return Object.defineProperty(e.prototype, "type", {
                    get: function () {
                        return this.domElement.getAttribute("type") || this.domElement.tagName.toLowerCase()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "name", {
                    get: function () {
                        return this.domElement.getAttribute("name")
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "id", {
                    get: function () {
                        return this.domElement.getAttribute("id")
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "inputPlaceholder", {
                    get: function () {
                        return this._inputPlaceholder
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "formless", {
                    get: function () {
                        return t.TagsParser.isElementFormless(this.domElement)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "label", {
                    get: function () {
                        return this.getLabel()
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "value", {
                    get: function () {
                        return this.domElement.value || this.initialDefaultValue
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "hasImage", {
                    get: function () {
                        return this.domElement.hasAttribute("cf-image")
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "rows", {
                    get: function () {
                        return this.domElement.hasAttribute("rows") ? parseInt(this.domElement.getAttribute("rows")) : 0
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "disabled", {
                    get: function () {
                        return !this.checkConditionalAndIsValid() || null != this.domElement.getAttribute("disabled") && null != this.domElement.getAttribute("disabled")
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "required", {
                    get: function () {
                        return !!this.domElement.getAttribute("required") || "" == this.domElement.getAttribute("required")
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "question", {
                    get: function () {
                        return this.questions && 0 != this.questions.length ? this.questions[Math.floor(Math.random() * this.questions.length)] : t.Dictionary.getRobotResponse(this.type)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "eventTarget", {
                    set: function (t) {
                        this._eventTarget = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "errorMessage", {
                    get: function () {
                        return this.errorMessages || (this.domElement.getAttribute("cf-error") ? this.errorMessages = t.Helpers.getValuesOfBars(this.domElement.getAttribute("cf-error")) : this.domElement.parentNode && this.domElement.parentNode.getAttribute("cf-error") ? this.errorMessages = t.Helpers.getValuesOfBars(this.domElement.parentNode.getAttribute("cf-error")) : this.required ? this.errorMessages = [t.Dictionary.get("input-placeholder-required")] : "file" == this.type ? this.errorMessages = [t.Dictionary.get("input-placeholder-file-error")] : this.errorMessages = [t.Dictionary.get("input-placeholder-error")]), this.errorMessages[Math.floor(Math.random() * this.errorMessages.length)]
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.dealloc = function () {
                    this.domElement.removeEventListener("change", this.changeCallback, !1), this.changeCallback = null, this.domElement = null, this.defaultValue = null, this.errorMessages = null, this.pattern = null, this._label = null, this.validationCallback = null, this.questions = null
                }, e.testConditions = function (t, e) {
                    var n = function (e, n) {
                        return "object" == typeof n ? n.test(e) : t === n
                    };
                    if ("string" == typeof t) {
                        for (var i = t, o = !1, s = 0; s < e.conditionals.length; s++) {
                            if (o = n(i, r = e.conditionals[s])) break
                        }
                        return o
                    }
                    if (t) {
                        for (o = !1, s = 0; s < e.conditionals.length; s++) {
                            var r = e.conditionals[s];
                            if ("string" != typeof t)
                                for (var a = 0; a < t.length && !(o = n(t[a], r)); a++);
                            else o = n(t.toString(), r);
                            if (o) break
                        }
                        return o
                    }
                    return !1
                }, e.isTagValid = function (e) {
                    if ("hidden" === e.getAttribute("type")) return !1;
                    if ("submit" === e.getAttribute("type")) return !1;
                    if ("button" == e.getAttribute("type")) return !1;
                    if (e.style) {
                        if ("none" === e.style.display) return !1;
                        if ("hidden" === e.style.visibility) return !1
                    }
                    var n = t.TagsParser.isElementFormless(e),
                        i = t.Helpers.getInnerTextOfElement(e);
                    return !("option" == e.tagName.toLowerCase() && (!n && "" == i || " " == i)) && ("select" == e.tagName.toLowerCase() || "option" == e.tagName.toLowerCase() || (!!n || !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)))
                }, e.createTag = function (n) {
                    if (e.isTagValid(n)) {
                        var i = void 0;
                        return "input" == n.tagName.toLowerCase() ? i = new t.InputTag({
                            domElement: n
                        }) : "textarea" == n.tagName.toLowerCase() ? i = new t.InputTag({
                            domElement: n
                        }) : "select" == n.tagName.toLowerCase() ? i = new t.SelectTag({
                            domElement: n
                        }) : "button" == n.tagName.toLowerCase() ? i = new t.ButtonTag({
                            domElement: n
                        }) : "option" == n.tagName.toLowerCase() ? i = new t.OptionTag({
                            domElement: n
                        }) : "cf-robot-message" == n.tagName.toLowerCase() && (i = new t.CfRobotMessageTag({
                            domElement: n
                        })), i
                    }
                    return null
                }, e.prototype.reset = function () {
                    this.refresh(), this.defaultValue = this.domElement.value = this.initialDefaultValue.toString()
                }, e.prototype.refresh = function () {
                    this.defaultValue = this.domElement.value || this.domElement.getAttribute("value") || "", this.questions = null, this.findAndSetQuestions(), this.findConditionalAttributes()
                }, e.prototype.hasConditionsFor = function (t) {
                    if (!this.hasConditions()) return !1;
                    for (var e = 0; e < this.conditionalTags.length; e++) {
                        var n = this.conditionalTags[e];
                        if ("cf-conditional-" + t.toLowerCase() === n.key.toLowerCase()) return !0
                    }
                    return !1
                }, e.prototype.hasConditions = function () {
                    return this.conditionalTags && this.conditionalTags.length > 0
                }, e.prototype.checkConditionalAndIsValid = function () {
                    return !this.hasConditions() || this.flowManager.areConditionsInFlowFullfilled(this, this.conditionalTags)
                }, e.prototype.setTagValueAndIsValid = function (t) {
                    var e = !0,
                        n = t.text;
                    this.domElement.hasAttribute("type") && "email" === this.domElement.getAttribute("type") && !this.pattern && n.length > 0 ? this.pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ : this.domElement.hasAttribute("type") && "email" === this.domElement.getAttribute("type") && this.pattern && 0 === n.length && !this.required && (this.pattern = null), this.pattern && (e = this.pattern.test(n)), "" == n && this.required && (e = !1);
                    var i = parseInt(this.domElement.getAttribute("minlength"), 10) || -1,
                        o = parseInt(this.domElement.getAttribute("maxlength"), 10) || -1;
                    return -1 != i && n.length < i && (e = !1), -1 != o && n.length > o && (e = !1), this.validateMaxMinValue(n) || (e = !1), e && "file" != this.type && (this.domElement.value = n), e
                }, e.prototype.validateMaxMinValue = function (t) {
                    if (!t) return !0;
                    var e = parseInt(t, 10),
                        n = parseInt(this.domElement.getAttribute("min"), 10) || -1,
                        i = parseInt(this.domElement.getAttribute("max"), 10) || -1;
                    return !(-1 !== n && e < n) && !(-1 !== i && e > i)
                }, e.prototype.getLabel = function () {
                    return this._label || this.findAndSetLabel(), this._label ? this._label : t.Dictionary.getRobotResponse(this.type)
                }, e.prototype.findConditionalAttributes = function () {
                    var t = this.domElement.attributes;
                    if (t.length > 0)
                        for (var e in this.conditionalTags = [], t)
                            if (t.hasOwnProperty(e)) {
                                var n = t[e];
                                if (n && n.name && -1 !== n.name.indexOf("cf-conditional")) {
                                    for (var i = [], o = -1 !== n.value.indexOf("||") ? n.value.split("||") : n.value.split("&&"), r = 0; r < o.length; r++) {
                                        var a = o[r];
                                        try {
                                            i.push(new RegExp(a))
                                        } catch (s) {}
                                        i.push(a)
                                    }
                                    this.conditionalTags.push({
                                        key: n.name,
                                        conditionals: i
                                    })
                                }
                            }
                }, e.prototype.findAndSetQuestions = function () {
                    if (!this.questions) {
                        if (this.domElement.getAttribute("cf-questions")) this.questions = t.Helpers.getValuesOfBars(this.domElement.getAttribute("cf-questions")), this.domElement.getAttribute("cf-input-placeholder") && (this._inputPlaceholder = this.domElement.getAttribute("cf-input-placeholder"));
                        else if (this.domElement.parentNode && this.domElement.parentNode.getAttribute("cf-questions")) {
                            var e = this.domElement.parentNode;
                            this.questions = t.Helpers.getValuesOfBars(e.getAttribute("cf-questions")), e.getAttribute("cf-input-placeholder") && (this._inputPlaceholder = e.getAttribute("cf-input-placeholder"))
                        } else {
                            var n = this.domElement.getAttribute("id"),
                                i = document.querySelector("label[for='" + n + "']");
                            i && (this.questions = [t.Helpers.getInnerTextOfElement(i)])
                        }!this.questions && this.domElement.getAttribute("placeholder") && (this.questions = [this.domElement.getAttribute("placeholder")])
                    }
                }, e.prototype.findAndSetLabel = function () {
                    if (this.domElement.getAttribute("cf-label")) this._label = this.domElement.getAttribute("cf-label");
                    else {
                        var e = this.domElement.parentNode;
                        if (e) {
                            var n = "label" == e.tagName.toLowerCase() ? [e] : e.getElementsByTagName("label");
                            if (0 == n.length) {
                                var i = t.Helpers.getInnerTextOfElement(e);
                                i && i.length > 0 && (n = [e])
                            } else if (n.length > 0)
                                for (var o = 0; o < n.length; o++) {
                                    var s = n[o];
                                    s.getAttribute("for") == this.id && (this._label = t.Helpers.getInnerTextOfElement(s))
                                }!this._label && n[0] && (this._label = t.Helpers.getInnerTextOfElement(n[0]))
                        }
                    }
                }, e.prototype.onDomElementChange = function () {
                    this._eventTarget.dispatchEvent(new n(t.TagEvents.ORIGINAL_ELEMENT_CHANGED, {
                        detail: {
                            value: this.value,
                            tag: this
                        }
                    }))
                }, e
            }();
            t.Tag = e
        }(o || (o = {})),
        function (t) {
            var e = function () {
                function e(e) {
                    this.elements = e.elements, this._fieldset = e.fieldset, this._fieldset && this._fieldset.getAttribute("cf-questions") && (this.questions = t.Helpers.getValuesOfBars(this._fieldset.getAttribute("cf-questions"))), this._fieldset && this._fieldset.getAttribute("cf-input-placeholder") && (this._inputPlaceholder = this._fieldset.getAttribute("cf-input-placeholder")), t.ConversationalForm.illustrateAppFlow && (t.ConversationalForm.suppressLog || console.log("Conversational Form > TagGroup registered:", this.elements[0].type, this)), this.skipUserInput = !1
                }
                return Object.defineProperty(e.prototype, "required", {
                    get: function () {
                        for (var t = 0; t < this.elements.length; t++) {
                            this.elements[t];
                            if (this.elements[t].required) return !0
                        }
                        return !1
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "eventTarget", {
                    set: function (t) {
                        this._eventTarget = t;
                        for (var e = 0; e < this.elements.length; e++) {
                            this.elements[e].eventTarget = t
                        }
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "flowManager", {
                    set: function (t) {
                        for (var e = 0; e < this.elements.length; e++) {
                            this.elements[e].flowManager = t
                        }
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "type", {
                    get: function () {
                        return "group"
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "label", {
                    get: function () {
                        return ""
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "name", {
                    get: function () {
                        return this._fieldset && this._fieldset.hasAttribute("name") ? this._fieldset.getAttribute("name") : this.elements[0].name
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "id", {
                    get: function () {
                        return this._fieldset && this._fieldset.id ? this._fieldset.id : this.elements[0].id
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "question", {
                    get: function () {
                        return this.questions && this.questions.length > 0 ? this.questions[Math.floor(Math.random() * this.questions.length)] : this.elements[0] && this.elements[0].question ? this.elements[0].question : t.Dictionary.getRobotResponse(this.getGroupTagType())
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "activeElements", {
                    get: function () {
                        return this._activeElements
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "value", {
                    get: function () {
                        return this._values ? this._values : [""]
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "disabled", {
                    get: function () {
                        for (var t = 0, e = 0; e < this.elements.length; e++) {
                            this.elements[e].disabled && t++
                        }
                        return t === this.elements.length
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "errorMessage", {
                    get: function () {
                        for (var e = t.Dictionary.get("input-placeholder-error"), n = 0; n < this.elements.length; n++) {
                            e = this.elements[n].errorMessage
                        }
                        return e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "inputPlaceholder", {
                    get: function () {
                        return this._inputPlaceholder
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.dealloc = function () {
                    for (var t = 0; t < this.elements.length; t++) {
                        this.elements[t].dealloc()
                    }
                    this.elements = null
                }, e.prototype.refresh = function () {
                    for (var t = 0; t < this.elements.length; t++) {
                        this.elements[t].refresh()
                    }
                }, e.prototype.reset = function () {
                    this._values = [];
                    for (var t = 0; t < this.elements.length; t++) {
                        this.elements[t].reset()
                    }
                }, e.prototype.getGroupTagType = function () {
                    return this.elements[0].type
                }, e.prototype.hasConditionsFor = function (t) {
                    for (var e = 0; e < this.elements.length; e++) {
                        if (this.elements[e].hasConditionsFor(t)) return !0
                    }
                    return !1
                }, e.prototype.hasConditions = function () {
                    for (var t = 0; t < this.elements.length; t++) {
                        if (this.elements[t].hasConditions()) return !0
                    }
                    return !1
                }, e.prototype.checkConditionalAndIsValid = function () {
                    for (var t = 0; t < this.elements.length; t++) {
                        this.elements[t].checkConditionalAndIsValid()
                    }
                    return !0
                }, e.prototype.setTagValueAndIsValid = function (t) {
                    var e = !1,
                        n = this.elements[0].type;
                    switch (this._values = [], this._activeElements = [], n) {
                        case "radio":
                            var i = !1,
                                o = [];
                            if (t.controlElements)
                                for (var s = 0; s < t.controlElements.length; s++) {
                                    var r = t.controlElements[s],
                                        a = this.elements[this.elements.indexOf(r.referenceTag)];
                                    o.push(r), a == r.referenceTag && (r.checked && (this._values.push(a.value), this._activeElements.push(a)), !i && r.checked && (i = !0))
                                } else
                                    for (s = 0; s < this.elements.length; s++) {
                                        var l = (a = this.elements[s]).value.toString().toLowerCase(),
                                            c = t.text.toString().toLowerCase(); - 1 === l.indexOf(c) && -1 === c.indexOf(l) || (this._activeElements.push(a), this._values.push(a.value), a.domElement.checked = !0, i = !0)
                                    }
                            e = i;
                            break;
                        case "checkbox":
                            if (e = !0, t.controlElements)
                                for (s = 0; s < t.controlElements.length; s++) {
                                    r = t.controlElements[s];
                                    (a = this.elements[this.elements.indexOf(r.referenceTag)]).domElement.checked = r.checked, r.checked && (this._values.push(a.value), this._activeElements.push(a))
                                }
                            this.required && 0 == this._activeElements.length && (e = !1)
                    }
                    return e
                }, e
            }();
            t.TagGroup = e
        }(o || (o = {}));
        i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            var e = function (t) {
                function e(e) {
                    var n = t.call(this, e) || this;
                    return "text" == n.type || "email" == n.type || "tel" == n.type || "checkbox" == n.type || "radio" == n.type || "password" == n.type || n.type, n
                }
                return i(e, t), e.prototype.findAndSetQuestions = function () {
                    t.prototype.findAndSetQuestions.call(this)
                }, e.prototype.findAndSetLabel = function () {
                    t.prototype.findAndSetLabel.call(this), this._label
                }, e.prototype.setTagValueAndIsValid = function (e) {
                    return "checkbox" == this.type || t.prototype.setTagValueAndIsValid.call(this, e)
                }, e.prototype.dealloc = function () {
                    t.prototype.dealloc.call(this)
                }, e
            }(t.Tag);
            t.InputTag = e
        }(o || (o = {}));
        i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            var e = function (e) {
                function n(n) {
                    var i = e.call(this, n) || this;
                    i.optionTags = [];
                    for (var o = i.domElement.getElementsByTagName("option"), s = 0; s < o.length; s++) {
                        var r = o[s],
                            a = t.Tag.createTag(r);
                        a ? i.optionTags.push(a) : console.warn(i.constructor.name, "option tag invalid:", a)
                    }
                    return i
                }
                return i(n, e), Object.defineProperty(n.prototype, "type", {
                    get: function () {
                        return "select"
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "name", {
                    get: function () {
                        return this.domElement && this.domElement.hasAttribute("name") ? this.domElement.getAttribute("name") : this.optionTags[0].name
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "value", {
                    get: function () {
                        return this._values
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "multipleChoice", {
                    get: function () {
                        return this.domElement.hasAttribute("multiple")
                    },
                    enumerable: !0,
                    configurable: !0
                }), n.prototype.setTagValueAndIsValid = function (t) {
                    var e = !1,
                        n = [];
                    if (this._values = [], t.controlElements)
                        for (var i = 0; i < this.optionTags.length; i++)
                            for (var o = this.optionTags[i], s = 0; s < t.controlElements.length; s++) {
                                var r = t.controlElements[s];
                                r.referenceTag == o && (o.selected = r.selected, !e && o.selected && (e = !0), o.selected && this._values.push(o.value), r.visible && n.push(r))
                            } else {
                                var a = !1;
                                for (i = 0; i < this.optionTags.length; i++) {
                                    var l = (o = this.optionTags[i]).value.toString().toLowerCase(),
                                        c = t.text.toString().toLowerCase(); - 1 === l.indexOf(c) && -1 === c.indexOf(l) || (this._values.push(o.value), o.domElement.checked = !0, a = !0)
                                }
                                e = a
                            }
                    if (!e && 1 == n.length) {
                        var h = n[0];
                        o = this.optionTags[this.optionTags.indexOf(h.referenceTag)];
                        h.selected = !0, o.selected = !0, e = !0, o.selected && this._values.push(o.value)
                    }
                    return e
                }, n
            }(t.Tag);
            t.SelectTag = e
        }(o || (o = {}));
        i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            var e = function (t) {
                function e(e) {
                    var n = t.call(this, e) || this;
                    return "submit" == n.domElement.getAttribute("type") || n.domElement.getAttribute("type"), n
                }
                return i(e, t), e
            }(t.Tag);
            t.ButtonTag = e
        }(o || (o = {}));
        i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            var e = function (e) {
                function n() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return i(n, e), Object.defineProperty(n.prototype, "type", {
                    get: function () {
                        return "option"
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "label", {
                    get: function () {
                        return this.formless ? e.prototype.getLabel.call(this) : t.Helpers.getInnerTextOfElement(this.domElement)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "selected", {
                    get: function () {
                        return this.domElement.hasAttribute("selected")
                    },
                    set: function (t) {
                        this.domElement.selected = t, t ? this.domElement.setAttribute("selected", "selected") : this.domElement.removeAttribute("selected")
                    },
                    enumerable: !0,
                    configurable: !0
                }), n.prototype.setTagValueAndIsValid = function (t) {
                    return !0
                }, n
            }(t.Tag);
            t.OptionTag = e
        }(o || (o = {}));
        i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            var e = function (t) {
                function e(e) {
                    var n = t.call(this, e) || this;
                    return n.skipUserInput = !0, n
                }
                return i(e, t), e.prototype.dealloc = function () {
                    t.prototype.dealloc.call(this)
                }, e
            }(t.Tag);
            t.CfRobotMessageTag = e
        }(o || (o = {}));
        i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            var e = function (e) {
                function o(t) {
                    var n = e.call(this, t) || this;
                    return n.clickCallback = n.onClick.bind(n), n.el.addEventListener("click", n.clickCallback, !1), n.mouseDownCallback = n.onMouseDown.bind(n), n.el.addEventListener("mousedown", n.mouseDownCallback, !1), n.checkForImage(), n
                }
                return i(o, e), Object.defineProperty(o.prototype, "type", {
                    get: function () {
                        return "Button"
                    },
                    enumerable: !0,
                    configurable: !0
                }), o.prototype.hasImage = function () {
                    return this.referenceTag.hasImage
                }, o.prototype.checkForImage = function () {
                    this.hasImage() && (this.el.classList.add("has-image"), this.imgEl = document.createElement("img"), this.imageLoadedCallback = this.onImageLoaded.bind(this), this.imgEl.classList.add("cf-image"), this.imgEl.addEventListener("load", this.imageLoadedCallback, !1), this.imgEl.src = this.referenceTag.domElement.getAttribute("cf-image"), this.el.insertBefore(this.imgEl, this.el.children[0]))
                }, o.prototype.onImageLoaded = function () {
                    this.imgEl.classList.add("loaded"), this.eventTarget.dispatchEvent(new n(t.ControlElementEvents.ON_LOADED, {}))
                }, o.prototype.onMouseDown = function (t) {
                    t.preventDefault()
                }, o.prototype.onClick = function (t) {
                    this.onChoose()
                }, o.prototype.dealloc = function () {
                    this.el.removeEventListener("click", this.clickCallback, !1), this.clickCallback = null, this.imageLoadedCallback && (this.imgEl.removeEventListener("load", this.imageLoadedCallback, !1), this.imageLoadedCallback = null), this.el.removeEventListener("mousedown", this.mouseDownCallback, !1), this.mouseDownCallback = null, e.prototype.dealloc.call(this)
                }, o.prototype.getTemplate = function () {
                    return '<cf-button class="cf-button">\n\t\t\t\t' + this.referenceTag.label + "\n\t\t\t</cf-button>\n\t\t\t"
                }, o
            }(t.ControlElement);
            t.Button = e
        }(o || (o = {}));
        i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            var e = function (t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return i(e, t), Object.defineProperty(e.prototype, "type", {
                    get: function () {
                        return "RadioButton"
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "checked", {
                    get: function () {
                        return this.el.hasAttribute("checked") && "checked" == this.el.getAttribute("checked")
                    },
                    set: function (t) {
                        t ? (this.el.setAttribute("checked", "checked"), this.referenceTag.domElement.setAttribute("checked", "checked"), this.referenceTag.domElement.checked = !0) : (this.el.removeAttribute("checked"), this.referenceTag.domElement.removeAttribute("checked"), this.referenceTag.domElement.checked = !1)
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.onClick = function (e) {
                    this.checked = !0, t.prototype.onClick.call(this, e)
                }, e.prototype.getTemplate = function () {
                    return '<cf-radio-button class="cf-button" ' + (this.referenceTag.domElement.checked || this.referenceTag.domElement.hasAttribute("checked") ? "checked=checked" : "") + ">\n\t\t\t\t<div>\n\t\t\t\t\t<cf-radio></cf-radio>\n\t\t\t\t\t<span>" + this.referenceTag.label + "</span>\n\t\t\t\t</div>\n\t\t\t</cf-radio-button>\n\t\t\t"
                }, e
            }(t.Button);
            t.RadioButton = e
        }(o || (o = {}));
        i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            var e = function (t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return i(e, t), Object.defineProperty(e.prototype, "type", {
                    get: function () {
                        return "CheckboxButton"
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "checked", {
                    get: function () {
                        return "checked" == this.el.getAttribute("checked")
                    },
                    set: function (t) {
                        t ? (this.el.setAttribute("checked", "checked"), this.referenceTag.domElement.setAttribute("checked", "checked"), this.referenceTag.domElement.checked = !0) : (this.el.removeAttribute("checked"), this.referenceTag.domElement.removeAttribute("checked"), this.referenceTag.domElement.checked = !1)
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.onClick = function (t) {
                    this.checked = !this.checked
                }, e.prototype.getTemplate = function () {
                    var t = this.referenceTag.domElement.checked && this.referenceTag.domElement.hasAttribute("checked");
                    return '<cf-button class="cf-button cf-checkbox-button ' + (0 == this.referenceTag.label.trim().length ? "no-text" : "") + '" checked=' + (t ? "checked" : "") + ">\n\t\t\t\t<div>\n\t\t\t\t\t<cf-checkbox></cf-checkbox>\n\t\t\t\t\t<span>" + this.referenceTag.label + "</span>\n\t\t\t\t</div>\n\t\t\t</cf-button>\n\t\t\t"
                }, e
            }(t.Button);
            t.CheckboxButton = e
        }(o || (o = {}));
        i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            t.OptionButtonEvents = {
                CLICK: "cf-option-button-click"
            };
            var e = function (e) {
                function o() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.isMultiChoice = !1, t
                }
                return i(o, e), Object.defineProperty(o.prototype, "type", {
                    get: function () {
                        return "OptionButton"
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "selected", {
                    get: function () {
                        return this.el.hasAttribute("selected")
                    },
                    set: function (t) {
                        t ? this.el.setAttribute("selected", "selected") : this.el.removeAttribute("selected")
                    },
                    enumerable: !0,
                    configurable: !0
                }), o.prototype.setData = function (t) {
                    this.isMultiChoice = t.isMultiChoice, e.prototype.setData.call(this, t)
                }, o.prototype.onClick = function (e) {
                    t.ConversationalForm.illustrateFlow(this, "dispatch", t.OptionButtonEvents.CLICK, this), this.eventTarget.dispatchEvent(new n(t.OptionButtonEvents.CLICK, {
                        detail: this
                    }))
                }, o.prototype.getTemplate = function () {
                    var t = '<cf-button class="cf-button ' + (this.isMultiChoice ? "cf-checkbox-button" : "") + '" ' + (this.referenceTag.domElement.selected ? "selected='selected'" : "") + ">";
                    return t += "<div>", this.isMultiChoice && (t += "<cf-checkbox></cf-checkbox>"), t += this.referenceTag.label, t += "</div>", t += "</cf-button>"
                }, o
            }(t.Button);
            t.OptionButton = e
        }(o || (o = {})),
        function (t) {
            var e = function () {
                function e(e) {
                    this.context = e.context, this.eventTarget = e.eventTarget, this.referenceTag = e.referenceTag, this.multiChoice = this.referenceTag.domElement.hasAttribute("multiple"), this.onOptionButtonClickCallback = this.onOptionButtonClick.bind(this), this.eventTarget.addEventListener(t.OptionButtonEvents.CLICK, this.onOptionButtonClickCallback, !1), this.createElements()
                }
                return Object.defineProperty(e.prototype, "type", {
                    get: function () {
                        return "OptionsList"
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.getValue = function () {
                    for (var t = [], e = 0; e < this.elements.length; e++) {
                        var n = this.elements[e];
                        if (!this.multiChoice && n.selected) return t.push(n), t;
                        this.multiChoice && n.selected && t.push(n)
                    }
                    return t
                }, e.prototype.onOptionButtonClick = function (e) {
                    if (this.multiChoice) e.detail.selected = !e.detail.selected;
                    else {
                        for (var i = 0; i < this.elements.length; i++) {
                            var o = this.elements[i];
                            o != e.detail ? o.selected = !1 : o.selected = !0
                        }
                        t.ConversationalForm.illustrateFlow(this, "dispatch", t.ControlElementEvents.SUBMIT_VALUE, this.referenceTag), this.eventTarget.dispatchEvent(new n(t.ControlElementEvents.SUBMIT_VALUE, {
                            detail: e.detail
                        }))
                    }
                }, e.prototype.createElements = function () {
                    this.elements = [];
                    for (var e = this.referenceTag.optionTags, n = 0; n < e.length; n++) {
                        var i = e[n],
                            o = new t.OptionButton({
                                referenceTag: i,
                                isMultiChoice: this.referenceTag.multipleChoice,
                                eventTarget: this.eventTarget
                            });
                        this.elements.push(o), this.context.appendChild(o.el)
                    }
                }, e.prototype.dealloc = function () {
                    for (this.eventTarget.removeEventListener(t.OptionButtonEvents.CLICK, this.onOptionButtonClickCallback, !1), this.onOptionButtonClickCallback = null; this.elements.length > 0;) this.elements.pop().dealloc();
                    this.elements = null
                }, e
            }();
            t.OptionsList = e
        }(o || (o = {}));
        i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            var e = function (e) {
                function o(n) {
                    var i = e.call(this, n) || this;
                    if (i.maxFileSize = 1e11, i.loading = !1, i.submitTimer = 0, i._fileName = "", i._readerResult = "", !t.Helpers.caniuse.fileReader()) throw new Error("Conversational Form Error: No FileReader available for client.");
                    var o = i.referenceTag.domElement.getAttribute("cf-max-size") || i.referenceTag.domElement.getAttribute("max-size");
                    if (o) {
                        var s = parseInt(o, 10);
                        i.maxFileSize = s
                    }
                    return i.progressBar = i.el.getElementsByTagName("cf-upload-file-progress-bar")[0], i.onDomElementChangeCallback = i.onDomElementChange.bind(i), i.referenceTag.domElement.addEventListener("change", i.onDomElementChangeCallback, !1), i
                }
                return i(o, e), Object.defineProperty(o.prototype, "value", {
                    get: function () {
                        return this.referenceTag.domElement.value
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "readerResult", {
                    get: function () {
                        return this._readerResult
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "files", {
                    get: function () {
                        return this._files
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "fileName", {
                    get: function () {
                        return this._fileName
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "type", {
                    get: function () {
                        return "UploadFileUI"
                    },
                    enumerable: !0,
                    configurable: !0
                }), o.prototype.getFilesAsString = function () {
                    var e = document.createElement("span");
                    return e.innerHTML = t.Dictionary.get("icon-type-file") + this.fileName, e.outerHTML
                }, o.prototype.onDomElementChange = function (e) {
                    var i = this;
                    t.ConversationalForm.suppressLog || console.log("...onDomElementChange");
                    var o = new FileReader;
                    this._files = this.referenceTag.domElement.files, o.onerror = function (e) {
                        t.ConversationalForm.suppressLog || console.log("onerror", e)
                    }, o.onprogress = function (e) {
                        t.ConversationalForm.suppressLog || console.log("onprogress", e), i.progressBar.style.width = e.loaded / e.total * 100 + "%"
                    }, o.onabort = function (e) {
                        t.ConversationalForm.suppressLog || console.log("onabort", e)
                    }, o.onloadstart = function (e) {
                        var s = i.files[0],
                            r = s ? s.size : i.maxFileSize + 1;
                        if (r > i.maxFileSize) {
                            o.abort();
                            var a = {
                                errorText: t.Dictionary.get("input-placeholder-file-size-error")
                            };
                            t.ConversationalForm.illustrateFlow(i, "dispatch", t.FlowEvents.USER_INPUT_INVALID, a), i.eventTarget.dispatchEvent(new n(t.FlowEvents.USER_INPUT_INVALID, {
                                detail: a
                            }))
                        } else {
                            i._fileName = s.name, i.loading = !0, i.animateIn();
                            var l = Math.floor(Math.log(r) / Math.log(1024)),
                                c = ["b", "kb", "mb", "gb"];
                            l = Math.min(c.length - 1, l);
                            var h = 1 * Number((r / Math.pow(1024, l)).toFixed(2)) + " " + c[l],
                                u = s.name + " (" + h + ")";
                            i.el.getElementsByTagName("cf-upload-file-text")[0].innerHTML = u, i.eventTarget.dispatchEvent(new n(t.ControlElementEvents.PROGRESS_CHANGE, {
                                detail: t.ControlElementProgressStates.BUSY
                            }))
                        }
                    }, o.onload = function (e) {
                        i._readerResult = e.target.result, i.progressBar.classList.add("loaded"), i.submitTimer = setTimeout(function () {
                            i.el.classList.remove("animate-in"), i.onChoose(), i.eventTarget.dispatchEvent(new n(t.ControlElementEvents.PROGRESS_CHANGE, {
                                detail: t.ControlElementProgressStates.READY
                            }))
                        }, 0)
                    }, o.readAsDataURL(this.files[0])
                }, o.prototype.animateIn = function () {
                    this.loading && e.prototype.animateIn.call(this)
                }, o.prototype.onClick = function (t) {}, o.prototype.triggerFileSelect = function () {
                    this.referenceTag.domElement.click()
                }, o.prototype.dealloc = function () {
                    clearTimeout(this.submitTimer), this.progressBar = null, this.onDomElementChangeCallback && (this.referenceTag.domElement.removeEventListener("change", this.onDomElementChangeCallback, !1), this.onDomElementChangeCallback = null), e.prototype.dealloc.call(this)
                }, o.prototype.getTemplate = function () {
                    "1" == this.referenceTag.value || this.referenceTag.domElement.hasAttribute("checked");
                    return "<cf-upload-file-ui>\n\t\t\t\t<cf-upload-file-text></cf-upload-file-text>\n\t\t\t\t<cf-upload-file-progress>\n\t\t\t\t\t<cf-upload-file-progress-bar></cf-upload-file-progress-bar>\n\t\t\t\t</cf-upload-file-progress>\n\t\t\t</cf-upload-file-ui>\n\t\t\t"
                }, o
            }(t.Button);
            t.UploadFileUI = e
        }(o || (o = {})),
        function (t) {
            t.MicrophoneBridgeEvent = {
                ERROR: "cf-microphone-bridge-error",
                TERMNIAL_ERROR: "cf-microphone-bridge-terminal-error"
            };
            var e = function () {
                function e(e) {
                    this.currentTextResponse = "", this._hasUserMedia = !1, this.inputErrorCount = 0, this.inputCurrentError = "", this.el = e.el, this.button = e.button, this.eventTarget = e.eventTarget, this.microphoneObj = e.microphoneObj, this.flowUpdateCallback = this.onFlowUpdate.bind(this), this.eventTarget.addEventListener(t.FlowEvents.FLOW_UPDATE, this.flowUpdateCallback, !1)
                }
                return Object.defineProperty(e.prototype, "hasUserMedia", {
                    set: function (t) {
                        this._hasUserMedia = t
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "active", {
                    set: function (t) {
                        this.equalizer && (this.equalizer.disabled = !t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.cancel = function () {
                    this.button.loading = !1, this.microphoneObj.cancelInput && this.microphoneObj.cancelInput()
                }, e.prototype.onFlowUpdate = function () {
                    var t = this;
                    if (this.currentTextResponse = null, this._hasUserMedia) this.microphoneObj.awaitingCallback || this.callInput();
                    else {
                        var e = !1;
                        window.navigator.mediaDevices && window.navigator.mediaDevices.enumerateDevices().then(function (n) {
                            n.forEach(function (t) {
                                e || "" === t.label || (e = !0)
                            }), e && t.getUserMedia()
                        })
                    }
                }, e.prototype.getUserMedia = function () {
                    var e = this;
                    try {
                        void 0 === navigator.mediaDevices && (navigator.mediaDevices = {}), void 0 === navigator.mediaDevices.getUserMedia && (navigator.mediaDevices.getUserMedia = function (t) {
                            var e = navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;
                            return e ? new Promise(function (n, i) {
                                e.call(navigator, t, n, i)
                            }) : Promise.reject(new Error("getUserMedia is not implemented in this browser"))
                        }), navigator.mediaDevices.getUserMedia({
                            audio: !0
                        }).then(function (t) {
                            e.currentStream = t, t.getAudioTracks().length > 0 ? (e.hasUserMedia = !0, e.setupEqualizer(), e.microphoneObj.awaitingCallback || e.callInput()) : e.hasUserMedia = !1
                        }).catch(function (n) {
                            e.hasUserMedia = !1, e.eventTarget.dispatchEvent(new Event(t.MicrophoneBridgeEvent.TERMNIAL_ERROR))
                        })
                    } catch (n) {
                        this.hasUserMedia = !1, this.eventTarget.dispatchEvent(new Event(t.MicrophoneBridgeEvent.TERMNIAL_ERROR))
                    }
                }, e.prototype.dealloc = function () {
                    this.cancel(), this.promise = null, this.currentStream = null, this.equalizer && this.equalizer.dealloc(), this.equalizer = null, this.eventTarget.removeEventListener(t.FlowEvents.FLOW_UPDATE, this.flowUpdateCallback, !1), this.flowUpdateCallback = null
                }, e.prototype.callInput = function (e) {
                    var i = this;
                    void 0 === e && (e = 0), this.button.loading = !0, this.equalizer && (this.equalizer.disabled = !1), this.promise = new Promise(function (t, e) {
                        return i.microphoneObj.input(t, e, i.currentStream)
                    }).then(function (e) {
                        if (i.promise = null, i.currentTextResponse = e.toString(), !i.currentTextResponse || "" == i.currentTextResponse) return i.showError(t.Dictionary.get("user-audio-reponse-invalid")), void i.callInput();
                        i.inputErrorCount = 0, i.inputCurrentError = "", i.button.loading = !1;
                        var o = {
                            text: i.currentTextResponse
                        };
                        t.ConversationalForm.illustrateFlow(i, "dispatch", t.UserInputEvents.SUBMIT, o), i.eventTarget.dispatchEvent(new n(t.UserInputEvents.SUBMIT, {
                            detail: o
                        }))
                    }).catch(function (e) {
                        i.isErrorTerminal(e) ? (i.eventTarget.dispatchEvent(new n(t.MicrophoneBridgeEvent.TERMNIAL_ERROR, {
                            detail: t.Dictionary.get("microphone-terminal-error")
                        })), t.ConversationalForm.suppressLog || console.log("Conversational Form: Terminal error: ", e)) : (i.inputCurrentError != e && (i.inputErrorCount = 0, i.inputCurrentError = e), i.inputErrorCount++, i.inputErrorCount > 2 ? i.showError(e) : (i.eventTarget.dispatchEvent(new n(t.MicrophoneBridgeEvent.TERMNIAL_ERROR, {
                            detail: t.Dictionary.get("microphone-terminal-error")
                        })), t.ConversationalForm.suppressLog || console.log("Conversational Form: Terminal error: ", e)))
                    })
                }, e.prototype.isErrorTerminal = function (t) {
                    return -1 !== ["network"].indexOf(t)
                }, e.prototype.showError = function (e) {
                    var i = {
                        errorText: e
                    };
                    t.ConversationalForm.illustrateFlow(this, "dispatch", t.FlowEvents.USER_INPUT_INVALID, i), this.eventTarget.dispatchEvent(new n(t.FlowEvents.USER_INPUT_INVALID, {
                        detail: i
                    })), this.callInput()
                }, e.prototype.setupEqualizer = function () {
                    var t = this.el.getElementsByTagName("cf-icon-audio-eq")[0];
                    i.supported && t && (this.equalizer = new i({
                        stream: this.currentStream,
                        elementToScale: t
                    }))
                }, e
            }();
            t.MicrophoneBridge = e;
            var i = function () {
                function t(t) {
                    var e = this;
                    this.maxBorderWidth = 0, this._disabled = !1, this.elementToScale = t.elementToScale, this.context = new AudioContext, this.analyser = this.context.createAnalyser(), this.mic = this.context.createMediaStreamSource(t.stream), this.javascriptNode = this.context.createScriptProcessor(2048, 1, 1), this.analyser.smoothingTimeConstant = .3, this.analyser.fftSize = 1024, this.mic.connect(this.analyser), this.analyser.connect(this.javascriptNode), this.javascriptNode.connect(this.context.destination), this.javascriptNode.onaudioprocess = function () {
                        e.onAudioProcess()
                    }
                }
                return Object.defineProperty(t.prototype, "disabled", {
                    set: function (t) {
                        this._disabled = t, this.elementToScale.style.borderWidth = "0px"
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.onAudioProcess = function () {
                    if (!this._disabled) {
                        var t = new Uint8Array(this.analyser.frequencyBinCount);
                        this.analyser.getByteFrequencyData(t);
                        for (var e = 0, n = t.length, i = 0; i < n; i++) e += t[i];
                        var o = e / n,
                            s = Math.min(1, Math.max(0, 1 - (50 - o) / 50));
                        this.maxBorderWidth || (this.maxBorderWidth = .5 * this.elementToScale.offsetWidth), this.elementToScale.style.borderWidth = this.maxBorderWidth * s + "px"
                    }
                }, t.prototype.dealloc = function () {
                    this.javascriptNode.onaudioprocess = null, this.javascriptNode = null, this.analyser = null, this.mic = null, this.elementToScale = null, this.context = null
                }, t.supported = function () {
                    return window.AudioContext = window.AudioContext || window.webkitAudioContext, !!window.AudioContext
                }, t
            }()
        }(o || (o = {})),
        function (t) {
            t.UserInputSubmitButtonEvents = {
                CHANGE: "userinput-submit-button-change-value"
            };
            var e = function () {
                function e(e) {
                    this._active = !0, this.eventTarget = e.eventTarget;
                    var n = document.createElement("template");
                    n.innerHTML = this.getTemplate(), this.el = n.firstChild || n.content.firstChild, this.onClickCallback = this.onClick.bind(this), this.el.addEventListener("click", this.onClickCallback, !1), this.onMicrophoneTerminalErrorCallback = this.onMicrophoneTerminalError.bind(this), this.eventTarget.addEventListener(t.MicrophoneBridgeEvent.TERMNIAL_ERROR, this.onMicrophoneTerminalErrorCallback, !1)
                }
                return Object.defineProperty(e.prototype, "typing", {
                    get: function () {
                        return this.el.classList.contains("typing")
                    },
                    set: function (t) {
                        t ? (this.el.classList.add("typing"), this.loading = !1, this.mic && this.mic.cancel()) : (this.el.classList.remove("typing"), this.mic && this.mic.callInput())
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "active", {
                    get: function () {
                        return this._active
                    },
                    set: function (t) {
                        this._active = t, this.mic && (this.mic.active = t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "loading", {
                    get: function () {
                        return this.el.classList.contains("loading")
                    },
                    set: function (t) {
                        t ? this.el.classList.add("loading") : this.el.classList.remove("loading")
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.addMicrophone = function (e) {
                    this.el.classList.add("microphone-interface");
                    var n = document.createElement("template");
                    n.innerHTML = '<div class="cf-input-icons cf-microphone">\n\t\t\t\t<div class="cf-icon-audio"></div>\n\t\t\t\t<cf-icon-audio-eq></cf-icon-audio-eq>\n\t\t\t</div>';
                    var i = n.firstChild || n.content.firstChild;
                    this.mic = new t.MicrophoneBridge({
                        el: i,
                        button: this,
                        eventTarget: this.eventTarget,
                        microphoneObj: e
                    }), this.el.appendChild(i)
                }, e.prototype.reset = function () {
                    this.mic && !this.typing && this.mic.callInput()
                }, e.prototype.getTemplate = function () {
                    return '<cf-input-button class="cf-input-button">\n\t\t\t\t\t\t<div class="cf-input-icons">\n\t\t\t\t\t\t\t<div class="cf-icon-progress"></div>\n\t\t\t\t\t\t\t<div class="cf-icon-attachment"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</cf-input-button>'
                }, e.prototype.onMicrophoneTerminalError = function (e) {
                    this.mic && (this.mic.dealloc(), this.mic = null, this.el.removeChild(this.el.getElementsByClassName("cf-microphone")[0]), this.el.classList.remove("microphone-interface"), this.loading = !1, this.eventTarget.dispatchEvent(new n(t.FlowEvents.USER_INPUT_INVALID, {
                        detail: {
                            errorText: e.detail
                        }
                    })))
                }, e.prototype.onClick = function (e) {
                    this.mic && !this.typing ? this.mic.callInput() : this.eventTarget.dispatchEvent(new n(t.UserInputSubmitButtonEvents.CHANGE))
                }, e.prototype.click = function () {
                    this.el.click()
                }, e.prototype.dealloc = function () {
                    this.eventTarget.removeEventListener(t.MicrophoneBridgeEvent.TERMNIAL_ERROR, this.onMicrophoneTerminalErrorCallback, !1), this.onMicrophoneTerminalErrorCallback = null, this.mic && this.mic.dealloc(), this.mic = null, this.el.removeEventListener("click", this.onClickCallback, !1), this.onClickCallback = null, this.el = null, this.eventTarget = null
                }, e
            }();
            t.UserInputSubmitButton = e
        }(o || (o = {})),
        function (t) {
            t.UserInputTypes = {
                VOICE: "voice",
                VR_GESTURE: "vr-gesture",
                TEXT: "text"
            }
        }(o || (o = {}));
        i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            var e = function (e) {
                function n(n) {
                    var i = e.call(this, n) || this;
                    return i._disabled = !1, i._visible = !1, i.onChatReponsesUpdatedCallback = i.onChatReponsesUpdated.bind(i), i.eventTarget.addEventListener(t.ChatListEvents.CHATLIST_UPDATED, i.onChatReponsesUpdatedCallback, !1), i.windowFocusCallback = i.windowFocus.bind(i), window.addEventListener("focus", i.windowFocusCallback, !1), i.inputInvalidCallback = i.inputInvalid.bind(i), i.eventTarget.addEventListener(t.FlowEvents.USER_INPUT_INVALID, i.inputInvalidCallback, !1), i.flowUpdateCallback = i.onFlowUpdate.bind(i), i.eventTarget.addEventListener(t.FlowEvents.FLOW_UPDATE, i.flowUpdateCallback, !1), i
                }
                return i(n, e), Object.defineProperty(n.prototype, "currentTag", {
                    get: function () {
                        return this._currentTag
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "visible", {
                    set: function (t) {
                        var e = this;
                        this._visible = t, !this.el.classList.contains("animate-in") && t ? setTimeout(function () {
                            e.el.classList.add("animate-in")
                        }, 0) : this.el.classList.contains("animate-in") && !t && this.el.classList.remove("animate-in")
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "disabled", {
                    get: function () {
                        return this._disabled
                    },
                    set: function (t) {
                        this._disabled != t && (this._disabled = t, t ? this.el.setAttribute("disabled", "disabled") : (this.setFocusOnInput(), this.el.removeAttribute("disabled")))
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(n.prototype, "height", {
                    get: function () {
                        var e = 0,
                            n = 0,
                            i = this.el;
                        return t.Helpers.isInternetExlorer() ? (e = i.offsetHeight, n = parseInt(i.currentStyle.marginTop, 10) + parseInt(i.currentStyle.marginBottom, 10), n *= 2) : (e = parseInt(document.defaultView.getComputedStyle(i, "").getPropertyValue("height"), 10), n = parseInt(document.defaultView.getComputedStyle(i, "").getPropertyValue("margin-top")) + parseInt(document.defaultView.getComputedStyle(i, "").getPropertyValue("margin-bottom"))), e + n
                    },
                    enumerable: !0,
                    configurable: !0
                }), n.prototype.onEnterOrSubmitButtonSubmit = function (t) {
                    void 0 === t && (t = null)
                }, n.prototype.inputInvalid = function (t) {}, n.prototype.deactivate = function () {
                    this.disabled = !0
                }, n.prototype.reactivate = function () {
                    this.disabled = !1
                }, n.prototype.getFlowDTO = function () {}, n.prototype.setFocusOnInput = function () {}, n.prototype.onFlowStopped = function () {}, n.prototype.reset = function () {}, n.prototype.dealloc = function () {
                    this.eventTarget.removeEventListener(t.ChatListEvents.CHATLIST_UPDATED, this.onChatReponsesUpdatedCallback, !1), this.onChatReponsesUpdatedCallback = null, this.eventTarget.removeEventListener(t.FlowEvents.USER_INPUT_INVALID, this.inputInvalidCallback, !1), this.inputInvalidCallback = null, window.removeEventListener("focus", this.windowFocusCallback, !1), this.windowFocusCallback = null, this.eventTarget.removeEventListener(t.FlowEvents.FLOW_UPDATE, this.flowUpdateCallback, !1), this.flowUpdateCallback = null, e.prototype.dealloc.call(this)
                }, n.prototype.onFlowUpdate = function (e) {
                    t.ConversationalForm.illustrateFlow(this, "receive", e.type, e.detail), this._currentTag = e.detail.tag
                }, n.prototype.windowFocus = function (t) {}, n.prototype.onChatReponsesUpdated = function (t) {
                    t.detail.currentResponse.isRobotResponse || (this.visible = !0, this.disabled = !1, this.setFocusOnInput())
                }, n.ERROR_TIME = 2e3, n.preventAutoFocus = !1, n.hideUserInputOnNoneTextInput = !1, n
            }(t.BasicElement);
            t.UserInputElement = e, t.UserInputEvents = {
                SUBMIT: "cf-input-user-input-submit",
                KEY_CHANGE: "cf-input-key-change",
                CONTROL_ELEMENTS_ADDED: "cf-input-control-elements-added",
                HEIGHT_CHANGE: "cf-input-height-change",
                FOCUS: "cf-input-focus",
                BLUR: "cf-input-blur"
            }
        }(o || (o = {}));
        i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            var e = function (e) {
                function o(n) {
                    var i = e.call(this, n) || this;
                    return i.initialInputHeight = 0, i.shiftIsDown = !1, i._active = !1, i.cfReference = n.cfReference, i.eventTarget = n.eventTarget, i.inputElement = i.el.getElementsByTagName("textarea")[0], i.onInputFocusCallback = i.onInputFocus.bind(i), i.onInputBlurCallback = i.onInputBlur.bind(i), i.inputElement.addEventListener("focus", i.onInputFocusCallback, !1), i.inputElement.addEventListener("blur", i.onInputBlurCallback, !1), t.ConversationalForm.animationsEnabled || i.inputElement.setAttribute("no-animations", ""), i.controlElements = new t.ControlElements({
                        el: i.el.getElementsByTagName("cf-input-control-elements")[0],
                        cfReference: i.cfReference,
                        infoEl: i.el.getElementsByTagName("cf-info")[0],
                        eventTarget: i.eventTarget
                    }), i.keyUpCallback = i.onKeyUp.bind(i), document.addEventListener("keyup", i.keyUpCallback, !1), i.keyDownCallback = i.onKeyDown.bind(i), document.addEventListener("keydown", i.keyDownCallback, !1), i.onOriginalTagChangedCallback = i.onOriginalTagChanged.bind(i), i.eventTarget.addEventListener(t.TagEvents.ORIGINAL_ELEMENT_CHANGED, i.onOriginalTagChangedCallback, !1), i.onControlElementSubmitCallback = i.onControlElementSubmit.bind(i), i.eventTarget.addEventListener(t.ControlElementEvents.SUBMIT_VALUE, i.onControlElementSubmitCallback, !1), i.onControlElementProgressChangeCallback = i.onControlElementProgressChange.bind(i), i.eventTarget.addEventListener(t.ControlElementEvents.PROGRESS_CHANGE, i.onControlElementProgressChangeCallback, !1), i.onSubmitButtonChangeStateCallback = i.onSubmitButtonChangeState.bind(i), i.eventTarget.addEventListener(t.UserInputSubmitButtonEvents.CHANGE, i.onSubmitButtonChangeStateCallback, !1), i.submitButton = new t.UserInputSubmitButton({
                        eventTarget: i.eventTarget
                    }), i.el.querySelector("div").appendChild(i.submitButton.el), n.microphoneInputObj && (i.microphoneObj = n.microphoneInputObj, i.microphoneObj && i.microphoneObj.init && i.microphoneObj.init(), i.submitButton.addMicrophone(i.microphoneObj)), i
                }
                return i(o, e), Object.defineProperty(o.prototype, "active", {
                    get: function () {
                        return this.inputElement === document.activeElement || this._active
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "disabled", {
                    set: function (e) {
                        var n = this._disabled != e;
                        t.ConversationalForm.suppressLog || console.log("option hasChanged", e), n && (this._disabled = e, e ? (this.el.setAttribute("disabled", "disabled"), this.inputElement.blur()) : (this.setFocusOnInput(), this.el.removeAttribute("disabled")))
                    },
                    enumerable: !0,
                    configurable: !0
                }), o.prototype.getInputValue = function () {
                    var t = this.inputElement.value,
                        e = document.createElement("div");
                    return e.appendChild(document.createTextNode(t)), e.innerHTML
                }, o.prototype.getFlowDTO = function () {
                    var t;
                    return (t = this.controlElements && this.controlElements.active ? this.controlElements.getDTO() : {
                        text: this.getInputValue()
                    }).tag || (t.tag = this.currentTag), t.input = this, t.tag = this.currentTag, t
                }, o.prototype.reset = function () {
                    this.controlElements && this.controlElements.clearTagsAndReset()
                }, o.prototype.deactivate = function () {
                    e.prototype.deactivate.call(this), this.microphoneObj && (this.submitButton.active = !1)
                }, o.prototype.reactivate = function () {
                    e.prototype.reactivate.call(this), this.microphoneObj && !this.submitButton.typing && (this.submitButton.loading = !0, this.submitButton.typing = !1, this.submitButton.active = !0)
                }, o.prototype.onFlowStopped = function () {
                    this.submitButton.loading = !1, this.submitButton.typing && (this.submitButton.typing = !1), this.controlElements && this.controlElements.clearTagsAndReset(), this.disabled = !0
                }, o.prototype.onOriginalTagChanged = function (t) {
                    this.currentTag == t.detail.tag && this.onInputChange(), this.controlElements && this.controlElements.active && this.controlElements.updateStateOnElementsFromTag(t.detail.tag)
                }, o.prototype.onInputChange = function () {
                    if (this.active || this.controlElements.active) {
                        var e = Math.max(this.initialInputHeight, parseInt(this.inputElement.style.height, 10));
                        this.inputElement.style.height = "0px", this.inputElement.style.height = (0 === this.inputElement.scrollHeight ? e : this.inputElement.scrollHeight) + "px", t.ConversationalForm.illustrateFlow(this, "dispatch", t.UserInputEvents.HEIGHT_CHANGE), this.eventTarget.dispatchEvent(new n(t.UserInputEvents.HEIGHT_CHANGE, {
                            detail: this.inputElement.scrollHeight
                        }))
                    }
                }, o.prototype.resetInputHeight = function () {
                    "1" === this.inputElement.getAttribute("rows") ? this.inputElement.style.height = this.initialInputHeight + "px" : this.inputElement.style.height = "0px"
                }, o.prototype.inputInvalid = function (e) {
                    var n = this;
                    t.ConversationalForm.illustrateFlow(this, "receive", e.type, e.detail);
                    var i = e.detail;
                    this.inputElement.setAttribute("data-value", this.inputElement.value), this.inputElement.value = "", this.el.setAttribute("error", ""), this.disabled = !0, this.inputElement.setAttribute("placeholder", i.errorText || (this._currentTag ? this._currentTag.errorMessage : "")), clearTimeout(this.errorTimer), this.submitButton.loading = !1, this.errorTimer = setTimeout(function () {
                        n.disabled = !1, t.ConversationalForm.suppressLog || console.log("option, disabled 1"), n.el.removeAttribute("error"), n.inputElement.value = n.inputElement.getAttribute("data-value"), n.inputElement.setAttribute("data-value", ""), n.setPlaceholder(), n.setFocusOnInput(), n.submitButton.reset(), n.controlElements && n.controlElements.resetAfterErrorMessage()
                    }, t.UserInputElement.ERROR_TIME)
                }, o.prototype.setPlaceholder = function () {
                    this._currentTag ? this._currentTag.inputPlaceholder ? this.inputElement.setAttribute("placeholder", this._currentTag.inputPlaceholder) : this.inputElement.setAttribute("placeholder", "group" == this._currentTag.type ? t.Dictionary.get("group-placeholder") : t.Dictionary.get("input-placeholder")) : this.inputElement.setAttribute("placeholder", t.Dictionary.get("group-placeholder"))
                }, o.prototype.checkForCorrectInputTag = function () {
                    var t = this.tagType(this._currentTag);
                    if (this.inputElement && this.inputElement.tagName !== t && (this.inputElement.removeEventListener("focus", this.onInputFocusCallback, !1), this.inputElement.removeEventListener("blur", this.onInputBlurCallback, !1)), this.removeAttribute("autocomplete"), this.removeAttribute("list"), "INPUT" === t) {
                        var e = document.createElement("input");
                        Array.prototype.slice.call(this.inputElement.attributes).forEach(function (t) {
                            e.setAttribute(t.name, t.value)
                        }), "password" === this.inputElement.type && e.setAttribute("autocomplete", "new-password"), this._currentTag.domElement.hasAttribute("autocomplete") && e.setAttribute("autocomplete", this._currentTag.domElement.getAttribute("autocomplete")), this._currentTag.domElement.hasAttribute("list") && e.setAttribute("list", this._currentTag.domElement.getAttribute("list")), this.inputElement.parentNode.replaceChild(e, this.inputElement), this.inputElement = e
                    } else if (this.inputElement && this.inputElement.tagName !== t) {
                        var n = document.createElement("textarea");
                        Array.prototype.slice.call(this.inputElement.attributes).forEach(function (t) {
                            n.setAttribute(t.name, t.value)
                        }), this.inputElement.parentNode.replaceChild(n, this.inputElement), this.inputElement = n
                    }
                    this.inputElement && this.inputElement.tagName !== t && (this.inputElement.addEventListener("focus", this.onInputFocusCallback, !1), this.inputElement.addEventListener("blur", this.onInputBlurCallback, !1)), 0 == this.initialInputHeight && (this.initialInputHeight = this.inputElement.offsetHeight), this.setFocusOnInput()
                }, o.prototype.removeAttribute = function (t) {
                    this.inputElement && this.inputElement.hasAttribute(t) && this.inputElement.removeAttribute(t)
                }, o.prototype.tagType = function (t) {
                    return t.domElement && t.domElement.tagName ? "TEXTAREA" === t.domElement.tagName || t.domElement.hasAttribute("rows") && parseInt(t.domElement.getAttribute("rows"), 10) > 1 ? "TEXTAREA" : "INPUT" === t.domElement.tagName ? "INPUT" : "TEXTAREA" : "TEXTAREA"
                }, o.prototype.onFlowUpdate = function (n) {
                    var i = this;
                    e.prototype.onFlowUpdate.call(this, n), this.submitButton.loading = !1, this.submitButton.typing && (this.submitButton.typing = !1), this.el.setAttribute("tag-type", this._currentTag.type), this.checkForCorrectInputTag();
                    var o = -1 !== ["password", "number", "email", "tel"].indexOf(this._currentTag.type);
                    this.inputElement.setAttribute("type", o ? this._currentTag.type : "input"), clearTimeout(this.errorTimer), this.el.removeAttribute("error"), this.inputElement.setAttribute("data-value", ""), this.inputElement.value = "", this.submitButton.loading = !1, this.setPlaceholder(), this.resetValue(), this.setFocusOnInput(), this.controlElements.reset(), "group" == this._currentTag.type ? this.buildControlElements(this._currentTag.elements) : this.buildControlElements([this._currentTag]), this._currentTag.defaultValue && (this.inputElement.value = this._currentTag.defaultValue.toString()), !0 === this._currentTag.skipUserInput ? this.el.classList.add("hide-input") : this.el.classList.remove("hide-input"), this._currentTag.rows && this._currentTag.rows > 1 && this.inputElement.setAttribute("rows", this._currentTag.rows.toString()), t.UserInputElement.hideUserInputOnNoneTextInput && (this.controlElements.active ? (this.el.classList.add("hide-input"), this.controlElements.focusFrom("bottom")) : this.el.classList.remove("hide-input")), this.resetInputHeight(), setTimeout(function () {
                        i.onInputChange()
                    }, 300)
                }, o.prototype.onControlElementProgressChange = function (e) {
                    var n = e.detail;
                    this.disabled = n == t.ControlElementProgressStates.BUSY, t.ConversationalForm.suppressLog || console.log("option, disabled 2")
                }, o.prototype.buildControlElements = function (t) {
                    this.controlElements.buildTags(t)
                }, o.prototype.onControlElementSubmit = function (e) {
                    t.ConversationalForm.illustrateFlow(this, "receive", e.type, e.detail);
                    var n = e.detail;
                    this.controlElements.updateStateOnElements(n), this.doSubmit()
                }, o.prototype.onSubmitButtonChangeState = function (t) {
                    this.onEnterOrSubmitButtonSubmit(t)
                }, o.prototype.isMetaKeyPressed = function (t) {
                    !t.metaKey && [91, 93].indexOf(t.keyCode)
                }, o.prototype.onKeyDown = function (e) {
                    (this.active || this.controlElements.focus) && (this.isControlElementsActiveAndUserInputHidden() || this.isMetaKeyPressed(e) || (e.keyCode == t.Dictionary.keyCodes.shift && (this.shiftIsDown = !0), !0 === this.cfReference.preventSubmitOnEnter && this.inputElement.hasAttribute("rows") && parseInt(this.inputElement.getAttribute("rows")) > 1 || e.keyCode != t.Dictionary.keyCodes.enter || e.shiftKey || e.preventDefault()))
                }, o.prototype.isControlElementsActiveAndUserInputHidden = function () {
                    return this.controlElements && this.controlElements.active && t.UserInputElement.hideUserInputOnNoneTextInput
                }, o.prototype.onKeyUp = function (e) {
                    if ((this.active || this.isControlElementsActiveAndUserInputHidden() || this.controlElements.focus) && !this.isMetaKeyPressed(e)) {
                        if (e.keyCode == t.Dictionary.keyCodes.shift) this.shiftIsDown = !1;
                        else if (e.keyCode == t.Dictionary.keyCodes.up) e.preventDefault(), this.active && !this.controlElements.focus && this.controlElements.focusFrom("bottom");
                        else if (e.keyCode == t.Dictionary.keyCodes.down) e.preventDefault(), this.active && !this.controlElements.focus && this.controlElements.focusFrom("top");
                        else if (e.keyCode == t.Dictionary.keyCodes.tab) {
                            for (var n = !1, i = e.target.parentNode; null != i;) {
                                if (i === this.cfReference.el) {
                                    n = !0;
                                    break
                                }
                                i = i.parentNode
                            }
                            n || (e.preventDefault(), this.controlElements.active || this.setFocusOnInput())
                        }
                        if (!this.el.hasAttribute("disabled")) {
                            var o = this.getFlowDTO();
                            if (e.keyCode == t.Dictionary.keyCodes.enter && !e.shiftKey || e.keyCode == t.Dictionary.keyCodes.space)
                                if (e.keyCode == t.Dictionary.keyCodes.enter && this.active) {
                                    if (!0 === this.cfReference.preventSubmitOnEnter) return;
                                    e.preventDefault(), this.onEnterOrSubmitButtonSubmit()
                                } else if (e.keyCode == t.Dictionary.keyCodes.enter || e.keyCode == t.Dictionary.keyCodes.space) {
                                e.preventDefault();
                                var s = "group" == this._currentTag.type ? this._currentTag.getGroupTagType() : this._currentTag.type;
                                if ("select" == s || "checkbox" == s) {
                                    var r = this._currentTag;
                                    "checkbox" == s || r.multipleChoice ? (this.active || this.isControlElementsActiveAndUserInputHidden()) && e.keyCode == t.Dictionary.keyCodes.enter ? this.submitButton.click() : (this.active || this.controlElements.active || this.isControlElementsActiveAndUserInputHidden() || (this.resetValue(), this.setFocusOnInput()), this.dispatchKeyChange(o, e.keyCode)) : this.dispatchKeyChange(o, e.keyCode)
                                } else "group" == this._currentTag.type && this.dispatchKeyChange(o, e.keyCode)
                            } else e.keyCode == t.Dictionary.keyCodes.space && document.activeElement && this.dispatchKeyChange(o, e.keyCode);
                            else e.keyCode != t.Dictionary.keyCodes.shift && e.keyCode != t.Dictionary.keyCodes.tab && this.dispatchKeyChange(o, e.keyCode);
                            this.onInputChange()
                        }
                    }
                }, o.prototype.dispatchKeyChange = function (e, i) {
                    this.submitButton.typing = e.text && e.text.length > 0, t.ConversationalForm.illustrateFlow(this, "dispatch", t.UserInputEvents.KEY_CHANGE, e), this.eventTarget.dispatchEvent(new n(t.UserInputEvents.KEY_CHANGE, {
                        detail: {
                            dto: e,
                            keyCode: i,
                            inputFieldActive: this.active
                        }
                    }))
                }, o.prototype.windowFocus = function (t) {
                    e.prototype.windowFocus.call(this, t), this.setFocusOnInput()
                }, o.prototype.onInputBlur = function (e) {
                    this._active = !1, this.eventTarget.dispatchEvent(new n(t.UserInputEvents.BLUR))
                }, o.prototype.onInputFocus = function (e) {
                    this._active = !0, this.onInputChange(), this.eventTarget.dispatchEvent(new n(t.UserInputEvents.FOCUS))
                }, o.prototype.setFocusOnInput = function () {
                    t.UserInputElement.preventAutoFocus || this.el.classList.contains("hide-input") || this.inputElement.focus()
                }, o.prototype.onEnterOrSubmitButtonSubmit = function (e) {
                    void 0 === e && (e = null);
                    var n = this.controlElements.active && t.UserInputElement.hideUserInputOnNoneTextInput;
                    (this.active || n) && this.controlElements.highlighted ? this.controlElements.clickOnHighlighted() : this._currentTag ? "file" == this._currentTag.type && e ? this.controlElements.getElement(0).triggerFileSelect() : this.doSubmit() : this.eventTarget.cf.addUserChatResponse(this.inputElement.value)
                }, o.prototype.doSubmit = function () {
                    var e = this.getFlowDTO();
                    this.submitButton.loading = !0, this.disabled = !0, this.el.removeAttribute("error"), this.inputElement.setAttribute("data-value", ""), t.ConversationalForm.illustrateFlow(this, "dispatch", t.UserInputEvents.SUBMIT, e), this.eventTarget.dispatchEvent(new n(t.UserInputEvents.SUBMIT, {
                        detail: e
                    }))
                }, o.prototype.resetValue = function () {
                    this.inputElement.value = "", this.inputElement.hasAttribute("rows") && this.inputElement.setAttribute("rows", "1"), this.onInputChange()
                }, o.prototype.dealloc = function () {
                    this.inputElement.removeEventListener("blur", this.onInputBlurCallback, !1), this.onInputBlurCallback = null, this.inputElement.removeEventListener("focus", this.onInputFocusCallback, !1), this.onInputFocusCallback = null, document.removeEventListener("keydown", this.keyDownCallback, !1), this.keyDownCallback = null, document.removeEventListener("keyup", this.keyUpCallback, !1), this.keyUpCallback = null, this.eventTarget.removeEventListener(t.ControlElementEvents.SUBMIT_VALUE, this.onControlElementSubmitCallback, !1), this.onControlElementSubmitCallback = null, this.submitButton.el.removeEventListener(t.UserInputSubmitButtonEvents.CHANGE, this.onSubmitButtonChangeStateCallback, !1), this.onSubmitButtonChangeStateCallback = null, this.submitButton.dealloc(), this.submitButton = null, e.prototype.dealloc.call(this)
                }, o.prototype.getTemplate = function () {
                    return this.customTemplate || '<cf-input>\n\t\t\t\t<cf-info></cf-info>\n\t\t\t\t<cf-input-control-elements>\n\t\t\t\t\t<cf-list-button direction="prev">\n\t\t\t\t\t</cf-list-button>\n\t\t\t\t\t<cf-list-button direction="next">\n\t\t\t\t\t</cf-list-button>\n\t\t\t\t\t<cf-list>\n\t\t\t\t\t</cf-list>\n\t\t\t\t</cf-input-control-elements>\n\t\t\t\t<div class="inputWrapper">\n\t\t\t\t\t<textarea type=\'input\' tabindex="1" rows="1"></textarea>\n\t\t\t\t</div>\n\t\t\t</cf-input>\n\t\t\t'
                }, o
            }(t.UserInputElement);
            t.UserTextInput = e
        }(o || (o = {}));
        i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            t.ChatResponseEvents = {
                USER_ANSWER_CLICKED: "cf-on-user-answer-clicked"
            };
            var e = function (e) {
                function o(t) {
                    var n = e.call(this, t) || this;
                    return n.container = t.container, n.uiOptions = t.cfReference.uiOptions, n._tag = t.tag, n
                }
                return i(o, e), Object.defineProperty(o.prototype, "tag", {
                    get: function () {
                        return this._tag
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "added", {
                    get: function () {
                        return !!this.el || !!this.el.parentNode || !!this.el.parentNode.parentNode
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "disabled", {
                    get: function () {
                        return this.el.classList.contains("disabled")
                    },
                    set: function (t) {
                        t ? this.el.classList.add("disabled") : this.el.classList.remove("disabled")
                    },
                    enumerable: !0,
                    configurable: !0
                }), o.prototype.hasFlexBug = function () {
                    return this.cfReference.el.classList.contains("browser-firefox") || this.cfReference.el.classList.contains("browser-edge")
                }, o.prototype.animateIn = function () {
                    var t = this,
                        e = document.querySelector("scrollable"),
                        n = document.querySelector(".scrollableInner");
                    this.hasFlexBug() && n.classList.remove("scroll"), requestAnimationFrame(function () {
                        var i = t.el.scrollHeight;
                        t.el.style.height = "0px", requestAnimationFrame(function () {
                            t.el.style.height = i + "px", t.el.classList.add("show");
                            try {
                                var o = window.getComputedStyle(document.querySelectorAll("p.show")[0]),
                                    s = +o.animationDuration.replace("s", ""),
                                    r = +o.animationDelay.replace("s", "");
                                setTimeout(function () {
                                    t.el.style.height = "auto", t.hasFlexBug() && n.scrollHeight > e.offsetHeight && (n.classList.add("scroll"), n.scrollTop = n.scrollHeight)
                                }, 1500 * (s + r))
                            } catch (a) {
                                setTimeout(function () {
                                    t.hasFlexBug() && n.scrollHeight > e.offsetHeight && (n.classList.add("scroll"), n.scrollTop = n.scrollHeight), t.el.style.height = "auto"
                                }, 3e3)
                            }
                        })
                    })
                }, Object.defineProperty(o.prototype, "visible", {
                    set: function (t) {},
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(o.prototype, "strippedSesponse", {
                    get: function () {
                        var t = this.response,
                            e = document.createElement("div");
                        return e.innerHTML = t, e.textContent || e.innerText || ""
                    },
                    enumerable: !0,
                    configurable: !0
                }), o.prototype.whenReady = function (t) {
                    this.onReadyCallback = t
                }, o.prototype.setValue = function (e) {
                    void 0 === e && (e = null);
                    this.el.hasAttribute("thinking");
                    if (e) {
                        if (this.response = this.originalResponse = e.text, this.processResponseAndSetText(), this.responseLink && !this.isRobotResponse && this.responseLink.processResponseAndSetText(), e && e.controlElements && e.controlElements[0]) switch (e.controlElements[0].type) {
                            case "UploadFileUI":
                                this.textEl.classList.add("file-icon")
                        }
                        this.isRobotResponse || this.onClickCallback || (this.onClickCallback = this.onClick.bind(this), this.el.addEventListener(t.Helpers.getMouseEvent("click"), this.onClickCallback, !1))
                    } else this.setToThinking()
                }, o.prototype.show = function () {
                    this.visible = !0, this.disabled = !1, this.response ? this.checkForEditMode() : this.setToThinking()
                }, o.prototype.updateThumbnail = function (t) {
                    var e = this.el.getElementsByTagName("thumb")[0];
                    if (0 === t.indexOf("text:")) {
                        var n = e.getElementsByTagName("span")[0];
                        n.innerHTML = t.split("text:")[1], n.setAttribute("length", t.length.toString())
                    } else this.image = t, e.style.backgroundImage = 'url("' + this.image + '")'
                }, o.prototype.setLinkToOtherReponse = function (t) {
                    this.responseLink = t
                }, o.prototype.processResponseAndSetText = function () {
                    var t = this;
                    if (this.originalResponse) {
                        var e = this.originalResponse;
                        if (this._tag && "password" == this._tag.type && !this.isRobotResponse) {
                            for (var n = "", i = 0; i < e.length; i++) n += "*";
                            e = n
                        }
                        if (this.responseLink && this.isRobotResponse && (e = e.split("{previous-answer}").join(this.responseLink.parsedResponse)), this.isRobotResponse)
                            for (var s = o.list.getResponses(), r = 0; r < s.length; r++) {
                                var a = s[r];
                                a !== this && a.tag && (a.tag.id && (e = e.split("{" + a.tag.id + "}").join(a.tag.value)), a.tag.name && (e = e.split("{" + a.tag.name + "}").join(a.tag.value)))
                            }
                        if (-1 != e.indexOf("contains-image") && this.textEl.classList.add("contains-image"), this.isRobotResponse) {
                            this.textEl.innerHTML = "", this.uiOptions || (this.uiOptions = this.cfReference.uiOptions);
                            var l = this.uiOptions.robot.robotResponseTime;
                            0 != l && this.setToThinking();
                            var c = e.split("&&");
                            if (0 === l) {
                                for (var h = 0; h < c.length; h++) {
                                    var u = c[h];
                                    this.textEl.innerHTML += "<p>" + u + "</p>"
                                }
                                for (var p = function (e) {
                                        setTimeout(function () {
                                            t.tryClearThinking(), t.textEl.getElementsByTagName("p")[e].classList.add("show"), t.scrollTo()
                                        }, c.length > 1 && e > 0 ? l + (e + 1) * d.uiOptions.robot.chainedResponseTime : 0)
                                    }, d = this, f = 0; f < c.length; f++) p(f)
                            } else
                                for (var m = function (e) {
                                        var n = l + e * g.uiOptions.robot.chainedResponseTime,
                                            i = c[e];
                                        setTimeout(function () {
                                            t.tryClearThinking(), t.textEl.innerHTML += "<p>" + i + "</p>", t.textEl.getElementsByTagName("p")[e].classList.add("show"), t.scrollTo()
                                        }, n)
                                    }, g = this, v = 0; v < c.length; v++) m(v);
                            this.readyTimer = setTimeout(function () {
                                t.onReadyCallback && t.onReadyCallback(), t.onReadyCallback = null, t._tag && !0 === t._tag.skipUserInput && setTimeout(function () {
                                    t._tag.flowManager.nextStep(), t._tag.skipUserInput = !1
                                }, t.uiOptions.robot.chainedResponseTime)
                            }, l + c.length * this.uiOptions.robot.chainedResponseTime)
                        } else {
                            this.tryClearThinking();
                            var b = e.indexOf("<img") > -1,
                                E = new RegExp("<img[^>]*?>", "g"),
                                y = e.match(E);
                            b && y ? (e = e.replace(y[0], ""), this.textEl.innerHTML = '<p class="hasImage">' + y + "<span>" + e + "</span></p>") : this.textEl.innerHTML = "<p>" + e + "</p>";
                            var C = this.textEl.getElementsByTagName("p");
                            C[C.length - 1].offsetWidth, C[C.length - 1].classList.add("show"), this.scrollTo()
                        }
                        this.parsedResponse = e, this.uiOptions.robot && 0 === this.uiOptions.robot.robotResponseTime ? this.addSelf() : setTimeout(function () {
                            t.addSelf()
                        }, 0), this.textEl.removeAttribute("value-added"), setTimeout(function () {
                            t.textEl.setAttribute("value-added", ""), t.el.classList.add("peak-thumb")
                        }, 0), this.checkForEditMode(), this.response = e.split("&&").join(" ")
                    }
                }, o.prototype.scrollTo = function () {
                    var t = this.el.offsetTop,
                        e = this.el.offsetHeight;
                    !this.container && this.el && (this.container = this.el), this.container && this.container.parentElement && this.container.parentElement.scrollHeight && (this.container.parentElement.scrollTop = t + e + this.container.parentElement.scrollHeight)
                }, o.prototype.checkForEditMode = function () {
                    this.isRobotResponse || this.el.hasAttribute("thinking") || (this.el.classList.add("can-edit"), this.disabled = !1)
                }, o.prototype.tryClearThinking = function () {
                    this.el.hasAttribute("thinking") && (this.textEl.innerHTML = "", this.el.removeAttribute("thinking"))
                }, o.prototype.setToThinking = function () {
                    (this.isRobotResponse && 0 !== this.uiOptions.robot.robotResponseTime || !this.isRobotResponse && this.cfReference.uiOptions.user.showThinking && !this._tag.skipUserInput) && (this.textEl.innerHTML = o.THINKING_MARKUP, this.el.classList.remove("can-edit"), this.el.setAttribute("thinking", "")), (this.cfReference.uiOptions.user.showThinking || this.cfReference.uiOptions.user.showThumb) && this.addSelf()
                }, o.prototype.addSelf = function () {
                    this.el.parentNode != this.container && (this.container.appendChild(this.el), this.animateIn())
                }, o.prototype.onClick = function (e) {
                    this.setToThinking(), t.ConversationalForm.illustrateFlow(this, "dispatch", t.ChatResponseEvents.USER_ANSWER_CLICKED, e), this.eventTarget.dispatchEvent(new n(t.ChatResponseEvents.USER_ANSWER_CLICKED, {
                        detail: this._tag
                    }))
                }, o.prototype.setData = function (t) {
                    this.image = t.image, this.response = this.originalResponse = t.response, this.isRobotResponse = t.isRobotResponse, e.prototype.setData.call(this, t)
                }, o.prototype.onElementCreated = function () {
                    var t = this;
                    this.textEl = this.el.getElementsByTagName("text")[0], this.updateThumbnail(this.image), this.isRobotResponse || null != this.response ? setTimeout(function () {
                        t.setValue({
                            text: t.response
                        })
                    }, 0) : this.cfReference.uiOptions.user.showThumb && this.el.classList.add("peak-thumb")
                }, o.prototype.dealloc = function () {
                    clearTimeout(this.readyTimer), this.container = null, this.uiOptions = null, this.onReadyCallback = null, this.onClickCallback && (this.el.removeEventListener(t.Helpers.getMouseEvent("click"), this.onClickCallback, !1), this.onClickCallback = null), e.prototype.dealloc.call(this)
                }, o.prototype.getTemplate = function () {
                    return '<cf-chat-response class="' + (this.isRobotResponse ? "robot" : "user") + '">\n\t\t\t\t<thumb><span></span></thumb>\n\t\t\t\t<text></text>\n\t\t\t</cf-chat-response>'
                }, o.THINKING_MARKUP = "<p class='show'><thinking><span>.</span><span>.</span><span>.</span></thinking></p>", o
            }(t.BasicElement);
            t.ChatResponse = e
        }(o || (o = {}));
        var o;
        i = this && this.__extends || function () {
            var t = function (e, n) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (t, e) {
                        t.__proto__ = e
                    } || function (t, e) {
                        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                    })(e, n)
            };
            return function (e, n) {
                function i() {
                    this.constructor = e
                }
                t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
            }
        }();
        ! function (t) {
            t.ChatListEvents = {
                CHATLIST_UPDATED: "cf-chatlist-updated"
            };
            var e = function (e) {
                function o(n) {
                    var i = e.call(this, n) || this;
                    return i.updateTimer = 0, t.ChatResponse.list = i, i.responses = [], i.flowUpdateCallback = i.onFlowUpdate.bind(i), i.eventTarget.addEventListener(t.FlowEvents.FLOW_UPDATE, i.flowUpdateCallback, !1), i.userInputUpdateCallback = i.onUserInputUpdate.bind(i), i.eventTarget.addEventListener(t.FlowEvents.USER_INPUT_UPDATE, i.userInputUpdateCallback, !1), i.onInputKeyChangeCallback = i.onInputKeyChange.bind(i), i.eventTarget.addEventListener(t.UserInputEvents.KEY_CHANGE, i.onInputKeyChangeCallback, !1), i.onInputHeightChangeCallback = i.onInputHeightChange.bind(i), i.eventTarget.addEventListener(t.UserInputEvents.HEIGHT_CHANGE, i.onInputHeightChangeCallback, !1), i.onControlElementsResizedCallback = i.onControlElementsResized.bind(i), i.eventTarget.addEventListener(t.ControlElementsEvents.ON_RESIZE, i.onControlElementsResizedCallback, !1), i.onControlElementsChangedCallback = i.onControlElementsChanged.bind(i), i.eventTarget.addEventListener(t.ControlElementsEvents.CHANGED, i.onControlElementsChangedCallback, !1), i
                }
                return i(o, e), o.prototype.onInputHeightChange = function (e) {
                    var n = e.detail.dto;
                    t.ConversationalForm.illustrateFlow(this, "receive", e.type, n), this.onInputElementChanged()
                }, o.prototype.onInputKeyChange = function (e) {
                    var n = e.detail.dto;
                    t.ConversationalForm.illustrateFlow(this, "receive", e.type, n)
                }, o.prototype.onUserInputUpdate = function (e) {
                    if (t.ConversationalForm.illustrateFlow(this, "receive", e.type, e.detail), this.currentUserResponse) {
                        var n = e.detail;
                        this.setCurrentUserResponse(n)
                    }
                }, o.prototype.addInput = function (t) {
                    this.input = t
                }, o.prototype.onControlElementsChanged = function (t) {
                    this.onInputElementChanged()
                }, o.prototype.onControlElementsResized = function (e) {
                    t.ConversationalForm.illustrateFlow(this, "receive", t.ControlElementsEvents.ON_RESIZE);
                    var n = this.currentResponse;
                    if (n) {
                        if (!n.added)
                            for (var i = this.responses.indexOf(n); i >= 0; i--) {
                                var o = this.responses[i];
                                if (o.added) {
                                    n = o;
                                    break
                                }
                            }
                        n.scrollTo()
                    }
                    this.onInputElementChanged()
                }, o.prototype.onInputElementChanged = function () {
                    if (this.cfReference && this.cfReference.el) this.cfReference.el.offsetHeight, this.input.height
                }, o.prototype.onFlowUpdate = function (e) {
                    var n = this;
                    t.ConversationalForm.illustrateFlow(this, "receive", e.type, e.detail);
                    var i = e.detail.tag;
                    this.currentResponse && (this.currentResponse.disabled = !1), this.containsTagResponse(i) && !e.detail.ignoreExistingTag ? this.onUserWantsToEditTag(i) : setTimeout(function () {
                        var t = n.createResponse(!0, i, i.question);
                        t.whenReady(function () {
                            n.currentUserResponse = n.createResponse(!1, i), t.scrollTo()
                        }), n.currentUserResponse && (n.currentUserResponse.setLinkToOtherReponse(t), t.setLinkToOtherReponse(n.currentUserResponse))
                    }, 0 === this.responses.length ? 500 : 0)
                }, o.prototype.containsTagResponse = function (t) {
                    for (var e = 0; e < this.responses.length; e++) {
                        var n = this.responses[e];
                        if (!n.isRobotResponse && n.tag == t && !t.hasConditions()) return !0
                    }
                    return !1
                }, o.prototype.onUserWantsToEditTag = function (t) {
                    for (var e, n = 0; n < this.responses.length; n++) {
                        var i = this.responses[n];
                        if (!i.isRobotResponse && i.tag == t) {
                            e = i;
                            break
                        }
                    }
                    this.currentUserResponse.processResponseAndSetText(), e && (this.responses.length > 2 && (this.responses[this.responses.length - 1].isRobotResponse || this.responses.pop().dealloc(), this.responses.pop().dealloc()), this.currentUserResponse = e, this.currentResponse = this.responses[this.responses.length - 1], this.onListUpdate(this.currentUserResponse))
                }, o.prototype.onListUpdate = function (e) {
                    var i = this;
                    clearTimeout(this.updateTimer), this.updateTimer = setTimeout(function () {
                        i.eventTarget.dispatchEvent(new n(t.ChatListEvents.CHATLIST_UPDATED, {
                            detail: i
                        })), e.show()
                    }, 0)
                }, o.prototype.clearFrom = function (t) {
                    for (t *= 2, t += t % 2; this.responses.length > t;) this.responses.pop().dealloc()
                }, o.prototype.setCurrentUserResponse = function (e) {
                    this.flowDTOFromUserInputUpdate = e, !this.flowDTOFromUserInputUpdate.text && e.tag && ("group" == e.tag.type ? this.flowDTOFromUserInputUpdate.text = t.Dictionary.get("user-reponse-missing-group") : "password" != e.tag.type && (this.flowDTOFromUserInputUpdate.text = t.Dictionary.get("user-reponse-missing"))), this.currentUserResponse.setValue(this.flowDTOFromUserInputUpdate)
                }, o.prototype.getResponses = function () {
                    return this.responses
                }, o.prototype.updateThumbnail = function (e, n) {
                    t.Dictionary.set(e ? "robot-image" : "user-image", e ? "robot" : "human", n);
                    for (var i = e ? t.Dictionary.getRobotResponse("robot-image") : t.Dictionary.get("user-image"), o = 0; o < this.responses.length; o++) {
                        var s = this.responses[o];
                        e && s.isRobotResponse ? s.updateThumbnail(i) : e || s.isRobotResponse || s.updateThumbnail(i)
                    }
                }, o.prototype.createResponse = function (e, n, i) {
                    void 0 === i && (i = null);
                    var o = this.el.querySelector(".scrollableInner"),
                        s = new t.ChatResponse({
                            cfReference: this.cfReference,
                            list: this,
                            tag: n,
                            eventTarget: this.eventTarget,
                            isRobotResponse: e,
                            response: i,
                            image: e ? t.Dictionary.getRobotResponse("robot-image") : t.Dictionary.get("user-image"),
                            container: o
                        });
                    return this.responses.push(s), this.currentResponse = s, this.onListUpdate(s), s
                }, o.prototype.getTemplate = function () {
                    return "<cf-chat type='pluto'>\n\t\t\t\t\t\t<scrollable>\n\t\t\t\t\t\t\t<div class=\"scrollableInner\"></div>\n\t\t\t\t\t\t</scrollable>\n\t\t\t\t\t</cf-chat>"
                }, o.prototype.dealloc = function () {
                    this.eventTarget.removeEventListener(t.FlowEvents.FLOW_UPDATE, this.flowUpdateCallback, !1), this.flowUpdateCallback = null, this.eventTarget.removeEventListener(t.FlowEvents.USER_INPUT_UPDATE, this.userInputUpdateCallback, !1), this.userInputUpdateCallback = null, this.eventTarget.removeEventListener(t.UserInputEvents.KEY_CHANGE, this.onInputKeyChangeCallback, !1), this.onInputKeyChangeCallback = null, e.prototype.dealloc.call(this)
                }, o
            }(t.BasicElement);
            t.ChatList = e
        }(o || (o = {})),
        function (t) {
            t.FlowEvents = {
                USER_INPUT_UPDATE: "cf-flow-user-input-update",
                USER_INPUT_INVALID: "cf-flow-user-input-invalid",
                FLOW_UPDATE: "cf-flow-update",
                FORM_SUBMIT: "cf-form-submit"
            };
            var e = function () {
                function e(e) {
                    this.stopped = !1, this.maxSteps = 0, this.step = 0, this.savedStep = -1, this.stepTimer = 0, this.ignoreExistingTags = !1, this.cfReference = e.cfReference, this.eventTarget = e.eventTarget, this.flowStepCallback = e.flowStepCallback, this.setTags(e.tags), this.userInputSubmitCallback = this.userInputSubmit.bind(this), this.eventTarget.addEventListener(t.UserInputEvents.SUBMIT, this.userInputSubmitCallback, !1)
                }
                return Object.defineProperty(e.prototype, "currentTag", {
                    get: function () {
                        return this.tags[this.step]
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.userInputSubmit = function (e) {
                    var i = this;
                    t.ConversationalForm.illustrateFlow(this, "receive", e.type, e.detail);
                    var o = e.detail;
                    o.tag || (o.tag = this.currentTag);
                    var s = this.currentTag.setTagValueAndIsValid(o),
                        r = !1,
                        a = !1,
                        l = function () {
                            return i.currentTag.validationCallback && "function" == typeof i.currentTag.validationCallback && !r && s ? (r = !0, void i.currentTag.validationCallback(o, function () {
                                s = !0, l()
                            }, function (t) {
                                s = !1, t && (o.errorText = t), l()
                            })) : i.flowStepCallback && "function" == typeof i.flowStepCallback && !a && s ? (a = !0, void i.flowStepCallback(o, function () {
                                s = !0, l()
                            }, function (t) {
                                s = !1, t && (o.errorText = t), l()
                            })) : void(s ? (t.ConversationalForm.illustrateFlow(i, "dispatch", t.FlowEvents.USER_INPUT_UPDATE, o), o.input && (o = o.input.getFlowDTO()), i.eventTarget.dispatchEvent(new n(t.FlowEvents.USER_INPUT_UPDATE, {
                                detail: o
                            })), setTimeout(function () {
                                return i.nextStep()
                            }, t.ConversationalForm.animationsEnabled ? 250 : 0)) : (t.ConversationalForm.illustrateFlow(i, "dispatch", t.FlowEvents.USER_INPUT_INVALID, o), i.eventTarget.dispatchEvent(new n(t.FlowEvents.USER_INPUT_INVALID, {
                                detail: o
                            }))))
                        };
                    l()
                }, e.prototype.startFrom = function (t, e) {
                    void 0 === e && (e = !1), this.step = "number" == typeof t ? t : this.tags.indexOf(t), this.ignoreExistingTags = e, this.ignoreExistingTags ? this.showStep() : this.editTag(this.tags[this.step])
                }, e.prototype.areConditionsInFlowFullfilled = function (e, n) {
                    this.activeConditions || (this.activeConditions = []);
                    for (var i = 0, o = 0; o < this.tags.length; o++) {
                        var s = this.tags[o];
                        if (s !== e)
                            for (var r = 0; r < n.length; r++) {
                                var a = n[r],
                                    l = (s.name || s.id || "").toLowerCase();
                                if ("" !== l && "cf-conditional-" + l === a.key.toLowerCase()) {
                                    var c = (s.value, s.value);
                                    if (t.Tag.testConditions(c, a) && (this.activeConditions[l] = n, ++i == n.length)) return !0
                                }
                            }
                    }
                    return !1
                }, e.prototype.start = function () {
                    this.stopped = !1, this.validateStepAndUpdate()
                }, e.prototype.stop = function () {
                    this.stopped = !0
                }, e.prototype.nextStep = function () {
                    if (!this.stopped) {
                        if (-1 != this.savedStep) {
                            for (var t = !1, e = 0; e < this.tags.length; e++) {
                                var n = this.tags[e];
                                if (n !== this.currentTag && n.hasConditions() && n.hasConditionsFor(this.currentTag.name)) {
                                    t = !0, this.step = this.tags.indexOf(this.currentTag);
                                    break
                                }
                            }
                            t || (this.step = this.savedStep)
                        }
                        this.savedStep = -1, this.step++, this.validateStepAndUpdate()
                    }
                }, e.prototype.previousStep = function () {
                    this.step--, this.validateStepAndUpdate()
                }, e.prototype.getStep = function () {
                    return this.step
                }, e.prototype.addTags = function (t, e) {
                    if (void 0 === e && (e = -1), -1 !== e && e < this.tags.length) {
                        this.tags.slice(0, e);
                        var n = this.tags.slice(e, this.tags.length);
                        this.tags = this.tags.slice(0, e).concat(t).concat(n)
                    } else this.tags = this.tags.concat(t);
                    return this.setTags(this.tags), this.tags
                }, e.prototype.dealloc = function () {
                    this.eventTarget.removeEventListener(t.UserInputEvents.SUBMIT, this.userInputSubmitCallback, !1), this.userInputSubmitCallback = null
                }, e.prototype.editTag = function (t) {
                    if (this.ignoreExistingTags = !1, this.savedStep = this.step - 1, this.step = this.tags.indexOf(t), this.validateStepAndUpdate(), this.activeConditions && Object.keys(this.activeConditions).length > 0) {
                        this.savedStep = -1, this.cfReference.chatList.clearFrom(this.step + 1);
                        for (var e = this.tags.indexOf(t) + 1; e < this.tags.length; e++) {
                            this.tags[e].reset()
                        }
                    }
                }, e.prototype.setTags = function (t) {
                    this.tags = t;
                    for (var e = 0; e < this.tags.length; e++) {
                        var n = this.tags[e];
                        n.eventTarget = this.eventTarget, n.flowManager = this
                    }
                    this.maxSteps = this.tags.length
                }, e.prototype.skipStep = function () {
                    this.nextStep()
                }, e.prototype.validateStepAndUpdate = function () {
                    this.maxSteps > 0 && (this.step == this.maxSteps ? (this.eventTarget.dispatchEvent(new n(t.FlowEvents.FORM_SUBMIT, {})), this.cfReference.doSubmitForm()) : (this.step %= this.maxSteps, this.currentTag.disabled ? this.skipStep() : this.showStep()))
                }, e.prototype.showStep = function () {
                    var e = this;
                    this.stopped || (t.ConversationalForm.illustrateFlow(this, "dispatch", t.FlowEvents.FLOW_UPDATE, this.currentTag), this.currentTag.refresh(), setTimeout(function () {
                        e.eventTarget.dispatchEvent(new n(t.FlowEvents.FLOW_UPDATE, {
                            detail: {
                                tag: e.currentTag,
                                ignoreExistingTag: e.ignoreExistingTags,
                                step: e.step,
                                maxSteps: e.maxSteps
                            }
                        }))
                    }, 0))
                }, e.STEP_TIME = 1e3, e
            }();
            t.FlowManager = e
        }(o || (o = {})),
        function (t) {
            var e = function () {
                function e(n) {
                    if (this.version = "1.0.2", this.cdnPath = "https://cdn.jsdelivr.net/gh/space10-community/conversational-form@{version}/dist/", this.isDevelopment = !1, this.loadExternalStyleSheet = !0, this.theme = "light", this.preventAutoAppend = !1, this.preventAutoStart = !1, window.ConversationalForm = this, this.cdnPath = this.cdnPath.split("{version}").join(this.version), "boolean" == typeof n.suppressLog && (e.suppressLog = n.suppressLog), "boolean" == typeof n.showProgressBar && (e.showProgressBar = n.showProgressBar), "boolean" == typeof n.preventSubmitOnEnter && (this.preventSubmitOnEnter = n.preventSubmitOnEnter), e.suppressLog || console.log("Conversational Form > version:", this.version), e.suppressLog || console.log("Conversational Form > options:", n), window.ConversationalForm[this.createId] = this, n.eventDispatcher && (this._eventTarget = n.eventDispatcher), this.eventTarget.cf || (this.eventTarget.cf = this), n.flowStepCallback && (this.flowStepCallback = n.flowStepCallback), this.isDevelopment = e.illustrateAppFlow = !!document.getElementById("conversational-form-development"), 0 == n.loadExternalStyleSheet && (this.loadExternalStyleSheet = !1), "string" == typeof n.theme && (this.theme = n.theme), isNaN(n.scrollAcceleration) || (t.ScrollController.acceleration = n.scrollAcceleration), this.preventAutoStart = n.preventAutoStart, this.preventAutoAppend = n.preventAutoAppend, !n.formEl) throw new Error("Conversational Form error, the formEl needs to be defined.");
                    if (this.formEl = n.formEl, this.formEl.setAttribute("cf-create-id", this.createId), !0 === n.hideUserInputOnNoneTextInput && (t.UserInputElement.hideUserInputOnNoneTextInput = !0), this.submitCallback = n.submitCallback, this.submitCallback && "string" == typeof this.submitCallback) {
                        var i = window[this.submitCallback];
                        this.submitCallback = i
                    }
                    "" == this.formEl.getAttribute("cf-no-animation") && (e.animationsEnabled = !1), "boolean" == typeof n.animationsEnabled && !1 === n.animationsEnabled && (e.animationsEnabled = !1, this.formEl.setAttribute("cf-no-animation", "")), (n.preventAutoFocus || "" == this.formEl.getAttribute("cf-prevent-autofocus")) && (t.UserInputElement.preventAutoFocus = !0), this.dictionary = new t.Dictionary({
                        data: n.dictionaryData,
                        robotData: n.dictionaryRobot,
                        userImage: n.userImage,
                        robotImage: n.robotImage,
                        version: this.version
                    }), this.context = n.context ? n.context : document.body, this.tags = n.tags, n.microphoneInput && (n.microphoneInput.init && n.microphoneInput.input || (console.warn("Conversational Form: microphoneInput is not correctly setup", n.microphoneInput), n.microphoneInput = null)), this.microphoneInputObj = n.microphoneInput, this.uiOptions = t.Helpers.extendObject(t.UserInterfaceDefaultOptions, n.userInterfaceOptions || {}), this.options = n, this.init()
                }
                return Object.defineProperty(e.prototype, "createId", {
                    get: function () {
                        return this._createId || (this._createId = (new Date).getTime().toString()), this._createId
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "eventTarget", {
                    get: function () {
                        return this._eventTarget || (this._eventTarget = new t.EventDispatcher(this)), this._eventTarget
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.init = function () {
                    switch (this.theme) {
                        case "dark":
                            this.theme = "conversational-form-dark.min.css", this.options.robotImage || this.updateDictionaryValue("robot-image", "robot", "data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='100' fill='%233A3A3C'/%3E%3Crect x='66' y='66' width='68' height='68' fill='%23E5E6EA'/%3E%3C/svg%3E%0A"), this.options.userImage || this.updateDictionaryValue("user-image", "user", "data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23E5E6EA'/%3E%3Cpath d='M100 55L138.971 122.5H61.0289L100 55Z' fill='%233A3A3C'/%3E%3C/svg%3E%0A");
                            break;
                        case "green":
                            this.theme = "conversational-form-green.min.css", this.options.robotImage || this.updateDictionaryValue("robot-image", "robot", "data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23EEEFF0'/%3E%3Crect x='66' y='66' width='68' height='68' fill='%2300BF75'/%3E%3C/svg%3E%0A"), this.options.userImage || this.updateDictionaryValue("user-image", "user", "data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='100' fill='%2300BF75'/%3E%3Cpath d='M100 55L138.971 122.5H61.0289L100 55Z' fill='%23EEEFF0'/%3E%3C/svg%3E%0A");
                            break;
                        case "blue":
                            this.theme = "conversational-form-irisblue.min.css", this.options.robotImage || this.updateDictionaryValue("robot-image", "robot", "data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23E8E9EB'/%3E%3Crect x='66' y='66' width='68' height='68' fill='%2300C2DF'/%3E%3C/svg%3E%0A"), this.options.userImage || this.updateDictionaryValue("user-image", "user", "data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='100' fill='%2300C2DF'/%3E%3Cpath d='M100 55L138.971 122.5H61.0289L100 55Z' fill='%23E8E9EB'/%3E%3C/svg%3E%0A");
                            break;
                        case "purple":
                            this.theme = "conversational-form-purple.min.css", this.options.robotImage || this.updateDictionaryValue("robot-image", "robot", "data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23EEEFF0'/%3E%3Crect x='66' y='66' width='68' height='68' fill='%235A1DE4'/%3E%3C/svg%3E%0A"), this.options.userImage || this.updateDictionaryValue("user-image", "user", "data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='100' fill='%235A1DE4'/%3E%3Cpath d='M100 55L138.971 122.5H61.0289L100 55Z' fill='%23EEEFF0'/%3E%3C/svg%3E%0A");
                            break;
                        case "red":
                            this.theme = "conversational-form-red.min.css", this.options.robotImage || this.updateDictionaryValue("robot-image", "robot", "data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23E8E9EB'/%3E%3Crect x='66' y='66' width='68' height='68' fill='%23FF3233'/%3E%3C/svg%3E%0A"), this.options.userImage || this.updateDictionaryValue("user-image", "user", "data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23FF3233'/%3E%3Cpath d='M100 55L138.971 122.5H61.0289L100 55Z' fill='%23E8E9EB'/%3E%3C/svg%3E%0A");
                            break;
                        default:
                            this.theme = "conversational-form.min.css"
                    }
                    if (this.isDevelopment && (this.cdnPath = "../build/", this.theme = this.theme.replace(".min", "")), this.loadExternalStyleSheet) {
                        var n = document.head || document.getElementsByTagName("head")[0],
                            i = document.createElement("link"),
                            o = this.cdnPath + this.theme;
                        i.type = "text/css", i.media = "all", i.setAttribute("rel", "stylesheet"), i.setAttribute("href", o), n.appendChild(i)
                    }
                    var s = window.getComputedStyle(this.context).getPropertyValue("position").toLowerCase();
                    if (-1 == ["fixed", "absolute", "relative"].indexOf(s) && (this.context.style.position = "relative"), !this.tags || 0 == this.tags.length) {
                        this.tags = [];
                        for (var r = [].slice.call(this.formEl.querySelectorAll("input, select, button, textarea, cf-robot-message"), 0), a = 0; a < r.length; a++) {
                            var l = r[a];
                            t.Tag.isTagValid(l) && this.tags.push(t.Tag.createTag(l))
                        }
                    }
                    var c = [];
                    for (a = 0; a < this.tags.length; a++) {
                        (l = this.tags[a]) && t.Tag.isTagValid(l.domElement) || c.push(l)
                    }
                    for (a = 0; a < c.length; a++) {
                        var h = c[a];
                        this.tags.splice(this.tags.indexOf(h), 1)
                    }
                    return e.suppressLog || this.tags && 0 != this.tags.length || console.warn("Conversational Form: No tags found or registered."), this.tags = this.setupTagGroups(this.tags), this.setupUI(), this
                }, e.prototype.updateDictionaryValue = function (e, n, i) {
                    t.Dictionary.set(e, n, i)
                }, e.prototype.getFormData = function (t) {
                    if (void 0 === t && (t = !1), t) {
                        for (var e = {}, n = 0; n < this.tags.length; n++) {
                            var i = this.tags[n];
                            i.value && (e[i.name || "tag-" + n.toString()] = i.value)
                        }
                        return e
                    }
                    return new FormData(this.formEl)
                }, e.prototype.addRobotChatResponse = function (t) {
                    this.chatList.createResponse(!0, null, t)
                }, e.prototype.addUserChatResponse = function (t) {
                    this.chatList.createResponse(!1, null, t)
                }, e.prototype.stop = function (t) {
                    void 0 === t && (t = ""), this.flowManager.stop(), "" != t && this.chatList.createResponse(!0, null, t), this.userInput.onFlowStopped()
                }, e.prototype.start = function () {
                    this.userInput.disabled = !1, e.suppressLog || console.log("option, disabled 3"), this.userInput.visible = !0, this.flowManager.start()
                }, e.prototype.getTag = function (t) {
                    return "number" == typeof t ? this.tags[t] : null
                }, e.prototype.setupTagGroups = function (e) {
                    for (var n = [], i = 0; i < e.length; i++) {
                        var o = e[i];
                        "radio" != o.type && "checkbox" != o.type || (n[o.name] || (n[o.name] = []), n[o.name].push(o))
                    }
                    if (Object.keys(n).length > 0)
                        for (var s in n)
                            if (n[s].length > 0) {
                                var r = n[s][0].domElement.parentNode;
                                r && "fieldset" !== r.tagName.toLowerCase() && function (t) {
                                    return t && "fieldset" !== t.tagName.toLowerCase() && !t.hasAttribute("cf-questions")
                                }(r = r.parentNode) && (r = null);
                                var a = new t.TagGroup({
                                    fieldset: r,
                                    elements: n[s]
                                });
                                for (i = 0; i < n[s].length; i++) {
                                    var l = n[s][i];
                                    0 == i ? e.splice(e.indexOf(l), 1, a) : e.splice(e.indexOf(l), 1)
                                }
                            } return e
                }, e.prototype.setupUI = function () {
                    this.flowManager = new t.FlowManager({
                        cfReference: this,
                        flowStepCallback: this.flowStepCallback,
                        eventTarget: this.eventTarget,
                        tags: this.tags
                    }), this.el = document.createElement("div"), this.el.id = "conversational-form", this.el.className = "conversational-form", this.addBrowserTypes(this.el), e.animationsEnabled && this.el.classList.add("conversational-form--enable-animation"), this.preventAutoAppend || this.context.appendChild(this.el), this.el.style.visibility = "hidden";
                    var n = document.createElement("div");
                    if (n.className = "conversational-form-inner", this.el.appendChild(n), this.chatList = new t.ChatList({
                            eventTarget: this.eventTarget,
                            cfReference: this
                        }), n.appendChild(this.chatList.el), this.userInput = new t.UserTextInput({
                            microphoneInputObj: this.microphoneInputObj,
                            eventTarget: this.eventTarget,
                            cfReference: this
                        }), e.showProgressBar) {
                        var i = new t.ProgressBar(this);
                        n.appendChild(i.el)
                    }
                    this.chatList.addInput(this.userInput), n.appendChild(this.userInput.el), this.onUserAnswerClickedCallback = this.onUserAnswerClicked.bind(this), this.eventTarget.addEventListener(t.ChatResponseEvents.USER_ANSWER_CLICKED, this.onUserAnswerClickedCallback, !1), this.el.classList.add("conversational-form--show"), this.preventAutoStart || this.flowManager.start(), this.tags && 0 != this.tags.length || (this.userInput.visible = !0)
                }, e.prototype.onUserAnswerClicked = function (t) {
                    var e = t.detail;
                    this.flowManager.editTag(e)
                }, e.prototype.addBrowserTypes = function (t) {
                    navigator.userAgent.indexOf("Firefox") > -1 && t.classList.add("browser-firefox"), /Edge/.test(navigator.userAgent) && t.classList.add("browser-edge")
                }, e.prototype.addTags = function (e, n, i) {
                    void 0 === n && (n = !0), void 0 === i && (i = -1);
                    for (var o = [], s = 0; s < e.length; s++) {
                        var r = e[s];
                        if ("fieldset" === r.tag)
                            for (var a = t.TagsParser.parseGroupTag(r), l = 0; l < a.children.length; l++) {
                                var c = a.children[l];
                                if (t.Tag.isTagValid(c))(h = t.Tag.createTag(c)).name || (h.name = "tag-ref-" + l.toString()), o.push(h)
                            } else {
                                c = "select" === r.tag ? t.TagsParser.parseGroupTag(r) : t.TagsParser.parseTag(r);
                                if (t.Tag.isTagValid(c)) {
                                    var h = t.Tag.createTag(c);
                                    o.push(h)
                                }
                            }
                    }
                    o = this.setupTagGroups(o), this.tags = this.flowManager.addTags(o, n ? this.flowManager.getStep() + 1 : i)
                }, e.prototype.remapTagsAndStartFrom = function (t, e, n) {
                    void 0 === t && (t = 0), void 0 === e && (e = !1), void 0 === n && (n = !1), e && this.chatList.setCurrentUserResponse(this.userInput.getFlowDTO());
                    for (var i = 0; i < this.tags.length; i++) {
                        this.tags[i].refresh()
                    }
                    this.flowManager.startFrom(t, n)
                }, e.prototype.focus = function () {
                    this.userInput && this.userInput.setFocusOnInput()
                }, e.prototype.doSubmitForm = function () {
                    if (this.el.classList.add("done"), this.userInput.reset(), this.submitCallback) this.submitCallback(this);
                    else {
                        var t = this.formEl.ownerDocument.createElement("button");
                        t.style.display = "none", t.type = "submit", this.formEl.appendChild(t), t.click(), this.formEl.removeChild(t), this.remove()
                    }
                }, e.prototype.remove = function () {
                    this.microphoneInputObj && (this.microphoneInputObj = null), this.onUserAnswerClickedCallback && (this.eventTarget.removeEventListener(t.ChatResponseEvents.USER_ANSWER_CLICKED, this.onUserAnswerClickedCallback, !1), this.onUserAnswerClickedCallback = null), this.flowManager && this.flowManager.dealloc(), this.userInput && this.userInput.dealloc(), this.chatList && this.chatList.dealloc(), this.dictionary = null, this.flowManager = null, this.userInput = null, this.chatList = null, this.context = null, this.formEl = null, this.tags = null, this.submitCallback = null, this.el.parentNode.removeChild(this.el), this.el = null, window.ConversationalForm[this.createId] = null
                }, e.illustrateFlow = function (t, n, i, o) {
                    if (void 0 === o && (o = null), e.illustrateAppFlow) {
                        var s = "font-weight: 900; background: " + ("receive" == n ? "#e6f3fe" : "pink") + "; color: black; padding: 0px 5px;";
                        e.suppressLog || console.log("%c** event flow: %c" + i + "%c flow type: %c" + n + "%c from: %c" + t.constructor.name, "font-weight: 900;", s, "font-weight: 400;", s, "font-weight: 400;", s), o && (e.suppressLog || console.log("** event flow detail:", o))
                    }
                }, e.startTheConversation = function (t) {
                    var e, n, i = !1 == !!t.formEl;
                    if (i) {
                        if ("string" == typeof t) {
                            i = !0;
                            var s = JSON.parse(t);
                            n = s.options, e = s.tags
                        } else n = t.options, e = t.tags;
                        var r = o.TagsParser.parseJSONIntoElements(e);
                        n.formEl = r
                    } else n = t;
                    return new o.ConversationalForm(n)
                }, e.autoStartTheConversation = function () {
                    if (!o.ConversationalForm.hasAutoInstantiated) {
                        var t = document.querySelectorAll("form[cf-form]");
                        0 === t.length && (t = document.querySelectorAll("form[cf-form-element]"));
                        var e = document.querySelectorAll("*[cf-context]");
                        if (t && t.length > 0) {
                            for (var n = 0; n < t.length; n++) {
                                var i = t[n],
                                    s = e[n];
                                o.ConversationalForm.startTheConversation({
                                    formEl: i,
                                    context: s
                                })
                            }
                            o.ConversationalForm.hasAutoInstantiated = !0
                        }
                    }
                }, e.animationsEnabled = !0, e.illustrateAppFlow = !0, e.suppressLog = !0, e.showProgressBar = !1, e.preventSubmitOnEnter = !1, e.hasAutoInstantiated = !1, e
            }();
            t.ConversationalForm = e
        }(o || (o = {})), "complete" == document.readyState ? setTimeout(function () {
                return o.ConversationalForm.autoStartTheConversation()
            }, 0) : window.addEventListener("load", function () {
                o.ConversationalForm.autoStartTheConversation()
            }, !1),
            function (t) {
                try {
                    jQuery.fn.conversationalForm = function (t) {
                        if ((t = t || {}).formEl || (t.formEl = this[0]), !t.context) {
                            var e = document.querySelectorAll("*[cf-context]");
                            e[0] && (t.context = e[0])
                        }
                        return new o.ConversationalForm(t)
                    }
                } catch (s) {}
            }(),
            function (e, n) {
                "function" == typeof t && t.amd ? t(["conversational-form"], function (t) {
                    return e.conversationalform = n(t)
                }) : "object" == typeof module && module.exports ? module.exports = e.conversationalform = n(require("conversational-form")) : e.conversationalform = n(o.ConversationalForm)
            }(window, function (t) {
                return o
            });
}, {
        "conversational-form": "Jy7r"
    }],
    "sU2v": [function (require, module, exports) {
        var global = arguments[3];
        var t = arguments[3];

        function e(t) {
            return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.EventDispatcher = exports.TweenPlugin = exports.Power4 = exports.Power3 = exports.Power2 = exports.Power1 = exports.Power0 = exports.Linear = exports.Ease = exports.Animation = exports.SimpleTimeline = exports.globals = exports.default = exports.TweenLite = exports._gsScope = void 0;
        var i = "undefined" != typeof window ? window : "undefined" != typeof module && module.exports && void 0 !== t ? t : {};
        exports._gsScope = i;
        var s = function (t) {
            "use strict";
            var i = {},
                s = t.document,
                r = t.GreenSockGlobals = t.GreenSockGlobals || t;
            if (r.TweenLite) return r.TweenLite;
            var n, a, o, l, h, _, u, p = function (t) {
                    var e, i = t.split("."),
                        s = r;
                    for (e = 0; e < i.length; e++) s[i[e]] = s = s[i[e]] || {};
                    return s
                },
                c = p("com.greensock"),
                f = function (t) {
                    var e, i = [],
                        s = t.length;
                    for (e = 0; e !== s; i.push(t[e++]));
                    return i
                },
                m = function () {},
                d = (_ = Object.prototype.toString, u = _.call([]), function (t) {
                    return null != t && (t instanceof Array || "object" === e(t) && !!t.push && _.call(t) === u)
                }),
                v = {},
                g = function t(e, s, n, a) {
                    this.sc = v[e] ? v[e].sc : [], v[e] = this, this.gsClass = null, this.func = n;
                    var o = [];
                    this.check = function (l) {
                        for (var h, _, u, c, f = s.length, m = f; --f > -1;)(h = v[s[f]] || new t(s[f], [])).gsClass ? (o[f] = h.gsClass, m--) : l && h.sc.push(this);
                        if (0 === m && n)
                            for (u = (_ = ("com.greensock." + e).split(".")).pop(), c = p(_.join("."))[u] = this.gsClass = n.apply(n, o), a && (r[u] = i[u] = c), f = 0; f < this.sc.length; f++) this.sc[f].check()
                    }, this.check(!0)
                },
                T = t._gsDefine = function (t, e, i, s) {
                    return new g(t, e, i, s)
                },
                y = c._class = function (t, e, i) {
                    return e = e || function () {}, T(t, [], function () {
                        return e
                    }, i), e
                };
            T.globals = r;
            var w = [0, 0, 1, 1],
                P = y("easing.Ease", function (t, e, i, s) {
                    this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? w.concat(e) : w
                }, !0),
                b = P.map = {},
                k = P.register = function (t, e, i, s) {
                    for (var r, n, a, o, l = e.split(","), h = l.length, _ = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1;)
                        for (n = l[h], r = s ? y("easing." + n, null, !0) : c.easing[n] || {}, a = _.length; --a > -1;) o = _[a], b[n + "." + o] = b[o + n] = r[o] = t.getRatio ? t : t[o] || new t
                };
            for ((o = P.prototype)._calcEnd = !1, o.getRatio = function (t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type,
                        i = this._power,
                        s = 1 === e ? 1 - t : 2 === e ? t : t < .5 ? 2 * t : 2 * (1 - t);
                    return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : t < .5 ? s / 2 : 1 - s / 2
                }, a = (n = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length; --a > -1;) o = n[a] + ",Power" + a, k(new P(null, null, 1, a), o, "easeOut", !0), k(new P(null, null, 2, a), o, "easeIn" + (0 === a ? ",easeNone" : "")), k(new P(null, null, 3, a), o, "easeInOut");
            b.linear = c.easing.Linear.easeIn, b.swing = c.easing.Quad.easeInOut;
            var x = y("events.EventDispatcher", function (t) {
                this._listeners = {}, this._eventTarget = t || this
            });
            (o = x.prototype).addEventListener = function (t, e, i, s, r) {
                r = r || 0;
                var n, a, o = this._listeners[t],
                    _ = 0;
                for (this !== l || h || l.wake(), null == o && (this._listeners[t] = o = []), a = o.length; --a > -1;)(n = o[a]).c === e && n.s === i ? o.splice(a, 1) : 0 === _ && n.pr < r && (_ = a + 1);
                o.splice(_, 0, {
                    c: e,
                    s: i,
                    up: s,
                    pr: r
                })
            }, o.removeEventListener = function (t, e) {
                var i, s = this._listeners[t];
                if (s)
                    for (i = s.length; --i > -1;)
                        if (s[i].c === e) return void s.splice(i, 1)
            }, o.dispatchEvent = function (t) {
                var e, i, s, r = this._listeners[t];
                if (r)
                    for ((e = r.length) > 1 && (r = r.slice(0)), i = this._eventTarget; --e > -1;)(s = r[e]) && (s.up ? s.c.call(s.s || i, {
                        type: t,
                        target: i
                    }) : s.c.call(s.s || i))
            };
            var S = t.requestAnimationFrame,
                A = t.cancelAnimationFrame,
                R = Date.now || function () {
                    return (new Date).getTime()
                },
                C = R();
            for (a = (n = ["ms", "moz", "webkit", "o"]).length; --a > -1 && !S;) S = t[n[a] + "RequestAnimationFrame"], A = t[n[a] + "CancelAnimationFrame"] || t[n[a] + "CancelRequestAnimationFrame"];
            y("Ticker", function (t, e) {
                var i, r, n, a, o, _ = this,
                    u = R(),
                    p = !(!1 === e || !S) && "auto",
                    c = 500,
                    f = 33,
                    d = function t(e) {
                        var s, l, h = R() - C;
                        h > c && (u += h - f), C += h, _.time = (C - u) / 1e3, s = _.time - o, (!i || s > 0 || !0 === e) && (_.frame++, o += s + (s >= a ? .004 : a - s), l = !0), !0 !== e && (n = r(t)), l && _.dispatchEvent("tick")
                    };
                x.call(_), _.time = _.frame = 0, _.tick = function () {
                    d(!0)
                }, _.lagSmoothing = function (t, e) {
                    if (!arguments.length) return c < 1e8;
                    c = t || 1e8, f = Math.min(e, c, 0)
                }, _.sleep = function () {
                    null != n && (p && A ? A(n) : clearTimeout(n), r = m, n = null, _ === l && (h = !1))
                }, _.wake = function (t) {
                    null !== n ? _.sleep() : t ? u += -C + (C = R()) : _.frame > 10 && (C = R() - c + 5), r = 0 === i ? m : p && S ? S : function (t) {
                        return setTimeout(t, 1e3 * (o - _.time) + 1 | 0)
                    }, _ === l && (h = !0), d(2)
                }, _.fps = function (t) {
                    if (!arguments.length) return i;
                    a = 1 / ((i = t) || 60), o = this.time + a, _.wake()
                }, _.useRAF = function (t) {
                    if (!arguments.length) return p;
                    _.sleep(), p = t, _.fps(i)
                }, _.fps(t), setTimeout(function () {
                    "auto" === p && _.frame < 5 && "hidden" !== (s || {}).visibilityState && _.useRAF(!1)
                }, 1500)
            }), (o = c.Ticker.prototype = new c.events.EventDispatcher).constructor = c.Ticker;
            var D = y("core.Animation", function (t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = !!e.immediateRender, this.data = e.data, this._reversed = !!e.reversed, V) {
                    h || l.wake();
                    var i = this.vars.useFrames ? J : V;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            l = D.ticker = new c.Ticker, (o = D.prototype)._dirty = o._gc = o._initted = o._paused = !1, o._totalTime = o._time = 0, o._rawPrevTime = -1, o._next = o._last = o._onUpdate = o._timeline = o.timeline = null, o._paused = !1;
            ! function t() {
                h && R() - C > 2e3 && ("hidden" !== (s || {}).visibilityState || !l.lagSmoothing()) && l.wake();
                var e = setTimeout(t, 2e3);
                e.unref && e.unref()
            }(), o.play = function (t, e) {
                return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
            }, o.pause = function (t, e) {
                return null != t && this.seek(t, e), this.paused(!0)
            }, o.resume = function (t, e) {
                return null != t && this.seek(t, e), this.paused(!1)
            }, o.seek = function (t, e) {
                return this.totalTime(Number(t), !1 !== e)
            }, o.restart = function (t, e) {
                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
            }, o.reverse = function (t, e) {
                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
            }, o.render = function (t, e, i) {}, o.invalidate = function () {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, !this._gc && this.timeline || this._enabled(!0), this
            }, o.isActive = function () {
                var t, e = this._timeline,
                    i = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale - 1e-8
            }, o._enabled = function (t, e) {
                return h || l.wake(), this._gc = !t, this._active = this.isActive(), !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
            }, o._kill = function (t, e) {
                return this._enabled(!1, !1)
            }, o.kill = function (t, e) {
                return this._kill(t, e), this
            }, o._uncache = function (t) {
                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                return this
            }, o._swapSelfInParams = function (t) {
                for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                return i
            }, o._callback = function (t) {
                var e = this.vars,
                    i = e[t],
                    s = e[t + "Params"],
                    r = e[t + "Scope"] || e.callbackScope || this;
                switch (s ? s.length : 0) {
                    case 0:
                        i.call(r);
                        break;
                    case 1:
                        i.call(r, s[0]);
                        break;
                    case 2:
                        i.call(r, s[0], s[1]);
                        break;
                    default:
                        i.apply(r, s)
                }
            }, o.eventCallback = function (t, e, i, s) {
                if ("on" === (t || "").substr(0, 2)) {
                    var r = this.vars;
                    if (1 === arguments.length) return r[t];
                    null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = d(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e)
                }
                return this
            }, o.delay = function (t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
            }, o.duration = function (t) {
                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, o.totalDuration = function (t) {
                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
            }, o.time = function (t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
            }, o.totalTime = function (t, e, i) {
                if (h || l.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (t < 0 && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var s = this._totalDuration,
                            r = this._timeline;
                        if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? s - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                            for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                    }
                    this._gc && this._enabled(!0, !1), this._totalTime === t && 0 !== this._duration || (z.length && X(), this.render(t, e, !1), z.length && X())
                }
                return this
            }, o.progress = o.totalProgress = function (t, e) {
                var i = this.duration();
                return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
            }, o.startTime = function (t) {
                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
            }, o.endTime = function (t) {
                return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
            }, o.timeScale = function (t) {
                if (!arguments.length) return this._timeScale;
                var e, i;
                for (t = t || 1e-8, this._timeline && this._timeline.smoothChildTiming && (i = (e = this._pauseTime) || 0 === e ? e : this._timeline.totalTime(), this._startTime = i - (i - this._startTime) * this._timeScale / t), this._timeScale = t, i = this.timeline; i && i.timeline;) i._dirty = !0, i.totalDuration(), i = i.timeline;
                return this
            }, o.reversed = function (t) {
                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, o.paused = function (t) {
                if (!arguments.length) return this._paused;
                var e, i, s = this._timeline;
                return t != this._paused && s && (h || t || l.wake(), i = (e = s.rawTime()) - this._pauseTime, !t && s.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = s.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this
            };
            var E = y("core.SimpleTimeline", function (t) {
                D.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            (o = E.prototype = new D).constructor = E, o.kill()._gc = !1, o._first = o._last = o._recent = null, o._sortChildren = !1, o.add = o.insert = function (t, e, i, s) {
                var r, n;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = this.rawTime() - (t._timeline.rawTime() - t._pauseTime)), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), r = this._last, this._sortChildren)
                    for (n = t._startTime; r && r._startTime > n;) r = r._prev;
                return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = r, this._recent = t, this._timeline && this._uncache(!0), this
            }, o._remove = function (t, e) {
                return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, o.render = function (t, e, i) {
                var s, r = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; r;) s = r._next, (r._active || t >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = s
            }, o.rawTime = function () {
                return h || l.wake(), this._totalTime
            };
            var I = y("TweenLite", function (e, i, s) {
                    if (D.call(this, i, s), this.render = I.prototype.render, null == e) throw "Cannot tween a null target.";
                    this.target = e = "string" != typeof e ? e : I.selector(e) || e;
                    var r, n, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? H[I.defaultOverwrite] : "number" == typeof l ? l >> 0 : H[l], (o || e instanceof Array || e.push && d(e)) && "number" != typeof e[0])
                        for (this._targets = a = f(e), this._propLookup = [], this._siblings = [], r = 0; r < a.length; r++)(n = a[r]) ? "string" != typeof n ? n.length && n !== t && n[0] && (n[0] === t || n[0].nodeType && n[0].style && !n.nodeType) ? (a.splice(r--, 1), this._targets = a = a.concat(f(n))) : (this._siblings[r] = Y(n, this, !1), 1 === l && this._siblings[r].length > 1 && tt(n, this, null, 1, this._siblings[r])) : "string" == typeof (n = a[r--] = I.selector(n)) && a.splice(r + 1, 1) : a.splice(r--, 1);
                    else this._propLookup = {}, this._siblings = Y(e, this, !1), 1 === l && this._siblings.length > 1 && tt(e, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -1e-8, this.render(Math.min(0, -this._delay)))
                }, !0),
                O = function (e) {
                    return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                };
            (o = I.prototype = new D).constructor = I, o.kill()._gc = !1, o.ratio = 0, o._firstPT = o._targets = o._overwrittenProps = o._startAt = null, o._notifyPluginsOfEnabled = o._lazy = !1, I.version = "2.1.3", I.defaultEase = o._ease = new P(null, null, 1, 1), I.defaultOverwrite = "auto", I.ticker = l, I.autoSleep = 120, I.lagSmoothing = function (t, e) {
                l.lagSmoothing(t, e)
            }, I.selector = t.$ || t.jQuery || function (e) {
                var i = t.$ || t.jQuery;
                return i ? (I.selector = i, i(e)) : (s || (s = t.document), s ? s.querySelectorAll ? s.querySelectorAll(e) : s.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e)
            };
            var z = [],
                F = {},
                L = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                U = /[\+-]=-?[\.\d]/,
                N = function (t) {
                    for (var e, i = this._firstPT; i;) e = i.blob ? 1 === t && null != this.end ? this.end : t ? this.join("") : this.start : i.c * t + i.s, i.m ? e = i.m.call(this._tween, e, this._target || i.t, this._tween) : e < 1e-6 && e > -1e-6 && !i.blob && (e = 0), i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next
                },
                j = function (t) {
                    return (1e3 * t | 0) / 1e3 + ""
                },
                G = function (t, e, i, s) {
                    var r, n, a, o, l, h, _, u = [],
                        p = 0,
                        c = "",
                        f = 0;
                    for (u.start = t, u.end = e, t = u[0] = t + "", e = u[1] = e + "", i && (i(u), t = u[0], e = u[1]), u.length = 0, r = t.match(L) || [], n = e.match(L) || [], s && (s._next = null, s.blob = 1, u._firstPT = u._applyPT = s), l = n.length, o = 0; o < l; o++) _ = n[o], c += (h = e.substr(p, e.indexOf(_, p) - p)) || !o ? h : ",", p += h.length, f ? f = (f + 1) % 5 : "rgba(" === h.substr(-5) && (f = 1), _ === r[o] || r.length <= o ? c += _ : (c && (u.push(c), c = ""), a = parseFloat(r[o]), u.push(a), u._firstPT = {
                        _next: u._firstPT,
                        t: u,
                        p: u.length - 1,
                        s: a,
                        c: ("=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * parseFloat(_.substr(2)) : parseFloat(_) - a) || 0,
                        f: 0,
                        m: f && f < 4 ? Math.round : j
                    }), p += _.length;
                    return (c += e.substr(p)) && u.push(c), u.setRatio = N, U.test(e) && (u.end = null), u
                },
                Q = function (t, i, s, r, n, a, o, l, h) {
                    "function" == typeof r && (r = r(h || 0, t));
                    var _ = e(t[i]),
                        u = "function" !== _ ? "" : i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3),
                        p = "get" !== s ? s : u ? o ? t[u](o) : t[u]() : t[i],
                        c = "string" == typeof r && "=" === r.charAt(1),
                        f = {
                            t: t,
                            p: i,
                            s: p,
                            f: "function" === _,
                            pg: 0,
                            n: n || i,
                            m: a ? "function" == typeof a ? a : Math.round : 0,
                            pr: 0,
                            c: c ? parseInt(r.charAt(0) + "1", 10) * parseFloat(r.substr(2)) : parseFloat(r) - p || 0
                        };
                    if (("number" != typeof p || "number" != typeof r && !c) && (o || isNaN(p) || !c && isNaN(r) || "boolean" == typeof p || "boolean" == typeof r ? (f.fp = o, f = {
                            t: G(p, c ? parseFloat(f.s) + f.c + (f.s + "").replace(/[0-9\-\.]/g, "") : r, l || I.defaultStringFilter, f),
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 2,
                            pg: 0,
                            n: n || i,
                            pr: 0,
                            m: 0
                        }) : (f.s = parseFloat(p), c || (f.c = parseFloat(r) - f.s || 0))), f.c) return (f._next = this._firstPT) && (f._next._prev = f), this._firstPT = f, f
                },
                q = I._internals = {
                    isArray: d,
                    isSelector: O,
                    lazyTweens: z,
                    blobDif: G
                },
                B = I._plugins = {},
                M = q.tweenLookup = {},
                $ = 0,
                K = q.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1,
                    id: 1,
                    yoyoEase: 1,
                    stagger: 1
                },
                H = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    true: 1,
                    false: 0
                },
                J = D._rootFramesTimeline = new E,
                V = D._rootTimeline = new E,
                W = 30,
                X = q.lazyRender = function () {
                    var t, e, i = z.length;
                    for (F = {}, t = 0; t < i; t++)(e = z[t]) && !1 !== e._lazy && (e.render(e._lazy[0], e._lazy[1], !0), e._lazy = !1);
                    z.length = 0
                };
            V._startTime = l.time, J._startTime = l.frame, V._active = J._active = !0, setTimeout(X, 1), D._updateRoot = I.render = function () {
                var t, e, i;
                if (z.length && X(), V.render((l.time - V._startTime) * V._timeScale, !1, !1), J.render((l.frame - J._startTime) * J._timeScale, !1, !1), z.length && X(), l.frame >= W) {
                    for (i in W = l.frame + (parseInt(I.autoSleep, 10) || 120), M) {
                        for (t = (e = M[i].tweens).length; --t > -1;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete M[i]
                    }
                    if ((!(i = V._first) || i._paused) && I.autoSleep && !J._first && 1 === l._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || l.sleep()
                    }
                }
            }, l.addEventListener("tick", D._updateRoot);
            var Y = function (t, e, i) {
                    var s, r, n = t._gsTweenID;
                    if (M[n || (t._gsTweenID = n = "t" + $++)] || (M[n] = {
                            target: t,
                            tweens: []
                        }), e && ((s = M[n].tweens)[r = s.length] = e, i))
                        for (; --r > -1;) s[r] === e && s.splice(r, 1);
                    return M[n].tweens
                },
                Z = function (t, e, i, s) {
                    var r, n, a = t.vars.onOverwrite;
                    return a && (r = a(t, e, i, s)), (a = I.onOverwrite) && (n = a(t, e, i, s)), !1 !== r && !1 !== n
                },
                tt = function (t, e, i, s, r) {
                    var n, a, o, l;
                    if (1 === s || s >= 4) {
                        for (l = r.length, n = 0; n < l; n++)
                            if ((o = r[n]) !== e) o._gc || o._kill(null, t, e) && (a = !0);
                            else if (5 === s) break;
                        return a
                    }
                    var h, _ = e._startTime + 1e-8,
                        u = [],
                        p = 0,
                        c = 0 === e._duration;
                    for (n = r.length; --n > -1;)(o = r[n]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (h = h || et(e, 0, c), 0 === et(o, h, c) && (u[p++] = o)) : o._startTime <= _ && o._startTime + o.totalDuration() / o._timeScale > _ && ((c || !o._initted) && _ - o._startTime <= 2e-8 || (u[p++] = o)));
                    for (n = p; --n > -1;)
                        if (l = (o = u[n])._firstPT, 2 === s && o._kill(i, t, e) && (a = !0), 2 !== s || !o._firstPT && o._initted && l) {
                            if (2 !== s && !Z(o, e)) continue;
                            o._enabled(!1, !1) && (a = !0)
                        } return a
                },
                et = function (t, e, i) {
                    for (var s = t._timeline, r = s._timeScale, n = t._startTime; s._timeline;) {
                        if (n += s._startTime, r *= s._timeScale, s._paused) return -100;
                        s = s._timeline
                    }
                    return (n /= r) > e ? n - e : i && n === e || !t._initted && n - e < 2e-8 ? 1e-8 : (n += t.totalDuration() / t._timeScale / r) > e + 1e-8 ? 0 : n - e - 1e-8
                };
            o._init = function () {
                var t, e, i, s, r, n, a = this.vars,
                    o = this._overwrittenProps,
                    l = this._duration,
                    h = !!a.immediateRender,
                    _ = a.ease,
                    u = this._startAt;
                if (a.startAt) {
                    for (s in u && (u.render(-1, !0), u.kill()), r = {}, a.startAt) r[s] = a.startAt[s];
                    if (r.data = "isStart", r.overwrite = !1, r.immediateRender = !0, r.lazy = h && !1 !== a.lazy, r.startAt = r.delay = null, r.onUpdate = a.onUpdate, r.onUpdateParams = a.onUpdateParams, r.onUpdateScope = a.onUpdateScope || a.callbackScope || this, this._startAt = I.to(this.target || {}, 0, r), h)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== l) return
                } else if (a.runBackwards && 0 !== l)
                    if (u) u.render(-1, !0), u.kill(), this._startAt = null;
                    else {
                        for (s in 0 !== this._time && (h = !1), i = {}, a) K[s] && "autoCSS" !== s || (i[s] = a[s]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && !1 !== a.lazy, i.immediateRender = h, this._startAt = I.to(this.target, 0, i), h) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    } if (this._ease = _ = _ ? _ instanceof P ? _ : "function" == typeof _ ? new P(_, a.easeParams) : b[_] || I.defaultEase : I.defaultEase, a.easeParams instanceof Array && _.config && (this._ease = _.config.apply(_, a.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (n = this._targets.length, t = 0; t < n; t++) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], o ? o[t] : null, t) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, o, 0);
                if (e && I._onPluginEvent("_onInitAllProps", this), o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), a.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = a.onUpdate, this._initted = !0
            }, o._initProps = function (e, i, s, r, n) {
                var a, o, l, h, _, u;
                if (null == e) return !1;
                for (a in F[e._gsTweenID] && X(), this.vars.css || e.style && e !== t && e.nodeType && B.css && !1 !== this.vars.autoCSS && function (t, e) {
                        var i, s = {};
                        for (i in t) K[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!B[i] || B[i] && B[i]._autoCSS) || (s[i] = t[i], delete t[i]);
                        t.css = s
                    }(this.vars, e), this.vars)
                    if (u = this.vars[a], K[a]) u && (u instanceof Array || u.push && d(u)) && -1 !== u.join("").indexOf("{self}") && (this.vars[a] = u = this._swapSelfInParams(u, this));
                    else if (B[a] && (h = new B[a])._onInitTween(e, this.vars[a], this, n)) {
                    for (this._firstPT = _ = {
                            _next: this._firstPT,
                            t: h,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: a,
                            pg: 1,
                            pr: h._priority,
                            m: 0
                        }, o = h._overwriteProps.length; --o > -1;) i[h._overwriteProps[o]] = this._firstPT;
                    (h._priority || h._onInitAllProps) && (l = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0), _._next && (_._next._prev = _)
                } else i[a] = Q.call(this, e, a, "get", u, a, 0, null, this.vars.stringFilter, n);
                return r && this._kill(r, e) ? this._initProps(e, i, s, r, n) : this._overwrite > 1 && this._firstPT && s.length > 1 && tt(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, r, n)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (F[e._gsTweenID] = !0), l)
            }, o.render = function (t, e, i) {
                var s, r, n, a, o = this._time,
                    l = this._duration,
                    h = this._rawPrevTime;
                if (t >= l - 1e-8 && t >= 0) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (h < 0 || t <= 0 && t >= -1e-8 || 1e-8 === h && "isPause" !== this.data) && h !== t && (i = !0, h > 1e-8 && (r = "onReverseComplete")), this._rawPrevTime = a = !e || t || h === t ? t : 1e-8);
                else if (t < 1e-8) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && h > 0) && (r = "onReverseComplete", s = this._reversed), t > -1e-8 ? t = 0 : t < 0 && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (1e-8 !== h || "isPause" !== this.data) && (i = !0), this._rawPrevTime = a = !e || t || h === t ? t : 1e-8)), (!this._initted || this._startAt && this._startAt.progress()) && (i = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var _ = t / l,
                        u = this._easeType,
                        p = this._easePower;
                    (1 === u || 3 === u && _ >= .5) && (_ = 1 - _), 3 === u && (_ *= 2), 1 === p ? _ *= _ : 2 === p ? _ *= _ * _ : 3 === p ? _ *= _ * _ * _ : 4 === p && (_ *= _ * _ * _ * _), this.ratio = 1 === u ? 1 - _ : 2 === u ? _ : t / l < .5 ? _ / 2 : 1 - _ / 2
                } else this.ratio = this._ease.getRatio(t / l);
                if (this._time !== o || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = h, z.push(this), void(this._lazy = [t, e]);
                        this._time && !s ? this.ratio = this._ease.getRatio(this._time / l) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, !0, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 === this._time && 0 !== l || e || this._callback("onStart"))), n = this._firstPT; n;) n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
                    this._onUpdate && (t < 0 && this._startAt && -1e-4 !== t && this._startAt.render(t, !0, i), e || (this._time !== o || s || i) && this._callback("onUpdate")), r && (this._gc && !i || (t < 0 && this._startAt && !this._onUpdate && -1e-4 !== t && this._startAt.render(t, !0, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === l && 1e-8 === this._rawPrevTime && 1e-8 !== a && (this._rawPrevTime = 0)))
                }
            }, o._kill = function (t, i, s) {
                if ("all" === t && (t = null), null == t && (null == i || i === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                i = "string" != typeof i ? i || this._targets || this.target : I.selector(i) || i;
                var r, n, a, o, l, h, _, u, p, c = s && this._time && s._startTime === this._startTime && this._timeline === s._timeline,
                    f = this._firstPT;
                if ((d(i) || O(i)) && "number" != typeof i[0])
                    for (r = i.length; --r > -1;) this._kill(t, i[r], s) && (h = !0);
                else {
                    if (this._targets) {
                        for (r = this._targets.length; --r > -1;)
                            if (i === this._targets[r]) {
                                l = this._propLookup[r] || {}, this._overwrittenProps = this._overwrittenProps || [], n = this._overwrittenProps[r] = t ? this._overwrittenProps[r] || {} : "all";
                                break
                            }
                    } else {
                        if (i !== this.target) return !1;
                        l = this._propLookup, n = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                    }
                    if (l) {
                        if (_ = t || l, u = t !== n && "all" !== n && t !== l && ("object" !== e(t) || !t._tempKill), s && (I.onOverwrite || this.vars.onOverwrite)) {
                            for (a in _) l[a] && (p || (p = []), p.push(a));
                            if ((p || !t) && !Z(this, s, i, p)) return !1
                        }
                        for (a in _)(o = l[a]) && (c && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, h = !0), o.pg && o.t._kill(_) && (h = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete l[a]), u && (n[a] = 1);
                        !this._firstPT && this._initted && f && this._enabled(!1, !1)
                    }
                }
                return h
            }, o.invalidate = function () {
                this._notifyPluginsOfEnabled && I._onPluginEvent("_onDisable", this);
                var t = this._time;
                return this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], D.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -1e-8, this.render(t, !1, !1 !== this.vars.lazy)), this
            }, o._enabled = function (t, e) {
                if (h || l.wake(), t && this._gc) {
                    var i, s = this._targets;
                    if (s)
                        for (i = s.length; --i > -1;) this._siblings[i] = Y(s[i], this, !0);
                    else this._siblings = Y(this.target, this, !0)
                }
                return D.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && I._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
            }, I.to = function (t, e, i) {
                return new I(t, e, i)
            }, I.from = function (t, e, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new I(t, e, i)
            }, I.fromTo = function (t, e, i, s) {
                return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new I(t, e, s)
            }, I.delayedCall = function (t, e, i, s, r) {
                return new I(e, 0, {
                    delay: t,
                    onComplete: e,
                    onCompleteParams: i,
                    callbackScope: s,
                    onReverseComplete: e,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: r,
                    overwrite: 0
                })
            }, I.set = function (t, e) {
                return new I(t, 0, e)
            }, I.getTweensOf = function (t, e) {
                if (null == t) return [];
                var i, s, r, n;
                if (t = "string" != typeof t ? t : I.selector(t) || t, (d(t) || O(t)) && "number" != typeof t[0]) {
                    for (i = t.length, s = []; --i > -1;) s = s.concat(I.getTweensOf(t[i], e));
                    for (i = s.length; --i > -1;)
                        for (n = s[i], r = i; --r > -1;) n === s[r] && s.splice(i, 1)
                } else if (t._gsTweenID)
                    for (i = (s = Y(t).concat()).length; --i > -1;)(s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
                return s || []
            }, I.killTweensOf = I.killDelayedCallsTo = function (t, i, s) {
                "object" === e(i) && (s = i, i = !1);
                for (var r = I.getTweensOf(t, i), n = r.length; --n > -1;) r[n]._kill(s, t)
            };
            var it = y("plugins.TweenPlugin", function (t, e) {
                this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = it.prototype
            }, !0);
            if (o = it.prototype, it.version = "1.19.0", it.API = 2, o._firstPT = null, o._addTween = Q, o.setRatio = N, o._kill = function (t) {
                    var e, i = this._overwriteProps,
                        s = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = [];
                    else
                        for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                    for (; s;) null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
                    return !1
                }, o._mod = o._roundProps = function (t) {
                    for (var e, i = this._firstPT; i;)(e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e), i = i._next
                }, I._onPluginEvent = function (t, e) {
                    var i, s, r, n, a, o = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; o;) {
                            for (a = o._next, s = r; s && s.pr > o.pr;) s = s._next;
                            (o._prev = s ? s._prev : n) ? o._prev._next = o: r = o, (o._next = s) ? s._prev = o : n = o, o = a
                        }
                        o = e._firstPT = r
                    }
                    for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
                    return i
                }, it.activate = function (t) {
                    for (var e = t.length; --e > -1;) t[e].API === it.API && (B[(new t[e])._propName] = t[e]);
                    return !0
                }, T.plugin = function (t) {
                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                    var e, i = t.propName,
                        s = t.priority || 0,
                        r = t.overwriteProps,
                        n = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_mod",
                            mod: "_mod",
                            initAll: "_onInitAllProps"
                        },
                        a = y("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
                            it.call(this, i, s), this._overwriteProps = r || []
                        }, !0 === t.global),
                        o = a.prototype = new it(i);
                    for (e in o.constructor = a, a.API = t.API, n) "function" == typeof t[e] && (o[n[e]] = t[e]);
                    return a.version = t.version, it.activate([a]), a
                }, n = t._gsQueue) {
                for (a = 0; a < n.length; a++) n[a]();
                for (o in v) v[o].func || t.console.log("GSAP encountered missing dependency: " + o)
            }
            return h = !1, I
        }(i);
        exports.default = exports.TweenLite = s;
        var r = i.GreenSockGlobals;
        exports.globals = r;
        var n = r.com.greensock,
            a = n.core.SimpleTimeline;
        exports.SimpleTimeline = a;
        var o = n.core.Animation;
        exports.Animation = o;
        var l = r.Ease;
        exports.Ease = l;
        var h = r.Linear;
        exports.Linear = h;
        var _ = h;
        exports.Power0 = _;
        var u = r.Power1;
        exports.Power1 = u;
        var p = r.Power2;
        exports.Power2 = p;
        var c = r.Power3;
        exports.Power3 = c;
        var f = r.Power4;
        exports.Power4 = f;
        var m = r.TweenPlugin;
        exports.TweenPlugin = m;
        var d = n.events.EventDispatcher;
        exports.EventDispatcher = d;
}, {}],
    "tBUL": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), Object.defineProperty(exports, "TweenLite", {
            enumerable: !0,
            get: function () {
                return t.default
            }
        }), Object.defineProperty(exports, "Ease", {
            enumerable: !0,
            get: function () {
                return t.Ease
            }
        }), Object.defineProperty(exports, "Power0", {
            enumerable: !0,
            get: function () {
                return t.Power0
            }
        }), Object.defineProperty(exports, "Power1", {
            enumerable: !0,
            get: function () {
                return t.Power1
            }
        }), Object.defineProperty(exports, "Power2", {
            enumerable: !0,
            get: function () {
                return t.Power2
            }
        }), Object.defineProperty(exports, "Power3", {
            enumerable: !0,
            get: function () {
                return t.Power3
            }
        }), Object.defineProperty(exports, "Power4", {
            enumerable: !0,
            get: function () {
                return t.Power4
            }
        }), Object.defineProperty(exports, "Linear", {
            enumerable: !0,
            get: function () {
                return t.Linear
            }
        }), exports.TweenMaxBase = exports.default = exports.TweenMax = void 0;
        var t = i(require("./TweenLite.js"));

        function e() {
            if ("function" != typeof WeakMap) return null;
            var t = new WeakMap;
            return e = function () {
                return t
            }, t
        }

        function i(t) {
            if (t && t.__esModule) return t;
            if (null === t || "object" != typeof t && "function" != typeof t) return {
                default: t
            };
            var i = e();
            if (i && i.has(t)) return i.get(t);
            var r = {},
                s = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var a in t)
                if (Object.prototype.hasOwnProperty.call(t, a)) {
                    var n = s ? Object.getOwnPropertyDescriptor(t, a) : null;
                    n && (n.get || n.set) ? Object.defineProperty(r, a, n) : r[a] = t[a]
                } return r.default = t, i && i.set(t, r), r
        }

        function r(t) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        t._gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function () {
            var e = function (t) {
                    var e, i = [],
                        r = t.length;
                    for (e = 0; e !== r; i.push(t[e++]));
                    return i
                },
                i = function (t, e, i) {
                    var r, s, a = t.cycle;
                    for (r in a) s = a[r], t[r] = "function" == typeof s ? s(i, e[i], e) : s[i % s.length];
                    delete t.cycle
                },
                s = function (t) {
                    if ("function" == typeof t) return t;
                    var e = "object" === r(t) ? t : {
                            each: t
                        },
                        i = e.ease,
                        s = e.from || 0,
                        a = e.base || 0,
                        n = {},
                        o = isNaN(s),
                        h = e.axis,
                        l = {
                            center: .5,
                            end: 1
                        } [s] || 0;
                    return function (t, r, _) {
                        var c, u, m, f, d, y, p, g, v, T = (_ || e).length,
                            b = n[T];
                        if (!b) {
                            if (!(v = "auto" === e.grid ? 0 : (e.grid || [1 / 0])[0])) {
                                for (p = -1 / 0; p < (p = _[v++].getBoundingClientRect().left) && v < T;);
                                v--
                            }
                            for (b = n[T] = [], c = o ? Math.min(v, T) * l - .5 : s % v, u = o ? T * l / v - .5 : s / v | 0, p = 0, g = 1 / 0, y = 0; y < T; y++) m = y % v - c, f = u - (y / v | 0), b[y] = d = h ? Math.abs("y" === h ? f : m) : Math.sqrt(m * m + f * f), d > p && (p = d), d < g && (g = d);
                            b.max = p - g, b.min = g, b.v = T = e.amount || e.each * (v > T ? T - 1 : h ? "y" === h ? T / v : v : Math.max(v, T / v)) || 0, b.b = T < 0 ? a - T : a
                        }
                        return T = (b[t] - b.min) / b.max, b.b + (i ? i.getRatio(T) : T) * b.v
                    }
                },
                a = function e(i, r, s) {
                    t.default.call(this, i, r, s), this._cycle = 0, this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._repeat && this._uncache(!0), this.render = e.prototype.render
                },
                n = t.default._internals,
                o = n.isSelector,
                h = n.isArray,
                l = a.prototype = t.default.to({}, .1, {}),
                _ = [];
            a.version = "2.1.3", l.constructor = a, l.kill()._gc = !1, a.killTweensOf = a.killDelayedCallsTo = t.default.killTweensOf, a.getTweensOf = t.default.getTweensOf, a.lagSmoothing = t.default.lagSmoothing, a.ticker = t.default.ticker, a.render = t.default.render, a.distribute = s, l.invalidate = function () {
                return this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._yoyoEase = null, this._uncache(!0), t.default.prototype.invalidate.call(this)
            }, l.updateTo = function (e, i) {
                var r, s = this.ratio,
                    a = this.vars.immediateRender || e.immediateRender;
                for (r in i && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay)), e) this.vars[r] = e[r];
                if (this._initted || a)
                    if (i) this._initted = !1, a && this.render(0, !0, !0);
                    else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && t.default._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                    var n = this._totalTime;
                    this.render(0, !0, !1), this._initted = !1, this.render(n, !0, !1)
                } else if (this._initted = !1, this._init(), this._time > 0 || a)
                    for (var o, h = 1 / (1 - s), l = this._firstPT; l;) o = l.s + l.c, l.c *= h, l.s = o - l.c, l = l._next;
                return this
            }, l.render = function (e, i, r) {
                this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                var s, a, o, h, l, _, c, u, m, f = this._dirty ? this.totalDuration() : this._totalDuration,
                    d = this._time,
                    y = this._totalTime,
                    p = this._cycle,
                    g = this._duration,
                    v = this._rawPrevTime;
                if (e >= f - 1e-8 && e >= 0 ? (this._totalTime = f, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = g, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (s = !0, a = "onComplete", r = r || this._timeline.autoRemoveChildren), 0 === g && (this._initted || !this.vars.lazy || r) && (this._startTime === this._timeline._duration && (e = 0), (v < 0 || e <= 0 && e >= -1e-8 || 1e-8 === v && "isPause" !== this.data) && v !== e && (r = !0, v > 1e-8 && (a = "onReverseComplete")), this._rawPrevTime = u = !i || e || v === e ? e : 1e-8)) : e < 1e-8 ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== y || 0 === g && v > 0) && (a = "onReverseComplete", s = this._reversed), e > -1e-8 ? e = 0 : e < 0 && (this._active = !1, 0 === g && (this._initted || !this.vars.lazy || r) && (v >= 0 && (r = !0), this._rawPrevTime = u = !i || e || v === e ? e : 1e-8)), this._initted || (r = !0)) : (this._totalTime = this._time = e, 0 !== this._repeat && (h = g + this._repeatDelay, this._cycle = this._totalTime / h >> 0, 0 !== this._cycle && this._cycle === this._totalTime / h && y <= e && this._cycle--, this._time = this._totalTime - this._cycle * h, this._yoyo && 0 != (1 & this._cycle) && (this._time = g - this._time, (m = this._yoyoEase || this.vars.yoyoEase) && (this._yoyoEase || (!0 !== m || this._initted ? this._yoyoEase = m = !0 === m ? this._ease : m instanceof t.Ease ? m : t.Ease.map[m] : (m = this.vars.ease, this._yoyoEase = m = m ? m instanceof t.Ease ? m : "function" == typeof m ? new t.Ease(m, this.vars.easeParams) : t.Ease.map[m] || t.default.defaultEase : t.default.defaultEase)), this.ratio = m ? 1 - m.getRatio((g - this._time) / g) : 0)), this._time > g ? this._time = g : this._time < 0 && (this._time = 0)), this._easeType && !m ? (l = this._time / g, (1 === (_ = this._easeType) || 3 === _ && l >= .5) && (l = 1 - l), 3 === _ && (l *= 2), 1 === (c = this._easePower) ? l *= l : 2 === c ? l *= l * l : 3 === c ? l *= l * l * l : 4 === c && (l *= l * l * l * l), this.ratio = 1 === _ ? 1 - l : 2 === _ ? l : this._time / g < .5 ? l / 2 : 1 - l / 2) : m || (this.ratio = this._ease.getRatio(this._time / g))), d !== this._time || r || p !== this._cycle) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!r && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = d, this._totalTime = y, this._rawPrevTime = v, this._cycle = p, n.lazyTweens.push(this), void(this._lazy = [e, i]);
                        !this._time || s || m ? s && this._ease._calcEnd && !m && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / g)
                    }
                    for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== d && e >= 0 && (this._active = !0), 0 === y && (2 === this._initted && e > 0 && this._init(), this._startAt && (e >= 0 ? this._startAt.render(e, !0, r) : a || (a = "_dummyGS")), this.vars.onStart && (0 === this._totalTime && 0 !== g || i || this._callback("onStart"))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
                    this._onUpdate && (e < 0 && this._startAt && this._startTime && this._startAt.render(e, !0, r), i || (this._totalTime !== y || a) && this._callback("onUpdate")), this._cycle !== p && (i || this._gc || this.vars.onRepeat && this._callback("onRepeat")), a && (this._gc && !r || (e < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, !0, r), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !i && this.vars[a] && this._callback(a), 0 === g && 1e-8 === this._rawPrevTime && 1e-8 !== u && (this._rawPrevTime = 0)))
                } else y !== this._totalTime && this._onUpdate && (i || this._callback("onUpdate"))
            }, a.to = function (t, e, i) {
                return new a(t, e, i)
            }, a.from = function (t, e, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new a(t, e, i)
            }, a.fromTo = function (t, e, i, r) {
                return r.startAt = i, r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender, new a(t, e, r)
            }, a.staggerTo = a.allTo = function (r, n, l, c, u, m, f) {
                var d, y, p, g, v = [],
                    T = s(l.stagger || c),
                    b = l.cycle,
                    w = (l.startAt || _).cycle;
                for (h(r) || ("string" == typeof r && (r = t.default.selector(r) || r), o(r) && (r = e(r))), d = (r = r || []).length - 1, p = 0; p <= d; p++) {
                    for (g in y = {}, l) y[g] = l[g];
                    if (b && (i(y, r, p), null != y.duration && (n = y.duration, delete y.duration)), w) {
                        for (g in w = y.startAt = {}, l.startAt) w[g] = l.startAt[g];
                        i(y.startAt, r, p)
                    }
                    y.delay = T(p, r[p], r) + (y.delay || 0), p === d && u && (y.onComplete = function () {
                        l.onComplete && l.onComplete.apply(l.onCompleteScope || this, arguments), u.apply(f || l.callbackScope || this, m || _)
                    }), v[p] = new a(r[p], n, y)
                }
                return v
            }, a.staggerFrom = a.allFrom = function (t, e, i, r, s, n, o) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, a.staggerTo(t, e, i, r, s, n, o)
            }, a.staggerFromTo = a.allFromTo = function (t, e, i, r, s, n, o, h) {
                return r.startAt = i, r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender, a.staggerTo(t, e, r, s, n, o, h)
            }, a.delayedCall = function (t, e, i, r, s) {
                return new a(e, 0, {
                    delay: t,
                    onComplete: e,
                    onCompleteParams: i,
                    callbackScope: r,
                    onReverseComplete: e,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    useFrames: s,
                    overwrite: 0
                })
            }, a.set = function (t, e) {
                return new a(t, 0, e)
            }, a.isTweening = function (e) {
                return t.default.getTweensOf(e, !0).length > 0
            };
            var c = function e(i, r) {
                    for (var s = [], a = 0, n = i._first; n;) n instanceof t.default ? s[a++] = n : (r && (s[a++] = n), a = (s = s.concat(e(n, r))).length), n = n._next;
                    return s
                },
                u = a.getAllTweens = function (e) {
                    return c(t.Animation._rootTimeline, e).concat(c(t.Animation._rootFramesTimeline, e))
                };
            a.killAll = function (e, i, r, s) {
                null == i && (i = !0), null == r && (r = !0);
                var a, n, o, h = u(0 != s),
                    l = h.length,
                    _ = i && r && s;
                for (o = 0; o < l; o++) n = h[o], (_ || n instanceof t.SimpleTimeline || (a = n.target === n.vars.onComplete) && r || i && !a) && (e ? n.totalTime(n._reversed ? 0 : n.totalDuration()) : n._enabled(!1, !1))
            }, a.killChildTweensOf = function (i, r) {
                if (null != i) {
                    var s, l, _, c, u, m = n.tweenLookup;
                    if ("string" == typeof i && (i = t.default.selector(i) || i), o(i) && (i = e(i)), h(i))
                        for (c = i.length; --c > -1;) a.killChildTweensOf(i[c], r);
                    else {
                        for (_ in s = [], m)
                            for (l = m[_].target.parentNode; l;) l === i && (s = s.concat(m[_].tweens)), l = l.parentNode;
                        for (u = s.length, c = 0; c < u; c++) r && s[c].totalTime(s[c].totalDuration()), s[c]._enabled(!1, !1)
                    }
                }
            };
            var m = function (e, i, r, s) {
                i = !1 !== i, r = !1 !== r;
                for (var a, n, o = u(s = !1 !== s), h = i && r && s, l = o.length; --l > -1;) n = o[l], (h || n instanceof t.SimpleTimeline || (a = n.target === n.vars.onComplete) && r || i && !a) && n.paused(e)
            };
            return a.pauseAll = function (t, e, i) {
                m(!0, t, e, i)
            }, a.resumeAll = function (t, e, i) {
                m(!1, t, e, i)
            }, a.globalTimeScale = function (e) {
                var i = t.Animation._rootTimeline,
                    r = t.default.ticker.time;
                return arguments.length ? (e = e || 1e-8, i._startTime = r - (r - i._startTime) * i._timeScale / e, i = t.Animation._rootFramesTimeline, r = t.default.ticker.frame, i._startTime = r - (r - i._startTime) * i._timeScale / e, i._timeScale = t.Animation._rootTimeline._timeScale = e, e) : i._timeScale
            }, l.progress = function (t, e) {
                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this.duration() ? this._time / this._duration : this.ratio
            }, l.totalProgress = function (t, e) {
                return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
            }, l.time = function (t, e) {
                if (!arguments.length) return this._time;
                this._dirty && this.totalDuration();
                var i = this._duration,
                    r = this._cycle,
                    s = r * (i + this._repeatDelay);
                return t > i && (t = i), this.totalTime(this._yoyo && 1 & r ? i - t + s : this._repeat ? t + s : t, e)
            }, l.duration = function (e) {
                return arguments.length ? t.Animation.prototype.duration.call(this, e) : this._duration
            }, l.totalDuration = function (t) {
                return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
            }, l.repeat = function (t) {
                return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
            }, l.repeatDelay = function (t) {
                return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
            }, l.yoyo = function (t) {
                return arguments.length ? (this._yoyo = t, this) : this._yoyo
            }, a
        }, !0);
        var s = t.globals.TweenMax;
        exports.default = exports.TweenMax = s;
        var a = s;
        exports.TweenMaxBase = a;
}, {
        "./TweenLite.js": "sU2v"
    }],
    "KE4Q": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = exports.CSSPlugin = void 0;
        var t = r(require("./TweenLite.js"));

        function e() {
            if ("function" != typeof WeakMap) return null;
            var t = new WeakMap;
            return e = function () {
                return t
            }, t
        }

        function r(t) {
            if (t && t.__esModule) return t;
            if (null === t || "object" != typeof t && "function" != typeof t) return {
                default: t
            };
            var r = e();
            if (r && r.has(t)) return r.get(t);
            var i = {},
                s = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var n in t)
                if (Object.prototype.hasOwnProperty.call(t, n)) {
                    var a = s ? Object.getOwnPropertyDescriptor(t, n) : null;
                    a && (a.get || a.set) ? Object.defineProperty(i, n, a) : i[n] = t[n]
                } return i.default = t, r && r.set(t, i), i
        }

        function i(t) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        t._gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function () {
            var e, r, s, n, a = function e() {
                    t.TweenPlugin.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = e.prototype.setRatio
                },
                o = t._gsScope._gsDefine.globals,
                l = {},
                f = a.prototype = new t.TweenPlugin("css");
            f.constructor = a, a.version = "2.1.3", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", a.defaultSmoothOrigin = !0, a.suffixMap = {
                top: f = "px",
                right: f,
                bottom: f,
                left: f,
                width: f,
                height: f,
                fontSize: f,
                padding: f,
                margin: f,
                perspective: f,
                lineHeight: ""
            };
            var p, h, c, u, x, d, g, y, m = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                b = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                O = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b),?/gi,
                _ = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                w = /(?:\d|\-|\+|=|#|\.)*/g,
                P = /opacity *= *([^)]*)/i,
                T = /opacity:([^;]*)/i,
                M = /alpha\(opacity *=.+?\)/i,
                S = /^(rgb|hsl)/,
                X = /([A-Z])/g,
                k = /-([a-z])/gi,
                F = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                A = function (t, e) {
                    return e.toUpperCase()
                },
                R = /(?:Left|Right|Width)/i,
                C = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                Y = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                z = /,(?=[^\)]*(?:\(|$))/gi,
                j = /[\s,\(]/i,
                N = Math.PI / 180,
                B = 180 / Math.PI,
                V = {},
                L = {
                    style: {}
                },
                I = t._gsScope.document || {
                    createElement: function () {
                        return L
                    }
                },
                D = function (t, e) {
                    var r = I.createElementNS ? I.createElementNS(e || "http://www.w3.org/1999/xhtml", t) : I.createElement(t);
                    return r.style ? r : I.createElement(t)
                },
                W = D("div"),
                E = D("img"),
                Z = a._internals = {
                    _specialProps: l
                },
                H = (t._gsScope.navigator || {}).userAgent || "",
                q = function () {
                    var t = H.indexOf("Android"),
                        e = D("a");
                    return c = -1 !== H.indexOf("Safari") && -1 === H.indexOf("Chrome") && (-1 === t || parseFloat(H.substr(t + 8, 2)) > 3), x = c && parseFloat(H.substr(H.indexOf("Version/") + 8, 2)) < 6, u = -1 !== H.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(H) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(H)) && (d = parseFloat(RegExp.$1)), !!e && (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity))
                }(),
                $ = function (t) {
                    return P.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                },
                G = function (e) {
                    t._gsScope.console && console.log(e)
                },
                U = "",
                J = "",
                K = function (t, e) {
                    var r, i, s = (e = e || W).style;
                    if (void 0 !== s[t]) return t;
                    for (t = t.charAt(0).toUpperCase() + t.substr(1), r = ["O", "Moz", "ms", "Ms", "Webkit"], i = 5; --i > -1 && void 0 === s[r[i] + t];);
                    return i >= 0 ? (U = "-" + (J = 3 === i ? "ms" : r[i]).toLowerCase() + "-", J + t) : null
                },
                Q = "undefined" != typeof window ? window : I.defaultView || {
                    getComputedStyle: function () {}
                },
                tt = function (t) {
                    return Q.getComputedStyle(t)
                },
                et = a.getStyle = function (t, e, r, i, s) {
                    var n;
                    return q || "opacity" !== e ? (!i && t.style[e] ? n = t.style[e] : (r = r || tt(t)) ? n = r[e] || r.getPropertyValue(e) || r.getPropertyValue(e.replace(X, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]), null == s || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : s) : $(t)
                },
                rt = Z.convertToPixels = function (e, r, i, s, n) {
                    if ("px" === s || !s && "lineHeight" !== r) return i;
                    if ("auto" === s || !i) return 0;
                    var o, l, f, p = R.test(r),
                        h = e,
                        c = W.style,
                        u = i < 0,
                        x = 1 === i;
                    if (u && (i = -i), x && (i *= 100), "lineHeight" !== r || s)
                        if ("%" === s && -1 !== r.indexOf("border")) o = i / 100 * (p ? e.clientWidth : e.clientHeight);
                        else {
                            if (c.cssText = "border:0 solid red;position:" + et(e, "position") + ";line-height:0;", "%" !== s && h.appendChild && "v" !== s.charAt(0) && "rem" !== s) c[p ? "borderLeftWidth" : "borderTopWidth"] = i + s;
                            else {
                                if (h = e.parentNode || I.body, -1 !== et(h, "display").indexOf("flex") && (c.position = "absolute"), l = h._gsCache, f = t.default.ticker.frame, l && p && l.time === f) return l.width * i / 100;
                                c[p ? "width" : "height"] = i + s
                            }
                            h.appendChild(W), o = parseFloat(W[p ? "offsetWidth" : "offsetHeight"]), h.removeChild(W), p && "%" === s && !1 !== a.cacheWidths && ((l = h._gsCache = h._gsCache || {}).time = f, l.width = o / i * 100), 0 !== o || n || (o = rt(e, r, i, s, !0))
                        }
                    else l = tt(e).lineHeight, e.style.lineHeight = i, o = parseFloat(tt(e).lineHeight), e.style.lineHeight = l;
                    return x && (o /= 100), u ? -o : o
                },
                it = Z.calculateOffset = function (t, e, r) {
                    if ("absolute" !== et(t, "position", r)) return 0;
                    var i = "left" === e ? "Left" : "Top",
                        s = et(t, "margin" + i, r);
                    return t["offset" + i] - (rt(t, e, parseFloat(s), s.replace(w, "")) || 0)
                },
                st = function (t, e) {
                    var r, i, s, n = {};
                    if (e = e || tt(t))
                        if (r = e.length)
                            for (; --r > -1;) - 1 !== (s = e[r]).indexOf("-transform") && zt !== s || (n[s.replace(k, A)] = e.getPropertyValue(s));
                        else
                            for (r in e) - 1 !== r.indexOf("Transform") && Yt !== r || (n[r] = e[r]);
                    else if (e = t.currentStyle || t.style)
                        for (r in e) "string" == typeof r && void 0 === n[r] && (n[r.replace(k, A)] = e[r]);
                    return q || (n.opacity = $(t)), i = $t(t, e, !1), n.rotation = i.rotation, n.skewX = i.skewX, n.scaleX = i.scaleX, n.scaleY = i.scaleY, n.x = i.x, n.y = i.y, Nt && (n.z = i.z, n.rotationX = i.rotationX, n.rotationY = i.rotationY, n.scaleZ = i.scaleZ), n.filters && delete n.filters, n
                },
                nt = function (t, e, r, i, s) {
                    var n, a, o, l = {},
                        f = t.style;
                    for (a in r) "cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = r[a]) || s && s[a]) && -1 === a.indexOf("Origin") && ("number" != typeof n && "string" != typeof n || (l[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(_, "") ? n : 0 : it(t, a), void 0 !== f[a] && (o = new vt(f, a, f[a], o))));
                    if (i)
                        for (a in i) "className" !== a && (l[a] = i[a]);
                    return {
                        difs: l,
                        firstMPT: o
                    }
                },
                at = {
                    width: ["Left", "Right"],
                    height: ["Top", "Bottom"]
                },
                ot = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                lt = function (t, e, r) {
                    if ("svg" === (t.nodeName + "").toLowerCase()) return (r || tt(t))[e] || 0;
                    if (t.getCTM && Zt(t)) return t.getBBox()[e] || 0;
                    var i = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                        s = at[e],
                        n = s.length;
                    for (r = r || tt(t); --n > -1;) i -= parseFloat(et(t, "padding" + s[n], r, !0)) || 0, i -= parseFloat(et(t, "border" + s[n] + "Width", r, !0)) || 0;
                    return i
                },
                ft = function t(e, r) {
                    if ("contain" === e || "auto" === e || "auto auto" === e) return e + " ";
                    null != e && "" !== e || (e = "0 0");
                    var i, s = e.split(" "),
                        n = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : s[0],
                        a = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : s[1];
                    if (s.length > 3 && !r) {
                        for (s = e.split(", ").join(",").split(","), e = [], i = 0; i < s.length; i++) e.push(t(s[i]));
                        return e.join(",")
                    }
                    return null == a ? a = "center" === n ? "50%" : "0" : "center" === a && (a = "50%"), ("center" === n || isNaN(parseFloat(n)) && -1 === (n + "").indexOf("=")) && (n = "50%"), e = n + " " + a + (s.length > 2 ? " " + s[2] : ""), r && (r.oxp = -1 !== n.indexOf("%"), r.oyp = -1 !== a.indexOf("%"), r.oxr = "=" === n.charAt(1), r.oyr = "=" === a.charAt(1), r.ox = parseFloat(n.replace(_, "")), r.oy = parseFloat(a.replace(_, "")), r.v = e), r || e
                },
                pt = function (t, e) {
                    return "function" == typeof t && (t = t(y, g)), "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) || 0
                },
                ht = function (t, e) {
                    "function" == typeof t && (t = t(y, g));
                    var r = "string" == typeof t && "=" === t.charAt(1);
                    return "string" == typeof t && "v" === t.charAt(t.length - 2) && (t = (r ? t.substr(0, 2) : 0) + window["inner" + ("vh" === t.substr(-2) ? "Height" : "Width")] * (parseFloat(r ? t.substr(2) : t) / 100)), null == t ? e : r ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t) || 0
                },
                ct = function (t, e, r, i) {
                    var s, n, a, o;
                    return "function" == typeof t && (t = t(y, g)), null == t ? a = e : "number" == typeof t ? a = t : (360, s = t.split("_"), n = ((o = "=" === t.charAt(1)) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === t.indexOf("rad") ? 1 : B) - (o ? 0 : e), s.length && (i && (i[r] = e + n), -1 !== t.indexOf("short") && (n %= 360) !== n % 180 && (n = n < 0 ? n + 360 : n - 360), -1 !== t.indexOf("_cw") && n < 0 ? n = (n + 3599999999640) % 360 - 360 * (n / 360 | 0) : -1 !== t.indexOf("ccw") && n > 0 && (n = (n - 3599999999640) % 360 - 360 * (n / 360 | 0))), a = e + n), a < 1e-6 && a > -1e-6 && (a = 0), a
                },
                ut = {
                    aqua: [0, 255, 255],
                    lime: [0, 255, 0],
                    silver: [192, 192, 192],
                    black: [0, 0, 0],
                    maroon: [128, 0, 0],
                    teal: [0, 128, 128],
                    blue: [0, 0, 255],
                    navy: [0, 0, 128],
                    white: [255, 255, 255],
                    fuchsia: [255, 0, 255],
                    olive: [128, 128, 0],
                    yellow: [255, 255, 0],
                    orange: [255, 165, 0],
                    gray: [128, 128, 128],
                    purple: [128, 0, 128],
                    green: [0, 128, 0],
                    red: [255, 0, 0],
                    pink: [255, 192, 203],
                    cyan: [0, 255, 255],
                    transparent: [255, 255, 255, 0]
                },
                xt = function (t, e, r) {
                    return 255 * (6 * (t = t < 0 ? t + 1 : t > 1 ? t - 1 : t) < 1 ? e + (r - e) * t * 6 : t < .5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) + .5 | 0
                },
                dt = a.parseColor = function (t, e) {
                    var r, i, s, n, a, o, l, f, p, h, c;
                    if (t)
                        if ("number" == typeof t) r = [t >> 16, t >> 8 & 255, 255 & t];
                        else {
                            if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ut[t]) r = ut[t];
                            else if ("#" === t.charAt(0)) 4 === t.length && (i = t.charAt(1), s = t.charAt(2), n = t.charAt(3), t = "#" + i + i + s + s + n + n), r = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & 255, 255 & t];
                            else if ("hsl" === t.substr(0, 3))
                                if (r = c = t.match(m), e) {
                                    if (-1 !== t.indexOf("=")) return t.match(b)
                                } else a = Number(r[0]) % 360 / 360, o = Number(r[1]) / 100, i = 2 * (l = Number(r[2]) / 100) - (s = l <= .5 ? l * (o + 1) : l + o - l * o), r.length > 3 && (r[3] = Number(r[3])), r[0] = xt(a + 1 / 3, i, s), r[1] = xt(a, i, s), r[2] = xt(a - 1 / 3, i, s);
                            else r = t.match(m) || ut.transparent;
                            r[0] = Number(r[0]), r[1] = Number(r[1]), r[2] = Number(r[2]), r.length > 3 && (r[3] = Number(r[3]))
                        }
                    else r = ut.black;
                    return e && !c && (i = r[0] / 255, s = r[1] / 255, n = r[2] / 255, l = ((f = Math.max(i, s, n)) + (p = Math.min(i, s, n))) / 2, f === p ? a = o = 0 : (h = f - p, o = l > .5 ? h / (2 - f - p) : h / (f + p), a = f === i ? (s - n) / h + (s < n ? 6 : 0) : f === s ? (n - i) / h + 2 : (i - s) / h + 4, a *= 60), r[0] = a + .5 | 0, r[1] = 100 * o + .5 | 0, r[2] = 100 * l + .5 | 0), r
                },
                gt = function (t, e) {
                    var r, i, s, n = t.match(yt) || [],
                        a = 0,
                        o = "";
                    if (!n.length) return t;
                    for (r = 0; r < n.length; r++) i = n[r], a += (s = t.substr(a, t.indexOf(i, a) - a)).length + i.length, 3 === (i = dt(i, e)).length && i.push(1), o += s + (e ? "hsla(" + i[0] + "," + i[1] + "%," + i[2] + "%," + i[3] : "rgba(" + i.join(",")) + ")";
                    return o + t.substr(a)
                },
                yt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (f in ut) yt += "|" + f + "\\b";
            yt = new RegExp(yt + ")", "gi"), a.colorStringFilter = function (t) {
                var e, r = t[0] + " " + t[1];
                yt.test(r) && (e = -1 !== r.indexOf("hsl(") || -1 !== r.indexOf("hsla("), t[0] = gt(t[0], e), t[1] = gt(t[1], e)), yt.lastIndex = 0
            }, t.default.defaultStringFilter || (t.default.defaultStringFilter = a.colorStringFilter);
            var mt = function (t, e, r, i) {
                    if (null == t) return function (t) {
                        return t
                    };
                    var s, n = e ? (t.match(yt) || [""])[0] : "",
                        a = t.split(n).join("").match(v) || [],
                        o = t.substr(0, t.indexOf(a[0])),
                        l = ")" === t.charAt(t.length - 1) ? ")" : "",
                        f = -1 !== t.indexOf(" ") ? " " : ",",
                        p = a.length,
                        h = p > 0 ? a[0].replace(m, "") : "";
                    return p ? s = e ? function (t) {
                        var e, c, u, x;
                        if ("number" == typeof t) t += h;
                        else if (i && z.test(t)) {
                            for (x = t.replace(z, "|").split("|"), u = 0; u < x.length; u++) x[u] = s(x[u]);
                            return x.join(",")
                        }
                        if (e = (t.match(yt) || [n])[0], u = (c = t.split(e).join("").match(v) || []).length, p > u--)
                            for (; ++u < p;) c[u] = r ? c[(u - 1) / 2 | 0] : a[u];
                        return o + c.join(f) + f + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
                    } : function (t) {
                        var e, n, c;
                        if ("number" == typeof t) t += h;
                        else if (i && z.test(t)) {
                            for (n = t.replace(z, "|").split("|"), c = 0; c < n.length; c++) n[c] = s(n[c]);
                            return n.join(",")
                        }
                        if (c = (e = t.match("," === f ? v : O) || []).length, p > c--)
                            for (; ++c < p;) e[c] = r ? e[(c - 1) / 2 | 0] : a[c];
                        return (o && "none" !== t && t.substr(0, t.indexOf(e[0])) || o) + e.join(f) + l
                    } : function (t) {
                        return t
                    }
                },
                bt = function (t) {
                    return t = t.split(","),
                        function (e, r, i, s, n, a, o) {
                            var l, f = (r + "").split(" ");
                            for (o = {}, l = 0; l < 4; l++) o[t[l]] = f[l] = f[l] || f[(l - 1) / 2 >> 0];
                            return s.parse(e, o, n, a)
                        }
                },
                vt = (Z._setPluginRatio = function (t) {
                    this.plugin.setRatio(t);
                    for (var e, r, i, s, n, a = this.data, o = a.proxy, l = a.firstMPT; l;) e = o[l.v], l.r ? e = l.r(e) : e < 1e-6 && e > -1e-6 && (e = 0), l.t[l.p] = e, l = l._next;
                    if (a.autoRotate && (a.autoRotate.rotation = a.mod ? a.mod.call(this._tween, o.rotation, this.t, this._tween) : o.rotation), 1 === t || 0 === t)
                        for (l = a.firstMPT, n = 1 === t ? "e" : "b"; l;) {
                            if ((r = l.t).type) {
                                if (1 === r.type) {
                                    for (s = r.xs0 + r.s + r.xs1, i = 1; i < r.l; i++) s += r["xn" + i] + r["xs" + (i + 1)];
                                    r[n] = s
                                }
                            } else r[n] = r.s + r.xs0;
                            l = l._next
                        }
                }, function (t, e, r, i, s) {
                    this.t = t, this.p = e, this.v = r, this.r = s, i && (i._prev = this, this._next = i)
                }),
                Ot = (Z._parseToProxy = function (t, e, r, i, s, n) {
                    var a, o, l, f, p, h = i,
                        c = {},
                        u = {},
                        x = r._transform,
                        d = V;
                    for (r._transform = null, V = e, i = p = r.parse(t, e, i, s), V = d, n && (r._transform = x, h && (h._prev = null, h._prev && (h._prev._next = null))); i && i !== h;) {
                        if (i.type <= 1 && (u[o = i.p] = i.s + i.c, c[o] = i.s, n || (f = new vt(i, "s", o, f, i.r), i.c = 0), 1 === i.type))
                            for (a = i.l; --a > 0;) l = "xn" + a, u[o = i.p + "_" + l] = i.data[l], c[o] = i[l], n || (f = new vt(i, l, o, f, i.rxp[l]));
                        i = i._next
                    }
                    return {
                        proxy: c,
                        end: u,
                        firstMPT: f,
                        pt: p
                    }
                }, Z.CSSPropTween = function (t, r, i, s, a, o, l, f, p, h, c) {
                    this.t = t, this.p = r, this.s = i, this.c = s, this.n = l || r, t instanceof Ot || n.push(this.n), this.r = f ? "function" == typeof f ? f : Math.round : f, this.type = o || 0, p && (this.pr = p, e = !0), this.b = void 0 === h ? i : h, this.e = void 0 === c ? i + s : c, a && (this._next = a, a._prev = this)
                }),
                _t = function (t, e, r, i, s, n) {
                    var a = new Ot(t, e, r, i - r, s, -1, n);
                    return a.b = r, a.e = a.xs0 = i, a
                },
                wt = a.parseComplex = function (t, e, r, i, s, n, o, l, f, h) {
                    r = r || n || "", "function" == typeof i && (i = i(y, g)), o = new Ot(t, e, 0, 0, o, h ? 2 : 1, null, !1, l, r, i), i += "", s && yt.test(i + r) && (a.colorStringFilter(i = [r, i]), r = i[0], i = i[1]);
                    var c, u, x, d, v, O, _, w, P, T, M, S, X, k = r.split(", ").join(",").split(" "),
                        F = i.split(", ").join(",").split(" "),
                        A = k.length,
                        R = !1 !== p;
                    for (-1 === i.indexOf(",") && -1 === r.indexOf(",") || (-1 !== (i + r).indexOf("rgb") || -1 !== (i + r).indexOf("hsl") ? (k = k.join(" ").replace(z, ", ").split(" "), F = F.join(" ").replace(z, ", ").split(" ")) : (k = k.join(" ").split(",").join(", ").split(" "), F = F.join(" ").split(",").join(", ").split(" ")), A = k.length), A !== F.length && (A = (k = (n || "").split(" ")).length), o.plugin = f, o.setRatio = h, yt.lastIndex = 0, c = 0; c < A; c++)
                        if (d = k[c], v = F[c] + "", (w = parseFloat(d)) || 0 === w) o.appendXtra("", w, pt(v, w), v.replace(b, ""), !(!R || -1 === v.indexOf("px")) && Math.round, !0);
                        else if (s && yt.test(d)) S = ")" + ((S = v.indexOf(")") + 1) ? v.substr(S) : ""), X = -1 !== v.indexOf("hsl") && q, T = v, d = dt(d, X), v = dt(v, X), (P = d.length + v.length > 6) && !q && 0 === v[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(F[c]).join("transparent")) : (q || (P = !1), X ? o.appendXtra(T.substr(0, T.indexOf("hsl")) + (P ? "hsla(" : "hsl("), d[0], pt(v[0], d[0]), ",", !1, !0).appendXtra("", d[1], pt(v[1], d[1]), "%,", !1).appendXtra("", d[2], pt(v[2], d[2]), P ? "%," : "%" + S, !1) : o.appendXtra(T.substr(0, T.indexOf("rgb")) + (P ? "rgba(" : "rgb("), d[0], v[0] - d[0], ",", Math.round, !0).appendXtra("", d[1], v[1] - d[1], ",", Math.round).appendXtra("", d[2], v[2] - d[2], P ? "," : S, Math.round), P && (d = d.length < 4 ? 1 : d[3], o.appendXtra("", d, (v.length < 4 ? 1 : v[3]) - d, S, !1))), yt.lastIndex = 0;
                    else if (O = d.match(m)) {
                        if (!(_ = v.match(b)) || _.length !== O.length) return o;
                        for (x = 0, u = 0; u < O.length; u++) M = O[u], T = d.indexOf(M, x), o.appendXtra(d.substr(x, T - x), Number(M), pt(_[u], M), "", !(!R || "px" !== d.substr(T + M.length, 2)) && Math.round, 0 === u), x = T + M.length;
                        o["xs" + o.l] += d.substr(x)
                    } else o["xs" + o.l] += o.l || o["xs" + o.l] ? " " + v : v;
                    if (-1 !== i.indexOf("=") && o.data) {
                        for (S = o.xs0 + o.data.s, c = 1; c < o.l; c++) S += o["xs" + c] + o.data["xn" + c];
                        o.e = S + o["xs" + c]
                    }
                    return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
                },
                Pt = 9;
            for ((f = Ot.prototype).l = f.pr = 0; --Pt > 0;) f["xn" + Pt] = 0, f["xs" + Pt] = "";
            f.xs0 = "", f._next = f._prev = f.xfirst = f.data = f.plugin = f.setRatio = f.rxp = null, f.appendXtra = function (t, e, r, i, s, n) {
                var a = this,
                    o = a.l;
                return a["xs" + o] += n && (o || a["xs" + o]) ? " " + t : t || "", r || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = i || "", o > 0 ? (a.data["xn" + o] = e + r, a.rxp["xn" + o] = s, a["xn" + o] = e, a.plugin || (a.xfirst = new Ot(a, "xn" + o, e, r, a.xfirst || a, 0, a.n, s, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {
                    s: e + r
                }, a.rxp = {}, a.s = e, a.c = r, a.r = s, a)) : (a["xs" + o] += e + (i || ""), a)
            };
            var Tt = function (t, e) {
                    e = e || {}, this.p = e.prefix && K(t) || t, l[t] = l[this.p] = this, this.format = e.formatter || mt(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.allowFunc = e.allowFunc, this.pr = e.priority || 0
                },
                Mt = Z._registerComplexSpecialProp = function (t, e, r) {
                    "object" !== i(e) && (e = {
                        parser: r
                    });
                    var s, n = t.split(","),
                        a = e.defaultValue;
                    for (r = r || [a], s = 0; s < n.length; s++) e.prefix = 0 === s && e.prefix, e.defaultValue = r[s] || a, new Tt(n[s], e)
                },
                St = Z._registerPluginProp = function (t) {
                    if (!l[t]) {
                        var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                        Mt(t, {
                            parser: function (t, r, i, s, n, a, f) {
                                var p = o.com.greensock.plugins[e];
                                return p ? (p._cssRegister(), l[i].parse(t, r, i, s, n, a, f)) : (G("Error: " + e + " js file not loaded."), n)
                            }
                        })
                    }
                };
            (f = Tt.prototype).parseComplex = function (t, e, r, i, s, n) {
                var a, o, l, f, p, h, c = this.keyword;
                if (this.multi && (z.test(r) || z.test(e) ? (o = e.replace(z, "|").split("|"), l = r.replace(z, "|").split("|")) : c && (o = [e], l = [r])), l) {
                    for (f = l.length > o.length ? l.length : o.length, a = 0; a < f; a++) e = o[a] = o[a] || this.dflt, r = l[a] = l[a] || this.dflt, c && (p = e.indexOf(c)) !== (h = r.indexOf(c)) && (-1 === h ? o[a] = o[a].split(c).join("") : -1 === p && (o[a] += " " + c));
                    e = o.join(", "), r = l.join(", ")
                }
                return wt(t, this.p, e, r, this.clrs, this.dflt, i, this.pr, s, n)
            }, f.parse = function (t, e, r, i, n, a, o) {
                return this.parseComplex(t.style, this.format(et(t, this.p, s, !1, this.dflt)), this.format(e), n, a)
            }, a.registerSpecialProp = function (t, e, r) {
                Mt(t, {
                    parser: function (t, i, s, n, a, o, l) {
                        var f = new Ot(t, s, 0, 0, a, 2, s, !1, r);
                        return f.plugin = o, f.setRatio = e(t, i, n._tween, s), f
                    },
                    priority: r
                })
            }, a.useSVGTransformAttr = !0;
            var Xt, kt, Ft, At, Rt, Ct = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                Yt = K("transform"),
                zt = U + "transform",
                jt = K("transformOrigin"),
                Nt = null !== K("perspective"),
                Bt = Z.Transform = function () {
                    this.perspective = parseFloat(a.defaultTransformPerspective) || 0, this.force3D = !(!1 === a.defaultForce3D || !Nt) && (a.defaultForce3D || "auto")
                },
                Vt = t._gsScope.SVGElement,
                Lt = function (t, e, r) {
                    var i, s = I.createElementNS("http://www.w3.org/2000/svg", t),
                        n = /([a-z])([A-Z])/g;
                    for (i in r) s.setAttributeNS(null, i.replace(n, "$1-$2").toLowerCase(), r[i]);
                    return e.appendChild(s), s
                },
                It = I.documentElement || {},
                Dt = (Rt = d || /Android/i.test(H) && !t._gsScope.chrome, I.createElementNS && It.appendChild && !Rt && (kt = Lt("svg", It), At = (Ft = Lt("rect", kt, {
                    width: 100,
                    height: 50,
                    x: 100
                })).getBoundingClientRect().width, Ft.style[jt] = "50% 50%", Ft.style[Yt] = "scaleX(0.5)", Rt = At === Ft.getBoundingClientRect().width && !(u && Nt), It.removeChild(kt)), Rt),
                Wt = function (t, e, r, i, s, n) {
                    var o, l, f, p, h, c, u, x, d, g, y, m, b, v, O = t._gsTransform,
                        _ = qt(t, !0);
                    O && (b = O.xOrigin, v = O.yOrigin), (!i || (o = i.split(" ")).length < 2) && (0 === (u = t.getBBox()).x && 0 === u.y && u.width + u.height === 0 && (u = {
                        x: parseFloat(t.hasAttribute("x") ? t.getAttribute("x") : t.hasAttribute("cx") ? t.getAttribute("cx") : 0) || 0,
                        y: parseFloat(t.hasAttribute("y") ? t.getAttribute("y") : t.hasAttribute("cy") ? t.getAttribute("cy") : 0) || 0,
                        width: 0,
                        height: 0
                    }), o = [(-1 !== (e = ft(e).split(" "))[0].indexOf("%") ? parseFloat(e[0]) / 100 * u.width : parseFloat(e[0])) + u.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * u.height : parseFloat(e[1])) + u.y]), r.xOrigin = p = parseFloat(o[0]), r.yOrigin = h = parseFloat(o[1]), i && _ !== Ht && (c = _[0], u = _[1], x = _[2], d = _[3], g = _[4], y = _[5], (m = c * d - u * x) && (l = p * (d / m) + h * (-x / m) + (x * y - d * g) / m, f = p * (-u / m) + h * (c / m) - (c * y - u * g) / m, p = r.xOrigin = o[0] = l, h = r.yOrigin = o[1] = f)), O && (n && (r.xOffset = O.xOffset, r.yOffset = O.yOffset, O = r), s || !1 !== s && !1 !== a.defaultSmoothOrigin ? (l = p - b, f = h - v, O.xOffset += l * _[0] + f * _[2] - l, O.yOffset += l * _[1] + f * _[3] - f) : O.xOffset = O.yOffset = 0), n || t.setAttribute("data-svg-origin", o.join(" "))
                },
                Et = function (t) {
                    try {
                        return t.getBBox()
                    } catch (e) {
                        return function e(r) {
                            var i, s = D("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                                n = this.parentNode,
                                a = this.nextSibling,
                                o = this.style.cssText;
                            if (It.appendChild(s), s.appendChild(this), this.style.display = "block", r) try {
                                i = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = e
                            } catch (t) {} else this._originalGetBBox && (i = this._originalGetBBox());
                            return a ? n.insertBefore(this, a) : n.appendChild(this), It.removeChild(s), this.style.cssText = o, i
                        }.call(t, !0)
                    }
                },
                Zt = function (t) {
                    return !(!Vt || !t.getCTM || t.parentNode && !t.ownerSVGElement || !Et(t))
                },
                Ht = [1, 0, 0, 1, 0, 0],
                qt = function (t, e) {
                    var r, i, s, n, a, o, l, f = t._gsTransform || new Bt,
                        p = t.style;
                    if (Yt ? i = et(t, zt, null, !0) : t.currentStyle && (i = (i = t.currentStyle.filter.match(C)) && 4 === i.length ? [i[0].substr(4), Number(i[2].substr(4)), Number(i[1].substr(4)), i[3].substr(4), f.x || 0, f.y || 0].join(",") : ""), r = !i || "none" === i || "matrix(1, 0, 0, 1, 0, 0)" === i, Yt && r && !t.offsetParent && t !== It && (n = p.display, p.display = "block", (l = t.parentNode) && t.offsetParent || (a = 1, o = t.nextSibling, It.appendChild(t)), r = !(i = et(t, zt, null, !0)) || "none" === i || "matrix(1, 0, 0, 1, 0, 0)" === i, n ? p.display = n : Kt(p, "display"), a && (o ? l.insertBefore(t, o) : l ? l.appendChild(t) : It.removeChild(t))), (f.svg || t.getCTM && Zt(t)) && (r && -1 !== (p[Yt] + "").indexOf("matrix") && (i = p[Yt], r = 0), s = t.getAttribute("transform"), r && s && (i = "matrix(" + (s = t.transform.baseVal.consolidate().matrix).a + "," + s.b + "," + s.c + "," + s.d + "," + s.e + "," + s.f + ")", r = 0)), r) return Ht;
                    for (s = (i || "").match(m) || [], Pt = s.length; --Pt > -1;) n = Number(s[Pt]), s[Pt] = (a = n - (n |= 0)) ? (1e5 * a + (a < 0 ? -.5 : .5) | 0) / 1e5 + n : n;
                    return e && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s
                },
                $t = Z.getTransform = function (e, r, i, s) {
                    if (e._gsTransform && i && !s) return e._gsTransform;
                    var n, o, l, f, p, h, c = i && e._gsTransform || new Bt,
                        u = c.scaleX < 0,
                        x = Nt && (parseFloat(et(e, jt, r, !1, "0 0 0").split(" ")[2]) || c.zOrigin) || 0,
                        d = parseFloat(a.defaultTransformPerspective) || 0;
                    if (c.svg = !(!e.getCTM || !Zt(e)), c.svg && (Wt(e, et(e, jt, r, !1, "50% 50%") + "", c, e.getAttribute("data-svg-origin")), Xt = a.useSVGTransformAttr || Dt), (n = qt(e)) !== Ht) {
                        if (16 === n.length) {
                            var g, y, m, b, v, O = n[0],
                                _ = n[1],
                                w = n[2],
                                P = n[3],
                                T = n[4],
                                M = n[5],
                                S = n[6],
                                X = n[7],
                                k = n[8],
                                F = n[9],
                                A = n[10],
                                R = n[12],
                                C = n[13],
                                Y = n[14],
                                z = n[11],
                                j = Math.atan2(S, A);
                            c.zOrigin && (R = k * (Y = -c.zOrigin) - n[12], C = F * Y - n[13], Y = A * Y + c.zOrigin - n[14]), c.rotationX = j * B, j && (g = T * (b = Math.cos(-j)) + k * (v = Math.sin(-j)), y = M * b + F * v, m = S * b + A * v, k = T * -v + k * b, F = M * -v + F * b, A = S * -v + A * b, z = X * -v + z * b, T = g, M = y, S = m), j = Math.atan2(-w, A), c.rotationY = j * B, j && (y = _ * (b = Math.cos(-j)) - F * (v = Math.sin(-j)), m = w * b - A * v, F = _ * v + F * b, A = w * v + A * b, z = P * v + z * b, O = g = O * b - k * v, _ = y, w = m), j = Math.atan2(_, O), c.rotation = j * B, j && (g = O * (b = Math.cos(j)) + _ * (v = Math.sin(j)), y = T * b + M * v, m = k * b + F * v, _ = _ * b - O * v, M = M * b - T * v, F = F * b - k * v, O = g, T = y, k = m), c.rotationX && Math.abs(c.rotationX) + Math.abs(c.rotation) > 359.9 && (c.rotationX = c.rotation = 0, c.rotationY = 180 - c.rotationY), j = Math.atan2(T, M), c.scaleX = (1e5 * Math.sqrt(O * O + _ * _ + w * w) + .5 | 0) / 1e5, c.scaleY = (1e5 * Math.sqrt(M * M + S * S) + .5 | 0) / 1e5, c.scaleZ = (1e5 * Math.sqrt(k * k + F * F + A * A) + .5 | 0) / 1e5, O /= c.scaleX, T /= c.scaleY, _ /= c.scaleX, M /= c.scaleY, Math.abs(j) > 2e-5 ? (c.skewX = j * B, T = 0, "simple" !== c.skewType && (c.scaleY *= 1 / Math.cos(j))) : c.skewX = 0, c.perspective = z ? 1 / (z < 0 ? -z : z) : 0, c.x = R, c.y = C, c.z = Y, c.svg && (c.x -= c.xOrigin - (c.xOrigin * O - c.yOrigin * T), c.y -= c.yOrigin - (c.yOrigin * _ - c.xOrigin * M))
                        } else if (!Nt || s || !n.length || c.x !== n[4] || c.y !== n[5] || !c.rotationX && !c.rotationY) {
                            var N = n.length >= 6,
                                V = N ? n[0] : 1,
                                L = n[1] || 0,
                                I = n[2] || 0,
                                D = N ? n[3] : 1;
                            c.x = n[4] || 0, c.y = n[5] || 0, l = Math.sqrt(V * V + L * L), f = Math.sqrt(D * D + I * I), p = V || L ? Math.atan2(L, V) * B : c.rotation || 0, h = I || D ? Math.atan2(I, D) * B + p : c.skewX || 0, c.scaleX = l, c.scaleY = f, c.rotation = p, c.skewX = h, Nt && (c.rotationX = c.rotationY = c.z = 0, c.perspective = d, c.scaleZ = 1), c.svg && (c.x -= c.xOrigin - (c.xOrigin * V + c.yOrigin * I), c.y -= c.yOrigin - (c.xOrigin * L + c.yOrigin * D))
                        }
                        for (o in Math.abs(c.skewX) > 90 && Math.abs(c.skewX) < 270 && (u ? (c.scaleX *= -1, c.skewX += c.rotation <= 0 ? 180 : -180, c.rotation += c.rotation <= 0 ? 180 : -180) : (c.scaleY *= -1, c.skewX += c.skewX <= 0 ? 180 : -180)), c.zOrigin = x, c) c[o] < 2e-5 && c[o] > -2e-5 && (c[o] = 0)
                    }
                    return i && (e._gsTransform = c, c.svg && (Xt && e.style[Yt] ? t.default.delayedCall(.001, function () {
                        Kt(e.style, Yt)
                    }) : !Xt && e.getAttribute("transform") && t.default.delayedCall(.001, function () {
                        e.removeAttribute("transform")
                    }))), c
                },
                Gt = function (t) {
                    var e, r, i = this.data,
                        s = -i.rotation * N,
                        n = s + i.skewX * N,
                        a = (Math.cos(s) * i.scaleX * 1e5 | 0) / 1e5,
                        o = (Math.sin(s) * i.scaleX * 1e5 | 0) / 1e5,
                        l = (Math.sin(n) * -i.scaleY * 1e5 | 0) / 1e5,
                        f = (Math.cos(n) * i.scaleY * 1e5 | 0) / 1e5,
                        p = this.t.style,
                        h = this.t.currentStyle;
                    if (h) {
                        r = o, o = -l, l = -r, e = h.filter, p.filter = "";
                        var c, u, x = this.t.offsetWidth,
                            g = this.t.offsetHeight,
                            y = "absolute" !== h.position,
                            m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + o + ", M21=" + l + ", M22=" + f,
                            b = i.x + x * i.xPercent / 100,
                            v = i.y + g * i.yPercent / 100;
                        if (null != i.ox && (b += (c = (i.oxp ? x * i.ox * .01 : i.ox) - x / 2) - (c * a + (u = (i.oyp ? g * i.oy * .01 : i.oy) - g / 2) * o), v += u - (c * l + u * f)), m += y ? ", Dx=" + ((c = x / 2) - (c * a + (u = g / 2) * o) + b) + ", Dy=" + (u - (c * l + u * f) + v) + ")" : ", sizingMethod='auto expand')", -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? p.filter = e.replace(Y, m) : p.filter = m + " " + e, 0 !== t && 1 !== t || 1 === a && 0 === o && 0 === l && 1 === f && (y && -1 === m.indexOf("Dx=0, Dy=0") || P.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && p.removeAttribute("filter")), !y) {
                            var O, _, T, M = d < 8 ? 1 : -1;
                            for (c = i.ieOffsetX || 0, u = i.ieOffsetY || 0, i.ieOffsetX = Math.round((x - ((a < 0 ? -a : a) * x + (o < 0 ? -o : o) * g)) / 2 + b), i.ieOffsetY = Math.round((g - ((f < 0 ? -f : f) * g + (l < 0 ? -l : l) * x)) / 2 + v), Pt = 0; Pt < 4; Pt++) T = (r = -1 !== (O = h[_ = ot[Pt]]).indexOf("px") ? parseFloat(O) : rt(this.t, _, parseFloat(O), O.replace(w, "")) || 0) !== i[_] ? Pt < 2 ? -i.ieOffsetX : -i.ieOffsetY : Pt < 2 ? c - i.ieOffsetX : u - i.ieOffsetY, p[_] = (i[_] = Math.round(r - T * (0 === Pt || 2 === Pt ? 1 : M))) + "px"
                        }
                    }
                },
                Ut = Z.set3DTransformRatio = Z.setTransformRatio = function (t) {
                    var e, r, i, s, n, a, o, l, f, p, h, c, x, d, g, y, m, b, v, O, _ = this.data,
                        w = this.t.style,
                        P = _.rotation,
                        T = _.rotationX,
                        M = _.rotationY,
                        S = _.scaleX,
                        X = _.scaleY,
                        k = _.scaleZ,
                        F = _.x,
                        A = _.y,
                        R = _.z,
                        C = _.svg,
                        Y = _.perspective,
                        z = _.force3D,
                        j = _.skewY,
                        B = _.skewX;
                    if (j && (B += j, P += j), !((1 !== t && 0 !== t || "auto" !== z || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && z || R || Y || M || T || 1 !== k) || Xt && C || !Nt) P || B || C ? (P *= N, O = B * N, 1e5, r = Math.cos(P) * S, n = Math.sin(P) * S, i = Math.sin(P - O) * -X, a = Math.cos(P - O) * X, O && "simple" === _.skewType && (e = Math.tan(O - j * N), i *= e = Math.sqrt(1 + e * e), a *= e, j && (e = Math.tan(j * N), r *= e = Math.sqrt(1 + e * e), n *= e)), C && (F += _.xOrigin - (_.xOrigin * r + _.yOrigin * i) + _.xOffset, A += _.yOrigin - (_.xOrigin * n + _.yOrigin * a) + _.yOffset, Xt && (_.xPercent || _.yPercent) && (g = this.t.getBBox(), F += .01 * _.xPercent * g.width, A += .01 * _.yPercent * g.height), F < (g = 1e-6) && F > -g && (F = 0), A < g && A > -g && (A = 0)), v = (1e5 * r | 0) / 1e5 + "," + (1e5 * n | 0) / 1e5 + "," + (1e5 * i | 0) / 1e5 + "," + (1e5 * a | 0) / 1e5 + "," + F + "," + A + ")", C && Xt ? this.t.setAttribute("transform", "matrix(" + v) : w[Yt] = (_.xPercent || _.yPercent ? "translate(" + _.xPercent + "%," + _.yPercent + "%) matrix(" : "matrix(") + v) : w[Yt] = (_.xPercent || _.yPercent ? "translate(" + _.xPercent + "%," + _.yPercent + "%) matrix(" : "matrix(") + S + ",0,0," + X + "," + F + "," + A + ")";
                    else {
                        if (u && (S < (g = 1e-4) && S > -g && (S = k = 2e-5), X < g && X > -g && (X = k = 2e-5), !Y || _.z || _.rotationX || _.rotationY || (Y = 0)), P || B) P *= N, y = r = Math.cos(P), m = n = Math.sin(P), B && (P -= B * N, y = Math.cos(P), m = Math.sin(P), "simple" === _.skewType && (e = Math.tan((B - j) * N), y *= e = Math.sqrt(1 + e * e), m *= e, _.skewY && (e = Math.tan(j * N), r *= e = Math.sqrt(1 + e * e), n *= e))), i = -m, a = y;
                        else {
                            if (!(M || T || 1 !== k || Y || C)) return void(w[Yt] = (_.xPercent || _.yPercent ? "translate(" + _.xPercent + "%," + _.yPercent + "%) translate3d(" : "translate3d(") + F + "px," + A + "px," + R + "px)" + (1 !== S || 1 !== X ? " scale(" + S + "," + X + ")" : ""));
                            r = a = 1, i = n = 0
                        }
                        p = 1, s = o = l = f = h = c = 0, x = Y ? -1 / Y : 0, d = _.zOrigin, g = 1e-6, ",", "0", (P = M * N) && (y = Math.cos(P), l = -(m = Math.sin(P)), h = x * -m, s = r * m, o = n * m, p = y, x *= y, r *= y, n *= y), (P = T * N) && (e = i * (y = Math.cos(P)) + s * (m = Math.sin(P)), b = a * y + o * m, f = p * m, c = x * m, s = i * -m + s * y, o = a * -m + o * y, p *= y, x *= y, i = e, a = b), 1 !== k && (s *= k, o *= k, p *= k, x *= k), 1 !== X && (i *= X, a *= X, f *= X, c *= X), 1 !== S && (r *= S, n *= S, l *= S, h *= S), (d || C) && (d && (F += s * -d, A += o * -d, R += p * -d + d), C && (F += _.xOrigin - (_.xOrigin * r + _.yOrigin * i) + _.xOffset, A += _.yOrigin - (_.xOrigin * n + _.yOrigin * a) + _.yOffset), F < g && F > -g && (F = "0"), A < g && A > -g && (A = "0"), R < g && R > -g && (R = 0)), v = _.xPercent || _.yPercent ? "translate(" + _.xPercent + "%," + _.yPercent + "%) matrix3d(" : "matrix3d(", v += (r < g && r > -g ? "0" : r) + "," + (n < g && n > -g ? "0" : n) + "," + (l < g && l > -g ? "0" : l), v += "," + (h < g && h > -g ? "0" : h) + "," + (i < g && i > -g ? "0" : i) + "," + (a < g && a > -g ? "0" : a), T || M || 1 !== k ? (v += "," + (f < g && f > -g ? "0" : f) + "," + (c < g && c > -g ? "0" : c) + "," + (s < g && s > -g ? "0" : s), v += "," + (o < g && o > -g ? "0" : o) + "," + (p < g && p > -g ? "0" : p) + "," + (x < g && x > -g ? "0" : x) + ",") : v += ",0,0,0,0,1,0,", v += F + "," + A + "," + R + "," + (Y ? 1 + -R / Y : 1) + ")", w[Yt] = v
                    }
                };
            (f = Bt.prototype).x = f.y = f.z = f.skewX = f.skewY = f.rotation = f.rotationX = f.rotationY = f.zOrigin = f.xPercent = f.yPercent = f.xOffset = f.yOffset = 0, f.scaleX = f.scaleY = f.scaleZ = 1, Mt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                parser: function (t, e, r, n, o, l, f) {
                    if (n._lastParsedTransform === f) return o;
                    n._lastParsedTransform = f;
                    var p = f.scale && "function" == typeof f.scale ? f.scale : 0;
                    p && (f.scale = p(y, t));
                    var h, c, u, x, d, m, b, v, O, _ = t._gsTransform,
                        w = t.style,
                        P = Ct.length,
                        T = f,
                        M = {},
                        S = $t(t, s, !0, T.parseTransform),
                        X = T.transform && ("function" == typeof T.transform ? T.transform(y, g) : T.transform);
                    if (S.skewType = T.skewType || S.skewType || a.defaultSkewType, n._transform = S, "rotationZ" in T && (T.rotation = T.rotationZ), X && "string" == typeof X && Yt)(c = W.style)[Yt] = X, c.display = "block", c.position = "absolute", -1 !== X.indexOf("%") && (c.width = et(t, "width"), c.height = et(t, "height")), I.body.appendChild(W), h = $t(W, null, !1), "simple" === S.skewType && (h.scaleY *= Math.cos(h.skewX * N)), S.svg && (m = S.xOrigin, b = S.yOrigin, h.x -= S.xOffset, h.y -= S.yOffset, (T.transformOrigin || T.svgOrigin) && (X = {}, Wt(t, ft(T.transformOrigin), X, T.svgOrigin, T.smoothOrigin, !0), m = X.xOrigin, b = X.yOrigin, h.x -= X.xOffset - S.xOffset, h.y -= X.yOffset - S.yOffset), (m || b) && (v = qt(W, !0), h.x -= m - (m * v[0] + b * v[2]), h.y -= b - (m * v[1] + b * v[3]))), I.body.removeChild(W), h.perspective || (h.perspective = S.perspective), null != T.xPercent && (h.xPercent = ht(T.xPercent, S.xPercent)), null != T.yPercent && (h.yPercent = ht(T.yPercent, S.yPercent));
                    else if ("object" === i(T)) {
                        if (h = {
                                scaleX: ht(null != T.scaleX ? T.scaleX : T.scale, S.scaleX),
                                scaleY: ht(null != T.scaleY ? T.scaleY : T.scale, S.scaleY),
                                scaleZ: ht(T.scaleZ, S.scaleZ),
                                x: ht(T.x, S.x),
                                y: ht(T.y, S.y),
                                z: ht(T.z, S.z),
                                xPercent: ht(T.xPercent, S.xPercent),
                                yPercent: ht(T.yPercent, S.yPercent),
                                perspective: ht(T.transformPerspective, S.perspective)
                            }, null != (d = T.directionalRotation))
                            if ("object" === i(d))
                                for (c in d) T[c] = d[c];
                            else T.rotation = d;
                        "string" == typeof T.x && -1 !== T.x.indexOf("%") && (h.x = 0, h.xPercent = ht(T.x, S.xPercent)), "string" == typeof T.y && -1 !== T.y.indexOf("%") && (h.y = 0, h.yPercent = ht(T.y, S.yPercent)), h.rotation = ct("rotation" in T ? T.rotation : "shortRotation" in T ? T.shortRotation + "_short" : S.rotation, S.rotation, "rotation", M), Nt && (h.rotationX = ct("rotationX" in T ? T.rotationX : "shortRotationX" in T ? T.shortRotationX + "_short" : S.rotationX || 0, S.rotationX, "rotationX", M), h.rotationY = ct("rotationY" in T ? T.rotationY : "shortRotationY" in T ? T.shortRotationY + "_short" : S.rotationY || 0, S.rotationY, "rotationY", M)), h.skewX = ct(T.skewX, S.skewX), h.skewY = ct(T.skewY, S.skewY)
                    }
                    for (Nt && null != T.force3D && (S.force3D = T.force3D, x = !0), (u = S.force3D || S.z || S.rotationX || S.rotationY || h.z || h.rotationX || h.rotationY || h.perspective) || null == T.scale || (h.scaleZ = 1); --P > -1;)((X = h[O = Ct[P]] - S[O]) > 1e-6 || X < -1e-6 || null != T[O] || null != V[O]) && (x = !0, o = new Ot(S, O, S[O], X, o), O in M && (o.e = M[O]), o.xs0 = 0, o.plugin = l, n._overwriteProps.push(o.n));
                    return X = "function" == typeof T.transformOrigin ? T.transformOrigin(y, g) : T.transformOrigin, S.svg && (X || T.svgOrigin) && (m = S.xOffset, b = S.yOffset, Wt(t, ft(X), h, T.svgOrigin, T.smoothOrigin), o = _t(S, "xOrigin", (_ ? S : h).xOrigin, h.xOrigin, o, "transformOrigin"), o = _t(S, "yOrigin", (_ ? S : h).yOrigin, h.yOrigin, o, "transformOrigin"), m === S.xOffset && b === S.yOffset || (o = _t(S, "xOffset", _ ? m : S.xOffset, S.xOffset, o, "transformOrigin"), o = _t(S, "yOffset", _ ? b : S.yOffset, S.yOffset, o, "transformOrigin")), X = "0px 0px"), (X || Nt && u && S.zOrigin) && (Yt ? (x = !0, O = jt, X || (X = (X = (et(t, O, s, !1, "50% 50%") + "").split(" "))[0] + " " + X[1] + " " + S.zOrigin + "px"), X += "", (o = new Ot(w, O, 0, 0, o, -1, "transformOrigin")).b = w[O], o.plugin = l, Nt ? (c = S.zOrigin, X = X.split(" "), S.zOrigin = (X.length > 2 ? parseFloat(X[2]) : c) || 0, o.xs0 = o.e = X[0] + " " + (X[1] || "50%") + " 0px", (o = new Ot(S, "zOrigin", 0, 0, o, -1, o.n)).b = c, o.xs0 = o.e = S.zOrigin) : o.xs0 = o.e = X) : ft(X + "", S)), x && (n._transformType = S.svg && Xt || !u && 3 !== this._transformType ? 2 : 3), p && (f.scale = p), o
                },
                allowFunc: !0,
                prefix: !0
            }), Mt("boxShadow", {
                defaultValue: "0px 0px 0px 0px #999",
                prefix: !0,
                color: !0,
                multi: !0,
                keyword: "inset"
            }), Mt("clipPath", {
                defaultValue: "inset(0%)",
                prefix: !0,
                multi: !0,
                formatter: mt("inset(0% 0% 0% 0%)", !1, !0)
            }), Mt("borderRadius", {
                defaultValue: "0px",
                parser: function (t, e, i, n, a, o) {
                    e = this.format(e);
                    var l, f, p, h, c, u, x, d, g, y, m, b, v, O, _, w, P = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                        T = t.style;
                    for (g = parseFloat(t.offsetWidth), y = parseFloat(t.offsetHeight), l = e.split(" "), f = 0; f < P.length; f++) this.p.indexOf("border") && (P[f] = K(P[f])), -1 !== (c = h = et(t, P[f], s, !1, "0px")).indexOf(" ") && (h = c.split(" "), c = h[0], h = h[1]), u = p = l[f], x = parseFloat(c), b = c.substr((x + "").length), (v = "=" === u.charAt(1)) ? (d = parseInt(u.charAt(0) + "1", 10), u = u.substr(2), d *= parseFloat(u), m = u.substr((d + "").length - (d < 0 ? 1 : 0)) || "") : (d = parseFloat(u), m = u.substr((d + "").length)), "" === m && (m = r[i] || b), m !== b && (O = rt(t, "borderLeft", x, b), _ = rt(t, "borderTop", x, b), "%" === m ? (c = O / g * 100 + "%", h = _ / y * 100 + "%") : "em" === m ? (c = O / (w = rt(t, "borderLeft", 1, "em")) + "em", h = _ / w + "em") : (c = O + "px", h = _ + "px"), v && (u = parseFloat(c) + d + m, p = parseFloat(h) + d + m)), a = wt(T, P[f], c + " " + h, u + " " + p, !1, "0px", a);
                    return a
                },
                prefix: !0,
                formatter: mt("0px 0px 0px 0px", !1, !0)
            }), Mt("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                defaultValue: "0px",
                parser: function (t, e, r, i, n, a) {
                    return wt(t.style, r, this.format(et(t, r, s, !1, "0px 0px")), this.format(e), !1, "0px", n)
                },
                prefix: !0,
                formatter: mt("0px 0px", !1, !0)
            }), Mt("backgroundPosition", {
                defaultValue: "0 0",
                parser: function (t, e, r, i, n, a) {
                    var o, l, f, p, h, c, u = "background-position",
                        x = s || tt(t),
                        g = this.format((x ? d ? x.getPropertyValue(u + "-x") + " " + x.getPropertyValue(u + "-y") : x.getPropertyValue(u) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                        y = this.format(e);
                    if (-1 !== g.indexOf("%") != (-1 !== y.indexOf("%")) && y.split(",").length < 2 && (c = et(t, "backgroundImage").replace(F, "")) && "none" !== c) {
                        for (o = g.split(" "), l = y.split(" "), E.setAttribute("src", c), f = 2; --f > -1;)(p = -1 !== (g = o[f]).indexOf("%")) !== (-1 !== l[f].indexOf("%")) && (h = 0 === f ? t.offsetWidth - E.width : t.offsetHeight - E.height, o[f] = p ? parseFloat(g) / 100 * h + "px" : parseFloat(g) / h * 100 + "%");
                        g = o.join(" ")
                    }
                    return this.parseComplex(t.style, g, y, n, a)
                },
                formatter: ft
            }), Mt("backgroundSize", {
                defaultValue: "0 0",
                formatter: function (t) {
                    return "co" === (t += "").substr(0, 2) ? t : ft(-1 === t.indexOf(" ") ? t + " " + t : t)
                }
            }), Mt("perspective", {
                defaultValue: "0px",
                prefix: !0
            }), Mt("perspectiveOrigin", {
                defaultValue: "50% 50%",
                prefix: !0
            }), Mt("transformStyle", {
                prefix: !0
            }), Mt("backfaceVisibility", {
                prefix: !0
            }), Mt("userSelect", {
                prefix: !0
            }), Mt("margin", {
                parser: bt("marginTop,marginRight,marginBottom,marginLeft")
            }), Mt("padding", {
                parser: bt("paddingTop,paddingRight,paddingBottom,paddingLeft")
            }), Mt("clip", {
                defaultValue: "rect(0px,0px,0px,0px)",
                parser: function (t, e, r, i, n, a) {
                    var o, l, f;
                    return d < 9 ? (l = t.currentStyle, f = d < 8 ? " " : ",", o = "rect(" + l.clipTop + f + l.clipRight + f + l.clipBottom + f + l.clipLeft + ")", e = this.format(e).split(",").join(f)) : (o = this.format(et(t, this.p, s, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, n, a)
                }
            }), Mt("textShadow", {
                defaultValue: "0px 0px 0px #999",
                color: !0,
                multi: !0
            }), Mt("autoRound,strictUnits", {
                parser: function (t, e, r, i, s) {
                    return s
                }
            }), Mt("border", {
                defaultValue: "0px solid #000",
                parser: function (t, e, r, i, n, a) {
                    var o = et(t, "borderTopWidth", s, !1, "0px"),
                        l = this.format(e).split(" "),
                        f = l[0].replace(w, "");
                    return "px" !== f && (o = parseFloat(o) / rt(t, "borderTopWidth", 1, f) + f), this.parseComplex(t.style, this.format(o + " " + et(t, "borderTopStyle", s, !1, "solid") + " " + et(t, "borderTopColor", s, !1, "#000")), l.join(" "), n, a)
                },
                color: !0,
                formatter: function (t) {
                    var e = t.split(" ");
                    return e[0] + " " + (e[1] || "solid") + " " + (t.match(yt) || ["#000"])[0]
                }
            }), Mt("borderWidth", {
                parser: bt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
            }), Mt("float,cssFloat,styleFloat", {
                parser: function (t, e, r, i, s, n) {
                    var a = t.style,
                        o = "cssFloat" in a ? "cssFloat" : "styleFloat";
                    return new Ot(a, o, 0, 0, s, -1, r, !1, 0, a[o], e)
                }
            });
            var Jt = function (t) {
                var e, r = this.t,
                    i = r.filter || et(this.data, "filter") || "",
                    s = this.s + this.c * t | 0;
                100 === s && (-1 === i.indexOf("atrix(") && -1 === i.indexOf("radient(") && -1 === i.indexOf("oader(") ? (r.removeAttribute("filter"), e = !et(this.data, "filter")) : (r.filter = i.replace(M, ""), e = !0)), e || (this.xn1 && (r.filter = i = i || "alpha(opacity=" + s + ")"), -1 === i.indexOf("pacity") ? 0 === s && this.xn1 || (r.filter = i + " alpha(opacity=" + s + ")") : r.filter = i.replace(P, "opacity=" + s))
            };
            Mt("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function (t, e, r, i, n, a) {
                    var o = parseFloat(et(t, "opacity", s, !1, "1")),
                        l = t.style,
                        f = "autoAlpha" === r;
                    return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), f && 1 === o && "hidden" === et(t, "visibility", s) && 0 !== e && (o = 0), q ? n = new Ot(l, "opacity", o, e - o, n) : ((n = new Ot(l, "opacity", 100 * o, 100 * (e - o), n)).xn1 = f ? 1 : 0, l.zoom = 1, n.type = 2, n.b = "alpha(opacity=" + n.s + ")", n.e = "alpha(opacity=" + (n.s + n.c) + ")", n.data = t, n.plugin = a, n.setRatio = Jt), f && ((n = new Ot(l, "visibility", 0, 0, n, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit")).xs0 = "inherit", i._overwriteProps.push(n.n), i._overwriteProps.push(r)), n
                }
            });
            var Kt = function (t, e) {
                    e && (t.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e), t.removeProperty(e.replace(X, "-$1").toLowerCase())) : t.removeAttribute(e))
                },
                Qt = function (t) {
                    if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                        this.t.setAttribute("class", 0 === t ? this.b : this.e);
                        for (var e = this.data, r = this.t.style; e;) e.v ? r[e.p] = e.v : Kt(r, e.p), e = e._next;
                        1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                    } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                };
            Mt("className", {
                parser: function (t, r, i, n, a, o, l) {
                    var f, p, h, c, u, x = t.getAttribute("class") || "",
                        d = t.style.cssText;
                    if ((a = n._classNamePT = new Ot(t, i, 0, 0, a, 2)).setRatio = Qt, a.pr = -11, e = !0, a.b = x, p = st(t, s), h = t._gsClassPT) {
                        for (c = {}, u = h.data; u;) c[u.p] = 1, u = u._next;
                        h.setRatio(1)
                    }
                    return t._gsClassPT = a, a.e = "=" !== r.charAt(1) ? r : x.replace(new RegExp("(?:\\s|^)" + r.substr(2) + "(?![\\w-])"), "") + ("+" === r.charAt(0) ? " " + r.substr(2) : ""), t.setAttribute("class", a.e), f = nt(t, p, st(t), l, c), t.setAttribute("class", x), a.data = f.firstMPT, t.style.cssText !== d && (t.style.cssText = d), a = a.xfirst = n.parse(t, f.difs, a, o)
                }
            });
            var te = function (t) {
                if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var e, r, i, s, n, a = this.t.style,
                        o = l.transform.parse;
                    if ("all" === this.e) a.cssText = "", s = !0;
                    else
                        for (i = (e = this.e.split(" ").join("").split(",")).length; --i > -1;) r = e[i], l[r] && (l[r].parse === o ? s = !0 : r = "transformOrigin" === r ? jt : l[r].p), Kt(a, r);
                    s && (Kt(a, Yt), (n = this.t._gsTransform) && (n.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                }
            };
            for (Mt("clearProps", {
                    parser: function (t, r, i, s, n) {
                        return (n = new Ot(t, i, 0, 0, n, 2)).setRatio = te, n.e = r, n.pr = -10, n.data = s._tween, e = !0, n
                    }
                }), f = "bezier,throwProps,physicsProps,physics2D".split(","), Pt = f.length; Pt--;) St(f[Pt]);
            (f = a.prototype)._firstPT = f._lastParsedTransform = f._transform = null, f._onInitTween = function (t, i, o, f) {
                if (!t.nodeType) return !1;
                this._target = g = t, this._tween = o, this._vars = i, y = f, p = i.autoRound, e = !1, r = i.suffixMap || a.suffixMap, s = tt(t), n = this._overwriteProps;
                var u, d, m, b, v, O, _, w, P, M = t.style;
                if (h && "" === M.zIndex && ("auto" !== (u = et(t, "zIndex", s)) && "" !== u || this._addLazySet(M, "zIndex", 0)), "string" == typeof i && (b = M.cssText, u = st(t, s), M.cssText = b + ";" + i, u = nt(t, u, st(t)).difs, !q && T.test(i) && (u.opacity = parseFloat(RegExp.$1)), i = u, M.cssText = b), i.className ? this._firstPT = d = l.className.parse(t, i.className, "className", this, null, null, i) : this._firstPT = d = this.parse(t, i, null), this._transformType) {
                    for (P = 3 === this._transformType, Yt ? c && (h = !0, "" === M.zIndex && ("auto" !== (_ = et(t, "zIndex", s)) && "" !== _ || this._addLazySet(M, "zIndex", 0)), x && this._addLazySet(M, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (P ? "visible" : "hidden"))) : M.zoom = 1, m = d; m && m._next;) m = m._next;
                    w = new Ot(t, "transform", 0, 0, null, 2), this._linkCSSP(w, null, m), w.setRatio = Yt ? Ut : Gt, w.data = this._transform || $t(t, s, !0), w.tween = o, w.pr = -1, n.pop()
                }
                if (e) {
                    for (; d;) {
                        for (O = d._next, m = b; m && m.pr > d.pr;) m = m._next;
                        (d._prev = m ? m._prev : v) ? d._prev._next = d: b = d, (d._next = m) ? m._prev = d : v = d, d = O
                    }
                    this._firstPT = b
                }
                return !0
            }, f.parse = function (t, e, i, n) {
                var a, o, f, h, c, u, x, d, m, b, v = t.style;
                for (a in e) {
                    if (u = e[a], o = l[a], "function" != typeof u || o && o.allowFunc || (u = u(y, g)), o) i = o.parse(t, u, a, this, i, n, e);
                    else {
                        if ("--" === a.substr(0, 2)) {
                            this._tween._propLookup[a] = this._addTween.call(this._tween, t.style, "setProperty", tt(t).getPropertyValue(a) + "", u + "", a, !1, a);
                            continue
                        }
                        c = et(t, a, s) + "", m = "string" == typeof u, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || m && S.test(u) ? (m || (u = ((u = dt(u)).length > 3 ? "rgba(" : "rgb(") + u.join(",") + ")"), i = wt(v, a, c, u, !0, "transparent", i, 0, n)) : m && j.test(u) ? i = wt(v, a, c, u, !0, null, i, 0, n) : (x = (f = parseFloat(c)) || 0 === f ? c.substr((f + "").length) : "", "" !== c && "auto" !== c || ("width" === a || "height" === a ? (f = lt(t, a, s), x = "px") : "left" === a || "top" === a ? (f = it(t, a, s), x = "px") : (f = "opacity" !== a ? 0 : 1, x = "")), (b = m && "=" === u.charAt(1)) ? (h = parseInt(u.charAt(0) + "1", 10), u = u.substr(2), h *= parseFloat(u), d = u.replace(w, "")) : (h = parseFloat(u), d = m ? u.replace(w, "") : ""), "" === d && (d = a in r ? r[a] : x), u = h || 0 === h ? (b ? h + f : h) + d : e[a], x !== d && ("" === d && "lineHeight" !== a || (h || 0 === h) && f && (f = rt(t, a, f, x), "%" === d ? (f /= rt(t, a, 100, "%") / 100, !0 !== e.strictUnits && (c = f + "%")) : "em" === d || "rem" === d || "vw" === d || "vh" === d ? f /= rt(t, a, 1, d) : "px" !== d && (h = rt(t, a, h, d), d = "px"), b && (h || 0 === h) && (u = h + f + d))), b && (h += f), !f && 0 !== f || !h && 0 !== h ? void 0 !== v[a] && (u || u + "" != "NaN" && null != u) ? (i = new Ot(v, a, h || f || 0, 0, i, -1, a, !1, 0, c, u)).xs0 = "none" !== u || "display" !== a && -1 === a.indexOf("Style") ? u : c : G("invalid " + a + " tween value: " + e[a]) : (i = new Ot(v, a, f, h - f, i, 0, a, !1 !== p && ("px" === d || "zIndex" === a), 0, c, u)).xs0 = d)
                    }
                    n && i && !i.plugin && (i.plugin = n)
                }
                return i
            }, f.setRatio = function (t) {
                var e, r, i, s = this._firstPT;
                if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                    if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime)
                        for (; s;) {
                            if (e = s.c * t + s.s, s.r ? e = s.r(e) : e < 1e-6 && e > -1e-6 && (e = 0), s.type)
                                if (1 === s.type)
                                    if (2 === (i = s.l)) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2;
                                    else if (3 === i) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3;
                            else if (4 === i) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4;
                            else if (5 === i) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4 + s.xn4 + s.xs5;
                            else {
                                for (r = s.xs0 + e + s.xs1, i = 1; i < s.l; i++) r += s["xn" + i] + s["xs" + (i + 1)];
                                s.t[s.p] = r
                            } else -1 === s.type ? s.t[s.p] = s.xs0 : s.setRatio && s.setRatio(t);
                            else s.t[s.p] = e + s.xs0;
                            s = s._next
                        } else
                            for (; s;) 2 !== s.type ? s.t[s.p] = s.b : s.setRatio(t), s = s._next;
                    else
                        for (; s;) {
                            if (2 !== s.type)
                                if (s.r && -1 !== s.type)
                                    if (e = s.r(s.s + s.c), s.type) {
                                        if (1 === s.type) {
                                            for (i = s.l, r = s.xs0 + e + s.xs1, i = 1; i < s.l; i++) r += s["xn" + i] + s["xs" + (i + 1)];
                                            s.t[s.p] = r
                                        }
                                    } else s.t[s.p] = e + s.xs0;
                            else s.t[s.p] = s.e;
                            else s.setRatio(t);
                            s = s._next
                        }
            }, f._enableTransforms = function (t) {
                this._transform = this._transform || $t(this._target, s, !0), this._transformType = this._transform.svg && Xt || !t && 3 !== this._transformType ? 2 : 3
            };
            var ee = function (t) {
                this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
            };
            f._addLazySet = function (t, e, r) {
                var i = this._firstPT = new Ot(t, e, 0, 0, this._firstPT, 2);
                i.e = r, i.setRatio = ee, i.data = this
            }, f._linkCSSP = function (t, e, r, i) {
                return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, i = !0), r ? r._next = t : i || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = r), t
            }, f._mod = function (t) {
                for (var e = this._firstPT; e;) "function" == typeof t[e.p] && (e.r = t[e.p]), e = e._next
            }, f._kill = function (e) {
                var r, i, s, n = e;
                if (e.autoAlpha || e.alpha) {
                    for (i in n = {}, e) n[i] = e[i];
                    n.opacity = 1, n.autoAlpha && (n.visibility = 1)
                }
                for (e.className && (r = this._classNamePT) && ((s = r.xfirst) && s._prev ? this._linkCSSP(s._prev, r._next, s._prev._prev) : s === this._firstPT && (this._firstPT = r._next), r._next && this._linkCSSP(r._next, r._next._next, s._prev), this._classNamePT = null), r = this._firstPT; r;) r.plugin && r.plugin !== i && r.plugin._kill && (r.plugin._kill(e), i = r.plugin), r = r._next;
                return t.TweenPlugin.prototype._kill.call(this, n)
            };
            var re = function t(e, r, i) {
                var s, n, a, o;
                if (e.slice)
                    for (n = e.length; --n > -1;) t(e[n], r, i);
                else
                    for (n = (s = e.childNodes).length; --n > -1;) o = (a = s[n]).type, a.style && (r.push(st(a)), i && i.push(a)), 1 !== o && 9 !== o && 11 !== o || !a.childNodes.length || t(a, r, i)
            };
            return a.cascadeTo = function (e, r, i) {
                var s, n, a, o, l = t.default.to(e, r, i),
                    f = [l],
                    p = [],
                    h = [],
                    c = [],
                    u = t.default._internals.reservedProps;
                for (e = l._targets || l.target, re(e, p, c), l.render(r, !0, !0), re(e, h), l.render(0, !0, !0), l._enabled(!0), s = c.length; --s > -1;)
                    if ((n = nt(c[s], p[s], h[s])).firstMPT) {
                        for (a in n = n.difs, i) u[a] && (n[a] = i[a]);
                        for (a in o = {}, n) o[a] = p[s][a];
                        f.push(t.default.fromTo(c[s], r, o, n))
                    } return f
            }, t.TweenPlugin.activate([a]), a
        }, !0);
        var s = t.globals.CSSPlugin;
        exports.default = exports.CSSPlugin = s;
}, {
        "./TweenLite.js": "sU2v"
    }],
    "Lwey": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = exports.AttrPlugin = void 0;
        var t = require("./TweenLite.js"),
            e = t._gsScope._gsDefine.plugin({
                propName: "attr",
                API: 2,
                version: "0.6.1",
                init: function (t, e, r, i) {
                    var o, n;
                    if ("function" != typeof t.setAttribute) return !1;
                    for (o in e) "function" == typeof (n = e[o]) && (n = n(i, t)), this._addTween(t, "setAttribute", t.getAttribute(o) + "", n + "", o, !1, o), this._overwriteProps.push(o);
                    return !0
                }
            });
        exports.default = exports.AttrPlugin = e;
}, {
        "./TweenLite.js": "sU2v"
    }],
    "gZZs": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.p = exports._roundLinkedList = exports._getRoundFunc = exports.default = exports.RoundPropsPlugin = void 0;
        var t = require("./TweenLite.js");

        function o(t) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        var r = t._gsScope._gsDefine.plugin({
                propName: "roundProps",
                version: "1.7.0",
                priority: -1,
                API: 2,
                init: function (t, o, r) {
                    return this._tween = r, !0
                }
            }),
            e = function (t) {
                var o = t < 1 ? Math.pow(10, (t + "").length - 2) : 1;
                return function (r) {
                    return (Math.round(r / t) * t * o | 0) / o
                }
            },
            n = function (t, o) {
                for (; t;) t.f || t.blob || (t.m = o || Math.round), t = t._next
            },
            p = r.prototype;
        exports.p = p, exports._roundLinkedList = n, exports._getRoundFunc = e, exports.default = exports.RoundPropsPlugin = r, p._onInitAllProps = function () {
            var t, r, p, u, i = this._tween,
                s = i.vars.roundProps,
                f = {},
                _ = i._propLookup.roundProps;
            if ("object" !== o(s) || s.push)
                for ("string" == typeof s && (s = s.split(",")), p = s.length; --p > -1;) f[s[p]] = Math.round;
            else
                for (u in s) f[u] = e(s[u]);
            for (u in f)
                for (t = i._firstPT; t;) r = t._next, t.pg ? t.t._mod(f) : t.n === u && (2 === t.f && t.t ? n(t.t._firstPT, f[u]) : (this._add(t.t, u, t.s, t.c, f[u]), r && (r._prev = t._prev), t._prev ? t._prev._next = r : i._firstPT === t && (i._firstPT = r), t._next = t._prev = null, i._propLookup[u] = _)), t = r;
            return !1
        }, p._add = function (t, o, r, e, n) {
            this._addTween(t, o, r, r + e, o, n || Math.round), this._overwriteProps.push(o)
        };
}, {
        "./TweenLite.js": "sU2v"
    }],
    "BYZS": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = exports.DirectionalRotationPlugin = void 0;
        var t = require("./TweenLite.js");

        function e(t) {
            return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        var o = t._gsScope._gsDefine.plugin({
            propName: "directionalRotation",
            version: "0.3.1",
            API: 2,
            init: function (t, o, i, n) {
                "object" !== e(o) && (o = {
                    rotation: o
                }), this.finals = {};
                var r, s, f, a, u, p, l = !0 === o.useRadians ? 2 * Math.PI : 360;
                for (r in o) "useRadians" !== r && ("function" == typeof (a = o[r]) && (a = a(n, t)), s = (p = (a + "").split("_"))[0], f = parseFloat("function" != typeof t[r] ? t[r] : t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]()), u = (a = this.finals[r] = "string" == typeof s && "=" === s.charAt(1) ? f + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0) - f, p.length && (-1 !== (s = p.join("_")).indexOf("short") && (u %= l) !== u % (l / 2) && (u = u < 0 ? u + l : u - l), -1 !== s.indexOf("_cw") && u < 0 ? u = (u + 9999999999 * l) % l - (u / l | 0) * l : -1 !== s.indexOf("ccw") && u > 0 && (u = (u - 9999999999 * l) % l - (u / l | 0) * l)), (u > 1e-6 || u < -1e-6) && (this._addTween(t, r, f, f + u, r), this._overwriteProps.push(r)));
                return !0
            },
            set: function (t) {
                var e;
                if (1 !== t) this._super.setRatio.call(this, t);
                else
                    for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
            }
        });
        exports.default = exports.DirectionalRotationPlugin = o, o._autoCSS = !0;
}, {
        "./TweenLite.js": "sU2v"
    }],
    "Rh1e": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = exports.TimelineLite = void 0;
        var t = i(require("./TweenLite.js"));

        function e() {
            if ("function" != typeof WeakMap) return null;
            var t = new WeakMap;
            return e = function () {
                return t
            }, t
        }

        function i(t) {
            if (t && t.__esModule) return t;
            if (null === t || "object" != typeof t && "function" != typeof t) return {
                default: t
            };
            var i = e();
            if (i && i.has(t)) return i.get(t);
            var r = {},
                a = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var n in t)
                if (Object.prototype.hasOwnProperty.call(t, n)) {
                    var s = a ? Object.getOwnPropertyDescriptor(t, n) : null;
                    s && (s.get || s.set) ? Object.defineProperty(r, n, s) : r[n] = t[n]
                } return r.default = t, i && i.set(t, r), r
        }

        function r(t) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        t._gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function () {
            var e = function (e) {
                    t.SimpleTimeline.call(this, e);
                    var i, r, a = this.vars;
                    for (r in this._labels = {}, this.autoRemoveChildren = !!a.autoRemoveChildren, this.smoothChildTiming = !!a.smoothChildTiming, this._sortChildren = !0, this._onUpdate = a.onUpdate, a) i = a[r], s(i) && -1 !== i.join("").indexOf("{self}") && (a[r] = this._swapSelfInParams(i));
                    s(a.tweens) && this.add(a.tweens, 0, a.align, a.stagger)
                },
                i = t.default._internals,
                a = e._internals = {},
                n = i.isSelector,
                s = i.isArray,
                o = i.lazyTweens,
                l = i.lazyRender,
                h = t._gsScope._gsDefine.globals,
                _ = function (t) {
                    var e, i = {};
                    for (e in t) i[e] = t[e];
                    return i
                },
                u = function (t, e, i) {
                    var r, a, n = t.cycle;
                    for (r in n) a = n[r], t[r] = "function" == typeof a ? a(i, e[i], e) : a[i % a.length];
                    delete t.cycle
                },
                m = a.pauseCallback = function () {},
                f = function (t, e, i, r) {
                    var a = "immediateRender";
                    return a in e || (e[a] = !(i && !1 === i[a] || r)), e
                },
                d = function (t) {
                    if ("function" == typeof t) return t;
                    var e = "object" === r(t) ? t : {
                            each: t
                        },
                        i = e.ease,
                        a = e.from || 0,
                        n = e.base || 0,
                        s = {},
                        o = isNaN(a),
                        l = e.axis,
                        h = {
                            center: .5,
                            end: 1
                        } [a] || 0;
                    return function (t, r, _) {
                        var u, m, f, d, c, p, T, v, g, y = (_ || e).length,
                            b = s[y];
                        if (!b) {
                            if (!(g = "auto" === e.grid ? 0 : (e.grid || [1 / 0])[0])) {
                                for (T = -1 / 0; T < (T = _[g++].getBoundingClientRect().left) && g < y;);
                                g--
                            }
                            for (b = s[y] = [], u = o ? Math.min(g, y) * h - .5 : a % g, m = o ? y * h / g - .5 : a / g | 0, T = 0, v = 1 / 0, p = 0; p < y; p++) f = p % g - u, d = m - (p / g | 0), b[p] = c = l ? Math.abs("y" === l ? d : f) : Math.sqrt(f * f + d * d), c > T && (T = c), c < v && (v = c);
                            b.max = T - v, b.min = v, b.v = y = e.amount || e.each * (g > y ? y - 1 : l ? "y" === l ? y / g : g : Math.max(g, y / g)) || 0, b.b = y < 0 ? n - y : n
                        }
                        return y = (b[t] - b.min) / b.max, b.b + (i ? i.getRatio(y) : y) * b.v
                    }
                },
                c = e.prototype = new t.SimpleTimeline;
            return e.version = "2.1.3", e.distribute = d, c.constructor = e, c.kill()._gc = c._forcingPlayhead = c._hasPause = !1, c.to = function (e, i, r, a) {
                var n = r.repeat && h.TweenMax || t.default;
                return i ? this.add(new n(e, i, r), a) : this.set(e, r, a)
            }, c.from = function (e, i, r, a) {
                return this.add((r.repeat && h.TweenMax || t.default).from(e, i, f(0, r)), a)
            }, c.fromTo = function (e, i, r, a, n) {
                var s = a.repeat && h.TweenMax || t.default;
                return a = f(0, a, r), i ? this.add(s.fromTo(e, i, r, a), n) : this.set(e, a, n)
            }, c.staggerTo = function (i, r, a, s, o, l, h, m) {
                var f, c, p = new e({
                        onComplete: l,
                        onCompleteParams: h,
                        callbackScope: m,
                        smoothChildTiming: this.smoothChildTiming
                    }),
                    T = d(a.stagger || s),
                    v = a.startAt,
                    g = a.cycle;
                for ("string" == typeof i && (i = t.default.selector(i) || i), n(i = i || []) && (i = function (t) {
                        var e, i = [],
                            r = t.length;
                        for (e = 0; e !== r; i.push(t[e++]));
                        return i
                    }(i)), c = 0; c < i.length; c++) f = _(a), v && (f.startAt = _(v), v.cycle && u(f.startAt, i, c)), g && (u(f, i, c), null != f.duration && (r = f.duration, delete f.duration)), p.to(i[c], r, f, T(c, i[c], i));
                return this.add(p, o)
            }, c.staggerFrom = function (t, e, i, r, a, n, s, o) {
                return i.runBackwards = !0, this.staggerTo(t, e, f(0, i), r, a, n, s, o)
            }, c.staggerFromTo = function (t, e, i, r, a, n, s, o, l) {
                return r.startAt = i, this.staggerTo(t, e, f(0, r, i), a, n, s, o, l)
            }, c.call = function (e, i, r, a) {
                return this.add(t.default.delayedCall(0, e, i, r), a)
            }, c.set = function (e, i, r) {
                return this.add(new t.default(e, 0, f(0, i, null, !0)), r)
            }, e.exportRoot = function (i, r) {
                null == (i = i || {}).smoothChildTiming && (i.smoothChildTiming = !0);
                var a, n, s, o, l = new e(i),
                    h = l._timeline;
                for (null == r && (r = !0), h._remove(l, !0), l._startTime = 0, l._rawPrevTime = l._time = l._totalTime = h._time, s = h._first; s;) o = s._next, r && s instanceof t.default && s.target === s.vars.onComplete || ((n = s._startTime - s._delay) < 0 && (a = 1), l.add(s, n)), s = o;
                return h.add(l, 0), a && l.totalDuration(), l
            }, c.add = function (i, r, a, n) {
                var o, l, h, _, u, m;
                if ("number" != typeof r && (r = this._parseTimeOrLabel(r, 0, !0, i)), !(i instanceof t.Animation)) {
                    if (i instanceof Array || i && i.push && s(i)) {
                        for (a = a || "normal", n = n || 0, o = r, l = i.length, h = 0; h < l; h++) s(_ = i[h]) && (_ = new e({
                            tweens: _
                        })), this.add(_, o), "string" != typeof _ && "function" != typeof _ && ("sequence" === a ? o = _._startTime + _.totalDuration() / _._timeScale : "start" === a && (_._startTime -= _.delay())), o += n;
                        return this._uncache(!0)
                    }
                    if ("string" == typeof i) return this.addLabel(i, r);
                    if ("function" != typeof i) throw "Cannot add " + i + " into the timeline; it is not a tween, timeline, function, or string.";
                    i = t.default.delayedCall(0, i)
                }
                if (t.SimpleTimeline.prototype.add.call(this, i, r), (i._time || !i._duration && i._initted) && (o = (this.rawTime() - i._startTime) * i._timeScale, (!i._duration || Math.abs(Math.max(0, Math.min(i.totalDuration(), o))) - i._totalTime > 1e-5) && i.render(o, !1, !1)), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                    for (m = (u = this).rawTime() > i._startTime; u._timeline;) m && u._timeline.smoothChildTiming ? u.totalTime(u._totalTime, !0) : u._gc && u._enabled(!0, !1), u = u._timeline;
                return this
            }, c.remove = function (e) {
                if (e instanceof t.Animation) {
                    this._remove(e, !1);
                    var i = e._timeline = e.vars.useFrames ? t.Animation._rootFramesTimeline : t.Animation._rootTimeline;
                    return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale, this
                }
                if (e instanceof Array || e && e.push && s(e)) {
                    for (var r = e.length; --r > -1;) this.remove(e[r]);
                    return this
                }
                return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
            }, c._remove = function (e, i) {
                return t.SimpleTimeline.prototype._remove.call(this, e, i), this._last ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
            }, c.append = function (t, e) {
                return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
            }, c.insert = c.insertMultiple = function (t, e, i, r) {
                return this.add(t, e || 0, i, r)
            }, c.appendMultiple = function (t, e, i, r) {
                return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, r)
            }, c.addLabel = function (t, e) {
                return this._labels[t] = this._parseTimeOrLabel(e), this
            }, c.addPause = function (e, i, r, a) {
                var n = t.default.delayedCall(0, m, r, a || this);
                return n.vars.onComplete = n.vars.onReverseComplete = i, n.data = "isPause", this._hasPause = !0, this.add(n, e)
            }, c.removeLabel = function (t) {
                return delete this._labels[t], this
            }, c.getLabelTime = function (t) {
                return null != this._labels[t] ? this._labels[t] : -1
            }, c._parseTimeOrLabel = function (e, i, r, a) {
                var n, o;
                if (a instanceof t.Animation && a.timeline === this) this.remove(a);
                else if (a && (a instanceof Array || a.push && s(a)))
                    for (o = a.length; --o > -1;) a[o] instanceof t.Animation && a[o].timeline === this && this.remove(a[o]);
                if (n = "number" != typeof e || i ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration : 0, "string" == typeof i) return this._parseTimeOrLabel(i, r && "number" == typeof e && null == this._labels[i] ? e - n : 0, r);
                if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = n);
                else {
                    if (-1 === (o = e.indexOf("="))) return null == this._labels[e] ? r ? this._labels[e] = n + i : i : this._labels[e] + i;
                    i = parseInt(e.charAt(o - 1) + "1", 10) * Number(e.substr(o + 1)), e = o > 1 ? this._parseTimeOrLabel(e.substr(0, o - 1), 0, r) : n
                }
                return Number(e) + i
            }, c.seek = function (t, e) {
                return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), !1 !== e)
            }, c.stop = function () {
                return this.paused(!0)
            }, c.gotoAndPlay = function (t, e) {
                return this.play(t, e)
            }, c.gotoAndStop = function (t, e) {
                return this.pause(t, e)
            }, c.render = function (t, e, i) {
                this._gc && this._enabled(!0, !1);
                var r, a, n, s, h, _, u, m, f = this._time,
                    d = this._dirty ? this.totalDuration() : this._totalDuration,
                    c = this._startTime,
                    p = this._timeScale,
                    T = this._paused;
                if (f !== this._time && (t += this._time - f), this._hasPause && !this._forcingPlayhead && !e) {
                    if (t > f)
                        for (r = this._first; r && r._startTime <= t && !_;) r._duration || "isPause" !== r.data || r.ratio || 0 === r._startTime && 0 === this._rawPrevTime || (_ = r), r = r._next;
                    else
                        for (r = this._last; r && r._startTime >= t && !_;) r._duration || "isPause" === r.data && r._rawPrevTime > 0 && (_ = r), r = r._prev;
                    _ && (this._time = this._totalTime = t = _._startTime, m = this._startTime + (this._reversed ? this._duration - t : t) / this._timeScale)
                }
                if (t >= d - 1e-8 && t >= 0) this._totalTime = this._time = d, this._reversed || this._hasPausedChild() || (a = !0, s = "onComplete", h = !!this._timeline.autoRemoveChildren, 0 === this._duration && (t <= 0 && t >= -1e-8 || this._rawPrevTime < 0 || 1e-8 === this._rawPrevTime) && this._rawPrevTime !== t && this._first && (h = !0, this._rawPrevTime > 1e-8 && (s = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : 1e-8, t = d + 1e-4;
                else if (t < 1e-8)
                    if (this._totalTime = this._time = 0, t > -1e-8 && (t = 0), (0 !== f || 0 === this._duration && 1e-8 !== this._rawPrevTime && (this._rawPrevTime > 0 || t < 0 && this._rawPrevTime >= 0)) && (s = "onReverseComplete", a = this._reversed), t < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (h = a = !0, s = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (h = !0), this._rawPrevTime = t;
                    else {
                        if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : 1e-8, 0 === t && a)
                            for (r = this._first; r && 0 === r._startTime;) r._duration || (a = !1), r = r._next;
                        t = 0, this._initted || (h = !0)
                    }
                else this._totalTime = this._time = this._rawPrevTime = t;
                if (this._time !== f && this._first || i || h || _) {
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== f && t > 0 && (this._active = !0), 0 === f && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")), (u = this._time) >= f)
                        for (r = this._first; r && (n = r._next, u === this._time && (!this._paused || T));)(r._active || r._startTime <= u && !r._paused && !r._gc) && (_ === r && (this.pause(), this._pauseTime = m), r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n;
                    else
                        for (r = this._last; r && (n = r._prev, u === this._time && (!this._paused || T));) {
                            if (r._active || r._startTime <= f && !r._paused && !r._gc) {
                                if (_ === r) {
                                    for (_ = r._prev; _ && _.endTime() > this._time;) _.render(_._reversed ? _.totalDuration() - (t - _._startTime) * _._timeScale : (t - _._startTime) * _._timeScale, e, i), _ = _._prev;
                                    _ = null, this.pause(), this._pauseTime = m
                                }
                                r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)
                            }
                            r = n
                        }
                    this._onUpdate && (e || (o.length && l(), this._callback("onUpdate"))), s && (this._gc || c !== this._startTime && p === this._timeScale || (0 === this._time || d >= this.totalDuration()) && (a && (o.length && l(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[s] && this._callback(s)))
                }
            }, c._hasPausedChild = function () {
                for (var t = this._first; t;) {
                    if (t._paused || t instanceof e && t._hasPausedChild()) return !0;
                    t = t._next
                }
                return !1
            }, c.getChildren = function (e, i, r, a) {
                a = a || -9999999999;
                for (var n = [], s = this._first, o = 0; s;) s._startTime < a || (s instanceof t.default ? !1 !== i && (n[o++] = s) : (!1 !== r && (n[o++] = s), !1 !== e && (o = (n = n.concat(s.getChildren(!0, i, r))).length))), s = s._next;
                return n
            }, c.getTweensOf = function (e, i) {
                var r, a, n = this._gc,
                    s = [],
                    o = 0;
                for (n && this._enabled(!0, !0), a = (r = t.default.getTweensOf(e)).length; --a > -1;)(r[a].timeline === this || i && this._contains(r[a])) && (s[o++] = r[a]);
                return n && this._enabled(!1, !0), s
            }, c.recent = function () {
                return this._recent
            }, c._contains = function (t) {
                for (var e = t.timeline; e;) {
                    if (e === this) return !0;
                    e = e.timeline
                }
                return !1
            }, c.shiftChildren = function (t, e, i) {
                i = i || 0;
                for (var r, a = this._first, n = this._labels; a;) a._startTime >= i && (a._startTime += t), a = a._next;
                if (e)
                    for (r in n) n[r] >= i && (n[r] += t);
                return this._uncache(!0)
            }, c._kill = function (t, e) {
                if (!t && !e) return this._enabled(!1, !1);
                for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), r = i.length, a = !1; --r > -1;) i[r]._kill(t, e) && (a = !0);
                return a
            }, c.clear = function (t) {
                var e = this.getChildren(!1, !0, !0),
                    i = e.length;
                for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                return !1 !== t && (this._labels = {}), this._uncache(!0)
            }, c.invalidate = function () {
                for (var e = this._first; e;) e.invalidate(), e = e._next;
                return t.Animation.prototype.invalidate.call(this)
            }, c._enabled = function (e, i) {
                if (e === this._gc)
                    for (var r = this._first; r;) r._enabled(e, !0), r = r._next;
                return t.SimpleTimeline.prototype._enabled.call(this, e, i)
            }, c.totalTime = function (e, i, r) {
                this._forcingPlayhead = !0;
                var a = t.Animation.prototype.totalTime.apply(this, arguments);
                return this._forcingPlayhead = !1, a
            }, c.duration = function (t) {
                return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
            }, c.totalDuration = function (t) {
                if (!arguments.length) {
                    if (this._dirty) {
                        for (var e, i, r = 0, a = this._last, n = 999999999999; a;) e = a._prev, a._dirty && a.totalDuration(), a._startTime > n && this._sortChildren && !a._paused && !this._calculatingDuration ? (this._calculatingDuration = 1, this.add(a, a._startTime - a._delay), this._calculatingDuration = 0) : n = a._startTime, a._startTime < 0 && !a._paused && (r -= a._startTime, this._timeline.smoothChildTiming && (this._startTime += a._startTime / this._timeScale, this._time -= a._startTime, this._totalTime -= a._startTime, this._rawPrevTime -= a._startTime), this.shiftChildren(-a._startTime, !1, -9999999999), n = 0), (i = a._startTime + a._totalDuration / a._timeScale) > r && (r = i), a = e;
                        this._duration = this._totalDuration = r, this._dirty = !1
                    }
                    return this._totalDuration
                }
                return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
            }, c.paused = function (e) {
                if (!1 === e && this._paused)
                    for (var i = this._first; i;) i._startTime === this._time && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
                return t.Animation.prototype.paused.apply(this, arguments)
            }, c.usesFrames = function () {
                for (var e = this._timeline; e._timeline;) e = e._timeline;
                return e === t.Animation._rootFramesTimeline
            }, c.rawTime = function (t) {
                return t && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(t) - this._startTime) * this._timeScale
            }, e
        }, !0);
        var a = t.globals.TimelineLite;
        exports.default = exports.TimelineLite = a;
}, {
        "./TweenLite.js": "sU2v"
    }],
    "c5lM": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), Object.defineProperty(exports, "TimelineLite", {
            enumerable: !0,
            get: function () {
                return e.default
            }
        }), exports.default = exports.TimelineMax = void 0;
        var t = r(require("./TweenLite.js")),
            e = i(require("./TimelineLite.js"));

        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function s() {
            if ("function" != typeof WeakMap) return null;
            var t = new WeakMap;
            return s = function () {
                return t
            }, t
        }

        function r(t) {
            if (t && t.__esModule) return t;
            if (null === t || "object" != typeof t && "function" != typeof t) return {
                default: t
            };
            var e = s();
            if (e && e.has(t)) return e.get(t);
            var i = {},
                r = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var a in t)
                if (Object.prototype.hasOwnProperty.call(t, a)) {
                    var h = r ? Object.getOwnPropertyDescriptor(t, a) : null;
                    h && (h.get || h.set) ? Object.defineProperty(i, a, h) : i[a] = t[a]
                } return i.default = t, e && e.set(t, i), i
        }
        t._gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function () {
            var i = function (t) {
                    e.default.call(this, t), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = !!this.vars.yoyo, this._dirty = !0
                },
                s = t.default._internals,
                r = s.lazyTweens,
                a = s.lazyRender,
                h = t._gsScope._gsDefine.globals,
                _ = new t.Ease(null, null, 1, 0),
                l = i.prototype = new e.default;
            return l.constructor = i, l.kill()._gc = !1, i.version = "2.1.3", l.invalidate = function () {
                return this._yoyo = !!this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), e.default.prototype.invalidate.call(this)
            }, l.addCallback = function (e, i, s, r) {
                return this.add(t.default.delayedCall(0, e, s, r), i)
            }, l.removeCallback = function (t, e) {
                if (t)
                    if (null == e) this._kill(null, t);
                    else
                        for (var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e); --s > -1;) i[s]._startTime === r && i[s]._enabled(!1, !1);
                return this
            }, l.removePause = function (t) {
                return this.removeCallback(e.default._internals.pauseCallback, t)
            }, l.tweenTo = function (e, i) {
                i = i || {};
                var s, r, a, l = {
                        ease: _,
                        useFrames: this.usesFrames(),
                        immediateRender: !1,
                        lazy: !1
                    },
                    n = i.repeat && h.TweenMax || t.default;
                for (r in i) l[r] = i[r];
                return l.time = this._parseTimeOrLabel(e), s = Math.abs(Number(l.time) - this._time) / this._timeScale || .001, a = new n(this, s, l), l.onStart = function () {
                    a.target.paused(!0), a.vars.time === a.target.time() || s !== a.duration() || a.isFromTo || a.duration(Math.abs(a.vars.time - a.target.time()) / a.target._timeScale).render(a.time(), !0, !0), i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || a, i.onStartParams || [])
                }, a
            }, l.tweenFromTo = function (t, e, i) {
                i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                    onComplete: this.seek,
                    onCompleteParams: [t],
                    callbackScope: this
                }, i.immediateRender = !1 !== i.immediateRender;
                var s = this.tweenTo(e, i);
                return s.isFromTo = 1, s.duration(Math.abs(s.vars.time - t) / this._timeScale || .001)
            }, l.render = function (t, e, i) {
                this._gc && this._enabled(!0, !1);
                var s, h, _, l, n, o, c, u, m, d = this._time,
                    f = this._dirty ? this.totalDuration() : this._totalDuration,
                    p = this._duration,
                    y = this._totalTime,
                    v = this._startTime,
                    T = this._timeScale,
                    g = this._rawPrevTime,
                    b = this._paused,
                    D = this._cycle;
                if (d !== this._time && (t += this._time - d), t >= f - 1e-8 && t >= 0) this._locked || (this._totalTime = f, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (h = !0, l = "onComplete", n = !!this._timeline.autoRemoveChildren, 0 === this._duration && (t <= 0 && t >= -1e-8 || g < 0 || 1e-8 === g) && g !== t && this._first && (n = !0, g > 1e-8 && (l = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : 1e-8, this._yoyo && 1 & this._cycle ? this._time = t = 0 : (this._time = p, t = p + 1e-4);
                else if (t < 1e-8)
                    if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, t > -1e-8 && (t = 0), (0 !== d || 0 === p && 1e-8 !== g && (g > 0 || t < 0 && g >= 0) && !this._locked) && (l = "onReverseComplete", h = this._reversed), t < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (n = h = !0, l = "onReverseComplete") : g >= 0 && this._first && (n = !0), this._rawPrevTime = t;
                    else {
                        if (this._rawPrevTime = p || !e || t || this._rawPrevTime === t ? t : 1e-8, 0 === t && h)
                            for (s = this._first; s && 0 === s._startTime;) s._duration || (h = !1), s = s._next;
                        t = 0, this._initted || (n = !0)
                    }
                else 0 === p && g < 0 && (n = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (o = p + this._repeatDelay, this._cycle = this._totalTime / o >> 0, this._cycle && this._cycle === this._totalTime / o && y <= t && this._cycle--, this._time = this._totalTime - this._cycle * o, this._yoyo && 1 & this._cycle && (this._time = p - this._time), this._time > p ? (this._time = p, t = p + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time));
                if (this._hasPause && !this._forcingPlayhead && !e) {
                    if ((t = this._time) > d || this._repeat && D !== this._cycle)
                        for (s = this._first; s && s._startTime <= t && !c;) s._duration || "isPause" !== s.data || s.ratio || 0 === s._startTime && 0 === this._rawPrevTime || (c = s), s = s._next;
                    else
                        for (s = this._last; s && s._startTime >= t && !c;) s._duration || "isPause" === s.data && s._rawPrevTime > 0 && (c = s), s = s._prev;
                    c && (m = this._startTime + (this._reversed ? this._duration - c._startTime : c._startTime) / this._timeScale, c._startTime < p && (this._time = this._rawPrevTime = t = c._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay)))
                }
                if (this._cycle !== D && !this._locked) {
                    var P = this._yoyo && 0 != (1 & D),
                        k = P === (this._yoyo && 0 != (1 & this._cycle)),
                        w = this._totalTime,
                        S = this._cycle,
                        C = this._rawPrevTime,
                        L = this._time;
                    if (this._totalTime = D * p, this._cycle < D ? P = !P : this._totalTime += p, this._time = d, this._rawPrevTime = 0 === p ? g - 1e-4 : g, this._cycle = D, this._locked = !0, d = P ? 0 : p, this.render(d, e, 0 === p), e || this._gc || this.vars.onRepeat && (this._cycle = S, this._locked = !1, this._callback("onRepeat")), d !== this._time) return;
                    if (k && (this._cycle = D, this._locked = !0, d = P ? p + 1e-4 : -1e-4, this.render(d, !0, !1)), this._locked = !1, this._paused && !b) return;
                    this._time = L, this._totalTime = w, this._cycle = S, this._rawPrevTime = C
                }
                if (this._time !== d && this._first || i || n || c) {
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== y && t > 0 && (this._active = !0), 0 === y && this.vars.onStart && (0 === this._totalTime && this._totalDuration || e || this._callback("onStart")), (u = this._time) >= d)
                        for (s = this._first; s && (_ = s._next, u === this._time && (!this._paused || b));)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (c === s && (this.pause(), this._pauseTime = m), s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = _;
                    else
                        for (s = this._last; s && (_ = s._prev, u === this._time && (!this._paused || b));) {
                            if (s._active || s._startTime <= d && !s._paused && !s._gc) {
                                if (c === s) {
                                    for (c = s._prev; c && c.endTime() > this._time;) c.render(c._reversed ? c.totalDuration() - (t - c._startTime) * c._timeScale : (t - c._startTime) * c._timeScale, e, i), c = c._prev;
                                    c = null, this.pause(), this._pauseTime = m
                                }
                                s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)
                            }
                            s = _
                        }
                    this._onUpdate && (e || (r.length && a(), this._callback("onUpdate"))), l && (this._locked || this._gc || v !== this._startTime && T === this._timeScale || (0 === this._time || f >= this.totalDuration()) && (h && (r.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[l] && this._callback(l)))
                } else y !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate"))
            }, l.getActive = function (t, e, i) {
                var s, r, a = [],
                    h = this.getChildren(t || null == t, e || null == t, !!i),
                    _ = 0,
                    l = h.length;
                for (s = 0; s < l; s++)(r = h[s]).isActive() && (a[_++] = r);
                return a
            }, l.getLabelAfter = function (t) {
                t || 0 !== t && (t = this._time);
                var e, i = this.getLabelsArray(),
                    s = i.length;
                for (e = 0; e < s; e++)
                    if (i[e].time > t) return i[e].name;
                return null
            }, l.getLabelBefore = function (t) {
                null == t && (t = this._time);
                for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                    if (e[i].time < t) return e[i].name;
                return null
            }, l.getLabelsArray = function () {
                var t, e = [],
                    i = 0;
                for (t in this._labels) e[i++] = {
                    time: this._labels[t],
                    name: t
                };
                return e.sort(function (t, e) {
                    return t.time - e.time
                }), e
            }, l.invalidate = function () {
                return this._locked = !1, e.default.prototype.invalidate.call(this)
            }, l.progress = function (t, e) {
                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration() || 0
            }, l.totalProgress = function (t, e) {
                return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration() || 0
            }, l.totalDuration = function (t) {
                return arguments.length ? -1 !== this._repeat && t ? this.timeScale(this.totalDuration() / t) : this : (this._dirty && (e.default.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
            }, l.time = function (t, e) {
                if (!arguments.length) return this._time;
                this._dirty && this.totalDuration();
                var i = this._duration,
                    s = this._cycle,
                    r = s * (i + this._repeatDelay);
                return t > i && (t = i), this.totalTime(this._yoyo && 1 & s ? i - t + r : this._repeat ? t + r : t, e)
            }, l.repeat = function (t) {
                return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
            }, l.repeatDelay = function (t) {
                return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
            }, l.yoyo = function (t) {
                return arguments.length ? (this._yoyo = t, this) : this._yoyo
            }, l.currentLabel = function (t) {
                return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
            }, i
        }, !0);
        var a = t.globals.TimelineMax;
        exports.default = exports.TimelineMax = a;
}, {
        "./TweenLite.js": "sU2v",
        "./TimelineLite.js": "Rh1e"
    }],
    "JjQl": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = exports.BezierPlugin = void 0;
        var t = require("./TweenLite.js"),
            i = 180 / Math.PI,
            s = [],
            e = [],
            r = [],
            n = {},
            o = t._gsScope._gsDefine.globals,
            a = function (t, i, s, e) {
                s === e && (s = e - (e - i) / 1e6), t === i && (i = t + (s - t) / 1e6), this.a = t, this.b = i, this.c = s, this.d = e, this.da = e - t, this.ca = s - t, this.ba = i - t
            },
            h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
            _ = function (t, i, s, e) {
                var r = {
                        a: t
                    },
                    n = {},
                    o = {},
                    a = {
                        c: e
                    },
                    h = (t + i) / 2,
                    _ = (i + s) / 2,
                    l = (s + e) / 2,
                    u = (h + _) / 2,
                    f = (_ + l) / 2,
                    c = (f - u) / 8;
                return r.b = h + (t - h) / 4, n.b = u + c, r.c = n.a = (r.b + n.b) / 2, n.c = o.a = (u + f) / 2, o.b = f - c, a.b = l + (e - l) / 4, o.c = a.a = (o.b + a.b) / 2, [r, n, o, a]
            },
            l = function (t, i, n, o, a) {
                var h, l, u, f, c, g, p, b, d, m, v, R, y, w = t.length - 1,
                    z = 0,
                    x = t[0].a;
                for (h = 0; h < w; h++) l = (c = t[z]).a, u = c.d, f = t[z + 1].d, a ? (v = s[h], y = ((R = e[h]) + v) * i * .25 / (o ? .5 : r[h] || .5), b = u - ((g = u - (u - l) * (o ? .5 * i : 0 !== v ? y / v : 0)) + (((p = u + (f - u) * (o ? .5 * i : 0 !== R ? y / R : 0)) - g) * (3 * v / (v + R) + .5) / 4 || 0))) : b = u - ((g = u - (u - l) * i * .5) + (p = u + (f - u) * i * .5)) / 2, g += b, p += b, c.c = d = g, c.b = 0 !== h ? x : x = c.a + .6 * (c.c - c.a), c.da = u - l, c.ca = d - l, c.ba = x - l, n ? (m = _(l, x, d, u), t.splice(z, 1, m[0], m[1], m[2], m[3]), z += 4) : z++, x = p;
                (c = t[z]).b = x, c.c = x + .4 * (c.d - x), c.da = c.d - c.a, c.ca = c.c - c.a, c.ba = x - c.a, n && (m = _(c.a, x, c.c, c.d), t.splice(z, 1, m[0], m[1], m[2], m[3]))
            },
            u = function (t, i, r, n) {
                var o, h, _, l, u, f, c = [];
                if (n)
                    for (h = (t = [n].concat(t)).length; --h > -1;) "string" == typeof (f = t[h][i]) && "=" === f.charAt(1) && (t[h][i] = n[i] + Number(f.charAt(0) + f.substr(2)));
                if ((o = t.length - 2) < 0) return c[0] = new a(t[0][i], 0, 0, t[0][i]), c;
                for (h = 0; h < o; h++) _ = t[h][i], l = t[h + 1][i], c[h] = new a(_, 0, 0, l), r && (u = t[h + 2][i], s[h] = (s[h] || 0) + (l - _) * (l - _), e[h] = (e[h] || 0) + (u - l) * (u - l));
                return c[h] = new a(t[h][i], 0, 0, t[h + 1][i]), c
            },
            f = function (t, i, o, a, _, f) {
                var c, g, p, b, d, m, v, R, y = {},
                    w = [],
                    z = f || t[0];
                for (g in _ = "string" == typeof _ ? "," + _ + "," : h, null == i && (i = 1), t[0]) w.push(g);
                if (t.length > 1) {
                    for (R = t[t.length - 1], v = !0, c = w.length; --c > -1;)
                        if (g = w[c], Math.abs(z[g] - R[g]) > .05) {
                            v = !1;
                            break
                        } v && (t = t.concat(), f && t.unshift(f), t.push(t[1]), f = t[t.length - 3])
                }
                for (s.length = e.length = r.length = 0, c = w.length; --c > -1;) g = w[c], n[g] = -1 !== _.indexOf("," + g + ","), y[g] = u(t, g, n[g], f);
                for (c = s.length; --c > -1;) s[c] = Math.sqrt(s[c]), e[c] = Math.sqrt(e[c]);
                if (!a) {
                    for (c = w.length; --c > -1;)
                        if (n[g])
                            for (m = (p = y[w[c]]).length - 1, b = 0; b < m; b++) d = p[b + 1].da / e[b] + p[b].da / s[b] || 0, r[b] = (r[b] || 0) + d * d;
                    for (c = r.length; --c > -1;) r[c] = Math.sqrt(r[c])
                }
                for (c = w.length, b = o ? 4 : 1; --c > -1;) p = y[g = w[c]], l(p, i, o, a, n[g]), v && (p.splice(0, b), p.splice(p.length - b, b));
                return y
            },
            c = function (t, i, s) {
                var e, r, n, o, h, _, l, u, f, c, g, p = {},
                    b = "cubic" === (i = i || "soft") ? 3 : 2,
                    d = "soft" === i,
                    m = [];
                if (d && s && (t = [s].concat(t)), null == t || t.length < b + 1) throw "invalid Bezier data";
                for (f in t[0]) m.push(f);
                for (_ = m.length; --_ > -1;) {
                    for (p[f = m[_]] = h = [], c = 0, u = t.length, l = 0; l < u; l++) e = null == s ? t[l][f] : "string" == typeof (g = t[l][f]) && "=" === g.charAt(1) ? s[f] + Number(g.charAt(0) + g.substr(2)) : Number(g), d && l > 1 && l < u - 1 && (h[c++] = (e + h[c - 2]) / 2), h[c++] = e;
                    for (u = c - b + 1, c = 0, l = 0; l < u; l += b) e = h[l], r = h[l + 1], n = h[l + 2], o = 2 === b ? 0 : h[l + 3], h[c++] = g = 3 === b ? new a(e, r, n, o) : new a(e, (2 * r + e) / 3, (2 * r + n) / 3, n);
                    h.length = c
                }
                return p
            },
            g = function (t, i, s) {
                for (var e, r, n, o, a, h, _, l, u, f, c, g = 1 / s, p = t.length; --p > -1;)
                    for (n = (f = t[p]).a, o = f.d - n, a = f.c - n, h = f.b - n, e = r = 0, l = 1; l <= s; l++) e = r - (r = ((_ = g * l) * _ * o + 3 * (u = 1 - _) * (_ * a + u * h)) * _), i[c = p * s + l - 1] = (i[c] || 0) + e * e
            },
            p = function (t, i) {
                var s, e, r, n, o = [],
                    a = [],
                    h = 0,
                    _ = 0,
                    l = (i = i >> 0 || 6) - 1,
                    u = [],
                    f = [];
                for (s in t) g(t[s], o, i);
                for (r = o.length, e = 0; e < r; e++) h += Math.sqrt(o[e]), f[n = e % i] = h, n === l && (_ += h, u[n = e / i >> 0] = f, a[n] = _, h = 0, f = []);
                return {
                    length: _,
                    lengths: a,
                    segments: u
                }
            },
            b = t._gsScope._gsDefine.plugin({
                propName: "bezier",
                priority: -1,
                version: "1.3.9",
                API: 2,
                global: !0,
                init: function (t, i, s) {
                    this._target = t, i instanceof Array && (i = {
                        values: i
                    }), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == i.timeResolution ? 6 : parseInt(i.timeResolution, 10);
                    var e, r, n, o, a, h = i.values || [],
                        _ = {},
                        l = h[0],
                        u = i.autoRotate || s.vars.orientToBezier;
                    for (e in this._autoRotate = u ? u instanceof Array ? u : [["x", "y", "rotation", !0 === u ? 0 : Number(u) || 0]] : null, l) this._props.push(e);
                    for (n = this._props.length; --n > -1;) e = this._props[n], this._overwriteProps.push(e), r = this._func[e] = "function" == typeof t[e], _[e] = r ? t[e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3)]() : parseFloat(t[e]), a || _[e] !== h[0][e] && (a = _);
                    if (this._beziers = "cubic" !== i.type && "quadratic" !== i.type && "soft" !== i.type ? f(h, isNaN(i.curviness) ? 1 : i.curviness, !1, "thruBasic" === i.type, i.correlate, a) : c(h, i.type, _), this._segCount = this._beziers[e].length, this._timeRes) {
                        var g = p(this._beziers, this._timeRes);
                        this._length = g.length, this._lengths = g.lengths, this._segments = g.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                    }
                    if (u = this._autoRotate)
                        for (this._initialRotations = [], u[0] instanceof Array || (this._autoRotate = u = [u]), n = u.length; --n > -1;) {
                            for (o = 0; o < 3; o++) e = u[n][o], this._func[e] = "function" == typeof t[e] && t[e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3)];
                            e = u[n][2], this._initialRotations[n] = (this._func[e] ? this._func[e].call(this._target) : this._target[e]) || 0, this._overwriteProps.push(e)
                        }
                    return this._startRatio = s.vars.runBackwards ? 1 : 0, !0
                },
                set: function (t) {
                    var s, e, r, n, o, a, h, _, l, u, f, c = this._segCount,
                        g = this._func,
                        p = this._target,
                        b = t !== this._startRatio;
                    if (this._timeRes) {
                        if (l = this._lengths, u = this._curSeg, f = t * this._length, r = this._li, f > this._l2 && r < c - 1) {
                            for (_ = c - 1; r < _ && (this._l2 = l[++r]) <= f;);
                            this._l1 = l[r - 1], this._li = r, this._curSeg = u = this._segments[r], this._s2 = u[this._s1 = this._si = 0]
                        } else if (f < this._l1 && r > 0) {
                            for (; r > 0 && (this._l1 = l[--r]) >= f;);
                            0 === r && f < this._l1 ? this._l1 = 0 : r++, this._l2 = l[r], this._li = r, this._curSeg = u = this._segments[r], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si]
                        }
                        if (s = r, f -= this._l1, r = this._si, f > this._s2 && r < u.length - 1) {
                            for (_ = u.length - 1; r < _ && (this._s2 = u[++r]) <= f;);
                            this._s1 = u[r - 1], this._si = r
                        } else if (f < this._s1 && r > 0) {
                            for (; r > 0 && (this._s1 = u[--r]) >= f;);
                            0 === r && f < this._s1 ? this._s1 = 0 : r++, this._s2 = u[r], this._si = r
                        }
                        a = 1 === t ? 1 : (r + (f - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                    } else a = (t - (s = t < 0 ? 0 : t >= 1 ? c - 1 : c * t >> 0) * (1 / c)) * c;
                    for (e = 1 - a, r = this._props.length; --r > -1;) n = this._props[r], h = (a * a * (o = this._beziers[n][s]).da + 3 * e * (a * o.ca + e * o.ba)) * a + o.a, this._mod[n] && (h = this._mod[n](h, p)), g[n] ? p[n](h) : p[n] = h;
                    if (this._autoRotate) {
                        var d, m, v, R, y, w, z, x = this._autoRotate;
                        for (r = x.length; --r > -1;) n = x[r][2], w = x[r][3] || 0, z = !0 === x[r][4] ? 1 : i, o = this._beziers[x[r][0]], d = this._beziers[x[r][1]], o && d && (o = o[s], d = d[s], m = o.a + (o.b - o.a) * a, m += ((R = o.b + (o.c - o.b) * a) - m) * a, R += (o.c + (o.d - o.c) * a - R) * a, v = d.a + (d.b - d.a) * a, v += ((y = d.b + (d.c - d.b) * a) - v) * a, y += (d.c + (d.d - d.c) * a - y) * a, h = b ? Math.atan2(y - v, R - m) * z + w : this._initialRotations[r], this._mod[n] && (h = this._mod[n](h, p)), g[n] ? p[n](h) : p[n] = h)
                    }
                }
            }),
            d = b.prototype;
        exports.default = exports.BezierPlugin = b, b.bezierThrough = f, b.cubicToQuadratic = _, b._autoCSS = !0, b.quadraticToCubic = function (t, i, s) {
            return new a(t, (2 * i + t) / 3, (2 * i + s) / 3, s)
        }, b._cssRegister = function () {
            var t = o.CSSPlugin;
            if (t) {
                var i = t._internals,
                    s = i._parseToProxy,
                    e = i._setPluginRatio,
                    r = i.CSSPropTween;
                i._registerComplexSpecialProp("bezier", {
                    parser: function (t, i, n, o, a, h) {
                        i instanceof Array && (i = {
                            values: i
                        }), h = new b;
                        var _, l, u, f = i.values,
                            c = f.length - 1,
                            g = [],
                            p = {};
                        if (c < 0) return a;
                        for (_ = 0; _ <= c; _++) u = s(t, f[_], o, a, h, c !== _), g[_] = u.end;
                        for (l in i) p[l] = i[l];
                        return p.values = g, (a = new r(t, "bezier", 0, 0, u.pt, 2)).data = u, a.plugin = h, a.setRatio = e, 0 === p.autoRotate && (p.autoRotate = !0), !p.autoRotate || p.autoRotate instanceof Array || (_ = !0 === p.autoRotate ? 0 : Number(p.autoRotate), p.autoRotate = null != u.end.left ? [["left", "top", "rotation", _, !1]] : null != u.end.x && [["x", "y", "rotation", _, !1]]), p.autoRotate && (o._transform || o._enableTransforms(!1), u.autoRotate = o._target._gsTransform, u.proxy.rotation = u.autoRotate.rotation || 0, o._overwriteProps.push("rotation")), h._onInitTween(u.proxy, p, o._tween), a
                    }
                })
            }
        }, d._mod = function (t) {
            for (var i, s = this._overwriteProps, e = s.length; --e > -1;)(i = t[s[e]]) && "function" == typeof i && (this._mod[s[e]] = i)
        }, d._kill = function (t) {
            var i, s, e = this._props;
            for (i in this._beziers)
                if (i in t)
                    for (delete this._beziers[i], delete this._func[i], s = e.length; --s > -1;) e[s] === i && e.splice(s, 1);
            if (e = this._autoRotate)
                for (s = e.length; --s > -1;) t[e[s][2]] && e.splice(s, 1);
            return this._super._kill.call(this, t)
        };
}, {
        "./TweenLite.js": "sU2v"
    }],
    "K9um": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), Object.defineProperty(exports, "Linear", {
            enumerable: !0,
            get: function () {
                return t.Linear
            }
        }), Object.defineProperty(exports, "Power0", {
            enumerable: !0,
            get: function () {
                return t.Power0
            }
        }), Object.defineProperty(exports, "Power1", {
            enumerable: !0,
            get: function () {
                return t.Power1
            }
        }), Object.defineProperty(exports, "Power2", {
            enumerable: !0,
            get: function () {
                return t.Power2
            }
        }), Object.defineProperty(exports, "Power3", {
            enumerable: !0,
            get: function () {
                return t.Power3
            }
        }), Object.defineProperty(exports, "Power4", {
            enumerable: !0,
            get: function () {
                return t.Power4
            }
        }), exports.ExpoScaleEase = exports.Sine = exports.Expo = exports.Circ = exports.SteppedEase = exports.SlowMo = exports.RoughEase = exports.Bounce = exports.Elastic = exports.Back = void 0;
        var t = require("./TweenLite.js");
        t._gsScope._gsDefine("easing.Back", ["easing.Ease"], function () {
            var e, n, o, r, s = t._gsScope.GreenSockGlobals || t._gsScope,
                i = s.com.greensock,
                a = 2 * Math.PI,
                p = Math.PI / 2,
                u = i._class,
                c = function (e, n) {
                    var o = u("easing." + e, function () {}, !0),
                        r = o.prototype = new t.Ease;
                    return r.constructor = o, r.getRatio = n, o
                },
                h = t.Ease.register || function () {},
                f = function (t, e, n, o, r) {
                    var s = u("easing." + t, {
                        easeOut: new e,
                        easeIn: new n,
                        easeInOut: new o
                    }, !0);
                    return h(s, t), s
                },
                _ = function (t, e, n) {
                    this.t = t, this.v = e, n && (this.next = n, n.prev = this, this.c = n.v - e, this.gap = n.t - t)
                },
                l = function (e, n) {
                    var o = u("easing." + e, function (t) {
                            this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                        }, !0),
                        r = o.prototype = new t.Ease;
                    return r.constructor = o, r.getRatio = n, r.config = function (t) {
                        return new o(t)
                    }, o
                },
                g = f("Back", l("BackOut", function (t) {
                    return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                }), l("BackIn", function (t) {
                    return t * t * ((this._p1 + 1) * t - this._p1)
                }), l("BackInOut", function (t) {
                    return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                })),
                E = u("easing.SlowMo", function (t, e, n) {
                    e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = !0 === n
                }, !0),
                x = E.prototype = new t.Ease;
            return x.constructor = E, x.getRatio = function (t) {
                var e = t + (.5 - t) * this._p;
                return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 === t ? 0 : 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
            }, E.ease = new E(.7, .7), x.config = E.config = function (t, e, n) {
                return new E(t, e, n)
            }, (x = (e = u("easing.SteppedEase", function (t, e) {
                t = t || 1, this._p1 = 1 / t, this._p2 = t + (e ? 0 : 1), this._p3 = e ? 1 : 0
            }, !0)).prototype = new t.Ease).constructor = e, x.getRatio = function (t) {
                return t < 0 ? t = 0 : t >= 1 && (t = .999999999), ((this._p2 * t | 0) + this._p3) * this._p1
            }, x.config = e.config = function (t, n) {
                return new e(t, n)
            }, (x = (n = u("easing.ExpoScaleEase", function (t, e, n) {
                this._p1 = Math.log(e / t), this._p2 = e - t, this._p3 = t, this._ease = n
            }, !0)).prototype = new t.Ease).constructor = n, x.getRatio = function (t) {
                return this._ease && (t = this._ease.getRatio(t)), (this._p3 * Math.exp(this._p1 * t) - this._p3) / this._p2
            }, x.config = n.config = function (t, e, o) {
                return new n(t, e, o)
            }, (x = (o = u("easing.RoughEase", function (e) {
                for (var n, o, r, s, i, a, p = (e = e || {}).taper || "none", u = [], c = 0, h = 0 | (e.points || 20), f = h, l = !1 !== e.randomize, g = !0 === e.clamp, E = e.template instanceof t.Ease ? e.template : null, x = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) n = l ? Math.random() : 1 / h * f, o = E ? E.getRatio(n) : n, r = "none" === p ? x : "out" === p ? (s = 1 - n) * s * x : "in" === p ? n * n * x : n < .5 ? (s = 2 * n) * s * .5 * x : (s = 2 * (1 - n)) * s * .5 * x, l ? o += Math.random() * r - .5 * r : f % 2 ? o += .5 * r : o -= .5 * r, g && (o > 1 ? o = 1 : o < 0 && (o = 0)), u[c++] = {
                    x: n,
                    y: o
                };
                for (u.sort(function (t, e) {
                        return t.x - e.x
                    }), a = new _(1, 1, null), f = h; --f > -1;) i = u[f], a = new _(i.x, i.y, a);
                this._prev = new _(0, 0, 0 !== a.t ? a : a.next)
            }, !0)).prototype = new t.Ease).constructor = o, x.getRatio = function (t) {
                var e = this._prev;
                if (t > e.t) {
                    for (; e.next && t >= e.t;) e = e.next;
                    e = e.prev
                } else
                    for (; e.prev && t <= e.t;) e = e.prev;
                return this._prev = e, e.v + (t - e.t) / e.gap * e.c
            }, x.config = function (t) {
                return new o(t)
            }, o.ease = new o, f("Bounce", c("BounceOut", function (t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }), c("BounceIn", function (t) {
                return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : t < 2 / 2.75 ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
            }), c("BounceInOut", function (t) {
                var e = t < .5;
                return (t = e ? 1 - 2 * t : 2 * t - 1) < 1 / 2.75 ? t *= 7.5625 * t : t = t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
            })), f("Circ", c("CircOut", function (t) {
                return Math.sqrt(1 - (t -= 1) * t)
            }), c("CircIn", function (t) {
                return -(Math.sqrt(1 - t * t) - 1)
            }), c("CircInOut", function (t) {
                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            })), f("Elastic", (r = function (e, n, o) {
                var r = u("easing." + e, function (t, e) {
                        this._p1 = t >= 1 ? t : 1, this._p2 = (e || o) / (t < 1 ? t : 1), this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0), this._p2 = a / this._p2
                    }, !0),
                    s = r.prototype = new t.Ease;
                return s.constructor = r, s.getRatio = n, s.config = function (t, e) {
                    return new r(t, e)
                }, r
            })("ElasticOut", function (t) {
                return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
            }, .3), r("ElasticIn", function (t) {
                return -this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)
            }, .3), r("ElasticInOut", function (t) {
                return (t *= 2) < 1 ? this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * -.5 : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
            }, .45)), f("Expo", c("ExpoOut", function (t) {
                return 1 - Math.pow(2, -10 * t)
            }), c("ExpoIn", function (t) {
                return Math.pow(2, 10 * (t - 1)) - .001
            }), c("ExpoInOut", function (t) {
                return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
            })), f("Sine", c("SineOut", function (t) {
                return Math.sin(t * p)
            }), c("SineIn", function (t) {
                return 1 - Math.cos(t * p)
            }), c("SineInOut", function (t) {
                return -.5 * (Math.cos(Math.PI * t) - 1)
            })), u("easing.EaseLookup", {
                find: function (e) {
                    return t.Ease.map[e]
                }
            }, !0), h(s.SlowMo, "SlowMo", "ease,"), h(o, "RoughEase", "ease,"), h(e, "SteppedEase", "ease,"), g
        }, !0);
        var e = t.globals.Back;
        exports.Back = e;
        var n = t.globals.Elastic;
        exports.Elastic = n;
        var o = t.globals.Bounce;
        exports.Bounce = o;
        var r = t.globals.RoughEase;
        exports.RoughEase = r;
        var s = t.globals.SlowMo;
        exports.SlowMo = s;
        var i = t.globals.SteppedEase;
        exports.SteppedEase = i;
        var a = t.globals.Circ;
        exports.Circ = a;
        var p = t.globals.Expo;
        exports.Expo = p;
        var u = t.globals.Sine;
        exports.Sine = u;
        var c = t.globals.ExpoScaleEase;
        exports.ExpoScaleEase = c;
}, {
        "./TweenLite.js": "sU2v"
    }],
    "LScF": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), Object.defineProperty(exports, "TweenLite", {
            enumerable: !0,
            get: function () {
                return e.default
            }
        }), Object.defineProperty(exports, "TweenPlugin", {
            enumerable: !0,
            get: function () {
                return e.TweenPlugin
            }
        }), Object.defineProperty(exports, "Ease", {
            enumerable: !0,
            get: function () {
                return e.Ease
            }
        }), Object.defineProperty(exports, "Power0", {
            enumerable: !0,
            get: function () {
                return e.Power0
            }
        }), Object.defineProperty(exports, "Power1", {
            enumerable: !0,
            get: function () {
                return e.Power1
            }
        }), Object.defineProperty(exports, "Power2", {
            enumerable: !0,
            get: function () {
                return e.Power2
            }
        }), Object.defineProperty(exports, "Power3", {
            enumerable: !0,
            get: function () {
                return e.Power3
            }
        }), Object.defineProperty(exports, "Power4", {
            enumerable: !0,
            get: function () {
                return e.Power4
            }
        }), Object.defineProperty(exports, "Linear", {
            enumerable: !0,
            get: function () {
                return e.Linear
            }
        }), Object.defineProperty(exports, "CSSPlugin", {
            enumerable: !0,
            get: function () {
                return r.default
            }
        }), Object.defineProperty(exports, "AttrPlugin", {
            enumerable: !0,
            get: function () {
                return n.default
            }
        }), Object.defineProperty(exports, "RoundPropsPlugin", {
            enumerable: !0,
            get: function () {
                return u.default
            }
        }), Object.defineProperty(exports, "DirectionalRotationPlugin", {
            enumerable: !0,
            get: function () {
                return o.default
            }
        }), Object.defineProperty(exports, "TimelineLite", {
            enumerable: !0,
            get: function () {
                return i.default
            }
        }), Object.defineProperty(exports, "TimelineMax", {
            enumerable: !0,
            get: function () {
                return a.default
            }
        }), Object.defineProperty(exports, "BezierPlugin", {
            enumerable: !0,
            get: function () {
                return f.default
            }
        }), Object.defineProperty(exports, "Back", {
            enumerable: !0,
            get: function () {
                return c.Back
            }
        }), Object.defineProperty(exports, "Elastic", {
            enumerable: !0,
            get: function () {
                return c.Elastic
            }
        }), Object.defineProperty(exports, "Bounce", {
            enumerable: !0,
            get: function () {
                return c.Bounce
            }
        }), Object.defineProperty(exports, "RoughEase", {
            enumerable: !0,
            get: function () {
                return c.RoughEase
            }
        }), Object.defineProperty(exports, "SlowMo", {
            enumerable: !0,
            get: function () {
                return c.SlowMo
            }
        }), Object.defineProperty(exports, "SteppedEase", {
            enumerable: !0,
            get: function () {
                return c.SteppedEase
            }
        }), Object.defineProperty(exports, "Circ", {
            enumerable: !0,
            get: function () {
                return c.Circ
            }
        }), Object.defineProperty(exports, "Expo", {
            enumerable: !0,
            get: function () {
                return c.Expo
            }
        }), Object.defineProperty(exports, "Sine", {
            enumerable: !0,
            get: function () {
                return c.Sine
            }
        }), Object.defineProperty(exports, "ExpoScaleEase", {
            enumerable: !0,
            get: function () {
                return c.ExpoScaleEase
            }
        }), exports.default = exports.TweenMax = void 0;
        var e = s(require("./TweenLite.js")),
            t = l(require("./TweenMaxBase.js")),
            r = l(require("./CSSPlugin.js")),
            n = l(require("./AttrPlugin.js")),
            u = l(require("./RoundPropsPlugin.js")),
            o = l(require("./DirectionalRotationPlugin.js")),
            i = l(require("./TimelineLite.js")),
            a = l(require("./TimelineMax.js")),
            f = l(require("./BezierPlugin.js")),
            c = require("./EasePack.js");

        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function p() {
            if ("function" != typeof WeakMap) return null;
            var e = new WeakMap;
            return p = function () {
                return e
            }, e
        }

        function s(e) {
            if (e && e.__esModule) return e;
            if (null === e || "object" != typeof e && "function" != typeof e) return {
                default: e
            };
            var t = p();
            if (t && t.has(e)) return t.get(e);
            var r = {},
                n = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var u in e)
                if (Object.prototype.hasOwnProperty.call(e, u)) {
                    var o = n ? Object.getOwnPropertyDescriptor(e, u) : null;
                    o && (o.get || o.set) ? Object.defineProperty(r, u, o) : r[u] = e[u]
                } return r.default = e, t && t.set(e, r), r
        }
        var d = t.default;
        exports.default = exports.TweenMax = d, d._autoActivated = [i.default, a.default, r.default, n.default, f.default, u.default, o.default, c.Back, c.Elastic, c.Bounce, c.RoughEase, c.SlowMo, c.SteppedEase, c.Circ, c.Expo, c.Sine, c.ExpoScaleEase];
}, {
        "./TweenLite.js": "sU2v",
        "./TweenMaxBase.js": "tBUL",
        "./CSSPlugin.js": "KE4Q",
        "./AttrPlugin.js": "Lwey",
        "./RoundPropsPlugin.js": "gZZs",
        "./DirectionalRotationPlugin.js": "BYZS",
        "./TimelineLite.js": "Rh1e",
        "./TimelineMax.js": "c5lM",
        "./BezierPlugin.js": "JjQl",
        "./EasePack.js": "K9um"
    }],
    "kqx8": [function (require, module, exports) {

        module.exports = n;
        var o = [],
            t = 0,
            e = function () {
                var e = -1,
                    n = o.length,
                    u = o;
                for (o = [], t = 0; ++e < n;) u[e]()
            };

        function n(n) {
            o.push(n), 0 === t && (t = setTimeout(e, 0))
        }
}, {}],
    "SSHP": [function (require, module, exports) {
        var e = require("callasync");

        function t(t, n) {
            n || (n = {}), "[object Function]" === {}.toString.call(n) && (n = {
                complete: n
            });
            var r, o = document,
                l = o.styleSheets,
                f = "[object Array]" === {}.toString.call(t) ? t : [t],
                i = n.media ? n.media : "all",
                a = n.complete || function () {},
                c = [];
            if (n.before) r = n.before;
            else {
                var u = (o.body || o.getElementsByTagName("head")[0]).childNodes;
                r = u[u.length - 1]
            }

            function h() {
                for (var t = 0, n = -1, r = c.length; ++n < r;)
                    if (d(c[n].href) && ++t === r) return a(c);
                e(h)
            }

            function d(e) {
                for (var t = -1, n = l.length; ++t < n;)
                    if (null !== l[t].href && 0 !== l[t].href.length && l[t].href === e) return !0
            }
            return function t(n) {
                if (o.body) return n();
                e(function () {
                    t(n)
                })
            }(function () {
                for (var t = -1, l = f.length, a = n.before ? r : r.nextSibling; ++t < l;) c[t] = o.createElement("link"), c[t].rel = "stylesheet", c[t].href = f[t], c[t].media = i, r.parentNode.insertBefore(c[t], a);
                e(h)
            }), c
        }
        module.exports = t;
}, {
        "callasync": "kqx8"
    }],
    "Q7Ly": [function (require, module, exports) {
        "use strict";

        function t(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function e(t, e) {
            for (var n = 0; n < e.length; n++) {
                var a = e[n];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a)
            }
        }

        function n(t, n, a) {
            return n && e(t.prototype, n), a && e(t, a), t
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var a = function () {
                function e() {
                    t(this, e), this.enabled = !1;
                    var n = document.querySelector('script[src*="gtag"]');
                    this.gaPropertyId = !(!n || !n.hasAttribute("src")) && n.src.split("?id=")[1]
                }
                return n(e, [{
                    key: "hasGtag",
                    value: function () {
                        return this.enabled = void 0 !== window.gtag, this.enabled
                    }
                }, {
                    key: "event",
                    value: function (t, e, n, a) {
                        return !!this.hasGtag() && (this.gaPropertyId ? (window.gtag("event", this.gaPropertyId, {
                            event_category: t,
                            event_action: e,
                            event_label: n,
                            value: a
                        }), !0) : (this.log("Missing dataLayer. Is gtag loaded?"), !1))
                    }
                }, {
                    key: "pageview",
                    value: function () {
                        return !!this.hasGtag() && (this.gaPropertyId ? (window.gtag("config", this.gaPropertyId, {
                            page_title: document.title,
                            page_path: "".concat(window.location.pathname).concat(window.location.search)
                        }), !0) : (this.log("Missing dataLayer. Is gtag loaded?"), !1))
                    }
                }, {
                    key: "registerAllExternalLinks",
                    value: function () {
                        if ("undefined" != typeof window && this.hasGtag())
                            for (var t = document.querySelectorAll('a[href^="http"]:not([hastracking])'), e = 0; e < t.length; e += 1) "" !== t[e].href && (t[e].setAttribute("hastracking", "true"), t[e].onclick = function (t, e) {
                                return function () {
                                    t.event("Ext. link", e)
                                }
                            }(this, t[e].href))
                    }
                }, {
                    key: "log",
                    value: function (t) {
                        this.debug
                    }
                }]), e
            }(),
            i = new a;
        exports.default = i;
}, {}],
    "szrR": [function (require, module, exports) {

}, {}],
    "epB2": [function (require, module, exports) {
        "use strict";
        var e = require("conversational-form"),
            t = require("gsap/TweenMax"),
            n = a(require("loadcss")),
            o = a(require("./tracking"));

        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        require("reset-css"), require("./scss/main.scss");
        var r = .8,
            i = ["conversational-form-dark.min.css", "conversational-form.min.css", "conversational-form-purple.min.css", "conversational-form-irisblue.min.css", "conversational-form-red.min.css", "conversational-form-green.min.css"],
            s = i[0];

        function c() {
            [].slice.call(document.querySelectorAll("form *[cf-image]")).map(function (e) {
                return (new Image).src = e.getAttribute("cf-image")
            })
        }

        function l(e) {
            s !== e && [].slice.call(document.styleSheets).map(function (t, n) {
                var o = t.href.substring(t.href.lastIndexOf("/") + 1);
                return !1 === document.styleSheets[n].disabled && o.indexOf("conversational-form") > -1 ? document.styleSheets[n].disabled = !0 : o.indexOf(e) > -1 && (document.styleSheets[n].disabled = !1, s = e), t
            })
        }

        function u() {
            var e = i.length;
            (0, n.default)(i.map(function (e) {
                return "./".concat(e)
            }), function () {
                [].slice.call(document.styleSheets).map(function (t, n) {
                    var o = t.href.substring(t.href.lastIndexOf("/") + 1);
                    return o.indexOf("conversational-form") > -1 && -1 === o.indexOf(i[0]) && -1 === o.indexOf("main.") && (document.styleSheets[n].disabled = !0), e === n && l(i[0]), t
                })
            })
        }

        function m() {
            var e = document.querySelector("header"),
                n = document.querySelector("h1"),
                o = document.querySelector(".cf"),
                a = document.querySelector(".about");
            window.innerHeight < 780 && t.TweenLite.set(n, {
                css: {
                    scale: .68,
                    "margin-top": 60,
                    "margin-bottom": 60
                }
            }), t.TweenLite.set(e, {
                y: 10
            }), t.TweenLite.to(e, r / 2, {
                opacity: 1,
                y: 0
            }), t.TweenLite.set(n, {
                y: 20
            }), t.TweenLite.to(n, r, {
                opacity: 1,
                y: 0,
                delay: r / 2
            }), t.TweenLite.set(o, {
                y: 40
            }), t.TweenLite.to(o, 1.2 * r, {
                opacity: 1,
                y: 0,
                delay: r
            }), setTimeout(function () {
                window.ConversationalForm.start()
            }, .6 * r * 1e3), t.TweenLite.to(a, 3 * r, {
                opacity: 1,
                delay: 2 * r
            })
        }

        function d() {
            u(), c(), o.default.registerAllExternalLinks();
            var n = document.querySelector(".wrapper"),
                a = document.querySelector(".form"),
                i = document.querySelector(".cf"),
                s = new e.EventDispatcher;
            s.addEventListener(e.FlowEvents.FLOW_UPDATE, function (e) {
                "ending" === e.detail.tag.name && (window.ConversationalForm.flowManager.stop(), document.querySelector("#conversational-form").style["pointer-events"] = "none")
            }, !1);
            var d = new e.ConversationalForm({
                formEl: a,
                context: i,
                loadExternalStyleSheet: !1,
                preventAutoFocus: !0,
                preventAutoStart: !0,
                eventDispatcher: s,
                submitCallback: function () {
                    var e = d.getFormData(!0);
                    e.getstarted && -1 === e.getstarted.indexOf("no") && d.addRobotChatResponse("Ok. Thank you for trying out Conversational Form.")
                },
                flowStepCallback: function (e, t) {
                    o.default.event("conversational form example", e.tag.name, e.tag.value), "theme" === e.tag.name && l(e.tag.value[0]), setTimeout(function () {
                        ("changeThemeAgain" !== e.tag.name || "changeThemeAgain" === e.tag.name && "yes" !== e.tag.value[0]) && t(), "changeThemeAgain" === e.tag.name && "yes" === e.tag.value[0] && window.ConversationalForm.remapTagsAndStartFrom(3)
                    }, 0)
                }
            });
            t.TweenLite.to(n, 1, {
                opacity: 1,
                delay: r / 2,
                onComplete: m
            })
        }
        document.addEventListener("DOMContentLoaded", d);
}, {
        "conversational-form": "Jy7r",
        "gsap/TweenMax": "LScF",
        "loadcss": "SSHP",
        "./tracking": "Q7Ly",
        "reset-css": "szrR",
        "./scss/main.scss": "szrR"
    }]
}, {}, ["epB2"], null)
//# sourceMappingURL=/conversational-form/landingpage/main.4e6b827c.js.map
