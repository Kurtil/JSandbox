// In this exercice, the goal is to find all possible permutations of a string

const givePermutationsOf = str => {
    if (str.length <= 1) {
        return str;
    } else if (str.length === 2) {
        const [start, end] = str;
        const permutation = [end, start];
        return [str, permutation];
    } else {
        const permutations = [];
        for (let i = 0; i < str.length; i++) {
            const strCopie = Array.of(...str);
            const element = strCopie.splice(i, 1);
            permutations.push(...givePermutationsOf(strCopie).map(perm => perm.concat(element)));
        }
        return permutations;
    }
}

const str = "abcde";
const perms = givePermutationsOf([...str]);
const concatenedPerms = perms.length <= 1 ? perms : perms.map(arr => arr.reduce((acc, val) => acc + val));
concatenedPerms.sort();
console.log(concatenedPerms);
