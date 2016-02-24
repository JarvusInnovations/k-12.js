<a name="module_k12"></a>
## k12

* [k12](#module_k12)
    * [.gradeRangeToArray(gradeRange, [returnNumbers])](#module_k12.gradeRangeToArray) ⇒ <code>Array</code>
    * [.arrayToGradeRange(input, [pkStr])](#module_k12.arrayToGradeRange) ⇒ <code>String</code>

<a name="module_k12.gradeRangeToArray"></a>
### k12.gradeRangeToArray(gradeRange, [returnNumbers]) ⇒ <code>Array</code>
Returns an array of grades when provided a range (including sparse ranges).

**Kind**: static method of <code>[k12](#module_k12)</code>  
**See**: [arrayToGradeRange](#module_k12.arrayToGradeRange) for the reverse of this function.

**Important:** The output when using `returnsNumber=true` is not valid input for `arrayToGradeRange`  

| Param | Type | Default |
| --- | --- | --- |
| gradeRange | <code>String</code> |  | 
| [returnNumbers] | <code>Boolean</code> | <code>false</code> | 

**Example**  
```js
// returns [ 'PK', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ]
gradeRangeToArray('PK-2,3-5,6-8,9-12')
```
**Example**  
```js
// returns [ 'K', '1', '2', '3', '4', '5', '6', '7', '8' ]
gradeRangeToArray('K-8')
```
**Example**  
```js
// returns [ -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
gradeRangeToArray('P-2,3-5,6-8,9-12', true)
```
<a name="module_k12.arrayToGradeRange"></a>
### k12.arrayToGradeRange(input, [pkStr]) ⇒ <code>String</code>
Returns a grade range as a string (including sparse ranges).

**Kind**: static method of <code>[k12](#module_k12)</code>  
**See**: [gradeRangeToArray](#module_k12.gradeRangeToArray) for the reverse of this function.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>Array</code> |  |  |
| [pkStr] | <code>String</code> | <code>P</code> | the abbreviation to use for Pre-Kindergarten |

**Example**  
```js
// returns 'PK-2,3-5,6-8,9-12'
arrayToGradeRange([ 'PK', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ], 'PK')
```
**Example**  
```js
// returns 'K-8'
arrayToGradeRange([ 'K', '1', '2', '3', '4', '5', '6', '7', '8' ])
```
