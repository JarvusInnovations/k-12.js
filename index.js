'use strict';

/** @module k12 */

/**
 * Returns an array of grades when provided a range (including sparse ranges).
 *
 * @see {@link module:k12.arrayToGradeRange} for the reverse of this function.
 *
 * **Important:** The output when using `returnsNumber=true` is not valid input for `arrayToGradeRange`
 *
 * @example
 * // returns [ 'PK', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ]
 * gradeRangeToArray('PK-2,3-5,6-8,9-12')
 *
 * @example
 * // returns [ 'K', '1', '2', '3', '4', '5', '6', '7', '8' ]
 * gradeRangeToArray('K-8')
 *
 * @example
 * // returns [ -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
 * gradeRangeToArray('P-2,3-5,6-8,9-12', true)
 *
 * @alias module:k12.gradeRangeToArray
 *
 * @param {String} gradeRange
 * @param {Boolean} [returnNumbers=false]
 * @returns {Array}
 */

function gradeRangeToArray(gradeRange, returnNumbers) {
    // Inspired by Joseph the Dreamer (http://codereview.stackexchange.com/a/26138)
    var nums = [],
        entries = gradeRange.toString().toLowerCase(),
        hasAlphaGrades = entries.indexOf('k') !== -1,
        low, high, range;

    entries = entries.split(',');

    returnNumbers = typeof returnNumbers === 'boolean' ? returnNumbers : false;

    if (hasAlphaGrades) {
        entries = entries.map(function (entry) {
            return entry.split('-').map(function (chunk) {
                if (chunk === 'p' || chunk === 'pk') {
                    return '0';
                }

                if (chunk === 'k') {
                    return '1';
                }

                return (parseInt(chunk, 10) + 1).toString();
            }).join('-');
        });
    }

    entries.forEach(function (entry, i) {
        if (entry.indexOf('-') === -1) {
            nums.push(+entry);
        } else {
            range = entry.split('-');
            low = +range[0];
            high = +range[1];

            if (high < low) {
                low = low ^ high;
                high = low ^ high;
                low = low ^ high;
            }

            while (low <= high) {
                nums.push(low++);
            }
        }
    });

    nums = nums.sort(function (a, b) {
        return a - b;
    });

    if (hasAlphaGrades) {
        nums = nums.map(function (grade) {
            if (!returnNumbers && grade === 0) {
                return 'P';
            } else if (!returnNumbers && grade === 1) {
                return 'K';
            }

            return grade - 1;
        });
    }

    if (returnNumbers) {
        return nums;
    } else {
        return nums.map(function (num) {
            return num.toString();
        });
    }
}

/**
 * Returns a grade range as a string (including sparse ranges).
 *
 * @see {@link module:k12.gradeRangeToArray} for the reverse of this function.
 *
 * @example
 * // returns 'PK-2,3-5,6-8,9-12'
 * arrayToGradeRange([ 'PK', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ], 'PK')
 *
 * @example
 * // returns 'K-8'
 * arrayToGradeRange([ 'K', '1', '2', '3', '4', '5', '6', '7', '8' ])
 *
 * @alias module:k12.arrayToGradeRange
 *
 * @param {Array} input
 * @param {String} [pkStr=P] - the abbreviation to use for Pre-Kindergarten
 * @returns {String}
 */

function arrayToGradeRange(input, pkStr) {
    var ret = [],
        ary, first, last, i, len;
    // Inspired by: http://stackoverflow.com/a/2271410/1337301

    pkStr = typeof pkStr === 'string' ? pkStr.toUpperCase() : 'P';

    // Cast grades to integers and replace K with 1 and PK with 0
    input = input.map(function (grade) {
        grade = grade.toString().toLowerCase();

        // Handle P/PK
        if (grade.indexOf('/') !== -1) {
            grade = grade.split('/').pop();
        }

        return (grade === 'k') ? 1 : (grade.charAt(0) === 'p') ? 0 : (parseInt(grade, 10) + 1);
    });

    // Copy and sort
    ary = input.concat([]);
    ary.sort(function (a, b) {
        return Number(a) - Number(b);
    });

    for (i = 0, len = ary.length; i < len; i++) {
        first = last = ary[i];

        while (ary[i + 1] === last + 1) {
            last++;
            i++;
        }

        ret.push(
            first === last ? (first > 1 ? (first - 1) : (first === 0 ? pkStr : 'K'))
                : (first > 1 ? first - 1 : (first === 0 ? pkStr : 'K')) + '-' +
            (last > 1 ? last - 1 : (last === 0 ? pkStr : 'K')));
    }

    ret = ret.join(',');

    if (ret.charAt(0) === '1') {
        ret = 'K' + ret.substr(1);
    } else if (ret.charAt(0) === '0') {
        ret = pkStr + ret.substr(1);
    }

    if (ret === '1') {
        return 'K';
    }

    if (ret === '0') {
        return pkStr;
    }

    return ret;
}

module.exports = {
    gradeRangeToArray: gradeRangeToArray,
    arrayToGradeRange: arrayToGradeRange
};
