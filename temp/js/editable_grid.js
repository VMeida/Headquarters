/*! editable-grid - v2.0.05 - 2016-04-19 */ ! function(a) {
    if ("object" == typeof exports) module.exports = a();
    else if ("function" == typeof define && define.amd) define(a);
    else {
        var b;
        "undefined" != typeof window ? b = window : "undefined" != typeof global ? b = global : "undefined" != typeof self && (b = self), b.EditableGrid = a()
    }
}(function() {
    var a;
    return function b(a, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!a[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    throw new Error("Cannot find module '" + g + "'")
                }
                var j = c[g] = {
                    exports: {}
                };
                a[g][0].call(j.exports, function(b) {
                    var c = a[g][1][b];
                    return e(c ? c : b)
                }, j, j.exports, b, a, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [
            function(a, b, c) {
                var d = a("underscore"),
                    e = 15,
                    f = function k(a, b) {
                        if (null == b) return a;
                        var c = b.split("."),
                            d = a[c[0]];
                        return 1 === c.length ? d : (c.shift(), k(d, c.join(".")))
                    }, g = function(a, b) {
                        if (null == b) return "";
                        var c = f(b, a.id);
                        return null == c ? "" : a.formatter(a.id, c)
                    }, h = d.template('<div class="input-group"><input type="text" class="form-control" placeholder="yyyy-mm-dd" value="<%=date%>"><span class="input-group-addon" data-toggle="date-selector"><span class="glyphicon glyphicon-calendar"></span></span></div>'),
                    i = function(a, b) {
                        return "date" === a ? h({
                            date: null == b ? "" : b
                        }) : "checkbox" === a ? b ? '<input type="checkbox" checked="checked"/>' : '<input type="checkbox"/>' : null == b ? '<input type="text" class="form-control"/>' : '<input type="text" class="form-control" value="' + b + '"/>'
                    }, j = function(a) {
                        var b = "",
                            c = 0,
                            e = d.keys(a).length;
                        return d.each(a, function(a, d) {
                            b += d + ":" + a, e - 1 > c && (b += ";"), c++
                        }), b
                    };
                b.exports = {
                    createInput: function(a, b) {
                        switch (a.type) {
                            case "date":
                                return this.createDateInput(a, b);
                            case "cost":
                                return this.createCostInput(a, b);
                            case "percent":
                                return this.createPercentInput(a, b);
                            case "select":
                                return this.createSelect(a, b);
                            case "checkbox":
                                return this.createCheckboxInput(a, b)
                        }
                        return this.createStringInput(a, b)
                    },
                    createOpeningCellTag: function(a) {
                        var b = a.column,
                            c = a.treeColumn,
                            f = a.level,
                            g = a.getCellClassesFn,
                            h = a.obj,
                            i = [];
                        switch (d.isFunction(g) && d.each(g(b.id, h), function(a) {
                            i.push(a)
                        }), d.each(b.classes, function(a) {
                            i.push(a)
                        }), b.alignment) {
                            case "right":
                                i.push("alignment-right");
                                break;
                            case "center":
                                i.push("alignment-center")
                        }
                        var k = {
                            width: b.width
                        };
                        return c && (k["padding-left"] = f * e + "px", i.push("tree-column")), '<td class="' + i.join(" ") + '" data-col-id="' + b.id + '" style="' + j(k) + '">'
                    },
                    createSelect: function(a, b) {
                        var c = this.createOpeningCellTag({
                            column: a
                        });
                        return c += '<select class="form-control">', d.each(a.list, function(d) {
                            c += b === d ? '<option value="' + d + '" selected="selected">' + a.formatter(a.id, d) + "</option>" : '<option value="' + d + '">' + a.formatter(a.id, d) + "</option>"
                        }), c += "</select>", c += "</td>"
                    },
                    createStringInput: function(a, b) {
                        var c = this.createOpeningCellTag({
                            column: a
                        });
                        return c += i(a.type, b), c += "</td>"
                    },
                    createCheckboxInput: function(a, b) {
                        var c = this.createOpeningCellTag({
                            column: a
                        });
                        return c += i(a.type, b), c += "</td>"
                    },
                    createDateInput: function(a, b) {
                        var c = this.createOpeningCellTag({
                            column: a
                        });
                        return c += i(a.type, b), c += "</td>"
                    },
                    createCostInput: function(a, b) {
                        var c = this.createOpeningCellTag({
                            column: a
                        });
                        return c += '<div class="input-group">', c += '<span class="input-group-addon">$</span>', c += i(a.type, b), c += "</div>", c += "</td>"
                    },
                    createPercentInput: function(a, b) {
                        var c = this.createOpeningCellTag({
                            column: a
                        });
                        return c += '<div class="input-group">', c += i(a.type, b), c += '<span class="input-group-addon">%</span>', c += "</div>", c += "</td>"
                    },
                    createTotalCell: function(a, b) {
                        var c = this.createOpeningCellTag({
                            column: a
                        });
                        if ("cost" === a.type) {
                            var e = d.pluck(b, a.id),
                                f = 0;
                            d.each(e, function(a) {
                                var b = parseFloat(a);
                                d.isNaN(b) || (f += b)
                            }), c += "=" + a.formatter(a.id, f)
                        }
                        return c += "</td>"
                    },
                    createTableData: function(a) {
                        var b = a.column,
                            c = a.treeColumn,
                            d = a.level,
                            e = a.treeState,
                            f = g(b, a.obj),
                            h = a.obj[a.id],
                            i = a.launchLinksNewTab,
                            j = a.getCellClassesFn,
                            k = this.createOpeningCellTag({
                                column: b,
                                treeColumn: c,
                                level: d,
                                obj: a.obj,
                                getCellClassesFn: j
                            });
                        if ("checkbox" === b.type || a.stateManager.isEditable(h, b.id)) return this.createInput(b, f);
                        if (c) {
                            var l = "empty" === a.obj.children ? "none" : "expand";
                            e && e[h] && "none" !== l && (l = "expand" === e[h] ? "collapse" : "expand"), k += '<div class="tree-node tree-node-' + l + '"/>'
                        }
                        var m = !1;
                        if (null != b.link) {
                            var n = a.obj[b.link];
                            n ? (m = !0, k += b.link === a.rows.link ? '<a class="glyphicon glyphicon-arrow-right" href="' + n + '"></a>' : i ? '<a href="' + n + '" target="_blank">' + f + "</a>" : '<a href="' + n + '">' + f + "</a>") : m = !1
                        }
                        return m || (k += "<div>" + f + "</div>"), k += "</td>"
                    },
                    createTableHeader: function(a) {
                        var b = a.column,
                            c = a.sorted,
                            d = [],
                            e = ["pull-right"];
                        switch (b.sortable && d.push("sortable"), "asc" === c ? e.push("sorted-ascending") : "desc" === c && e.push("sorted-descending"), b.titleAlignment) {
                            case "right":
                                d.push("alignment-right");
                                break;
                            case "center":
                                d.push("alignment-center")
                        }
                        var f = '<th data-col-id="' + b.id + '" class="' + d.join(" ") + '" style="width:' + b.width + '">';
                        return f += '<div class="' + e.join(" ") + '"></div>', f += b.title, f += "</th>"
                    }
                }
            }, {
                underscore: 13
            }
        ],
        2: [
            function(a, b, c) {
                var d = a("./rowFactory"),
                    e = a("underscore"),
                    f = function(a, b, c, g) {
                        var h = "";
                        return e.each(b, function(b) {
                            h += d.createTableRow(b, a, g, this._treeState), a.treeMode && c && "children" in b && e.isArray(b.children) && b.children.length && "expand" === this._treeState[b[a.id]] && (h += f.call(this, a, b.children, c, g + 1))
                        }, this), h
                    };
                b.exports = f
            }, {
                "./rowFactory": 6,
                underscore: 13
            }
        ],
        3: [
            function(a, b, c) {
                var d = a("jquery"),
                    e = a("underscore"),
                    f = a("./rowFactory"),
                    g = a("./gridUtils"),
                    h = a("./gridListeners"),
                    i = a("./depthFirstTreeTraversal"),
                    j = a("elephant-ears"),
                    k = function(a) {
                        var b = this;
                        b.ears = new j, b.ears.on("editable-delete-mode", function(a) {
                            a ? b._createDeleteRows() : b._removeDeleteRows()
                        }), a = e.defaults(a, {
                            sortConfig: [],
                            id: "id",
                            borders: !0,
                            rows: {
                                link: !1,
                                newRow: !1,
                                totalRow: !1
                            },
                            stateManager: {
                                isEditable: function() {
                                    return !1
                                }
                            },
                            addListeners: function() {},
                            treeMode: !1,
                            childData: function() {
                                return d.Deferred().resolve([])
                            },
                            launchLinksNewTab: !1
                        }), a.columns = e.map(a.columns, function(a) {
                            var b = function(a, b) {
                                return b
                            }, c = function(a, b) {
                                    return b
                                }, d = function() {
                                    return ""
                                };
                            return e.defaults(a, {
                                formatter: b,
                                parser: c,
                                validate: d,
                                sortable: !1,
                                sortCompare: null,
                                sortType: null,
                                nullable: !1,
                                type: "text",
                                link: null,
                                alignment: "left",
                                titleAlignment: "left",
                                classes: [],
                                preCreateCallback: function() {}
                            })
                        }), b.dataOrder = e.clone(a.data);
                        var c = function(a) {
                            return '<div class="editable-header-table"><table class="table table-bordered"><thead>' + f.createTableHeaderRow({
                                columns: a,
                                isColumnSorted: b._isColumnSorted
                            }) + "</thead></table></div>"
                        }, k = function() {
                                var c = "_treeState" in b && e.keys(b._treeState),
                                    d = i.call(b, a, a.data, c, 0),
                                    f = "table table-bordered";
                                return a.rows.link && (f += " table-hover"), '<div class="editable-body-table"><table class="' + f + '"><tbody>' + d + "</tbody></table></div>"
                            }, l = function(a) {
                                var b = '<div class="editable-footer-table">';
                                return b += '<table class="table table-bordered"><tfoot>', a.rows.totalRow && (b += f.createTableFooterTotalRow({
                                    columns: a.columns,
                                    data: a.data
                                })), a.rows.newRow && (b += f.createTableFooterAddRow({
                                    columns: a.columns
                                })), b += "</tfoot></table>", a.rows.newRow && (b += "<div>", b += '<button type="button" class="new-row pull-right btn btn-link">Add</button>', b += "</div>"), b += "</div>"
                            };
                        e.extend(b, g.call(b, a)), e.extend(b, {
                            trigger: function(a, c) {
                                b.ears.trigger(a, c)
                            },
                            on: function(a, c) {
                                b.ears.on(a, c)
                            },
                            off: function(a) {
                                b.ears.off(a)
                            },
                            destroy: function() {
                                a.el.empty()
                            },
                            get options() {
                                return a
                            },
                            clearAllValidation: function() {
                                this.bodyTableContainer.find(".validation-error").remove(), this.bodyTableContainer.find(".has-error").removeClass("has-error")
                            },
                            addValidation: function(a, b, c) {
                                var d = this.bodyTableContainer.find('tr[data-row-id="' + a + '"] td[data-col-id="' + b + '"]');
                                d.addClass("has-error"), d.append('<span class="validation-error help-block small">' + c + "</div>")
                            },
                            render: function() {
                                b.ears.trigger("editable-pre-render"), this.destroy();
                                var d = a.el.height(),
                                    e = c(a.columns);
                                e += k(), e += l(a), a.el.append(e), this.headerTableContainer = a.el.find(".editable-header-table"), this.headerTable = this.headerTableContainer.find("table"), this.bodyTableContainer = a.el.find(".editable-body-table"), this.bodyTable = this.bodyTableContainer.find("table"), this.footerTableContainer = a.el.find(".editable-footer-table"), this.footerTable = this.footerTableContainer.find("table"), a.borders === !1 && (this.headerTable.addClass("no-borders"), this.bodyTable.addClass("no-borders"), this.footerTable.addClass("no-borders")), d > 0 && (this.bodyTableContainer.height(a.el.height() - this.headerTableContainer.height() - this.footerTableContainer.height()), this.headerTable.width(this.bodyTable.width() + 1)), a.data.length > 0 ? this.bodyTableContainer.get(0).scrollHeight > this.bodyTableContainer.get(0).clientHeight : this.bodyTableContainer.height(0), h.call(b, this.headerTableContainer, this.bodyTableContainer, this.footerTableContainer, a), a.addListeners(a.el), b.ears.trigger("editable-post-render")
                            }
                        })
                    };
                b.exports = k
            }, {
                "./depthFirstTreeTraversal": 2,
                "./gridListeners": 4,
                "./gridUtils": 5,
                "./rowFactory": 6,
                "elephant-ears": 7,
                jquery: 9,
                underscore: 13
            }
        ],
        4: [
            function(a, b, c) {
                var d = a("jquery");
                b.exports = function(a, b, c, e) {
                    function f(a) {
                        g._validateRow(a) && g._newRowClicked()
                    }
                    var g = this;
                    a.find("thead").on("mousedown", function(a) {
                        a.preventDefault(), a.stopPropagation();
                        var b = d(a.target);
                        b.is("th") && g._columnClicked(b.attr("data-col-id"))
                    }), c.find("button.new-row").on("mousedown", function(a) {
                        var b = c.find("tr");
                        1 === a.which && f(b)
                    }), c.find("button.new-row").on("keydown", function(a) {
                        var b = c.find("tr");
                        13 === a.keyCode && f(b)
                    }), c.find("td input, td select").on("change", function(a) {
                        var b = d(a.target),
                            c = b.closest("td");
                        g._newRowChanged(c.attr("data-col-id"))
                    }), c.find("td input").on("blur", function(a) {
                        var b = d(a.target),
                            c = b.closest("td"),
                            e = b.closest("tr");
                        g._validate(e.attr("data-row-id"), c.attr("data-col-id"), b)
                    }), b.find("td input, td select").on("change", function(a) {
                        var b = d(a.target),
                            c = b.closest("td"),
                            e = b.closest("tr"),
                            f = b.val();
                        b.is("input") && "checkbox" === b.attr("type") && (f = b.prop("checked")), g._valueChanged(e.attr("data-row-id"), c.attr("data-col-id"), f)
                    }), b.find("td input").on("blur", function(a) {
                        var b = d(a.target),
                            c = b.closest("td"),
                            e = b.closest("tr");
                        g._validate(e.attr("data-row-id"), c.attr("data-col-id"), b)
                    }), b.on("click", "button", function(a) {
                        var b = d(a.target),
                            c = b.closest("td");
                        c.is(".delete-column") && g._deleteRow(b.closest("tr").attr("data-row-id"))
                    });
                    var h = function(a, b) {
                        var c = a.is(".tree-node-expand");
                        c ? g._treeNodeExpand(b.attr("data-row-id")) : g._treeNodeCollapse(b.attr("data-row-id"))
                    };
                    e.rows.link && b.find("td").on("click", function(a) {
                        var b = d(a.target),
                            c = b.closest("td"),
                            e = b.closest("tr");
                        if (!b.is("a") && !b.parent().is(".row-delete")) {
                            var f = e.find(".tree-node:not(.tree-node-none)");
                            f.length ? h(f, e) : g._rowClicked(e.attr("data-row-id"), c.attr("data-col-id"))
                        }
                    }), e.treeMode && b.find(".tree-node:not(.tree-node-none)").on("mousedown", function(a) {
                        if (1 === a.which) {
                            var b = d(a.target),
                                c = b.closest("tr");
                            h(b, c)
                        }
                        a.stopPropagation(), a.preventDefault()
                    })
                }
            }, {
                jquery: 9
            }
        ],
        5: [
            function(a, b, c) {
                var d = a("jquery"),
                    e = a("underscore"),
                    f = a("stand-in-order"),
                    g = {
                        text: "string",
                        cost: "float",
                        percent: "float",
                        select: "string"
                    }, h = function(a, b, c) {
                        var d = a.split(".");
                        if (1 === d.length) return void(b[d[0]] = c);
                        var f = d[0];
                        e.has(b, f) || (b[f] = {}), d.shift(), h(d.join("."), b[f], c)
                    }, i = function(a, b, c) {
                        for (var d = 0; d < b.length; d++) {
                            var f = b[d];
                            if (f[c.id] === a) return f;
                            if ("children" in f && e.isArray(f.children) && f.children.length) {
                                var g = i(a, f.children, c);
                                if (null != g) return g
                            }
                        }
                    };
                b.exports = function(a) {
                    var b = this,
                        c = {
                            _valueChanged: function(c, d, f) {
                                var g = e.findWhere(a.columns, {
                                    id: d
                                }),
                                    i = {};
                                i[a.id] = c;
                                var j = e.findWhere(a.data, i),
                                    k = g.parser(d, f);
                                h(d, j, k), b.ears.trigger("editable-value-updated", {
                                    rowId: c,
                                    colId: d,
                                    value: k
                                }), this._updateInput(c, d, k)
                            },
                            _updateInput: function(b, c, d) {
                                var f = e.findWhere(a.columns, {
                                    id: c
                                }),
                                    g = a.el.find('.editable-body-table tr[data-row-id="' + b + '"] td[data-col-id="' + c + '"] input');
                                g.val(f.formatter(c, d))
                            },
                            _newRowChanged: function(a) {
                                var c = this._getNewRowData();
                                b.ears.trigger("editable-new-row-value-changed", c, a)
                            },
                            _getNewRowData: function() {
                                var b = a.el.find(".editable-footer-table tr.new-row"),
                                    c = {};
                                return e.each(a.columns, function(a) {
                                    var d;
                                    d = "select" === a.type ? b.find('td[data-col-id="' + a.id + '"] select') : b.find('td[data-col-id="' + a.id + '"] input');
                                    var e = null;
                                    e = d.is("input") && "checkbox" === d.attr("type") ? d.prop("checked") : a.parser(a.id, d.val()), c[a.id] = e
                                }, this), c
                            },
                            _newRowClicked: function() {
                                var c = {};
                                c[a.id] = e.uniqueId("-"), e.extend(c, this._getNewRowData()), b.dataOrder.push(c), a.data.push(c), b.ears.trigger("editable-new-row", c), b.render();
                                var d = a.el.find(".editable-footer-table tr.new-row select,input");
                                d.eq(0).focus()
                            },
                            _rowClicked: function(c, d) {
                                var e = {};
                                e[a.id] = c;
                                var f = i(c, a.data, a);
                                b.ears.trigger("editable-row-clicked", {
                                    obj: f,
                                    rowId: c,
                                    colId: d
                                })
                            },
                            _isColumnSorted: function(b) {
                                var c = e.findWhere(a.sortConfig, {
                                    id: b
                                });
                                return null == c ? null : c.asc ? "asc" : "desc"
                            },
                            _columnClicked: function(b) {
                                var d = e.findWhere(a.columns, {
                                    id: b
                                });
                                if (!d.sortable) return null;
                                var f = c._isColumnSorted(b);
                                null == f ? c._sort(b, "asc") : "asc" === f ? c._sort(b, "desc") : "desc" === f && c._sort(b, null)
                            },
                            _getSortType: function(a) {
                                return e.has(g, a) ? g[a] : a
                            },
                            _sort: function(d, g) {
                                b.ears.trigger("editable-before-sort", {
                                    id: d,
                                    order: g
                                });
                                var h = e.findWhere(a.sortConfig, {
                                    id: d
                                });
                                null == g && a.sortConfig.splice(e.indexOf(a.sortConfig, h), 1), null == h ? (a.sortConfig = [], a.sortConfig.push({
                                    id: d,
                                    asc: !0
                                })) : h.asc = "asc" === g;
                                var i = [];
                                e.each(a.sortConfig, function(b) {
                                    var d = e.findWhere(a.columns, {
                                        id: b.id
                                    });
                                    i.push({
                                        name: b.id,
                                        type: c._getSortType(d.sortType || d.type),
                                        ascending: b.asc,
                                        compare: d.sortCompare
                                    })
                                }), i.length ? f(a.data, i) : a.data = e.clone(b.dataOrder), b.render(), b.ears.trigger("editable-after-sort", {
                                    id: d,
                                    order: g
                                })
                            },
                            _validateRow: function(a) {
                                var b = !0,
                                    c = a.find("input"),
                                    f = a.attr("data-row-id");
                                return e.each(c, function(a) {
                                    var c = d(a),
                                        e = c.closest("td").attr("data-col-id");
                                    this._validate(f, e, c) || (b = !1)
                                }, this), b
                            },
                            _validate: function(b, c, d) {
                                if ("checkbox" === d.attr("type")) return !0;
                                var f = e.findWhere(a.columns, {
                                    id: c
                                }),
                                    g = d.closest("td");
                                g.removeClass("has-error"), g.find(".validation-error").remove();
                                var h = f.nullable,
                                    i = d.val();
                                h = null != h ? JSON.parse(h) : !1;
                                var j = f.validate(f.id, i);
                                return h && 0 === i.length && (j = ""), j.length && (g.addClass("has-error"), h ? g.append('<span class="validation-error help-block small">' + j + "</div>") : g.append('<span class="validation-error help-block small">Required.  ' + j + "</div>")), !j.length
                            },
                            _createDeleteRows: function() {
                                var b = a.el.find('td[data-col-id="' + a.columns[0].id + '"]');
                                b.addClass("delete-column"), b.prepend('<div class="row-delete"><button type="button" class="close" aria-hidden="true">&times;</button></div>')
                            },
                            _removeDeleteRows: function() {
                                var b = a.el.find('td[data-col-id="' + a.columns[0].id + '"]');
                                b.removeClass("delete-column"), b.find(".row-delete").remove()
                            },
                            _deleteRow: function(c) {
                                b.ears.trigger("editable-can-delete", c).done(function() {
                                    for (var d = 0; d < a.data.length; d++)
                                        if (a.data[d].id === c) {
                                            a.data.splice(d, 1);
                                            break
                                        }
                                    b.bodyTable.find('tr[data-row-id="' + c + '"]').remove()
                                })
                            },
                            _treeNodeExpand: function(c) {
                                b.ears.trigger("editable-before-tree-node-expand", c);
                                var f = i(c, a.data, a),
                                    g = d.Deferred();
                                "children" in f ? g.resolve() : g = a.childData(c, f).done(function(a) {
                                    a = e.isArray(a) ? a : [], f.children = a
                                }), g.done(function() {
                                    "_treeState" in b || (b._treeState = {}), b._treeState[c] = "expand", b.render(), b.ears.trigger("editable-after-tree-node-expand", c)
                                })
                            },
                            _treeNodeCollapse: function(a) {
                                b.ears.trigger("editable-before-tree-node-collapse", a), b._treeState[a] = "collapse", b.render(), b.ears.trigger("editable-after-tree-node-collapse", a)
                            }
                        };
                    return c
                }
            }, {
                jquery: 9,
                "stand-in-order": 10,
                underscore: 13
            }
        ],
        6: [
            function(a, b, c) {
                var d = a("underscore"),
                    e = a("./cellFactory");
                b.exports = {
                    createTableHeaderRow: function(a) {
                        var b = "<tr>";
                        return d.each(a.columns, function(c) {
                            b += e.createTableHeader({
                                column: c,
                                sorted: a.isColumnSorted(c.id)
                            })
                        }), b += "</tr>"
                    },
                    createTableRow: function(a, b, c, f) {
                        var g = a[b.id],
                            h = '<tr data-row-id="' + g + '">';
                        return d.each(b.columns, function(d, g) {
                            h += e.createTableData({
                                column: d,
                                obj: a,
                                id: b.id,
                                rows: b.rows,
                                stateManager: b.stateManager,
                                treeColumn: b.treeMode && 0 === g,
                                level: c,
                                treeState: f,
                                launchLinksNewTab: b.launchLinksNewTab,
                                getCellClassesFn: b.getCellClasses
                            })
                        }), h += "</tr>"
                    },
                    createTableFooterAddRow: function(a) {
                        var b = a.columns,
                            c = '<tr class="new-row">';
                        return d.each(b, function(a) {
                            c += null == a.link ? e.createInput(a, a.preCreateCallback()) : e.createOpeningCellTag({
                                column: a
                            }) + "</td>"
                        }, this), c += "</tr>"
                    },
                    createTableFooterTotalRow: function(a) {
                        var b = a.columns,
                            c = a.data,
                            f = '<tr class="total-row">';
                        return d.each(b, function(a) {
                            f += e.createTotalCell(a, c)
                        }), f += "</tr>"
                    }
                }
            }, {
                "./cellFactory": 1,
                underscore: 13
            }
        ],
        7: [
            function(a, b, c) {
                b.exports = a("./lib/subscriber.js")
            }, {
                "./lib/subscriber.js": 8
            }
        ],
        8: [
            function(a, b, c) {
                var d = a("underscore"),
                    e = function() {
                        this.listeners = {}, this.oneListenerNames = {}
                    };
                d.extend(e.prototype, {
                    one: function(a, b) {
                        this.on(a, b), this.oneListenerNames[a] = null
                    },
                    on: function(a, b) {
                        if (d.has(this.listeners, a)) {
                            var c = this.listeners[a];
                            c.push(b)
                        } else this.listeners[a] = [b]
                    },
                    off: function(a) {
                        delete this.listeners[a]
                    },
                    trigger: function() {
                        var a = Array.prototype.slice.call(arguments),
                            b = a[0],
                            c = d.rest(a, 1),
                            e = [];
                        return d.each(b.split(" "), function(a) {
                            d.has(this.listeners, a) && d.each(this.listeners[a], function(b) {
                                e.push(b.apply(null, c)), d.has(this.oneListenerNames, a) && (delete this.oneListenerNames[a], this.off(a))
                            }, this)
                        }, this), 1 === e.length ? e[0] : e
                    }
                }), b.exports = e
            }, {
                underscore: 13
            }
        ],
        9: [
            function(b, c, d) {
                ! function(a, b) {
                    "object" == typeof c && "object" == typeof c.exports ? c.exports = a.document ? b(a, !0) : function(a) {
                        if (!a.document) throw new Error("jQuery requires a window with a document");
                        return b(a)
                    } : b(a)
                }("undefined" != typeof window ? window : this, function(b, c) {
                    function d(a) {
                        var b = !! a && "length" in a && a.length,
                            c = ga.type(a);
                        return "function" === c || ga.isWindow(a) ? !1 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
                    }

                    function e(a, b, c) {
                        if (ga.isFunction(b)) return ga.grep(a, function(a, d) {
                            return !!b.call(a, d, a) !== c
                        });
                        if (b.nodeType) return ga.grep(a, function(a) {
                            return a === b !== c
                        });
                        if ("string" == typeof b) {
                            if (qa.test(b)) return ga.filter(b, a, c);
                            b = ga.filter(b, a)
                        }
                        return ga.grep(a, function(a) {
                            return aa.call(b, a) > -1 !== c
                        })
                    }

                    function f(a, b) {
                        for (;
                            (a = a[b]) && 1 !== a.nodeType;);
                        return a
                    }

                    function g(a) {
                        var b = {};
                        return ga.each(a.match(wa) || [], function(a, c) {
                            b[c] = !0
                        }), b
                    }

                    function h() {
                        Y.removeEventListener("DOMContentLoaded", h), b.removeEventListener("load", h), ga.ready()
                    }

                    function i() {
                        this.expando = ga.expando + i.uid++
                    }

                    function j(a, b, c) {
                        var d;
                        if (void 0 === c && 1 === a.nodeType)
                            if (d = "data-" + b.replace(Da, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
                                try {
                                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : Ca.test(c) ? ga.parseJSON(c) : c
                                } catch (e) {}
                                Ba.set(a, b, c)
                            } else c = void 0;
                        return c
                    }

                    function k(a, b, c, d) {
                        var e, f = 1,
                            g = 20,
                            h = d ? function() {
                                return d.cur()
                            } : function() {
                                return ga.css(a, b, "")
                            }, i = h(),
                            j = c && c[3] || (ga.cssNumber[b] ? "" : "px"),
                            k = (ga.cssNumber[b] || "px" !== j && +i) && Fa.exec(ga.css(a, b));
                        if (k && k[3] !== j) {
                            j = j || k[3], c = c || [], k = +i || 1;
                            do f = f || ".5", k /= f, ga.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g)
                        }
                        return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
                    }

                    function l(a, b) {
                        var c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
                        return void 0 === b || b && ga.nodeName(a, b) ? ga.merge([a], c) : c
                    }

                    function m(a, b) {
                        for (var c = 0, d = a.length; d > c; c++) Aa.set(a[c], "globalEval", !b || Aa.get(b[c], "globalEval"))
                    }

                    function n(a, b, c, d, e) {
                        for (var f, g, h, i, j, k, n = b.createDocumentFragment(), o = [], p = 0, q = a.length; q > p; p++)
                            if (f = a[p], f || 0 === f)
                                if ("object" === ga.type(f)) ga.merge(o, f.nodeType ? [f] : f);
                                else if (Ma.test(f)) {
                            for (g = g || n.appendChild(b.createElement("div")), h = (Ja.exec(f) || ["", ""])[1].toLowerCase(), i = La[h] || La._default, g.innerHTML = i[1] + ga.htmlPrefilter(f) + i[2], k = i[0]; k--;) g = g.lastChild;
                            ga.merge(o, g.childNodes), g = n.firstChild, g.textContent = ""
                        } else o.push(b.createTextNode(f));
                        for (n.textContent = "", p = 0; f = o[p++];)
                            if (d && ga.inArray(f, d) > -1) e && e.push(f);
                            else if (j = ga.contains(f.ownerDocument, f), g = l(n.appendChild(f), "script"), j && m(g), c)
                            for (k = 0; f = g[k++];) Ka.test(f.type || "") && c.push(f);
                        return n
                    }

                    function o() {
                        return !0
                    }

                    function p() {
                        return !1
                    }

                    function q() {
                        try {
                            return Y.activeElement
                        } catch (a) {}
                    }

                    function r(a, b, c, d, e, f) {
                        var g, h;
                        if ("object" == typeof b) {
                            "string" != typeof c && (d = d || c, c = void 0);
                            for (h in b) r(a, h, c, d, b[h], f);
                            return a
                        }
                        if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = p;
                        else if (!e) return a;
                        return 1 === f && (g = e, e = function(a) {
                            return ga().off(a), g.apply(this, arguments)
                        }, e.guid = g.guid || (g.guid = ga.guid++)), a.each(function() {
                            ga.event.add(this, b, e, d, c)
                        })
                    }

                    function s(a, b) {
                        return ga.nodeName(a, "table") && ga.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
                    }

                    function t(a) {
                        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
                    }

                    function u(a) {
                        var b = Ta.exec(a.type);
                        return b ? a.type = b[1] : a.removeAttribute("type"), a
                    }

                    function v(a, b) {
                        var c, d, e, f, g, h, i, j;
                        if (1 === b.nodeType) {
                            if (Aa.hasData(a) && (f = Aa.access(a), g = Aa.set(b, f), j = f.events)) {
                                delete g.handle, g.events = {};
                                for (e in j)
                                    for (c = 0, d = j[e].length; d > c; c++) ga.event.add(b, e, j[e][c])
                            }
                            Ba.hasData(a) && (h = Ba.access(a), i = ga.extend({}, h), Ba.set(b, i))
                        }
                    }

                    function w(a, b) {
                        var c = b.nodeName.toLowerCase();
                        "input" === c && Ia.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
                    }

                    function x(a, b, c, d) {
                        b = $.apply([], b);
                        var e, f, g, h, i, j, k = 0,
                            m = a.length,
                            o = m - 1,
                            p = b[0],
                            q = ga.isFunction(p);
                        if (q || m > 1 && "string" == typeof p && !ea.checkClone && Sa.test(p)) return a.each(function(e) {
                            var f = a.eq(e);
                            q && (b[0] = p.call(this, e, f.html())), x(f, b, c, d)
                        });
                        if (m && (e = n(b, a[0].ownerDocument, !1, a, d), f = e.firstChild, 1 === e.childNodes.length && (e = f), f || d)) {
                            for (g = ga.map(l(e, "script"), t), h = g.length; m > k; k++) i = e, k !== o && (i = ga.clone(i, !0, !0), h && ga.merge(g, l(i, "script"))), c.call(a[k], i, k);
                            if (h)
                                for (j = g[g.length - 1].ownerDocument, ga.map(g, u), k = 0; h > k; k++) i = g[k], Ka.test(i.type || "") && !Aa.access(i, "globalEval") && ga.contains(j, i) && (i.src ? ga._evalUrl && ga._evalUrl(i.src) : ga.globalEval(i.textContent.replace(Ua, "")))
                        }
                        return a
                    }

                    function y(a, b, c) {
                        for (var d, e = b ? ga.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || ga.cleanData(l(d)), d.parentNode && (c && ga.contains(d.ownerDocument, d) && m(l(d, "script")), d.parentNode.removeChild(d));
                        return a
                    }

                    function z(a, b) {
                        var c = ga(b.createElement(a)).appendTo(b.body),
                            d = ga.css(c[0], "display");
                        return c.detach(), d
                    }

                    function A(a) {
                        var b = Y,
                            c = Wa[a];
                        return c || (c = z(a, b), "none" !== c && c || (Va = (Va || ga("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = Va[0].contentDocument, b.write(), b.close(), c = z(a, b), Va.detach()), Wa[a] = c), c
                    }

                    function B(a, b, c) {
                        var d, e, f, g, h = a.style;
                        return c = c || Za(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, "" !== g && void 0 !== g || ga.contains(a.ownerDocument, a) || (g = ga.style(a, b)), c && !ea.pixelMarginRight() && Ya.test(g) && Xa.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f), void 0 !== g ? g + "" : g
                    }

                    function C(a, b) {
                        return {
                            get: function() {
                                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
                            }
                        }
                    }

                    function D(a) {
                        if (a in eb) return a;
                        for (var b = a[0].toUpperCase() + a.slice(1), c = db.length; c--;)
                            if (a = db[c] + b, a in eb) return a
                    }

                    function E(a, b, c) {
                        var d = Fa.exec(b);
                        return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b
                    }

                    function F(a, b, c, d, e) {
                        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += ga.css(a, c + Ga[f], !0, e)), d ? ("content" === c && (g -= ga.css(a, "padding" + Ga[f], !0, e)), "margin" !== c && (g -= ga.css(a, "border" + Ga[f] + "Width", !0, e))) : (g += ga.css(a, "padding" + Ga[f], !0, e), "padding" !== c && (g += ga.css(a, "border" + Ga[f] + "Width", !0, e)));
                        return g
                    }

                    function G(a, c, d) {
                        var e = !0,
                            f = "width" === c ? a.offsetWidth : a.offsetHeight,
                            g = Za(a),
                            h = "border-box" === ga.css(a, "boxSizing", !1, g);
                        if (Y.msFullscreenElement && b.top !== b && a.getClientRects().length && (f = Math.round(100 * a.getBoundingClientRect()[c])), 0 >= f || null == f) {
                            if (f = B(a, c, g), (0 > f || null == f) && (f = a.style[c]), Ya.test(f)) return f;
                            e = h && (ea.boxSizingReliable() || f === a.style[c]), f = parseFloat(f) || 0
                        }
                        return f + F(a, c, d || (h ? "border" : "content"), e, g) + "px"
                    }

                    function H(a, b) {
                        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = Aa.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && Ha(d) && (f[g] = Aa.access(d, "olddisplay", A(d.nodeName)))) : (e = Ha(d), "none" === c && e || Aa.set(d, "olddisplay", e ? c : ga.css(d, "display"))));
                        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
                        return a
                    }

                    function I(a, b, c, d, e) {
                        return new I.prototype.init(a, b, c, d, e)
                    }

                    function J() {
                        return b.setTimeout(function() {
                            fb = void 0
                        }), fb = ga.now()
                    }

                    function K(a, b) {
                        var c, d = 0,
                            e = {
                                height: a
                            };
                        for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = Ga[d], e["margin" + c] = e["padding" + c] = a;
                        return b && (e.opacity = e.width = a), e
                    }

                    function L(a, b, c) {
                        for (var d, e = (O.tweeners[b] || []).concat(O.tweeners["*"]), f = 0, g = e.length; g > f; f++)
                            if (d = e[f].call(c, b, a)) return d
                    }

                    function M(a, b, c) {
                        var d, e, f, g, h, i, j, k, l = this,
                            m = {}, n = a.style,
                            o = a.nodeType && Ha(a),
                            p = Aa.get(a, "fxshow");
                        c.queue || (h = ga._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
                            h.unqueued || i()
                        }), h.unqueued++, l.always(function() {
                            l.always(function() {
                                h.unqueued--, ga.queue(a, "fx").length || h.empty.fire()
                            })
                        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], j = ga.css(a, "display"), k = "none" === j ? Aa.get(a, "olddisplay") || A(a.nodeName) : j, "inline" === k && "none" === ga.css(a, "float") && (n.display = "inline-block")), c.overflow && (n.overflow = "hidden", l.always(function() {
                            n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
                        }));
                        for (d in b)
                            if (e = b[d], hb.exec(e)) {
                                if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
                                    if ("show" !== e || !p || void 0 === p[d]) continue;
                                    o = !0
                                }
                                m[d] = p && p[d] || ga.style(a, d)
                            } else j = void 0;
                        if (ga.isEmptyObject(m)) "inline" === ("none" === j ? A(a.nodeName) : j) && (n.display = j);
                        else {
                            p ? "hidden" in p && (o = p.hidden) : p = Aa.access(a, "fxshow", {}), f && (p.hidden = !o), o ? ga(a).show() : l.done(function() {
                                ga(a).hide()
                            }), l.done(function() {
                                var b;
                                Aa.remove(a, "fxshow");
                                for (b in m) ga.style(a, b, m[b])
                            });
                            for (d in m) g = L(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
                        }
                    }

                    function N(a, b) {
                        var c, d, e, f, g;
                        for (c in a)
                            if (d = ga.camelCase(c), e = b[d], f = a[c], ga.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = ga.cssHooks[d], g && "expand" in g) {
                                f = g.expand(f), delete a[d];
                                for (c in f) c in a || (a[c] = f[c], b[c] = e)
                            } else b[d] = e
                    }

                    function O(a, b, c) {
                        var d, e, f = 0,
                            g = O.prefilters.length,
                            h = ga.Deferred().always(function() {
                                delete i.elem
                            }),
                            i = function() {
                                if (e) return !1;
                                for (var b = fb || J(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
                            }, j = h.promise({
                                elem: a,
                                props: ga.extend({}, b),
                                opts: ga.extend(!0, {
                                    specialEasing: {},
                                    easing: ga.easing._default
                                }, c),
                                originalProperties: b,
                                originalOptions: c,
                                startTime: fb || J(),
                                duration: c.duration,
                                tweens: [],
                                createTween: function(b, c) {
                                    var d = ga.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                                    return j.tweens.push(d), d
                                },
                                stop: function(b) {
                                    var c = 0,
                                        d = b ? j.tweens.length : 0;
                                    if (e) return this;
                                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                                    return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
                                }
                            }),
                            k = j.props;
                        for (N(k, j.opts.specialEasing); g > f; f++)
                            if (d = O.prefilters[f].call(j, a, k, j.opts)) return ga.isFunction(d.stop) && (ga._queueHooks(j.elem, j.opts.queue).stop = ga.proxy(d.stop, d)), d;
                        return ga.map(k, L, j), ga.isFunction(j.opts.start) && j.opts.start.call(a, j), ga.fx.timer(ga.extend(i, {
                            elem: a,
                            anim: j,
                            queue: j.opts.queue
                        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
                    }

                    function P(a) {
                        return a.getAttribute && a.getAttribute("class") || ""
                    }

                    function Q(a) {
                        return function(b, c) {
                            "string" != typeof b && (c = b, b = "*");
                            var d, e = 0,
                                f = b.toLowerCase().match(wa) || [];
                            if (ga.isFunction(c))
                                for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
                        }
                    }

                    function R(a, b, c, d) {
                        function e(h) {
                            var i;
                            return f[h] = !0, ga.each(a[h] || [], function(a, h) {
                                var j = h(b, c, d);
                                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
                            }), i
                        }
                        var f = {}, g = a === Bb;
                        return e(b.dataTypes[0]) || !f["*"] && e("*")
                    }

                    function S(a, b) {
                        var c, d, e = ga.ajaxSettings.flatOptions || {};
                        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
                        return d && ga.extend(!0, a, d), a
                    }

                    function T(a, b, c) {
                        for (var d, e, f, g, h = a.contents, i = a.dataTypes;
                            "*" === i[0];) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
                        if (d)
                            for (e in h)
                                if (h[e] && h[e].test(d)) {
                                    i.unshift(e);
                                    break
                                }
                        if (i[0] in c) f = i[0];
                        else {
                            for (e in c) {
                                if (!i[0] || a.converters[e + " " + i[0]]) {
                                    f = e;
                                    break
                                }
                                g || (g = e)
                            }
                            f = f || g
                        }
                        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
                    }

                    function U(a, b, c, d) {
                        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
                        if (k[1])
                            for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
                        for (f = k.shift(); f;)
                            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                                if ("*" === f) f = i;
                                else if ("*" !== i && i !== f) {
                            if (g = j[i + " " + f] || j["* " + f], !g)
                                for (e in j)
                                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                                        break
                                    }
                            if (g !== !0)
                                if (g && a["throws"]) b = g(b);
                                else try {
                                    b = g(b)
                                } catch (l) {
                                    return {
                                        state: "parsererror",
                                        error: g ? l : "No conversion from " + i + " to " + f
                                    }
                                }
                        }
                        return {
                            state: "success",
                            data: b
                        }
                    }

                    function V(a, b, c, d) {
                        var e;
                        if (ga.isArray(b)) ga.each(b, function(b, e) {
                            c || Fb.test(a) ? d(a, e) : V(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
                        });
                        else if (c || "object" !== ga.type(b)) d(a, b);
                        else
                            for (e in b) V(a + "[" + e + "]", b[e], c, d)
                    }

                    function W(a) {
                        return ga.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
                    }
                    var X = [],
                        Y = b.document,
                        Z = X.slice,
                        $ = X.concat,
                        _ = X.push,
                        aa = X.indexOf,
                        ba = {}, ca = ba.toString,
                        da = ba.hasOwnProperty,
                        ea = {}, fa = "2.2.3",
                        ga = function(a, b) {
                            return new ga.fn.init(a, b)
                        }, ha = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                        ia = /^-ms-/,
                        ja = /-([\da-z])/gi,
                        ka = function(a, b) {
                            return b.toUpperCase()
                        };
                    ga.fn = ga.prototype = {
                        jquery: fa,
                        constructor: ga,
                        selector: "",
                        length: 0,
                        toArray: function() {
                            return Z.call(this)
                        },
                        get: function(a) {
                            return null != a ? 0 > a ? this[a + this.length] : this[a] : Z.call(this)
                        },
                        pushStack: function(a) {
                            var b = ga.merge(this.constructor(), a);
                            return b.prevObject = this, b.context = this.context, b
                        },
                        each: function(a) {
                            return ga.each(this, a)
                        },
                        map: function(a) {
                            return this.pushStack(ga.map(this, function(b, c) {
                                return a.call(b, c, b)
                            }))
                        },
                        slice: function() {
                            return this.pushStack(Z.apply(this, arguments))
                        },
                        first: function() {
                            return this.eq(0)
                        },
                        last: function() {
                            return this.eq(-1)
                        },
                        eq: function(a) {
                            var b = this.length,
                                c = +a + (0 > a ? b : 0);
                            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
                        },
                        end: function() {
                            return this.prevObject || this.constructor()
                        },
                        push: _,
                        sort: X.sort,
                        splice: X.splice
                    }, ga.extend = ga.fn.extend = function() {
                        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1,
                            i = arguments.length,
                            j = !1;
                        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || ga.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
                            if (null != (a = arguments[h]))
                                for (b in a) c = g[b], d = a[b], g !== d && (j && d && (ga.isPlainObject(d) || (e = ga.isArray(d))) ? (e ? (e = !1, f = c && ga.isArray(c) ? c : []) : f = c && ga.isPlainObject(c) ? c : {}, g[b] = ga.extend(j, f, d)) : void 0 !== d && (g[b] = d));
                        return g
                    }, ga.extend({
                        expando: "jQuery" + (fa + Math.random()).replace(/\D/g, ""),
                        isReady: !0,
                        error: function(a) {
                            throw new Error(a)
                        },
                        noop: function() {},
                        isFunction: function(a) {
                            return "function" === ga.type(a)
                        },
                        isArray: Array.isArray,
                        isWindow: function(a) {
                            return null != a && a === a.window
                        },
                        isNumeric: function(a) {
                            var b = a && a.toString();
                            return !ga.isArray(a) && b - parseFloat(b) + 1 >= 0
                        },
                        isPlainObject: function(a) {
                            var b;
                            if ("object" !== ga.type(a) || a.nodeType || ga.isWindow(a)) return !1;
                            if (a.constructor && !da.call(a, "constructor") && !da.call(a.constructor.prototype || {}, "isPrototypeOf")) return !1;
                            for (b in a);
                            return void 0 === b || da.call(a, b)
                        },
                        isEmptyObject: function(a) {
                            var b;
                            for (b in a) return !1;
                            return !0
                        },
                        type: function(a) {
                            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? ba[ca.call(a)] || "object" : typeof a
                        },
                        globalEval: function(a) {
                            var b, c = eval;
                            a = ga.trim(a), a && (1 === a.indexOf("use strict") ? (b = Y.createElement("script"), b.text = a, Y.head.appendChild(b).parentNode.removeChild(b)) : c(a))
                        },
                        camelCase: function(a) {
                            return a.replace(ia, "ms-").replace(ja, ka)
                        },
                        nodeName: function(a, b) {
                            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
                        },
                        each: function(a, b) {
                            var c, e = 0;
                            if (d(a))
                                for (c = a.length; c > e && b.call(a[e], e, a[e]) !== !1; e++);
                            else
                                for (e in a)
                                    if (b.call(a[e], e, a[e]) === !1) break; return a
                        },
                        trim: function(a) {
                            return null == a ? "" : (a + "").replace(ha, "")
                        },
                        makeArray: function(a, b) {
                            var c = b || [];
                            return null != a && (d(Object(a)) ? ga.merge(c, "string" == typeof a ? [a] : a) : _.call(c, a)), c
                        },
                        inArray: function(a, b, c) {
                            return null == b ? -1 : aa.call(b, a, c)
                        },
                        merge: function(a, b) {
                            for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];
                            return a.length = e, a
                        },
                        grep: function(a, b, c) {
                            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
                            return e
                        },
                        map: function(a, b, c) {
                            var e, f, g = 0,
                                h = [];
                            if (d(a))
                                for (e = a.length; e > g; g++) f = b(a[g], g, c), null != f && h.push(f);
                            else
                                for (g in a) f = b(a[g], g, c), null != f && h.push(f);
                            return $.apply([], h)
                        },
                        guid: 1,
                        proxy: function(a, b) {
                            var c, d, e;
                            return "string" == typeof b && (c = a[b], b = a, a = c), ga.isFunction(a) ? (d = Z.call(arguments, 2), e = function() {
                                return a.apply(b || this, d.concat(Z.call(arguments)))
                            }, e.guid = a.guid = a.guid || ga.guid++, e) : void 0
                        },
                        now: Date.now,
                        support: ea
                    }), "function" == typeof Symbol && (ga.fn[Symbol.iterator] = X[Symbol.iterator]), ga.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b) {
                        ba["[object " + b + "]"] = b.toLowerCase()
                    });
                    var la = function(a) {
                        function b(a, b, c, d) {
                            var e, f, g, h, i, j, l, n, o = b && b.ownerDocument,
                                p = b ? b.nodeType : 9;
                            if (c = c || [], "string" != typeof a || !a || 1 !== p && 9 !== p && 11 !== p) return c;
                            if (!d && ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, I)) {
                                if (11 !== p && (j = ra.exec(a)))
                                    if (e = j[1]) {
                                        if (9 === p) {
                                            if (!(g = b.getElementById(e))) return c;
                                            if (g.id === e) return c.push(g), c
                                        } else if (o && (g = o.getElementById(e)) && M(b, g) && g.id === e) return c.push(g), c
                                    } else {
                                        if (j[2]) return $.apply(c, b.getElementsByTagName(a)), c;
                                        if ((e = j[3]) && v.getElementsByClassName && b.getElementsByClassName) return $.apply(c, b.getElementsByClassName(e)), c
                                    }
                                if (v.qsa && !T[a + " "] && (!J || !J.test(a))) {
                                    if (1 !== p) o = b, n = a;
                                    else if ("object" !== b.nodeName.toLowerCase()) {
                                        for ((h = b.getAttribute("id")) ? h = h.replace(ta, "\\$&") : b.setAttribute("id", h = N), l = z(a), f = l.length, i = ma.test(h) ? "#" + h : "[id='" + h + "']"; f--;) l[f] = i + " " + m(l[f]);
                                        n = l.join(","), o = sa.test(a) && k(b.parentNode) || b
                                    }
                                    if (n) try {
                                        return $.apply(c, o.querySelectorAll(n)), c
                                    } catch (q) {} finally {
                                        h === N && b.removeAttribute("id")
                                    }
                                }
                            }
                            return B(a.replace(ha, "$1"), b, c, d)
                        }

                        function c() {
                            function a(c, d) {
                                return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d
                            }
                            var b = [];
                            return a
                        }

                        function d(a) {
                            return a[N] = !0, a
                        }

                        function e(a) {
                            var b = G.createElement("div");
                            try {
                                return !!a(b)
                            } catch (c) {
                                return !1
                            } finally {
                                b.parentNode && b.parentNode.removeChild(b), b = null
                            }
                        }

                        function f(a, b) {
                            for (var c = a.split("|"), d = c.length; d--;) w.attrHandle[c[d]] = b
                        }

                        function g(a, b) {
                            var c = b && a,
                                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
                            if (d) return d;
                            if (c)
                                for (; c = c.nextSibling;)
                                    if (c === b) return -1;
                            return a ? 1 : -1
                        }

                        function h(a) {
                            return function(b) {
                                var c = b.nodeName.toLowerCase();
                                return "input" === c && b.type === a
                            }
                        }

                        function i(a) {
                            return function(b) {
                                var c = b.nodeName.toLowerCase();
                                return ("input" === c || "button" === c) && b.type === a
                            }
                        }

                        function j(a) {
                            return d(function(b) {
                                return b = +b, d(function(c, d) {
                                    for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                                })
                            })
                        }

                        function k(a) {
                            return a && "undefined" != typeof a.getElementsByTagName && a
                        }

                        function l() {}

                        function m(a) {
                            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
                            return d
                        }

                        function n(a, b, c) {
                            var d = b.dir,
                                e = c && "parentNode" === d,
                                f = Q++;
                            return b.first ? function(b, c, f) {
                                for (; b = b[d];)
                                    if (1 === b.nodeType || e) return a(b, c, f)
                            } : function(b, c, g) {
                                var h, i, j, k = [P, f];
                                if (g) {
                                    for (; b = b[d];)
                                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                                } else
                                    for (; b = b[d];)
                                        if (1 === b.nodeType || e) {
                                            if (j = b[N] || (b[N] = {}), i = j[b.uniqueID] || (j[b.uniqueID] = {}), (h = i[d]) && h[0] === P && h[1] === f) return k[2] = h[2];
                                            if (i[d] = k, k[2] = a(b, c, g)) return !0
                                        }
                            }
                        }

                        function o(a) {
                            return a.length > 1 ? function(b, c, d) {
                                for (var e = a.length; e--;)
                                    if (!a[e](b, c, d)) return !1;
                                return !0
                            } : a[0]
                        }

                        function p(a, c, d) {
                            for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
                            return d
                        }

                        function q(a, b, c, d, e) {
                            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
                            return g
                        }

                        function r(a, b, c, e, f, g) {
                            return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function(d, g, h, i) {
                                var j, k, l, m = [],
                                    n = [],
                                    o = g.length,
                                    r = d || p(b || "*", h.nodeType ? [h] : h, []),
                                    s = !a || !d && b ? r : q(r, m, a, h, i),
                                    t = c ? f || (d ? a : o || e) ? [] : g : s;
                                if (c && c(s, t, h, i), e)
                                    for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                                if (d) {
                                    if (f || a) {
                                        if (f) {
                                            for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                                            f(null, t = [], j, i)
                                        }
                                        for (k = t.length; k--;)(l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                                    }
                                } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t)
                            })
                        }

                        function s(a) {
                            for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function(a) {
                                    return a === b
                                }, g, !0), j = n(function(a) {
                                    return aa(b, a) > -1
                                }, g, !0), k = [
                                    function(a, c, d) {
                                        var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                                        return b = null, e
                                    }
                                ]; e > h; h++)
                                if (c = w.relative[a[h].type]) k = [n(o(k), c)];
                                else {
                                    if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                                        for (d = ++h; e > d && !w.relative[a[d].type]; d++);
                                        return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                                            value: " " === a[h - 2].type ? "*" : ""
                                        })).replace(ha, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a))
                                    }
                                    k.push(c)
                                }
                            return o(k)
                        }

                        function t(a, c) {
                            var e = c.length > 0,
                                f = a.length > 0,
                                g = function(d, g, h, i, j) {
                                    var k, l, m, n = 0,
                                        o = "0",
                                        p = d && [],
                                        r = [],
                                        s = C,
                                        t = d || f && w.find.TAG("*", j),
                                        u = P += null == s ? 1 : Math.random() || .1,
                                        v = t.length;
                                    for (j && (C = g === G || g || j); o !== v && null != (k = t[o]); o++) {
                                        if (f && k) {
                                            for (l = 0, g || k.ownerDocument === G || (F(k), h = !I); m = a[l++];)
                                                if (m(k, g || G, h)) {
                                                    i.push(k);
                                                    break
                                                }
                                            j && (P = u)
                                        }
                                        e && ((k = !m && k) && n--, d && p.push(k))
                                    }
                                    if (n += o, e && o !== n) {
                                        for (l = 0; m = c[l++];) m(p, r, g, h);
                                        if (d) {
                                            if (n > 0)
                                                for (; o--;) p[o] || r[o] || (r[o] = Y.call(i));
                                            r = q(r)
                                        }
                                        $.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                                    }
                                    return j && (P = u, C = s), p
                                };
                            return e ? d(g) : g
                        }
                        var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date,
                            O = a.document,
                            P = 0,
                            Q = 0,
                            R = c(),
                            S = c(),
                            T = c(),
                            U = function(a, b) {
                                return a === b && (E = !0), 0
                            }, V = 1 << 31,
                            W = {}.hasOwnProperty,
                            X = [],
                            Y = X.pop,
                            Z = X.push,
                            $ = X.push,
                            _ = X.slice,
                            aa = function(a, b) {
                                for (var c = 0, d = a.length; d > c; c++)
                                    if (a[c] === b) return c;
                                return -1
                            }, ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                            ca = "[\\x20\\t\\r\\n\\f]",
                            da = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                            ea = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + da + "))|)" + ca + "*\\]",
                            fa = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ea + ")*)|.*)\\)|)",
                            ga = new RegExp(ca + "+", "g"),
                            ha = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"),
                            ia = new RegExp("^" + ca + "*," + ca + "*"),
                            ja = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"),
                            ka = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"),
                            la = new RegExp(fa),
                            ma = new RegExp("^" + da + "$"),
                            na = {
                                ID: new RegExp("^#(" + da + ")"),
                                CLASS: new RegExp("^\\.(" + da + ")"),
                                TAG: new RegExp("^(" + da + "|[*])"),
                                ATTR: new RegExp("^" + ea),
                                PSEUDO: new RegExp("^" + fa),
                                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
                                bool: new RegExp("^(?:" + ba + ")$", "i"),
                                needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i")
                            }, oa = /^(?:input|select|textarea|button)$/i,
                            pa = /^h\d$/i,
                            qa = /^[^{]+\{\s*\[native \w/,
                            ra = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                            sa = /[+~]/,
                            ta = /'|\\/g,
                            ua = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"),
                            va = function(a, b, c) {
                                var d = "0x" + b - 65536;
                                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
                            }, wa = function() {
                                F()
                            };
                        try {
                            $.apply(X = _.call(O.childNodes), O.childNodes), X[O.childNodes.length].nodeType
                        } catch (xa) {
                            $ = {
                                apply: X.length ? function(a, b) {
                                    Z.apply(a, _.call(b))
                                } : function(a, b) {
                                    for (var c = a.length, d = 0; a[c++] = b[d++];);
                                    a.length = c - 1
                                }
                            }
                        }
                        v = b.support = {}, y = b.isXML = function(a) {
                            var b = a && (a.ownerDocument || a).documentElement;
                            return b ? "HTML" !== b.nodeName : !1
                        }, F = b.setDocument = function(a) {
                            var b, c, d = a ? a.ownerDocument || a : O;
                            return d !== G && 9 === d.nodeType && d.documentElement ? (G = d, H = G.documentElement, I = !y(G), (c = G.defaultView) && c.top !== c && (c.addEventListener ? c.addEventListener("unload", wa, !1) : c.attachEvent && c.attachEvent("onunload", wa)), v.attributes = e(function(a) {
                                return a.className = "i", !a.getAttribute("className")
                            }), v.getElementsByTagName = e(function(a) {
                                return a.appendChild(G.createComment("")), !a.getElementsByTagName("*").length
                            }), v.getElementsByClassName = qa.test(G.getElementsByClassName), v.getById = e(function(a) {
                                return H.appendChild(a).id = N, !G.getElementsByName || !G.getElementsByName(N).length
                            }), v.getById ? (w.find.ID = function(a, b) {
                                if ("undefined" != typeof b.getElementById && I) {
                                    var c = b.getElementById(a);
                                    return c ? [c] : []
                                }
                            }, w.filter.ID = function(a) {
                                var b = a.replace(ua, va);
                                return function(a) {
                                    return a.getAttribute("id") === b
                                }
                            }) : (delete w.find.ID, w.filter.ID = function(a) {
                                var b = a.replace(ua, va);
                                return function(a) {
                                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                                    return c && c.value === b
                                }
                            }), w.find.TAG = v.getElementsByTagName ? function(a, b) {
                                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0
                            } : function(a, b) {
                                var c, d = [],
                                    e = 0,
                                    f = b.getElementsByTagName(a);
                                if ("*" === a) {
                                    for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                                    return d
                                }
                                return f
                            }, w.find.CLASS = v.getElementsByClassName && function(a, b) {
                                return "undefined" != typeof b.getElementsByClassName && I ? b.getElementsByClassName(a) : void 0
                            }, K = [], J = [], (v.qsa = qa.test(G.querySelectorAll)) && (e(function(a) {
                                H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + ca + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + ca + "*(?:value|" + ba + ")"), a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="), a.querySelectorAll(":checked").length || J.push(":checked"), a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]")
                            }), e(function(a) {
                                var b = G.createElement("input");
                                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + ca + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
                            })), (v.matchesSelector = qa.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
                                v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", fa)
                            }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = qa.test(H.compareDocumentPosition), M = b || qa.test(H.contains) ? function(a, b) {
                                var c = 9 === a.nodeType ? a.documentElement : a,
                                    d = b && b.parentNode;
                                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                            } : function(a, b) {
                                if (b)
                                    for (; b = b.parentNode;)
                                        if (b === a) return !0;
                                return !1
                            }, U = b ? function(a, b) {
                                if (a === b) return E = !0, 0;
                                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                                return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === G || a.ownerDocument === O && M(O, a) ? -1 : b === G || b.ownerDocument === O && M(O, b) ? 1 : D ? aa(D, a) - aa(D, b) : 0 : 4 & c ? -1 : 1)
                            } : function(a, b) {
                                if (a === b) return E = !0, 0;
                                var c, d = 0,
                                    e = a.parentNode,
                                    f = b.parentNode,
                                    h = [a],
                                    i = [b];
                                if (!e || !f) return a === G ? -1 : b === G ? 1 : e ? -1 : f ? 1 : D ? aa(D, a) - aa(D, b) : 0;
                                if (e === f) return g(a, b);
                                for (c = a; c = c.parentNode;) h.unshift(c);
                                for (c = b; c = c.parentNode;) i.unshift(c);
                                for (; h[d] === i[d];) d++;
                                return d ? g(h[d], i[d]) : h[d] === O ? -1 : i[d] === O ? 1 : 0
                            }, G) : G
                        }, b.matches = function(a, c) {
                            return b(a, null, null, c)
                        }, b.matchesSelector = function(a, c) {
                            if ((a.ownerDocument || a) !== G && F(a), c = c.replace(ka, "='$1']"), v.matchesSelector && I && !T[c + " "] && (!K || !K.test(c)) && (!J || !J.test(c))) try {
                                var d = L.call(a, c);
                                if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
                            } catch (e) {}
                            return b(c, G, null, [a]).length > 0
                        }, b.contains = function(a, b) {
                            return (a.ownerDocument || a) !== G && F(a), M(a, b)
                        }, b.attr = function(a, b) {
                            (a.ownerDocument || a) !== G && F(a);
                            var c = w.attrHandle[b.toLowerCase()],
                                d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
                            return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
                        }, b.error = function(a) {
                            throw new Error("Syntax error, unrecognized expression: " + a)
                        }, b.uniqueSort = function(a) {
                            var b, c = [],
                                d = 0,
                                e = 0;
                            if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
                                for (; b = a[e++];) b === a[e] && (d = c.push(e));
                                for (; d--;) a.splice(c[d], 1)
                            }
                            return D = null, a
                        }, x = b.getText = function(a) {
                            var b, c = "",
                                d = 0,
                                e = a.nodeType;
                            if (e) {
                                if (1 === e || 9 === e || 11 === e) {
                                    if ("string" == typeof a.textContent) return a.textContent;
                                    for (a = a.firstChild; a; a = a.nextSibling) c += x(a)
                                } else if (3 === e || 4 === e) return a.nodeValue
                            } else
                                for (; b = a[d++];) c += x(b);
                            return c
                        }, w = b.selectors = {
                            cacheLength: 50,
                            createPseudo: d,
                            match: na,
                            attrHandle: {},
                            find: {},
                            relative: {
                                ">": {
                                    dir: "parentNode",
                                    first: !0
                                },
                                " ": {
                                    dir: "parentNode"
                                },
                                "+": {
                                    dir: "previousSibling",
                                    first: !0
                                },
                                "~": {
                                    dir: "previousSibling"
                                }
                            },
                            preFilter: {
                                ATTR: function(a) {
                                    return a[1] = a[1].replace(ua, va), a[3] = (a[3] || a[4] || a[5] || "").replace(ua, va), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                                },
                                CHILD: function(a) {
                                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                                },
                                PSEUDO: function(a) {
                                    var b, c = !a[6] && a[2];
                                    return na.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && la.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                                }
                            },
                            filter: {
                                TAG: function(a) {
                                    var b = a.replace(ua, va).toLowerCase();
                                    return "*" === a ? function() {
                                        return !0
                                    } : function(a) {
                                        return a.nodeName && a.nodeName.toLowerCase() === b
                                    }
                                },
                                CLASS: function(a) {
                                    var b = R[a + " "];
                                    return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && R(a, function(a) {
                                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                                    })
                                },
                                ATTR: function(a, c, d) {
                                    return function(e) {
                                        var f = b.attr(e, a);
                                        return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ga, " ") + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
                                    }
                                },
                                CHILD: function(a, b, c, d, e) {
                                    var f = "nth" !== a.slice(0, 3),
                                        g = "last" !== a.slice(-4),
                                        h = "of-type" === b;
                                    return 1 === d && 0 === e ? function(a) {
                                        return !!a.parentNode
                                    } : function(b, c, i) {
                                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                                            q = b.parentNode,
                                            r = h && b.nodeName.toLowerCase(),
                                            s = !i && !h,
                                            t = !1;
                                        if (q) {
                                            if (f) {
                                                for (; p;) {
                                                    for (m = b; m = m[p];)
                                                        if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                                    o = p = "only" === a && !o && "nextSibling"
                                                }
                                                return !0
                                            }
                                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                                for (m = q, l = m[N] || (m[N] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === P && j[1], t = n && j[2], m = n && q.childNodes[n]; m = ++n && m && m[p] || (t = n = 0) || o.pop();)
                                                    if (1 === m.nodeType && ++t && m === b) {
                                                        k[a] = [P, n, t];
                                                        break
                                                    }
                                            } else if (s && (m = b, l = m[N] || (m[N] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === P && j[1], t = n), t === !1)
                                                for (;
                                                    (m = ++n && m && m[p] || (t = n = 0) || o.pop()) && ((h ? m.nodeName.toLowerCase() !== r : 1 !== m.nodeType) || !++t || (s && (l = m[N] || (m[N] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [P, t]), m !== b)););
                                            return t -= e, t === d || t % d === 0 && t / d >= 0
                                        }
                                    }
                                },
                                PSEUDO: function(a, c) {
                                    var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                                    return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                                        for (var d, e = f(a, c), g = e.length; g--;) d = aa(a, e[g]), a[d] = !(b[d] = e[g])
                                    }) : function(a) {
                                        return f(a, 0, e)
                                    }) : f
                                }
                            },
                            pseudos: {
                                not: d(function(a) {
                                    var b = [],
                                        c = [],
                                        e = A(a.replace(ha, "$1"));
                                    return e[N] ? d(function(a, b, c, d) {
                                        for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                                    }) : function(a, d, f) {
                                        return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop()
                                    }
                                }),
                                has: d(function(a) {
                                    return function(c) {
                                        return b(a, c).length > 0
                                    }
                                }),
                                contains: d(function(a) {
                                    return a = a.replace(ua, va),
                                    function(b) {
                                        return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
                                    }
                                }),
                                lang: d(function(a) {
                                    return ma.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(ua, va).toLowerCase(),
                                    function(b) {
                                        var c;
                                        do
                                            if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                                        return !1
                                    }
                                }),
                                target: function(b) {
                                    var c = a.location && a.location.hash;
                                    return c && c.slice(1) === b.id
                                },
                                root: function(a) {
                                    return a === H
                                },
                                focus: function(a) {
                                    return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !! (a.type || a.href || ~a.tabIndex)
                                },
                                enabled: function(a) {
                                    return a.disabled === !1
                                },
                                disabled: function(a) {
                                    return a.disabled === !0
                                },
                                checked: function(a) {
                                    var b = a.nodeName.toLowerCase();
                                    return "input" === b && !! a.checked || "option" === b && !! a.selected
                                },
                                selected: function(a) {
                                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                                },
                                empty: function(a) {
                                    for (a = a.firstChild; a; a = a.nextSibling)
                                        if (a.nodeType < 6) return !1;
                                    return !0
                                },
                                parent: function(a) {
                                    return !w.pseudos.empty(a)
                                },
                                header: function(a) {
                                    return pa.test(a.nodeName)
                                },
                                input: function(a) {
                                    return oa.test(a.nodeName)
                                },
                                button: function(a) {
                                    var b = a.nodeName.toLowerCase();
                                    return "input" === b && "button" === a.type || "button" === b
                                },
                                text: function(a) {
                                    var b;
                                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                                },
                                first: j(function() {
                                    return [0]
                                }),
                                last: j(function(a, b) {
                                    return [b - 1]
                                }),
                                eq: j(function(a, b, c) {
                                    return [0 > c ? c + b : c]
                                }),
                                even: j(function(a, b) {
                                    for (var c = 0; b > c; c += 2) a.push(c);
                                    return a
                                }),
                                odd: j(function(a, b) {
                                    for (var c = 1; b > c; c += 2) a.push(c);
                                    return a
                                }),
                                lt: j(function(a, b, c) {
                                    for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                                    return a
                                }),
                                gt: j(function(a, b, c) {
                                    for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                                    return a
                                })
                            }
                        }, w.pseudos.nth = w.pseudos.eq;
                        for (u in {
                            radio: !0,
                            checkbox: !0,
                            file: !0,
                            password: !0,
                            image: !0
                        }) w.pseudos[u] = h(u);
                        for (u in {
                            submit: !0,
                            reset: !0
                        }) w.pseudos[u] = i(u);
                        return l.prototype = w.filters = w.pseudos, w.setFilters = new l, z = b.tokenize = function(a, c) {
                            var d, e, f, g, h, i, j, k = S[a + " "];
                            if (k) return c ? 0 : k.slice(0);
                            for (h = a, i = [], j = w.preFilter; h;) {
                                d && !(e = ia.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ja.exec(h)) && (d = e.shift(), f.push({
                                    value: d,
                                    type: e[0].replace(ha, " ")
                                }), h = h.slice(d.length));
                                for (g in w.filter)!(e = na[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                                    value: d,
                                    type: g,
                                    matches: e
                                }), h = h.slice(d.length));
                                if (!d) break
                            }
                            return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
                        }, A = b.compile = function(a, b) {
                            var c, d = [],
                                e = [],
                                f = T[a + " "];
                            if (!f) {
                                for (b || (b = z(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                                f = T(a, t(e, d)), f.selector = a
                            }
                            return f
                        }, B = b.select = function(a, b, c, d) {
                            var e, f, g, h, i, j = "function" == typeof a && a,
                                l = !d && z(a = j.selector || a);
                            if (c = c || [], 1 === l.length) {
                                if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                                    if (b = (w.find.ID(g.matches[0].replace(ua, va), b) || [])[0], !b) return c;
                                    j && (b = b.parentNode), a = a.slice(f.shift().value.length)
                                }
                                for (e = na.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);)
                                    if ((i = w.find[h]) && (d = i(g.matches[0].replace(ua, va), sa.test(f[0].type) && k(b.parentNode) || b))) {
                                        if (f.splice(e, 1), a = d.length && m(f), !a) return $.apply(c, d), c;
                                        break
                                    }
                            }
                            return (j || A(a, l))(d, b, !I, c, !b || sa.test(a) && k(b.parentNode) || b), c
                        }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !! E, F(), v.sortDetached = e(function(a) {
                            return 1 & a.compareDocumentPosition(G.createElement("div"))
                        }), e(function(a) {
                            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
                        }) || f("type|href|height|width", function(a, b, c) {
                            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
                        }), v.attributes && e(function(a) {
                            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
                        }) || f("value", function(a, b, c) {
                            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
                        }), e(function(a) {
                            return null == a.getAttribute("disabled")
                        }) || f(ba, function(a, b, c) {
                            var d;
                            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
                        }), b
                    }(b);
                    ga.find = la, ga.expr = la.selectors, ga.expr[":"] = ga.expr.pseudos, ga.uniqueSort = ga.unique = la.uniqueSort, ga.text = la.getText, ga.isXMLDoc = la.isXML, ga.contains = la.contains;
                    var ma = function(a, b, c) {
                        for (var d = [], e = void 0 !== c;
                            (a = a[b]) && 9 !== a.nodeType;)
                            if (1 === a.nodeType) {
                                if (e && ga(a).is(c)) break;
                                d.push(a)
                            }
                        return d
                    }, na = function(a, b) {
                            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
                            return c
                        }, oa = ga.expr.match.needsContext,
                        pa = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
                        qa = /^.[^:#\[\.,]*$/;
                    ga.filter = function(a, b, c) {
                        var d = b[0];
                        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? ga.find.matchesSelector(d, a) ? [d] : [] : ga.find.matches(a, ga.grep(b, function(a) {
                            return 1 === a.nodeType
                        }))
                    }, ga.fn.extend({
                        find: function(a) {
                            var b, c = this.length,
                                d = [],
                                e = this;
                            if ("string" != typeof a) return this.pushStack(ga(a).filter(function() {
                                for (b = 0; c > b; b++)
                                    if (ga.contains(e[b], this)) return !0
                            }));
                            for (b = 0; c > b; b++) ga.find(a, e[b], d);
                            return d = this.pushStack(c > 1 ? ga.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
                        },
                        filter: function(a) {
                            return this.pushStack(e(this, a || [], !1))
                        },
                        not: function(a) {
                            return this.pushStack(e(this, a || [], !0))
                        },
                        is: function(a) {
                            return !!e(this, "string" == typeof a && oa.test(a) ? ga(a) : a || [], !1).length
                        }
                    });
                    var ra, sa = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                        ta = ga.fn.init = function(a, b, c) {
                            var d, e;
                            if (!a) return this;
                            if (c = c || ra, "string" == typeof a) {
                                if (d = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : sa.exec(a), !d || !d[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
                                if (d[1]) {
                                    if (b = b instanceof ga ? b[0] : b, ga.merge(this, ga.parseHTML(d[1], b && b.nodeType ? b.ownerDocument || b : Y, !0)), pa.test(d[1]) && ga.isPlainObject(b))
                                        for (d in b) ga.isFunction(this[d]) ? this[d](b[d]) : this.attr(d, b[d]);
                                    return this
                                }
                                return e = Y.getElementById(d[2]), e && e.parentNode && (this.length = 1, this[0] = e), this.context = Y, this.selector = a, this
                            }
                            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : ga.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(ga) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), ga.makeArray(a, this))
                        };
                    ta.prototype = ga.fn, ra = ga(Y);
                    var ua = /^(?:parents|prev(?:Until|All))/,
                        va = {
                            children: !0,
                            contents: !0,
                            next: !0,
                            prev: !0
                        };
                    ga.fn.extend({
                        has: function(a) {
                            var b = ga(a, this),
                                c = b.length;
                            return this.filter(function() {
                                for (var a = 0; c > a; a++)
                                    if (ga.contains(this, b[a])) return !0
                            })
                        },
                        closest: function(a, b) {
                            for (var c, d = 0, e = this.length, f = [], g = oa.test(a) || "string" != typeof a ? ga(a, b || this.context) : 0; e > d; d++)
                                for (c = this[d]; c && c !== b; c = c.parentNode)
                                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && ga.find.matchesSelector(c, a))) {
                                        f.push(c);
                                        break
                                    }
                            return this.pushStack(f.length > 1 ? ga.uniqueSort(f) : f)
                        },
                        index: function(a) {
                            return a ? "string" == typeof a ? aa.call(ga(a), this[0]) : aa.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                        },
                        add: function(a, b) {
                            return this.pushStack(ga.uniqueSort(ga.merge(this.get(), ga(a, b))))
                        },
                        addBack: function(a) {
                            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
                        }
                    }), ga.each({
                        parent: function(a) {
                            var b = a.parentNode;
                            return b && 11 !== b.nodeType ? b : null
                        },
                        parents: function(a) {
                            return ma(a, "parentNode")
                        },
                        parentsUntil: function(a, b, c) {
                            return ma(a, "parentNode", c)
                        },
                        next: function(a) {
                            return f(a, "nextSibling")
                        },
                        prev: function(a) {
                            return f(a, "previousSibling")
                        },
                        nextAll: function(a) {
                            return ma(a, "nextSibling")
                        },
                        prevAll: function(a) {
                            return ma(a, "previousSibling")
                        },
                        nextUntil: function(a, b, c) {
                            return ma(a, "nextSibling", c)
                        },
                        prevUntil: function(a, b, c) {
                            return ma(a, "previousSibling", c)
                        },
                        siblings: function(a) {
                            return na((a.parentNode || {}).firstChild, a)
                        },
                        children: function(a) {
                            return na(a.firstChild)
                        },
                        contents: function(a) {
                            return a.contentDocument || ga.merge([], a.childNodes)
                        }
                    }, function(a, b) {
                        ga.fn[a] = function(c, d) {
                            var e = ga.map(this, b, c);
                            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = ga.filter(d, e)), this.length > 1 && (va[a] || ga.uniqueSort(e), ua.test(a) && e.reverse()), this.pushStack(e)
                        }
                    });
                    var wa = /\S+/g;
                    ga.Callbacks = function(a) {
                        a = "string" == typeof a ? g(a) : ga.extend({}, a);
                        var b, c, d, e, f = [],
                            h = [],
                            i = -1,
                            j = function() {
                                for (e = a.once, d = b = !0; h.length; i = -1)
                                    for (c = h.shift(); ++i < f.length;) f[i].apply(c[0], c[1]) === !1 && a.stopOnFalse && (i = f.length, c = !1);
                                a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
                            }, k = {
                                add: function() {
                                    return f && (c && !b && (i = f.length - 1, h.push(c)), function d(b) {
                                        ga.each(b, function(b, c) {
                                            ga.isFunction(c) ? a.unique && k.has(c) || f.push(c) : c && c.length && "string" !== ga.type(c) && d(c)
                                        })
                                    }(arguments), c && !b && j()), this
                                },
                                remove: function() {
                                    return ga.each(arguments, function(a, b) {
                                        for (var c;
                                            (c = ga.inArray(b, f, c)) > -1;) f.splice(c, 1), i >= c && i--
                                    }), this
                                },
                                has: function(a) {
                                    return a ? ga.inArray(a, f) > -1 : f.length > 0
                                },
                                empty: function() {
                                    return f && (f = []), this
                                },
                                disable: function() {
                                    return e = h = [], f = c = "", this
                                },
                                disabled: function() {
                                    return !f
                                },
                                lock: function() {
                                    return e = h = [], c || (f = c = ""), this
                                },
                                locked: function() {
                                    return !!e
                                },
                                fireWith: function(a, c) {
                                    return e || (c = c || [], c = [a, c.slice ? c.slice() : c], h.push(c), b || j()), this
                                },
                                fire: function() {
                                    return k.fireWith(this, arguments), this
                                },
                                fired: function() {
                                    return !!d
                                }
                            };
                        return k
                    }, ga.extend({
                        Deferred: function(a) {
                            var b = [
                                ["resolve", "done", ga.Callbacks("once memory"), "resolved"],
                                ["reject", "fail", ga.Callbacks("once memory"), "rejected"],
                                ["notify", "progress", ga.Callbacks("memory")]
                            ],
                                c = "pending",
                                d = {
                                    state: function() {
                                        return c
                                    },
                                    always: function() {
                                        return e.done(arguments).fail(arguments), this
                                    },
                                    then: function() {
                                        var a = arguments;
                                        return ga.Deferred(function(c) {
                                            ga.each(b, function(b, f) {
                                                var g = ga.isFunction(a[b]) && a[b];
                                                e[f[1]](function() {
                                                    var a = g && g.apply(this, arguments);
                                                    a && ga.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                                })
                                            }), a = null
                                        }).promise()
                                    },
                                    promise: function(a) {
                                        return null != a ? ga.extend(a, d) : d
                                    }
                                }, e = {};
                            return d.pipe = d.then, ga.each(b, function(a, f) {
                                var g = f[2],
                                    h = f[3];
                                d[f[1]] = g.add, h && g.add(function() {
                                    c = h
                                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                                }, e[f[0] + "With"] = g.fireWith
                            }), d.promise(e), a && a.call(e, e), e
                        },
                        when: function(a) {
                            var b, c, d, e = 0,
                                f = Z.call(arguments),
                                g = f.length,
                                h = 1 !== g || a && ga.isFunction(a.promise) ? g : 0,
                                i = 1 === h ? a : ga.Deferred(),
                                j = function(a, c, d) {
                                    return function(e) {
                                        c[a] = this, d[a] = arguments.length > 1 ? Z.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                                    }
                                };
                            if (g > 1)
                                for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && ga.isFunction(f[e].promise) ? f[e].promise().progress(j(e, c, b)).done(j(e, d, f)).fail(i.reject) : --h;
                            return h || i.resolveWith(d, f), i.promise()
                        }
                    });
                    var xa;
                    ga.fn.ready = function(a) {
                        return ga.ready.promise().done(a), this
                    }, ga.extend({
                        isReady: !1,
                        readyWait: 1,
                        holdReady: function(a) {
                            a ? ga.readyWait++ : ga.ready(!0)
                        },
                        ready: function(a) {
                            (a === !0 ? --ga.readyWait : ga.isReady) || (ga.isReady = !0, a !== !0 && --ga.readyWait > 0 || (xa.resolveWith(Y, [ga]), ga.fn.triggerHandler && (ga(Y).triggerHandler("ready"), ga(Y).off("ready"))))
                        }
                    }), ga.ready.promise = function(a) {
                        return xa || (xa = ga.Deferred(), "complete" === Y.readyState || "loading" !== Y.readyState && !Y.documentElement.doScroll ? b.setTimeout(ga.ready) : (Y.addEventListener("DOMContentLoaded", h), b.addEventListener("load", h))), xa.promise(a)
                    }, ga.ready.promise();
                    var ya = function(a, b, c, d, e, f, g) {
                        var h = 0,
                            i = a.length,
                            j = null == c;
                        if ("object" === ga.type(c)) {
                            e = !0;
                            for (h in c) ya(a, b, h, c[h], !0, f, g)
                        } else if (void 0 !== d && (e = !0, ga.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                            return j.call(ga(a), c)
                        })), b))
                            for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
                        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
                    }, za = function(a) {
                            return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
                        };
                    i.uid = 1, i.prototype = {
                        register: function(a, b) {
                            var c = b || {};
                            return a.nodeType ? a[this.expando] = c : Object.defineProperty(a, this.expando, {
                                value: c,
                                writable: !0,
                                configurable: !0
                            }), a[this.expando]
                        },
                        cache: function(a) {
                            if (!za(a)) return {};
                            var b = a[this.expando];
                            return b || (b = {}, za(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
                                value: b,
                                configurable: !0
                            }))), b
                        },
                        set: function(a, b, c) {
                            var d, e = this.cache(a);
                            if ("string" == typeof b) e[b] = c;
                            else
                                for (d in b) e[d] = b[d];
                            return e
                        },
                        get: function(a, b) {
                            return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][b]
                        },
                        access: function(a, b, c) {
                            var d;
                            return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, ga.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
                        },
                        remove: function(a, b) {
                            var c, d, e, f = a[this.expando];
                            if (void 0 !== f) {
                                if (void 0 === b) this.register(a);
                                else {
                                    ga.isArray(b) ? d = b.concat(b.map(ga.camelCase)) : (e = ga.camelCase(b), b in f ? d = [b, e] : (d = e, d = d in f ? [d] : d.match(wa) || [])), c = d.length;
                                    for (; c--;) delete f[d[c]]
                                }(void 0 === b || ga.isEmptyObject(f)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando])
                            }
                        },
                        hasData: function(a) {
                            var b = a[this.expando];
                            return void 0 !== b && !ga.isEmptyObject(b)
                        }
                    };
                    var Aa = new i,
                        Ba = new i,
                        Ca = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                        Da = /[A-Z]/g;
                    ga.extend({
                        hasData: function(a) {
                            return Ba.hasData(a) || Aa.hasData(a)
                        },
                        data: function(a, b, c) {
                            return Ba.access(a, b, c)
                        },
                        removeData: function(a, b) {
                            Ba.remove(a, b)
                        },
                        _data: function(a, b, c) {
                            return Aa.access(a, b, c)
                        },
                        _removeData: function(a, b) {
                            Aa.remove(a, b)
                        }
                    }), ga.fn.extend({
                        data: function(a, b) {
                            var c, d, e, f = this[0],
                                g = f && f.attributes;
                            if (void 0 === a) {
                                if (this.length && (e = Ba.get(f), 1 === f.nodeType && !Aa.get(f, "hasDataAttrs"))) {
                                    for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = ga.camelCase(d.slice(5)), j(f, d, e[d])));
                                    Aa.set(f, "hasDataAttrs", !0)
                                }
                                return e
                            }
                            return "object" == typeof a ? this.each(function() {
                                Ba.set(this, a)
                            }) : ya(this, function(b) {
                                var c, d;
                                if (f && void 0 === b) {
                                    if (c = Ba.get(f, a) || Ba.get(f, a.replace(Da, "-$&").toLowerCase()), void 0 !== c) return c;
                                    if (d = ga.camelCase(a), c = Ba.get(f, d), void 0 !== c) return c;
                                    if (c = j(f, d, void 0), void 0 !== c) return c
                                } else d = ga.camelCase(a), this.each(function() {
                                    var c = Ba.get(this, d);
                                    Ba.set(this, d, b), a.indexOf("-") > -1 && void 0 !== c && Ba.set(this, a, b)
                                })
                            }, null, b, arguments.length > 1, null, !0)
                        },
                        removeData: function(a) {
                            return this.each(function() {
                                Ba.remove(this, a)
                            })
                        }
                    }), ga.extend({
                        queue: function(a, b, c) {
                            var d;
                            return a ? (b = (b || "fx") + "queue", d = Aa.get(a, b), c && (!d || ga.isArray(c) ? d = Aa.access(a, b, ga.makeArray(c)) : d.push(c)), d || []) : void 0
                        },
                        dequeue: function(a, b) {
                            b = b || "fx";
                            var c = ga.queue(a, b),
                                d = c.length,
                                e = c.shift(),
                                f = ga._queueHooks(a, b),
                                g = function() {
                                    ga.dequeue(a, b)
                                };
                            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
                        },
                        _queueHooks: function(a, b) {
                            var c = b + "queueHooks";
                            return Aa.get(a, c) || Aa.access(a, c, {
                                empty: ga.Callbacks("once memory").add(function() {
                                    Aa.remove(a, [b + "queue", c])
                                })
                            })
                        }
                    }), ga.fn.extend({
                        queue: function(a, b) {
                            var c = 2;
                            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? ga.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                                var c = ga.queue(this, a, b);
                                ga._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && ga.dequeue(this, a)
                            })
                        },
                        dequeue: function(a) {
                            return this.each(function() {
                                ga.dequeue(this, a)
                            })
                        },
                        clearQueue: function(a) {
                            return this.queue(a || "fx", [])
                        },
                        promise: function(a, b) {
                            var c, d = 1,
                                e = ga.Deferred(),
                                f = this,
                                g = this.length,
                                h = function() {
                                    --d || e.resolveWith(f, [f])
                                };
                            for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = Aa.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
                            return h(), e.promise(b)
                        }
                    });
                    var Ea = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                        Fa = new RegExp("^(?:([+-])=|)(" + Ea + ")([a-z%]*)$", "i"),
                        Ga = ["Top", "Right", "Bottom", "Left"],
                        Ha = function(a, b) {
                            return a = b || a, "none" === ga.css(a, "display") || !ga.contains(a.ownerDocument, a)
                        }, Ia = /^(?:checkbox|radio)$/i,
                        Ja = /<([\w:-]+)/,
                        Ka = /^$|\/(?:java|ecma)script/i,
                        La = {
                            option: [1, "<select multiple='multiple'>", "</select>"],
                            thead: [1, "<table>", "</table>"],
                            col: [2, "<table><colgroup>", "</colgroup></table>"],
                            tr: [2, "<table><tbody>", "</tbody></table>"],
                            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                            _default: [0, "", ""]
                        };
                    La.optgroup = La.option, La.tbody = La.tfoot = La.colgroup = La.caption = La.thead, La.th = La.td;
                    var Ma = /<|&#?\w+;/;
                    ! function() {
                        var a = Y.createDocumentFragment(),
                            b = a.appendChild(Y.createElement("div")),
                            c = Y.createElement("input");
                        c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), ea.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", ea.noCloneChecked = !! b.cloneNode(!0).lastChild.defaultValue
                    }();
                    var Na = /^key/,
                        Oa = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                        Pa = /^([^.]*)(?:\.(.+)|)/;
                    ga.event = {
                        global: {},
                        add: function(a, b, c, d, e) {
                            var f, g, h, i, j, k, l, m, n, o, p, q = Aa.get(a);
                            if (q)
                                for (c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = ga.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) {
                                    return "undefined" != typeof ga && ga.event.triggered !== b.type ? ga.event.dispatch.apply(a, arguments) : void 0
                                }), b = (b || "").match(wa) || [""], j = b.length; j--;) h = Pa.exec(b[j]) || [],
                            n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = ga.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = ga.event.special[n] || {}, k = ga.extend({
                                type: n,
                                origType: p,
                                data: d,
                                handler: c,
                                guid: c.guid,
                                selector: e,
                                needsContext: e && ga.expr.match.needsContext.test(e),
                                namespace: o.join(".")
                            }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), ga.event.global[n] = !0)
                        },
                        remove: function(a, b, c, d, e) {
                            var f, g, h, i, j, k, l, m, n, o, p, q = Aa.hasData(a) && Aa.get(a);
                            if (q && (i = q.events)) {
                                for (b = (b || "").match(wa) || [""], j = b.length; j--;)
                                    if (h = Pa.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                                        for (l = ga.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                                        g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || ga.removeEvent(a, n, q.handle), delete i[n])
                                    } else
                                        for (n in i) ga.event.remove(a, n + b[j], c, d, !0);
                                ga.isEmptyObject(i) && Aa.remove(a, "handle events")
                            }
                        },
                        dispatch: function(a) {
                            a = ga.event.fix(a);
                            var b, c, d, e, f, g = [],
                                h = Z.call(arguments),
                                i = (Aa.get(this, "events") || {})[a.type] || [],
                                j = ga.event.special[a.type] || {};
                            if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                                for (g = ga.event.handlers.call(this, a, i), b = 0;
                                    (e = g[b++]) && !a.isPropagationStopped();)
                                    for (a.currentTarget = e.elem, c = 0;
                                        (f = e.handlers[c++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !a.rnamespace.test(f.namespace) || (a.handleObj = f, a.data = f.data, d = ((ga.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                                return j.postDispatch && j.postDispatch.call(this, a), a.result
                            }
                        },
                        handlers: function(a, b) {
                            var c, d, e, f, g = [],
                                h = b.delegateCount,
                                i = a.target;
                            if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1))
                                for (; i !== this; i = i.parentNode || this)
                                    if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                                        for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? ga(e, this).index(i) > -1 : ga.find(e, this, null, [i]).length), d[e] && d.push(f);
                                        d.length && g.push({
                                            elem: i,
                                            handlers: d
                                        })
                                    }
                            return h < b.length && g.push({
                                elem: this,
                                handlers: b.slice(h)
                            }), g
                        },
                        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                        fixHooks: {},
                        keyHooks: {
                            props: "char charCode key keyCode".split(" "),
                            filter: function(a, b) {
                                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
                            }
                        },
                        mouseHooks: {
                            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                            filter: function(a, b) {
                                var c, d, e, f = b.button;
                                return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || Y, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
                            }
                        },
                        fix: function(a) {
                            if (a[ga.expando]) return a;
                            var b, c, d, e = a.type,
                                f = a,
                                g = this.fixHooks[e];
                            for (g || (this.fixHooks[e] = g = Oa.test(e) ? this.mouseHooks : Na.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new ga.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
                            return a.target || (a.target = Y), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
                        },
                        special: {
                            load: {
                                noBubble: !0
                            },
                            focus: {
                                trigger: function() {
                                    return this !== q() && this.focus ? (this.focus(), !1) : void 0
                                },
                                delegateType: "focusin"
                            },
                            blur: {
                                trigger: function() {
                                    return this === q() && this.blur ? (this.blur(), !1) : void 0
                                },
                                delegateType: "focusout"
                            },
                            click: {
                                trigger: function() {
                                    return "checkbox" === this.type && this.click && ga.nodeName(this, "input") ? (this.click(), !1) : void 0
                                },
                                _default: function(a) {
                                    return ga.nodeName(a.target, "a")
                                }
                            },
                            beforeunload: {
                                postDispatch: function(a) {
                                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                                }
                            }
                        }
                    }, ga.removeEvent = function(a, b, c) {
                        a.removeEventListener && a.removeEventListener(b, c)
                    }, ga.Event = function(a, b) {
                        return this instanceof ga.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? o : p) : this.type = a, b && ga.extend(this, b), this.timeStamp = a && a.timeStamp || ga.now(), void(this[ga.expando] = !0)) : new ga.Event(a, b)
                    }, ga.Event.prototype = {
                        constructor: ga.Event,
                        isDefaultPrevented: p,
                        isPropagationStopped: p,
                        isImmediatePropagationStopped: p,
                        preventDefault: function() {
                            var a = this.originalEvent;
                            this.isDefaultPrevented = o, a && a.preventDefault()
                        },
                        stopPropagation: function() {
                            var a = this.originalEvent;
                            this.isPropagationStopped = o, a && a.stopPropagation()
                        },
                        stopImmediatePropagation: function() {
                            var a = this.originalEvent;
                            this.isImmediatePropagationStopped = o, a && a.stopImmediatePropagation(), this.stopPropagation()
                        }
                    }, ga.each({
                        mouseenter: "mouseover",
                        mouseleave: "mouseout",
                        pointerenter: "pointerover",
                        pointerleave: "pointerout"
                    }, function(a, b) {
                        ga.event.special[a] = {
                            delegateType: b,
                            bindType: b,
                            handle: function(a) {
                                var c, d = this,
                                    e = a.relatedTarget,
                                    f = a.handleObj;
                                return e && (e === d || ga.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
                            }
                        }
                    }), ga.fn.extend({
                        on: function(a, b, c, d) {
                            return r(this, a, b, c, d)
                        },
                        one: function(a, b, c, d) {
                            return r(this, a, b, c, d, 1)
                        },
                        off: function(a, b, c) {
                            var d, e;
                            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, ga(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                            if ("object" == typeof a) {
                                for (e in a) this.off(e, b, a[e]);
                                return this
                            }
                            return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = p), this.each(function() {
                                ga.event.remove(this, a, c, b)
                            })
                        }
                    });
                    var Qa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
                        Ra = /<script|<style|<link/i,
                        Sa = /checked\s*(?:[^=]|=\s*.checked.)/i,
                        Ta = /^true\/(.*)/,
                        Ua = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
                    ga.extend({
                        htmlPrefilter: function(a) {
                            return a.replace(Qa, "<$1></$2>")
                        },
                        clone: function(a, b, c) {
                            var d, e, f, g, h = a.cloneNode(!0),
                                i = ga.contains(a.ownerDocument, a);
                            if (!(ea.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ga.isXMLDoc(a)))
                                for (g = l(h), f = l(a), d = 0, e = f.length; e > d; d++) w(f[d], g[d]);
                            if (b)
                                if (c)
                                    for (f = f || l(a), g = g || l(h), d = 0, e = f.length; e > d; d++) v(f[d], g[d]);
                                else v(a, h);
                            return g = l(h, "script"), g.length > 0 && m(g, !i && l(a, "script")), h
                        },
                        cleanData: function(a) {
                            for (var b, c, d, e = ga.event.special, f = 0; void 0 !== (c = a[f]); f++)
                                if (za(c)) {
                                    if (b = c[Aa.expando]) {
                                        if (b.events)
                                            for (d in b.events) e[d] ? ga.event.remove(c, d) : ga.removeEvent(c, d, b.handle);
                                        c[Aa.expando] = void 0
                                    }
                                    c[Ba.expando] && (c[Ba.expando] = void 0)
                                }
                        }
                    }), ga.fn.extend({
                        domManip: x,
                        detach: function(a) {
                            return y(this, a, !0)
                        },
                        remove: function(a) {
                            return y(this, a)
                        },
                        text: function(a) {
                            return ya(this, function(a) {
                                return void 0 === a ? ga.text(this) : this.empty().each(function() {
                                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a)
                                })
                            }, null, a, arguments.length)
                        },
                        append: function() {
                            return x(this, arguments, function(a) {
                                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                    var b = s(this, a);
                                    b.appendChild(a)
                                }
                            })
                        },
                        prepend: function() {
                            return x(this, arguments, function(a) {
                                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                    var b = s(this, a);
                                    b.insertBefore(a, b.firstChild)
                                }
                            })
                        },
                        before: function() {
                            return x(this, arguments, function(a) {
                                this.parentNode && this.parentNode.insertBefore(a, this)
                            })
                        },
                        after: function() {
                            return x(this, arguments, function(a) {
                                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                            })
                        },
                        empty: function() {
                            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (ga.cleanData(l(a, !1)), a.textContent = "");
                            return this
                        },
                        clone: function(a, b) {
                            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                                return ga.clone(this, a, b)
                            })
                        },
                        html: function(a) {
                            return ya(this, function(a) {
                                var b = this[0] || {}, c = 0,
                                    d = this.length;
                                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                                if ("string" == typeof a && !Ra.test(a) && !La[(Ja.exec(a) || ["", ""])[1].toLowerCase()]) {
                                    a = ga.htmlPrefilter(a);
                                    try {
                                        for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (ga.cleanData(l(b, !1)), b.innerHTML = a);
                                        b = 0
                                    } catch (e) {}
                                }
                                b && this.empty().append(a)
                            }, null, a, arguments.length)
                        },
                        replaceWith: function() {
                            var a = [];
                            return x(this, arguments, function(b) {
                                var c = this.parentNode;
                                ga.inArray(this, a) < 0 && (ga.cleanData(l(this)), c && c.replaceChild(b, this))
                            }, a)
                        }
                    }), ga.each({
                        appendTo: "append",
                        prependTo: "prepend",
                        insertBefore: "before",
                        insertAfter: "after",
                        replaceAll: "replaceWith"
                    }, function(a, b) {
                        ga.fn[a] = function(a) {
                            for (var c, d = [], e = ga(a), f = e.length - 1, g = 0; f >= g; g++) c = g === f ? this : this.clone(!0), ga(e[g])[b](c), _.apply(d, c.get());
                            return this.pushStack(d)
                        }
                    });
                    var Va, Wa = {
                            HTML: "block",
                            BODY: "block"
                        }, Xa = /^margin/,
                        Ya = new RegExp("^(" + Ea + ")(?!px)[a-z%]+$", "i"),
                        Za = function(a) {
                            var c = a.ownerDocument.defaultView;
                            return c && c.opener || (c = b), c.getComputedStyle(a)
                        }, $a = function(a, b, c, d) {
                            var e, f, g = {};
                            for (f in b) g[f] = a.style[f], a.style[f] = b[f];
                            e = c.apply(a, d || []);
                            for (f in b) a.style[f] = g[f];
                            return e
                        }, _a = Y.documentElement;
                    ! function() {
                        function a() {
                            h.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", h.innerHTML = "", _a.appendChild(g);
                            var a = b.getComputedStyle(h);
                            c = "1%" !== a.top, f = "2px" === a.marginLeft, d = "4px" === a.width, h.style.marginRight = "50%", e = "4px" === a.marginRight, _a.removeChild(g)
                        }
                        var c, d, e, f, g = Y.createElement("div"),
                            h = Y.createElement("div");
                        h.style && (h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", ea.clearCloneStyle = "content-box" === h.style.backgroundClip, g.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", g.appendChild(h), ga.extend(ea, {
                            pixelPosition: function() {
                                return a(), c
                            },
                            boxSizingReliable: function() {
                                return null == d && a(), d
                            },
                            pixelMarginRight: function() {
                                return null == d && a(), e
                            },
                            reliableMarginLeft: function() {
                                return null == d && a(), f
                            },
                            reliableMarginRight: function() {
                                var a, c = h.appendChild(Y.createElement("div"));
                                return c.style.cssText = h.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", h.style.width = "1px", _a.appendChild(g), a = !parseFloat(b.getComputedStyle(c).marginRight), _a.removeChild(g), h.removeChild(c), a
                            }
                        }))
                    }();
                    var ab = /^(none|table(?!-c[ea]).+)/,
                        bb = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        }, cb = {
                            letterSpacing: "0",
                            fontWeight: "400"
                        }, db = ["Webkit", "O", "Moz", "ms"],
                        eb = Y.createElement("div").style;
                    ga.extend({
                        cssHooks: {
                            opacity: {
                                get: function(a, b) {
                                    if (b) {
                                        var c = B(a, "opacity");
                                        return "" === c ? "1" : c
                                    }
                                }
                            }
                        },
                        cssNumber: {
                            animationIterationCount: !0,
                            columnCount: !0,
                            fillOpacity: !0,
                            flexGrow: !0,
                            flexShrink: !0,
                            fontWeight: !0,
                            lineHeight: !0,
                            opacity: !0,
                            order: !0,
                            orphans: !0,
                            widows: !0,
                            zIndex: !0,
                            zoom: !0
                        },
                        cssProps: {
                            "float": "cssFloat"
                        },
                        style: function(a, b, c, d) {
                            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                                var e, f, g, h = ga.camelCase(b),
                                    i = a.style;
                                return b = ga.cssProps[h] || (ga.cssProps[h] = D(h) || h), g = ga.cssHooks[b] || ga.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Fa.exec(c)) && e[1] && (c = k(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (ga.cssNumber[h] ? "" : "px")), ea.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0)
                            }
                        },
                        css: function(a, b, c, d) {
                            var e, f, g, h = ga.camelCase(b);
                            return b = ga.cssProps[h] || (ga.cssProps[h] = D(h) || h), g = ga.cssHooks[b] || ga.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = B(a, b, d)), "normal" === e && b in cb && (e = cb[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e
                        }
                    }), ga.each(["height", "width"], function(a, b) {
                        ga.cssHooks[b] = {
                            get: function(a, c, d) {
                                return c ? ab.test(ga.css(a, "display")) && 0 === a.offsetWidth ? $a(a, bb, function() {
                                    return G(a, b, d)
                                }) : G(a, b, d) : void 0
                            },
                            set: function(a, c, d) {
                                var e, f = d && Za(a),
                                    g = d && F(a, b, d, "border-box" === ga.css(a, "boxSizing", !1, f), f);
                                return g && (e = Fa.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = ga.css(a, b)), E(a, c, g)
                            }
                        }
                    }), ga.cssHooks.marginLeft = C(ea.reliableMarginLeft, function(a, b) {
                        return b ? (parseFloat(B(a, "marginLeft")) || a.getBoundingClientRect().left - $a(a, {
                            marginLeft: 0
                        }, function() {
                            return a.getBoundingClientRect().left
                        })) + "px" : void 0
                    }), ga.cssHooks.marginRight = C(ea.reliableMarginRight, function(a, b) {
                        return b ? $a(a, {
                            display: "inline-block"
                        }, B, [a, "marginRight"]) : void 0
                    }), ga.each({
                        margin: "",
                        padding: "",
                        border: "Width"
                    }, function(a, b) {
                        ga.cssHooks[a + b] = {
                            expand: function(c) {
                                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + Ga[d] + b] = f[d] || f[d - 2] || f[0];
                                return e
                            }
                        }, Xa.test(a) || (ga.cssHooks[a + b].set = E)
                    }), ga.fn.extend({
                        css: function(a, b) {
                            return ya(this, function(a, b, c) {
                                var d, e, f = {}, g = 0;
                                if (ga.isArray(b)) {
                                    for (d = Za(a), e = b.length; e > g; g++) f[b[g]] = ga.css(a, b[g], !1, d);
                                    return f
                                }
                                return void 0 !== c ? ga.style(a, b, c) : ga.css(a, b)
                            }, a, b, arguments.length > 1)
                        },
                        show: function() {
                            return H(this, !0)
                        },
                        hide: function() {
                            return H(this)
                        },
                        toggle: function(a) {
                            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                                Ha(this) ? ga(this).show() : ga(this).hide()
                            })
                        }
                    }), ga.Tween = I, I.prototype = {
                        constructor: I,
                        init: function(a, b, c, d, e, f) {
                            this.elem = a, this.prop = c, this.easing = e || ga.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (ga.cssNumber[c] ? "" : "px")
                        },
                        cur: function() {
                            var a = I.propHooks[this.prop];
                            return a && a.get ? a.get(this) : I.propHooks._default.get(this)
                        },
                        run: function(a) {
                            var b, c = I.propHooks[this.prop];
                            return this.options.duration ? this.pos = b = ga.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : I.propHooks._default.set(this), this
                        }
                    }, I.prototype.init.prototype = I.prototype, I.propHooks = {
                        _default: {
                            get: function(a) {
                                var b;
                                return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = ga.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0)
                            },
                            set: function(a) {
                                ga.fx.step[a.prop] ? ga.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[ga.cssProps[a.prop]] && !ga.cssHooks[a.prop] ? a.elem[a.prop] = a.now : ga.style(a.elem, a.prop, a.now + a.unit)
                            }
                        }
                    }, I.propHooks.scrollTop = I.propHooks.scrollLeft = {
                        set: function(a) {
                            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
                        }
                    }, ga.easing = {
                        linear: function(a) {
                            return a
                        },
                        swing: function(a) {
                            return .5 - Math.cos(a * Math.PI) / 2
                        },
                        _default: "swing"
                    }, ga.fx = I.prototype.init, ga.fx.step = {};
                    var fb, gb, hb = /^(?:toggle|show|hide)$/,
                        ib = /queueHooks$/;
                    ga.Animation = ga.extend(O, {
                        tweeners: {
                            "*": [
                                function(a, b) {
                                    var c = this.createTween(a, b);
                                    return k(c.elem, a, Fa.exec(b), c), c
                                }
                            ]
                        },
                        tweener: function(a, b) {
                            ga.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(wa);
                            for (var c, d = 0, e = a.length; e > d; d++) c = a[d], O.tweeners[c] = O.tweeners[c] || [], O.tweeners[c].unshift(b)
                        },
                        prefilters: [M],
                        prefilter: function(a, b) {
                            b ? O.prefilters.unshift(a) : O.prefilters.push(a)
                        }
                    }), ga.speed = function(a, b, c) {
                        var d = a && "object" == typeof a ? ga.extend({}, a) : {
                            complete: c || !c && b || ga.isFunction(a) && a,
                            duration: a,
                            easing: c && b || b && !ga.isFunction(b) && b
                        };
                        return d.duration = ga.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in ga.fx.speeds ? ga.fx.speeds[d.duration] : ga.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                            ga.isFunction(d.old) && d.old.call(this), d.queue && ga.dequeue(this, d.queue)
                        }, d
                    }, ga.fn.extend({
                        fadeTo: function(a, b, c, d) {
                            return this.filter(Ha).css("opacity", 0).show().end().animate({
                                opacity: b
                            }, a, c, d)
                        },
                        animate: function(a, b, c, d) {
                            var e = ga.isEmptyObject(a),
                                f = ga.speed(b, c, d),
                                g = function() {
                                    var b = O(this, ga.extend({}, a), f);
                                    (e || Aa.get(this, "finish")) && b.stop(!0)
                                };
                            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
                        },
                        stop: function(a, b, c) {
                            var d = function(a) {
                                var b = a.stop;
                                delete a.stop, b(c)
                            };
                            return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                                var b = !0,
                                    e = null != a && a + "queueHooks",
                                    f = ga.timers,
                                    g = Aa.get(this);
                                if (e) g[e] && g[e].stop && d(g[e]);
                                else
                                    for (e in g) g[e] && g[e].stop && ib.test(e) && d(g[e]);
                                for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                                !b && c || ga.dequeue(this, a)
                            })
                        },
                        finish: function(a) {
                            return a !== !1 && (a = a || "fx"), this.each(function() {
                                var b, c = Aa.get(this),
                                    d = c[a + "queue"],
                                    e = c[a + "queueHooks"],
                                    f = ga.timers,
                                    g = d ? d.length : 0;
                                for (c.finish = !0, ga.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                                delete c.finish
                            })
                        }
                    }), ga.each(["toggle", "show", "hide"], function(a, b) {
                        var c = ga.fn[b];
                        ga.fn[b] = function(a, d, e) {
                            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(K(b, !0), a, d, e)
                        }
                    }), ga.each({
                        slideDown: K("show"),
                        slideUp: K("hide"),
                        slideToggle: K("toggle"),
                        fadeIn: {
                            opacity: "show"
                        },
                        fadeOut: {
                            opacity: "hide"
                        },
                        fadeToggle: {
                            opacity: "toggle"
                        }
                    }, function(a, b) {
                        ga.fn[a] = function(a, c, d) {
                            return this.animate(b, a, c, d)
                        }
                    }), ga.timers = [], ga.fx.tick = function() {
                        var a, b = 0,
                            c = ga.timers;
                        for (fb = ga.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
                        c.length || ga.fx.stop(), fb = void 0
                    }, ga.fx.timer = function(a) {
                        ga.timers.push(a), a() ? ga.fx.start() : ga.timers.pop()
                    }, ga.fx.interval = 13, ga.fx.start = function() {
                        gb || (gb = b.setInterval(ga.fx.tick, ga.fx.interval))
                    }, ga.fx.stop = function() {
                        b.clearInterval(gb), gb = null
                    }, ga.fx.speeds = {
                        slow: 600,
                        fast: 200,
                        _default: 400
                    }, ga.fn.delay = function(a, c) {
                        return a = ga.fx ? ga.fx.speeds[a] || a : a, c = c || "fx", this.queue(c, function(c, d) {
                            var e = b.setTimeout(c, a);
                            d.stop = function() {
                                b.clearTimeout(e)
                            }
                        })
                    },
                    function() {
                        var a = Y.createElement("input"),
                            b = Y.createElement("select"),
                            c = b.appendChild(Y.createElement("option"));
                        a.type = "checkbox", ea.checkOn = "" !== a.value, ea.optSelected = c.selected, b.disabled = !0, ea.optDisabled = !c.disabled, a = Y.createElement("input"), a.value = "t", a.type = "radio", ea.radioValue = "t" === a.value
                    }();
                    var jb, kb = ga.expr.attrHandle;
                    ga.fn.extend({
                        attr: function(a, b) {
                            return ya(this, ga.attr, a, b, arguments.length > 1)
                        },
                        removeAttr: function(a) {
                            return this.each(function() {
                                ga.removeAttr(this, a)
                            })
                        }
                    }), ga.extend({
                        attr: function(a, b, c) {
                            var d, e, f = a.nodeType;
                            if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? ga.prop(a, b, c) : (1 === f && ga.isXMLDoc(a) || (b = b.toLowerCase(), e = ga.attrHooks[b] || (ga.expr.match.bool.test(b) ? jb : void 0)), void 0 !== c ? null === c ? void ga.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = ga.find.attr(a, b), null == d ? void 0 : d))
                        },
                        attrHooks: {
                            type: {
                                set: function(a, b) {
                                    if (!ea.radioValue && "radio" === b && ga.nodeName(a, "input")) {
                                        var c = a.value;
                                        return a.setAttribute("type", b), c && (a.value = c), b
                                    }
                                }
                            }
                        },
                        removeAttr: function(a, b) {
                            var c, d, e = 0,
                                f = b && b.match(wa);
                            if (f && 1 === a.nodeType)
                                for (; c = f[e++];) d = ga.propFix[c] || c, ga.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
                        }
                    }), jb = {
                        set: function(a, b, c) {
                            return b === !1 ? ga.removeAttr(a, c) : a.setAttribute(c, c), c
                        }
                    }, ga.each(ga.expr.match.bool.source.match(/\w+/g), function(a, b) {
                        var c = kb[b] || ga.find.attr;
                        kb[b] = function(a, b, d) {
                            var e, f;
                            return d || (f = kb[b], kb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, kb[b] = f), e
                        }
                    });
                    var lb = /^(?:input|select|textarea|button)$/i,
                        mb = /^(?:a|area)$/i;
                    ga.fn.extend({
                        prop: function(a, b) {
                            return ya(this, ga.prop, a, b, arguments.length > 1)
                        },
                        removeProp: function(a) {
                            return this.each(function() {
                                delete this[ga.propFix[a] || a]
                            })
                        }
                    }), ga.extend({
                        prop: function(a, b, c) {
                            var d, e, f = a.nodeType;
                            if (3 !== f && 8 !== f && 2 !== f) return 1 === f && ga.isXMLDoc(a) || (b = ga.propFix[b] || b, e = ga.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
                        },
                        propHooks: {
                            tabIndex: {
                                get: function(a) {
                                    var b = ga.find.attr(a, "tabindex");
                                    return b ? parseInt(b, 10) : lb.test(a.nodeName) || mb.test(a.nodeName) && a.href ? 0 : -1
                                }
                            }
                        },
                        propFix: {
                            "for": "htmlFor",
                            "class": "className"
                        }
                    }), ea.optSelected || (ga.propHooks.selected = {
                        get: function(a) {
                            var b = a.parentNode;
                            return b && b.parentNode && b.parentNode.selectedIndex, null
                        },
                        set: function(a) {
                            var b = a.parentNode;
                            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
                        }
                    }), ga.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                        ga.propFix[this.toLowerCase()] = this
                    });
                    var nb = /[\t\r\n\f]/g;
                    ga.fn.extend({
                        addClass: function(a) {
                            var b, c, d, e, f, g, h, i = 0;
                            if (ga.isFunction(a)) return this.each(function(b) {
                                ga(this).addClass(a.call(this, b, P(this)))
                            });
                            if ("string" == typeof a && a)
                                for (b = a.match(wa) || []; c = this[i++];)
                                    if (e = P(c), d = 1 === c.nodeType && (" " + e + " ").replace(nb, " ")) {
                                        for (g = 0; f = b[g++];) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                                        h = ga.trim(d), e !== h && c.setAttribute("class", h)
                                    }
                            return this
                        },
                        removeClass: function(a) {
                            var b, c, d, e, f, g, h, i = 0;
                            if (ga.isFunction(a)) return this.each(function(b) {
                                ga(this).removeClass(a.call(this, b, P(this)))
                            });
                            if (!arguments.length) return this.attr("class", "");
                            if ("string" == typeof a && a)
                                for (b = a.match(wa) || []; c = this[i++];)
                                    if (e = P(c), d = 1 === c.nodeType && (" " + e + " ").replace(nb, " ")) {
                                        for (g = 0; f = b[g++];)
                                            for (; d.indexOf(" " + f + " ") > -1;) d = d.replace(" " + f + " ", " ");
                                        h = ga.trim(d), e !== h && c.setAttribute("class", h)
                                    }
                            return this
                        },
                        toggleClass: function(a, b) {
                            var c = typeof a;
                            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : ga.isFunction(a) ? this.each(function(c) {
                                ga(this).toggleClass(a.call(this, c, P(this), b), b)
                            }) : this.each(function() {
                                var b, d, e, f;
                                if ("string" === c)
                                    for (d = 0, e = ga(this), f = a.match(wa) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                                else void 0 !== a && "boolean" !== c || (b = P(this), b && Aa.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : Aa.get(this, "__className__") || ""))
                            })
                        },
                        hasClass: function(a) {
                            var b, c, d = 0;
                            for (b = " " + a + " "; c = this[d++];)
                                if (1 === c.nodeType && (" " + P(c) + " ").replace(nb, " ").indexOf(b) > -1) return !0;
                            return !1
                        }
                    });
                    var ob = /\r/g,
                        pb = /[\x20\t\r\n\f]+/g;
                    ga.fn.extend({
                        val: function(a) {
                            var b, c, d, e = this[0]; {
                                if (arguments.length) return d = ga.isFunction(a), this.each(function(c) {
                                    var e;
                                    1 === this.nodeType && (e = d ? a.call(this, c, ga(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : ga.isArray(e) && (e = ga.map(e, function(a) {
                                        return null == a ? "" : a + ""
                                    })), b = ga.valHooks[this.type] || ga.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                                });
                                if (e) return b = ga.valHooks[e.type] || ga.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(ob, "") : null == c ? "" : c)
                            }
                        }
                    }), ga.extend({
                        valHooks: {
                            option: {
                                get: function(a) {
                                    var b = ga.find.attr(a, "value");
                                    return null != b ? b : ga.trim(ga.text(a)).replace(pb, " ")
                                }
                            },
                            select: {
                                get: function(a) {
                                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                                        if (c = d[i], (c.selected || i === e) && (ea.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !ga.nodeName(c.parentNode, "optgroup"))) {
                                            if (b = ga(c).val(), f) return b;
                                            g.push(b)
                                        }
                                    return g
                                },
                                set: function(a, b) {
                                    for (var c, d, e = a.options, f = ga.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = ga.inArray(ga.valHooks.option.get(d), f) > -1) && (c = !0);
                                    return c || (a.selectedIndex = -1), f
                                }
                            }
                        }
                    }), ga.each(["radio", "checkbox"], function() {
                        ga.valHooks[this] = {
                            set: function(a, b) {
                                return ga.isArray(b) ? a.checked = ga.inArray(ga(a).val(), b) > -1 : void 0
                            }
                        }, ea.checkOn || (ga.valHooks[this].get = function(a) {
                            return null === a.getAttribute("value") ? "on" : a.value
                        })
                    });
                    var qb = /^(?:focusinfocus|focusoutblur)$/;
                    ga.extend(ga.event, {
                        trigger: function(a, c, d, e) {
                            var f, g, h, i, j, k, l, m = [d || Y],
                                n = da.call(a, "type") ? a.type : a,
                                o = da.call(a, "namespace") ? a.namespace.split(".") : [];
                            if (g = h = d = d || Y, 3 !== d.nodeType && 8 !== d.nodeType && !qb.test(n + ga.event.triggered) && (n.indexOf(".") > -1 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, a = a[ga.expando] ? a : new ga.Event(n, "object" == typeof a && a), a.isTrigger = e ? 2 : 3, a.namespace = o.join("."), a.rnamespace = a.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, a.result = void 0, a.target || (a.target = d), c = null == c ? [a] : ga.makeArray(c, [a]), l = ga.event.special[n] || {}, e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
                                if (!e && !l.noBubble && !ga.isWindow(d)) {
                                    for (i = l.delegateType || n, qb.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), h = g;
                                    h === (d.ownerDocument || Y) && m.push(h.defaultView || h.parentWindow || b)
                                }
                                for (f = 0;
                                    (g = m[f++]) && !a.isPropagationStopped();) a.type = f > 1 ? i : l.bindType || n, k = (Aa.get(g, "events") || {})[a.type] && Aa.get(g, "handle"), k && k.apply(g, c), k = j && g[j], k && k.apply && za(g) && (a.result = k.apply(g, c), a.result === !1 && a.preventDefault());
                                return a.type = n, e || a.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !za(d) || j && ga.isFunction(d[n]) && !ga.isWindow(d) && (h = d[j], h && (d[j] = null), ga.event.triggered = n, d[n](), ga.event.triggered = void 0, h && (d[j] = h)), a.result
                            }
                        },
                        simulate: function(a, b, c) {
                            var d = ga.extend(new ga.Event, c, {
                                type: a,
                                isSimulated: !0
                            });
                            ga.event.trigger(d, null, b), d.isDefaultPrevented() && c.preventDefault()
                        }
                    }), ga.fn.extend({
                        trigger: function(a, b) {
                            return this.each(function() {
                                ga.event.trigger(a, b, this)
                            })
                        },
                        triggerHandler: function(a, b) {
                            var c = this[0];
                            return c ? ga.event.trigger(a, b, c, !0) : void 0
                        }
                    }), ga.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
                        ga.fn[b] = function(a, c) {
                            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
                        }
                    }), ga.fn.extend({
                        hover: function(a, b) {
                            return this.mouseenter(a).mouseleave(b || a)
                        }
                    }), ea.focusin = "onfocusin" in b, ea.focusin || ga.each({
                        focus: "focusin",
                        blur: "focusout"
                    }, function(a, b) {
                        var c = function(a) {
                            ga.event.simulate(b, a.target, ga.event.fix(a))
                        };
                        ga.event.special[b] = {
                            setup: function() {
                                var d = this.ownerDocument || this,
                                    e = Aa.access(d, b);
                                e || d.addEventListener(a, c, !0), Aa.access(d, b, (e || 0) + 1)
                            },
                            teardown: function() {
                                var d = this.ownerDocument || this,
                                    e = Aa.access(d, b) - 1;
                                e ? Aa.access(d, b, e) : (d.removeEventListener(a, c, !0), Aa.remove(d, b))
                            }
                        }
                    });
                    var rb = b.location,
                        sb = ga.now(),
                        tb = /\?/;
                    ga.parseJSON = function(a) {
                        return JSON.parse(a + "")
                    }, ga.parseXML = function(a) {
                        var c;
                        if (!a || "string" != typeof a) return null;
                        try {
                            c = (new b.DOMParser).parseFromString(a, "text/xml")
                        } catch (d) {
                            c = void 0
                        }
                        return c && !c.getElementsByTagName("parsererror").length || ga.error("Invalid XML: " + a), c
                    };
                    var ub = /#.*$/,
                        vb = /([?&])_=[^&]*/,
                        wb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                        xb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                        yb = /^(?:GET|HEAD)$/,
                        zb = /^\/\//,
                        Ab = {}, Bb = {}, Cb = "*/".concat("*"),
                        Db = Y.createElement("a");
                    Db.href = rb.href, ga.extend({
                        active: 0,
                        lastModified: {},
                        etag: {},
                        ajaxSettings: {
                            url: rb.href,
                            type: "GET",
                            isLocal: xb.test(rb.protocol),
                            global: !0,
                            processData: !0,
                            async: !0,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            accepts: {
                                "*": Cb,
                                text: "text/plain",
                                html: "text/html",
                                xml: "application/xml, text/xml",
                                json: "application/json, text/javascript"
                            },
                            contents: {
                                xml: /\bxml\b/,
                                html: /\bhtml/,
                                json: /\bjson\b/
                            },
                            responseFields: {
                                xml: "responseXML",
                                text: "responseText",
                                json: "responseJSON"
                            },
                            converters: {
                                "* text": String,
                                "text html": !0,
                                "text json": ga.parseJSON,
                                "text xml": ga.parseXML
                            },
                            flatOptions: {
                                url: !0,
                                context: !0
                            }
                        },
                        ajaxSetup: function(a, b) {
                            return b ? S(S(a, ga.ajaxSettings), b) : S(ga.ajaxSettings, a)
                        },
                        ajaxPrefilter: Q(Ab),
                        ajaxTransport: Q(Bb),
                        ajax: function(a, c) {
                            function d(a, c, d, h) {
                                var j, l, s, t, v, x = c;
                                2 !== u && (u = 2, i && b.clearTimeout(i), e = void 0, g = h || "", w.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, d && (t = T(m, w, d)), t = U(m, t, w, j), j ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && (ga.lastModified[f] = v), v = w.getResponseHeader("etag"), v && (ga.etag[f] = v)), 204 === a || "HEAD" === m.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = t.state, l = t.data, s = t.error, j = !s)) : (s = x, !a && x || (x = "error", 0 > a && (a = 0))), w.status = a, w.statusText = (c || x) + "", j ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = void 0, k && o.trigger(j ? "ajaxSuccess" : "ajaxError", [w, m, j ? l : s]), q.fireWith(n, [w, x]), k && (o.trigger("ajaxComplete", [w, m]), --ga.active || ga.event.trigger("ajaxStop")))
                            }
                            "object" == typeof a && (c = a, a = void 0), c = c || {};
                            var e, f, g, h, i, j, k, l, m = ga.ajaxSetup({}, c),
                                n = m.context || m,
                                o = m.context && (n.nodeType || n.jquery) ? ga(n) : ga.event,
                                p = ga.Deferred(),
                                q = ga.Callbacks("once memory"),
                                r = m.statusCode || {}, s = {}, t = {}, u = 0,
                                v = "canceled",
                                w = {
                                    readyState: 0,
                                    getResponseHeader: function(a) {
                                        var b;
                                        if (2 === u) {
                                            if (!h)
                                                for (h = {}; b = wb.exec(g);) h[b[1].toLowerCase()] = b[2];
                                            b = h[a.toLowerCase()]
                                        }
                                        return null == b ? null : b
                                    },
                                    getAllResponseHeaders: function() {
                                        return 2 === u ? g : null
                                    },
                                    setRequestHeader: function(a, b) {
                                        var c = a.toLowerCase();
                                        return u || (a = t[c] = t[c] || a, s[a] = b), this
                                    },
                                    overrideMimeType: function(a) {
                                        return u || (m.mimeType = a), this
                                    },
                                    statusCode: function(a) {
                                        var b;
                                        if (a)
                                            if (2 > u)
                                                for (b in a) r[b] = [r[b], a[b]];
                                            else w.always(a[w.status]);
                                        return this
                                    },
                                    abort: function(a) {
                                        var b = a || v;
                                        return e && e.abort(b), d(0, b), this
                                    }
                                };
                            if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, m.url = ((a || m.url || rb.href) + "").replace(ub, "").replace(zb, rb.protocol + "//"), m.type = c.method || c.type || m.method || m.type, m.dataTypes = ga.trim(m.dataType || "*").toLowerCase().match(wa) || [""], null == m.crossDomain) {
                                j = Y.createElement("a");
                                try {
                                    j.href = m.url, j.href = j.href, m.crossDomain = Db.protocol + "//" + Db.host != j.protocol + "//" + j.host
                                } catch (x) {
                                    m.crossDomain = !0
                                }
                            }
                            if (m.data && m.processData && "string" != typeof m.data && (m.data = ga.param(m.data, m.traditional)), R(Ab, m, c, w), 2 === u) return w;
                            k = ga.event && m.global, k && 0 === ga.active++ && ga.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !yb.test(m.type), f = m.url, m.hasContent || (m.data && (f = m.url += (tb.test(f) ? "&" : "?") + m.data, delete m.data), m.cache === !1 && (m.url = vb.test(f) ? f.replace(vb, "$1_=" + sb++) : f + (tb.test(f) ? "&" : "?") + "_=" + sb++)), m.ifModified && (ga.lastModified[f] && w.setRequestHeader("If-Modified-Since", ga.lastModified[f]), ga.etag[f] && w.setRequestHeader("If-None-Match", ga.etag[f])), (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Cb + "; q=0.01" : "") : m.accepts["*"]);
                            for (l in m.headers) w.setRequestHeader(l, m.headers[l]);
                            if (m.beforeSend && (m.beforeSend.call(n, w, m) === !1 || 2 === u)) return w.abort();
                            v = "abort";
                            for (l in {
                                success: 1,
                                error: 1,
                                complete: 1
                            }) w[l](m[l]);
                            if (e = R(Bb, m, c, w)) {
                                if (w.readyState = 1, k && o.trigger("ajaxSend", [w, m]), 2 === u) return w;
                                m.async && m.timeout > 0 && (i = b.setTimeout(function() {
                                    w.abort("timeout")
                                }, m.timeout));
                                try {
                                    u = 1, e.send(s, d)
                                } catch (x) {
                                    if (!(2 > u)) throw x;
                                    d(-1, x)
                                }
                            } else d(-1, "No Transport");
                            return w
                        },
                        getJSON: function(a, b, c) {
                            return ga.get(a, b, c, "json")
                        },
                        getScript: function(a, b) {
                            return ga.get(a, void 0, b, "script")
                        }
                    }), ga.each(["get", "post"], function(a, b) {
                        ga[b] = function(a, c, d, e) {
                            return ga.isFunction(c) && (e = e || d, d = c, c = void 0), ga.ajax(ga.extend({
                                url: a,
                                type: b,
                                dataType: e,
                                data: c,
                                success: d
                            }, ga.isPlainObject(a) && a))
                        }
                    }), ga._evalUrl = function(a) {
                        return ga.ajax({
                            url: a,
                            type: "GET",
                            dataType: "script",
                            async: !1,
                            global: !1,
                            "throws": !0
                        })
                    }, ga.fn.extend({
                        wrapAll: function(a) {
                            var b;
                            return ga.isFunction(a) ? this.each(function(b) {
                                ga(this).wrapAll(a.call(this, b))
                            }) : (this[0] && (b = ga(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                                for (var a = this; a.firstElementChild;) a = a.firstElementChild;
                                return a
                            }).append(this)), this)
                        },
                        wrapInner: function(a) {
                            return ga.isFunction(a) ? this.each(function(b) {
                                ga(this).wrapInner(a.call(this, b))
                            }) : this.each(function() {
                                var b = ga(this),
                                    c = b.contents();
                                c.length ? c.wrapAll(a) : b.append(a)
                            })
                        },
                        wrap: function(a) {
                            var b = ga.isFunction(a);
                            return this.each(function(c) {
                                ga(this).wrapAll(b ? a.call(this, c) : a)
                            })
                        },
                        unwrap: function() {
                            return this.parent().each(function() {
                                ga.nodeName(this, "body") || ga(this).replaceWith(this.childNodes)
                            }).end()
                        }
                    }), ga.expr.filters.hidden = function(a) {
                        return !ga.expr.filters.visible(a)
                    }, ga.expr.filters.visible = function(a) {
                        return a.offsetWidth > 0 || a.offsetHeight > 0 || a.getClientRects().length > 0
                    };
                    var Eb = /%20/g,
                        Fb = /\[\]$/,
                        Gb = /\r?\n/g,
                        Hb = /^(?:submit|button|image|reset|file)$/i,
                        Ib = /^(?:input|select|textarea|keygen)/i;
                    ga.param = function(a, b) {
                        var c, d = [],
                            e = function(a, b) {
                                b = ga.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                            };
                        if (void 0 === b && (b = ga.ajaxSettings && ga.ajaxSettings.traditional), ga.isArray(a) || a.jquery && !ga.isPlainObject(a)) ga.each(a, function() {
                            e(this.name, this.value)
                        });
                        else
                            for (c in a) V(c, a[c], b, e);
                        return d.join("&").replace(Eb, "+");
                    }, ga.fn.extend({
                        serialize: function() {
                            return ga.param(this.serializeArray())
                        },
                        serializeArray: function() {
                            return this.map(function() {
                                var a = ga.prop(this, "elements");
                                return a ? ga.makeArray(a) : this
                            }).filter(function() {
                                var a = this.type;
                                return this.name && !ga(this).is(":disabled") && Ib.test(this.nodeName) && !Hb.test(a) && (this.checked || !Ia.test(a))
                            }).map(function(a, b) {
                                var c = ga(this).val();
                                return null == c ? null : ga.isArray(c) ? ga.map(c, function(a) {
                                    return {
                                        name: b.name,
                                        value: a.replace(Gb, "\r\n")
                                    }
                                }) : {
                                    name: b.name,
                                    value: c.replace(Gb, "\r\n")
                                }
                            }).get()
                        }
                    }), ga.ajaxSettings.xhr = function() {
                        try {
                            return new b.XMLHttpRequest
                        } catch (a) {}
                    };
                    var Jb = {
                        0: 200,
                        1223: 204
                    }, Kb = ga.ajaxSettings.xhr();
                    ea.cors = !! Kb && "withCredentials" in Kb, ea.ajax = Kb = !! Kb, ga.ajaxTransport(function(a) {
                        var c, d;
                        return ea.cors || Kb && !a.crossDomain ? {
                            send: function(e, f) {
                                var g, h = a.xhr();
                                if (h.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                                    for (g in a.xhrFields) h[g] = a.xhrFields[g];
                                a.mimeType && h.overrideMimeType && h.overrideMimeType(a.mimeType), a.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                                for (g in e) h.setRequestHeader(g, e[g]);
                                c = function(a) {
                                    return function() {
                                        c && (c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Jb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? {
                                            binary: h.response
                                        } : {
                                            text: h.responseText
                                        }, h.getAllResponseHeaders()))
                                    }
                                }, h.onload = c(), d = h.onerror = c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function() {
                                    4 === h.readyState && b.setTimeout(function() {
                                        c && d()
                                    })
                                }, c = c("abort");
                                try {
                                    h.send(a.hasContent && a.data || null)
                                } catch (i) {
                                    if (c) throw i
                                }
                            },
                            abort: function() {
                                c && c()
                            }
                        } : void 0
                    }), ga.ajaxSetup({
                        accepts: {
                            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                        },
                        contents: {
                            script: /\b(?:java|ecma)script\b/
                        },
                        converters: {
                            "text script": function(a) {
                                return ga.globalEval(a), a
                            }
                        }
                    }), ga.ajaxPrefilter("script", function(a) {
                        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
                    }), ga.ajaxTransport("script", function(a) {
                        if (a.crossDomain) {
                            var b, c;
                            return {
                                send: function(d, e) {
                                    b = ga("<script>").prop({
                                        charset: a.scriptCharset,
                                        src: a.url
                                    }).on("load error", c = function(a) {
                                        b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
                                    }), Y.head.appendChild(b[0])
                                },
                                abort: function() {
                                    c && c()
                                }
                            }
                        }
                    });
                    var Lb = [],
                        Mb = /(=)\?(?=&|$)|\?\?/;
                    ga.ajaxSetup({
                        jsonp: "callback",
                        jsonpCallback: function() {
                            var a = Lb.pop() || ga.expando + "_" + sb++;
                            return this[a] = !0, a
                        }
                    }), ga.ajaxPrefilter("json jsonp", function(a, c, d) {
                        var e, f, g, h = a.jsonp !== !1 && (Mb.test(a.url) ? "url" : "string" == typeof a.data && 0 === (a.contentType || "").indexOf("application/x-www-form-urlencoded") && Mb.test(a.data) && "data");
                        return h || "jsonp" === a.dataTypes[0] ? (e = a.jsonpCallback = ga.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, h ? a[h] = a[h].replace(Mb, "$1" + e) : a.jsonp !== !1 && (a.url += (tb.test(a.url) ? "&" : "?") + a.jsonp + "=" + e), a.converters["script json"] = function() {
                            return g || ga.error(e + " was not called"), g[0]
                        }, a.dataTypes[0] = "json", f = b[e], b[e] = function() {
                            g = arguments
                        }, d.always(function() {
                            void 0 === f ? ga(b).removeProp(e) : b[e] = f, a[e] && (a.jsonpCallback = c.jsonpCallback, Lb.push(e)), g && ga.isFunction(f) && f(g[0]), g = f = void 0
                        }), "script") : void 0
                    }), ga.parseHTML = function(a, b, c) {
                        if (!a || "string" != typeof a) return null;
                        "boolean" == typeof b && (c = b, b = !1), b = b || Y;
                        var d = pa.exec(a),
                            e = !c && [];
                        return d ? [b.createElement(d[1])] : (d = n([a], b, e), e && e.length && ga(e).remove(), ga.merge([], d.childNodes))
                    };
                    var Nb = ga.fn.load;
                    ga.fn.load = function(a, b, c) {
                        if ("string" != typeof a && Nb) return Nb.apply(this, arguments);
                        var d, e, f, g = this,
                            h = a.indexOf(" ");
                        return h > -1 && (d = ga.trim(a.slice(h)), a = a.slice(0, h)), ga.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && ga.ajax({
                            url: a,
                            type: e || "GET",
                            dataType: "html",
                            data: b
                        }).done(function(a) {
                            f = arguments, g.html(d ? ga("<div>").append(ga.parseHTML(a)).find(d) : a)
                        }).always(c && function(a, b) {
                            g.each(function() {
                                c.apply(this, f || [a.responseText, b, a])
                            })
                        }), this
                    }, ga.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
                        ga.fn[b] = function(a) {
                            return this.on(b, a)
                        }
                    }), ga.expr.filters.animated = function(a) {
                        return ga.grep(ga.timers, function(b) {
                            return a === b.elem
                        }).length
                    }, ga.offset = {
                        setOffset: function(a, b, c) {
                            var d, e, f, g, h, i, j, k = ga.css(a, "position"),
                                l = ga(a),
                                m = {};
                            "static" === k && (a.style.position = "relative"), h = l.offset(), f = ga.css(a, "top"), i = ga.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), ga.isFunction(b) && (b = b.call(a, c, ga.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
                        }
                    }, ga.fn.extend({
                        offset: function(a) {
                            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                                ga.offset.setOffset(this, a, b)
                            });
                            var b, c, d = this[0],
                                e = {
                                    top: 0,
                                    left: 0
                                }, f = d && d.ownerDocument;
                            if (f) return b = f.documentElement, ga.contains(b, d) ? (e = d.getBoundingClientRect(), c = W(f), {
                                top: e.top + c.pageYOffset - b.clientTop,
                                left: e.left + c.pageXOffset - b.clientLeft
                            }) : e
                        },
                        position: function() {
                            if (this[0]) {
                                var a, b, c = this[0],
                                    d = {
                                        top: 0,
                                        left: 0
                                    };
                                return "fixed" === ga.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), ga.nodeName(a[0], "html") || (d = a.offset()), d.top += ga.css(a[0], "borderTopWidth", !0), d.left += ga.css(a[0], "borderLeftWidth", !0)), {
                                    top: b.top - d.top - ga.css(c, "marginTop", !0),
                                    left: b.left - d.left - ga.css(c, "marginLeft", !0)
                                }
                            }
                        },
                        offsetParent: function() {
                            return this.map(function() {
                                for (var a = this.offsetParent; a && "static" === ga.css(a, "position");) a = a.offsetParent;
                                return a || _a
                            })
                        }
                    }), ga.each({
                        scrollLeft: "pageXOffset",
                        scrollTop: "pageYOffset"
                    }, function(a, b) {
                        var c = "pageYOffset" === b;
                        ga.fn[a] = function(d) {
                            return ya(this, function(a, d, e) {
                                var f = W(a);
                                return void 0 === e ? f ? f[b] : a[d] : void(f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e)
                            }, a, d, arguments.length)
                        }
                    }), ga.each(["top", "left"], function(a, b) {
                        ga.cssHooks[b] = C(ea.pixelPosition, function(a, c) {
                            return c ? (c = B(a, b), Ya.test(c) ? ga(a).position()[b] + "px" : c) : void 0
                        })
                    }), ga.each({
                        Height: "height",
                        Width: "width"
                    }, function(a, b) {
                        ga.each({
                            padding: "inner" + a,
                            content: b,
                            "": "outer" + a
                        }, function(c, d) {
                            ga.fn[d] = function(d, e) {
                                var f = arguments.length && (c || "boolean" != typeof d),
                                    g = c || (d === !0 || e === !0 ? "margin" : "border");
                                return ya(this, function(b, c, d) {
                                    var e;
                                    return ga.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? ga.css(b, c, g) : ga.style(b, c, d, g)
                                }, b, f ? d : void 0, f, null)
                            }
                        })
                    }), ga.fn.extend({
                        bind: function(a, b, c) {
                            return this.on(a, null, b, c)
                        },
                        unbind: function(a, b) {
                            return this.off(a, null, b)
                        },
                        delegate: function(a, b, c, d) {
                            return this.on(b, a, c, d)
                        },
                        undelegate: function(a, b, c) {
                            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
                        },
                        size: function() {
                            return this.length
                        }
                    }), ga.fn.andSelf = ga.fn.addBack, "function" == typeof a && a.amd && a("jquery", [], function() {
                        return ga
                    });
                    var Ob = b.jQuery,
                        Pb = b.$;
                    return ga.noConflict = function(a) {
                        return b.$ === ga && (b.$ = Pb), a && b.jQuery === ga && (b.jQuery = Ob), ga
                    }, c || (b.jQuery = b.$ = ga), ga
                })
            }, {}
        ],
        10: [
            function(a, b, c) {
                b.exports = a("./lib/sorter.js")
            }, {
                "./lib/sorter.js": 12
            }
        ],
        11: [
            function(a, b, c) {
                function d(a, b, c) {
                    null == c && (c = !0);
                    var d, e;
                    return c ? (d = a, e = b) : (d = b, e = a), null == d ? 1 : null == e ? -1 : e > d ? -1 : d > e ? 1 : 0
                }
                b.exports = {
                    string: function(a, b, c) {
                        null == c && (c = !0), a = null != a ? a.toLowerCase() : "", b = null != b ? b.toLowerCase() : "";
                        var d = c ? a.localeCompare(b) : b.localeCompare(a);
                        return 0 > d ? -1 : d
                    },
                    "boolean": function(a, b, c) {
                        function e(a) {
                            return a ? 1 : 0
                        }
                        return d(e(a), e(b), c)
                    },
                    date: function(a, b, c) {
                        function e(a) {
                            return null != a ? Date.parse(a) : null
                        }
                        return d(e(a), e(b), c)
                    },
                    integer: function(a, b, c) {
                        function e(a) {
                            return parseInt(a, 10)
                        }
                        return d(e(a), e(b), c)
                    },
                    "float": function(a, b, c) {
                        function e(a) {
                            return parseFloat(a)
                        }
                        return d(e(a), e(b), c)
                    }
                }
            }, {}
        ],
        12: [
            function(a, b, c) {
                function d(a, b) {
                    if (null == b) return a;
                    var c = b.split("."),
                        e = a[c[0]];
                    return 1 === c.length ? e : (c.shift(), d(e, c.join(".")))
                }
                var e = a("./comparator"),
                    f = a("underscore"),
                    g = {
                        ascending: !0,
                        type: "string",
                        name: null,
                        compare: null
                    };
                b.exports = function(a, b) {
                    f.each(b, function(a) {
                        f.defaults(a, g)
                    }), a.sort(function(a, c) {
                        for (var g = 0; g < b.length; g++) {
                            var h = b[g],
                                i = h.ascending,
                                j = h.name,
                                k = h.compare;
                            null != k && f.isFunction(k) || (k = e[h.type.toLowerCase()]);
                            var l = k(d(a, j), d(c, j), i);
                            if (null == l && (l = 0), 0 !== l) return l
                        }
                    })
                }
            }, {
                "./comparator": 11,
                underscore: 13
            }
        ],
        13: [
            function(b, c, d) {
                (function() {
                    var b = this,
                        e = b._,
                        f = {}, g = Array.prototype,
                        h = Object.prototype,
                        i = Function.prototype,
                        j = g.push,
                        k = g.slice,
                        l = g.concat,
                        m = h.toString,
                        n = h.hasOwnProperty,
                        o = g.forEach,
                        p = g.map,
                        q = g.reduce,
                        r = g.reduceRight,
                        s = g.filter,
                        t = g.every,
                        u = g.some,
                        v = g.indexOf,
                        w = g.lastIndexOf,
                        x = Array.isArray,
                        y = Object.keys,
                        z = i.bind,
                        A = function(a) {
                            return a instanceof A ? a : this instanceof A ? void(this._wrapped = a) : new A(a)
                        };
                    "undefined" != typeof d ? ("undefined" != typeof c && c.exports && (d = c.exports = A), d._ = A) : b._ = A, A.VERSION = "1.6.0";
                    var B = A.each = A.forEach = function(a, b, c) {
                        if (null == a) return a;
                        if (o && a.forEach === o) a.forEach(b, c);
                        else if (a.length === +a.length) {
                            for (var d = 0, e = a.length; e > d; d++)
                                if (b.call(c, a[d], d, a) === f) return
                        } else
                            for (var g = A.keys(a), d = 0, e = g.length; e > d; d++)
                                if (b.call(c, a[g[d]], g[d], a) === f) return; return a
                    };
                    A.map = A.collect = function(a, b, c) {
                        var d = [];
                        return null == a ? d : p && a.map === p ? a.map(b, c) : (B(a, function(a, e, f) {
                            d.push(b.call(c, a, e, f))
                        }), d)
                    };
                    var C = "Reduce of empty array with no initial value";
                    A.reduce = A.foldl = A.inject = function(a, b, c, d) {
                        var e = arguments.length > 2;
                        if (null == a && (a = []), q && a.reduce === q) return d && (b = A.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
                        if (B(a, function(a, f, g) {
                            e ? c = b.call(d, c, a, f, g) : (c = a, e = !0)
                        }), !e) throw new TypeError(C);
                        return c
                    }, A.reduceRight = A.foldr = function(a, b, c, d) {
                        var e = arguments.length > 2;
                        if (null == a && (a = []), r && a.reduceRight === r) return d && (b = A.bind(b, d)), e ? a.reduceRight(b, c) : a.reduceRight(b);
                        var f = a.length;
                        if (f !== +f) {
                            var g = A.keys(a);
                            f = g.length
                        }
                        if (B(a, function(h, i, j) {
                            i = g ? g[--f] : --f, e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0)
                        }), !e) throw new TypeError(C);
                        return c
                    }, A.find = A.detect = function(a, b, c) {
                        var d;
                        return D(a, function(a, e, f) {
                            return b.call(c, a, e, f) ? (d = a, !0) : void 0
                        }), d
                    }, A.filter = A.select = function(a, b, c) {
                        var d = [];
                        return null == a ? d : s && a.filter === s ? a.filter(b, c) : (B(a, function(a, e, f) {
                            b.call(c, a, e, f) && d.push(a)
                        }), d)
                    }, A.reject = function(a, b, c) {
                        return A.filter(a, function(a, d, e) {
                            return !b.call(c, a, d, e)
                        }, c)
                    }, A.every = A.all = function(a, b, c) {
                        b || (b = A.identity);
                        var d = !0;
                        return null == a ? d : t && a.every === t ? a.every(b, c) : (B(a, function(a, e, g) {
                            return (d = d && b.call(c, a, e, g)) ? void 0 : f
                        }), !! d)
                    };
                    var D = A.some = A.any = function(a, b, c) {
                        b || (b = A.identity);
                        var d = !1;
                        return null == a ? d : u && a.some === u ? a.some(b, c) : (B(a, function(a, e, g) {
                            return d || (d = b.call(c, a, e, g)) ? f : void 0
                        }), !! d)
                    };
                    A.contains = A.include = function(a, b) {
                        return null == a ? !1 : v && a.indexOf === v ? -1 != a.indexOf(b) : D(a, function(a) {
                            return a === b
                        })
                    }, A.invoke = function(a, b) {
                        var c = k.call(arguments, 2),
                            d = A.isFunction(b);
                        return A.map(a, function(a) {
                            return (d ? b : a[b]).apply(a, c)
                        })
                    }, A.pluck = function(a, b) {
                        return A.map(a, A.property(b))
                    }, A.where = function(a, b) {
                        return A.filter(a, A.matches(b))
                    }, A.findWhere = function(a, b) {
                        return A.find(a, A.matches(b))
                    }, A.max = function(a, b, c) {
                        if (!b && A.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.max.apply(Math, a);
                        var d = -(1 / 0),
                            e = -(1 / 0);
                        return B(a, function(a, f, g) {
                            var h = b ? b.call(c, a, f, g) : a;
                            h > e && (d = a, e = h)
                        }), d
                    }, A.min = function(a, b, c) {
                        if (!b && A.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.min.apply(Math, a);
                        var d = 1 / 0,
                            e = 1 / 0;
                        return B(a, function(a, f, g) {
                            var h = b ? b.call(c, a, f, g) : a;
                            e > h && (d = a, e = h)
                        }), d
                    }, A.shuffle = function(a) {
                        var b, c = 0,
                            d = [];
                        return B(a, function(a) {
                            b = A.random(c++), d[c - 1] = d[b], d[b] = a
                        }), d
                    }, A.sample = function(a, b, c) {
                        return null == b || c ? (a.length !== +a.length && (a = A.values(a)), a[A.random(a.length - 1)]) : A.shuffle(a).slice(0, Math.max(0, b))
                    };
                    var E = function(a) {
                        return null == a ? A.identity : A.isFunction(a) ? a : A.property(a)
                    };
                    A.sortBy = function(a, b, c) {
                        return b = E(b), A.pluck(A.map(a, function(a, d, e) {
                            return {
                                value: a,
                                index: d,
                                criteria: b.call(c, a, d, e)
                            }
                        }).sort(function(a, b) {
                            var c = a.criteria,
                                d = b.criteria;
                            if (c !== d) {
                                if (c > d || void 0 === c) return 1;
                                if (d > c || void 0 === d) return -1
                            }
                            return a.index - b.index
                        }), "value")
                    };
                    var F = function(a) {
                        return function(b, c, d) {
                            var e = {};
                            return c = E(c), B(b, function(f, g) {
                                var h = c.call(d, f, g, b);
                                a(e, h, f)
                            }), e
                        }
                    };
                    A.groupBy = F(function(a, b, c) {
                        A.has(a, b) ? a[b].push(c) : a[b] = [c]
                    }), A.indexBy = F(function(a, b, c) {
                        a[b] = c
                    }), A.countBy = F(function(a, b) {
                        A.has(a, b) ? a[b]++ : a[b] = 1
                    }), A.sortedIndex = function(a, b, c, d) {
                        c = E(c);
                        for (var e = c.call(d, b), f = 0, g = a.length; g > f;) {
                            var h = f + g >>> 1;
                            c.call(d, a[h]) < e ? f = h + 1 : g = h
                        }
                        return f
                    }, A.toArray = function(a) {
                        return a ? A.isArray(a) ? k.call(a) : a.length === +a.length ? A.map(a, A.identity) : A.values(a) : []
                    }, A.size = function(a) {
                        return null == a ? 0 : a.length === +a.length ? a.length : A.keys(a).length
                    }, A.first = A.head = A.take = function(a, b, c) {
                        return null != a ? null == b || c ? a[0] : 0 > b ? [] : k.call(a, 0, b) : void 0
                    }, A.initial = function(a, b, c) {
                        return k.call(a, 0, a.length - (null == b || c ? 1 : b))
                    }, A.last = function(a, b, c) {
                        return null != a ? null == b || c ? a[a.length - 1] : k.call(a, Math.max(a.length - b, 0)) : void 0
                    }, A.rest = A.tail = A.drop = function(a, b, c) {
                        return k.call(a, null == b || c ? 1 : b)
                    }, A.compact = function(a) {
                        return A.filter(a, A.identity)
                    };
                    var G = function(a, b, c) {
                        return b && A.every(a, A.isArray) ? l.apply(c, a) : (B(a, function(a) {
                            A.isArray(a) || A.isArguments(a) ? b ? j.apply(c, a) : G(a, b, c) : c.push(a)
                        }), c)
                    };
                    A.flatten = function(a, b) {
                        return G(a, b, [])
                    }, A.without = function(a) {
                        return A.difference(a, k.call(arguments, 1))
                    }, A.partition = function(a, b) {
                        var c = [],
                            d = [];
                        return B(a, function(a) {
                            (b(a) ? c : d).push(a)
                        }), [c, d]
                    }, A.uniq = A.unique = function(a, b, c, d) {
                        A.isFunction(b) && (d = c, c = b, b = !1);
                        var e = c ? A.map(a, c, d) : a,
                            f = [],
                            g = [];
                        return B(e, function(c, d) {
                            (b ? d && g[g.length - 1] === c : A.contains(g, c)) || (g.push(c), f.push(a[d]))
                        }), f
                    }, A.union = function() {
                        return A.uniq(A.flatten(arguments, !0))
                    }, A.intersection = function(a) {
                        var b = k.call(arguments, 1);
                        return A.filter(A.uniq(a), function(a) {
                            return A.every(b, function(b) {
                                return A.contains(b, a)
                            })
                        })
                    }, A.difference = function(a) {
                        var b = l.apply(g, k.call(arguments, 1));
                        return A.filter(a, function(a) {
                            return !A.contains(b, a)
                        })
                    }, A.zip = function() {
                        for (var a = A.max(A.pluck(arguments, "length").concat(0)), b = new Array(a), c = 0; a > c; c++) b[c] = A.pluck(arguments, "" + c);
                        return b
                    }, A.object = function(a, b) {
                        if (null == a) return {};
                        for (var c = {}, d = 0, e = a.length; e > d; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
                        return c
                    }, A.indexOf = function(a, b, c) {
                        if (null == a) return -1;
                        var d = 0,
                            e = a.length;
                        if (c) {
                            if ("number" != typeof c) return d = A.sortedIndex(a, b), a[d] === b ? d : -1;
                            d = 0 > c ? Math.max(0, e + c) : c
                        }
                        if (v && a.indexOf === v) return a.indexOf(b, c);
                        for (; e > d; d++)
                            if (a[d] === b) return d;
                        return -1
                    }, A.lastIndexOf = function(a, b, c) {
                        if (null == a) return -1;
                        var d = null != c;
                        if (w && a.lastIndexOf === w) return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
                        for (var e = d ? c : a.length; e--;)
                            if (a[e] === b) return e;
                        return -1
                    }, A.range = function(a, b, c) {
                        arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
                        for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e;) f[e++] = a, a += c;
                        return f
                    };
                    var H = function() {};
                    A.bind = function(a, b) {
                        var c, d;
                        if (z && a.bind === z) return z.apply(a, k.call(arguments, 1));
                        if (!A.isFunction(a)) throw new TypeError;
                        return c = k.call(arguments, 2), d = function() {
                            if (!(this instanceof d)) return a.apply(b, c.concat(k.call(arguments)));
                            H.prototype = a.prototype;
                            var e = new H;
                            H.prototype = null;
                            var f = a.apply(e, c.concat(k.call(arguments)));
                            return Object(f) === f ? f : e
                        }
                    }, A.partial = function(a) {
                        var b = k.call(arguments, 1);
                        return function() {
                            for (var c = 0, d = b.slice(), e = 0, f = d.length; f > e; e++) d[e] === A && (d[e] = arguments[c++]);
                            for (; c < arguments.length;) d.push(arguments[c++]);
                            return a.apply(this, d)
                        }
                    }, A.bindAll = function(a) {
                        var b = k.call(arguments, 1);
                        if (0 === b.length) throw new Error("bindAll must be passed function names");
                        return B(b, function(b) {
                            a[b] = A.bind(a[b], a)
                        }), a
                    }, A.memoize = function(a, b) {
                        var c = {};
                        return b || (b = A.identity),
                        function() {
                            var d = b.apply(this, arguments);
                            return A.has(c, d) ? c[d] : c[d] = a.apply(this, arguments)
                        }
                    }, A.delay = function(a, b) {
                        var c = k.call(arguments, 2);
                        return setTimeout(function() {
                            return a.apply(null, c)
                        }, b)
                    }, A.defer = function(a) {
                        return A.delay.apply(A, [a, 1].concat(k.call(arguments, 1)))
                    }, A.throttle = function(a, b, c) {
                        var d, e, f, g = null,
                            h = 0;
                        c || (c = {});
                        var i = function() {
                            h = c.leading === !1 ? 0 : A.now(), g = null, f = a.apply(d, e), d = e = null
                        };
                        return function() {
                            var j = A.now();
                            h || c.leading !== !1 || (h = j);
                            var k = b - (j - h);
                            return d = this, e = arguments, 0 >= k ? (clearTimeout(g), g = null, h = j, f = a.apply(d, e), d = e = null) : g || c.trailing === !1 || (g = setTimeout(i, k)), f
                        }
                    }, A.debounce = function(a, b, c) {
                        var d, e, f, g, h, i = function() {
                                var j = A.now() - g;
                                b > j ? d = setTimeout(i, b - j) : (d = null, c || (h = a.apply(f, e), f = e = null))
                            };
                        return function() {
                            f = this, e = arguments, g = A.now();
                            var j = c && !d;
                            return d || (d = setTimeout(i, b)), j && (h = a.apply(f, e), f = e = null), h
                        }
                    }, A.once = function(a) {
                        var b, c = !1;
                        return function() {
                            return c ? b : (c = !0, b = a.apply(this, arguments), a = null, b)
                        }
                    }, A.wrap = function(a, b) {
                        return A.partial(b, a)
                    }, A.compose = function() {
                        var a = arguments;
                        return function() {
                            for (var b = arguments, c = a.length - 1; c >= 0; c--) b = [a[c].apply(this, b)];
                            return b[0]
                        }
                    }, A.after = function(a, b) {
                        return function() {
                            return --a < 1 ? b.apply(this, arguments) : void 0
                        }
                    }, A.keys = function(a) {
                        if (!A.isObject(a)) return [];
                        if (y) return y(a);
                        var b = [];
                        for (var c in a) A.has(a, c) && b.push(c);
                        return b
                    }, A.values = function(a) {
                        for (var b = A.keys(a), c = b.length, d = new Array(c), e = 0; c > e; e++) d[e] = a[b[e]];
                        return d
                    }, A.pairs = function(a) {
                        for (var b = A.keys(a), c = b.length, d = new Array(c), e = 0; c > e; e++) d[e] = [b[e], a[b[e]]];
                        return d
                    }, A.invert = function(a) {
                        for (var b = {}, c = A.keys(a), d = 0, e = c.length; e > d; d++) b[a[c[d]]] = c[d];
                        return b
                    }, A.functions = A.methods = function(a) {
                        var b = [];
                        for (var c in a) A.isFunction(a[c]) && b.push(c);
                        return b.sort()
                    }, A.extend = function(a) {
                        return B(k.call(arguments, 1), function(b) {
                            if (b)
                                for (var c in b) a[c] = b[c]
                        }), a
                    }, A.pick = function(a) {
                        var b = {}, c = l.apply(g, k.call(arguments, 1));
                        return B(c, function(c) {
                            c in a && (b[c] = a[c])
                        }), b
                    }, A.omit = function(a) {
                        var b = {}, c = l.apply(g, k.call(arguments, 1));
                        for (var d in a) A.contains(c, d) || (b[d] = a[d]);
                        return b
                    }, A.defaults = function(a) {
                        return B(k.call(arguments, 1), function(b) {
                            if (b)
                                for (var c in b) void 0 === a[c] && (a[c] = b[c])
                        }), a
                    }, A.clone = function(a) {
                        return A.isObject(a) ? A.isArray(a) ? a.slice() : A.extend({}, a) : a
                    }, A.tap = function(a, b) {
                        return b(a), a
                    };
                    var I = function(a, b, c, d) {
                        if (a === b) return 0 !== a || 1 / a == 1 / b;
                        if (null == a || null == b) return a === b;
                        a instanceof A && (a = a._wrapped), b instanceof A && (b = b._wrapped);
                        var e = m.call(a);
                        if (e != m.call(b)) return !1;
                        switch (e) {
                            case "[object String]":
                                return a == String(b);
                            case "[object Number]":
                                return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
                            case "[object Date]":
                            case "[object Boolean]":
                                return +a == +b;
                            case "[object RegExp]":
                                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
                        }
                        if ("object" != typeof a || "object" != typeof b) return !1;
                        for (var f = c.length; f--;)
                            if (c[f] == a) return d[f] == b;
                        var g = a.constructor,
                            h = b.constructor;
                        if (g !== h && !(A.isFunction(g) && g instanceof g && A.isFunction(h) && h instanceof h) && "constructor" in a && "constructor" in b) return !1;
                        c.push(a), d.push(b);
                        var i = 0,
                            j = !0;
                        if ("[object Array]" == e) {
                            if (i = a.length, j = i == b.length)
                                for (; i-- && (j = I(a[i], b[i], c, d)););
                        } else {
                            for (var k in a)
                                if (A.has(a, k) && (i++, !(j = A.has(b, k) && I(a[k], b[k], c, d)))) break;
                            if (j) {
                                for (k in b)
                                    if (A.has(b, k) && !i--) break;
                                j = !i
                            }
                        }
                        return c.pop(), d.pop(), j
                    };
                    A.isEqual = function(a, b) {
                        return I(a, b, [], [])
                    }, A.isEmpty = function(a) {
                        if (null == a) return !0;
                        if (A.isArray(a) || A.isString(a)) return 0 === a.length;
                        for (var b in a)
                            if (A.has(a, b)) return !1;
                        return !0
                    }, A.isElement = function(a) {
                        return !(!a || 1 !== a.nodeType)
                    }, A.isArray = x || function(a) {
                        return "[object Array]" == m.call(a)
                    }, A.isObject = function(a) {
                        return a === Object(a)
                    }, B(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(a) {
                        A["is" + a] = function(b) {
                            return m.call(b) == "[object " + a + "]"
                        }
                    }), A.isArguments(arguments) || (A.isArguments = function(a) {
                        return !(!a || !A.has(a, "callee"))
                    }), "function" != typeof / . / && (A.isFunction = function(a) {
                        return "function" == typeof a
                    }), A.isFinite = function(a) {
                        return isFinite(a) && !isNaN(parseFloat(a))
                    }, A.isNaN = function(a) {
                        return A.isNumber(a) && a != +a
                    }, A.isBoolean = function(a) {
                        return a === !0 || a === !1 || "[object Boolean]" == m.call(a)
                    }, A.isNull = function(a) {
                        return null === a
                    }, A.isUndefined = function(a) {
                        return void 0 === a
                    }, A.has = function(a, b) {
                        return n.call(a, b)
                    }, A.noConflict = function() {
                        return b._ = e, this
                    }, A.identity = function(a) {
                        return a
                    }, A.constant = function(a) {
                        return function() {
                            return a
                        }
                    }, A.property = function(a) {
                        return function(b) {
                            return b[a]
                        }
                    }, A.matches = function(a) {
                        return function(b) {
                            if (b === a) return !0;
                            for (var c in a)
                                if (a[c] !== b[c]) return !1;
                            return !0
                        }
                    }, A.times = function(a, b, c) {
                        for (var d = Array(Math.max(0, a)), e = 0; a > e; e++) d[e] = b.call(c, e);
                        return d
                    }, A.random = function(a, b) {
                        return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1))
                    }, A.now = Date.now || function() {
                        return (new Date).getTime()
                    };
                    var J = {
                        escape: {
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            '"': "&quot;",
                            "'": "&#x27;"
                        }
                    };
                    J.unescape = A.invert(J.escape);
                    var K = {
                        escape: new RegExp("[" + A.keys(J.escape).join("") + "]", "g"),
                        unescape: new RegExp("(" + A.keys(J.unescape).join("|") + ")", "g")
                    };
                    A.each(["escape", "unescape"], function(a) {
                        A[a] = function(b) {
                            return null == b ? "" : ("" + b).replace(K[a], function(b) {
                                return J[a][b]
                            })
                        }
                    }), A.result = function(a, b) {
                        if (null != a) {
                            var c = a[b];
                            return A.isFunction(c) ? c.call(a) : c
                        }
                    }, A.mixin = function(a) {
                        B(A.functions(a), function(b) {
                            var c = A[b] = a[b];
                            A.prototype[b] = function() {
                                var a = [this._wrapped];
                                return j.apply(a, arguments), P.call(this, c.apply(A, a))
                            }
                        })
                    };
                    var L = 0;
                    A.uniqueId = function(a) {
                        var b = ++L + "";
                        return a ? a + b : b
                    }, A.templateSettings = {
                        evaluate: /<%([\s\S]+?)%>/g,
                        interpolate: /<%=([\s\S]+?)%>/g,
                        escape: /<%-([\s\S]+?)%>/g
                    };
                    var M = /(.)^/,
                        N = {
                            "'": "'",
                            "\\": "\\",
                            "\r": "r",
                            "\n": "n",
                            " ": "t",
                            "\u2028": "u2028",
                            "\u2029": "u2029"
                        }, O = /\\|'|\r|\n|\t|\u2028|\u2029/g;
                    A.template = function(a, b, c) {
                        var d;
                        c = A.defaults({}, c, A.templateSettings);
                        var e = new RegExp([(c.escape || M).source, (c.interpolate || M).source, (c.evaluate || M).source].join("|") + "|$", "g"),
                            f = 0,
                            g = "__p+='";
                        a.replace(e, function(b, c, d, e, h) {
                            return g += a.slice(f, h).replace(O, function(a) {
                                return "\\" + N[a]
                            }), c && (g += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'"), d && (g += "'+\n((__t=(" + d + "))==null?'':__t)+\n'"), e && (g += "';\n" + e + "\n__p+='"), f = h + b.length, b
                        }), g += "';\n", c.variable || (g = "with(obj||{}){\n" + g + "}\n"), g = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + g + "return __p;\n";
                        try {
                            d = new Function(c.variable || "obj", "_", g)
                        } catch (h) {
                            throw h.source = g, h
                        }
                        if (b) return d(b, A);
                        var i = function(a) {
                            return d.call(this, a, A)
                        };
                        return i.source = "function(" + (c.variable || "obj") + "){\n" + g + "}", i
                    }, A.chain = function(a) {
                        return A(a).chain()
                    };
                    var P = function(a) {
                        return this._chain ? A(a).chain() : a
                    };
                    A.mixin(A), B(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(a) {
                        var b = g[a];
                        A.prototype[a] = function() {
                            var c = this._wrapped;
                            return b.apply(c, arguments), "shift" != a && "splice" != a || 0 !== c.length || delete c[0], P.call(this, c)
                        }
                    }), B(["concat", "join", "slice"], function(a) {
                        var b = g[a];
                        A.prototype[a] = function() {
                            return P.call(this, b.apply(this._wrapped, arguments))
                        }
                    }), A.extend(A.prototype, {
                        chain: function() {
                            return this._chain = !0, this
                        },
                        value: function() {
                            return this._wrapped
                        }
                    }), "function" == typeof a && a.amd && a("underscore", [], function() {
                        return A
                    })
                }).call(this)
            }, {}
        ]
    }, {}, [3])(3)
});