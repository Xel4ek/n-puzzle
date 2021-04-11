import { LeftHeapNode } from './LeftHeapNode';
export class LeftHeap {
    get size() {
        var _a, _b;
        return (_b = (_a = this.head) === null || _a === void 0 ? void 0 : _a.dist) !== null && _b !== void 0 ? _b : 0;
    }
    insert(priority, item) {
        this.head = this.merge(this.head, new LeftHeapNode(priority, item));
    }
    pop() {
        var _a, _b, _c;
        const item = (_a = this.head) === null || _a === void 0 ? void 0 : _a.item;
        this.head = this.merge((_b = this.head) === null || _b === void 0 ? void 0 : _b.right, (_c = this.head) === null || _c === void 0 ? void 0 : _c.left);
        return item;
    }
    merge(lhs, rhs) {
        var _a, _b, _c, _d;
        if (!lhs) {
            return rhs;
        }
        if (!rhs) {
            return lhs;
        }
        if (rhs.key < lhs.key) {
            [lhs, rhs] = [rhs, lhs];
        }
        lhs.right = this.merge(lhs.right, rhs);
        if (!lhs.left) {
            lhs.left = lhs.right;
            lhs.right = undefined;
        }
        else {
            if (((_b = (_a = lhs.right) === null || _a === void 0 ? void 0 : _a.dist) !== null && _b !== void 0 ? _b : 0) > lhs.left.dist) {
                [lhs.right, lhs.left] = [lhs.left, lhs.right];
            }
        }
        lhs.dist = ((_d = (_c = lhs.right) === null || _c === void 0 ? void 0 : _c.dist) !== null && _d !== void 0 ? _d : 0) + 1;
        return lhs;
    }
}
//# sourceMappingURL=LeftHeap.js.map