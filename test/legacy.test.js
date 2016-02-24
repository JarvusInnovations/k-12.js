var k12 = require(__dirname + '/../index.js'),
    assert = require('assert');

describe('K-12', function() {
    describe('gradeRangeToArray', function () {
        it('should make sense of complex ranges', function() {
            assert.deepEqual(
                k12.gradeRangeToArray('PK-2,3-5,6-8,9-12'),
                ['P', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                "k12.gradeRangeToArray('PK-2,3-5,6-8,9-12')"
            );
        })

        it ('should work with a subset of grades', function () {
            assert.deepEqual(
                k12.gradeRangeToArray('K-8'),
                ['K', '1', '2', '3', '4', '5', '6', '7', '8'],
                "k12.gradeRangeToArray('K-8')"
            );
        });


        it ('should output an array of numeric indexes', function() {
            assert.deepEqual(
                k12.gradeRangeToArray('PK-2,3-5,6-8,9-12', true),
                [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                "k12.gradeRangeToArray('PK-2,3-5,6-8,9-12', true)"
            );
        });

        it ('should work with sparse ranges', function() {
            assert.deepEqual(
                k12.gradeRangeToArray('1-3,5-7,9-11', true),
                [1, 2, 3, 5, 6, 7, 9, 10, 11],
                "k12.gradeRangeToArray('1-3,5-7,9-11', true)"
            );
        });
    });

    describe('arrayToGradeRange', function() {
        it('should support a custom pre-k string', function() {
            assert.equal(
                k12.arrayToGradeRange([ 'P', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ], 'PK'),
                'PK-12',
                "k12.arrayToGradeRange([ 'P', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ], 'PK')"
            );
        });

        it('should work with non-sparse ranges', function() {
            assert.equal(
                k12.arrayToGradeRange([ 'K', '1', '2', '3', '4', '5', '6', '7', '8' ]),
                'K-8',
                "k12.arrayToGradeRange([ 'K', '1', '2', '3', '4', '5', '6', '7', '8' ])"
            );
        });

        it('should work with sparse ranges', function() {
            assert.equal(
                k12.arrayToGradeRange([ 'K', '5', '6', '8', '9', '12' ]),
                'K,5-6,8-9,12',
                "k12.arrayToGradeRange([ 'K', '5', '6', '8', '9', '12' ])"
            );
        });

        it('should work with reverse sparse ranges', function() {
            assert.equal(
                k12.arrayToGradeRange([ '11', '9', '8', '6', '5', 'K' ]),
                'K,5-6,8-9,11',
                "k12.arrayToGradeRange([ '11', '9', '8', '6', '5', 'K' ])"
            );
        });
    });
});