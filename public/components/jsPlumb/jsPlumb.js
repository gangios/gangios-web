(function() {
	var y = !! document.createElement("canvas").getContext,
		e = !! window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"),
		b = function() {
			if (b.vml == undefined) {
				var I = document.body.appendChild(document.createElement("div"));
				I.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
				var H = I.firstChild;
				H.style.behavior = "url(#default#VML)";
				b.vml = H ? typeof H.adj == "object" : true;
				I.parentNode.removeChild(I)
			}
			return b.vml
		};
	var i = function(H, J) {
			if (H) {
				for (var I = 0; I < H.length; I++) {
					if (J(H[I])) {
						return I
					}
				}
			}
			return -1
		},
		G = function(H, I) {
			return i(H, function(J) {
				return J == I
			})
		},
		B = function(I, J) {
			var H = i(I, J);
			if (H > -1) {
				I.splice(H, 1)
			}
			return H != -1
		},
		m = function(I, J) {
			var H = G(I, J);
			if (H > -1) {
				I.splice(H, 1)
			}
			return H != -1
		},
		t = function(J, I, H) {
			if (i(J, H) == -1) {
				J.push(I)
			}
		},
		l = function(K, I, J) {
			var H = K[I];
			if (H == null) {
				H = [], K[I] = H
			}
			H.push(J);
			return H
		},
		n = function(H) {
			return Object.prototype.toString.call(H) === "[object Array]"
		},
		A = function(H) {
			return typeof H === "string"
		},
		v = function(H) {
			return Object.prototype.toString.call(H) === "[object Object]"
		};
	if (!window.console) {
		window.console = {
			time: function() {},
			timeEnd: function() {},
			group: function() {},
			groupEnd: function() {},
			log: function() {}
		}
	}
	var w = null,
		d = function(H, I) {
			return p.CurrentLibrary.getAttribute(D(H), I)
		},
		f = function(I, J, H) {
			p.CurrentLibrary.setAttribute(D(I), J, H)
		},
		z = function(I, H) {
			p.CurrentLibrary.addClass(D(I), H)
		},
		k = function(I, H) {
			return p.CurrentLibrary.hasClass(D(I), H)
		},
		o = function(I, H) {
			p.CurrentLibrary.removeClass(D(I), H)
		},
		D = function(H) {
			return p.CurrentLibrary.getElementObject(H)
		},
		s = function(H) {
			return p.CurrentLibrary.getOffset(D(H))
		},
		a = function(H) {
			return p.CurrentLibrary.getSize(D(H))
		},
		C = true,
		q = function() {
			if (C && typeof console != "undefined") {
				try {
					var I = arguments[arguments.length - 1];
					console.log(I)
				} catch (H) {}
			}
		},
		F = function(H) {
			if (C && typeof console != "undefined") {
				console.group(H)
			}
		},
		h = function(H) {
			if (C && typeof console != "undefined") {
				console.groupEnd(H)
			}
		},
		E = function(H) {
			if (C && typeof console != "undefined") {
				console.time(H)
			}
		},
		u = function(H) {
			if (C && typeof console != "undefined") {
				console.timeEnd(H)
			}
		};
	EventGenerator = function() {
		var J = {},
			I = this;
		var H = ["ready"];
		this.bind = function(K, L) {
			l(J, K, L)
		};
		this.fire = function(M, N, K) {
			if (J[M]) {
				for (var L = 0; L < J[M].length; L++) {
					if (i(H, function(P) {
						return P === M
					}) != -1) {
						J[M][L](N, K)
					} else {
						try {
							J[M][L](N, K)
						} catch (O) {
							q("jsPlumb: fire failed for event " + M + " : " + O)
						}
					}
				}
			}
		};
		this.clearListeners = function(K) {
			if (K) {
				delete J[K]
			} else {
				delete J;
				J = {}
			}
		};
		this.getListener = function(K) {
			return J[K]
		}
	}, _timestamp = function() {
		return "" + (new Date()).getTime()
	}, jsPlumbUIComponent = function(L) {
		var W = this,
			S = arguments,
			Q = false,
			U = L.parameters || {},
			I = W.idPrefix,
			K = I + (new Date()).getTime();
		W._jsPlumb = L._jsPlumb;
		W.getId = function() {
			return K
		};
		W.tooltip = L.tooltip;
		W.hoverClass = L.hoverClass;
		EventGenerator.apply(this);
		this.clone = function() {
			var X = new Object();
			W.constructor.apply(X, S);
			return X
		};
		this.getParameter = function(X) {
			return U[X]
		}, this.getParameters = function() {
			return U
		}, this.setParameter = function(X, Y) {
			U[X] = Y
		}, this.setParameters = function(X) {
			U = X
		}, this.overlayPlacements = [], this.paintStyle = null, this.hoverPaintStyle = null;
		var M = L.beforeDetach;
		this.isDetachAllowed = function(X) {
			var Y = W._jsPlumb.checkCondition("beforeDetach", X);
			if (M) {
				try {
					Y = M(X)
				} catch (Z) {
					q("jsPlumb: beforeDetach callback failed", Z)
				}
			}
			return Y
		};
		var O = L.beforeDrop;
		this.isDropAllowed = function(aa, X, Y) {
			var Z = W._jsPlumb.checkCondition("beforeDrop", {
				sourceId: aa,
				targetId: X,
				scope: Y
			});
			if (O) {
				try {
					Z = O({
						sourceId: aa,
						targetId: X,
						scope: Y
					})
				} catch (ab) {
					q("jsPlumb: beforeDrop callback failed", ab)
				}
			}
			return Z
		};
		var T = function() {
				if (W.paintStyle && W.hoverPaintStyle) {
					var X = {};
					p.extend(X, W.paintStyle);
					p.extend(X, W.hoverPaintStyle);
					delete W.hoverPaintStyle;
					if (X.gradient && W.paintStyle.fillStyle) {
						delete X.gradient
					}
					W.hoverPaintStyle = X
				}
			};
		this.setPaintStyle = function(X, Y) {
			W.paintStyle = X;
			W.paintStyleInUse = W.paintStyle;
			T();
			if (!Y) {
				W.repaint()
			}
		};
		this.setHoverPaintStyle = function(X, Y) {
			W.hoverPaintStyle = X;
			T();
			if (!Y) {
				W.repaint()
			}
		};
		this.setHover = function(X, Z, Y) {
			if (!W._jsPlumb.currentlyDragging && !W._jsPlumb.isHoverSuspended()) {
				Q = X;
				if (W.hoverClass != null && W.canvas != null) {
					if (X) {
						N.addClass(W.canvas, W.hoverClass)
					} else {
						N.removeClass(W.canvas, W.hoverClass)
					}
				}
				if (W.hoverPaintStyle != null) {
					W.paintStyleInUse = X ? W.hoverPaintStyle : W.paintStyle;
					Y = Y || _timestamp();
					W.repaint({
						timestamp: Y,
						recalc: false
					})
				}
				if (W.getAttachedElements && !Z) {
					R(X, _timestamp(), W)
				}
			}
		};
		this.isHover = function() {
			return Q
		};
		var N = p.CurrentLibrary,
			V = ["click", "dblclick", "mouseenter", "mouseout", "mousemove", "mousedown", "mouseup", "contextmenu"],
			P = {
				mouseout: "mouseexit"
			},
			J = function(Z, aa, Y) {
				var X = P[Y] || Y;
				N.bind(Z, Y, function(ab) {
					aa.fire(X, aa, ab)
				})
			},
			H = function(Z, Y) {
				var X = P[Y] || Y;
				N.unbind(Z, Y)
			};
		this.attachListeners = function(Y, Z) {
			for (var X = 0; X < V.length; X++) {
				J(Y, Z, V[X])
			}
		};
		var R = function(ab, aa, X) {
				var Z = W.getAttachedElements();
				if (Z) {
					for (var Y = 0; Y < Z.length; Y++) {
						if (!X || X != Z[Y]) {
							Z[Y].setHover(ab, true, aa)
						}
					}
				}
			};
		this.reattachListenersForElement = function(Y) {
			if (arguments.length > 1) {
				for (var X = 0; X < V.length; X++) {
					H(Y, V[X])
				}
				for (var X = 1; X < arguments.length; X++) {
					W.attachListeners(Y, arguments[X])
				}
			}
		}
	}, overlayCapableJsPlumbUIComponent = function(M) {
		jsPlumbUIComponent.apply(this, arguments);
		var R = this;
		this.overlays = [];
		var K = function(W) {
				var U = null;
				if (n(W)) {
					var T = W[0],
						V = p.extend({
							component: R,
							_jsPlumb: R._jsPlumb
						}, W[1]);
					if (W.length == 3) {
						p.extend(V, W[2])
					}
					U = new p.Overlays[R._jsPlumb.getRenderMode()][T](V);
					if (V.events) {
						for (var S in V.events) {
							U.bind(S, V.events[S])
						}
					}
				} else {
					if (W.constructor == String) {
						U = new p.Overlays[R._jsPlumb.getRenderMode()][W]({
							component: R,
							_jsPlumb: R._jsPlumb
						})
					} else {
						U = W
					}
				}
				R.overlays.push(U)
			},
			L = function(W) {
				var S = R.defaultOverlayKeys || [],
					V = W.overlays,
					T = function(X) {
						return R._jsPlumb.Defaults[X] || p.Defaults[X] || []
					};
				if (!V) {
					V = []
				}
				for (var U = 0; U < S.length; U++) {
					V.unshift.apply(V, T(S[U]))
				}
				return V
			};
		var I = L(M);
		if (I) {
			for (var N = 0; N < I.length; N++) {
				K(I[N])
			}
		}
		var H = function(U) {
				var S = -1;
				for (var T = 0; T < R.overlays.length; T++) {
					if (U === R.overlays[T].id) {
						S = T;
						break
					}
				}
				return S
			};
		this.addOverlay = function(S) {
			K(S);
			R.repaint()
		};
		this.getOverlay = function(T) {
			var S = H(T);
			return S >= 0 ? R.overlays[S] : null
		};
		this.getOverlays = function() {
			return R.overlays
		};
		this.hideOverlay = function(T) {
			var S = R.getOverlay(T);
			if (S) {
				S.hide()
			}
		};
		this.hideOverlays = function() {
			for (var S = 0; S < R.overlays.length; S++) {
				R.overlays[S].hide()
			}
		};
		this.showOverlay = function(T) {
			var S = R.getOverlay(T);
			if (S) {
				S.show()
			}
		};
		this.showOverlays = function() {
			for (var S = 0; S < R.overlays.length; S++) {
				R.overlays[S].show()
			}
		};
		this.removeAllOverlays = function() {
			R.overlays.splice(0, R.overlays.length);
			R.repaint()
		};
		this.removeOverlay = function(T) {
			var S = H(T);
			if (S != -1) {
				var U = R.overlays[S];
				U.cleanup();
				R.overlays.splice(S, 1)
			}
		};
		this.removeOverlays = function() {
			for (var S = 0; S < arguments.length; S++) {
				R.removeOverlay(arguments[S])
			}
		};
		var J = "__label",
			Q = function(U) {
				var S = {
					cssClass: U.cssClass,
					labelStyle: this.labelStyle,
					id: J,
					component: R,
					_jsPlumb: R._jsPlumb
				},
					T = p.extend(S, U);
				return new p.Overlays[R._jsPlumb.getRenderMode()].Label(T)
			};
		if (M.label) {
			var O = M.labelLocation || R.defaultLabelLocation || 0.5,
				P = M.labelStyle || R._jsPlumb.Defaults.LabelStyle || p.Defaults.LabelStyle;
			this.overlays.push(Q({
				label: M.label,
				location: O,
				labelStyle: P
			}))
		}
		this.setLabel = function(S) {
			var T = R.getOverlay(J);
			if (!T) {
				var U = S.constructor == String || S.constructor == Function ? {
					label: S
				} : S;
				T = Q(U);
				this.overlays.push(T)
			} else {
				if (S.constructor == String || S.constructor == Function) {
					T.setLabel(S)
				} else {
					if (S.label) {
						T.setLabel(S.label)
					}
					if (S.location) {
						T.setLocation(S.location)
					}
				}
			}
			R.repaint()
		};
		this.getLabel = function() {
			var S = R.getOverlay(J);
			return S != null ? S.getLabel() : null
		};
		this.getLabelOverlay = function() {
			return R.getOverlay(J)
		}
	}, _bindListeners = function(J, H, I) {
		J.bind("click", function(K, L) {
			H.fire("click", H, L)
		});
		J.bind("dblclick", function(K, L) {
			H.fire("dblclick", H, L)
		});
		J.bind("contextmenu", function(K, L) {
			H.fire("contextmenu", H, L)
		});
		J.bind("mouseenter", function(K, L) {
			if (!H.isHover()) {
				I(true);
				H.fire("mouseenter", H, L)
			}
		});
		J.bind("mouseexit", function(K, L) {
			if (H.isHover()) {
				I(false);
				H.fire("mouseexit", H, L)
			}
		})
	};
	var g = 0,
		c = function() {
			var H = g + 1;
			g++;
			return H
		};
	var x = function(I) {
			this.Defaults = {
				Anchor: "BottomCenter",
				Anchors: [null, null],
				ConnectionsDetachable: true,
				ConnectionOverlays: [],
				Connector: "Bezier",
				Container: null,
				DragOptions: {},
				DropOptions: {},
				Endpoint: "Dot",
				EndpointOverlays: [],
				Endpoints: [null, null],
				EndpointStyle: {
					fillStyle: "#456"
				},
				EndpointStyles: [null, null],
				EndpointHoverStyle: null,
				EndpointHoverStyles: [null, null],
				HoverPaintStyle: null,
				LabelStyle: {
					color: "black"
				},
				LogEnabled: false,
				Overlays: [],
				MaxConnections: 1,
				PaintStyle: {
					lineWidth: 8,
					strokeStyle: "#456"
				},
				RenderMode: "svg",
				Scope: "jsPlumb_DefaultScope"
			};
			if (I) {
				p.extend(this.Defaults, I)
			}
			this.logEnabled = this.Defaults.LogEnabled;
			EventGenerator.apply(this);
			var bg = this,
				aF = c(),
				aH = bg.bind,
				aw = {};
			for (var av in this.Defaults) {
				aw[av] = this.Defaults[av]
			}
			this.bind = function(bp, bo) {
				if ("ready" === bp && J) {
					bo()
				} else {
					aH.apply(bg, [bp, bo])
				}
			};
			bg.importDefaults = function(bp) {
				for (var bo in bp) {
					bg.Defaults[bo] = bp[bo]
				}
			};
			bg.restoreDefaults = function() {
				bg.Defaults = p.extend({}, aw)
			};
			var L = null,
				al = function() {
					p.repaintEverything()
				},
				bi = true,
				aI = function() {
					if (bi) {
						al()
					}
				},
				a7 = null,
				J = false,
				aR = {},
				aM = {},
				aN = {},
				ac = {},
				bk = {},
				a8 = {},
				bf = {},
				bn = [],
				Z = [],
				M = this.Defaults.Scope,
				T = null,
				R = function(br, bp, bq) {
					var bo = br[bp];
					if (bo == null) {
						bo = [];
						br[bp] = bo
					}
					bo.push(bq);
					return bo
				},
				aP = function(bp, bo) {
					if (bg.Defaults.Container) {
						p.CurrentLibrary.appendElement(bp, bg.Defaults.Container)
					} else {
						if (!bo) {
							document.body.appendChild(bp)
						} else {
							p.CurrentLibrary.appendElement(bp, bo)
						}
					}
				},
				ax = 1,
				ae = function() {
					return "" + ax++
				},
				aC = function(bo) {
					return bo._nodes ? bo._nodes : bo
				},
				aZ = false,
				a9 = function(bp, bo) {
					aZ = bp;
					if (bo) {
						bg.repaintEverything()
					}
				},
				a3 = function(bq, bs, br) {
					if (!aZ) {
						var bt = d(bq, "id"),
							bo = bg.dragManager.getElementsForDraggable(bt);
						if (br == null) {
							br = _timestamp()
						}
						bg.anchorManager.redraw(bt, bs, br);
						if (bo) {
							for (var bp in bo) {
								bg.anchorManager.redraw(bo[bp].id, bs, br, bo[bp].offset)
							}
						}
					}
				},
				aA = function(bp, br) {
					var bs = null;
					if (n(bp)) {
						bs = [];
						for (var bo = 0; bo < bp.length; bo++) {
							var bq = D(bp[bo]),
								bt = d(bq, "id");
							bs.push(br(bq, bt))
						}
					} else {
						var bq = D(bp),
							bt = d(bq, "id");
						bs = br(bq, bt)
					}
					return bs
				},
				ao = function(bo) {
					return aN[bo]
				},
				a4 = function(br, bo, bu) {
					var bw = bo == null ? false : bo,
						bs = p.CurrentLibrary;
					if (bw) {
						if (bs.isDragSupported(br) && !bs.isAlreadyDraggable(br)) {
							var bv = bu || bg.Defaults.DragOptions || p.Defaults.DragOptions;
							bv = p.extend({}, bv);
							var bt = bs.dragEvents.drag,
								bp = bs.dragEvents.stop,
								bq = bs.dragEvents.start;
							bv[bq] = ag(bv[bq], function() {
								bg.setHoverSuspended(true)
							});
							bv[bt] = ag(bv[bt], function() {
								var bx = bs.getUIPosition(arguments);
								a3(br, bx);
								z(br, "jsPlumb_dragged")
							});
							bv[bp] = ag(bv[bp], function() {
								var bx = bs.getUIPosition(arguments);
								a3(br, bx);
								o(br, "jsPlumb_dragged");
								bg.setHoverSuspended(false)
							});
							bf[H(br)] = true;
							var bw = bf[H(br)];
							bv.disabled = bw == null ? false : !bw;
							bs.initDraggable(br, bv, false);
							bg.dragManager.register(br)
						}
					}
				},
				au = function(bu, bp) {
					var bo = p.extend({}, bu);
					if (bp) {
						p.extend(bo, bp)
					}
					if (bo.source && bo.source.endpoint) {
						bo.sourceEndpoint = bo.source
					}
					if (bo.source && bo.target.endpoint) {
						bo.targetEndpoint = bo.target
					}
					if (bu.uuids) {
						bo.sourceEndpoint = ao(bu.uuids[0]);
						bo.targetEndpoint = ao(bu.uuids[1])
					}
					if (bo.sourceEndpoint && bo.sourceEndpoint.isFull()) {
						q(bg, "could not add connection; source endpoint is full");
						return
					}
					if (bo.targetEndpoint && bo.targetEndpoint.isFull()) {
						q(bg, "could not add connection; target endpoint is full");
						return
					}
					if (bo.sourceEndpoint && bo.sourceEndpoint.connectorOverlays) {
						bo.overlays = bo.overlays || [];
						for (var bs = 0; bs < bo.sourceEndpoint.connectorOverlays.length; bs++) {
							bo.overlays.push(bo.sourceEndpoint.connectorOverlays[bs])
						}
					}
					bo.tooltip = bu.tooltip;
					if (!bo.tooltip && bo.sourceEndpoint && bo.sourceEndpoint.connectorTooltip) {
						bo.tooltip = bo.sourceEndpoint.connectorTooltip
					}
					if (bo.target && !bo.target.endpoint && !bo.targetEndpoint && !bo.newConnection) {
						var bt = H(bo.target),
							bv = aS[bt],
							bq = aB[bt];
						if (bv) {
							var br = bq != null ? bq : bg.addEndpoint(bo.target, bv);
							if (ba[bt]) {
								aB[bt] = br
							}
							bo.targetEndpoint = br;
							br._makeTargetCreator = true
						}
					}
					if (bo.source && !bo.source.endpoint && !bo.sourceEndpoint && !bo.newConnection) {
						var bt = H(bo.source),
							bv = at[bt],
							bq = aY[bt];
						if (bv) {
							var br = bq != null ? bq : bg.addEndpoint(bo.source, bv);
							if (a2[bt]) {
								aY[bt] = br
							}
							bo.sourceEndpoint = br
						}
					}
					return bo
				},
				Y = function(bs) {
					var br = bg.Defaults.ConnectionType || bg.getDefaultConnectionType(),
						bq = bg.Defaults.EndpointType || aa,
						bp = p.CurrentLibrary.getParent;
					if (bs.container) {
						bs.parent = bs.container
					} else {
						if (bs.sourceEndpoint) {
							bs.parent = bs.sourceEndpoint.parent
						} else {
							if (bs.source.constructor == bq) {
								bs.parent = bs.source.parent
							} else {
								bs.parent = bp(bs.source)
							}
						}
					}
					bs._jsPlumb = bg;
					var bo = new br(bs);
					bo.id = "con_" + ae();
					bl("click", "click", bo);
					bl("dblclick", "dblclick", bo);
					bl("contextmenu", "contextmenu", bo);
					return bo
				},
				bm = function(bp, bq, bo) {
					bq = bq || {};
					if (!bp.suspendedEndpoint) {
						R(aR, bp.scope, bp)
					}
					if (!bq.doNotFireConnectionEvent && bq.fireEvent !== false) {
						bg.fire("jsPlumbConnection", {
							connection: bp,
							source: bp.source,
							target: bp.target,
							sourceId: bp.sourceId,
							targetId: bp.targetId,
							sourceEndpoint: bp.endpoints[0],
							targetEndpoint: bp.endpoints[1]
						}, bo)
					}
					bg.anchorManager.newConnection(bp);
					a3(bp.source)
				},
				bl = function(bo, bp, bq) {
					bq.bind(bo, function(bs, br) {
						bg.fire(bp, bq, br)
					})
				},
				ap = function(bq) {
					if (bq.container) {
						return bq.container
					} else {
						var bo = p.CurrentLibrary.getTagName(bq.source),
							bp = p.CurrentLibrary.getParent(bq.source);
						if (bo && bo.toLowerCase() === "td") {
							return p.CurrentLibrary.getParent(bp)
						} else {
							return bp
						}
					}
				},
				az = function(bq) {
					var bp = bg.Defaults.EndpointType || aa;
					bq.parent = ap(bq);
					bq._jsPlumb = bg;
					var bo = new bp(bq);
					bo.id = "ep_" + ae();
					bl("click", "endpointClick", bo);
					bl("dblclick", "endpointDblClick", bo);
					bl("contextmenu", "contextmenu", bo);
					return bo
				},
				Q = function(bq, bt, bs) {
					var bo = aM[bq];
					if (bo && bo.length) {
						for (var br = 0; br < bo.length; br++) {
							for (var bp = 0; bp < bo[br].connections.length; bp++) {
								var bu = bt(bo[br].connections[bp]);
								if (bu) {
									return
								}
							}
							if (bs) {
								bs(bo[br])
							}
						}
					}
				},
				U = function(bp) {
					for (var bo in aM) {
						Q(bo, bp)
					}
				},
				an = function(bo, bp) {
					if (bo != null && bo.parentNode != null) {
						bo.parentNode.removeChild(bo)
					}
				},
				aQ = function(bq, bp) {
					for (var bo = 0; bo < bq.length; bo++) {
						an(bq[bo], bp)
					}
				},
				bd = function(bp, bo) {
					return aA(bp, function(bq, br) {
						bf[br] = bo;
						if (p.CurrentLibrary.isDragSupported(bq)) {
							p.CurrentLibrary.setDraggable(bq, bo)
						}
					})
				},
				aW = function(bq, br, bo) {
					br = br === "block";
					var bp = null;
					if (bo) {
						if (br) {
							bp = function(bt) {
								bt.setVisible(true, true, true)
							}
						} else {
							bp = function(bt) {
								bt.setVisible(false, true, true)
							}
						}
					}
					var bs = d(bq, "id");
					Q(bs, function(bu) {
						if (br && bo) {
							var bt = bu.sourceId === bs ? 1 : 0;
							if (bu.endpoints[bt].isVisible()) {
								bu.setVisible(true)
							}
						} else {
							bu.setVisible(br)
						}
					}, bp)
				},
				bb = function(bo) {
					return aA(bo, function(bq, bp) {
						var br = bf[bp] == null ? false : bf[bp];
						br = !br;
						bf[bp] = br;
						p.CurrentLibrary.setDraggable(bq, br);
						return br
					})
				},
				aJ = function(bo, bq) {
					var bp = null;
					if (bq) {
						bp = function(br) {
							var bs = br.isVisible();
							br.setVisible(!bs)
						}
					}
					Q(bo, function(bs) {
						var br = bs.isVisible();
						bs.setVisible(!br)
					}, bp)
				},
				S = function(bt) {
					var br = bt.timestamp,
						bo = bt.recalc,
						bs = bt.offset,
						bp = bt.elId;
					if (!bo) {
						if (br && br === bk[bp]) {
							return ac[bp]
						}
					}
					if (bo || !bs) {
						var bq = D(bp);
						if (bq != null) {
							Z[bp] = a(bq);
							ac[bp] = s(bq);
							bk[bp] = br
						}
					} else {
						ac[bp] = bs;
						if (Z[bp] == null) {
							var bq = D(bp);
							if (bq != null) {
								Z[bp] = a(bq)
							}
						}
					}
					if (ac[bp] && !ac[bp].right) {
						ac[bp].right = ac[bp].left + Z[bp][0];
						ac[bp].bottom = ac[bp].top + Z[bp][1];
						ac[bp].width = Z[bp][0];
						ac[bp].height = Z[bp][1];
						ac[bp].centerx = ac[bp].left + (ac[bp].width / 2);
						ac[bp].centery = ac[bp].top + (ac[bp].height / 2)
					}
					return ac[bp]
				},
				aG = function(bo) {
					var bp = ac[bo];
					if (!bp) {
						bp = S({
							elId: bo
						})
					}
					return {
						o: bp,
						s: Z[bo]
					}
				},
				H = function(bo, bp, br) {
					var bq = D(bo);
					var bs = d(bq, "id");
					if (!bs || bs == "undefined") {
						if (arguments.length == 2 && arguments[1] != undefined) {
							bs = bp
						} else {
							if (arguments.length == 1 || (arguments.length == 3 && arguments[2])) {
								bs = "jsPlumb_" + aF + "_" + ae()
							}
						}
						f(bq, "id", bs)
					}
					return bs
				},
				ag = function(bq, bo, bp) {
					bq = bq ||
					function() {};
					bo = bo ||
					function() {};
					return function() {
						var br = null;
						try {
							br = bo.apply(this, arguments)
						} catch (bs) {
							q(bg, "jsPlumb function failed : " + bs)
						}
						if (bp == null || (br !== bp)) {
							try {
								bq.apply(this, arguments)
							} catch (bs) {
								q(bg, "wrapped function failed : " + bs)
							}
						}
						return br
					}
				};
			this.connectorClass = "_jsPlumb_connector";
			this.endpointClass = "_jsPlumb_endpoint";
			this.overlayClass = "_jsPlumb_overlay";
			this.Anchors = {};
			this.Connectors = {
				canvas: {},
				svg: {},
				vml: {}
			};
			this.Endpoints = {
				canvas: {},
				svg: {},
				vml: {}
			};
			this.Overlays = {
				canvas: {},
				svg: {},
				vml: {}
			};
			this.addClass = function(bp, bo) {
				return p.CurrentLibrary.addClass(bp, bo)
			};
			this.removeClass = function(bp, bo) {
				return p.CurrentLibrary.removeClass(bp, bo)
			};
			this.hasClass = function(bp, bo) {
				return p.CurrentLibrary.hasClass(bp, bo)
			};
			this.addEndpoint = function(bq, br, bA) {
				bA = bA || {};
				var bp = p.extend({}, bA);
				p.extend(bp, br);
				bp.endpoint = bp.endpoint || bg.Defaults.Endpoint || p.Defaults.Endpoint;
				bp.paintStyle = bp.paintStyle || bg.Defaults.EndpointStyle || p.Defaults.EndpointStyle;
				bq = aC(bq);
				var bs = [],
					bv = bq.length && bq.constructor != String ? bq : [bq];
				for (var bt = 0; bt < bv.length; bt++) {
					var by = D(bv[bt]),
						bo = H(by);
					bp.source = by;
					S({
						elId: bo
					});
					var bx = az(bp);
					if (bp.parentAnchor) {
						bx.parentAnchor = bp.parentAnchor
					}
					R(aM, bo, bx);
					var bw = ac[bo],
						bu = Z[bo];
					var bz = bx.anchor.compute({
						xy: [bw.left, bw.top],
						wh: bu,
						element: bx
					});
					bx.paint({
						anchorLoc: bz
					});
					bs.push(bx);
					bg.dragManager.endpointAdded(by)
				}
				return bs.length == 1 ? bs[0] : bs
			};
			this.addEndpoints = function(bs, bp, bo) {
				var br = [];
				for (var bq = 0; bq < bp.length; bq++) {
					var bt = bg.addEndpoint(bs, bp[bq], bo);
					if (n(bt)) {
						Array.prototype.push.apply(br, bt)
					} else {
						br.push(bt)
					}
				}
				return br
			};
			this.animate = function(bq, bp, bo) {
				var br = D(bq),
					bu = d(bq, "id");
				bo = bo || {};
				var bt = p.CurrentLibrary.dragEvents.step;
				var bs = p.CurrentLibrary.dragEvents.complete;
				bo[bt] = ag(bo[bt], function() {
					bg.repaint(bu)
				});
				bo[bs] = ag(bo[bs], function() {
					bg.repaint(bu)
				});
				p.CurrentLibrary.animate(br, bp, bo)
			};
			this.checkCondition = function(bq, bs) {
				var bo = bg.getListener(bq);
				var br = true;
				if (bo && bo.length > 0) {
					try {
						for (var bp = 0; bp < bo.length; bp++) {
							br = br && bo[bp](bs)
						}
					} catch (bt) {
						q(bg, "cannot check condition [" + bq + "]" + bt)
					}
				}
				return br
			};
			this.connect = function(br, bp) {
				var bo = au(br, bp);
				if (bo) {
					if (bo.deleteEndpointsOnDetach == null) {
						bo.deleteEndpointsOnDetach = true
					}
					var bq = Y(bo);
					bm(bq, bo);
					return bq
				}
			};
			this.deleteEndpoint = function(bp) {
				var bu = (typeof bp == "string") ? aN[bp] : bp;
				if (bu) {
					var br = bu.getUuid();
					if (br) {
						aN[br] = null
					}
					bu.detachAll();
					aQ(bu.endpoint.getDisplayElements());
					bg.anchorManager.deleteEndpoint(bu);
					for (var bt in aM) {
						var bo = aM[bt];
						if (bo) {
							var bs = [];
							for (var bq = 0; bq < bo.length; bq++) {
								if (bo[bq] != bu) {
									bs.push(bo[bq])
								}
							}
							aM[bt] = bs
						}
					}
					bg.dragManager.endpointDeleted(bu)
				}
			};
			this.deleteEveryEndpoint = function() {
				for (var bq in aM) {
					var bo = aM[bq];
					if (bo && bo.length) {
						for (var bp = 0; bp < bo.length; bp++) {
							bg.deleteEndpoint(bo[bp])
						}
					}
				}
				delete aM;
				aM = {};
				delete aN;
				aN = {}
			};
			var a0 = function(br, bt, bo) {
					var bq = bg.Defaults.ConnectionType || bg.getDefaultConnectionType(),
						bp = br.constructor == bq,
						bs = bp ? {
							connection: br,
							source: br.source,
							target: br.target,
							sourceId: br.sourceId,
							targetId: br.targetId,
							sourceEndpoint: br.endpoints[0],
							targetEndpoint: br.endpoints[1]
						} : br;
					if (bt) {
						bg.fire("jsPlumbConnectionDetached", bs, bo)
					}
					bg.anchorManager.connectionDetached(bs)
				},
				aX = function(bo) {
					bg.fire("connectionDrag", bo)
				},
				aK = function(bo) {
					bg.fire("connectionDragStop", bo)
				};
			this.detach = function() {
				if (arguments.length == 0) {
					return
				}
				var bs = bg.Defaults.ConnectionType || bg.getDefaultConnectionType(),
					bt = arguments[0].constructor == bs,
					br = arguments.length == 2 ? bt ? (arguments[1] || {}) : arguments[0] : arguments[0],
					bw = (br.fireEvent !== false),
					bq = br.forceDetach,
					bp = bt ? arguments[0] : br.connection;
				if (bp) {
					if (bq || (bp.isDetachAllowed(bp) && bp.endpoints[0].isDetachAllowed(bp) && bp.endpoints[1].isDetachAllowed(bp))) {
						if (bq || bg.checkCondition("beforeDetach", bp)) {
							bp.endpoints[0].detach(bp, false, true, bw)
						}
					}
				} else {
					var bo = p.extend({}, br);
					if (bo.uuids) {
						ao(bo.uuids[0]).detachFrom(ao(bo.uuids[1]), bw)
					} else {
						if (bo.sourceEndpoint && bo.targetEndpoint) {
							bo.sourceEndpoint.detachFrom(bo.targetEndpoint)
						} else {
							var bv = H(bo.source),
								bu = H(bo.target);
							Q(bv, function(bx) {
								if ((bx.sourceId == bv && bx.targetId == bu) || (bx.targetId == bv && bx.sourceId == bu)) {
									if (bg.checkCondition("beforeDetach", bx)) {
										bx.endpoints[0].detach(bx, false, true, bw)
									}
								}
							})
						}
					}
				}
			};
			this.detachAllConnections = function(bq, br) {
				br = br || {};
				bq = D(bq);
				var bs = d(bq, "id"),
					bo = aM[bs];
				if (bo && bo.length) {
					for (var bp = 0; bp < bo.length; bp++) {
						bo[bp].detachAll(br.fireEvent)
					}
				}
			};
			this.detachEveryConnection = function(bq) {
				bq = bq || {};
				for (var br in aM) {
					var bo = aM[br];
					if (bo && bo.length) {
						for (var bp = 0; bp < bo.length; bp++) {
							bo[bp].detachAll(bq.fireEvent)
						}
					}
				}
				delete aR;
				aR = {}
			};
			this.draggable = function(bq, bo) {
				if (typeof bq == "object" && bq.length) {
					for (var bp = 0; bp < bq.length; bp++) {
						var br = D(bq[bp]);
						if (br) {
							a4(br, true, bo)
						}
					}
				} else {
					if (bq._nodes) {
						for (var bp = 0; bp < bq._nodes.length; bp++) {
							var br = D(bq._nodes[bp]);
							if (br) {
								a4(br, true, bo)
							}
						}
					} else {
						var br = D(bq);
						if (br) {
							a4(br, true, bo)
						}
					}
				}
			};
			this.extend = function(bp, bo) {
				return p.CurrentLibrary.extend(bp, bo)
			};
			this.getDefaultEndpointType = function() {
				return aa
			};
			this.getDefaultConnectionType = function() {
				return aq
			};
			var bj = function(bs, br, bp, bo) {
					for (var bq = 0; bq < bs.length; bq++) {
						bs[bq][br].apply(bs[bq], bp)
					}
					return bo(bs)
				},
				O = function(bs, br, bp) {
					var bo = [];
					for (var bq = 0; bq < bs.length; bq++) {
						bo.push([bs[bq][br].apply(bs[bq], bp), bs[bq]])
					}
					return bo
				},
				ah = function(bq, bp, bo) {
					return function() {
						return bj(bq, bp, arguments, bo)
					}
				},
				ar = function(bp, bo) {
					return function() {
						return O(bp, bo, arguments)
					}
				};
			this.getConnections = function(bA, bp) {
				if (!bA) {
					bA = {}
				} else {
					if (bA.constructor == String) {
						bA = {
							scope: bA
						}
					}
				}
				var bx = function(bB) {
						var bC = [];
						if (bB) {
							if (typeof bB == "string") {
								if (bB === "*") {
									return bB
								}
								bC.push(bB)
							} else {
								bC = bB
							}
						}
						return bC
					},
					by = bA.scope || bg.getDefaultScope(),
					bw = bx(by),
					bo = bx(bA.source),
					bu = bx(bA.target),
					bq = function(bC, bB) {
						if (bC === "*") {
							return true
						}
						return bC.length > 0 ? G(bC, bB) != -1 : true
					},
					bt = (!bp && bw.length > 1) ? {} : [],
					bz = function(bC, bD) {
						if (!bp && bw.length > 1) {
							var bB = bt[bC];
							if (bB == null) {
								bB = [];
								bt[bC] = bB
							}
							bB.push(bD)
						} else {
							bt.push(bD)
						}
					};
				for (var bs in aR) {
					if (bq(bw, bs)) {
						for (var br = 0; br < aR[bs].length; br++) {
							var bv = aR[bs][br];
							if (bq(bo, bv.sourceId) && bq(bu, bv.targetId)) {
								bz(bs, bv)
							}
						}
					}
				}
				return bt
			};
			var aE = function(bo) {
					return {
						setHover: ah(bo, "setHover", aE),
						removeAllOverlays: ah(bo, "removeAllOverlays", aE),
						setLabel: ah(bo, "setLabel", aE),
						addOverlay: ah(bo, "addOverlay", aE),
						removeOverlay: ah(bo, "removeOverlay", aE),
						removeOverlays: ah(bo, "removeOverlays", aE),
						showOverlay: ah(bo, "showOverlay", aE),
						hideOverlay: ah(bo, "hideOverlay", aE),
						showOverlays: ah(bo, "showOverlays", aE),
						hideOverlays: ah(bo, "hideOverlays", aE),
						setPaintStyle: ah(bo, "setPaintStyle", aE),
						setHoverPaintStyle: ah(bo, "setHoverPaintStyle", aE),
						setDetachable: ah(bo, "setDetachable", aE),
						setConnector: ah(bo, "setConnector", aE),
						setParameter: ah(bo, "setParameter", aE),
						setParameters: ah(bo, "setParameters", aE),
						detach: function() {
							for (var bp = 0; bp < bo.length; bp++) {
								bg.detach(bo[bp])
							}
						},
						getLabel: ar(bo, "getLabel"),
						getOverlay: ar(bo, "getOverlay"),
						isHover: ar(bo, "isHover"),
						isDetachable: ar(bo, "isDetachable"),
						getParameter: ar(bo, "getParameter"),
						getParameters: ar(bo, "getParameters"),
						length: bo.length,
						each: function(bq) {
							for (var bp = 0; bp < bo.length; bp++) {
								bq(bo[bp])
							}
							return aE(bo)
						},
						get: function(bp) {
							return bo[bp]
						}
					}
				};
			this.select = function(bo) {
				bo = bo || {};
				bo.scope = bo.scope || "*";
				var bp = bg.getConnections(bo, true);
				return aE(bp)
			};
			this.getAllConnections = function() {
				return aR
			};
			this.getDefaultScope = function() {
				return M
			};
			this.getEndpoint = ao;
			this.getEndpoints = function(bo) {
				return aM[H(bo)]
			};
			this.getId = H;
			this.getOffset = function(bp) {
				var bo = ac[bp];
				return S({
					elId: bp
				})
			};
			this.getSelector = function(bo) {
				return p.CurrentLibrary.getSelector(bo)
			};
			this.getSize = function(bp) {
				var bo = Z[bp];
				if (!bo) {
					S({
						elId: bp
					})
				}
				return Z[bp]
			};
			this.appendElement = aP;
			var aL = false;
			this.isHoverSuspended = function() {
				return aL
			};
			this.setHoverSuspended = function(bo) {
				aL = bo
			};
			this.isCanvasAvailable = function() {
				return y
			};
			this.isSVGAvailable = function() {
				return e
			};
			this.isVMLAvailable = b;
			this.hide = function(bo, bp) {
				aW(bo, "none", bp)
			};
			this.idstamp = ae;
			this.init = function() {
				if (!J) {
					bg.setRenderMode(bg.Defaults.RenderMode);
					var bo = function(bp) {
							p.CurrentLibrary.bind(document, bp, function(bv) {
								if (!bg.currentlyDragging && T == p.CANVAS) {
									for (var bu in aR) {
										var bw = aR[bu];
										for (var bs = 0; bs < bw.length; bs++) {
											var br = bw[bs].connector[bp](bv);
											if (br) {
												return
											}
										}
									}
									for (var bt in aM) {
										var bq = aM[bt];
										for (var bs = 0; bs < bq.length; bs++) {
											if (bq[bs].endpoint[bp](bv)) {
												return
											}
										}
									}
								}
							})
						};
					bo("click");
					bo("dblclick");
					bo("mousemove");
					bo("mousedown");
					bo("mouseup");
					bo("contextmenu");
					J = true;
					bg.fire("ready")
				}
			};
			this.log = L;
			this.jsPlumbUIComponent = jsPlumbUIComponent;
			this.EventGenerator = EventGenerator;
			this.makeAnchor = function() {
				if (arguments.length == 0) {
					return null
				}
				var bt = arguments[0],
					bq = arguments[1],
					bp = arguments[2],
					br = null;
				if (bt.compute && bt.getOrientation) {
					return bt
				} else {
					if (typeof bt == "string") {
						br = p.Anchors[arguments[0]]({
							elementId: bq,
							jsPlumbInstance: bg
						})
					} else {
						if (n(bt)) {
							if (n(bt[0]) || A(bt[0])) {
								if (bt.length == 2 && A(bt[0]) && v(bt[1])) {
									var bo = p.extend({
										elementId: bq,
										jsPlumbInstance: bg
									}, bt[1]);
									br = p.Anchors[bt[0]](bo)
								} else {
									br = new ak(bt, null, bq)
								}
							} else {
								var bs = {
									x: bt[0],
									y: bt[1],
									orientation: (bt.length >= 4) ? [bt[2], bt[3]] : [0, 0],
									offsets: (bt.length == 6) ? [bt[4], bt[5]] : [0, 0],
									elementId: bq
								};
								br = new W(bs);
								br.clone = function() {
									return new W(bs)
								}
							}
						}
					}
				}
				if (!br.id) {
					br.id = "anchor_" + ae()
				}
				return br
			};
			this.makeAnchors = function(br, bp, bo) {
				var bs = [];
				for (var bq = 0; bq < br.length; bq++) {
					if (typeof br[bq] == "string") {
						bs.push(p.Anchors[br[bq]]({
							elementId: bp,
							jsPlumbInstance: bo
						}))
					} else {
						if (n(br[bq])) {
							bs.push(bg.makeAnchor(br[bq], bp, bo))
						}
					}
				}
				return bs
			};
			this.makeDynamicAnchor = function(bo, bp) {
				return new ak(bo, bp)
			};
			var aS = {},
				aB = {},
				ba = {},
				aj = {},
				X = function(bo, bp) {
					bo.paintStyle = bo.paintStyle || bg.Defaults.EndpointStyles[bp] || bg.Defaults.EndpointStyle || p.Defaults.EndpointStyles[bp] || p.Defaults.EndpointStyle;
					bo.hoverPaintStyle = bo.hoverPaintStyle || bg.Defaults.EndpointHoverStyles[bp] || bg.Defaults.EndpointHoverStyle || p.Defaults.EndpointHoverStyles[bp] || p.Defaults.EndpointHoverStyle;
					bo.anchor = bo.anchor || bg.Defaults.Anchors[bp] || bg.Defaults.Anchor || p.Defaults.Anchors[bp] || p.Defaults.Anchor;
					bo.endpoint = bo.endpoint || bg.Defaults.Endpoints[bp] || bg.Defaults.Endpoint || p.Defaults.Endpoints[bp] || p.Defaults.Endpoint
				};
			this.makeTarget = function(br, bs, by) {
				var bp = p.extend({
					_jsPlumb: bg
				}, by);
				p.extend(bp, bs);
				X(bp, 1);
				var bw = p.CurrentLibrary,
					bx = bp.scope || bg.Defaults.Scope,
					bt = !(bp.deleteEndpointsOnDetach === false),
					bq = bp.maxConnections || -1,
					bo = function(bD) {
						var bB = H(bD);
						aS[bB] = bp;
						ba[bB] = bp.uniqueEndpoint, aj[bB] = bq, proxyComponent = new jsPlumbUIComponent(bp);
						var bA = p.extend({}, bp.dropOptions || {}),
							bz = function() {
								var bG = p.CurrentLibrary.getDropEvent(arguments),
									bI = bg.select({
										target: bB
									}).length;
								if (aj[bB] > 0 && bI >= aj[bB]) {
									console.log("target element " + bB + " is full.");
									return false
								}
								bg.currentlyDragging = false;
								var bS = D(bw.getDragObject(arguments)),
									bH = d(bS, "dragId"),
									bQ = d(bS, "originalScope"),
									bN = a8[bH],
									bF = bN.endpoints[0],
									bE = bp.endpoint ? p.extend({}, bp.endpoint) : {};
								bF.anchor.locked = false;
								if (bQ) {
									bw.setDragScope(bS, bQ)
								}
								var bL = proxyComponent.isDropAllowed(bN.sourceId, H(bD), bN.scope);
								if (bN.endpointsToDeleteOnDetach) {
									if (bF === bN.endpointsToDeleteOnDetach[0]) {
										bN.endpointsToDeleteOnDetach[0] = null
									} else {
										if (bF === bN.endpointsToDeleteOnDetach[1]) {
											bN.endpointsToDeleteOnDetach[1] = null
										}
									}
								}
								if (bN.suspendedEndpoint) {
									bN.targetId = bN.suspendedEndpoint.elementId;
									bN.target = bw.getElementObject(bN.suspendedEndpoint.elementId);
									bN.endpoints[1] = bN.suspendedEndpoint
								}
								if (bL) {
									bF.detach(bN, false, true, false);
									var bR = aB[bB] || bg.addEndpoint(bD, bp);
									if (bp.uniqueEndpoint) {
										aB[bB] = bR
									}
									bR._makeTargetCreator = true;
									if (bR.anchor.positionFinder != null) {
										var bO = bw.getUIPosition(arguments),
											bK = bw.getOffset(bD),
											bP = bw.getSize(bD),
											bJ = bR.anchor.positionFinder(bO, bK, bP, bR.anchor.constructorParams);
										bR.anchor.x = bJ[0];
										bR.anchor.y = bJ[1]
									}
									var bM = bg.connect({
										source: bF,
										target: bR,
										scope: bQ,
										previousConnection: bN,
										container: bN.parent,
										deleteEndpointsOnDetach: bt,
										doNotFireConnectionEvent: bF.endpointWillMoveAfterConnection
									});
									if (bN.endpoints[1]._makeTargetCreator && bN.endpoints[1].connections.length < 2) {
										bg.deleteEndpoint(bN.endpoints[1])
									}
									if (bt) {
										bM.endpointsToDeleteOnDetach = [bF, bR]
									}
									bM.repaint()
								} else {
									if (bN.suspendedEndpoint) {
										if (bF.isReattach) {
											bN.setHover(false);
											bN.floatingAnchorIndex = null;
											bN.suspendedEndpoint.addConnection(bN);
											bg.repaint(bF.elementId)
										} else {
											bF.detach(bN, false, true, true, bG)
										}
									}
								}
							};
						var bC = bw.dragEvents.drop;
						bA.scope = bA.scope || bx;
						bA[bC] = ag(bA[bC], bz);
						bw.initDroppable(bD, bA, true)
					};
				br = aC(br);
				var bv = br.length && br.constructor != String ? br : [br];
				for (var bu = 0; bu < bv.length; bu++) {
					bo(D(bv[bu]))
				}
			};
			this.makeTargets = function(bq, br, bo) {
				for (var bp = 0; bp < bq.length; bp++) {
					bg.makeTarget(bq[bp], br, bo)
				}
			};
			var at = {},
				aY = {},
				a2 = {};
			this.makeSource = function(bs, bv, bo) {
				var bt = p.extend({}, bo);
				p.extend(bt, bv);
				X(bt, 0);
				var br = p.CurrentLibrary,
					bu = function(bD) {
						var bx = H(bD),
							bE = bt.parent,
							bw = bE != null ? bg.getId(br.getElementObject(bE)) : bx;
						at[bw] = bt;
						a2[bw] = bt.uniqueEndpoint;
						var by = br.dragEvents.stop,
							bC = br.dragEvents.drag,
							bF = p.extend({}, bt.dragOptions || {}),
							bA = bF.drag,
							bG = bF.stop,
							bH = null,
							bB = false;
						bF.scope = bF.scope || bt.scope;
						bF[bC] = ag(bF[bC], function() {
							if (bA) {
								bA.apply(this, arguments)
							}
							bB = false
						});
						bF[by] = ag(bF[by], function() {
							if (bG) {
								bG.apply(this, arguments)
							}
							bg.currentlyDragging = false;
							if (bH.connections.length == 0) {
								bg.deleteEndpoint(bH)
							} else {
								br.unbind(bH.canvas, "mousedown");
								var bJ = bt.anchor || bg.Defaults.Anchor,
									bK = bH.anchor,
									bM = bH.connections[0];
								bH.anchor = bg.makeAnchor(bJ, bx, bg);
								if (bt.parent) {
									var bL = br.getElementObject(bt.parent);
									if (bL) {
										var bI = bH.elementId;
										bH.setElement(bL);
										bH.endpointWillMoveAfterConnection = false;
										bg.anchorManager.rehomeEndpoint(bI, bL);
										bM.previousConnection = null;
										B(aR[bM.scope], function(bN) {
											return bN.id === bM.id
										});
										bg.anchorManager.connectionDetached({
											sourceId: bM.sourceId,
											targetId: bM.targetId,
											connection: bM
										});
										bm(bM)
									}
								}
								bH.repaint();
								bg.repaint(bH.elementId);
								bg.repaint(bM.targetId)
							}
						});
						var bz = function(bJ) {
								var bO = S({
									elId: bx
								});
								var bN = ((bJ.pageX || bJ.page.x) - bO.left) / bO.width,
									bM = ((bJ.pageY || bJ.page.y) - bO.top) / bO.height,
									bS = bN,
									bR = bM;
								if (bt.parent) {
									var bL = p.CurrentLibrary.getElementObject(bt.parent),
										bK = H(bL);
									bO = S({
										elId: bK
									});
									bS = ((bJ.pageX || bJ.page.x) - bO.left) / bO.width, bR = ((bJ.pageY || bJ.page.y) - bO.top) / bO.height
								}
								var bQ = {};
								p.extend(bQ, bt);
								bQ.isSource = true;
								bQ.anchor = [bN, bM, 0, 0];
								bQ.parentAnchor = [bS, bR, 0, 0];
								bQ.dragOptions = bF;
								if (bt.parent) {
									var bI = bQ.container || bg.Defaults.Container;
									if (bI) {
										bQ.container = bI
									} else {
										bQ.container = p.CurrentLibrary.getParent(bt.parent)
									}
								}
								bH = bg.addEndpoint(bx, bQ);
								bB = true;
								bH.endpointWillMoveAfterConnection = bt.parent != null;
								bH.endpointWillMoveTo = bt.parent ? br.getElementObject(bt.parent) : null;
								var bP = function() {
										if (bB) {
											bg.deleteEndpoint(bH)
										}
									};
								bg.registerListener(bH.canvas, "mouseup", bP);
								bg.registerListener(bD, "mouseup", bP);
								br.trigger(bH.canvas, "mousedown", bJ)
							};
						bg.registerListener(bD, "mousedown", bz)
					};
				bs = aC(bs);
				var bp = bs.length && bs.constructor != String ? bs : [bs];
				for (var bq = 0; bq < bp.length; bq++) {
					bu(D(bp[bq]))
				}
			};
			this.makeSources = function(bq, br, bo) {
				for (var bp = 0; bp < bq.length; bp++) {
					bg.makeSource(bq[bp], br, bo)
				}
			};
			this.ready = function(bo) {
				bg.bind("ready", bo)
			}, this.repaint = function(bp) {
				var bq = function(br) {
						a3(D(br))
					};
				if (typeof bp == "object") {
					for (var bo = 0; bo < bp.length; bo++) {
						bq(bp[bo])
					}
				} else {
					bq(bp)
				}
			};
			this.repaintEverything = function() {
				for (var bo in aM) {
					a3(D(bo), null, null)
				}
			};
			this.removeAllEndpoints = function(bq) {
				var bo = d(bq, "id"),
					br = aM[bo];
				if (br) {
					for (var bp = 0; bp < br.length; bp++) {
						bg.deleteEndpoint(br[bp])
					}
				}
				aM[bo] = []
			};
			this.removeEveryEndpoint = this.deleteEveryEndpoint;
			this.removeEndpoint = function(bo, bp) {
				bg.deleteEndpoint(bp)
			};
			var ab = {},
				a6 = function() {
					for (var bp in ab) {
						for (var bo = 0; bo < ab[bp].length; bo++) {
							var bq = ab[bp][bo];
							p.CurrentLibrary.unbind(bq.el, bq.event, bq.listener)
						}
					}
					ab = {}
				};
			this.registerListener = function(bp, bo, bq) {
				p.CurrentLibrary.bind(bp, bo, bq);
				R(ab, bo, {
					el: bp,
					event: bo,
					listener: bq
				})
			};
			this.reset = function() {
				bg.deleteEveryEndpoint();
				bg.clearListeners();
				aS = {};
				aB = {};
				ba = {};
				aj = {};
				at = {};
				aY = {};
				a2 = {};
				a6();
				bg.anchorManager.reset();
				bg.dragManager.reset()
			};
			this.setDefaultScope = function(bo) {
				M = bo
			};
			this.setDraggable = bd;
			this.setId = function(bs, bo, bu) {
				var bv = bs.constructor == String ? bs : bg.getId(bs),
					br = bg.getConnections({
						source: bv,
						scope: "*"
					}, true),
					bq = bg.getConnections({
						target: bv,
						scope: "*"
					}, true);
				bo = "" + bo;
				if (!bu) {
					bs = p.CurrentLibrary.getElementObject(bv);
					p.CurrentLibrary.setAttribute(bs, "id", bo)
				}
				bs = p.CurrentLibrary.getElementObject(bo);
				aM[bo] = aM[bv] || [];
				for (var bp = 0; bp < aM[bo].length; bp++) {
					aM[bo][bp].elementId = bo;
					aM[bo][bp].element = bs;
					aM[bo][bp].anchor.elementId = bo
				}
				delete aM[bv];
				bg.anchorManager.changeId(bv, bo);
				var bt = function(bz, bw, by) {
						for (var bx = 0; bx < bz.length; bx++) {
							bz[bx].endpoints[bw].elementId = bo;
							bz[bx].endpoints[bw].element = bs;
							bz[bx][by + "Id"] = bo;
							bz[bx][by] = bs
						}
					};
				bt(br, 0, "source");
				bt(bq, 1, "target")
			};
			this.setIdChanged = function(bp, bo) {
				bg.setId(bp, bo, true)
			};
			this.setDebugLog = function(bo) {
				L = bo
			};
			this.setRepaintFunction = function(bo) {
				al = bo
			};
			this.setSuspendDrawing = a9;
			this.CANVAS = "canvas";
			this.SVG = "svg";
			this.VML = "vml";
			this.setRenderMode = function(bo) {
				if (bo) {
					bo = bo.toLowerCase()
				} else {
					return
				}
				if (bo !== p.CANVAS && bo !== p.SVG && bo !== p.VML) {
					throw new Error("render mode must be one of jsPlumb.CANVAS, jsPlumb.SVG or jsPlumb.VML")
				}
				if (bo === p.CANVAS && y) {
					T = p.CANVAS
				} else {
					if (bo === p.SVG && e) {
						T = p.SVG
					} else {
						if (b()) {
							T = p.VML
						}
					}
				}
				return T
			};
			this.getRenderMode = function() {
				return T
			};
			this.show = function(bo, bp) {
				aW(bo, "block", bp)
			};
			this.sizeCanvas = function(bq, bo, bs, bp, br) {
				if (bq) {
					bq.style.height = br + "px";
					bq.height = br;
					bq.style.width = bp + "px";
					bq.width = bp;
					bq.style.left = bo + "px";
					bq.style.top = bs + "px"
				}
			};
			this.getTestHarness = function() {
				return {
					endpointsByElement: aM,
					endpointCount: function(bo) {
						var bp = aM[bo];
						return bp ? bp.length : 0
					},
					connectionCount: function(bo) {
						bo = bo || M;
						var bp = aR[bo];
						return bp ? bp.length : 0
					},
					getId: H,
					makeAnchor: self.makeAnchor,
					makeDynamicAnchor: self.makeDynamicAnchor
				}
			};
			this.toggle = aJ;
			this.toggleVisible = aJ;
			this.toggleDraggable = bb;
			this.unload = function() {};
			this.wrap = ag;
			this.addListener = this.bind;
			var bh = function(bt, bq) {
					var br = null,
						bo = bt;
					if (bq.tagName.toLowerCase() === "svg" && bq.parentNode) {
						br = bq.parentNode
					} else {
						if (bq.offsetParent) {
							br = bq.offsetParent
						}
					}
					if (br != null) {
						var bp = br.tagName.toLowerCase() === "body" ? {
							left: 0,
							top: 0
						} : s(br),
							bs = br.tagName.toLowerCase() === "body" ? {
								left: 0,
								top: 0
							} : {
								left: br.scrollLeft,
								top: br.scrollTop
							};
						bo[0] = bt[0] - bp.left + bs.left;
						bo[1] = bt[1] - bp.top + bs.top
					}
					return bo
				};
			var W = function(bs) {
					var bq = this;
					this.x = bs.x || 0;
					this.y = bs.y || 0;
					this.elementId = bs.elementId;
					var bp = bs.orientation || [0, 0];
					var br = null,
						bo = null;
					this.offsets = bs.offsets || [0, 0];
					bq.timestamp = null;
					this.compute = function(bx) {
						var bw = bx.xy,
							bt = bx.wh,
							bu = bx.element,
							bv = bx.timestamp;
						if (bv && bv === bq.timestamp) {
							return bo
						}
						bo = [bw[0] + (bq.x * bt[0]) + bq.offsets[0], bw[1] + (bq.y * bt[1]) + bq.offsets[1]];
						bo = bh(bo, bu.canvas);
						bq.timestamp = bv;
						return bo
					};
					this.getOrientation = function(bt) {
						return bp
					};
					this.equals = function(bt) {
						if (!bt) {
							return false
						}
						var bu = bt.getOrientation();
						var bv = this.getOrientation();
						return this.x == bt.x && this.y == bt.y && this.offsets[0] == bt.offsets[0] && this.offsets[1] == bt.offsets[1] && bv[0] == bu[0] && bv[1] == bu[1]
					};
					this.getCurrentLocation = function() {
						return bo
					}
				};
			var aU = function(bu) {
					var bs = bu.reference,
						bt = bu.referenceCanvas,
						bq = a(D(bt)),
						bp = 0,
						bv = 0,
						bo = null,
						br = null;
					this.x = 0;
					this.y = 0;
					this.isFloating = true;
					this.compute = function(bz) {
						var by = bz.xy,
							bx = bz.element,
							bw = [by[0] + (bq[0] / 2), by[1] + (bq[1] / 2)];
						bw = bh(bw, bx.canvas);
						br = bw;
						return bw
					};
					this.getOrientation = function(bx) {
						if (bo) {
							return bo
						} else {
							var bw = bs.getOrientation(bx);
							return [Math.abs(bw[0]) * bp * -1, Math.abs(bw[1]) * bv * -1]
						}
					};
					this.over = function(bw) {
						bo = bw.getOrientation()
					};
					this.out = function() {
						bo = null
					};
					this.getCurrentLocation = function() {
						return br
					}
				};
			var ak = function(bq, bp, bv) {
					this.isSelective = true;
					this.isDynamic = true;
					var by = [],
						bx = this,
						bw = function(bz) {
							return bz.constructor == W ? bz : bg.makeAnchor(bz, bv, bg)
						};
					for (var bu = 0; bu < bq.length; bu++) {
						by[bu] = bw(bq[bu])
					}
					this.addAnchor = function(bz) {
						by.push(bw(bz))
					};
					this.getAnchors = function() {
						return by
					};
					this.locked = false;
					var br = by.length > 0 ? by[0] : null,
						bt = by.length > 0 ? 0 : -1,
						bx = this,
						bs = function(bB, bz, bF, bE, bA) {
							var bD = bE[0] + (bB.x * bA[0]),
								bC = bE[1] + (bB.y * bA[1]);
							return Math.sqrt(Math.pow(bz - bD, 2) + Math.pow(bF - bC, 2))
						},
						bo = bp ||
					function(bJ, bA, bB, bC, bz) {
						var bE = bB[0] + (bC[0] / 2),
							bD = bB[1] + (bC[1] / 2);
						var bG = -1,
							bI = Infinity;
						for (var bF = 0; bF < bz.length; bF++) {
							var bH = bs(bz[bF], bE, bD, bJ, bA);
							if (bH < bI) {
								bG = bF + 0;
								bI = bH
							}
						}
						return bz[bG]
					};
					this.compute = function(bD) {
						var bC = bD.xy,
							bz = bD.wh,
							bB = bD.timestamp,
							bA = bD.txy,
							bE = bD.twh;
						if (bx.locked || bA == null || bE == null) {
							return br.compute(bD)
						} else {
							bD.timestamp = null
						}
						br = bo(bC, bz, bA, bE, by);
						bx.x = br.x;
						bx.y = br.y;
						return br.compute(bD)
					};
					this.getCurrentLocation = function() {
						return br != null ? br.getCurrentLocation() : null
					};
					this.getOrientation = function(bz) {
						return br != null ? br.getOrientation(bz) : [0, 0]
					};
					this.over = function(bz) {
						if (br != null) {
							br.over(bz)
						}
					};
					this.out = function() {
						if (br != null) {
							br.out()
						}
					}
				};
			var bc = {},
				ad = {},
				aD = {},
				P = {
					HORIZONTAL: "horizontal",
					VERTICAL: "vertical",
					DIAGONAL: "diagonal",
					IDENTITY: "identity"
				},
				be = function(bx, by, bu, br) {
					if (bx === by) {
						return {
							orientation: P.IDENTITY,
							a: ["top", "top"]
						}
					}
					var bp = Math.atan2((br.centery - bu.centery), (br.centerx - bu.centerx)),
						bs = Math.atan2((bu.centery - br.centery), (bu.centerx - br.centerx)),
						bt = ((bu.left <= br.left && bu.right >= br.left) || (bu.left <= br.right && bu.right >= br.right) || (bu.left <= br.left && bu.right >= br.right) || (br.left <= bu.left && br.right >= bu.right)),
						bz = ((bu.top <= br.top && bu.bottom >= br.top) || (bu.top <= br.bottom && bu.bottom >= br.bottom) || (bu.top <= br.top && bu.bottom >= br.bottom) || (br.top <= bu.top && br.bottom >= bu.bottom));
					if (!(bt || bz)) {
						var bw = null,
							bq = false,
							bo = false,
							bv = null;
						if (br.left > bu.left && br.top > bu.top) {
							bw = ["right", "top"]
						} else {
							if (br.left > bu.left && bu.top > br.top) {
								bw = ["top", "left"]
							} else {
								if (br.left < bu.left && br.top < bu.top) {
									bw = ["top", "right"]
								} else {
									if (br.left < bu.left && br.top > bu.top) {
										bw = ["left", "top"]
									}
								}
							}
						}
						return {
							orientation: P.DIAGONAL,
							a: bw,
							theta: bp,
							theta2: bs
						}
					} else {
						if (bt) {
							return {
								orientation: P.HORIZONTAL,
								a: bu.top < br.top ? ["bottom", "top"] : ["top", "bottom"],
								theta: bp,
								theta2: bs
							}
						} else {
							return {
								orientation: P.VERTICAL,
								a: bu.left < br.left ? ["right", "left"] : ["left", "right"],
								theta: bp,
								theta2: bs
							}
						}
					}
				},
				aV = function(bC, by, bw, bx, bD, bz, bq) {
					var bE = [],
						bp = by[bD ? 0 : 1] / (bx.length + 1);
					for (var bA = 0; bA < bx.length; bA++) {
						var bF = (bA + 1) * bp,
							bo = bz * by[bD ? 1 : 0];
						if (bq) {
							bF = by[bD ? 0 : 1] - bF
						}
						var bv = (bD ? bF : bo),
							bs = bw[0] + bv,
							bu = bv / by[0],
							bt = (bD ? bo : bF),
							br = bw[1] + bt,
							bB = bt / by[1];
						bE.push([bs, br, bu, bB, bx[bA][1], bx[bA][2]])
					}
					return bE
				},
				a1 = function(bp, bo) {
					return bp[0] > bo[0] ? 1 : -1
				},
				V = function(bo) {
					return function(bq, bp) {
						var br = true;
						if (bo) {
							if (bq[0][0] < bp[0][0]) {
								br = true
							} else {
								br = bq[0][1] > bp[0][1]
							}
						} else {
							if (bq[0][0] > bp[0][0]) {
								br = true
							} else {
								br = bq[0][1] > bp[0][1]
							}
						}
						return br === false ? -1 : 1
					}
				},
				K = function(bp, bo) {
					var br = bp[0][0] < 0 ? -Math.PI - bp[0][0] : Math.PI - bp[0][0],
						bq = bo[0][0] < 0 ? -Math.PI - bo[0][0] : Math.PI - bo[0][0];
					if (br > bq) {
						return 1
					} else {
						return bp[0][1] > bo[0][1] ? 1 : -1
					}
				},
				aT = {
					top: a1,
					right: V(true),
					bottom: V(true),
					left: K
				},
				ai = function(bo, bp) {
					return bo.sort(bp)
				},
				af = function(bp, bo) {
					var br = Z[bp],
						bs = ac[bp],
						bq = function(bz, bG, bv, by, bE, bD, bu) {
							if (by.length > 0) {
								var bC = ai(by, aT[bz]),
									bA = bz === "right" || bz === "top",
									bt = aV(bz, bG, bv, bC, bE, bD, bA);
								var bH = function(bK, bJ) {
										var bI = bh([bJ[0], bJ[1]], bK.canvas);
										ad[bK.id] = [bI[0], bI[1], bJ[2], bJ[3]];
										aD[bK.id] = bu
									};
								for (var bw = 0; bw < bt.length; bw++) {
									var bB = bt[bw][4],
										bF = bB.endpoints[0].elementId === bp,
										bx = bB.endpoints[1].elementId === bp;
									if (bF) {
										bH(bB.endpoints[0], bt[bw])
									} else {
										if (bx) {
											bH(bB.endpoints[1], bt[bw])
										}
									}
								}
							}
						};
					bq("bottom", br, [bs.left, bs.top], bo.bottom, true, 1, [0, 1]);
					bq("top", br, [bs.left, bs.top], bo.top, true, 0, [0, -1]);
					bq("left", br, [bs.left, bs.top], bo.left, false, 0, [-1, 0]);
					bq("right", br, [bs.left, bs.top], bo.right, false, 1, [1, 0])
				},
				ay = function() {
					var bo = {},
						bs = {},
						bp = this,
						br = {};
					this.reset = function() {
						bo = {};
						bs = {};
						br = {}
					};
					this.newConnection = function(bw) {
						var by = bw.sourceId,
							bv = bw.targetId,
							bt = bw.endpoints,
							bx = true,
							bu = function(bz, bA, bC, bB, bD) {
								if ((by == bv) && bC.isContinuous) {
									p.CurrentLibrary.removeElement(bt[1].canvas);
									bx = false
								}
								R(bs, bB, [bD, bA, bC.constructor == ak])
							};
						bu(0, bt[0], bt[0].anchor, bv, bw);
						if (bx) {
							bu(1, bt[1], bt[1].anchor, by, bw)
						}
					};
					this.connectionDetached = function(bt) {
						var bu = bt.connection || bt;
						var bz = bu.sourceId,
							bA = bu.targetId,
							bD = bu.endpoints,
							by = function(bE, bF, bH, bG, bI) {
								if (bH.constructor == aU) {} else {
									B(bs[bG], function(bJ) {
										return bJ[0].id == bI.id
									})
								}
							};
						by(1, bD[1], bD[1].anchor, bz, bu);
						by(0, bD[0], bD[0].anchor, bA, bu);
						var bv = bu.sourceId,
							bw = bu.targetId,
							bC = bu.endpoints[0].id,
							bx = bu.endpoints[1].id,
							bB = function(bG, bE) {
								if (bG) {
									var bF = function(bH) {
											return bH[4] == bE
										};
									B(bG.top, bF);
									B(bG.left, bF);
									B(bG.bottom, bF);
									B(bG.right, bF)
								}
							};
						bB(br[bv], bC);
						bB(br[bw], bx);
						bp.redraw(bv);
						bp.redraw(bw)
					};
					this.add = function(bu, bt) {
						R(bo, bt, bu)
					};
					this.changeId = function(bu, bt) {
						bs[bt] = bs[bu];
						bo[bt] = bo[bu];
						delete bs[bu];
						delete bo[bu]
					};
					this.getConnectionsFor = function(bt) {
						return bs[bt] || []
					};
					this.getEndpointsFor = function(bt) {
						return bo[bt] || []
					};
					this.deleteEndpoint = function(bt) {
						B(bo[bt.elementId], function(bu) {
							return bu.id == bt.id
						})
					};
					this.clearFor = function(bt) {
						delete bo[bt];
						bo[bt] = []
					};
					var bq = function(bN, bA, bI, bx, bD, bE, bG, bC, bP, bF, bw, bM) {
							var bK = -1,
								bv = -1,
								by = bx.endpoints[bG],
								bH = by.id,
								bB = [1, 0][bG],
								bt = [
									[bA, bI], bx, bD, bE, bH],
								bu = bN[bP],
								bO = by._continuousAnchorEdge ? bN[by._continuousAnchorEdge] : null;
							if (bO) {
								var bL = i(bO, function(bQ) {
									return bQ[4] == bH
								});
								if (bL != -1) {
									bO.splice(bL, 1);
									for (var bJ = 0; bJ < bO.length; bJ++) {
										t(bw, bO[bJ][1], function(bQ) {
											return bQ.id == bO[bJ][1].id
										});
										t(bM, bO[bJ][1].endpoints[bG], function(bQ) {
											return bQ.id == bO[bJ][1].endpoints[bG].id
										})
									}
								}
							}
							for (var bJ = 0; bJ < bu.length; bJ++) {
								if (bG == 1 && bu[bJ][3] === bE && bv == -1) {
									bv = bJ
								}
								t(bw, bu[bJ][1], function(bQ) {
									return bQ.id == bu[bJ][1].id
								});
								t(bM, bu[bJ][1].endpoints[bG], function(bQ) {
									return bQ.id == bu[bJ][1].endpoints[bG].id
								})
							}
							if (bK != -1) {
								bu[bK] = bt
							} else {
								var bz = bC ? bv != -1 ? bv : 0 : bu.length;
								bu.splice(bz, 0, bt)
							}
							by._continuousAnchorEdge = bP
						};
					this.redraw = function(bI, bK, bv, by) {
						var bT = bo[bI] || [],
							bS = bs[bI] || [],
							bu = [],
							bR = [],
							bw = [];
						bv = bv || _timestamp();
						by = by || {
							left: 0,
							top: 0
						};
						if (bK) {
							bK = {
								left: bK.left + by.left,
								top: bK.top + by.top
							}
						}
						S({
							elId: bI,
							offset: bK,
							recalc: false,
							timestamp: bv
						});
						var bD = ac[bI],
							bz = Z[bI],
							bF = {};
						for (var bP = 0; bP < bS.length; bP++) {
							var bA = bS[bP][0],
								bC = bA.sourceId,
								bx = bA.targetId,
								bB = bA.endpoints[0].anchor.isContinuous,
								bH = bA.endpoints[1].anchor.isContinuous;
							if (bB || bH) {
								var bQ = bC + "_" + bx,
									bN = bx + "_" + bC,
									bM = bF[bQ],
									bG = bA.sourceId == bI ? 1 : 0;
								if (bB && !br[bC]) {
									br[bC] = {
										top: [],
										right: [],
										bottom: [],
										left: []
									}
								}
								if (bH && !br[bx]) {
									br[bx] = {
										top: [],
										right: [],
										bottom: [],
										left: []
									}
								}
								if (bI != bx) {
									S({
										elId: bx,
										timestamp: bv
									})
								}
								if (bI != bC) {
									S({
										elId: bC,
										timestamp: bv
									})
								}
								var bE = aG(bx),
									bt = aG(bC);
								if (bx == bC && (bB || bH)) {
									bq(br[bC], -Math.PI / 2, 0, bA, false, bx, 0, false, "top", bC, bu, bR)
								} else {
									if (!bM) {
										bM = be(bC, bx, bt.o, bE.o);
										bF[bQ] = bM
									}
									if (bB) {
										bq(br[bC], bM.theta, 0, bA, false, bx, 0, false, bM.a[0], bC, bu, bR)
									}
									if (bH) {
										bq(br[bx], bM.theta2, -1, bA, true, bC, 1, true, bM.a[1], bx, bu, bR)
									}
								}
								if (bB) {
									t(bw, bC, function(bU) {
										return bU === bC
									})
								}
								if (bH) {
									t(bw, bx, function(bU) {
										return bU === bx
									})
								}
								t(bu, bA, function(bU) {
									return bU.id == bA.id
								});
								if ((bB && bG == 0) || (bH && bG == 1)) {
									t(bR, bA.endpoints[bG], function(bU) {
										return bU.id == bA.endpoints[bG].id
									})
								}
							}
						}
						for (var bP = 0; bP < bw.length; bP++) {
							af(bw[bP], br[bw[bP]])
						}
						for (var bP = 0; bP < bT.length; bP++) {
							bT[bP].paint({
								timestamp: bv,
								offset: bD,
								dimensions: bz
							})
						}
						for (var bP = 0; bP < bR.length; bP++) {
							bR[bP].paint({
								timestamp: bv,
								offset: bD,
								dimensions: bz
							})
						}
						for (var bP = 0; bP < bS.length; bP++) {
							var bJ = bS[bP][1];
							if (bJ.anchor.constructor == ak) {
								bJ.paint({
									elementWithPrecedence: bI
								});
								t(bu, bS[bP][0], function(bU) {
									return bU.id == bS[bP][0].id
								});
								for (var bO = 0; bO < bJ.connections.length; bO++) {
									if (bJ.connections[bO] !== bS[bP][0]) {
										t(bu, bJ.connections[bO], function(bU) {
											return bU.id == bJ.connections[bO].id
										})
									}
								}
							} else {
								if (bJ.anchor.constructor == W) {
									t(bu, bS[bP][0], function(bU) {
										return bU.id == bS[bP][0].id
									})
								}
							}
						}
						var bL = a8[bI];
						if (bL) {
							bL.paint({
								timestamp: bv,
								recalc: false,
								elId: bI
							})
						}
						for (var bP = 0; bP < bu.length; bP++) {
							bu[bP].paint({
								elId: bI,
								timestamp: bv,
								recalc: false
							})
						}
					};
					this.rehomeEndpoint = function(bt, bx) {
						var bu = bo[bt] || [],
							bv = bg.getId(bx);
						for (var bw = 0; bw < bu.length; bw++) {
							bp.add(bu[bw], bv)
						}
						bu.splice(0, bu.length)
					}
				};
			bg.anchorManager = new ay();
			bg.continuousAnchorFactory = {
				get: function(bp) {
					var bo = bc[bp.elementId];
					if (!bo) {
						bo = {
							type: "Continuous",
							compute: function(bq) {
								return ad[bq.element.id] || [0, 0]
							},
							getCurrentLocation: function(bq) {
								return ad[bq.id] || [0, 0]
							},
							getOrientation: function(bq) {
								return aD[bq.id] || [0, 0]
							},
							isDynamic: true,
							isContinuous: true
						};
						bc[bp.elementId] = bo
					}
					return bo
				}
			};
			var aO = function() {
					var br = {},
						bq = [],
						bp = {},
						bo = {};
					this.register = function(bt) {
						bt = p.CurrentLibrary.getElementObject(bt);
						var bv = bg.getId(bt),
							bs = p.CurrentLibrary.getDOMElement(bt);
						if (!br[bv]) {
							br[bv] = bt;
							bq.push(bt);
							bp[bv] = {}
						}
						var bu = function(bz) {
								var bC = p.CurrentLibrary.getElementObject(bz),
									bB = p.CurrentLibrary.getOffset(bC);
								for (var bw = 0; bw < bz.childNodes.length; bw++) {
									if (bz.childNodes[bw].nodeType != 3) {
										var by = p.CurrentLibrary.getElementObject(bz.childNodes[bw]),
											bA = bg.getId(by, null, true);
										if (bA && bo[bA] && bo[bA] > 0) {
											var bx = p.CurrentLibrary.getOffset(by);
											bp[bv][bA] = {
												id: bA,
												offset: {
													left: bx.left - bB.left,
													top: bx.top - bB.top
												}
											}
										}
									}
								}
							};
						bu(bs)
					};
					this.endpointAdded = function(bu) {
						var by = p.CurrentLibrary,
							bB = document.body,
							bs = bg.getId(bu),
							bA = by.getDOMElement(bu),
							bt = bA.parentNode,
							bw = bt == bB;
						bo[bs] = bo[bs] ? bo[bs] + 1 : 1;
						while (bt != bB) {
							var bx = bg.getId(bt);
							if (br[bx]) {
								var bD = -1,
									bz = by.getElementObject(bt),
									bv = p.CurrentLibrary.getOffset(bz);
								if (bp[bx][bs] == null) {
									var bC = p.CurrentLibrary.getOffset(bu);
									bp[bx][bs] = {
										id: bs,
										offset: {
											left: bC.left - bv.left,
											top: bC.top - bv.top
										}
									}
								}
								break
							}
							bt = bt.parentNode
						}
					};
					this.endpointDeleted = function(bt) {
						if (bo[bt.elementId]) {
							bo[bt.elementId]--;
							if (bo[bt.elementId] <= 0) {
								for (var bs in bp) {
									delete bp[bs][bt.elementId]
								}
							}
						}
					};
					this.getElementsForDraggable = function(bs) {
						return bp[bs]
					};
					this.reset = function() {
						br = {};
						bq = [];
						bp = {};
						bo = {}
					}
				};
			bg.dragManager = new aO();
			var aq = function(bG) {
					var bz = this,
						bq = true;
					bz.idPrefix = "_jsplumb_c_";
					bz.defaultLabelLocation = 0.5;
					bz.defaultOverlayKeys = ["Overlays", "ConnectionOverlays"];
					this.parent = bG.parent;
					overlayCapableJsPlumbUIComponent.apply(this, arguments);
					this.isVisible = function() {
						return bq
					};
					this.setVisible = function(bI) {
						bq = bI;
						bz[bI ? "showOverlays" : "hideOverlays"]();
						if (bz.connector && bz.connector.canvas) {
							bz.connector.canvas.style.display = bI ? "block" : "none"
						}
					};
					this.source = D(bG.source);
					this.target = D(bG.target);
					if (bG.sourceEndpoint) {
						this.source = bG.sourceEndpoint.endpointWillMoveTo || bG.sourceEndpoint.getElement()
					}
					if (bG.targetEndpoint) {
						this.target = bG.targetEndpoint.getElement()
					}
					bz.previousConnection = bG.previousConnection;
					var bw = bG.cost;
					bz.getCost = function() {
						return bw
					};
					bz.setCost = function(bI) {
						bw = bI
					};
					var bu = bG.bidirectional === false ? false : true;
					bz.isBidirectional = function() {
						return bu
					};
					this.sourceId = d(this.source, "id");
					this.targetId = d(this.target, "id");
					this.getAttachedElements = function() {
						return bz.endpoints
					};
					this.scope = bG.scope;
					this.endpoints = [];
					this.endpointStyles = [];
					var bF = function(bJ, bI) {
							if (bJ) {
								return bg.makeAnchor(bJ, bI, bg)
							}
						},
						bD = function(bI, bO, bJ, bL, bM, bK, bN) {
							if (bI) {
								bz.endpoints[bO] = bI;
								bI.addConnection(bz)
							} else {
								if (!bJ.endpoints) {
									bJ.endpoints = [null, null]
								}
								var bU = bJ.endpoints[bO] || bJ.endpoint || bg.Defaults.Endpoints[bO] || p.Defaults.Endpoints[bO] || bg.Defaults.Endpoint || p.Defaults.Endpoint;
								if (!bJ.endpointStyles) {
									bJ.endpointStyles = [null, null]
								}
								if (!bJ.endpointHoverStyles) {
									bJ.endpointHoverStyles = [null, null]
								}
								var bS = bJ.endpointStyles[bO] || bJ.endpointStyle || bg.Defaults.EndpointStyles[bO] || p.Defaults.EndpointStyles[bO] || bg.Defaults.EndpointStyle || p.Defaults.EndpointStyle;
								if (bS.fillStyle == null && bK != null) {
									bS.fillStyle = bK.strokeStyle
								}
								if (bS.outlineColor == null && bK != null) {
									bS.outlineColor = bK.outlineColor
								}
								if (bS.outlineWidth == null && bK != null) {
									bS.outlineWidth = bK.outlineWidth
								}
								var bR = bJ.endpointHoverStyles[bO] || bJ.endpointHoverStyle || bg.Defaults.EndpointHoverStyles[bO] || p.Defaults.EndpointHoverStyles[bO] || bg.Defaults.EndpointHoverStyle || p.Defaults.EndpointHoverStyle;
								if (bN != null) {
									if (bR == null) {
										bR = {}
									}
									if (bR.fillStyle == null) {
										bR.fillStyle = bN.strokeStyle
									}
								}
								var bQ = bJ.anchors ? bJ.anchors[bO] : bJ.anchor ? bJ.anchor : bF(bg.Defaults.Anchors[bO], bM) || bF(p.Defaults.Anchors[bO], bM) || bF(bg.Defaults.Anchor, bM) || bF(p.Defaults.Anchor, bM),
									bT = bJ.uuids ? bJ.uuids[bO] : null,
									bP = az({
										paintStyle: bS,
										hoverPaintStyle: bR,
										endpoint: bU,
										connections: [bz],
										uuid: bT,
										anchor: bQ,
										source: bL,
										scope: bJ.scope,
										container: bJ.container,
										reattach: bJ.reattach,
										detachable: bJ.detachable
									});
								bz.endpoints[bO] = bP;
								if (bJ.drawEndpoints === false) {
									bP.setVisible(false, true, true)
								}
								return bP
							}
						};
					var bB = bD(bG.sourceEndpoint, 0, bG, bz.source, bz.sourceId, bG.paintStyle, bG.hoverPaintStyle);
					if (bB) {
						R(aM, this.sourceId, bB)
					}
					var br = ((bz.sourceId == bz.targetId) && bG.targetEndpoint == null) ? bB : bG.targetEndpoint,
						bA = bD(br, 1, bG, bz.target, bz.targetId, bG.paintStyle, bG.hoverPaintStyle);
					if (bA) {
						R(aM, this.targetId, bA)
					}
					if (!this.scope) {
						this.scope = this.endpoints[0].scope
					}
					if (bG.deleteEndpointsOnDetach) {
						bz.endpointsToDeleteOnDetach = [bB, bA]
					}
					var bp = bg.Defaults.ConnectionsDetachable;
					if (bG.detachable === false) {
						bp = false
					}
					if (bz.endpoints[0].connectionsDetachable === false) {
						bp = false
					}
					if (bz.endpoints[1].connectionsDetachable === false) {
						bp = false
					}
					if (bw == null) {
						bw = bz.endpoints[0].getConnectionCost()
					}
					if (bG.bidirectional == null) {
						bu = bz.endpoints[0].areConnectionsBidirectional()
					}
					this.isDetachable = function() {
						return bp === true
					};
					this.setDetachable = function(bI) {
						bp = bI === true
					};
					var bH = p.extend({}, this.endpoints[0].getParameters());
					p.extend(bH, this.endpoints[1].getParameters());
					p.extend(bH, bz.getParameters());
					bz.setParameters(bH);
					var bx = bz.setHover;
					bz.setHover = function() {
						bz.connector.setHover.apply(bz.connector, arguments);
						bx.apply(bz, arguments)
					};
					var bE = function(bI) {
							if (w == null) {
								bz.setHover(bI, false)
							}
						};
					this.setConnector = function(bI, bJ) {
						if (bz.connector != null) {
							aQ(bz.connector.getDisplayElements(), bz.parent)
						}
						var bK = {
							_jsPlumb: bz._jsPlumb,
							parent: bG.parent,
							cssClass: bG.cssClass,
							container: bG.container,
							tooltip: bz.tooltip
						};
						if (A(bI)) {
							this.connector = new p.Connectors[T][bI](bK)
						} else {
							if (n(bI)) {
								this.connector = new p.Connectors[T][bI[0]](p.extend(bI[1], bK))
							}
						}
						bz.canvas = bz.connector.canvas;
						_bindListeners(bz.connector, bz, bE);
						if (!bJ) {
							bz.repaint()
						}
					};
					bz.setConnector(this.endpoints[0].connector || this.endpoints[1].connector || bG.connector || bg.Defaults.Connector || p.Defaults.Connector, true);
					this.setPaintStyle(this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || bG.paintStyle || bg.Defaults.PaintStyle || p.Defaults.PaintStyle, true);
					this.setHoverPaintStyle(this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || bG.hoverPaintStyle || bg.Defaults.HoverPaintStyle || p.Defaults.HoverPaintStyle, true);
					this.paintStyleInUse = this.paintStyle;
					this.moveParent = function(bL) {
						var bK = p.CurrentLibrary,
							bJ = bK.getParent(bz.connector.canvas);
						bK.removeElement(bz.connector.canvas, bJ);
						bK.appendElement(bz.connector.canvas, bL);
						if (bz.connector.bgCanvas) {
							bK.removeElement(bz.connector.bgCanvas, bJ);
							bK.appendElement(bz.connector.bgCanvas, bL)
						}
						for (var bI = 0; bI < bz.overlays.length; bI++) {
							if (bz.overlays[bI].isAppendedAtTopLevel) {
								bK.removeElement(bz.overlays[bI].canvas, bJ);
								bK.appendElement(bz.overlays[bI].canvas, bL);
								if (bz.overlays[bI].reattachListeners) {
									bz.overlays[bI].reattachListeners(bz.connector)
								}
							}
						}
						if (bz.connector.reattachListeners) {
							bz.connector.reattachListeners()
						}
					};
					S({
						elId: this.sourceId
					});
					S({
						elId: this.targetId
					});
					var bt = ac[this.sourceId],
						bs = Z[this.sourceId],
						bo = ac[this.targetId],
						bv = Z[this.targetId],
						by = _timestamp(),
						bC = this.endpoints[0].anchor.compute({
							xy: [bt.left, bt.top],
							wh: bs,
							element: this.endpoints[0],
							elementId: this.endpoints[0].elementId,
							txy: [bo.left, bo.top],
							twh: bv,
							tElement: this.endpoints[1],
							timestamp: by
						});
					this.endpoints[0].paint({
						anchorLoc: bC,
						timestamp: by
					});
					bC = this.endpoints[1].anchor.compute({
						xy: [bo.left, bo.top],
						wh: bv,
						element: this.endpoints[1],
						elementId: this.endpoints[1].elementId,
						txy: [bt.left, bt.top],
						twh: bs,
						tElement: this.endpoints[0],
						timestamp: by
					});
					this.endpoints[1].paint({
						anchorLoc: bC,
						timestamp: by
					});
					this.paint = function(bZ) {
						bZ = bZ || {};
						var bQ = bZ.elId,
							bR = bZ.ui,
							bO = bZ.recalc,
							bJ = bZ.timestamp,
							bS = false,
							bY = bS ? this.sourceId : this.targetId,
							bN = bS ? this.targetId : this.sourceId,
							bK = bS ? 0 : 1,
							b0 = bS ? 1 : 0;
						var b1 = S({
							elId: bQ,
							offset: bR,
							recalc: bO,
							timestamp: bJ
						}),
							bP = S({
								elId: bY,
								timestamp: bJ
							});
						var bU = this.endpoints[b0],
							bI = this.endpoints[bK],
							bM = bU.anchor.getCurrentLocation(bU),
							bX = bI.anchor.getCurrentLocation(bI);
						var bL = 0;
						for (var bW = 0; bW < bz.overlays.length; bW++) {
							var bT = bz.overlays[bW];
							if (bT.isVisible()) {
								bL = Math.max(bL, bT.computeMaxSize(bz.connector))
							}
						}
						var bV = this.connector.compute(bM, bX, this.endpoints[b0], this.endpoints[bK], this.endpoints[b0].anchor, this.endpoints[bK].anchor, bz.paintStyleInUse.lineWidth, bL, b1, bP);
						bz.connector.paint(bV, bz.paintStyleInUse);
						for (var bW = 0; bW < bz.overlays.length; bW++) {
							var bT = bz.overlays[bW];
							if (bT.isVisible) {
								bz.overlayPlacements[bW] = bT.draw(bz.connector, bz.paintStyleInUse, bV)
							}
						}
					};
					this.repaint = function(bJ) {
						bJ = bJ || {};
						var bI = !(bJ.recalc === false);
						this.paint({
							elId: this.sourceId,
							recalc: bI,
							timestamp: bJ.timestamp
						})
					}
				};
			var a5 = function(bp) {
					var bo = false;
					return {
						drag: function() {
							if (bo) {
								bo = false;
								return true
							}
							var bq = p.CurrentLibrary.getUIPosition(arguments),
								br = bp.element;
							if (br) {
								p.CurrentLibrary.setOffset(br, bq);
								a3(D(br), bq)
							}
						},
						stopDrag: function() {
							bo = true
						}
					}
				};
			var am = function(bs, br, bt, bq, bo) {
					var bp = new aU({
						reference: br,
						referenceCanvas: bq
					});
					return az({
						paintStyle: bs,
						endpoint: bt,
						anchor: bp,
						source: bo,
						scope: "__floating"
					})
				};
			var N = function(bq, bo) {
					var bs = document.createElement("div");
					bs.style.position = "absolute";
					var bp = D(bs);
					aP(bs, bo);
					var br = H(bp);
					S({
						elId: br
					});
					bq.id = br;
					bq.element = bp
				};
			var aa = function(bT) {
					var bI = this;
					bI.idPrefix = "_jsplumb_e_";
					bI.defaultLabelLocation = [0.5, 0.5];
					bI.defaultOverlayKeys = ["Overlays", "EndpointOverlays"];
					this.parent = bT.parent;
					overlayCapableJsPlumbUIComponent.apply(this, arguments);
					bT = bT || {};
					var bt = true,
						br = !(bT.enabled === false);
					this.isVisible = function() {
						return bt
					};
					this.setVisible = function(bW, bZ, bV) {
						bt = bW;
						if (bI.canvas) {
							bI.canvas.style.display = bW ? "block" : "none"
						}
						bI[bW ? "showOverlays" : "hideOverlays"]();
						if (!bZ) {
							for (var bY = 0; bY < bI.connections.length; bY++) {
								bI.connections[bY].setVisible(bW);
								if (!bV) {
									var bX = bI === bI.connections[bY].endpoints[0] ? 1 : 0;
									if (bI.connections[bY].endpoints[bX].connections.length == 1) {
										bI.connections[bY].endpoints[bX].setVisible(bW, true, true)
									}
								}
							}
						}
					};
					this.isEnabled = function() {
						return br
					};
					this.setEnabled = function(bV) {
						br = bV
					};
					var bH = bT.source,
						bB = bT.uuid,
						bR = null,
						bv = null;
					if (bB) {
						aN[bB] = bI
					}
					var by = d(bH, "id");
					this.elementId = by;
					this.element = bH;
					var bq = bT.connectionCost;
					this.getConnectionCost = function() {
						return bq
					};
					this.setConnectionCost = function(bV) {
						bq = bV
					};
					var bQ = bT.connectionsBidirectional === false ? false : true;
					this.areConnectionsBidirectional = function() {
						return bQ
					};
					this.setConnectionsBidirectional = function(bV) {
						bQ = bV
					};
					bI.anchor = bT.anchor ? bg.makeAnchor(bT.anchor, by, bg) : bT.anchors ? bg.makeAnchor(bT.anchors, by, bg) : bg.makeAnchor("TopCenter", by, bg);
					if (!bT._transient) {
						bg.anchorManager.add(bI, by)
					}
					var bF = bT.endpoint || bg.Defaults.Endpoint || p.Defaults.Endpoint || "Dot",
						bz = {
							_jsPlumb: bI._jsPlumb,
							parent: bT.parent,
							container: bT.container,
							tooltip: bT.tooltip,
							connectorTooltip: bT.connectorTooltip,
							endpoint: bI
						};
					if (A(bF)) {
						bF = new p.Endpoints[T][bF](bz)
					} else {
						if (n(bF)) {
							bz = p.extend(bF[1], bz);
							bF = new p.Endpoints[T][bF[0]](bz)
						} else {
							bF = bF.clone()
						}
					}
					var bC = p.extend({}, bz);
					bF.clone = function() {
						var bV = new Object();
						bF.constructor.apply(bV, [bC]);
						return bV
					};
					bI.endpoint = bF;
					bI.type = bI.endpoint.type;
					var bG = bI.setHover;
					bI.setHover = function() {
						bI.endpoint.setHover.apply(bI.endpoint, arguments);
						bG.apply(bI, arguments)
					};
					var bU = function(bV) {
							if (bI.connections.length > 0) {
								bI.connections[0].setHover(bV, false)
							} else {
								bI.setHover(bV)
							}
						};
					_bindListeners(bI.endpoint, bI, bU);
					this.setPaintStyle(bT.paintStyle || bT.style || bg.Defaults.EndpointStyle || p.Defaults.EndpointStyle, true);
					this.setHoverPaintStyle(bT.hoverPaintStyle || bg.Defaults.EndpointHoverStyle || p.Defaults.EndpointHoverStyle, true);
					this.paintStyleInUse = this.paintStyle;
					this.connectorStyle = bT.connectorStyle;
					this.connectorHoverStyle = bT.connectorHoverStyle;
					this.connectorOverlays = bT.connectorOverlays;
					this.connector = bT.connector;
					this.connectorTooltip = bT.connectorTooltip;
					this.isSource = bT.isSource || false;
					this.isTarget = bT.isTarget || false;
					var bN = bT.maxConnections || bg.Defaults.MaxConnections;
					this.getAttachedElements = function() {
						return bI.connections
					};
					this.canvas = this.endpoint.canvas;
					this.connections = bT.connections || [];
					this.scope = bT.scope || M;
					this.timestamp = null;
					bI.isReattach = bT.reattach || false;
					bI.connectionsDetachable = bg.Defaults.ConnectionsDetachable;
					if (bT.connectionsDetachable === false || bT.detachable === false) {
						bI.connectionsDetachable = false
					}
					var bD = bT.dragAllowedWhenFull || true;
					this.computeAnchor = function(bV) {
						return bI.anchor.compute(bV)
					};
					this.addConnection = function(bV) {
						bI.connections.push(bV)
					};
					this.detach = function(bW, b1, bX, b4, bV) {
						var b3 = i(bI.connections, function(b6) {
							return b6.id == bW.id
						}),
							b2 = false;
						b4 = (b4 !== false);
						if (b3 >= 0) {
							if (bX || bW._forceDetach || bW.isDetachable() || bW.isDetachAllowed(bW)) {
								var b5 = bW.endpoints[0] == bI ? bW.endpoints[1] : bW.endpoints[0];
								if (bX || bW._forceDetach || (bI.isDetachAllowed(bW))) {
									bI.connections.splice(b3, 1);
									if (!b1) {
										b5.detach(bW, true, bX);
										if (bW.endpointsToDeleteOnDetach) {
											for (var b0 = 0; b0 < bW.endpointsToDeleteOnDetach.length; b0++) {
												var bY = bW.endpointsToDeleteOnDetach[b0];
												if (bY && bY.connections.length == 0) {
													bg.deleteEndpoint(bY)
												}
											}
										}
									}
									aQ(bW.connector.getDisplayElements(), bW.parent);
									B(aR[bW.scope], function(b6) {
										return b6.id == bW.id
									});
									b2 = true;
									var bZ = (!b1 && b4);
									a0(bW, bZ, bV)
								}
							}
						}
						return b2
					};
					this.detachAll = function(bW, bV) {
						while (bI.connections.length > 0) {
							bI.detach(bI.connections[0], false, true, bW, bV)
						}
					};
					this.detachFrom = function(bY, bX, bV) {
						var bZ = [];
						for (var bW = 0; bW < bI.connections.length; bW++) {
							if (bI.connections[bW].endpoints[1] == bY || bI.connections[bW].endpoints[0] == bY) {
								bZ.push(bI.connections[bW])
							}
						}
						for (var bW = 0; bW < bZ.length; bW++) {
							if (bI.detach(bZ[bW], false, true, bX, bV)) {
								bZ[bW].setHover(false, false)
							}
						}
					};
					this.detachFromConnection = function(bW) {
						var bV = i(bI.connections, function(bX) {
							return bX.id == bW.id
						});
						if (bV >= 0) {
							bI.connections.splice(bV, 1)
						}
					};
					this.getElement = function() {
						return bH
					};
					this.setElement = function(bX) {
						var bZ = H(bX);
						B(aM[bI.elementId], function(b0) {
							return b0.id == bI.id
						});
						bH = D(bX);
						by = H(bH);
						bI.elementId = by;
						var bY = ap({
							source: bZ
						}),
							bW = bs.getParent(bI.canvas);
						bs.removeElement(bI.canvas, bW);
						bs.appendElement(bI.canvas, bY);
						for (var bV = 0; bV < bI.connections.length; bV++) {
							bI.connections[bV].moveParent(bY);
							bI.connections[bV].sourceId = by;
							bI.connections[bV].source = bH
						}
						R(aM, bZ, bI)
					};
					this.getUuid = function() {
						return bB
					};
					this.makeInPlaceCopy = function() {
						var bX = bI.anchor.getCurrentLocation(bI),
							bW = bI.anchor.getOrientation(bI),
							bV = {
								compute: function() {
									return [bX[0], bX[1]]
								},
								getCurrentLocation: function() {
									return [bX[0], bX[1]]
								},
								getOrientation: function() {
									return bW
								}
							};
						return az({
							anchor: bV,
							source: bH,
							paintStyle: this.paintStyle,
							endpoint: bF,
							_transient: true,
							scope: bI.scope
						})
					};
					this.isConnectedTo = function(bX) {
						var bW = false;
						if (bX) {
							for (var bV = 0; bV < bI.connections.length; bV++) {
								if (bI.connections[bV].endpoints[1] == bX) {
									bW = true;
									break
								}
							}
						}
						return bW
					};
					this.isFloating = function() {
						return bR != null
					};
					this.connectorSelector = function() {
						var bV = bI.connections[0];
						if (bI.isTarget && bV) {
							return bV
						} else {
							return (bI.connections.length < bN) || bN == -1 ? null : bV
						}
					};
					this.isFull = function() {
						return !(bI.isFloating() || bN < 1 || bI.connections.length < bN)
					};
					this.setDragAllowedWhenFull = function(bV) {
						bD = bV
					};
					this.setStyle = bI.setPaintStyle;
					this.equals = function(bV) {
						return this.anchor.equals(bV.anchor)
					};
					var bE = function(bW) {
							var bV = 0;
							if (bW != null) {
								for (var bX = 0; bX < bI.connections.length; bX++) {
									if (bI.connections[bX].sourceId == bW || bI.connections[bX].targetId == bW) {
										bV = bX;
										break
									}
								}
							}
							return bI.connections[bV]
						};
					this.paint = function(bY) {
						bY = bY || {};
						var b4 = bY.timestamp,
							b3 = !(bY.recalc === false);
						if (!b4 || bI.timestamp !== b4) {
							S({
								elId: by,
								timestamp: b4,
								recalc: b3
							});
							var ca = bY.offset || ac[by];
							if (ca) {
								var b1 = bY.anchorPoint,
									bZ = bY.connectorPaintStyle;
								if (b1 == null) {
									var bV = bY.dimensions || Z[by];
									if (ca == null || bV == null) {
										S({
											elId: by,
											timestamp: b4
										});
										ca = ac[by];
										bV = Z[by]
									}
									var bX = {
										xy: [ca.left, ca.top],
										wh: bV,
										element: bI,
										timestamp: b4
									};
									if (b3 && bI.anchor.isDynamic && bI.connections.length > 0) {
										var b7 = bE(bY.elementWithPrecedence),
											b9 = b7.endpoints[0] == bI ? 1 : 0,
											b0 = b9 == 0 ? b7.sourceId : b7.targetId,
											b6 = ac[b0],
											b8 = Z[b0];
										bX.txy = [b6.left, b6.top];
										bX.twh = b8;
										bX.tElement = b7.endpoints[b9]
									}
									b1 = bI.anchor.compute(bX)
								}
								var b5 = bF.compute(b1, bI.anchor.getOrientation(bF), bI.paintStyleInUse, bZ || bI.paintStyleInUse);
								bF.paint(b5, bI.paintStyleInUse, bI.anchor);
								bI.timestamp = b4;
								for (var b2 = 0; b2 < bI.overlays.length; b2++) {
									var bW = bI.overlays[b2];
									if (bW.isVisible) {
										bI.overlayPlacements[b2] = bW.draw(bI.endpoint, bI.paintStyleInUse, b5)
									}
								}
							}
						}
					};
					this.repaint = this.paint;
					this.removeConnection = this.detach;
					if (p.CurrentLibrary.isDragSupported(bH)) {
						var bM = {
							id: null,
							element: null
						},
							bL = null,
							bp = false,
							bu = null,
							bo = a5(bM);
						var bw = function() {
								bL = bI.connectorSelector();
								var bV = true;
								if (!bI.isEnabled()) {
									bV = false
								}
								if (bL == null && !bT.isSource) {
									bV = false
								}
								if (bT.isSource && bI.isFull() && !bD) {
									bV = false
								}
								if (bL != null && !bL.isDetachable()) {
									bV = false
								}
								if (bV === false) {
									if (p.CurrentLibrary.stopDrag) {
										p.CurrentLibrary.stopDrag()
									}
									bo.stopDrag();
									return false
								}
								if (bL && !bI.isFull() && bT.isSource) {
									bL = null
								}
								S({
									elId: by
								});
								bv = bI.makeInPlaceCopy();
								bv.paint();
								N(bM, bI.parent);
								var b1 = D(bv.canvas),
									bZ = p.CurrentLibrary.getOffset(b1),
									bW = bh([bZ.left, bZ.top], bv.canvas);
								p.CurrentLibrary.setOffset(bM.element, {
									left: bW[0],
									top: bW[1]
								});
								if (bI.parentAnchor) {
									bI.anchor = bg.makeAnchor(bI.parentAnchor, bI.elementId, bg)
								}
								f(D(bI.canvas), "dragId", bM.id);
								f(D(bI.canvas), "elId", by);
								bR = am(bI.paintStyle, bI.anchor, bF, bI.canvas, bM.element);
								if (bL == null) {
									bI.anchor.locked = true;
									bI.setHover(false, false);
									bL = Y({
										sourceEndpoint: bI,
										targetEndpoint: bR,
										source: bI.endpointWillMoveTo || D(bH),
										target: bM.element,
										anchors: [bI.anchor, bR.anchor],
										paintStyle: bT.connectorStyle,
										hoverPaintStyle: bT.connectorHoverStyle,
										connector: bT.connector,
										overlays: bT.connectorOverlays
									})
								} else {
									bp = true;
									bL.connector.setHover(false, false);
									bx(D(bv.canvas), false, true);
									var bY = bL.endpoints[0].id == bI.id ? 0 : 1;
									bL.floatingAnchorIndex = bY;
									bI.detachFromConnection(bL);
									var b2 = D(bI.canvas),
										b0 = p.CurrentLibrary.getDragScope(b2);
									f(b2, "originalScope", b0);
									var bX = p.CurrentLibrary.getDropScope(b2);
									p.CurrentLibrary.setDragScope(b2, bX);
									if (bY == 0) {
										bu = [bL.source, bL.sourceId, bP, b0];
										bL.source = bM.element;
										bL.sourceId = bM.id
									} else {
										bu = [bL.target, bL.targetId, bP, b0];
										bL.target = bM.element;
										bL.targetId = bM.id
									}
									bL.endpoints[bY == 0 ? 1 : 0].anchor.locked = true;
									bL.suspendedEndpoint = bL.endpoints[bY];
									bL.suspendedEndpoint.setHover(false);
									bL.endpoints[bY] = bR;
									aX(bL)
								}
								a8[bM.id] = bL;
								bR.addConnection(bL);
								R(aM, bM.id, bR);
								bg.currentlyDragging = true
							};
						var bs = p.CurrentLibrary,
							bO = bT.dragOptions || {},
							bJ = p.extend({}, bs.defaultDragOptions),
							bK = bs.dragEvents.start,
							bS = bs.dragEvents.stop,
							bA = bs.dragEvents.drag;
						bO = p.extend(bJ, bO);
						bO.scope = bO.scope || bI.scope;
						bO[bK] = ag(bO[bK], bw);
						bO[bA] = ag(bO[bA], bo.drag);
						bO[bS] = ag(bO[bS], function() {
							var bW = bs.getDropEvent(arguments);
							bg.currentlyDragging = false;
							B(aM[bM.id], function(bX) {
								return bX.id == bR.id
							});
							aQ([bM.element[0], bR.canvas], bH);
							an(bv.canvas, bH);
							bg.anchorManager.clearFor(bM.id);
							var bV = bL.floatingAnchorIndex == null ? 1 : bL.floatingAnchorIndex;
							bL.endpoints[bV == 0 ? 1 : 0].anchor.locked = false;
							if (bL.endpoints[bV] == bR) {
								if (bp && bL.suspendedEndpoint) {
									if (bV == 0) {
										bL.source = bu[0];
										bL.sourceId = bu[1]
									} else {
										bL.target = bu[0];
										bL.targetId = bu[1]
									}
									p.CurrentLibrary.setDragScope(bu[2], bu[3]);
									bL.endpoints[bV] = bL.suspendedEndpoint;
									if (bI.isReattach || bL._forceDetach || !bL.endpoints[bV == 0 ? 1 : 0].detach(bL, false, false, true, bW)) {
										bL.setHover(false);
										bL.floatingAnchorIndex = null;
										bL.suspendedEndpoint.addConnection(bL);
										bg.repaint(bu[1])
									}
									bL._forceDetach = null
								} else {
									aQ(bL.connector.getDisplayElements(), bI.parent);
									bI.detachFromConnection(bL)
								}
							}
							bI.anchor.locked = false;
							bI.paint({
								recalc: false
							});
							bL.setHover(false, false);
							aK(bL);
							bL = null;
							bv = null;
							delete aM[bR.elementId];
							bR.anchor = null;
							bR = null;
							bg.currentlyDragging = false
						});
						var bP = D(bI.canvas);
						p.CurrentLibrary.initDraggable(bP, bO, true)
					}
					var bx = function(bX, b2, b0, b3) {
							if ((bT.isTarget || b2) && p.CurrentLibrary.isDropSupported(bH)) {
								var bY = bT.dropOptions || bg.Defaults.DropOptions || p.Defaults.DropOptions;
								bY = p.extend({}, bY);
								bY.scope = bY.scope || bI.scope;
								var bW = p.CurrentLibrary.dragEvents.drop,
									b1 = p.CurrentLibrary.dragEvents.over,
									bV = p.CurrentLibrary.dragEvents.out,
									bZ = function() {
										var b4 = p.CurrentLibrary.getDropEvent(arguments),
											ch = D(p.CurrentLibrary.getDragObject(arguments)),
											b5 = d(ch, "dragId"),
											b8 = d(ch, "elId"),
											cg = d(ch, "originalScope"),
											cb = a8[b5];
										if (cb != null) {
											var cd = cb.floatingAnchorIndex == null ? 1 : cb.floatingAnchorIndex,
												ce = cd == 0 ? 1 : 0;
											if (cg) {
												p.CurrentLibrary.setDragScope(ch, cg)
											}
											var cf = b3 != null ? b3.isEnabled() : true;
											if (!bI.isFull() && !(cd == 0 && !bI.isSource) && !(cd == 1 && !bI.isTarget) && cf) {
												var b9 = true;
												if (cb.suspendedEndpoint && cb.suspendedEndpoint.id != bI.id) {
													if (cd == 0) {
														cb.source = cb.suspendedEndpoint.element;
														cb.sourceId = cb.suspendedEndpoint.elementId
													} else {
														cb.target = cb.suspendedEndpoint.element;
														cb.targetId = cb.suspendedEndpoint.elementId
													}
													if (!cb.isDetachAllowed(cb) || !cb.endpoints[cd].isDetachAllowed(cb) || !cb.suspendedEndpoint.isDetachAllowed(cb) || !bg.checkCondition("beforeDetach", cb)) {
														b9 = false
													}
												}
												if (cd == 0) {
													cb.source = bI.element;
													cb.sourceId = bI.elementId
												} else {
													cb.target = bI.element;
													cb.targetId = bI.elementId
												}
												b9 = b9 && bI.isDropAllowed(cb.sourceId, cb.targetId, cb.scope);
												if (b9) {
													cb.endpoints[cd].detachFromConnection(cb);
													if (cb.suspendedEndpoint) {
														cb.suspendedEndpoint.detachFromConnection(cb)
													}
													cb.endpoints[cd] = bI;
													bI.addConnection(cb);
													var b7 = bI.getParameters();
													for (var cc in b7) {
														cb.setParameter(cc, b7[cc])
													}
													if (!cb.suspendedEndpoint) {
														a4(bI.element, b7.draggable, {})
													} else {
														var ca = cb.suspendedEndpoint.getElement(),
															b6 = cb.suspendedEndpoint.elementId;
														a0({
															source: cd == 0 ? ca : cb.source,
															target: cd == 1 ? ca : cb.target,
															sourceId: cd == 0 ? b6 : cb.sourceId,
															targetId: cd == 1 ? b6 : cb.targetId,
															sourceEndpoint: cd == 0 ? cb.suspendedEndpoint : cb.endpoints[0],
															targetEndpoint: cd == 1 ? cb.suspendedEndpoint : cb.endpoints[1],
															connection: cb
														}, true, b4)
													}
													bm(cb, null, b4)
												} else {
													if (cb.suspendedEndpoint) {
														cb.endpoints[cd] = cb.suspendedEndpoint;
														cb.setHover(false);
														cb._forceDetach = true;
														if (cd == 0) {
															cb.source = cb.suspendedEndpoint.element;
															cb.sourceId = cb.suspendedEndpoint.elementId
														} else {
															cb.target = cb.suspendedEndpoint.element;
															cb.targetId = cb.suspendedEndpoint.elementId
														}
														cb.suspendedEndpoint.addConnection(cb);
														cb.endpoints[0].repaint();
														cb.repaint();
														bg.repaint(cb.source.elementId);
														cb._forceDetach = false
													}
												}
												cb.floatingAnchorIndex = null
											}
											bg.currentlyDragging = false;
											delete a8[b5]
										}
									};
								bY[bW] = ag(bY[bW], bZ);
								bY[b1] = ag(bY[b1], function() {
									if (bI.isTarget) {
										var b5 = p.CurrentLibrary.getDragObject(arguments),
											b7 = d(D(b5), "dragId"),
											b6 = a8[b7];
										if (b6 != null) {
											var b4 = b6.floatingAnchorIndex == null ? 1 : b6.floatingAnchorIndex;
											b6.endpoints[b4].anchor.over(bI.anchor)
										}
									}
								});
								bY[bV] = ag(bY[bV], function() {
									if (bI.isTarget) {
										var b5 = p.CurrentLibrary.getDragObject(arguments),
											b7 = d(D(b5), "dragId"),
											b6 = a8[b7];
										if (b6 != null) {
											var b4 = b6.floatingAnchorIndex == null ? 1 : b6.floatingAnchorIndex;
											b6.endpoints[b4].anchor.out()
										}
									}
								});
								p.CurrentLibrary.initDroppable(bX, bY, true, b0)
							}
						};
					bx(D(bI.canvas), true, !(bT._transient || bI.anchor.isFloating), bI);
					return bI
				}
		};
	var p = window.jsPlumb = new x();
	p.getInstance = function(I) {
		var H = new x(I);
		H.init();
		return H
	};
	p.util = {
		convertStyle: function(I, H) {
			if ("transparent" === I) {
				return I
			}
			var N = I,
				M = function(O) {
					return O.length == 1 ? "0" + O : O
				},
				J = function(O) {
					return M(Number(O).toString(16))
				},
				K = /(rgb[a]?\()(.*)(\))/;
			if (I.match(K)) {
				var L = I.match(K)[2].split(",");
				N = "#" + J(L[0]) + J(L[1]) + J(L[2]);
				if (!H && L.length == 4) {
					N = N + J(L[3])
				}
			}
			return N
		},
		gradient: function(I, H) {
			I = n(I) ? I : [I.x, I.y];
			H = n(H) ? H : [H.x, H.y];
			return (H[1] - I[1]) / (H[0] - I[0])
		},
		normal: function(I, H) {
			return -1 / p.util.gradient(I, H)
		},
		segment: function(I, H) {
			I = n(I) ? I : [I.x, I.y];
			H = n(H) ? H : [H.x, H.y];
			if (H[0] > I[0]) {
				return (H[1] > I[1]) ? 2 : 1
			} else {
				return (H[1] > I[1]) ? 3 : 4
			}
		},
		intersects: function(M, L) {
			var J = M.x,
				H = M.x + M.w,
				Q = M.y,
				O = M.y + M.h,
				K = L.x,
				I = L.x + L.w,
				P = L.y,
				N = L.y + L.h;
			return ((J <= K && K <= H) && (Q <= P && P <= O)) || ((J <= I && I <= H) && (Q <= P && P <= O)) || ((J <= K && K <= H) && (Q <= N && N <= O)) || ((J <= I && K <= H) && (Q <= N && N <= O)) || ((K <= J && J <= I) && (P <= Q && Q <= N)) || ((K <= H && H <= I) && (P <= Q && Q <= N)) || ((K <= J && J <= I) && (P <= O && O <= N)) || ((K <= H && J <= I) && (P <= O && O <= N))
		},
		segmentMultipliers: [null, [1, -1],
			[1, 1],
			[-1, 1],
			[-1, -1]
		],
		inverseSegmentMultipliers: [null, [-1, -1],
			[-1, 1],
			[1, 1],
			[1, -1]
		],
		pointOnLine: function(H, L, I) {
			var K = p.util.gradient(H, L),
				P = p.util.segment(H, L),
				O = I > 0 ? p.util.segmentMultipliers[P] : p.util.inverseSegmentMultipliers[P],
				J = Math.atan(K),
				M = Math.abs(I * Math.sin(J)) * O[1],
				N = Math.abs(I * Math.cos(J)) * O[0];
			return {
				x: H.x + N,
				y: H.y + M
			}
		},
		perpendicularLineTo: function(J, K, L) {
			var I = p.util.gradient(J, K),
				M = Math.atan(-1 / I),
				N = L / 2 * Math.sin(M),
				H = L / 2 * Math.cos(M);
			return [{
				x: K.x + H,
				y: K.y + N
			}, {
				x: K.x - H,
				y: K.y - N
			}]
		}
	};
	var r = function(H, M, J, I, L, K) {
			return function(O) {
				O = O || {};
				var N = O.jsPlumbInstance.makeAnchor([H, M, J, I, 0, 0], O.elementId, O.jsPlumbInstance);
				N.type = L;
				if (K) {
					K(N, O)
				}
				return N
			}
		};
	p.Anchors.TopCenter = r(0.5, 0, 0, -1, "TopCenter");
	p.Anchors.BottomCenter = r(0.5, 1, 0, 1, "BottomCenter");
	p.Anchors.LeftMiddle = r(0, 0.5, -1, 0, "LeftMiddle");
	p.Anchors.RightMiddle = r(1, 0.5, 1, 0, "RightMiddle");
	p.Anchors.Center = r(0.5, 0.5, 0, 0, "Center");
	p.Anchors.TopRight = r(1, 0, 0, -1, "TopRight");
	p.Anchors.BottomRight = r(1, 1, 0, 1, "BottomRight");
	p.Anchors.TopLeft = r(0, 0, 0, -1, "TopLeft");
	p.Anchors.BottomLeft = r(0, 1, 0, 1, "BottomLeft");
	p.Defaults.DynamicAnchors = function(H) {
		return H.jsPlumbInstance.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], H.elementId, H.jsPlumbInstance)
	};
	p.Anchors.AutoDefault = function(I) {
		var H = I.jsPlumbInstance.makeDynamicAnchor(p.Defaults.DynamicAnchors(I));
		H.type = "AutoDefault";
		return H
	};
	p.Anchors.Assign = r(0, 0, 0, 0, "Assign", function(I, J) {
		var H = J.position || "Fixed";
		I.positionFinder = H.constructor == String ? J.jsPlumbInstance.AnchorPositionFinders[H] : H;
		I.constructorParams = J
	});
	p.Anchors.Continuous = function(H) {
		return H.jsPlumbInstance.continuousAnchorFactory.get(H)
	};
	p.AnchorPositionFinders = {
		Fixed: function(K, H, J, I) {
			return [(K.left - H.left) / J[0], (K.top - H.top) / J[1]]
		},
		Grid: function(H, Q, L, I) {
			var P = H.left - Q.left,
				O = H.top - Q.top,
				N = L[0] / (I.grid[0]),
				M = L[1] / (I.grid[1]),
				K = Math.floor(P / N),
				J = Math.floor(O / M);
			return [((K * N) + (N / 2)) / L[0], ((J * M) + (M / 2)) / L[1]]
		}
	}
})();
(function() {
	jsPlumb.DOMElementComponent = function(c) {
		jsPlumb.jsPlumbUIComponent.apply(this, arguments);
		this.mousemove = this.dblclick = this.click = this.mousedown = this.mouseup = function(d) {}
	};
	jsPlumb.Connectors.Straight = function() {
		this.type = "Straight";
		var r = this,
			i = null,
			e, k, p, n, l, f, q, h, g, d, c, o, m;
		this.compute = function(A, J, s, z, F, t, D, v) {
			var I = Math.abs(A[0] - J[0]),
				C = Math.abs(A[1] - J[1]),
				B = 0.45 * I,
				u = 0.45 * C;
			I *= 1.9;
			C *= 1.9;
			var G = Math.min(A[0], J[0]) - B;
			var E = Math.min(A[1], J[1]) - u;
			var H = Math.max(2 * D, v);
			if (I < H) {
				I = H;
				G = A[0] + ((J[0] - A[0]) / 2) - (H / 2);
				B = (I - Math.abs(A[0] - J[0])) / 2
			}
			if (C < H) {
				C = H;
				E = A[1] + ((J[1] - A[1]) / 2) - (H / 2);
				u = (C - Math.abs(A[1] - J[1])) / 2
			}
			h = A[0] < J[0] ? B : I - B;
			g = A[1] < J[1] ? u : C - u;
			d = A[0] < J[0] ? I - B : B;
			c = A[1] < J[1] ? C - u : u;
			i = [G, E, I, C, h, g, d, c];
			n = d - h, l = c - g;
			e = jsPlumb.util.gradient({
				x: h,
				y: g
			}, {
				x: d,
				y: c
			}), k = -1 / e;
			p = -1 * ((e * h) - g);
			f = Math.atan(e);
			q = Math.atan(k);
			m = Math.sqrt((n * n) + (l * l));
			return i
		};
		this.pointOnPath = function(s) {
			if (s == 0) {
				return {
					x: h,
					y: g
				}
			} else {
				if (s == 1) {
					return {
						x: d,
						y: c
					}
				} else {
					return jsPlumb.util.pointOnLine({
						x: h,
						y: g
					}, {
						x: d,
						y: c
					}, s * m)
				}
			}
		};
		this.gradientAtPoint = function(s) {
			return e
		};
		this.pointAlongPathFrom = function(s, v) {
			var u = r.pointOnPath(s),
				t = s == 1 ? {
					x: h + ((d - h) * 10),
					y: g + ((g - c) * 10)
				} : {
					x: d,
					y: c
				};
			return jsPlumb.util.pointOnLine(u, t, v)
		}
	};
	jsPlumb.Connectors.Bezier = function(u) {
		var o = this;
		u = u || {};
		this.majorAnchor = u.curviness || 150;
		this.minorAnchor = 10;
		var s = null;
		this.type = "Bezier";
		this._findControlPoint = function(G, v, B, w, z, E, x) {
			var D = E.getOrientation(w),
				F = x.getOrientation(z),
				A = D[0] != F[0] || D[1] == F[1],
				y = [],
				H = o.majorAnchor,
				C = o.minorAnchor;
			if (!A) {
				if (D[0] == 0) {
					y.push(v[0] < B[0] ? G[0] + C : G[0] - C)
				} else {
					y.push(G[0] - (H * D[0]))
				}
				if (D[1] == 0) {
					y.push(v[1] < B[1] ? G[1] + C : G[1] - C)
				} else {
					y.push(G[1] + (H * F[1]))
				}
			} else {
				if (F[0] == 0) {
					y.push(B[0] < v[0] ? G[0] + C : G[0] - C)
				} else {
					y.push(G[0] + (H * F[0]))
				}
				if (F[1] == 0) {
					y.push(B[1] < v[1] ? G[1] + C : G[1] - C)
				} else {
					y.push(G[1] + (H * D[1]))
				}
			}
			return y
		};
		var p, l, f, n, m, f, e, r, q, t, d, h, g, k, i;
		this.compute = function(R, y, L, z, P, w, v, K) {
			v = v || 0;
			t = Math.abs(R[0] - y[0]) + v;
			d = Math.abs(R[1] - y[1]) + v;
			r = Math.min(R[0], y[0]) - (v / 2);
			q = Math.min(R[1], y[1]) - (v / 2);
			f = R[0] < y[0] ? t - (v / 2) : (v / 2);
			e = R[1] < y[1] ? d - (v / 2) : (v / 2);
			n = R[0] < y[0] ? (v / 2) : t - (v / 2);
			m = R[1] < y[1] ? (v / 2) : d - (v / 2);
			p = o._findControlPoint([f, e], R, y, L, z, P, w);
			l = o._findControlPoint([n, m], y, R, L, z, w, P);
			var J = Math.min(f, n),
				I = Math.min(p[0], l[0]),
				E = Math.min(J, I),
				Q = Math.max(f, n),
				N = Math.max(p[0], l[0]),
				B = Math.max(Q, N);
			if (B > t) {
				t = B
			}
			if (E < 0) {
				r += E;
				var G = Math.abs(E);
				t += G;
				p[0] += G;
				f += G;
				n += G;
				l[0] += G
			}
			var O = Math.min(e, m),
				M = Math.min(p[1], l[1]),
				A = Math.min(O, M),
				F = Math.max(e, m),
				D = Math.max(p[1], l[1]),
				x = Math.max(F, D);
			if (x > d) {
				d = x
			}
			if (A < 0) {
				q += A;
				var C = Math.abs(A);
				d += C;
				p[1] += C;
				e += C;
				m += C;
				l[1] += C
			}
			if (K && t < K) {
				var H = (K - t) / 2;
				t = K;
				r -= H;
				f = f + H;
				n = n + H;
				p[0] = p[0] + H;
				l[0] = l[0] + H
			}
			if (K && d < K) {
				var H = (K - d) / 2;
				d = K;
				q -= H;
				e = e + H;
				m = m + H;
				p[1] = p[1] + H;
				l[1] = l[1] + H
			}
			s = [r, q, t, d, f, e, n, m, p[0], p[1], l[0], l[1]];
			return s
		};
		var c = function() {
				return [{
					x: f,
					y: e
				}, {
					x: p[0],
					y: p[1]
				}, {
					x: l[0],
					y: l[1]
				}, {
					x: n,
					y: m
				}]
			};
		this.pointOnPath = function(v) {
			return jsBezier.pointOnCurve(c(), v)
		};
		this.gradientAtPoint = function(v) {
			return jsBezier.gradientAtPoint(c(), v)
		};
		this.pointAlongPathFrom = function(v, w) {
			return jsBezier.pointAlongCurveFrom(c(), v, w)
		}
	};
	jsPlumb.Connectors.Flowchart = function(k) {
		this.type = "Flowchart";
		k = k || {};
		var r = this,
			f = k.stub || k.minStubLength || 30,
			m = [],
			q = 0,
			o = [],
			e = [],
			p = [],
			h, g, d = 0,
			c = 0,
			l = function(u, t, y, x) {
				var w = 0;
				for (var v = 0; v < m.length; v++) {
					e[v] = m[v][5] / q;
					o[v] = [w, (w += (m[v][5] / q))]
				}
			},
			s = function() {
				p.push(m.length);
				for (var t = 0; t < m.length; t++) {
					p.push(m[t][0]);
					p.push(m[t][1])
				}
			},
			i = function(E, B, D, C, A, z) {
				var u = m.length == 0 ? D : m[m.length - 1][0],
					t = m.length == 0 ? C : m[m.length - 1][1],
					v = E == u ? Infinity : 0,
					w = Math.abs(E == u ? B - t : E - u);
				m.push([E, B, u, t, v, w]);
				q += w;
				d = Math.max(d, E);
				c = Math.max(c, B)
			},
			n = function(v) {
				var t = o.length - 1,
					u = 1;
				for (var w = 0; w < o.length; w++) {
					if (o[w][1] >= v) {
						t = w;
						u = (v - o[w][0]) / e[w];
						break
					}
				}
				return {
					segment: m[t],
					proportion: u,
					index: t
				}
			};
		this.compute = function(R, af, t, L, ap, F, P, K, ak, ah) {
			m = [];
			o = [];
			q = 0;
			e = [];
			d = c = 0;
			h = af[0] < R[0];
			g = af[1] < R[1];
			var V = P || 1,
				D = (V / 2) + (f * 2),
				B = (V / 2) + (f * 2),
				I = ap.orientation || ap.getOrientation(t),
				aq = F.orientation || F.getOrientation(L),
				ae = h ? af[0] : R[0],
				ad = g ? af[1] : R[1],
				ag = Math.abs(af[0] - R[0]) + 2 * D,
				ao = Math.abs(af[1] - R[1]) + 2 * B;
			if (I[0] == 0 && I[1] == 0 || aq[0] == 0 && aq[1] == 0) {
				var X = ag > ao ? 0 : 1,
					Z = [1, 0][X];
				I = [];
				aq = [];
				I[X] = R[X] > af[X] ? -1 : 1;
				aq[X] = R[X] > af[X] ? 1 : -1;
				I[Z] = 0;
				aq[Z] = 0
			}
			if (ag < K) {
				D += (K - ag) / 2;
				ag = K
			}
			if (ao < K) {
				B += (K - ao) / 2;
				ao = K
			}
			var C = h ? ag - D : D,
				A = g ? ao - B : B,
				am = h ? D : ag - D,
				al = g ? B : ao - B,
				U = C + (I[0] * f),
				T = A + (I[1] * f),
				G = am + (aq[0] * f),
				E = al + (aq[1] * f),
				Q = Math.abs(C - am) > 2 * f,
				S = Math.abs(A - al) > 2 * f,
				ac = U + ((G - U) / 2),
				aa = T + ((E - T) / 2),
				J = ((I[0] * aq[0]) + (I[1] * aq[1])),
				W = J == -1,
				Y = J == 0,
				u = J == 1;
			ae -= D;
			ad -= B;
			p = [ae, ad, ag, ao, C, A, am, al];
			var aj = [];
			i(U, T, C, A, am, al);
			var N = I[0] == 0 ? "y" : "x",
				H = W ? "opposite" : u ? "orthogonal" : "perpendicular",
				v = jsPlumb.util.segment([C, A], [am, al]),
				ab = I[N == "x" ? 0 : 1] == -1,
				M = {
					x: [null, 4, 3, 2, 1],
					y: [null, 2, 1, 4, 3]
				};
			if (ab) {
				v = M[N][v]
			}
			var O = function(ar, y, w, x) {
					return ar + (y * ((1 - w) * x) + f)
				},
				z = {
					oppositex: function() {
						if (t.elementId == L.elementId) {
							var w = T + ((1 - ap.y) * ak.height) + f;
							return [[U, w], [G, w]]
						} else {
							if (Q && (v == 1 || v == 2)) {
								return [[ac, A], [ac, al]]
							} else {
								return [[U, aa], [G, aa]]
							}
						}
					},
					orthogonalx: function() {
						if (v == 1 || v == 2) {
							return [[G, T]]
						} else {
							return [[U, E]]
						}
					},
					perpendicularx: function() {
						var w = (al + A) / 2;
						if ((v == 1 && aq[1] == 1) || (v == 2 && aq[1] == -1)) {
							if (Math.abs(am - C) > f) {
								return [[G, T]]
							} else {
								return [[U, T], [U, w], [G, w]]
							}
						} else {
							if ((v == 3 && aq[1] == -1) || (v == 4 && aq[1] == 1)) {
								return [[U, w], [G, w]]
							} else {
								if ((v == 3 && aq[1] == 1) || (v == 4 && aq[1] == -1)) {
									return [[U, E]]
								} else {
									if ((v == 1 && aq[1] == -1) || (v == 2 && aq[1] == 1)) {
										if (Math.abs(am - C) > f) {
											return [[ac, T], [ac, E]]
										} else {
											return [[U, E]]
										}
									}
								}
							}
						}
					},
					oppositey: function() {
						if (t.elementId == L.elementId) {
							var w = U + ((1 - ap.x) * ak.width) + f;
							return [[w, T], [w, E]]
						} else {
							if (S && (v == 2 || v == 3)) {
								return [[C, aa], [am, aa]]
							} else {
								return [[ac, T], [ac, E]]
							}
						}
					},
					orthogonaly: function() {
						if (v == 2 || v == 3) {
							return [[U, E]]
						} else {
							return [[G, T]]
						}
					},
					perpendiculary: function() {
						var w = (am + C) / 2;
						if ((v == 2 && aq[0] == -1) || (v == 3 && aq[0] == 1)) {
							if (Math.abs(am - C) > f) {
								return [[U, E]]
							} else {
								return [[U, aa], [G, aa]]
							}
						} else {
							if ((v == 1 && aq[0] == -1) || (v == 4 && aq[0] == 1)) {
								var w = (am + C) / 2;
								return [[w, T], [w, E]]
							} else {
								if ((v == 1 && aq[0] == 1) || (v == 4 && aq[0] == -1)) {
									return [[G, T]]
								} else {
									if ((v == 2 && aq[0] == 1) || (v == 3 && aq[0] == -1)) {
										if (Math.abs(al - A) > f) {
											return [[U, aa], [G, aa]]
										} else {
											return [[G, T]]
										}
									}
								}
							}
						}
					}
				};
			var ai = z[H + N]();
			if (ai) {
				for (var an = 0; an < ai.length; an++) {
					i(ai[an][0], ai[an][1], C, A, am, al)
				}
			}
			i(G, E, C, A, am, al);
			i(am, al, C, A, am, al);
			s();
			l(C, A, am, al);
			if (c > p[3]) {
				p[3] = c + (P * 2)
			}
			if (d > p[2]) {
				p[2] = d + (P * 2)
			}
			return p
		};
		this.pointOnPath = function(t) {
			return r.pointAlongPathFrom(t, 0)
		};
		this.gradientAtPoint = function(t) {
			return m[n(t)["index"]][4]
		};
		this.pointAlongPathFrom = function(w, A) {
			var x = n(w),
				v = x.segment,
				z = x.proportion,
				u = m[x.index][5],
				t = m[x.index][4];
			var y = {
				x: t == Infinity ? v[2] : v[2] > v[0] ? v[0] + ((1 - z) * u) - A : v[2] + (z * u) + A,
				y: t == 0 ? v[3] : v[3] > v[1] ? v[1] + ((1 - z) * u) - A : v[3] + (z * u) + A,
				segmentInfo: x
			};
			return y
		}
	};
	jsPlumb.Endpoints.Dot = function(d) {
		this.type = "Dot";
		var c = this;
		d = d || {};
		this.radius = d.radius || 10;
		this.defaultOffset = 0.5 * this.radius;
		this.defaultInnerRadius = this.radius / 3;
		this.compute = function(i, f, l, h) {
			var g = l.radius || c.radius,
				e = i[0] - g,
				k = i[1] - g;
			return [e, k, g * 2, g * 2, g]
		}
	};
	jsPlumb.Endpoints.Rectangle = function(d) {
		this.type = "Rectangle";
		var c = this;
		d = d || {};
		this.width = d.width || 20;
		this.height = d.height || 20;
		this.compute = function(k, g, m, i) {
			var h = m.width || c.width,
				f = m.height || c.height,
				e = k[0] - (h / 2),
				l = k[1] - (f / 2);
			return [e, l, h, f]
		}
	};
	var a = function(e) {
			jsPlumb.DOMElementComponent.apply(this, arguments);
			var c = this;
			var d = [];
			this.getDisplayElements = function() {
				return d
			};
			this.appendDisplayElement = function(f) {
				d.push(f)
			}
		};
	jsPlumb.Endpoints.Image = function(g) {
		this.type = "Image";
		a.apply(this, arguments);
		var l = this,
			f = false,
			e = g.width,
			d = g.height,
			i = null,
			c = g.endpoint;
		this.img = new Image();
		l.ready = false;
		this.img.onload = function() {
			l.ready = true;
			e = e || l.img.width;
			d = d || l.img.height;
			if (i) {
				i(l)
			}
		};
		c.setImage = function(m, o) {
			var n = m.constructor == String ? m : m.src;
			i = o;
			l.img.src = m;
			if (l.canvas != null) {
				l.canvas.setAttribute("src", m)
			}
		};
		c.setImage(g.src || g.url, g.onload);
		this.compute = function(o, m, p, n) {
			l.anchorPoint = o;
			if (l.ready) {
				return [o[0] - e / 2, o[1] - d / 2, e, d]
			} else {
				return [0, 0, 0, 0]
			}
		};
		l.canvas = document.createElement("img"), f = false;
		l.canvas.style.margin = 0;
		l.canvas.style.padding = 0;
		l.canvas.style.outline = 0;
		l.canvas.style.position = "absolute";
		var h = g.cssClass ? " " + g.cssClass : "";
		l.canvas.className = jsPlumb.endpointClass + h;
		if (e) {
			l.canvas.setAttribute("width", e)
		}
		if (d) {
			l.canvas.setAttribute("height", d)
		}
		jsPlumb.appendElement(l.canvas, g.parent);
		l.attachListeners(l.canvas, l);
		var k = function(p, o, n) {
				if (!f) {
					l.canvas.setAttribute("src", l.img.src);
					l.appendDisplayElement(l.canvas);
					f = true
				}
				var m = l.anchorPoint[0] - (e / 2),
					q = l.anchorPoint[1] - (d / 2);
				jsPlumb.sizeCanvas(l.canvas, m, q, e, d)
			};
		this.paint = function(o, n, m) {
			if (l.ready) {
				k(o, n, m)
			} else {
				window.setTimeout(function() {
					l.paint(o, n, m)
				}, 200)
			}
		}
	};
	jsPlumb.Endpoints.Blank = function(d) {
		var c = this;
		this.type = "Blank";
		a.apply(this, arguments);
		this.compute = function(g, e, h, f) {
			return [g[0], g[1], 10, 0]
		};
		c.canvas = document.createElement("div");
		c.canvas.style.display = "block";
		c.canvas.style.width = "1px";
		c.canvas.style.height = "1px";
		c.canvas.style.background = "transparent";
		c.canvas.style.position = "absolute";
		c.canvas.className = c._jsPlumb.endpointClass;
		jsPlumb.appendElement(c.canvas, d.parent);
		this.paint = function(g, f, e) {
			jsPlumb.sizeCanvas(c.canvas, g[0], g[1], g[2], g[3])
		}
	};
	jsPlumb.Endpoints.Triangle = function(c) {
		this.type = "Triangle";
		c = c || {};
		c.width = c.width || 55;
		c.height = c.height || 55;
		this.width = c.width;
		this.height = c.height;
		this.compute = function(i, f, l, h) {
			var g = l.width || self.width,
				e = l.height || self.height,
				d = i[0] - (g / 2),
				k = i[1] - (e / 2);
			return [d, k, g, e]
		}
	};
	var b = function(e) {
			var d = true,
				c = this;
			this.isAppendedAtTopLevel = true;
			this.component = e.component;
			this.loc = e.location == null ? 0.5 : e.location;
			this.endpointLoc = e.endpointLocation == null ? [0.5, 0.5] : e.endpointLocation;
			this.setVisible = function(f) {
				d = f;
				c.component.repaint()
			};
			this.isVisible = function() {
				return d
			};
			this.hide = function() {
				c.setVisible(false)
			};
			this.show = function() {
				c.setVisible(true)
			};
			this.incrementLocation = function(f) {
				c.loc += f;
				c.component.repaint()
			};
			this.setLocation = function(f) {
				c.loc = f;
				c.component.repaint()
			};
			this.getLocation = function() {
				return c.loc
			}
		};
	jsPlumb.Overlays.Arrow = function(g) {
		this.type = "Arrow";
		b.apply(this, arguments);
		this.isAppendedAtTopLevel = false;
		g = g || {};
		var d = this;
		this.length = g.length || 20;
		this.width = g.width || 20;
		this.id = g.id;
		var f = (g.direction || 1) < 0 ? -1 : 1,
			e = g.paintStyle || {
				lineWidth: 1
			},
			c = g.foldback || 0.623;
		this.computeMaxSize = function() {
			return d.width * 1.5
		};
		this.cleanup = function() {};
		this.draw = function(i, x, s) {
			var m, t, h, n, l;
			if (i.pointAlongPathFrom) {
				if (d.loc == 1) {
					m = i.pointOnPath(d.loc);
					t = i.pointAlongPathFrom(d.loc, -1);
					h = jsPlumb.util.pointOnLine(m, t, d.length)
				} else {
					if (d.loc == 0) {
						h = i.pointOnPath(d.loc);
						t = i.pointAlongPathFrom(d.loc, 1);
						m = jsPlumb.util.pointOnLine(h, t, d.length)
					} else {
						m = i.pointAlongPathFrom(d.loc, f * d.length / 2), t = i.pointOnPath(d.loc), h = jsPlumb.util.pointOnLine(m, t, d.length)
					}
				}
				n = jsPlumb.util.perpendicularLineTo(m, h, d.width);
				l = jsPlumb.util.pointOnLine(m, h, c * d.length);
				var w = Math.min(m.x, n[0].x, n[1].x),
					q = Math.max(m.x, n[0].x, n[1].x),
					v = Math.min(m.y, n[0].y, n[1].y),
					p = Math.max(m.y, n[0].y, n[1].y);
				var o = {
					hxy: m,
					tail: n,
					cxy: l
				},
					r = e.strokeStyle || x.strokeStyle,
					u = e.fillStyle || x.strokeStyle,
					k = e.lineWidth || x.lineWidth;
				d.paint(i, o, k, r, u, s);
				return [w, q, v, p]
			} else {
				return [0, 0, 0, 0]
			}
		}
	};
	jsPlumb.Overlays.PlainArrow = function(d) {
		d = d || {};
		var c = jsPlumb.extend(d, {
			foldback: 1
		});
		jsPlumb.Overlays.Arrow.call(this, c);
		this.type = "PlainArrow"
	};
	jsPlumb.Overlays.Diamond = function(e) {
		e = e || {};
		var c = e.length || 40,
			d = jsPlumb.extend(e, {
				length: c / 2,
				foldback: 2
			});
		jsPlumb.Overlays.Arrow.call(this, d);
		this.type = "Diamond"
	};
	jsPlumb.Overlays.Label = function(i) {
		this.type = "Label";
		jsPlumb.DOMElementComponent.apply(this, arguments);
		b.apply(this, arguments);
		this.labelStyle = i.labelStyle || jsPlumb.Defaults.LabelStyle;
		this.id = i.id;
		this.cachedDimensions = null;
		var e = i.label || "",
			c = this,
			f = false,
			k = document.createElement("div"),
			g = null;
		k.style.position = "absolute";
		var d = i._jsPlumb.overlayClass + " " + (c.labelStyle.cssClass ? c.labelStyle.cssClass : i.cssClass ? i.cssClass : "");
		k.className = d;
		jsPlumb.appendElement(k, i.component.parent);
		jsPlumb.getId(k);
		c.attachListeners(k, c);
		c.canvas = k;
		var h = c.setVisible;
		c.setVisible = function(l) {
			h(l);
			k.style.display = l ? "block" : "none"
		};
		this.getElement = function() {
			return k
		};
		this.cleanup = function() {
			if (k != null) {
				jsPlumb.CurrentLibrary.removeElement(k)
			}
		};
		this.setLabel = function(m) {
			e = m;
			g = null;
			c.component.repaint()
		};
		this.getLabel = function() {
			return e
		};
		this.paint = function(l, n, m) {
			if (!f) {
				l.appendDisplayElement(k);
				c.attachListeners(k, l);
				f = true
			}
			k.style.left = (m[0] + n.minx) + "px";
			k.style.top = (m[1] + n.miny) + "px"
		};
		this.getTextDimensions = function() {
			if (typeof e == "function") {
				var l = e(c);
				k.innerHTML = l.replace(/\r\n/g, "<br/>")
			} else {
				if (g == null) {
					g = e;
					k.innerHTML = g.replace(/\r\n/g, "<br/>")
				}
			}
			var n = jsPlumb.CurrentLibrary.getElementObject(k),
				m = jsPlumb.CurrentLibrary.getSize(n);
			return {
				width: m[0],
				height: m[1]
			}
		};
		this.computeMaxSize = function(l) {
			var m = c.getTextDimensions(l);
			return m.width ? Math.max(m.width, m.height) * 1.5 : 0
		};
		this.draw = function(m, n, o) {
			var q = c.getTextDimensions(m);
			if (q.width != null) {
				var p = {
					x: 0,
					y: 0
				};
				if (m.pointOnPath) {
					p = m.pointOnPath(c.loc)
				} else {
					var l = c.loc.constructor == Array ? c.loc : c.endpointLoc;
					p = {
						x: l[0] * o[2],
						y: l[1] * o[3]
					}
				}
				minx = p.x - (q.width / 2), miny = p.y - (q.height / 2);
				c.paint(m, {
					minx: minx,
					miny: miny,
					td: q,
					cxy: p
				}, o);
				return [minx, minx + q.width, miny, miny + q.height]
			} else {
				return [0, 0, 0, 0]
			}
		};
		this.reattachListeners = function(l) {
			if (k) {
				c.reattachListenersForElement(k, c, l)
			}
		}
	};
	jsPlumb.Overlays.GuideLines = function() {
		var c = this;
		c.length = 50;
		c.lineWidth = 5;
		this.type = "GuideLines";
		b.apply(this, arguments);
		jsPlumb.jsPlumbUIComponent.apply(this, arguments);
		this.draw = function(e, l, k) {
			var i = e.pointAlongPathFrom(c.loc, c.length / 2),
				h = e.pointOnPath(c.loc),
				g = jsPlumb.util.pointOnLine(i, h, c.length),
				f = jsPlumb.util.perpendicularLineTo(i, g, 40),
				d = jsPlumb.util.perpendicularLineTo(g, i, 20);
			c.paint(e, [i, g, f, d], c.lineWidth, "red", null, k);
			return [Math.min(i.x, g.x), Math.min(i.y, g.y), Math.max(i.x, g.x), Math.max(i.y, g.y)]
		};
		this.computeMaxSize = function() {
			return 50
		};
		this.cleanup = function() {}
	}
})();
(function() {
	var c = function(e, g, d, f) {
			this.m = (f - g) / (d - e);
			this.b = -1 * ((this.m * e) - g);
			this.rectIntersect = function(q, p, s, o) {
				var n = [];
				var k = (p - this.b) / this.m;
				if (k >= q && k <= (q + s)) {
					n.push([k, (this.m * k) + this.b])
				}
				var t = (this.m * (q + s)) + this.b;
				if (t >= p && t <= (p + o)) {
					n.push([(t - this.b) / this.m, t])
				}
				var k = ((p + o) - this.b) / this.m;
				if (k >= q && k <= (q + s)) {
					n.push([k, (this.m * k) + this.b])
				}
				var t = (this.m * q) + this.b;
				if (t >= p && t <= (p + o)) {
					n.push([(t - this.b) / this.m, t])
				}
				if (n.length == 2) {
					var m = (n[0][0] + n[1][0]) / 2,
						l = (n[0][1] + n[1][1]) / 2;
					n.push([m, l]);
					var i = m <= q + (s / 2) ? -1 : 1,
						r = l <= p + (o / 2) ? -1 : 1;
					n.push([i, r]);
					return n
				}
				return null
			}
		},
		a = function(e, g, d, f) {
			if (e <= d && f <= g) {
				return 1
			} else {
				if (e <= d && g <= f) {
					return 2
				} else {
					if (d <= e && f >= g) {
						return 3
					}
				}
			}
			return 4
		},
		b = function(g, f, i, e, h, m, l, d, k) {
			if (d <= k) {
				return [g, f]
			}
			if (i == 1) {
				if (e[3] <= 0 && h[3] >= 1) {
					return [g + (e[2] < 0.5 ? -1 * m : m), f]
				} else {
					if (e[2] >= 1 && h[2] <= 0) {
						return [g, f + (e[3] < 0.5 ? -1 * l : l)]
					} else {
						return [g + (-1 * m), f + (-1 * l)]
					}
				}
			} else {
				if (i == 2) {
					if (e[3] >= 1 && h[3] <= 0) {
						return [g + (e[2] < 0.5 ? -1 * m : m), f]
					} else {
						if (e[2] >= 1 && h[2] <= 0) {
							return [g, f + (e[3] < 0.5 ? -1 * l : l)]
						} else {
							return [g + (1 * m), f + (-1 * l)]
						}
					}
				} else {
					if (i == 3) {
						if (e[3] >= 1 && h[3] <= 0) {
							return [g + (e[2] < 0.5 ? -1 * m : m), f]
						} else {
							if (e[2] <= 0 && h[2] >= 1) {
								return [g, f + (e[3] < 0.5 ? -1 * l : l)]
							} else {
								return [g + (-1 * m), f + (-1 * l)]
							}
						}
					} else {
						if (i == 4) {
							if (e[3] <= 0 && h[3] >= 1) {
								return [g + (e[2] < 0.5 ? -1 * m : m), f]
							} else {
								if (e[2] <= 0 && h[2] >= 1) {
									return [g, f + (e[3] < 0.5 ? -1 * l : l)]
								} else {
									return [g + (1 * m), f + (-1 * l)]
								}
							}
						}
					}
				}
			}
		};
	jsPlumb.Connectors.StateMachine = function(l) {
		var s = this,
			n = null,
			o, m, g, e, p = [],
			d = l.curviness || 10,
			k = l.margin || 5,
			q = l.proximityLimit || 80,
			f = l.orientation && l.orientation == "clockwise",
			i = l.loopbackRadius || 25,
			h = false;
		this.type = "StateMachine";
		l = l || {};
		this.compute = function(ab, F, U, G, aa, u, t, S) {
			var O = Math.abs(ab[0] - F[0]),
				W = Math.abs(ab[1] - F[1]),
				Q = 0.45 * O,
				Z = 0.45 * W;
			O *= 1.9;
			W *= 1.9;
			t = t || 1;
			var M = Math.min(ab[0], F[0]) - Q,
				K = Math.min(ab[1], F[1]) - Z;
			if (U.elementId != G.elementId) {
				h = false;
				o = ab[0] < F[0] ? Q : O - Q;
				m = ab[1] < F[1] ? Z : W - Z;
				g = ab[0] < F[0] ? O - Q : Q;
				e = ab[1] < F[1] ? W - Z : Z;
				if (ab[2] == 0) {
					o -= k
				}
				if (ab[2] == 1) {
					o += k
				}
				if (ab[3] == 0) {
					m -= k
				}
				if (ab[3] == 1) {
					m += k
				}
				if (F[2] == 0) {
					g -= k
				}
				if (F[2] == 1) {
					g += k
				}
				if (F[3] == 0) {
					e -= k
				}
				if (F[3] == 1) {
					e += k
				}
				var L = (o + g) / 2,
					J = (m + e) / 2,
					v = (-1 * L) / J,
					T = Math.atan(v),
					N = (v == Infinity || v == -Infinity) ? 0 : Math.abs(d / 2 * Math.sin(T)),
					P = (v == Infinity || v == -Infinity) ? 0 : Math.abs(d / 2 * Math.cos(T)),
					z = a(o, m, g, e),
					H = Math.sqrt(Math.pow(g - o, 2) + Math.pow(e - m, 2));
				p = b(L, J, z, ab, F, d, d, H, q);
				var E = Math.max(Math.abs(p[0] - o) * 3, Math.abs(p[0] - g) * 3, Math.abs(g - o), 2 * t, S),
					I = Math.max(Math.abs(p[1] - m) * 3, Math.abs(p[1] - e) * 3, Math.abs(e - m), 2 * t, S);
				if (O < E) {
					var R = E - O;
					M -= (R / 2);
					o += (R / 2);
					g += (R / 2);
					O = E;
					p[0] += (R / 2)
				}
				if (W < I) {
					var Y = I - W;
					K -= (Y / 2);
					m += (Y / 2);
					e += (Y / 2);
					W = I;
					p[1] += (Y / 2)
				}
				n = [M, K, O, W, o, m, g, e, p[0], p[1]]
			} else {
				h = true;
				var X = ab[0],
					V = ab[0],
					D = ab[1] - k,
					B = ab[1] - k,
					C = X,
					A = D - i;
				O = ((2 * t) + (4 * i)), W = ((2 * t) + (4 * i));
				M = C - i - t - i, K = A - i - t - i;
				n = [M, K, O, W, C - M, A - K, i, f, X - M, D - K, V - M, B - K]
			}
			return n
		};
		var r = function() {
				return [{
					x: g,
					y: e
				}, {
					x: p[0],
					y: p[1]
				}, {
					x: p[0] + 1,
					y: p[1] + 1
				}, {
					x: o,
					y: m
				}]
			};
		this.pointOnPath = function(v) {
			if (h) {
				if (v > 0 && v < 1) {
					v = 1 - v
				}
				var w = (v * 2 * Math.PI) + (Math.PI / 2),
					u = n[4] + (n[6] * Math.cos(w)),
					t = n[5] + (n[6] * Math.sin(w));
				return {
					x: u,
					y: t
				}
			} else {
				return jsBezier.pointOnCurve(r(), v)
			}
		};
		this.gradientAtPoint = function(t) {
			if (h) {
				return Math.atan(t * 2 * Math.PI)
			} else {
				return jsBezier.gradientAtPoint(r(), t)
			}
		};
		this.pointAlongPathFrom = function(v, z) {
			if (h) {
				if (v > 0 && v < 1) {
					v = 1 - v
				}
				var w = 2 * Math.PI * n[6],
					y = z / w * 2 * Math.PI,
					x = (v * 2 * Math.PI) - y + (Math.PI / 2),
					u = n[4] + (n[6] * Math.cos(x)),
					t = n[5] + (n[6] * Math.sin(x));
				return {
					x: u,
					y: t
				}
			}
			return jsBezier.pointAlongCurveFrom(r(), v, z)
		}
	};
	jsPlumb.Connectors.canvas.StateMachine = function(f) {
		f = f || {};
		var d = this,
			g = f.drawGuideline || true,
			e = f.avoidSelector;
		jsPlumb.Connectors.StateMachine.apply(this, arguments);
		jsPlumb.CanvasConnector.apply(this, arguments);
		this._paint = function(l) {
			if (l.length == 10) {
				d.ctx.beginPath();
				d.ctx.moveTo(l[4], l[5]);
				d.ctx.quadraticCurveTo(l[8], l[9], l[6], l[7]);
				d.ctx.stroke()
			} else {
				d.ctx.save();
				d.ctx.beginPath();
				var k = 0,
					i = 2 * Math.PI,
					h = l[7];
				d.ctx.arc(l[4], l[5], l[6], 0, i, h);
				d.ctx.stroke();
				d.ctx.closePath();
				d.ctx.restore()
			}
		};
		this.createGradient = function(i, h) {
			return h.createLinearGradient(i[4], i[5], i[6], i[7])
		}
	};
	jsPlumb.Connectors.svg.StateMachine = function() {
		var d = this;
		jsPlumb.Connectors.StateMachine.apply(this, arguments);
		jsPlumb.SvgConnector.apply(this, arguments);
		this.getPath = function(e) {
			if (e.length == 10) {
				return "M " + e[4] + " " + e[5] + " C " + e[8] + " " + e[9] + " " + e[8] + " " + e[9] + " " + e[6] + " " + e[7]
			} else {
				return "M" + (e[8] + 4) + " " + e[9] + " A " + e[6] + " " + e[6] + " 0 1,0 " + (e[8] - 4) + " " + e[9]
			}
		}
	};
	jsPlumb.Connectors.vml.StateMachine = function() {
		jsPlumb.Connectors.StateMachine.apply(this, arguments);
		jsPlumb.VmlConnector.apply(this, arguments);
		var d = jsPlumb.vml.convertValue;
		this.getPath = function(k) {
			if (k.length == 10) {
				return "m" + d(k[4]) + "," + d(k[5]) + " c" + d(k[8]) + "," + d(k[9]) + "," + d(k[8]) + "," + d(k[9]) + "," + d(k[6]) + "," + d(k[7]) + " e"
			} else {
				var h = d(k[8] - k[6]),
					g = d(k[9] - (2 * k[6])),
					f = h + d(2 * k[6]),
					e = g + d(2 * k[6]),
					l = h + "," + g + "," + f + "," + e;
				var i = "ar " + l + "," + d(k[8]) + "," + d(k[9]) + "," + d(k[8]) + "," + d(k[9]) + " e";
				return i
			}
		}
	}
})();
(function() {
	var h = {
		"stroke-linejoin": "joinstyle",
		joinstyle: "joinstyle",
		endcap: "endcap",
		miterlimit: "miterlimit"
	},
		c = null;
	if (document.createStyleSheet) {
		var m = [".jsplumb_vml", "jsplumb\\:textbox", "jsplumb\\:oval", "jsplumb\\:rect", "jsplumb\\:stroke", "jsplumb\\:shape", "jsplumb\\:group"],
			g = "behavior:url(#default#VML);position:absolute;";
		c = document.createStyleSheet();
		for (var r = 0; r < m.length; r++) {
			c.addRule(m[r], g)
		}
		document.namespaces.add("jsplumb", "urn:schemas-microsoft-com:vml")
	}
	jsPlumb.vml = {};
	var t = 1000,
		s = {},
		a = function(u, i) {
			var w = jsPlumb.getId(u),
				v = s[w];
			if (!v) {
				v = f("group", [0, 0, t, t], {
					"class": i
				});
				v.style.backgroundColor = "red";
				s[w] = v;
				jsPlumb.appendElement(v, u)
			}
			return v
		},
		e = function(v, w) {
			for (var u in w) {
				v[u] = w[u]
			}
		},
		f = function(u, x, y, v, i) {
			y = y || {};
			var w = document.createElement("jsplumb:" + u);
			i.appendElement(w, v);
			w.className = (y["class"] ? y["class"] + " " : "") + "jsplumb_vml";
			k(w, x);
			e(w, y);
			return w
		},
		k = function(u, i) {
			u.style.left = i[0] + "px";
			u.style.top = i[1] + "px";
			u.style.width = i[2] + "px";
			u.style.height = i[3] + "px";
			u.style.position = "absolute"
		},
		p = jsPlumb.vml.convertValue = function(i) {
			return Math.floor(i * t)
		},
		b = function(w, u, v, i) {
			if ("transparent" === u) {
				i.setOpacity(v, "0.0")
			} else {
				i.setOpacity(v, "1.0")
			}
		},
		q = function(y, u, B, C) {
			var x = {};
			if (u.strokeStyle) {
				x.stroked = "true";
				var D = jsPlumb.util.convertStyle(u.strokeStyle, true);
				x.strokecolor = D;
				b(x, D, "stroke", B);
				x.strokeweight = u.lineWidth + "px"
			} else {
				x.stroked = "false"
			}
			if (u.fillStyle) {
				x.filled = "true";
				var v = jsPlumb.util.convertStyle(u.fillStyle, true);
				x.fillcolor = v;
				b(x, v, "fill", B)
			} else {
				x.filled = "false"
			}
			if (u.dashstyle) {
				if (B.strokeNode == null) {
					B.strokeNode = f("stroke", [0, 0, 0, 0], {
						dashstyle: u.dashstyle
					}, y, C)
				} else {
					B.strokeNode.dashstyle = u.dashstyle
				}
			} else {
				if (u["stroke-dasharray"] && u.lineWidth) {
					var E = u["stroke-dasharray"].indexOf(",") == -1 ? " " : ",",
						z = u["stroke-dasharray"].split(E),
						w = "";
					for (var A = 0; A < z.length; A++) {
						w += (Math.floor(z[A] / u.lineWidth) + E)
					}
					if (B.strokeNode == null) {
						B.strokeNode = f("stroke", [0, 0, 0, 0], {
							dashstyle: w
						}, y, C)
					} else {
						B.strokeNode.dashstyle = w
					}
				}
			}
			e(y, x)
		},
		n = function() {
			var i = this;
			jsPlumb.jsPlumbUIComponent.apply(this, arguments);
			this.opacityNodes = {
				stroke: null,
				fill: null
			};
			this.initOpacityNodes = function(v) {
				i.opacityNodes.stroke = f("stroke", [0, 0, 1, 1], {
					opacity: "0.0"
				}, v, i._jsPlumb);
				i.opacityNodes.fill = f("fill", [0, 0, 1, 1], {
					opacity: "0.0"
				}, v, i._jsPlumb)
			};
			this.setOpacity = function(v, x) {
				var w = i.opacityNodes[v];
				if (w) {
					w.opacity = "" + x
				}
			};
			var u = [];
			this.getDisplayElements = function() {
				return u
			};
			this.appendDisplayElement = function(w, v) {
				if (!v) {
					i.canvas.parentNode.appendChild(w)
				}
				u.push(w)
			}
		},
		d = jsPlumb.VmlConnector = function(v) {
			var i = this;
			i.strokeNode = null;
			i.canvas = null;
			n.apply(this, arguments);
			var u = i._jsPlumb.connectorClass + (v.cssClass ? (" " + v.cssClass) : "");
			this.paint = function(A, x, z) {
				if (x != null) {
					var E = i.getPath(A),
						y = {
							path: E
						};
					if (x.outlineColor) {
						var C = x.outlineWidth || 1,
							D = x.lineWidth + (2 * C),
							B = {
								strokeStyle: jsPlumb.util.convertStyle(x.outlineColor),
								lineWidth: D
							};
						for (var w in h) {
							B[w] = x[w]
						}
						if (i.bgCanvas == null) {
							y["class"] = u;
							y.coordsize = (A[2] * t) + "," + (A[3] * t);
							i.bgCanvas = f("shape", A, y, v.parent, i._jsPlumb);
							k(i.bgCanvas, A);
							i.appendDisplayElement(i.bgCanvas, true);
							i.attachListeners(i.bgCanvas, i);
							i.initOpacityNodes(i.bgCanvas, ["stroke"])
						} else {
							y.coordsize = (A[2] * t) + "," + (A[3] * t);
							k(i.bgCanvas, A);
							e(i.bgCanvas, y)
						}
						q(i.bgCanvas, B, i)
					}
					if (i.canvas == null) {
						y["class"] = u;
						y.coordsize = (A[2] * t) + "," + (A[3] * t);
						if (i.tooltip) {
							y.label = i.tooltip
						}
						i.canvas = f("shape", A, y, v.parent, i._jsPlumb);
						i.appendDisplayElement(i.canvas, true);
						i.attachListeners(i.canvas, i);
						i.initOpacityNodes(i.canvas, ["stroke"])
					} else {
						y.coordsize = (A[2] * t) + "," + (A[3] * t);
						k(i.canvas, A);
						e(i.canvas, y)
					}
					q(i.canvas, x, i, i._jsPlumb)
				}
			};
			this.reattachListeners = function() {
				if (i.canvas) {
					i.reattachListenersForElement(i.canvas, i)
				}
			}
		},
		l = function(y) {
			n.apply(this, arguments);
			var i = null,
				v = this,
				u = null,
				x = null;
			v.canvas = document.createElement("div");
			v.canvas.style.position = "absolute";
			var w = v._jsPlumb.endpointClass + (y.cssClass ? (" " + y.cssClass) : "");
			y._jsPlumb.appendElement(v.canvas, y.parent);
			if (v.tooltip) {
				v.canvas.setAttribute("label", v.tooltip)
			}
			this.paint = function(C, A, z) {
				var B = {};
				jsPlumb.sizeCanvas(v.canvas, C[0], C[1], C[2], C[3]);
				if (i == null) {
					B["class"] = w;
					i = v.getVml([0, 0, C[2], C[3]], B, z, v.canvas, v._jsPlumb);
					v.attachListeners(i, v);
					v.appendDisplayElement(i, true);
					v.appendDisplayElement(v.canvas, true);
					v.initOpacityNodes(i, ["fill"])
				} else {
					k(i, [0, 0, C[2], C[3]]);
					e(i, B)
				}
				q(i, A, v)
			};
			this.reattachListeners = function() {
				if (i) {
					v.reattachListenersForElement(i, v)
				}
			}
		};
	jsPlumb.Connectors.vml.Bezier = function() {
		jsPlumb.Connectors.Bezier.apply(this, arguments);
		d.apply(this, arguments);
		this.getPath = function(i) {
			return "m" + p(i[4]) + "," + p(i[5]) + " c" + p(i[8]) + "," + p(i[9]) + "," + p(i[10]) + "," + p(i[11]) + "," + p(i[6]) + "," + p(i[7]) + " e"
		}
	};
	jsPlumb.Connectors.vml.Straight = function() {
		jsPlumb.Connectors.Straight.apply(this, arguments);
		d.apply(this, arguments);
		this.getPath = function(i) {
			return "m" + p(i[4]) + "," + p(i[5]) + " l" + p(i[6]) + "," + p(i[7]) + " e"
		}
	};
	jsPlumb.Connectors.vml.Flowchart = function() {
		jsPlumb.Connectors.Flowchart.apply(this, arguments);
		d.apply(this, arguments);
		this.getPath = function(v) {
			var w = "m " + p(v[4]) + "," + p(v[5]) + " l";
			for (var u = 0; u < v[8]; u++) {
				w = w + " " + p(v[9 + (u * 2)]) + "," + p(v[10 + (u * 2)])
			}
			w = w + " " + p(v[6]) + "," + p(v[7]) + " e";
			return w
		}
	};
	jsPlumb.Endpoints.vml.Dot = function() {
		jsPlumb.Endpoints.Dot.apply(this, arguments);
		l.apply(this, arguments);
		this.getVml = function(w, x, u, v, i) {
			return f("oval", w, x, v, i)
		}
	};
	jsPlumb.Endpoints.vml.Rectangle = function() {
		jsPlumb.Endpoints.Rectangle.apply(this, arguments);
		l.apply(this, arguments);
		this.getVml = function(w, x, u, v, i) {
			return f("rect", w, x, v, i)
		}
	};
	jsPlumb.Endpoints.vml.Image = jsPlumb.Endpoints.Image;
	jsPlumb.Endpoints.vml.Blank = jsPlumb.Endpoints.Blank;
	jsPlumb.Overlays.vml.Label = jsPlumb.Overlays.Label;
	var o = function(x, v) {
			x.apply(this, v);
			n.apply(this, arguments);
			var u = this,
				w = null;
			u.canvas = null;
			var i = function(z, y) {
					return "m " + p(z.hxy.x) + "," + p(z.hxy.y) + " l " + p(z.tail[0].x) + "," + p(z.tail[0].y) + " " + p(z.cxy.x) + "," + p(z.cxy.y) + " " + p(z.tail[1].x) + "," + p(z.tail[1].y) + " x e"
				};
			this.paint = function(B, G, F, H, L, K) {
				var z = {};
				if (H) {
					z.stroked = "true";
					z.strokecolor = jsPlumb.util.convertStyle(H, true)
				}
				if (F) {
					z.strokeweight = F + "px"
				}
				if (L) {
					z.filled = "true";
					z.fillcolor = L
				}
				var y = Math.min(G.hxy.x, G.tail[0].x, G.tail[1].x, G.cxy.x),
					J = Math.min(G.hxy.y, G.tail[0].y, G.tail[1].y, G.cxy.y),
					C = Math.max(G.hxy.x, G.tail[0].x, G.tail[1].x, G.cxy.x),
					A = Math.max(G.hxy.y, G.tail[0].y, G.tail[1].y, G.cxy.y),
					I = Math.abs(C - y),
					E = Math.abs(A - J),
					D = [y, J, I, E];
				z.path = i(G, K);
				z.coordsize = (K[2] * t) + "," + (K[3] * t);
				D[0] = K[0];
				D[1] = K[1];
				D[2] = K[2];
				D[3] = K[3];
				if (u.canvas == null) {
					u.canvas = f("shape", D, z, B.canvas.parentNode, B._jsPlumb);
					B.appendDisplayElement(u.canvas, true);
					u.attachListeners(u.canvas, B)
				} else {
					k(u.canvas, D);
					e(u.canvas, z)
				}
			};
			this.reattachListeners = function() {
				if (u.canvas) {
					u.reattachListenersForElement(u.canvas, u)
				}
			}
		};
	jsPlumb.Overlays.vml.Arrow = function() {
		o.apply(this, [jsPlumb.Overlays.Arrow, arguments])
	};
	jsPlumb.Overlays.vml.PlainArrow = function() {
		o.apply(this, [jsPlumb.Overlays.PlainArrow, arguments])
	};
	jsPlumb.Overlays.vml.Diamond = function() {
		o.apply(this, [jsPlumb.Overlays.Diamond, arguments])
	}
})();
(function() {
	var l = {
		joinstyle: "stroke-linejoin",
		"stroke-linejoin": "stroke-linejoin",
		"stroke-dashoffset": "stroke-dashoffset",
		"stroke-linecap": "stroke-linecap"
	},
		w = "stroke-dasharray",
		A = "dashstyle",
		e = "linearGradient",
		b = "radialGradient",
		c = "fill",
		a = "stop",
		z = "stroke",
		q = "stroke-width",
		h = "style",
		m = "none",
		t = "jsplumb_gradient_",
		o = "lineWidth",
		C = {
			svg: "http://www.w3.org/2000/svg",
			xhtml: "http://www.w3.org/1999/xhtml"
		},
		g = function(F, D) {
			for (var E in D) {
				F.setAttribute(E, "" + D[E])
			}
		},
		f = function(E, D) {
			var F = document.createElementNS(C.svg, E);
			D = D || {};
			D.version = "1.1";
			D.xmlns = C.xhtml;
			g(F, D);
			return F
		},
		n = function(D) {
			return "position:absolute;left:" + D[0] + "px;top:" + D[1] + "px"
		},
		i = function(E) {
			for (var D = 0; D < E.childNodes.length; D++) {
				if (E.childNodes[D].tagName == e || E.childNodes[D].tagName == b) {
					E.removeChild(E.childNodes[D])
				}
			}
		},
		v = function(N, I, F, D, J) {
			var G = t + J._jsPlumb.idstamp();
			i(N);
			if (!F.gradient.offset) {
				var L = f(e, {
					id: G
				});
				N.appendChild(L)
			} else {
				var L = f(b, {
					id: G
				});
				N.appendChild(L)
			}
			for (var K = 0; K < F.gradient.stops.length; K++) {
				var H = K;
				if (D.length == 8) {
					H = D[4] < D[6] ? K : F.gradient.stops.length - 1 - K
				} else {
					H = D[4] < D[6] ? F.gradient.stops.length - 1 - K : K
				}
				var M = jsPlumb.util.convertStyle(F.gradient.stops[H][1], true);
				var O = f(a, {
					offset: Math.floor(F.gradient.stops[K][0] * 100) + "%",
					"stop-color": M
				});
				L.appendChild(O)
			}
			var E = F.strokeStyle ? z : c;
			I.setAttribute(h, E + ":url(#" + G + ")")
		},
		x = function(K, G, E, D, H) {
			if (E.gradient) {
				v(K, G, E, D, H)
			} else {
				i(K);
				G.setAttribute(h, "")
			}
			G.setAttribute(c, E.fillStyle ? jsPlumb.util.convertStyle(E.fillStyle, true) : m);
			G.setAttribute(z, E.strokeStyle ? jsPlumb.util.convertStyle(E.strokeStyle, true) : m);
			if (E.lineWidth) {
				G.setAttribute(q, E.lineWidth)
			}
			if (E[A] && E[o] && !E[w]) {
				var L = E[A].indexOf(",") == -1 ? " " : ",",
					I = E[A].split(L),
					F = "";
				I.forEach(function(M) {
					F += (Math.floor(M * E.lineWidth) + L)
				});
				G.setAttribute(w, F)
			} else {
				if (E[w]) {
					G.setAttribute(w, E[w])
				}
			}
			for (var J in l) {
				if (E[J]) {
					G.setAttribute(l[J], E[J])
				}
			}
		},
		B = function(F) {
			var D = /([0-9].)(p[xt])\s(.*)/;
			var E = F.match(D);
			return {
				size: E[1] + E[2],
				font: E[3]
			}
		},
		r = function(I, J, E) {
			var K = E.split(" "),
				H = I.className,
				G = H.baseVal.split(" ");
			for (var F = 0; F < K.length; F++) {
				if (J) {
					if (G.indexOf(K[F]) == -1) {
						G.push(K[F])
					}
				} else {
					var D = G.indexOf(K[F]);
					if (D != -1) {
						G.splice(D, 1)
					}
				}
			}
			I.className.baseVal = G.join(" ")
		},
		u = function(E, D) {
			r(E, true, D)
		},
		k = function(E, D) {
			r(E, false, D)
		};
	jsPlumb.util.svg = {
		addClass: u,
		removeClass: k
	};
	var s = function(H) {
			var D = this,
				G = H.pointerEventsSpec || "all";
			jsPlumb.jsPlumbUIComponent.apply(this, H.originalArgs);
			D.canvas = null, D.path = null, D.svg = null;
			var F = H.cssClass + " " + (H.originalArgs[0].cssClass || ""),
				I = {
					style: "",
					width: 0,
					height: 0,
					"pointer-events": G,
					position: "absolute"
				};
			if (D.tooltip) {
				I.title = D.tooltip
			}
			D.svg = f("svg", I);
			if (H.useDivWrapper) {
				D.canvas = document.createElement("div");
				D.canvas.style.position = "absolute";
				jsPlumb.sizeCanvas(D.canvas, 0, 0, 1, 1);
				D.canvas.className = F;
				if (D.tooltip) {
					D.canvas.setAttribute("title", D.tooltip)
				}
			} else {
				g(D.svg, {
					"class": F
				});
				D.canvas = D.svg
			}
			H._jsPlumb.appendElement(D.canvas, H.originalArgs[0]["parent"]);
			if (H.useDivWrapper) {
				D.canvas.appendChild(D.svg)
			}
			var E = [D.canvas];
			this.getDisplayElements = function() {
				return E
			};
			this.appendDisplayElement = function(J) {
				E.push(J)
			};
			this.paint = function(M, L, K) {
				if (L != null) {
					var J = M[0],
						N = M[1];
					if (H.useDivWrapper) {
						jsPlumb.sizeCanvas(D.canvas, M[0], M[1], M[2], M[3]);
						J = 0, N = 0
					}
					g(D.svg, {
						style: n([J, N, M[2], M[3]]),
						width: M[2],
						height: M[3]
					});
					D._paint.apply(this, arguments)
				}
			}
		};
	var d = jsPlumb.SvgConnector = function(E) {
			var D = this;
			s.apply(this, [{
				cssClass: E._jsPlumb.connectorClass,
				originalArgs: arguments,
				pointerEventsSpec: "none",
				tooltip: E.tooltip,
				_jsPlumb: E._jsPlumb
			}]);
			this._paint = function(L, H) {
				var K = D.getPath(L),
					F = {
						d: K
					},
					J = null;
				F["pointer-events"] = "all";
				if (H.outlineColor) {
					var I = H.outlineWidth || 1,
						G = H.lineWidth + (2 * I),
						J = jsPlumb.CurrentLibrary.extend({}, H);
					J.strokeStyle = jsPlumb.util.convertStyle(H.outlineColor);
					J.lineWidth = G;
					if (D.bgPath == null) {
						D.bgPath = f("path", F);
						D.svg.appendChild(D.bgPath);
						D.attachListeners(D.bgPath, D)
					} else {
						g(D.bgPath, F)
					}
					x(D.svg, D.bgPath, J, L, D)
				}
				if (D.path == null) {
					D.path = f("path", F);
					D.svg.appendChild(D.path);
					D.attachListeners(D.path, D)
				} else {
					g(D.path, F)
				}
				x(D.svg, D.path, H, L, D)
			};
			this.reattachListeners = function() {
				if (D.bgPath) {
					D.reattachListenersForElement(D.bgPath, D)
				}
				if (D.path) {
					D.reattachListenersForElement(D.path, D)
				}
			}
		};
	jsPlumb.Connectors.svg.Bezier = function(D) {
		jsPlumb.Connectors.Bezier.apply(this, arguments);
		d.apply(this, arguments);
		this.getPath = function(F) {
			var E = "M " + F[4] + " " + F[5];
			E += (" C " + F[8] + " " + F[9] + " " + F[10] + " " + F[11] + " " + F[6] + " " + F[7]);
			return E
		}
	};
	jsPlumb.Connectors.svg.Straight = function(D) {
		jsPlumb.Connectors.Straight.apply(this, arguments);
		d.apply(this, arguments);
		this.getPath = function(E) {
			return "M " + E[4] + " " + E[5] + " L " + E[6] + " " + E[7]
		}
	};
	jsPlumb.Connectors.svg.Flowchart = function() {
		var D = this;
		jsPlumb.Connectors.Flowchart.apply(this, arguments);
		d.apply(this, arguments);
		this.getPath = function(F) {
			var G = "M " + F[4] + "," + F[5];
			for (var E = 0; E < F[8]; E++) {
				G = G + " L " + F[9 + (E * 2)] + " " + F[10 + (E * 2)]
			}
			G = G + " " + F[6] + "," + F[7];
			return G
		}
	};
	var y = function(E) {
			var D = this;
			s.apply(this, [{
				cssClass: E._jsPlumb.endpointClass,
				originalArgs: arguments,
				pointerEventsSpec: "all",
				useDivWrapper: true,
				_jsPlumb: E._jsPlumb
			}]);
			this._paint = function(H, G) {
				var F = jsPlumb.extend({}, G);
				if (F.outlineColor) {
					F.strokeWidth = F.outlineWidth;
					F.strokeStyle = jsPlumb.util.convertStyle(F.outlineColor, true)
				}
				if (D.node == null) {
					D.node = D.makeNode(H, F);
					D.svg.appendChild(D.node);
					D.attachListeners(D.node, D)
				}
				x(D.svg, D.node, F, H, D);
				n(D.node, H)
			};
			this.reattachListeners = function() {
				if (D.node) {
					D.reattachListenersForElement(D.node, D)
				}
			}
		};
	jsPlumb.Endpoints.svg.Dot = function() {
		jsPlumb.Endpoints.Dot.apply(this, arguments);
		y.apply(this, arguments);
		this.makeNode = function(E, D) {
			return f("circle", {
				cx: E[2] / 2,
				cy: E[3] / 2,
				r: E[2] / 2
			})
		}
	};
	jsPlumb.Endpoints.svg.Rectangle = function() {
		jsPlumb.Endpoints.Rectangle.apply(this, arguments);
		y.apply(this, arguments);
		this.makeNode = function(E, D) {
			return f("rect", {
				width: E[2],
				height: E[3]
			})
		}
	};
	jsPlumb.Endpoints.svg.Image = jsPlumb.Endpoints.Image;
	jsPlumb.Endpoints.svg.Blank = jsPlumb.Endpoints.Blank;
	jsPlumb.Overlays.svg.Label = jsPlumb.Overlays.Label;
	var p = function(H, F) {
			H.apply(this, F);
			jsPlumb.jsPlumbUIComponent.apply(this, F);
			this.isAppendedAtTopLevel = false;
			var D = this,
				G = null;
			this.paint = function(J, M, I, N, K) {
				if (G == null) {
					G = f("path");
					J.svg.appendChild(G);
					D.attachListeners(G, J);
					D.attachListeners(G, D)
				}
				var L = F && (F.length == 1) ? (F[0].cssClass || "") : "";
				g(G, {
					d: E(M),
					"class": L,
					stroke: N ? N : null,
					fill: K ? K : null
				})
			};
			var E = function(I) {
					return "M" + I.hxy.x + "," + I.hxy.y + " L" + I.tail[0].x + "," + I.tail[0].y + " L" + I.cxy.x + "," + I.cxy.y + " L" + I.tail[1].x + "," + I.tail[1].y + " L" + I.hxy.x + "," + I.hxy.y
				};
			this.reattachListeners = function() {
				if (G) {
					D.reattachListenersForElement(G, D)
				}
			}
		};
	jsPlumb.Overlays.svg.Arrow = function() {
		p.apply(this, [jsPlumb.Overlays.Arrow, arguments])
	};
	jsPlumb.Overlays.svg.PlainArrow = function() {
		p.apply(this, [jsPlumb.Overlays.PlainArrow, arguments])
	};
	jsPlumb.Overlays.svg.Diamond = function() {
		p.apply(this, [jsPlumb.Overlays.Diamond, arguments])
	};
	jsPlumb.Overlays.svg.GuideLines = function() {
		var I = null,
			D = this,
			H = null,
			G, F;
		jsPlumb.Overlays.GuideLines.apply(this, arguments);
		this.paint = function(K, M, J, N, L) {
			if (I == null) {
				I = f("path");
				K.svg.appendChild(I);
				D.attachListeners(I, K);
				D.attachListeners(I, D);
				G = f("path");
				K.svg.appendChild(G);
				D.attachListeners(G, K);
				D.attachListeners(G, D);
				F = f("path");
				K.svg.appendChild(F);
				D.attachListeners(F, K);
				D.attachListeners(F, D)
			}
			g(I, {
				d: E(M[0], M[1]),
				stroke: "red",
				fill: null
			});
			g(G, {
				d: E(M[2][0], M[2][1]),
				stroke: "blue",
				fill: null
			});
			g(F, {
				d: E(M[3][0], M[3][1]),
				stroke: "green",
				fill: null
			})
		};
		var E = function(K, J) {
				return "M " + K.x + "," + K.y + " L" + J.x + "," + J.y
			}
	}
})();
(function() {
	var d = null,
		i = function(p, o) {
			return jsPlumb.CurrentLibrary.hasClass(a(p), o)
		},
		a = function(o) {
			return jsPlumb.CurrentLibrary.getElementObject(o)
		},
		m = function(o) {
			return jsPlumb.CurrentLibrary.getOffset(a(o))
		},
		n = function(o) {
			return jsPlumb.CurrentLibrary.getPageXY(o)
		},
		f = function(o) {
			return jsPlumb.CurrentLibrary.getClientXY(o)
		};
	var k = function() {
			var q = this;
			q.overlayPlacements = [];
			jsPlumb.jsPlumbUIComponent.apply(this, arguments);
			jsPlumb.EventGenerator.apply(this, arguments);
			this._over = function(z) {
				var B = m(a(q.canvas)),
					D = n(z),
					u = D[0] - B.left,
					C = D[1] - B.top;
				if (u > 0 && C > 0 && u < q.canvas.width && C < q.canvas.height) {
					for (var v = 0; v < q.overlayPlacements.length; v++) {
						var w = q.overlayPlacements[v];
						if (w && (w[0] <= u && w[1] >= u && w[2] <= C && w[3] >= C)) {
							return true
						}
					}
					var A = q.canvas.getContext("2d").getImageData(parseInt(u), parseInt(C), 1, 1);
					return A.data[0] != 0 || A.data[1] != 0 || A.data[2] != 0 || A.data[3] != 0
				}
				return false
			};
			var p = false,
				o = false,
				t = null,
				s = false,
				r = function(v, u) {
					return v != null && i(v, u)
				};
			this.mousemove = function(x) {
				var z = n(x),
					w = f(x),
					v = document.elementFromPoint(w[0], w[1]),
					y = r(v, "_jsPlumb_overlay");
				var u = d == null && (r(v, "_jsPlumb_endpoint") || r(v, "_jsPlumb_connector"));
				if (!p && u && q._over(x)) {
					p = true;
					q.fire("mouseenter", q, x);
					return true
				} else {
					if (p && (!q._over(x) || !u) && !y) {
						p = false;
						q.fire("mouseexit", q, x)
					}
				}
				q.fire("mousemove", q, x)
			};
			this.click = function(u) {
				if (p && q._over(u) && !s) {
					q.fire("click", q, u)
				}
				s = false
			};
			this.dblclick = function(u) {
				if (p && q._over(u) && !s) {
					q.fire("dblclick", q, u)
				}
				s = false
			};
			this.mousedown = function(u) {
				if (q._over(u) && !o) {
					o = true;
					t = m(a(q.canvas));
					q.fire("mousedown", q, u)
				}
			};
			this.mouseup = function(u) {
				o = false;
				q.fire("mouseup", q, u)
			};
			this.contextmenu = function(u) {
				if (p && q._over(u) && !s) {
					q.fire("contextmenu", q, u)
				}
				s = false
			}
		};
	var c = function(p) {
			var o = document.createElement("canvas");
			p._jsPlumb.appendElement(o, p.parent);
			o.style.position = "absolute";
			if (p["class"]) {
				o.className = p["class"]
			}
			p._jsPlumb.getId(o, p.uuid);
			if (p.tooltip) {
				o.setAttribute("title", p.tooltip)
			}
			return o
		};
	var l = function(p) {
			k.apply(this, arguments);
			var o = [];
			this.getDisplayElements = function() {
				return o
			};
			this.appendDisplayElement = function(q) {
				o.push(q)
			}
		};
	var h = jsPlumb.CanvasConnector = function(r) {
			l.apply(this, arguments);
			var o = function(v, t) {
					p.ctx.save();
					jsPlumb.extend(p.ctx, t);
					if (t.gradient) {
						var u = p.createGradient(v, p.ctx);
						for (var s = 0; s < t.gradient.stops.length; s++) {
							u.addColorStop(t.gradient.stops[s][0], t.gradient.stops[s][1])
						}
						p.ctx.strokeStyle = u
					}
					p._paint(v);
					p.ctx.restore()
				};
			var p = this,
				q = p._jsPlumb.connectorClass + " " + (r.cssClass || "");
			p.canvas = c({
				"class": q,
				_jsPlumb: p._jsPlumb,
				parent: r.parent,
				tooltip: r.tooltip
			});
			p.ctx = p.canvas.getContext("2d");
			p.appendDisplayElement(p.canvas);
			p.paint = function(w, t) {
				if (t != null) {
					jsPlumb.sizeCanvas(p.canvas, w[0], w[1], w[2], w[3]);
					if (t.outlineColor != null) {
						var v = t.outlineWidth || 1,
							s = t.lineWidth + (2 * v),
							u = {
								strokeStyle: t.outlineColor,
								lineWidth: s
							};
						o(w, u)
					}
					o(w, t)
				}
			}
		};
	var b = function(r) {
			var p = this;
			l.apply(this, arguments);
			var q = p._jsPlumb.endpointClass + " " + (r.cssClass || ""),
				o = {
					"class": q,
					_jsPlumb: p._jsPlumb,
					parent: r.parent,
					tooltip: p.tooltip
				};
			p.canvas = c(o);
			p.ctx = p.canvas.getContext("2d");
			p.appendDisplayElement(p.canvas);
			this.paint = function(x, u, s) {
				jsPlumb.sizeCanvas(p.canvas, x[0], x[1], x[2], x[3]);
				if (u.outlineColor != null) {
					var w = u.outlineWidth || 1,
						t = u.lineWidth + (2 * w);
					var v = {
						strokeStyle: u.outlineColor,
						lineWidth: t
					}
				}
				p._paint.apply(this, arguments)
			}
		};
	jsPlumb.Endpoints.canvas.Dot = function(r) {
		jsPlumb.Endpoints.Dot.apply(this, arguments);
		b.apply(this, arguments);
		var q = this,
			p = function(s) {
				try {
					return parseInt(s)
				} catch (t) {
					if (s.substring(s.length - 1) == "%") {
						return parseInt(s.substring(0, s - 1))
					}
				}
			},
			o = function(u) {
				var s = q.defaultOffset,
					t = q.defaultInnerRadius;
				u.offset && (s = p(u.offset));
				u.innerRadius && (t = p(u.innerRadius));
				return [s, t]
			};
		this._paint = function(A, t, x) {
			if (t != null) {
				var B = q.canvas.getContext("2d"),
					u = x.getOrientation(q);
				jsPlumb.extend(B, t);
				if (t.gradient) {
					var v = o(t.gradient),
						y = u[1] == 1 ? v[0] * -1 : v[0],
						s = u[0] == 1 ? v[0] * -1 : v[0],
						z = B.createRadialGradient(A[4], A[4], A[4], A[4] + s, A[4] + y, v[1]);
					for (var w = 0; w < t.gradient.stops.length; w++) {
						z.addColorStop(t.gradient.stops[w][0], t.gradient.stops[w][1])
					}
					B.fillStyle = z
				}
				B.beginPath();
				B.arc(A[4], A[4], A[4], 0, Math.PI * 2, true);
				B.closePath();
				if (t.fillStyle || t.gradient) {
					B.fill()
				}
				if (t.strokeStyle) {
					B.stroke()
				}
			}
		}
	};
	jsPlumb.Endpoints.canvas.Rectangle = function(p) {
		var o = this;
		jsPlumb.Endpoints.Rectangle.apply(this, arguments);
		b.apply(this, arguments);
		this._paint = function(x, r, v) {
			var A = o.canvas.getContext("2d"),
				t = v.getOrientation(o);
			jsPlumb.extend(A, r);
			if (r.gradient) {
				var z = t[1] == 1 ? x[3] : t[1] == 0 ? x[3] / 2 : 0;
				var y = t[1] == -1 ? x[3] : t[1] == 0 ? x[3] / 2 : 0;
				var s = t[0] == 1 ? x[2] : t[0] == 0 ? x[2] / 2 : 0;
				var q = t[0] == -1 ? x[2] : t[0] == 0 ? x[2] / 2 : 0;
				var w = A.createLinearGradient(s, z, q, y);
				for (var u = 0; u < r.gradient.stops.length; u++) {
					w.addColorStop(r.gradient.stops[u][0], r.gradient.stops[u][1])
				}
				A.fillStyle = w
			}
			A.beginPath();
			A.rect(0, 0, x[2], x[3]);
			A.closePath();
			if (r.fillStyle || r.gradient) {
				A.fill()
			}
			if (r.strokeStyle) {
				A.stroke()
			}
		}
	};
	jsPlumb.Endpoints.canvas.Triangle = function(p) {
		var o = this;
		jsPlumb.Endpoints.Triangle.apply(this, arguments);
		b.apply(this, arguments);
		this._paint = function(z, q, v) {
			var s = z[2],
				C = z[3],
				B = z[0],
				A = z[1],
				D = o.canvas.getContext("2d"),
				w = 0,
				u = 0,
				t = 0,
				r = v.getOrientation(o);
			if (r[0] == 1) {
				w = s;
				u = C;
				t = 180
			}
			if (r[1] == -1) {
				w = s;
				t = 90
			}
			if (r[1] == 1) {
				u = C;
				t = -90
			}
			D.fillStyle = q.fillStyle;
			D.translate(w, u);
			D.rotate(t * Math.PI / 180);
			D.beginPath();
			D.moveTo(0, 0);
			D.lineTo(s / 2, C / 2);
			D.lineTo(0, C);
			D.closePath();
			if (q.fillStyle || q.gradient) {
				D.fill()
			}
			if (q.strokeStyle) {
				D.stroke()
			}
		}
	};
	jsPlumb.Endpoints.canvas.Image = jsPlumb.Endpoints.Image;
	jsPlumb.Endpoints.canvas.Blank = jsPlumb.Endpoints.Blank;
	jsPlumb.Connectors.canvas.Bezier = function() {
		var o = this;
		jsPlumb.Connectors.Bezier.apply(this, arguments);
		h.apply(this, arguments);
		this._paint = function(p) {
			o.ctx.beginPath();
			o.ctx.moveTo(p[4], p[5]);
			o.ctx.bezierCurveTo(p[8], p[9], p[10], p[11], p[6], p[7]);
			o.ctx.stroke()
		};
		this.createGradient = function(r, p, q) {
			return o.ctx.createLinearGradient(r[6], r[7], r[4], r[5])
		}
	};
	jsPlumb.Connectors.canvas.Straight = function() {
		var o = this;
		jsPlumb.Connectors.Straight.apply(this, arguments);
		h.apply(this, arguments);
		this._paint = function(p) {
			o.ctx.beginPath();
			o.ctx.moveTo(p[4], p[5]);
			o.ctx.lineTo(p[6], p[7]);
			o.ctx.stroke()
		};
		this.createGradient = function(q, p) {
			return p.createLinearGradient(q[4], q[5], q[6], q[7])
		}
	};
	jsPlumb.Connectors.canvas.Flowchart = function() {
		var o = this;
		jsPlumb.Connectors.Flowchart.apply(this, arguments);
		h.apply(this, arguments);
		this._paint = function(q) {
			o.ctx.beginPath();
			o.ctx.moveTo(q[4], q[5]);
			for (var p = 0; p < q[8]; p++) {
				o.ctx.lineTo(q[9 + (p * 2)], q[10 + (p * 2)])
			}
			o.ctx.lineTo(q[6], q[7]);
			o.ctx.stroke()
		};
		this.createGradient = function(q, p) {
			return p.createLinearGradient(q[4], q[5], q[6], q[7])
		}
	};
	jsPlumb.Overlays.canvas.Label = jsPlumb.Overlays.Label;
	var g = function() {
			jsPlumb.jsPlumbUIComponent.apply(this, arguments)
		};
	var e = function(p, o) {
			p.apply(this, o);
			g.apply(this, arguments);
			this.paint = function(s, u, q, v, t) {
				var r = s.ctx;
				r.lineWidth = q;
				r.beginPath();
				r.moveTo(u.hxy.x, u.hxy.y);
				r.lineTo(u.tail[0].x, u.tail[0].y);
				r.lineTo(u.cxy.x, u.cxy.y);
				r.lineTo(u.tail[1].x, u.tail[1].y);
				r.lineTo(u.hxy.x, u.hxy.y);
				r.closePath();
				if (v) {
					r.strokeStyle = v;
					r.stroke()
				}
				if (t) {
					r.fillStyle = t;
					r.fill()
				}
			}
		};
	jsPlumb.Overlays.canvas.Arrow = function() {
		e.apply(this, [jsPlumb.Overlays.Arrow, arguments])
	};
	jsPlumb.Overlays.canvas.PlainArrow = function() {
		e.apply(this, [jsPlumb.Overlays.PlainArrow, arguments])
	};
	jsPlumb.Overlays.canvas.Diamond = function() {
		e.apply(this, [jsPlumb.Overlays.Diamond, arguments])
	}
})();
(function(a) {
	jsPlumb.CurrentLibrary = {
		addClass: function(c, b) {
			c = jsPlumb.CurrentLibrary.getElementObject(c);
			try {
				if (c[0].className.constructor == SVGAnimatedString) {
					jsPlumb.util.svg.addClass(c[0], b)
				}
			} catch (d) {}
			c.addClass(b)
		},
		animate: function(d, c, b) {
			d.animate(c, b)
		},
		appendElement: function(c, b) {
			jsPlumb.CurrentLibrary.getElementObject(b).append(c)
		},
		ajax: function(b) {
			b = b || {};
			b.type = b.type || "get";
			a.ajax(b)
		},
		bind: function(b, c, d) {
			b = jsPlumb.CurrentLibrary.getElementObject(b);
			b.bind(c, d)
		},
		dragEvents: {
			start: "start",
			stop: "stop",
			drag: "drag",
			step: "step",
			over: "over",
			out: "out",
			drop: "drop",
			complete: "complete"
		},
		extend: function(c, b) {
			return a.extend(c, b)
		},
		getAttribute: function(b, c) {
			return b.attr(c)
		},
		getClientXY: function(b) {
			return [b.clientX, b.clientY]
		},
		getDocumentElement: function() {
			return document
		},
		getDragObject: function(b) {
			return b[1].draggable
		},
		getDragScope: function(b) {
			return b.draggable("option", "scope")
		},
		getDropEvent: function(b) {
			return b[0]
		},
		getDropScope: function(b) {
			return b.droppable("option", "scope")
		},
		getDOMElement: function(b) {
			if (typeof(b) == "string") {
				return document.getElementById(b)
			} else {
				if (b.context) {
					return b[0]
				} else {
					return b
				}
			}
		},
		getElementObject: function(b) {
			return typeof(b) == "string" ? a("#" + b) : a(b)
		},
		getOffset: function(b) {
			return b.offset()
		},
		getPageXY: function(b) {
			return [b.pageX, b.pageY]
		},
		getParent: function(b) {
			return jsPlumb.CurrentLibrary.getElementObject(b).parent()
		},
		getScrollLeft: function(b) {
			return b.scrollLeft()
		},
		getScrollTop: function(b) {
			return b.scrollTop()
		},
		getSelector: function(b) {
			return a(b)
		},
		getSize: function(b) {
			return [b.outerWidth(), b.outerHeight()]
		},
		getTagName: function(b) {
			var c = jsPlumb.CurrentLibrary.getElementObject(b);
			return c.length > 0 ? c[0].tagName : null
		},
		getUIPosition: function(c) {
			if (c.length == 1) {
				ret = {
					left: c[0].pageX,
					top: c[0].pageY
				}
			} else {
				var d = c[1],
					b = d.offset;
				ret = b || d.absolutePosition
			}
			return ret
		},
		hasClass: function(c, b) {
			return c.hasClass(b)
		},
		initDraggable: function(c, b) {
			b = b || {};
			b.helper = null;
			b.scope = b.scope || jsPlumb.Defaults.Scope;
			c.draggable(b)
		},
		initDroppable: function(c, b) {
			b.scope = b.scope || jsPlumb.Defaults.Scope;
			c.droppable(b)
		},
		isAlreadyDraggable: function(b) {
			b = jsPlumb.CurrentLibrary.getElementObject(b);
			return b.hasClass("ui-draggable")
		},
		isDragSupported: function(c, b) {
			return c.draggable
		},
		isDropSupported: function(c, b) {
			return c.droppable
		},
		removeClass: function(c, b) {
			c = jsPlumb.CurrentLibrary.getElementObject(c);
			try {
				if (c[0].className.constructor == SVGAnimatedString) {
					jsPlumb.util.svg.removeClass(c[0], b)
				}
			} catch (d) {}
			c.removeClass(b)
		},
		removeElement: function(b, c) {
			jsPlumb.CurrentLibrary.getElementObject(b).remove()
		},
		setAttribute: function(c, d, b) {
			c.attr(d, b)
		},
		setDraggable: function(c, b) {
			c.draggable("option", "disabled", !b)
		},
		setDragScope: function(c, b) {
			c.draggable("option", "scope", b)
		},
		setOffset: function(b, c) {
			jsPlumb.CurrentLibrary.getElementObject(b).offset(c)
		},
		trigger: function(d, e, b) {
			var c = jQuery._data(jsPlumb.CurrentLibrary.getElementObject(d)[0], "handle");
			c(b)
		},
		unbind: function(b, c, d) {
			b = jsPlumb.CurrentLibrary.getElementObject(b);
			b.unbind(c, d)
		}
	};
	a(document).ready(jsPlumb.init)
})(jQuery);
(function() {
	if ("undefined" == typeof Math.sgn) {
		Math.sgn = function(l) {
			return 0 == l ? 0 : 0 < l ? 1 : -1
		}
	}
	var d = {
		subtract: function(m, l) {
			return {
				x: m.x - l.x,
				y: m.y - l.y
			}
		},
		dotProduct: function(m, l) {
			return m.x * l.x + m.y * l.y
		},
		square: function(l) {
			return Math.sqrt(l.x * l.x + l.y * l.y)
		},
		scale: function(m, l) {
			return {
				x: m.x * l,
				y: m.y * l
			}
		}
	},
		f = Math.pow(2, -65),
		h = function(y, x) {
			for (var t = [], v = x.length - 1, r = 2 * v - 1, s = [], w = [], p = [], q = [], o = [
				[1, 0.6, 0.3, 0.1],
				[0.4, 0.6, 0.6, 0.4],
				[0.1, 0.3, 0.6, 1]
			], u = 0; u <= v; u++) {
				s[u] = d.subtract(x[u], y)
			}
			for (u = 0; u <= v - 1; u++) {
				w[u] = d.subtract(x[u + 1], x[u]), w[u] = d.scale(w[u], 3)
			}
			for (u = 0; u <= v - 1; u++) {
				for (var l = 0; l <= v; l++) {
					p[u] || (p[u] = []), p[u][l] = d.dotProduct(w[u], s[l])
				}
			}
			for (u = 0; u <= r; u++) {
				q[u] || (q[u] = []), q[u].y = 0, q[u].x = parseFloat(u) / r
			}
			r = v - 1;
			for (s = 0; s <= v + r; s++) {
				u = Math.max(0, s - r);
				for (w = Math.min(s, v); u <= w; u++) {
					j = s - u, q[u + j].y += p[j][u] * o[j][u]
				}
			}
			v = x.length - 1;
			q = b(q, 2 * v - 1, t, 0);
			r = d.subtract(y, x[0]);
			p = d.square(r);
			for (u = o = 0; u < q; u++) {
				r = d.subtract(y, a(x, v, t[u], null, null)), r = d.square(r), r < p && (p = r, o = t[u])
			}
			r = d.subtract(y, x[v]);
			r = d.square(r);
			r < p && (p = r, o = 1);
			return {
				location: o,
				distance: p
			}
		},
		b = function(C, B, x, z) {
			var v = [],
				w = [],
				A = [],
				t = [],
				u = 0,
				r, y;
			y = Math.sgn(C[0].y);
			for (var q = 1; q <= B; q++) {
				r = Math.sgn(C[q].y), r != y && u++, y = r
			}
			switch (u) {
			case 0:
				return 0;
			case 1:
				if (64 <= z) {
					return x[0] = (C[0].x + C[B].x) / 2, 1
				}
				var p, u = C[0].y - C[B].y;
				r = C[B].x - C[0].x;
				y = C[0].x * C[B].y - C[B].x * C[0].y;
				q = max_distance_below = 0;
				for (p = 1; p < B; p++) {
					var s = u * C[p].x + r * C[p].y + y;
					s > q ? q = s : s < max_distance_below && (max_distance_below = s)
				}
				p = r;
				q = (1 * (y - q) - 0 * p) * (1 / (0 * p - 1 * u));
				p = r;
				u = (1 * (y - max_distance_below) - 0 * p) * (1 / (0 * p - 1 * u));
				r = Math.min(q, u);
				if (Math.max(q, u) - r < f) {
					return A = C[B].x - C[0].x, t = C[B].y - C[0].y, x[0] = 0 + 1 * (A * (C[0].y - 0) - t * (C[0].x - 0)) * (1 / (0 * A - 1 * t)), 1
				}
			}
			a(C, B, 0.5, v, w);
			C = b(v, B, A, z + 1);
			B = b(w, B, t, z + 1);
			for (z = 0; z < C; z++) {
				x[z] = A[z]
			}
			for (z = 0; z < B; z++) {
				x[z + C] = t[z]
			}
			return C + B
		},
		a = function(m, l, p, q, n) {
			for (var o = [
				[]
			], r = 0; r <= l; r++) {
				o[0][r] = m[r]
			}
			for (m = 1; m <= l; m++) {
				for (r = 0; r <= l - m; r++) {
					o[m] || (o[m] = []), o[m][r] || (o[m][r] = {}), o[m][r].x = (1 - p) * o[m - 1][r].x + p * o[m - 1][r + 1].x, o[m][r].y = (1 - p) * o[m - 1][r].y + p * o[m - 1][r + 1].y
				}
			}
			if (null != q) {
				for (r = 0; r <= l; r++) {
					q[r] = o[r][0]
				}
			}
			if (null != n) {
				for (r = 0; r <= l; r++) {
					n[r] = o[l - r][r]
				}
			}
			return o[l][0]
		},
		g = {},
		e = function(t) {
			var s = g[t];
			if (!s) {
				var s = [],
					p = function(u) {
						return function() {
							return u
						}
					},
					q = function() {
						return function(u) {
							return u
						}
					},
					n = function() {
						return function(u) {
							return 1 - u
						}
					},
					o = function(u) {
						return function(v) {
							for (var x = 1, w = 0; w < u.length; w++) {
								x *= u[w](v)
							}
							return x
						}
					};
				s.push(new function() {
					return function(u) {
						return Math.pow(u, t)
					}
				});
				for (var r = 1; r < t; r++) {
					for (var l = [new p(t)], m = 0; m < t - r; m++) {
						l.push(new q)
					}
					for (m = 0; m < r; m++) {
						l.push(new n)
					}
					s.push(new o(l))
				}
				s.push(new function() {
					return function(u) {
						return Math.pow(1 - u, t)
					}
				});
				g[t] = s
			}
			return s
		},
		c = function(m, l) {
			for (var p = e(m.length - 1), q = 0, n = 0, o = 0; o < m.length; o++) {
				q += m[o].x * p[o](l), n += m[o].y * p[o](l)
			}
			return {
				x: q,
				y: n
			}
		},
		k = function(m, l, p) {
			for (var q = c(m, l), n = 0, o = 0 < p ? 1 : -1, r = null; n < Math.abs(p);) {
				l += 0.005 * o, r = c(m, l), n += Math.sqrt(Math.pow(r.x - q.x, 2) + Math.pow(r.y - q.y, 2)), q = r
			}
			return {
				point: r,
				location: l
			}
		},
		i = function(m, l) {
			var o = c(m, l),
				p = c(m.slice(0, m.length - 1), l),
				n = p.y - o.y,
				o = p.x - o.x;
			return 0 == n ? Infinity : Math.atan(n / o)
		};
	window.jsBezier = {
		distanceFromCurve: h,
		gradientAtPoint: i,
		gradientAtPointAlongCurveFrom: function(m, l, n) {
			l = k(m, l, n);
			if (1 < l.location) {
				l.location = 1
			}
			if (0 > l.location) {
				l.location = 0
			}
			return i(m, l.location)
		},
		nearestPointOnCurve: function(m, l) {
			var n = h(m, l);
			return {
				point: a(l, l.length - 1, n.location, null, null),
				location: n.location
			}
		},
		pointOnCurve: c,
		pointAlongCurveFrom: function(m, l, n) {
			return k(m, l, n).point
		},
		perpendicularToCurveAt: function(m, l, n, o) {
			l = k(m, l, null == o ? 0 : o);
			m = i(m, l.location);
			o = Math.atan(-1 / m);
			m = n / 2 * Math.sin(o);
			n = n / 2 * Math.cos(o);
			return [{
				x: l.point.x + n,
				y: l.point.y + m
			}, {
				x: l.point.x - n,
				y: l.point.y - m
			}]
		}
	}
})();
