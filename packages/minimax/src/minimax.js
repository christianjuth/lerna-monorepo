"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.minimax = void 0;
class Node {
    constructor(gameState) {
        this.children = [];
        this.value = null;
        this.gameState = gameState;
    }
}
function minimaxInternal({ player = "", node, leafEvaluator, staticEvaluator, getNextGameState, isMax = true, maxDepth = Number.MAX_SAFE_INTEGER, alpha = Number.MIN_SAFE_INTEGER, beta = Number.MAX_SAFE_INTEGER, level, randomizeNextGameStateOrder = false, dictionary, hashGameState }) {
    const childrenData = getNextGameState(node.gameState);
    const gameStateId = hashGameState ? hashGameState(node.gameState) : null;
    if (gameStateId && dictionary[gameStateId]) {
        const val = dictionary[gameStateId];
        node.value = val;
        return val;
    }
    else if (childrenData === undefined || childrenData.length === 0) {
        const val = leafEvaluator({ gameState: node.gameState, player, level });
        gameStateId && (dictionary[gameStateId] = val);
        node.value = val;
        return val;
    }
    else if (maxDepth === 0 && leafEvaluator !== undefined) {
        const val = staticEvaluator({ gameState: node.gameState, player, level });
        gameStateId && (dictionary[gameStateId] = val);
        node.value = val;
        return val;
    }
    else {
        const values = [];
        const children = [];
        node.children = children;
        for (const gameState of childrenData) {
            const child = new Node(gameState);
            if (randomizeNextGameStateOrder && Math.random() > 0.5) {
                children.push(child);
            }
            else {
                children.unshift(child);
            }
            const evaluation = minimaxInternal({
                player,
                node: child,
                leafEvaluator,
                staticEvaluator,
                getNextGameState,
                isMax: !isMax,
                maxDepth: maxDepth - 1,
                alpha,
                beta,
                level: level + 1,
                dictionary,
                hashGameState
            });
            values.push(evaluation);
            if (isMax) {
                alpha = Math.max(alpha, evaluation);
            }
            else {
                beta = Math.min(beta, evaluation);
            }
            if (beta <= alpha) {
                break;
            }
        }
        if (isMax) {
            node.value = Math.max(...values);
        }
        else {
            node.value = Math.min(...values);
        }
        return node.value;
    }
}
function minimax(_a) {
    var { gameState } = _a, rest = __rest(_a, ["gameState"]);
    const node = new Node(gameState);
    const dictionary = {};
    const choice = minimaxInternal(Object.assign({ node, level: 0, dictionary }, rest));
    for (const child of node.children) {
        if (child.value === choice) {
            return child.gameState;
        }
    }
}
exports.minimax = minimax;
exports.default = minimax;
//# sourceMappingURL=minimax.js.map