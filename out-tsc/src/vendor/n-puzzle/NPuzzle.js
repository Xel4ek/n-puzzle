export class NPuzzle {
    constructor(size, instance, history, isTarget) {
        this.history = history !== null && history !== void 0 ? history : '';
        this.isTarget = isTarget !== null && isTarget !== void 0 ? isTarget : false;
        this.size = size;
        this.instance = instance;
    }
    show() {
        console.group('[NPuzzle]');
        for (let i = 0; i < this.size; i++) {
            console.log(this.instance.slice(i * this.size, (i + 1) * this.size));
        }
        // console.log({last: this.lastModified});
        console.groupEnd();
    }
}
export class MappedNPuzzle extends NPuzzle {
    constructor(size, instance) {
        super(size, instance);
        this.mapInstance = new Map();
        instance.map((entry, index) => {
            this.mapInstance.set(entry, {
                col: index % this.size,
                row: Math.trunc(index / this.size),
            });
        });
    }
}
//# sourceMappingURL=NPuzzle.js.map