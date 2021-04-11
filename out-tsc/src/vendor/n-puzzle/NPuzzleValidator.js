import { NPuzzle } from './NPuzzle';
export class NPuzzleValidator {
    validate(startInstanceOrInstance) {
        if (startInstanceOrInstance instanceof NPuzzle) {
            return this.validateInstance(startInstanceOrInstance.instance);
        }
        return this.validateInstance(startInstanceOrInstance);
    }
    validateInstance(instance) {
        const size = Math.trunc(Math.sqrt(instance.length));
        const inversions = this.countInversions(instance);
        if (size % 2 === 0) {
            const blankRow = 1 + Math.trunc(instance.indexOf(0) / size);
            // console.log(blankRow);
            return (inversions + blankRow) % 2 === 0;
        }
        else {
            return inversions % 2 === 0;
        }
    }
    countInversions(array) {
        let count = 0;
        for (let i = 0; i < array.length; ++i) {
            if (array[i]) {
                for (let j = 0; j < i; ++j) {
                    if (array[j] > array[i]) {
                        count++;
                    }
                }
            }
        }
        // console.log(count);
        return count;
    }
}
//# sourceMappingURL=NPuzzleValidator.js.map